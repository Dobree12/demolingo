# ============================================
# Deploy script — push build to `production` branch
# ============================================
# Usage:
#   .\deploy.ps1                 # build + deploy
#   .\deploy.ps1 -SkipBuild      # deploy ce e deja in dist/
#   .\deploy.ps1 -Message "fix"  # mesaj custom de commit

param(
  [switch]$SkipBuild,
  [string]$Message = "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')",
  [string]$ProdBranch = "production",
  [string]$SourceBranch = "main"
)

$ErrorActionPreference = "Stop"

function Step($msg) { Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Ok($msg)   { Write-Host "OK  $msg" -ForegroundColor Green }
function Fail($msg) { Write-Host "ERR $msg" -ForegroundColor Red; exit 1 }

# --- Sanity checks ---
if (-not (Test-Path "package.json")) { Fail "Ruleaza din root-ul proiectului (unde e package.json)." }
if (-not (Test-Path ".git"))         { Fail "Nu e un git repo. Ruleaza intai: git init && git remote add origin <URL>." }

# Save the current branch so we can return to it at the end
$startBranch = (git rev-parse --abbrev-ref HEAD).Trim()
Step "Plecam de pe branch-ul: $startBranch"

# Refuza daca sunt schimbari necommit-uite pe sursa
$dirty = (git status --porcelain) | Out-String
if ($dirty.Trim().Length -gt 0) {
  Fail "Ai modificari necommit-uite. Commit/stash inainte de deploy."
}

# --- Build ---
if (-not $SkipBuild) {
  Step "Build productie (npm run build)..."
  npm run build
  if ($LASTEXITCODE -ne 0) { Fail "Build esuat." }
  Ok "Build complet."
} else {
  Step "Sar peste build (folosesc dist/ existent)."
}

if (-not (Test-Path "dist/index.html")) { Fail "dist/index.html lipseste. Ruleaza fara -SkipBuild." }

# Asigura-te ca exista .htaccess pentru SPA
if (Test-Path ".htaccess") {
  Copy-Item ".htaccess" "dist\.htaccess" -Force
  Ok "Am inclus .htaccess in dist/."
}

# --- Snapshot dist/ in afara repo-ului ---
$tmp = Join-Path $env:TEMP "mom-duo2-deploy-$(Get-Random)"
New-Item -ItemType Directory -Path $tmp | Out-Null
Copy-Item "dist\*" $tmp -Recurse -Force
Ok "Snapshot in $tmp"

# --- Switch pe production branch ---
$hasProd = (git branch --list $ProdBranch) -ne $null -and (git branch --list $ProdBranch).Length -gt 0
if ($hasProd) {
  Step "Switch pe $ProdBranch (existent)..."
  git checkout $ProdBranch
} else {
  Step "Creez branch orphan $ProdBranch..."
  git checkout --orphan $ProdBranch
  git rm -rf . 2>$null | Out-Null
}

# --- Curata branch-ul de continut vechi (pastreaza .git) ---
Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force

# --- Copiaza build-ul ---
Copy-Item "$tmp\*" "." -Recurse -Force
Remove-Item $tmp -Recurse -Force

# --- Commit + push ---
git add -A
$staged = (git diff --cached --name-only) | Out-String
if ($staged.Trim().Length -eq 0) {
  Step "Nimic schimbat in build, nu fac commit."
} else {
  git commit -m $Message
  Step "Push catre origin/$ProdBranch..."
  git push -u origin $ProdBranch
  if ($LASTEXITCODE -ne 0) { Fail "Push esuat. Verifica remote-ul." }
  Ok "Push reusit."
}

# --- Inapoi pe branch-ul initial ---
git checkout $startBranch
Ok "Inapoi pe $startBranch. Gata!"

Write-Host "`nUrmatorul pas: in cPanel -> Git Version Control -> Update from Remote." -ForegroundColor Yellow
