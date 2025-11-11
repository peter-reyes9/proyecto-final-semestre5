// p9.script.js — mejoras: validaciones, cierre con Escape, overlay y manejo seguro de elementos
const sidebar = document.getElementById('sidebar');
const hamb = document.querySelector('.hamburger');
const overlay = document.querySelector('.overlay');

// Si existe el botón hamburguesa, enlazamos comportamientos.
if (hamb) {
  // Usar la referencia de sidebar solo si existe para evitar errores
  const safeSidebar = sidebar || null;

  hamb.addEventListener('click', () => {
    if (!safeSidebar) return;
    const opened = safeSidebar.classList.toggle('open');
    hamb.classList.toggle('open');
    hamb.setAttribute('aria-expanded', opened ? 'true' : 'false');
    // Actualizar atributo del overlay para accesibilidad
    if (overlay) overlay.setAttribute('aria-hidden', opened ? 'false' : 'true');
  });

  // Cerrar sidebar al hacer clic en un enlace (útil en móvil)
  if (safeSidebar) {
    const links = safeSidebar.querySelectorAll('a');
    links.forEach(a => a.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        safeSidebar.classList.remove('open');
        hamb.classList.remove('open');
        hamb.setAttribute('aria-expanded', 'false');
        if (overlay) overlay.setAttribute('aria-hidden', 'true');
      }
    }));
  }

  // Permitir cerrar con la tecla Escape por accesibilidad
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && safeSidebar && safeSidebar.classList.contains('open')) {
      safeSidebar.classList.remove('open');
      hamb.classList.remove('open');
      hamb.setAttribute('aria-expanded', 'false');
      if (overlay) overlay.setAttribute('aria-hidden', 'true');
    }
  });

  // Cerrar el sidebar al hacer clic en el overlay (clic fuera)
  if (overlay) {
    overlay.addEventListener('click', () => {
      if (!safeSidebar) return;
      safeSidebar.classList.remove('open');
      hamb.classList.remove('open');
      hamb.setAttribute('aria-expanded', 'false');
      overlay.setAttribute('aria-hidden', 'true');
    });
  }

} else {
  // Si no existe el botón, aseguramos que el sidebar no quede abierto por error
  if (sidebar && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
}

// --- BÚSQUEDA / FILTRADO de tarjetas en la página de lenguajes ---
(function setupLanguageSearch(){
  const search = document.getElementById('lang-search');
  const clear = document.getElementById('lang-clear');
  const cards = Array.from(document.querySelectorAll('.cards-container .card'));
  if (!search || cards.length === 0) return;

  function filterCards(){
    const q = search.value.trim().toLowerCase();
    cards.forEach(card => {
      const text = (card.textContent || '').toLowerCase();
      const match = q === '' || text.indexOf(q) !== -1;
      card.style.display = match ? '' : 'none';
    });
  }

  search.addEventListener('input', filterCards);
  clear && clear.addEventListener('click', () => { search.value = ''; search.focus(); filterCards(); });
})();
