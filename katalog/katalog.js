function renderPage(parts) {
  pageTitle('Katalog zagrożeń');
  renderNav('katalog', Object.hasOwn(topics,parts[1]) ? parts[1] : '');
  renderCatalog(parts, pageIntro);
}
