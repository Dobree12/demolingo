// ============================================
// Settings Screen — App preferences & reset
// ============================================

import { loadState, updateState, resetState, getActiveUser, deleteUser } from '../engine/storage.js';
import { setDailyGoal } from '../engine/progress.js';
import { renderMascot } from '../components/mascot.js';
import { showToast } from '../components/toast.js';
import { downloadProfile, importAndGoHome } from '../utils/backup.js';
import { getSyncStatus, enableSync, disableSync, pushNow, restoreFromServer } from '../engine/sync.js';

const GOAL_OPTIONS = [
  { value: 5, label: '5 min', emoji: '🌱', desc: 'Relaxat' },
  { value: 10, label: '10 min', emoji: '📚', desc: 'Normal' },
  { value: 15, label: '15 min', emoji: '💪', desc: 'Serios' },
  { value: 20, label: '20 min', emoji: '🔥', desc: 'Intens' },
];

const SYNC_ERRORS = {
  offline: 'Nu există conexiune — se trimite automat mai târziu.',
  network: 'Serverul nu a putut fi contactat — se reîncearcă automat.',
  bad_key: 'Serverul nu acceptă cheia pentru scriere. Apasă „Dezactivează" și activează din nou cu cheia de scriere (sau, dacă aici doar urmărești progresul, folosește progres.html).',
  regression: 'Serverul are mai mult progres decât acest calculator.',
  not_configured: 'Serverul nu este configurat încă.',
};

function formatTime(iso) {
  if (!iso) return 'niciodată';
  return new Date(iso).toLocaleString('ro-RO', { dateStyle: 'short', timeStyle: 'short' });
}

function renderSyncBlock() {
  const s = getSyncStatus();
  const user = getActiveUser();
  const muted = 'font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-md);';

  if (!s) {
    return `
      <p style="${muted}">
        Trimite progresul pe server, ca să poată fi urmărit de la distanță. Activează doar pe calculatorul pe care se învață.
      </p>
      <input type="password" id="sync-key-input" class="exercise-input" placeholder="Cheia de sincronizare"
             autocomplete="off" style="width: 100%; margin-bottom: var(--space-sm);">
      <button class="btn btn-primary btn-full" id="btn-sync-enable">Activează sincronizarea</button>
    `;
  }

  if (!user || s.profileId !== user.id) {
    return `<p style="${muted}">Sincronizarea este activă pentru alt profil de pe acest calculator.</p>
      <button class="btn btn-secondary btn-full" id="btn-sync-disable">Dezactivează</button>`;
  }

  const error = s.lastError ? `<p style="${muted} color: var(--color-hearts);">⚠️ ${SYNC_ERRORS[s.lastError] || `Eroare: ${s.lastError}`}</p>` : '';
  const conflict = s.lastError === 'regression' ? `
    <div class="card" style="margin-bottom: var(--space-sm);">
      <p style="${muted}">
        Pe server: ${Math.round(s.conflict?.xp || 0)} XP, ${s.conflict?.totalAttempts || 0} răspunsuri
        (salvat ${formatTime(s.conflict?.receivedAt)}). Aici: ${loadState().xp} XP.
      </p>
      <button class="btn btn-primary btn-full" id="btn-sync-restore" style="margin-bottom: var(--space-sm);">⬇️ Adu progresul de pe server</button>
      <button class="btn btn-secondary btn-full" id="btn-sync-force">⬆️ Păstrează ce e aici (suprascrie serverul)</button>
    </div>` : '';

  return `
    <p style="${muted}">✅ Activă · ultima trimitere: <strong>${formatTime(s.lastSyncAt)}</strong></p>
    ${error}
    ${conflict}
    <button class="btn btn-secondary btn-full" id="btn-sync-now" style="margin-bottom: var(--space-sm);">🔄 Trimite acum</button>
    <button class="btn btn-secondary btn-full" id="btn-sync-disable">Dezactivează pe acest calculator</button>
  `;
}

export function renderSettings(navigate) {
  const state = loadState();
  const currentGoal = state.dailyGoalMinutes || 10;
  const isDark = state.theme === 'dark';

  const goalOptionsHTML = GOAL_OPTIONS.map(opt => `
    <label class="goal-option card-interactive" data-value="${opt.value}" style="
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md) var(--space-lg);
      border-radius: var(--border-radius-lg);
      border: 2px solid ${currentGoal === opt.value ? 'var(--color-primary)' : 'var(--border-color)'};
      background: ${currentGoal === opt.value ? 'var(--color-success-bg)' : 'var(--bg-card)'};
      cursor: pointer;
      transition: all var(--transition-fast);
      margin-bottom: var(--space-sm);
      box-shadow: var(--shadow-sm);
    ">
      <input type="radio" name="daily-goal" value="${opt.value}"
        ${currentGoal === opt.value ? 'checked' : ''}
        style="display: none;">
      <span style="font-size: 1.5rem;">${opt.emoji}</span>
      <div style="flex: 1;">
        <div style="font-size: var(--font-size-md); font-weight: var(--font-weight-bold); color: var(--text-primary);">
          ${opt.label}
        </div>
        <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">
          ${opt.desc}
        </div>
      </div>
      <div style="
        width: 24px; height: 24px;
        border-radius: var(--border-radius-full);
        border: 2px solid ${currentGoal === opt.value ? 'var(--color-primary)' : 'var(--border-color)'};
        background: ${currentGoal === opt.value ? 'var(--color-primary)' : 'transparent'};
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-fast);
        flex-shrink: 0;
      ">
        ${currentGoal === opt.value ? '<span style="color: white; font-size: 14px; font-weight: bold;">✓</span>' : ''}
      </div>
    </label>
  `).join('');

  return `
    <div style="
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: var(--space-lg);
    ">
      <!-- Header -->
      <div style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg);">
        <button class="btn btn-secondary btn-sm" id="btn-back-settings" style="padding: 8px 12px;">
          ← Înapoi
        </button>
      </div>

      <!-- Title -->
      <div class="animate-fadeInDown" style="text-align: center; margin-bottom: var(--space-lg);">
        <h1 style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-extrabold); color: var(--text-primary);">
          ⚙️ Setări
        </h1>
      </div>

      <!-- Mascot -->
      <div class="animate-scaleIn" style="display: flex; justify-content: center; margin-bottom: var(--space-xl);">
        ${renderMascot('happy', 'md', 'Personalizează-ți experiența!')}
      </div>

      <!-- Daily Goal Section -->
      <div class="animate-fadeInUp" style="margin-bottom: var(--space-xl); animation-delay: 0.1s;">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-sm);">
          🎯 Obiectiv zilnic
        </h2>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
          Cât timp vrei să înveți în fiecare zi?
        </p>
        <div id="goal-options-container">
          ${goalOptionsHTML}
        </div>
      </div>

      <!-- Dark Mode Section -->
      <div class="card animate-fadeInUp" style="
        margin-bottom: var(--space-xl);
        animation-delay: 0.2s;
        display: flex;
        align-items: center;
        justify-content: space-between;
      ">
        <div style="display: flex; align-items: center; gap: var(--space-md);">
          <span style="font-size: 1.5rem;">🌙</span>
          <div>
            <div style="font-size: var(--font-size-md); font-weight: var(--font-weight-bold); color: var(--text-primary);">
              Mod întunecat
            </div>
            <div style="font-size: var(--font-size-xs); color: var(--text-secondary);">
              Mai ușor pentru ochi seara
            </div>
          </div>
        </div>
        <label style="
          position: relative;
          width: 52px;
          height: 28px;
          flex-shrink: 0;
          cursor: pointer;
        ">
          <input type="checkbox" id="toggle-dark-mode"
            ${isDark ? 'checked' : ''}
            style="opacity: 0; width: 0; height: 0; position: absolute;">
          <span style="
            position: absolute;
            inset: 0;
            background: ${isDark ? 'var(--color-primary)' : 'var(--border-color)'};
            border-radius: 999px;
            transition: all var(--transition-normal);
          "></span>
          <span style="
            position: absolute;
            top: 2px;
            left: ${isDark ? '26px' : '2px'};
            width: 24px;
            height: 24px;
            background: white;
            border-radius: var(--border-radius-full);
            transition: all var(--transition-normal);
            box-shadow: var(--shadow-sm);
          "></span>
        </label>
      </div>

      <!-- Profil -->
      <div class="animate-fadeInUp" style="animation-delay: 0.25s; margin-bottom: var(--space-xl);">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-sm);">
          👥 Profil
        </h2>
        <button class="btn btn-secondary btn-full" id="btn-change-user" style="margin-bottom: var(--space-sm);">
          🔄 Schimbă profilul
        </button>
      </div>

      <!-- Sincronizare -->
      <div class="animate-fadeInUp" style="animation-delay: 0.27s; margin-bottom: var(--space-xl);">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-sm);">
          ☁️ Sincronizare
        </h2>
        ${renderSyncBlock()}
      </div>

      <!-- Backup -->
      <div class="animate-fadeInUp" style="animation-delay: 0.28s; margin-bottom: var(--space-xl);">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-sm);">
          💾 Salvează progresul
        </h2>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
          Progresul stă doar în acest browser. Descarcă un fișier de rezervă ca să nu-l pierzi sau ca să-l muți pe alt telefon/calculator.
        </p>
        <button class="btn btn-secondary btn-full" id="btn-export-profile" style="margin-bottom: var(--space-sm);">
          ⬇️ Descarcă progresul
        </button>
        <button class="btn btn-secondary btn-full" id="btn-import-profile">
          ⬆️ Încarcă un fișier (profil nou)
        </button>
      </div>

      <!-- Danger Zone -->
      <div class="animate-fadeInUp" style="animation-delay: 0.3s; margin-bottom: var(--space-xl);">
        <h2 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-bold); color: var(--color-hearts); margin-bottom: var(--space-sm);">
          ⚠️ Zonă periculoasă
        </h2>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
          Atenție! Aceste acțiuni afectează doar profilul activ și nu pot fi anulate.
        </p>
        <button class="btn btn-danger btn-full" id="btn-reset-progress" style="margin-bottom: var(--space-sm);">
          🗑️ Resetează progresul acestui profil
        </button>
        <button class="btn btn-danger btn-full" id="btn-delete-user">
          ❌ Șterge acest profil
        </button>
      </div>

      <!-- App Version -->
      <div class="animate-fadeIn" style="
        text-align: center;
        padding: var(--space-xl) 0;
        border-top: 1px solid var(--border-color);
        margin-top: auto;
      ">
        <p style="font-size: var(--font-size-xs); color: var(--text-muted);">
          Învățăm Germană · v1.0.0
        </p>
        <p style="font-size: var(--font-size-xs); color: var(--text-muted); margin-top: var(--space-xs);">
          Făcut cu ❤️ pentru învățare
        </p>
      </div>
    </div>
  `;
}

export function attachSettingsEvents(navigate) {
  // Back button
  document.getElementById('btn-back-settings')?.addEventListener('click', () => {
    navigate('home');
  });

  // Daily goal selection
  document.querySelectorAll('.goal-option').forEach(option => {
    option.addEventListener('click', () => {
      const value = parseInt(option.dataset.value);
      if (!value) return;

      // Update state
      setDailyGoal(value);

      // Update visual selection
      document.querySelectorAll('.goal-option').forEach(opt => {
        const optVal = parseInt(opt.dataset.value);
        const isSelected = optVal === value;

        opt.style.borderColor = isSelected ? 'var(--color-primary)' : 'var(--border-color)';
        opt.style.background = isSelected ? 'var(--color-success-bg)' : 'var(--bg-card)';

        // Update radio indicator
        const indicator = opt.querySelector('div:last-child');
        if (indicator) {
          indicator.style.borderColor = isSelected ? 'var(--color-primary)' : 'var(--border-color)';
          indicator.style.background = isSelected ? 'var(--color-primary)' : 'transparent';
          indicator.innerHTML = isSelected ? '<span style="color: white; font-size: 14px; font-weight: bold;">✓</span>' : '';
        }

        // Update radio input
        const radio = opt.querySelector('input[type="radio"]');
        if (radio) radio.checked = isSelected;
      });
    });
  });

  // Dark mode toggle
  const darkToggle = document.getElementById('toggle-dark-mode');
  if (darkToggle) {
    darkToggle.addEventListener('change', () => {
      const isDark = darkToggle.checked;
      updateState({ theme: isDark ? 'dark' : 'light' });

      // Apply theme
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

      // Update toggle slider position visually
      const slider = darkToggle.nextElementSibling?.nextElementSibling;
      if (slider) {
        slider.style.left = isDark ? '26px' : '2px';
      }
      const track = darkToggle.nextElementSibling;
      if (track) {
        track.style.background = isDark ? 'var(--color-primary)' : 'var(--border-color)';
      }
    });
  }

  // Schimbă profilul
  document.getElementById('btn-change-user')?.addEventListener('click', () => {
    navigate('users');
  });

  // Sincronizare
  const rerender = () => navigate('settings', {}, { replace: true });

  document.getElementById('btn-sync-enable')?.addEventListener('click', async (e) => {
    const key = document.getElementById('sync-key-input')?.value.trim();
    if (!key) return;
    e.target.disabled = true;
    try {
      const result = await enableSync(key);
      if (result.needsChoice) {
        const xp = Math.round(result.server.state.xp || 0);
        if (confirm(`Pe server există deja mai mult progres (${xp} XP). Îl aduc pe acest calculator?\n\nOK = adu de pe server · Anulează = păstrează ce e aici`)) {
          await restoreFromServer();
          showToast('Progresul a fost adus de pe server ☁️', 'success');
        } else {
          await pushNow({ force: true });
          showToast('Sincronizare activată ☁️', 'success');
        }
      } else {
        showToast(result.ok ? 'Sincronizare activată ☁️' : 'Activată — se trimite când e conexiune', 'success');
      }
      rerender();
    } catch (err) {
      showToast(err.message || 'Nu m-am putut conecta la server.', 'error', 4000);
      e.target.disabled = false;
    }
  });

  document.getElementById('btn-sync-now')?.addEventListener('click', async () => {
    const ok = await pushNow({ force: false });
    showToast(ok ? 'Trimis ☁️' : 'Nu s-a putut trimite acum', ok ? 'success' : 'warning');
    rerender();
  });

  document.getElementById('btn-sync-restore')?.addEventListener('click', async () => {
    if (!confirm('Progresul de pe acest calculator va fi înlocuit cu cel de pe server. Continui?')) return;
    try {
      await restoreFromServer();
      showToast('Progresul a fost adus de pe server ☁️', 'success');
      rerender();
    } catch (err) {
      showToast(err.message, 'error', 4000);
    }
  });

  document.getElementById('btn-sync-force')?.addEventListener('click', async () => {
    if (!confirm('Progresul de pe server va fi înlocuit cu cel de aici. Continui?')) return;
    const ok = await pushNow({ force: true });
    showToast(ok ? 'Serverul a fost actualizat ☁️' : 'Nu s-a putut trimite acum', ok ? 'success' : 'warning');
    rerender();
  });

  document.getElementById('btn-sync-disable')?.addEventListener('click', () => {
    if (!confirm('Oprești sincronizarea pe acest calculator? Progresul rămâne salvat local și pe server.')) return;
    disableSync();
    rerender();
  });

  // Backup
  document.getElementById('btn-export-profile')?.addEventListener('click', () => {
    if (downloadProfile()) showToast('Fișierul cu progresul a fost descărcat 💾', 'success');
  });
  document.getElementById('btn-import-profile')?.addEventListener('click', () => importAndGoHome(navigate));

  // Reset progress (doar profilul activ)
  document.getElementById('btn-reset-progress')?.addEventListener('click', () => {
    const confirmed = confirm(
      '⚠️ Ești absolut sigur?\n\nTot progresul ACESTUI profil va fi șters:\n- XP și nivel\n- Lecții completate\n- Insigne câștigate\n- Serie zilnică\n\nAceastă acțiune NU poate fi anulată!'
    );
    if (confirmed) {
      const doubleConfirm = confirm('Ultima confirmare: chiar vrei să ștergi TOT progresul acestui profil?');
      if (doubleConfirm) {
        resetState();
        document.documentElement.removeAttribute('data-theme');
        navigate('home');
      }
    }
  });

  // Șterge profilul activ
  document.getElementById('btn-delete-user')?.addEventListener('click', () => {
    const active = getActiveUser();
    if (!active) return;
    const confirmed = confirm(`⚠️ Ștergi profilul „${active.name}" și tot progresul lui?`);
    if (confirmed) {
      const doubleConfirm = confirm('Ultima confirmare: profilul și progresul vor dispărea definitiv. Continui?');
      if (doubleConfirm) {
        deleteUser(active.id);
        document.documentElement.removeAttribute('data-theme');
        navigate('users');
      }
    }
  });
}
