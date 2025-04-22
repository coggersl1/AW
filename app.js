const COLORS = ['#00f6ff', '#ffffff']; // Electric blue and white
let colorIndex = 0;
const TRAIL_LIFETIME = 250; // ms, matches CSS transition

document.addEventListener('mousemove', (e) => {
  const dot = document.createElement('div');
  dot.className = 'trail-dot';
  dot.style.color = COLORS[colorIndex];
  dot.style.left = `${e.clientX - 5}px`;
  dot.style.top = `${e.clientY - 5}px`;

  document.body.appendChild(dot);

  // Force reflow to ensure transition works
  void dot.offsetWidth;
  dot.style.opacity = '6';

  setTimeout(() => {
    dot.remove();
  }, TRAIL_LIFETIME);

  colorIndex = (colorIndex + 1) % COLORS.length;
});
