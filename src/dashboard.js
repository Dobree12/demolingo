// ============================================
// Pagina de urmărire (progres.html) — doar citire
// ============================================
// Citește ultima stare trimisă de calculatorul cursantului prin
// api/progress.php, cu cheia de citire (ținută în localStorage-ul acestui
// browser). Nu scrie nimic pe server.

import './styles/index.css';
import { getAllLessons } from './data/lessons.js';
import { getAllSections } from './data/sections.js';
import { getLevelName } from './engine/progress.js';

const KEY_STORE = 'demolingo_read_key';
const API = '/api/progress.php';
const REFRESH_MS = 60_000;

const root = document.getElementById('dash');
if (matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

function getKey() {
  try { return localStorage.getItem(KEY_STORE) || ''; } catch { return ''; }
}
function setKey(k) {
  try { k ? localStorage.setItem(KEY_STORE, k) : localStorage.removeItem(KEY_STORE); } catch { /* fără stocare: cere cheia din nou */ }
}

// --- Titluri lecții: id → { title, where } ---
const lessons = getAllLessons();
const sections = getAllSections();
const TITLES = new Map();
for (const l of lessons) {
  TITLES.set(l.id, { title: `${l.icon || ''} ${l.title}${l.titleDe ? ` · ${l.titleDe}` : ''}`, where: 'Lecții' });
}
for (const s of sections) {
  for (const u of s.units || []) TITLES.set(u.id, { title: `${u.icon || ''} ${u.title}`, where: s.title });
}

// --- Formatare ---
function ago(iso) {
  if (!iso) return '—';
  const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 1) return 'chiar acum';
  if (min < 60) return `acum ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `acum ${h} ${h === 1 ? 'oră' : 'ore'}`;
  const d = Math.round(h / 24);
  return `acum ${d} ${d === 1 ? 'zi' : 'zile'}`;
}
const fmtDate = (iso) => new Date(iso).toLocaleString('ro-RO', { dateStyle: 'medium', timeStyle: 'short' });
const fmtMin = (m) => (m >= 60 ? `${Math.floor(m / 60)} h ${Math.round(m % 60)} min` : `${Math.round(m)} min`);

function dayKey(d) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// --- Randare ---
function renderKeyForm(message = '') {
  root.innerHTML = `
    <main class="dash">
      <h1 class="dash-title">📈 Progres</h1>
      <div class="dash-card">
        <p class="dash-muted">Introdu cheia de citire (din fișierul de configurare de pe server).</p>
        ${message ? `<p class="dash-error">${esc(message)}</p>` : ''}
        <form id="key-form">
          <input type="password" id="key-input" class="dash-input" placeholder="Cheia de citire" autocomplete="off" required>
          <button class="dash-btn" type="submit">Vezi progresul</button>
        </form>
      </div>
    </main>`;
  document.getElementById('key-form').addEventListener('submit', (e) => {
    e.preventDefault();
    setKey(document.getElementById('key-input').value.trim());
    load();
  });
}

function tile(label, value, sub = '', color = 'var(--text-primary)') {
  return `
    <div class="dash-tile">
      <span class="dash-tile-label">${label}</span>
      <span class="dash-tile-value" style="color:${color}">${value}</span>
      ${sub ? `<span class="dash-tile-sub">${sub}</span>` : ''}
    </div>`;
}

function chart(log) {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = dayKey(d);
    days.push({ key, d, ...(log[key] || {}) });
  }
  const max = Math.max(10, ...days.map((x) => x.minutes || 0));
  const activeDays = days.filter((x) => (x.minutes || 0) > 0 || (x.answers || 0) > 0).length;
  const total = days.reduce((s, x) => s + (x.minutes || 0), 0);
  const bars = days.map((x) => {
    const m = x.minutes || 0;
    const h = m > 0 ? Math.max(4, (m / max) * 100) : 0;
    const label = x.d.toLocaleDateString('ro-RO', { weekday: 'short', day: 'numeric', month: 'short' });
    const tip = `${label}: ${fmtMin(m)} · ${x.answers || 0} răspunsuri · ${x.lessons || 0} lecții · ${Math.round(x.xp || 0)} XP`;
    return `<div class="dash-bar-col" title="${esc(tip)}">
      <div class="dash-bar" style="height:${h}%"></div>
      <span class="dash-bar-day">${x.d.getDate()}</span>
    </div>`;
  }).join('');
  return `
    <div class="dash-card">
      <div class="dash-card-head">
        <h2>⏱️ Minute pe zi — ultimele 30 de zile</h2>
        <span class="dash-muted">${activeDays === 1 ? '1 zi activă' : `${activeDays} zile active`} · ${fmtMin(total)}</span>
      </div>
      ${Object.keys(log).length ? `<div class="dash-chart">${bars}</div>` : '<p class="dash-muted">Istoricul zilnic începe de la actualizarea aplicației.</p>'}
    </div>`;
}

function pathProgress(state) {
  const done = state.lessonsCompleted || {};
  const isDone = (id) => done[id]?.completed;
  const rows = [
    { title: '🗺️ Lecții (traseul principal)', total: lessons.length, done: lessons.filter((l) => isDone(l.id)).length },
    ...sections.filter((s) => s.units?.length).map((s) => ({
      title: `${s.icon} ${s.title}`, total: s.units.length, done: s.units.filter((u) => isDone(u.id)).length,
    })),
  ];
  return `
    <div class="dash-card">
      <h2>🧭 Unde a ajuns</h2>
      ${rows.map((r) => {
        const pct = r.total ? Math.round((r.done / r.total) * 100) : 0;
        return `<div class="dash-row">
          <span class="dash-row-title">${esc(r.title)}</span>
          <div class="dash-meter"><div style="width:${pct}%"></div></div>
          <span class="dash-row-num">${r.done}/${r.total}</span>
        </div>`;
      }).join('')}
    </div>`;
}

function recentLessons(state) {
  const items = Object.entries(state.lessonsCompleted || {})
    .filter(([, v]) => v.completedAt)
    .sort((a, b) => b[1].completedAt.localeCompare(a[1].completedAt))
    .slice(0, 10);
  if (!items.length) return '';
  return `
    <div class="dash-card">
      <h2>✅ Ultimele lecții terminate</h2>
      ${items.map(([id, v]) => {
        const t = TITLES.get(id);
        const name = t ? t.title : (id === 'review' ? '🔄 Repetiție' : id === 'mistakes' ? '🛠️ Repară greșelile' : id);
        return `<div class="dash-list-row">
          <div><strong>${esc(name)}</strong><span class="dash-muted"> · ${esc(t?.where || 'Practică')}</span></div>
          <div class="dash-muted">${'⭐'.repeat(v.stars || 0)} ${v.bestScore ?? ''}% · ${ago(v.completedAt)}</div>
        </div>`;
      }).join('')}
    </div>`;
}

function recentMistakes(state) {
  const items = (state.mistakes || []).slice(0, 8);
  if (!items.length) return '';
  return `
    <div class="dash-card">
      <h2>❌ Greșeli recente (de reparat)</h2>
      ${items.map((m) => {
        const ex = m.exercise || {};
        const blank = ex.lines ? ex.lines.find((l) => l.blank) : null;
        const q = ex.prompt || ex.question || ex.promptRo || ex.promptDe || ex.word || ex.sentence || ex.de || ex.wordDe || ex.scene || ex.type;
        const a = ex.answer || ex.correct || blank?.answer || '';
        return `<div class="dash-list-row">
          <div>${esc(q)}</div>
          <div class="dash-muted">✅ ${esc(a)} · ${ago(m.timestamp)}</div>
        </div>`;
      }).join('')}
    </div>`;
}

function renderDashboard(data) {
  const s = data.state || {};
  const today = (s.activityLog || {})[dayKey(new Date())] || {};
  const answered = (s.totalCorrect || 0) + (s.totalWrong || 0);
  const accuracy = answered ? Math.round((s.totalCorrect / answered) * 100) : 0;
  const name = data.profile?.name || 'Cursant';

  root.innerHTML = `
    <main class="dash">
      <header class="dash-header">
        <div>
          <h1 class="dash-title">${esc(data.profile?.avatar || '🙂')} ${esc(name)}</h1>
          <p class="dash-muted">Ultima sincronizare: <strong>${ago(data.receivedAt)}</strong> (${fmtDate(data.receivedAt)})</p>
        </div>
        <div class="dash-actions">
          <button class="dash-btn dash-btn-ghost" id="btn-refresh">🔄 Reîncarcă</button>
          <button class="dash-btn dash-btn-ghost" id="btn-forget">Uită cheia</button>
        </div>
      </header>

      <section class="dash-tiles">
        ${tile('Azi', fmtMin(today.minutes || 0), `${today.answers || 0} răspunsuri · ${today.lessons || 0} lecții`, 'var(--color-primary)')}
        ${tile('Nivel', `${s.level || 1}`, `${esc(getLevelName(s.level || 1))} · ${Math.round(s.xp || 0)} XP`, 'var(--color-xp)')}
        ${tile('Serie', `🔥 ${s.streak || 0}`, 'zile la rând (la ultima deschidere)', 'var(--color-streak)')}
        ${tile('Timp total', fmtMin(s.totalMinutes || 0), `obiectiv: ${s.dailyGoalMinutes || 10} min/zi`)}
        ${tile('Lecții terminate', `${s.totalLessonsCompleted || 0}`)}
        ${tile('Acuratețe', `${accuracy}%`, `${s.totalAttempts || 0} încercări în total`, 'var(--color-secondary)')}
      </section>

      ${chart(s.activityLog || {})}
      ${pathProgress(s)}
      ${recentLessons(s)}
      ${recentMistakes(s)}
    </main>`;

  document.getElementById('btn-refresh').addEventListener('click', load);
  document.getElementById('btn-forget').addEventListener('click', () => { setKey(''); renderKeyForm(); });
}

async function load() {
  const key = getKey();
  if (!key) return renderKeyForm();
  try {
    const res = await fetch(API, { headers: { 'X-Key': key }, cache: 'no-store' });
    if (res.status === 403) { setKey(''); return renderKeyForm('Cheie greșită.'); }
    if (res.status === 404) {
      root.innerHTML = `<main class="dash"><h1 class="dash-title">📈 Progres</h1>
        <div class="dash-card"><p class="dash-muted">Încă nu s-a trimis niciun progres. Activează sincronizarea pe calculatorul cursantului (Setări → Sincronizare).</p></div></main>`;
      return;
    }
    if (!res.ok) throw new Error(`Serverul a răspuns ${res.status}`);
    renderDashboard(await res.json());
  } catch (e) {
    root.innerHTML = `<main class="dash"><h1 class="dash-title">📈 Progres</h1>
      <div class="dash-card"><p class="dash-error">${esc(e.message)}</p>
      <button class="dash-btn" id="btn-retry">Încearcă din nou</button></div></main>`;
    document.getElementById('btn-retry').addEventListener('click', load);
  }
}

const style = document.createElement('style');
style.textContent = `
  body { background: var(--bg-secondary); }
  .dash { max-width: 960px; margin: 0 auto; padding: 24px 16px 48px; display: flex; flex-direction: column; gap: 16px; }
  .dash-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
  .dash-title { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); }
  .dash-actions { display: flex; gap: 8px; }
  .dash-muted { color: var(--text-secondary); font-size: 0.9rem; }
  .dash-error { color: var(--color-error); margin: 8px 0; }
  .dash-card { background: var(--bg-card); border: 2px solid var(--border-color); border-radius: 16px; padding: 16px; }
  .dash-card h2 { font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin-bottom: 12px; }
  .dash-card-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  .dash-tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  @media (max-width: 640px) { .dash-tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .dash-tile { background: var(--bg-card); border: 2px solid var(--border-color); border-radius: 16px; padding: 14px; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .dash-tile-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); font-weight: 700; }
  .dash-tile-value { font-size: 1.6rem; font-weight: 800; font-variant-numeric: tabular-nums; }
  .dash-tile-sub { font-size: 0.8rem; color: var(--text-secondary); }
  .dash-chart { display: flex; align-items: flex-end; gap: 3px; height: 160px; }
  .dash-bar-col { flex: 1; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 4px; min-width: 0; }
  .dash-bar { width: 100%; max-width: 22px; background: var(--color-primary); border-radius: 4px 4px 0 0; }
  .dash-bar-day { font-size: 0.65rem; color: var(--text-muted); font-variant-numeric: tabular-nums; }
  .dash-row { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(60px, 2fr) auto; gap: 10px; align-items: center; padding: 6px 0; }
  .dash-row-title { font-weight: 600; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .dash-row-num { font-variant-numeric: tabular-nums; color: var(--text-secondary); font-size: 0.9rem; }
  .dash-meter { height: 10px; background: var(--border-color); border-radius: 999px; overflow: hidden; }
  .dash-meter > div { height: 100%; background: var(--color-primary); border-radius: 999px; }
  .dash-list-row { display: flex; justify-content: space-between; gap: 12px; padding: 8px 0; border-top: 1px solid var(--border-color); flex-wrap: wrap; color: var(--text-primary); }
  .dash-list-row:first-of-type { border-top: none; }
  .dash-input { width: 100%; padding: 12px; border: 2px solid var(--border-color); border-radius: 12px; font-size: 1rem; margin: 8px 0; background: var(--bg-primary); color: var(--text-primary); }
  .dash-btn { padding: 10px 16px; border-radius: 12px; border: none; background: var(--color-primary); color: #fff; font-weight: 700; cursor: pointer; font-size: 0.95rem; }
  .dash-btn-ghost { background: var(--bg-card); color: var(--text-primary); border: 2px solid var(--border-color); }
`;
document.head.appendChild(style);

load();
setInterval(() => { if (document.visibilityState === 'visible' && getKey()) load(); }, REFRESH_MS);
