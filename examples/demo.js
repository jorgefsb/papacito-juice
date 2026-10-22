// Demo wiring. The profile checks the installation, the page owns its actions.
(function () {
  'use strict';
  const doc = document.documentElement;
  const cursorStatus = document.getElementById('cursor-status');
  const mokiStatus = document.getElementById('moki-status');

  window.papacitoReady = PapacitoJuice.mount({ page: 'page' }).then(profile => {
    const paint = () => {
      const s = PapacitoJuice.current.cursor.stats;
      cursorStatus.textContent = 'Juega: ' + s.juiceLevel + ' · cursor: ' + s.intensity + ' (' + s.layer + (s.radius ? ', ' + s.radius + ' px' : '') + ')';
      mokiStatus.textContent = 'Mokis de hoy: ' + Moki.found().length + ' de ' + profile.poses.length;
    };
    new MutationObserver(paint).observe(doc, { attributes: true, attributeFilter: ['data-jz-level'] });
    document.addEventListener('click', () => setTimeout(paint, 0));
    paint();
    return profile;
  }, error => {
    // An incomplete install says so on the page. It is not a Papacito Juice page.
    cursorStatus.textContent = error.message;
    throw error;
  });

  const form = document.getElementById('note-form');
  const note = document.getElementById('note');
  const noteStatus = document.getElementById('note-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!note.value.trim()) {
      noteStatus.textContent = '';
      JZ.play('jz-error', note);
      return;
    }
    noteStatus.classList.remove('is-error');
    noteStatus.textContent = 'Nota guardada: ' + note.value.trim();
    JZ.play('impact+burst+moki-hop+success', document.getElementById('save'));
  });
})();
