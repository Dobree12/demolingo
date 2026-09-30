// ============================================
// Backup progres — descarcă / încarcă un fișier JSON
// ============================================

import { exportActiveProfile, importProfile, loadState } from '../engine/storage.js';
import { checkAndUpdateStreak } from '../engine/progress.js';
import { migrateSRSHistory } from '../engine/srs.js';
import { showToast } from '../components/toast.js';

export function downloadProfile() {
  const data = exportActiveProfile();
  if (!data) return false;
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = data.profile.name.replace(/[^\p{L}\p{N}_-]+/gu, '-');
  a.href = url;
  a.download = `invatam-germana-${safeName}-${data.exportedAt.slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
}

// Deschide selectorul de fișiere; rezolvă cu profilul creat sau null la anulare.
// Respinge cu Error (mesaj pentru utilizator) dacă fișierul nu e valid.
export function pickAndImportProfile() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (!file) return resolve(null);
      try {
        const data = JSON.parse(await file.text());
        resolve(importProfile(data));
      } catch (e) {
        reject(e instanceof SyntaxError ? new Error('Fișierul nu este un JSON valid.') : e);
      }
    });
    input.click();
  });
}

// Flux complet din UI: alege fișierul → profil nou activ → Home
export async function importAndGoHome(navigate) {
  try {
    const user = await pickAndImportProfile();
    if (!user) return;
    document.documentElement.setAttribute('data-theme', loadState().theme || 'light');
    checkAndUpdateStreak();
    migrateSRSHistory();
    showToast(`Profilul „${user.name}" a fost importat 🎉`, 'success');
    navigate('home');
  } catch (e) {
    showToast(e.message, 'error', 4000);
  }
}
