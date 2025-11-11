document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (statusEl) {
      statusEl.textContent = 'A enviar...';
      statusEl.className = 'text-xs text-gray-400';
    }

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/.netlify/functions/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        if (statusEl) {
          statusEl.textContent = 'Mensagem enviada com sucesso.';
          statusEl.className = 'text-xs text-emerald-400';
        }
        form.reset();
      } else {
        if (statusEl) {
          statusEl.textContent = 'Não foi possível enviar agora.';
          statusEl.className = 'text-xs text-red-400';
        }
      }
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = 'Erro de ligação ao servidor.';
        statusEl.className = 'text-xs text-red-400';
      }
    }
  });
});
