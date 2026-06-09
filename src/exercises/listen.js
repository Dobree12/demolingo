// ============================================
// Listen Exercise Renderer
// ============================================

/**
 * Renders a listening exercise.
 * @param {{ word: string, answer: string }} exercise
 * @returns {string} HTML string
 */
export function renderListen(exercise) {
  return `
    <div class="exercise-listen">
      <div class="exercise-header">
        <span class="exercise-type-badge badge badge-xp">🎧 Ascultă și scrie ce auzi</span>
      </div>

      <div class="listen-play-area animate-scaleIn">
        <button class="listen-play-btn" id="btn-play-audio" title="Ascultă">
          <span class="listen-play-icon">🔊</span>
        </button>
        <p class="listen-play-label">Apasă pentru a asculta</p>
      </div>

      <div class="listen-slow-area animate-fadeIn" style="animation-delay: 0.15s;">
        <button class="listen-slow-btn" id="btn-play-slow">
          🐌 Mai încet
        </button>
      </div>

      <div class="listen-input-area animate-fadeInUp" style="animation-delay: 0.2s;">
        <input
          type="text"
          id="listen-input"
          class="input"
          placeholder="Scrie ce ai auzit..."
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
        />
      </div>

      <button class="btn btn-primary btn-full btn-lg animate-fadeInUp" id="btn-check-listen"
              style="animation-delay: 0.3s; margin-top: var(--space-md);">
        VERIFICĂ 🎧
      </button>
    </div>

    <style>
      .exercise-listen {
        padding: var(--space-md);
      }

      .exercise-header {
        text-align: center;
        margin-bottom: var(--space-lg);
      }

      .listen-play-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: var(--space-lg);
      }

      .listen-play-btn {
        width: 120px;
        height: 120px;
        border-radius: var(--border-radius-full);
        background: linear-gradient(135deg, var(--color-xp), #1899d6);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 0 #1278a8, var(--shadow-lg);
        transition: all var(--transition-fast);
        animation: float 3s ease-in-out infinite;
      }

      .listen-play-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 9px 0 #1278a8, var(--shadow-xl);
      }

      .listen-play-btn:active {
        transform: translateY(4px);
        box-shadow: 0 2px 0 #1278a8;
      }

      .listen-play-icon {
        font-size: 3rem;
      }

      .listen-play-label {
        margin-top: var(--space-md);
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        font-weight: var(--font-weight-semibold);
      }

      .listen-slow-area {
        text-align: center;
        margin-bottom: var(--space-xl);
      }

      .listen-slow-btn {
        background: var(--bg-card);
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        padding: var(--space-sm) var(--space-lg);
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-bold);
        color: var(--text-secondary);
        cursor: pointer;
        transition: all var(--transition-fast);
        font-family: var(--font-family);
        box-shadow: var(--shadow-button-secondary);
      }

      .listen-slow-btn:hover {
        border-color: var(--text-secondary);
      }

      .listen-slow-btn:active {
        transform: translateY(3px);
        box-shadow: none;
      }

      .listen-input-area {
        margin-bottom: var(--space-sm);
      }
    </style>
  `;
}
