/* ============================================================
   nav.js — Comportamento da navegação
   
   1. Adiciona classe .scrolled quando o usuário rola (fundo blur)
   2. Fecha menu mobile ao clicar nos links
   3. Smooth scroll para as âncoras
============================================================ */

const nav      = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelectorAll('.nav__links a');

// --- 1. Detecta scroll e aplica fundo escurecido ---
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Adiciona classe ao rolar mais de 60px
  nav.classList.toggle('scrolled', scrollY > 60);

  // Esconde nav ao rolar rápido para baixo (mobile UX)
  if (scrollY > lastScrollY + 10 && scrollY > 200) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }

  lastScrollY = scrollY;
}, { passive: true });

// Transição suave do hide/show
nav.style.transition = 'transform 400ms cubic-bezier(0.19,1,0.22,1), background 400ms, backdrop-filter 400ms';

// --- 2. Toggle menu mobile ---
let menuOpen = false;

navToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  const links = document.querySelector('.nav__links');
  
  if (menuOpen) {
    // Abre menu: exibe links com animação
    links.style.cssText = `
      display: flex;
      flex-direction: column;
      position: fixed;
      inset: 0;
      background: rgba(13,11,9,.97);
      align-items: center;
      justify-content: center;
      gap: 2rem;
      backdrop-filter: blur(20px);
      z-index: 99;
      font-size: 1.5rem;
    `;
    // Anima o ícone de hambúrguer → X
    navToggle.children[0].style.transform = 'translateY(7px) rotate(45deg)';
    navToggle.children[1].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    links.removeAttribute('style');
    navToggle.children[0].style.transform = '';
    navToggle.children[1].style.transform = '';
  }
});

// Fecha o menu ao clicar em um link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (menuOpen) navToggle.click();
  });
});
