function showTestIndex() {
 const total = library.reduce((sum, lesson) => sum + lesson.tests.length, 0);
 const sections = stages.map(stage => {
  const links = stage.lessons.map(lesson => {
   return '<a class="case-entry test-link" href="'+routeHref('#testy/' + lesson.id)+'"><div><h3 lang="en">' +
    esc(lesson.title) + '</h3><p>' + esc(lesson.polishTitle) + '</p></div><span class="case-status">' +
    'Scenariusze testowe (' + lesson.tests.length + ') ' + icon('right') + '</span></a>';
  }).join('');
  return '<section class="case-group"><h2>' + esc(stage.title) + '</h2><div class="case-entries">' +
   links + '</div></section>';
 }).join('');
 $('main').innerHTML = pageIntro +
  '<p class="caption">' + library.length + ' zagrożeń · ' + total + ' scenariuszy testowych</p>' + sections;
}
const specCopy = {
 pl: {
  index: 'Wszystkie scenariusze testowe', topic: 'Testy tego zagrożenia', guide: 'Przewodnik po zagrożeniu',
  choose: 'Wybierz scenariusz', next: 'Następny test', expected: 'Oczekiwany rezultat',
  payloads: 'Przykładowe payloady', impact: {medium:'Średni', high:'Wysoki', critical:'Krytyczny'},
  context: 'Scenariusze nie są uniwersalne. Oczekiwany rezultat i poziom wpływu zależą od danych, uprawnień użytkownika i funkcji konkretnej aplikacji.'
 },
 en: {
  index: 'All test scenarios', topic: 'Tests for this threat', guide: 'Threat guide (Polish)',
  choose: 'Choose a scenario', next: 'Next test', expected: 'Expected result',
  payloads: 'Example payloads', impact: {medium:'Medium', high:'High', critical:'Critical'},
  context: 'These scenarios are not universal. The expected result and impact level depend on the application’s data, user permissions and capabilities.'
 }
};
let specLanguage = 'pl';
try { if (localStorage.getItem('ai-hack-labs.test-language') === 'en') specLanguage = 'en' } catch {}

function impactLabel(spec, copy) {
 return '<span class="test-impact ' + spec.impact + '">' + copy.impact[spec.impact] + '</span>';
}

function showTestTopic(lesson, requestedId) {
 const specs = lesson.tests;
 const selected = specs.find(spec => encodeURIComponent(spec.id) === requestedId);
 const path = '#testy/' + lesson.id;
 const copy = specCopy[specLanguage];
 const langIndex = specLanguage === 'en' ? 1 : 0;
 const topic = topics[lesson.topic];
 const nav = '<nav class="lesson-links" aria-label="' + copy.index + '"><a class="back" href="'+routeHref('#testy')+'">' +
  icon('left') + copy.index + '</a>' + (selected ? '<a class="back" href="'+routeHref(path)+'">' + copy.topic + '</a>' : '') +
  '<a class="back" href="'+routeHref('#temat/' + lesson.id)+'">' + icon('book') + copy.guide + '</a></nav>';
 const languageSelector = '<div class="spec-toolbar">' + nav +
  '<label class="spec-language" for="spec-language"><span lang="pl">Język kart</span> / <span lang="en">Card language</span>' +
  '<select id="spec-language"><option value="pl" lang="pl">Polski</option><option value="en" lang="en">English</option></select></label></div>';
 const note = '<p class="spec-context">' + esc(copy.context) + '</p>';
 let content;
 if (selected) {
  const title = selected.id + ' – ' + selected.title[langIndex];
  document.title = title + ' · AI Hack Labs';
  const next = specs[specs.indexOf(selected) + 1];
  const inputs = selected.inputs.map(pair => '<li><pre><code>' + esc(pair[langIndex]) + '</code></pre></li>').join('');
  content = '<header class="mast ' + topic.color + '"><div class="overline">' + icon(topic.icon) +
   '<span lang="en">' + esc(lesson.title) + '</span></div><h1>' + esc(title) + '</h1>' + impactLabel(selected, copy) +
   '</header><article class="box spec-sheet" aria-label="' + esc(title) +
   '"><section><h2>' + copy.payloads + '</h2><ol class="spec-inputs">' + inputs +
   '</ol></section><section class="spec-result"><h2>' + copy.expected + '</h2><p>' +
   esc(selected.expected[langIndex]) + '</p></section></article>' + note +
   '<div class="actions"><a class="btn border" href="'+routeHref(path)+'">' + copy.topic + '</a>' +
   (next ? '<a class="btn" href="'+routeHref(path + '/' + encodeURIComponent(next.id))+'">' + copy.next + ' ' + icon('right') + '</a>' : '') + '</div>';
 } else {
  const cards = specs.map(spec =>
   '<a class="spec-choice" href="'+routeHref(path + '/' + encodeURIComponent(spec.id))+'"><div class="spec-meta"><span class="caption">' +
   esc(spec.id) + '</span>' + impactLabel(spec, copy) + '</div><h3>' + esc(spec.title[langIndex]) + '</h3></a>'
  ).join('');
  content = '<header class="mast ' + topic.color + '"><h1 lang="en">' + esc(lesson.title) + '</h1>' +
   (specLanguage === 'pl' ? '<p>' + esc(lesson.polishTitle) + '</p>' : '') +
   '</header><section><h2 class="subheading">' + copy.choose + ' (' + specs.length +
   ')</h2><div class="spec-grid">' + cards + '</div></section>' + note;
 }
 $('main').innerHTML = '<div lang="' + specLanguage + '">' + languageSelector + content + '</div>';
 const selector = $('spec-language');
 selector.value = specLanguage;
 selector.onchange = () => {
  specLanguage = selector.value;
  try { localStorage.setItem('ai-hack-labs.test-language', specLanguage) } catch {}
  showTestTopic(lesson, requestedId);
  $('spec-language').focus({preventScroll:true});
 };
}

function renderPage(parts) {
  const lesson = byId.get(parts[1]);
  pageTitle(lesson ? 'Scenariusze testowe · ' + lesson.title : 'Scenariusze testowe');
  renderNav('testy');
  if (lesson) showTestTopic(lesson, parts[2]);
  else showTestIndex();
}
