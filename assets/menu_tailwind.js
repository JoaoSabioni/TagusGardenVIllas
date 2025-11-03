(function(){
  function ready(fn){ if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  function isDesktop(){ return window.matchMedia('(min-width: 768px)').matches; }
  ready(function(){
    var btn = document.querySelector('button.hamburger');
    var drawer = document.getElementById('mobile-drawer');
    var overlay = document.getElementById('drawer-overlay');

    function openDrawer(){
      if (!drawer) return;
      drawer.classList.remove('translate-x-full');
      drawer.classList.add('translate-x-0');
      if (overlay){
        overlay.classList.remove('opacity-0','pointer-events-none');
        overlay.classList.add('opacity-100','pointer-events-auto');
      }
      document.documentElement.classList.add('overflow-hidden');
      if (btn) btn.setAttribute('aria-expanded','true');
    }
    function closeDrawer(){
      if (!drawer) return;
      drawer.classList.add('translate-x-full');
      drawer.classList.remove('translate-x-0');
      if (overlay){
        overlay.classList.add('opacity-0','pointer-events-none');
        overlay.classList.remove('opacity-100','pointer-events-auto');
      }
      document.documentElement.classList.remove('overflow-hidden');
      if (btn) btn.setAttribute('aria-expanded','false');
    }
    function toggleDrawer(){
      if (!drawer) return;
      if (drawer.classList.contains('translate-x-full')) openDrawer(); else closeDrawer();
    }

    if (btn){
      btn.addEventListener('click', function(){
        if (isDesktop()) return;
        toggleDrawer();
      });
    }
    if (overlay){
      overlay.addEventListener('click', closeDrawer);
    }
    window.addEventListener('resize', function(){ if (isDesktop()) closeDrawer(); });
    closeDrawer();
  });
})();