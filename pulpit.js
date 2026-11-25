const homeHero = document.querySelector('.hero').outerHTML;

function renderPage(parts) {
  pageTitle('Pulpit');
  renderNav('pulpit');
  renderCatalog(parts, homeHero + stats());
  if (rows.length) {
    const link = document.querySelector('.hero .actions a');
    const complete = learned().size === totalScenes;
    link.href = routeHref(nextScene());
    link.innerHTML = icon(complete ? 'book' : 'play') + (complete ? 'Przejrzyj katalog' : 'Kontynuuj naukę');
  }
}
