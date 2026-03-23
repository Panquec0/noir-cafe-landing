/* ============================================================
   testimonials.js — Slider de depoimentos com auto-play
   
   - Gera os dots dinamicamente baseado no número de slides
   - Avança automaticamente a cada 5s
   - Pausa ao passar o mouse (UX: deixa ler)
   - Dot ativo muda junto com o slide
============================================================ */

const slider    = document.getElementById('testimonialSlider');
const dotsWrap  = document.getElementById('testimonialDots');
const slides    = slider.querySelectorAll('.testimonial');

let current  = 0;
let interval = null;

// --- Cria os dots dinamicamente ---
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
  dot.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(dot);
});

const dots = dotsWrap.querySelectorAll('.dot');

// --- Navega para um slide específico ---
function goTo(index) {
  // Remove active do slide e dot atual
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');

  // Atualiza índice (com wrap circular)
  current = (index + slides.length) % slides.length;

  // Adiciona active no novo
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

// --- Avança para o próximo ---
function next() { goTo(current + 1); }

// --- Auto-play a cada 5s ---
function startAutoPlay() {
  interval = setInterval(next, 5000);
}
function stopAutoPlay() {
  clearInterval(interval);
}

startAutoPlay();

// --- Pausa ao hover ---
slider.addEventListener('mouseenter', stopAutoPlay);
slider.addEventListener('mouseleave', startAutoPlay);

// --- Swipe no mobile ---
let touchStartX = 0;

slider.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

slider.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) { // threshold de 50px
    diff > 0 ? goTo(current + 1) : goTo(current - 1);
  }
}, { passive: true });
