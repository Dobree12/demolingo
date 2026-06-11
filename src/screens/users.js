// ============================================
// Users Screen — alegerea / crearea profilului
// ============================================
// Profiluri locale (localStorage), fără autentificare.

import { getUsers, getActiveUser, createUser, switchUser, renameUser, peekUserState, loadState } from '../engine/storage.js';
import { checkAndUpdateStreak, getLevelName } from '../engine/progress.js';
import { renderMascot } from '../components/mascot.js';

const AVATAR_OPTIONS = ['👩', '👨', '👵', '👴', '🧑', '👧', '👦', '🐱', '🐶', '🦊', '🐻', '🦉'];

export function renderUsers(navigate) {
  const users = getUsers();
  const active = getActiveUser();

  const cardsHTML = users.map((user, idx) => {
    const state = peekUserState(user.id);
    const isActive = active && active.id === user.id;
    return `
      <div class="user-card card-interactive animate-fadeInUp ${isActive ? 'user-card-active' : ''}"
           data-user-id="${user.id}" style="animation-delay: ${idx * 0.08}s">
        <span class="user-card-avatar">${user.avatar}</span>
        <div class="user-card-info">
          <span class="user-card-name">${escapeHTML(user.name)}</span>
          <span class="user-card-stats">
            ⭐ Nivel ${state.level} · ${getLevelName(state.level)} &nbsp; 🔥 ${state.streak} zile
          </span>
        </div>
        <button class="user-card-edit" data-edit-id="${user.id}" title="Redenumește" aria-label="Redenumește profilul">✏️</button>
        ${isActive ? '<span class="user-card-check">✓</span>' : ''}
      </div>
    `;
  }).join('');

  const avatarsHTML = AVATAR_OPTIONS.map((a, i) => `
    <button class="avatar-option ${i === 0 ? 'avatar-selected' : ''}" data-avatar="${a}">${a}</button>
  `).join('');

  return `
    <div class="users-screen">
      <div class="animate-fadeInDown" style="text-align: center; margin: var(--space-xl) 0 var(--space-lg);">
        <h1 style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-extrabold); color: var(--text-primary);">
          👥 Cine învață azi?
        </h1>
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-top: var(--space-xs);">
          Alege-ți profilul sau creează unul nou
        </p>
      </div>

      <div class="animate-scaleIn" style="display: flex; justify-content: center; margin-bottom: var(--space-xl);">
        ${renderMascot('waving', 'md')}
      </div>

      <div class="users-list">
        ${cardsHTML || '<p style="text-align:center; color: var(--text-secondary);">Niciun profil încă — creează primul mai jos! 👇</p>'}
      </div>

      <div id="new-user-form" class="card animate-fadeInUp" style="display: none; margin-top: var(--space-lg);">
        <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); color: var(--text-primary); margin-bottom: var(--space-md);">
          ✨ Profil nou
        </h3>
        <input type="text" id="new-user-name" class="exercise-input" placeholder="Numele tău..."
               maxlength="24" autocomplete="off"
               style="width: 100%; margin-bottom: var(--space-md);">
        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-bottom: var(--space-sm);">Alege un avatar:</p>
        <div class="avatar-grid">${avatarsHTML}</div>
        <button class="btn btn-primary btn-full" id="btn-create-user" style="margin-top: var(--space-md);">
          Începe să înveți! 🚀
        </button>
      </div>

      <button class="btn btn-secondary btn-full animate-fadeInUp" id="btn-show-new-user"
              style="margin-top: var(--space-lg); animation-delay: 0.2s;">
        ➕ Adaugă profil
      </button>

      ${active ? `
        <button class="btn btn-ghost btn-full" id="btn-users-back" style="margin-top: var(--space-sm);">
          ← Înapoi
        </button>
      ` : ''}

      <div style="height: 32px;"></div>
    </div>

    <style>
      .users-screen { max-width: 480px; margin: 0 auto; padding: var(--space-lg); min-height: 100vh; }
      .users-list { display: flex; flex-direction: column; gap: var(--space-md); }
      .user-card {
        position: relative;
        display: flex; align-items: center; gap: var(--space-md);
        padding: var(--space-md) var(--space-lg);
        background: var(--bg-card); border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-button-secondary);
        cursor: pointer; transition: all var(--transition-fast);
      }
      .user-card:active { transform: translateY(2px); box-shadow: none; }
      .user-card-active { border-color: var(--color-primary); background: var(--color-success-bg); }
      .user-card-avatar { font-size: 40px; line-height: 1; }
      .user-card-info { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
      .user-card-name {
        font-size: var(--font-size-lg); font-weight: var(--font-weight-bold);
        color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      }
      .user-card-stats { font-size: var(--font-size-xs); color: var(--text-secondary); }
      .user-card-edit {
        background: none; border: none; font-size: 18px; cursor: pointer;
        padding: var(--space-xs); opacity: 0.6;
      }
      .user-card-edit:hover { opacity: 1; }
      .user-card-check {
        font-size: 20px; color: var(--color-primary); font-weight: var(--font-weight-extrabold);
      }
      .avatar-grid {
        display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--space-sm);
      }
      .avatar-option {
        font-size: 28px; padding: var(--space-sm); cursor: pointer;
        background: var(--bg-secondary); border: 2px solid transparent;
        border-radius: var(--border-radius-md); transition: all var(--transition-fast);
      }
      .avatar-option.avatar-selected {
        border-color: var(--color-primary); background: var(--color-success-bg);
        transform: scale(1.1);
      }
      .btn-ghost {
        background: transparent; color: var(--text-secondary);
        border: none; box-shadow: none;
      }
    </style>
  `;
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

export function attachUsersEvents(navigate) {
  let selectedAvatar = AVATAR_OPTIONS[0];

  // Selectare profil existent
  document.querySelectorAll('.user-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.user-card-edit')) return;
      const id = card.dataset.userId;
      switchUser(id);
      applyUserTheme();
      checkAndUpdateStreak();
      navigate('home');
    });
  });

  // Redenumire
  document.querySelectorAll('.user-card-edit').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.editId;
      const current = getUsers().find((u) => u.id === id);
      const name = prompt('Noul nume al profilului:', current ? current.name : '');
      if (name && name.trim()) {
        renameUser(id, name);
        navigate('users');
      }
    });
  });

  // Arată formularul de profil nou
  document.getElementById('btn-show-new-user')?.addEventListener('click', () => {
    const form = document.getElementById('new-user-form');
    if (form) {
      form.style.display = 'block';
      document.getElementById('new-user-name')?.focus();
    }
    document.getElementById('btn-show-new-user').style.display = 'none';
  });

  // Alegere avatar
  document.querySelectorAll('.avatar-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.avatar-option').forEach((b) => b.classList.remove('avatar-selected'));
      btn.classList.add('avatar-selected');
      selectedAvatar = btn.dataset.avatar;
    });
  });

  // Creare profil
  const create = () => {
    const input = document.getElementById('new-user-name');
    const name = input ? input.value.trim() : '';
    if (!name) {
      if (input) {
        input.placeholder = 'Scrie un nume mai întâi 🙂';
        input.focus();
      }
      return;
    }
    createUser(name, selectedAvatar);
    applyUserTheme();
    checkAndUpdateStreak();
    navigate('home');
  };
  document.getElementById('btn-create-user')?.addEventListener('click', create);
  document.getElementById('new-user-name')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') create();
  });

  // Înapoi (doar dacă există deja un profil activ)
  document.getElementById('btn-users-back')?.addEventListener('click', () => navigate('home'));
}

// Tema aparține profilului — la switch se re-aplică
function applyUserTheme() {
  const state = loadState();
  document.documentElement.setAttribute('data-theme', state.theme || 'light');
}
