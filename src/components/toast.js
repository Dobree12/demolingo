// ============================================
// Toast Component — Notification messages
// ============================================

export function showToast(message, type = 'success', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
    badge: '🏅',
    xp: '⭐',
    streak: '🔥',
    heart: '❤️',
    levelup: '🎉',
  };
  
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || '✨'}</span>
    <span class="toast-message">${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

export function showXPToast(amount) {
  showToast(`+${amount} XP`, 'xp', 2000);
}

export function showBadgeToast(badge) {
  showToast(`${badge.icon} Insignă nouă: ${badge.name}!`, 'badge', 4000);
}

export function showStreakToast(days) {
  showToast(`🔥 Serie de ${days} zile!`, 'streak', 3000);
}

export function showLevelUpToast(level, name) {
  showToast(`🎉 Nivel nou: ${level} — ${name}!`, 'levelup', 4000);
}
