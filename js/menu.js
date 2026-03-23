/* ============================================================
   menu.js — Dados do cardápio e sistema de tabs
   
   - menuData: fonte de dados dos itens (poderia vir de uma API)
   - renderMenu(): gera os cards dinamicamente via template literal
   - tabs: filtram os itens por categoria com animação de saída/entrada
============================================================ */

// --- Fonte de dados do cardápio ---
const menuData = {
  cafes: [
    {
      emoji: '☕',
      name: 'Espresso Noir',
      desc: 'Blend exclusivo da casa. Corpo intenso, finalização de chocolate amargo.',
      price: 'R$ 8',
    },
    {
      emoji: '🥛',
      name: 'Flat White',
      desc: 'Duplo ristretto com leite vaporizado sedoso. Origem: Cerrado Mineiro.',
      price: 'R$ 14',
    },
    {
      emoji: '❄️',
      name: 'Cold Brew',
      desc: 'Extração a frio por 18h. Notas de caramelo e frutas vermelhas.',
      price: 'R$ 18',
    },
    {
      emoji: '🌿',
      name: 'Matcha Latte',
      desc: 'Matcha cerimonial japonês com leite de aveia. Suave e terroso.',
      price: 'R$ 19',
    },
  ],
  doces: [
    {
      emoji: '🍮',
      name: 'Crème Brûlée',
      desc: 'Clássico francês com baunilha de Madagascar. Casquinha caramelizada na hora.',
      price: 'R$ 22',
    },
    {
      emoji: '🧁',
      name: 'Financier de Café',
      desc: 'Bolinho amanteigado com pó de café especial. Úmido e leve.',
      price: 'R$ 16',
    },
    {
      emoji: '🍫',
      name: 'Tarte au Chocolat',
      desc: 'Ganache de chocolate 70% com flor de sal. Massa folhada artesanal.',
      price: 'R$ 24',
    },
    {
      emoji: '🥐',
      name: 'Croissant da Casa',
      desc: 'Folhado em manteiga francesa. Assado pela manhã, servido quente.',
      price: 'R$ 14',
    },
  ],
  especiais: [
    {
      emoji: '🌍',
      name: 'Café do Mês',
      desc: 'Etiópia Yirgacheffe, processo natural. Jasmim, pêssego e bergamota.',
      price: 'R$ 26',
    },
    {
      emoji: '🍯',
      name: 'Honey Process',
      desc: 'Bourbon amarelo de Minas. Mel, tangerina e chocolate ao leite.',
      price: 'R$ 22',
    },
    {
      emoji: '🧊',
      name: 'Espresso Tônica',
      desc: 'Ristretto sobre água tônica e gelo. Cítrico, refrescante e complexo.',
      price: 'R$ 20',
    },
    {
      emoji: '🫖',
      name: 'Pour Over',
      desc: 'Método Hario V60. Extração precisa que revela terroir do grão.',
      price: 'R$ 28',
    },
  ],
};

// --- Renderiza os cards no grid ---
function renderMenu(category) {
  const grid = document.getElementById('menuGrid');
  const items = menuData[category];

  // Animação de saída antes de trocar
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(12px)';

  setTimeout(() => {
    // Gera HTML via template literal
    grid.innerHTML = items.map(item => `
      <div class="menu-card">
        <span class="menu-card__emoji">${item.emoji}</span>
        <h3 class="menu-card__name">${item.name}</h3>
        <p class="menu-card__desc">${item.desc}</p>
        <span class="menu-card__price">${item.price}</span>
      </div>
    `).join('');

    // Animação de entrada
    grid.style.transition = 'opacity 400ms ease, transform 400ms ease';
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';

    // Ativa o reveal escalonado nos novos cards
    if (typeof window.observeCards === 'function') {
      window.observeCards();
    }
  }, 250); // delay = tempo da animação de saída
}

// --- Sistema de tabs ---
const tabs = document.querySelectorAll('.tab');
let activeTab = 'cafes';

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.tab;
    if (category === activeTab) return; // sem re-render desnecessário

    // Remove .active de todas, adiciona na clicada
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    activeTab = category;
    renderMenu(category);
  });
});

// --- Renderiza categoria inicial ---
renderMenu('cafes');
