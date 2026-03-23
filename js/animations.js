/* ============================================================
   animations.js — Reveal ao scroll com IntersectionObserver
   
   Observa todos os elementos com .reveal-up e .reveal-left.
   Quando entram no viewport, adiciona .visible — o CSS cuida
   da transição (opacity + transform).
   
   IntersectionObserver é mais performático que scroll events:
   roda fora da thread principal e não bloqueia renderização.
============================================================ */

// --- Configuração do observer ---
const observerOptions = {
  root: null,          // viewport como root
  rootMargin: '0px',   // sem margem extra
  threshold: 0.12,     // dispara quando 12% do elemento está visível
};

// --- Callback: chamado quando elementos entram/saem do viewport ---
const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // observa apenas 1 vez
    }
  });
};

// --- Cria e inicia o observer ---
const revealObserver = new IntersectionObserver(revealCallback, observerOptions);

// Seleciona todos os elementos animados
document.querySelectorAll('.reveal-up, .reveal-left').forEach(el => {
  revealObserver.observe(el);
});

// --- Aplica reveal-up nas seções automaticamente ---
// (para não precisar colocar a classe em cada elemento do HTML)
const autoReveal = document.querySelectorAll(
  '.about__text, .about__image-wrap, .menu__header, .contact__info, .contact__form, .ambient__header'
);

autoReveal.forEach((el, i) => {
  el.classList.add('reveal-up');
  el.style.setProperty('--delay', `${i * 0.1}s`);
  revealObserver.observe(el);
});

// --- Cards do menu: stagger ao aparecer ---
// (chamado pelo menu.js após renderizar os cards)
window.observeCards = () => {
  document.querySelectorAll('.menu-card').forEach((card, i) => {
    card.classList.add('reveal-up');
    card.style.setProperty('--delay', `${i * 0.08}s`);
    revealObserver.observe(card);
  });
};
