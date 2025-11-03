// Abre/fecha o menu apenas em mobile
(function () {
  function ready(fn){ if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var btn = document.querySelector('.hamburger');
    // Dá prioridade a #site-nav; senão, usa o primeiro .mobile-collapsible
    var nav = document.getElementById('site-nav') || document.querySelector('.mobile-collapsible');
    if (!btn || !nav) return;
    btn.addEventListener('click', function(){
      var isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
})();