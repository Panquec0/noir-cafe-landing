/* ============================================================
   form.js — Validação e feedback do formulário de reserva
   
   - Validação inline com feedback visual
   - Submit com simulação de loading + confirmação animada
   - Reseta o formulário após sucesso
============================================================ */

const form = document.getElementById('contactForm');
const submitBtn = form.querySelector('[type="submit"]');

// --- Valida um campo e exibe feedback ---
function validateField(input) {
  const valid = input.checkValidity() && input.value.trim() !== '';
  const group = input.closest('.form-group');

  // Remove estado anterior
  group.classList.remove('valid', 'invalid');

  if (input.value.trim() !== '') {
    group.classList.add(valid ? 'valid' : 'invalid');
  }

  return valid;
}

// --- Adiciona estilos de validação ao CSS dinamicamente ---
const validationStyles = document.createElement('style');
validationStyles.textContent = `
  .form-group.valid   input,
  .form-group.valid   select { border-color: #6fba7f; }
  .form-group.invalid input,
  .form-group.invalid select { border-color: #c97070; }
  
  /* Ícone de check/erro no label */
  .form-group.valid   label::after { content: ' ✓'; color: #6fba7f; }
  .form-group.invalid label::after { content: ' ✗'; color: #c97070; }

  /* Botão em estado de loading */
  .btn--loading {
    pointer-events: none;
    opacity: .7;
    position: relative;
  }
  .btn--loading::after {
    content: '';
    position: absolute;
    right: 1.5rem;
    top: 50%;
    width: 16px; height: 16px;
    border: 2px solid rgba(0,0,0,.3);
    border-top-color: rgba(0,0,0,.8);
    border-radius: 50%;
    transform: translateY(-50%);
    animation: spin 600ms linear infinite;
  }

  /* Mensagem de sucesso */
  .form-success {
    text-align: center;
    padding: 3rem 2rem;
    animation: fadeUp 600ms ease forwards;
  }
  .form-success__icon { font-size: 3rem; margin-bottom: 1rem; }
  .form-success__title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    color: var(--clr-white);
    margin-bottom: .5rem;
  }
  .form-success__sub { color: var(--clr-muted); }
`;
document.head.appendChild(validationStyles);

// --- Validação em tempo real (blur) ---
form.querySelectorAll('input, select').forEach(input => {
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => validateField(input));
});

// --- Submit ---
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Valida todos os campos
  const inputs  = [...form.querySelectorAll('input, select')];
  const allValid = inputs.every(validateField);

  if (!allValid) {
    // Chacoalha o formulário para chamar atenção
    form.style.animation = 'none';
    form.offsetHeight; // reflow
    form.style.animation = 'shake 400ms ease';
    return;
  }

  // --- Simula envio --- (substitua por fetch real à sua API)
  submitBtn.textContent = 'Enviando…';
  submitBtn.classList.add('btn--loading');

  await new Promise(resolve => setTimeout(resolve, 1800)); // delay simulado

  // Exibe mensagem de sucesso
  form.innerHTML = `
    <div class="form-success">
      <div class="form-success__icon">☕</div>
      <h3 class="form-success__title">Reserva confirmada!</h3>
      <p class="form-success__sub">
        Você receberá um e-mail de confirmação em breve.<br/>
        Aguardamos você com um café especial.
      </p>
    </div>
  `;
});

// --- Keyframe de shake (injetado junto com os outros estilos) ---
validationStyles.textContent += `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-8px); }
    40%      { transform: translateX(8px); }
    60%      { transform: translateX(-5px); }
    80%      { transform: translateX(5px); }
  }
`;
