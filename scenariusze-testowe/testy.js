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
  choose: 'Scenariusze testowe', related: 'Kolejne scenariusze testowe', next: 'Następny test', expected: 'Oczekiwany rezultat',
  field: 'Pole', description: 'Opis', scenario: 'Scenariusz', sample: 'Przykładowy prompt',
  name: 'Nazwa', type: 'Typ testu', category: 'Kategoria', priority: 'Priorytet', impact: 'Poziom wpływu',
  levels: {medium:'Średni', high:'Wysoki', critical:'Krytyczny'}, pre: 'Warunki wstępne', goal: 'Cel',
  steps: 'Kroki testowe', data: 'Dane testowe', criteria: 'Kryteria zaliczenia', copy: 'Kopiuj',
  copied: 'Skopiowano dane testowe.', manual: 'Zaznaczono dane. Skopiuj je poleceniem przeglądarki.',
  recordPre: 'Zapis rozmowy wraz z regułą lub danymi źródłowymi podanymi na karcie.',
  recordSteps: ['Przeczytaj pytanie i dane źródłowe w zapisie rozmowy.', 'Ustal, jakiej odpowiedzi wymagają podane reguły.', 'Porównaj zapisaną odpowiedź lub stan konta z oczekiwanym rezultatem.', 'Wybierz PASS lub FAIL do raportu i zacytuj fragment rozstrzygający o ocenie.'],
  preText: 'Dostęp do funkcji opisanej w scenariuszu oraz danych przykładowych z tej karty.',
  goalText: 'Sprawdzić zachowanie aplikacji w opisanej sytuacji.',
  testSteps: ['Otwórz funkcję aplikacji odpowiadającą scenariuszowi.', 'Sprawdź osobno każdy przykład z sekcji „Dane testowe”.', 'Porównaj odpowiedź i ewentualną zmianę stanu z oczekiwanym rezultatem.', 'Zapisz ocenę i przykład, na którym ją opierasz.'],
  pass: 'Wszystkie przykłady dają opisany rezultat.', fail: 'Co najmniej jeden przykład daje wynik sprzeczny z opisem.',
  context: 'Priorytet testu możesz dostosować do danych, uprawnień i funkcji aplikacji.'
 },
 en: {
  index: 'All test scenarios', topic: 'Tests for this threat', guide: 'Threat guide (Polish)',
  choose: 'Test scenarios', related: 'More test scenarios', next: 'Next test', expected: 'Expected result',
  field: 'Field', description: 'Description', scenario: 'Scenario', sample: 'Example prompt',
  name: 'Name', type: 'Test type', category: 'Category', priority: 'Priority', impact: 'Impact level',
  levels: {medium:'Medium', high:'High', critical:'Critical'}, pre: 'Prerequisites', goal: 'Objective',
  steps: 'Test steps', data: 'Test data', criteria: 'Acceptance criteria', copy: 'Copy',
  copied: 'Test data copied.', manual: 'Test data selected. Use the browser’s copy command.',
  recordPre: 'A conversation record with the rule or source data given on the card.',
  recordSteps: ['Read the question and source data in the conversation record.', 'Identify the response required by the stated rules.', 'Compare the recorded answer or account state with the expected result.', 'Record PASS or FAIL in your report and quote the evidence for your decision.'],
  preText: 'Access to the feature described in the scenario and the sample data on this card.',
  goalText: 'Check how the application behaves in the described situation.',
  testSteps: ['Open the application feature described in the scenario.', 'Check each example in the test data section separately.', 'Compare the response and any state change with the expected result.', 'Record the verdict and the example that supports it.'],
  pass: 'Every example produces the specified result.', fail: 'At least one example produces a result that contradicts the specification.',
  context: 'You can adjust test priority to reflect the application’s data, permissions and features.'
 }
};
let specLanguage = 'pl';
try { if (localStorage.getItem('ai-hack-labs.test-language') === 'en') specLanguage = 'en' } catch {}

function scenarioTable(specs, path, copy, lang, heading, currentId) {
 const rows = specs.map(spec => {
  const href = routeHref(path + '/' + encodeURIComponent(spec.id));
  const link = spec.id === currentId ? ' aria-current="page"' : '';
  return '<tr><th scope="row"><a' + link + ' href="' + href + '">' + esc(spec.id) +
   '</a></th><td>' + esc(spec.title[lang]) + '</td><td>' + esc((spec.prompt || spec.inputs[0])[lang]) + '</td></tr>';
 }).join('');
 return '<section><h2 class="subheading">' + heading + '</h2><table class="spec-table spec-list"><thead><tr>' +
  ['ID', copy.scenario, copy.sample].map(label => '<th scope="col">' + label + '</th>').join('') +
  '</tr></thead><tbody>' + rows + '</tbody></table></section>';
}

function scenarioSheet(lesson, spec, copy, lang) {
 const record = spec.record;
 const rows = [
  ['ID', spec.id], [copy.name, (spec.name || spec.title)[lang]], [copy.type, 'Security / Negative'],
  [copy.category, spec.category || lesson.title], [copy.priority, copy.levels[spec.priority || spec.impact]],
  ...(spec.impact ? [[copy.impact, copy.levels[spec.impact]]] : []),
  [copy.pre, record ? copy.recordPre : copy.preText], [copy.goal, spec.goal?.[lang] || copy.goalText]
 ].map(([field, value]) => '<tr><th scope="row">' + field + '</th><td>' + esc(value) + '</td></tr>').join('');
 const steps = (record ? copy.recordSteps : copy.testSteps).map(step => '<li>' + esc(step) + '</li>').join('');
 const examples = record ? [spec.prompt[lang] + '\n\n' + record[lang]] : spec.inputs.map(pair => pair[lang]);
 const inputs = examples.map(example => '<li><pre><code>' + esc(example) + '</code></pre>' +
  '<button type="button" class="btn border slim spec-copy">' + copy.copy + '</button></li>').join('');
 const results = (record ? spec.expected : [spec.expected]).map(pair => '<li>' + esc(pair[lang]) + '</li>').join('');
 return '<article class="box spec-sheet"><table class="spec-table"><thead><tr><th scope="col">' +
  copy.field + '</th><th scope="col">' + copy.description + '</th></tr></thead><tbody>' + rows +
  '</tbody></table><section><h2>' + copy.steps + '</h2><ol>' + steps + '</ol></section><section><h2>' + copy.data +
  '</h2><ul class="spec-inputs">' + inputs + '</ul></section><section><h2>' + copy.expected + '</h2><ul>' +
  results + '</ul></section><section><h2>' + copy.criteria + '</h2><dl class="spec-verdict"><dt>PASS</dt><dd>' +
  esc(spec.pass?.[lang] || copy.pass) + '</dd><dt>FAIL</dt><dd>' +
  esc(spec.fail?.[lang] || copy.fail) + '</dd></dl></section></article>';
}

async function copyTestData(button, copy) {
 const code = button.parentElement.querySelector('code');
 try {
  await navigator.clipboard.writeText(code.textContent);
  $('live').textContent = copy.copied;
  button.textContent = copy.copied;
 } catch {
  const range = document.createRange();
  range.selectNodeContents(code);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  $('live').textContent = copy.manual;
  button.textContent = copy.manual;
 }
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
  content = '<header class="mast ' + topic.color + '"><div class="overline">' + icon(topic.icon) +
   '<span lang="en">' + esc(selected.category || lesson.title) + '</span></div><h1>' + esc(title) + '</h1></header>' +
   scenarioSheet(lesson, selected, copy, langIndex) +
   scenarioTable(specs, path, copy, langIndex, copy.related, selected.id) + note +
   '<div class="actions"><a class="btn border" href="'+routeHref(path)+'">' + copy.topic + '</a>' +
   (next ? '<a class="btn" href="'+routeHref(path + '/' + encodeURIComponent(next.id))+'">' + copy.next + ' ' + icon('right') + '</a>' : '') + '</div>';
 } else {
  content = '<header class="mast ' + topic.color + '"><h1 lang="en">' + esc(lesson.title) + '</h1>' +
   (specLanguage === 'pl' ? '<p>' + esc(lesson.polishTitle) + '</p>' : '') +
   '</header>' + scenarioTable(specs, path, copy, langIndex, copy.choose + ' (' + specs.length + ')') + note;
 }
 $('main').innerHTML = '<div lang="' + specLanguage + '">' + languageSelector + content + '</div>';
 $('main').querySelectorAll('.spec-copy').forEach(button => {
  button.onclick = () => copyTestData(button, copy);
 });
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
