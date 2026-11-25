function renderRoute(focus = true) {
  let route = currentRoute();
  let owner = routeOwner(route);
  if (!Object.hasOwn(pagePaths, owner)) {
    route = ownRoute;
    owner = ownRoute;
  }
  // Support bookmarks from the earlier single-file edition.
  if (owner !== ownRoute) {
    location.replace(routeHref(route));
    return;
  }
  drawer(false);
  renderPage(route.split('/'));
  if (focus) {
    window.scrollTo(0, 0);
    $('main').focus({preventScroll:true});
  }
}

loadRows();
storageLabel();
renderRoute(false);
window.addEventListener('hashchange', () => renderRoute());
window.addEventListener('pageshow', event => {
  if (event.persisted) {
    loadRows();
    if (!ownRoute.startsWith('temat/') || !document.getElementById('assessment')) renderRoute(false);
  }
});
window.addEventListener('storage', event => {
  if (event.key === key || event.key === null) {
    loadRows();
    if (!ownRoute.startsWith('temat/') && !['sprawy', 'testy'].includes(ownRoute)) renderRoute(false);
  }
  if (['sprawy', 'wyniki'].includes(ownRoute) &&
      (event.key === null || event.key?.startsWith(investigationPrefix))) {
    if (ownRoute === 'sprawy' && currentRoute() !== 'sprawy' && event.key !== null &&
        event.key !== investigationPrefix + currentRoute().split('/')[1]) return;
    renderRoute(false);
  }
});
