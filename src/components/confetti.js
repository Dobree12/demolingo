// ============================================
// Confetti Component — Celebration effects
// ============================================

const COLORS = ['#58CC02', '#CE82FF', '#FF9600', '#1CB0F6', '#FF4B4B', '#FFC800', '#89E219'];

export function launchConfetti(intensity = 'normal') {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  
  const count = intensity === 'high' ? 80 : intensity === 'low' ? 20 : 40;
  
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    piece.style.width = (Math.random() * 8 + 5) + 'px';
    piece.style.height = (Math.random() * 8 + 5) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    piece.style.animationDelay = (Math.random() * 0.5) + 's';
    piece.style.opacity = Math.random() * 0.5 + 0.5;
    
    container.appendChild(piece);
    
    setTimeout(() => piece.remove(), 4000);
  }
}

export function launchStars(count = 5) {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.textContent = '⭐';
    star.style.cssText = `
      position: absolute;
      font-size: ${Math.random() * 20 + 20}px;
      left: ${Math.random() * 80 + 10}%;
      top: ${Math.random() * 40 + 20}%;
      animation: popIn 0.5s ease forwards;
      animation-delay: ${i * 0.15}s;
      opacity: 0;
      pointer-events: none;
    `;
    container.appendChild(star);
    setTimeout(() => star.remove(), 2000);
  }
}
