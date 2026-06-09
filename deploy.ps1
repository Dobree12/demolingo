# ============================================
# Deploy script — push build to `production` branch via worktree
# ============================================
# Foloseste git worktree, deci NU atinge node_modules sau working tree-ul main.
#
# Usage:
#   .\deploy.ps1                 # build + deploy
#   .\deploy.ps1 -SkipBuild      # deploy ce e deja in dist/
#   .\deploy.ps1 -Message "fix"  # mesaj custom de commit

param(
  [switch]$SkipBuild,
  [string]$Message = "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')",
  [string]$ProdBranch = "production"
)

$ErrorActionPreference = "Stop"

function Step($msg) { Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Ok($msg)   { Write-Host "OK  $msg" -ForegroundColor Green }
function Fail($msg) { Write-Host "ERR $msg" -ForegroundColor Red; exit 1 }

# --- Sanity checks ---
if (-not (Test-Path "package.json")) { Fail "Ruleaza din root-ul proiectului (unde e package.json)." }
if (-not (Test-Path ".git"))         { Fail "Nu e un git repo. Ruleaza intai: git init && git remote add origin <URL>." }

$startBranch = (git rev-parse --abbrev-ref HEAD).Trim()
Step "Branch curent: $startBranch"

# --- Build ---
if (-not $SkipBuild) {
  Step "Build productie..."
  # Folosesc explicit binarul local Vite, ca sa evit conflicte cu alte tool-uri 'vite' din PATH
  if (Test-Path "node_modules\.bin\vite.cmd") {
    & node_modules\.bin\vite.cmd build
  } elseif (Test-Path "node_modules\vite\bin\vite.js") {
    & node node_modules\vite\bin\vite.js build
  } else {
    Fail "Vite local nu exista. Ruleaza 'npm install' intai."
  }
  if ($LASTEXITCODE -ne 0) { Fail "Build esuat." }
  Ok "Build complet."
} else {
  Step "Sar peste build."
}

if (-not (Test-Path "dist\index.html")) { Fail "dist\index.html lipseste. Ruleaza fara -SkipBuild." }

# Include .htaccess si .cpanel.yml in dist
if (Test-Path ".htaccess") {
  Copy-Item ".htaccess" "dist\.htaccess" -Force
  Ok "Inclus .htaccess in dist/."
}
if (Test-Path ".cpanel.yml") {
  Copy-Item ".cpanel.yml" "dist\.cpanel.yml" -Force
  Ok "Inclus .cpanel.yml in dist/."
}

# --- Pregateste worktree-ul pentru production ---
$worktreePath = Join-Path (Split-Path -Parent (Get-Location)) "_deploy-mom-duo2"

if (Test-Path $worktreePath) {
  Step "Curat worktree vechi: $worktreePath"
  git worktree remove $worktreePath --force 2>$null | Out-Null
  if (Test-Path $worktreePath) {
    Remove-Item $worktreePath -Recurse -Force
  }
}

# Verifica daca branch-ul production exista local sau pe remote
$hasLocal  = (git branch --list $ProdBranch) -ne $null -and (git branch --list $ProdBranch).Trim().Length -gt 0
$hasRemote = (git ls-remote --heads origin $ProdBranch 2>$null).Trim().Length -gt 0

if ($hasLocal) {
  Step "Adaug worktree pe branch existent $ProdBranch"
  git worktree add $worktreePath $ProdBranch
} elseif ($hasRemote) {
  Step "Adaug worktree pe baza branch-ului remote origin/$ProdBranch"
  git fetch origin $ProdBranch
  git worktree add -b $ProdBranch $worktreePath "origin/$ProdBranch"
} else {
  Step "Creez worktree cu branch orphan $ProdBranch"
  # Trick: creem branch-ul orphan intr-un commit gol mai intai
  $emptyTree = (git hash-object -t tree --stdin) 2>$null
  # Mai simplu: facem worktree + orphan in folder
  git worktree add --detach $worktreePath
  Push-Location $worktreePath
  git checkout --orphan $ProdBranch
  Pop-Location
}

if ($LASTEXITCODE -ne 0) { Fail "Worktree esuat." }

# --- Curat continutul vechi din worktree (pastreaza .git) ---
Push-Location $worktreePath
Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force
Pop-Location

# --- Copiaza build-ul nou in worktree ---
Copy-Item "dist\*" $worktreePath -Recurse -Force
# Copy-Item nu copiaza fisierele ascunse cu wildcard *, asa ca le iau explicit
Get-ChildItem "dist" -Force -File | Where-Object { $_.Name -like ".*" } | ForEach-Object {
  Copy-Item $_.FullName $worktreePath -Force
}

# --- Commit + push din worktree ---
Push-Location $worktreePath
git add -A
$staged = (git diff --cached --name-only) | Out-String
if ($staged.Trim().Length -eq 0) {
  Step "Nimic schimbat in build, nu fac commit."
} else {
  git commit -m $Message
  if ($LASTEXITCODE -ne 0) { Pop-Location; Fail "Commit esuat." }
  Step "Push catre origin/$ProdBranch..."
  git push -u origin $ProdBranch
  if ($LASTEXITCODE -ne 0) { Pop-Location; Fail "Push esuat. Verifica remote-ul." }
  Ok "Push reusit."
}
Pop-Location

# --- Curat worktree-ul ---
git worktree remove $worktreePath --force
Ok "Worktree curatat."

Write-Host "`nUrmator pas in cPanel:" -ForegroundColor Yellow
Write-Host "  1. Update from Remote" -ForegroundColor Yellow
Write-Host "  2. Deploy HEAD Commit" -ForegroundColor Yellow
