// ============================================
// Avatar Component — Modern interactive German emblem
// ============================================

const STATES = {
  happy:        { ring: 'var(--color-primary)',  glow: 'var(--color-primary-glow)',   anim: 'avatar-idle',   badge: '' },
  excited:      { ring: 'var(--color-accent)',   glow: 'rgba(255,150,0,0.35)',         anim: 'avatar-pop',    badge: '' },
  thinking:     { ring: 'var(--color-xp)',       glow: 'rgba(28,176,246,0.35)',        anim: 'avatar-tilt',   badge: '?' },
  celebrating:  { ring: 'var(--color-secondary)',glow: 'rgba(206,130,255,0.4)',        anim: 'avatar-spin',   badge: '' },
  encouraging:  { ring: 'var(--color-accent)',   glow: 'rgba(255,150,0,0.35)',         anim: 'avatar-pulse',  badge: '' },
  sad:          { ring: 'var(--color-hearts)',   glow: 'rgba(255,75,75,0.3)',          anim: 'avatar-shake',  badge: '' },
  sleeping:     { ring: 'var(--text-muted)',     glow: 'rgba(120,120,120,0.2)',        anim: '',              badge: 'z' },
  love:         { ring: 'var(--color-hearts)',   glow: 'rgba(255,75,75,0.4)',          anim: 'avatar-heart',  badge: '' },
  waving:       { ring: 'var(--color-primary)',  glow: 'var(--color-primary-glow)',    anim: 'avatar-wave',   badge: '' },
};

const SIZES = {
  sm: 44,
  md: 72,
  lg: 104,
  xl: 144,
};

export function renderMascot(state = 'happy', size = 'md', message = '') {
  const cfg = STATES[state] || STATES.happy;
  const px = SIZES[size] || SIZES.md;
  const inner = Math.round(px * 0.72);

  return `
    <div class="avatar-wrap" style="display:inline-flex;flex-direction:column;align-items:center;gap:10px;">
      <button type="button" class="avatar ${cfg.anim}"
              style="--ring:${cfg.ring};--glow:${cfg.glow};--size:${px}px;--inner:${inner}px;"
              aria-label="Asistent" tabindex="0">
        <span class="avatar-glow"></span>
        <span class="avatar-core">
          <svg viewBox="0 0 60 60" width="100%" height="100%" aria-hidden="true">
            <defs>
              <clipPath id="avClip"><circle cx="30" cy="30" r="28"/></clipPath>
            </defs>
            <g clip-path="url(#avClip)">
              <rect x="0" y="0"  width="60" height="20" fill="#1a1a1a"/>
              <rect x="0" y="20" width="60" height="20" fill="#DD0000"/>
              <rect x="0" y="40" width="60" height="20" fill="#FFCE00"/>
            </g>
            <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="2"/>
          </svg>
        </span>
        ${cfg.badge ? `<span class="avatar-badge">${cfg.badge}</span>` : ''}
      </button>
      ${message ? `
        <div class="avatar-bubble">
          <span>${message}</span>
        </div>
      ` : ''}
    </div>
  `;
}

export function getMascotReaction(isCorrect, consecutiveCorrect = 0) {
  if (isCorrect) {
    if (consecutiveCorrect >= 5) return 'celebrating';
    if (consecutiveCorrect >= 3) return 'excited';
    return 'happy';
  }
  return 'encouraging';
}
