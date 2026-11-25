function caseIndex() {
 const groups = [['Łatwa','Łatwe'], ['Średnia','Średnie'], ['Trudna','Trudne']];
 const sections = groups.map(([level, title]) => {
  const items = investigations.filter(item => item.level === level);
  const cards = items.map(item => {
   const result = readCaseResult(item), passed = caseSolved(item, result);
   const status = passed ? 'Rozwiązana' : result ? 'Do powtórki' : 'Do zbadania';
   return '<a class="case-entry" href="'+routeHref('#sprawy/' + item.id)+'"><div><h3>' + esc(item.title) +
    '</h3><p>' + esc(item.report) + '</p></div><span class="case-status' + (passed ? ' done' : '') +
    '">' + icon(passed ? 'check' : 'right') + status + '</span></a>';
  }).join('');
  return '<section class="case-group"><h2>' + title + ' <span class="caption">(' + items.length +
   ')</span></h2><div class="case-entries">' + cards + '</div></section>';
 }).join('');
 $('main').innerHTML = pageIntro +
  '<p class="case-progress">' + icon('check') + 'Rozwiązane sprawy <strong>' + caseProgress() +
  ' / ' + investigations.length + '</strong></p>' + sections;
}

function investigationFeedback(item, result) {
 const passed = caseSolved(item, result);
 const correctAnswer = result.answer === item.answer;
 const feedbackTitle = passed ? 'Sprawa rozwiązana' : correctAnswer ? 'Wniosek trafny. Sprawdź dowody.' : 'Wróć do dziennika';
 const evidence = item.evidence.map(([question, n], i) =>
  '<li>' + (result.entries[i] === n ? 'Trafnie wskazany wpis ' + n :
   'Twój wybór to wpis ' + result.entries[i] + '. Właściwy wpis to ' + n) +
  ' · ' + esc(item.events[n-1][0]) + '.</li>').join('');
 const next = investigations[investigations.indexOf(item) + 1];
 const topic = byId.get(item.lesson);
 return '<section tabindex="-1" class="feedback case-feedback' + (passed ? '' : ' retry') +
  '"><h2>' + esc(feedbackTitle) + '</h2><p><strong>Wniosek:</strong> ' + esc(item.choices[item.answer]) +
  '</p><p>' + esc(item.reasoning) + '</p><ul>' + evidence + '</ul><h3>Co pozostaje niewiadome?</h3><p>' +
  esc(item.limit) + '</p><h3>Co możesz zrobić jako użytkownik?</h3><p>' + esc(item.userAction) +
  '</p><h3>Co sprawdzić po stronie aplikacji?</h3><p>' + esc(item.follow) +
  '</p><p class="case-topic">Powiązana lekcja · <a href="'+routeHref('#temat/' + topic.id)+'" lang="en">' + esc(topic.title) +
  '</a></p><div class="actions">' + (passed ? '' : '<button type="button" id="case-retry" class="btn slim">Spróbuj ponownie</button>') +
  (next ? '<a class="btn border slim" href="'+routeHref('#sprawy/' + next.id)+'">Następna sprawa</a>' :
   '<a class="btn border slim" href="'+routeHref('#sprawy')+'">Wszystkie sprawy</a>') + '</div></section>';
}

function caseExercise(item, retry = false) {
 const saved = retry ? null : readCaseResult(item);
 const events = item.events.map(([label, text], i) => ({ number:i + 1, label, text }));
 const choices = item.choices.map((choice, i) =>
  '<label class="opt"><input required type="radio" name="diagnosis" value="' + i + '"' +
  (saved?.answer === i ? ' checked' : '') + '>' + esc(choice) + '</label>').join('');
 const fields = item.evidence.map(([question], i) =>
  '<div class="evidence-field"><label for="clue-' + i + '">' + esc(question) + '</label><select required id="clue-' +
  i + '"><option value="">Wybierz wpis z dziennika</option>' + events.map(event =>
   '<option value="' + event.number + '"' + (saved?.entries[i] === event.number ? ' selected' : '') +
   '>Wpis ' + event.number + ' · ' + esc(event.label) + '</option>').join('') + '</select></div>').join('');
 $('main').innerHTML = '<a href="'+routeHref('#sprawy')+'" class="back">' + icon('left') + 'Sprawy do zbadania</a>' +
  '<header class="mast"><div class="overline">' + icon('search') + esc(item.level) + ' · symulacja</div><h1>' +
  esc(item.title) + '</h1><p>' + esc(item.report) + '</p></header>' +
  '<article class="box case-file"><div class="rule"><b>Reguła aplikacji</b>' + esc(item.rule) + '</div>' +
  '<section class="sectionblock"><h2>' + icon('list') + 'Dziennik zdarzeń (' + events.length + ')</h2>' + journalIntro(item.journalGuide) +
  '<dl class="trace">' + renderTraceRows(events) + '</dl></section>' +
  '<form id="case-assessment"><fieldset' + (saved ? ' disabled' : '') +
  '><legend>Który wniosek wynika z dziennika?</legend><div class="optlist">' + choices + '</div>' + fields +
  '</fieldset>' + (saved ? '' : '<div class="actions"><button class="btn" type="submit">' + icon('check') +
  'Sprawdź rozwiązanie</button></div>') + '</form><div id="case-response">' +
  (saved ? investigationFeedback(item, saved) : '') + '</div></article>';
 function bindRetry() {
  const button = $('case-retry');
  if (button) button.onclick = () => {
   caseExercise(item, true);
   $('case-assessment').querySelector('input').focus();
  };
 }
 bindRetry();
 if (saved) return;
 const form = $('case-assessment');
 form.onsubmit = event => {
  event.preventDefault();
  if (form.querySelector('fieldset').disabled || !form.reportValidity()) return;
  const answer = Number(form.querySelector('input:checked').value);
  const entries = item.evidence.map((_, i) => Number($('clue-' + i).value));
  rememberCase(item, {answer, entries});
  caseExercise(item);
  $('case-response').firstElementChild.focus();
 };
}

function renderPage(parts) {
  pageTitle('Sprawy do zbadania');
  renderNav('sprawy');
  const item = investigations.find(item => item.id === parts[1]);
  if (item) {
    document.title = item.title + ' · AI Hack Labs';
    caseExercise(item);
  } else {
    caseIndex();
  }
}
