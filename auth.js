/* ==========================================================================
   Jukeboxd — auth.js  (login.html / register.html)
   Front-end only validation; real auth happens against the Phoenix API.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      ok = validateField(email, v => /\S+@\S+\.\S+/.test(v), 'Informe um e-mail válido.') && ok;
      ok = validateField(password, v => v.length >= 6, 'A senha precisa ter ao menos 6 caracteres.') && ok;
      if (!ok) return;
      showToast('Entrando…');
      setTimeout(() => { window.location.href = 'index.html'; }, 500);
    });

    const guestBtn = document.getElementById('guest-btn');
    guestBtn?.addEventListener('click', () => { window.location.href = 'index.html'; });
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      const name = document.getElementById('name');
      const handle = document.getElementById('handle');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      ok = validateField(name, v => v.trim().length >= 2, 'Digite seu nome.') && ok;
      ok = validateField(handle, v => /^@?[a-zA-Z0-9_.]{3,20}$/.test(v), 'Use de 3 a 20 letras, números, "." ou "_".') && ok;
      ok = validateField(email, v => /\S+@\S+\.\S+/.test(v), 'Informe um e-mail válido.') && ok;
      ok = validateField(password, v => v.length >= 6, 'A senha precisa ter ao menos 6 caracteres.') && ok;
      if (!ok) return;
      showToast('Conta criada! Redirecionando…');
      setTimeout(() => { window.location.href = 'index.html'; }, 600);
    });
  }

  function validateField(input, test, message) {
    const errorEl = document.getElementById(input.id + '-error');
    const valid = test(input.value.trim());
    if (errorEl) errorEl.textContent = valid ? '' : message;
    input.style.borderColor = valid ? '' : 'var(--coral)';
    return valid;
  }
});
