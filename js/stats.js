/* ============================================================
   stats.js — Animação de contagem nos números da seção "Sobre"
   
   Usa IntersectionObserver para disparar quando a seção entra
   no viewport. Anima de 0 até o valor-alvo (data-target) em
   ~1.5s com easing suave.
============================================================ */

const statNums = document.querySelectorAll('.stat__num');

// --- Função de easing: desacelera no final ---
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

// --- Anima um número de 0 até target ---
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1500; // ms
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easeOutQuart(progress);

    el.textContent = Math.round(eased * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target; // garante valor exato no final
    }
  }

  requestAnimationFrame(update);
}

// --- Dispara ao entrar no viewport ---
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target); // apenas 1 vez
      }
    });
  },
  { threshold: 0.5 } // dispara quando 50% do número está visível
);

statNums.forEach(num => statsObserver.observe(num));
