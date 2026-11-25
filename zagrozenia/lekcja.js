const guideContent = document.getElementById("guide-content").innerHTML;

function lessonHeader(c,scenes){
 const t=topics[c.topic];
 const stage=stages.find(group=>group.lessons.includes(c));
 const stageBack='<a href="'+routeHref('#plan/'+stage.number)+'" class="back">'+icon('left')+'Tematy etapu '+stage.number+'</a>';
 const testLink='<a href="'+routeHref('#testy/'+c.id)+'">'+icon('list')+'Scenariusze testowe ('+c.tests.length+')</a>';
 return '<nav class="lesson-links" aria-label="Nawigacja lekcji">'+stageBack+'<a href="'+routeHref('#katalog')+'" class="back">Katalog zagrożeń</a></nav><header class="mast '+t.color+'"><div class="overline">'+icon(t.icon)+lessonLabel(c)+' · '+esc(t.name)+'</div><h1 lang="en">'+esc(c.title)+'</h1><p><strong>'+esc(c.polishTitle)+'.</strong> '+esc(c.short)+'</p></header><nav class="tabs" aria-label="Części tematu"><a href="'+routeHref('#temat/'+c.id)+'" class="'+(!scenes?'active':'')+'" '+(!scenes?'aria-current="page"':'')+'>'+icon('book')+'Przewodnik</a><a href="'+routeHref(sceneLink(c.id))+'" class="'+(scenes?'active':'')+'" '+(scenes?'aria-current="page"':'')+'>'+icon('flask')+'Ćwiczenia ('+c.scenes.length+')</a>'+testLink+'</nav>';
}
function scenePicker(c,selected=-1,expanded=[]){
 const done=learned();
 const groups=levels.map(level=>{
  const items=c.scenes.slice(level.start,level.end);
  const count=items.filter((_,n)=>done.has(c.id+'/'+(level.start+n))).length;
  const entries=items.map((scene,n)=>{
   const i=level.start+n,active=i===selected;
   return '<a class="entry '+(active?'selected':'')+'" '+(active?'aria-current="step"':'')+
    ' href="'+routeHref(sceneLink(c.id,i))+'"><span class="mark">'+String(i+1).padStart(2,'0')+'</span><div><small>'+
    (done.has(c.id+'/'+i)?'Opanowany':'Scenariusz')+'</small><strong>'+esc(scene.name)+'</strong></div>'+
    icon(active?'check':'right')+'</a>';
  }).join('');
  return '<details class="level-group '+level.key+'" data-level="'+level.key+'" '+(expanded.includes(level.key)?'open':'')+
   '><summary><strong>'+level.title+'</strong><span>Zaliczone: '+count+' / '+items.length+'</span>'+icon('down')+
   '</summary><div class="scene-list">'+entries+'</div></details>';
 }).join('');
 return '<div class="scene-picker" aria-label="Ćwiczenia według poziomu trudności">'+groups+'</div>';
}
function guide(c) {
 const done=learned();
 const pending=c.scenes.findIndex((_,i)=>!done.has(c.id+'/'+i));
 const start=pending<0?0:pending;
 $('main').innerHTML = lessonHeader(c,false) + guideContent + '<section class="sectionblock"><h2 class="subheading">Przećwicz ocenę zdarzeń</h2>'+
   '<p class="subcopy">'+esc(c.signal)+'</p><div class="actions"><a class="btn" href="'+routeHref(sceneLink(c.id,start))+'">'+icon('play')+(pending<0?'Powtórz ćwiczenia':pending===0?'Rozpocznij ćwiczenia':'Kontynuuj ćwiczenia')+'</a></div>'+scenePicker(c)+'</section>'+lessonReviews(c);
}
function eventCaption(event){
 return 'Wpis '+event.number+' · '+event.label;
}
function assessmentReview(row){
 const scene=recordedScene(row), events=logEvents(scene.traces[row.variant]);
 const expected=scene.answers[row.variant], verdictOk=row.answer===expected;
 const notes=row.revision>=4 ? byId.get(row.id).assessmentNotes[scene.name] : null;
 const key=scene.evidenceKeys?.[row.variant], selected=events.find(e=>e.number===row.evidence);
 const evidenceOk=!key || row.evidence===key;
 const ok=verdictOk && evidenceOk;
 const title=ok?'Trafna ocena':verdictOk?'Trafny werdykt. Sprawdź wskazany wpis.':'Przyjrzyj się dowodom ponownie';
 let choiceComment='';
 if(!verdictOk){
  const criteria=notes && [notes.breach,notes.compliance];
  const why=row.answer===2?'W tym przebiegu można rozstrzygnąć, czy podana reguła została zachowana.':criteria?.[row.answer];
  choiceComment='<p class="answer-comment">Twoja odpowiedź to <strong>„'+esc(verdicts[row.answer])+'”</strong>. '+esc(why||'')+'</p>';
 }
 const verdict='<p class="verdict-reason"><strong>'+verdicts[expected]+'.</strong> '+esc(scene.reasons[row.variant])+'</p>';
 let evidenceReview='';
 if(key){
  const correct=events[key-1];
  const choice=!evidenceOk && selected?'<p>Twój wybór · '+esc(eventCaption(selected))+'. '+esc(selected.text)+'</p>':'';
  evidenceReview='<section class="review-clue"><h4>'+(evidenceOk?'Trafnie wskazany dowód':'Dlaczego inny wpis odpowiada na pytanie?')+
   '</h4><p>'+esc(scene.evidenceQuestion)+'</p>'+choice+'<p><strong>'+esc(eventCaption(correct))+
   '</strong> — '+esc(correct.text)+'</p></section>';
 }
 let reading='';
 if(notes){
  const references=notes.events.filter(n=>n!==key && (evidenceOk || n!==selected?.number)).map(n=>{
   const entry=events[n-1];
   return '<li><span>'+esc(eventCaption(entry))+'</span> '+esc(entry.text)+'</li>';
  }).join('');
  const level=levelFor(row.scene);
  const heading=level.key==='hard'?'Jak połączyć dowody?':level.key==='medium'?'Co może zmylić w tym dzienniku?':'Co warto zapamiętać?';
  reading='<section class="review-reading"><h4>'+heading+'</h4><p>'+esc(notes.takeaway)+'</p>'+
   (references?'<ul class="review-events">'+references+'</ul>':'')+'</section>';
 }
 return '<h3>'+icon(ok?'check':'info')+title+'</h3>'+choiceComment+verdict+evidenceReview+reading;
}
function lessonReviews(lesson){
 const latest=new Map();
 for(const row of rows){
  if(row.id===lesson.id)latest.set(row.scene+'/'+row.variant,row);
 }
 const description=latest.size?'Możesz wrócić do ostatniej odpowiedzi w każdym rozwiązanym przebiegu.':
  'Po sprawdzeniu pierwszej odpowiedzi znajdziesz tu jej omówienie. Kolejne będą zebrane według poziomu trudności.';
 const order=row=>2*row.scene+Number(row.variant!==defaultVariant(lesson,row.scene));
 const groups=levels.map(level=>{
  const attempts=[...latest.values()].filter(r=>levelFor(r.scene)===level).sort((a,b)=>order(a)-order(b));
  if(!attempts.length)return '';
  const items=attempts.map(row=>{
   const display=row.variant===defaultVariant(lesson,row.scene)?'Pierwszy przebieg':'Drugi przebieg';
   const passed=completed(row);
   return '<details class="saved-review"><summary>'+esc(lesson.scenes[row.scene].name)+' · '+display+
    ' · '+(passed?'Trafna ocena':'Do powtórki')+'</summary><div class="feedback '+(passed?'':'retry')+
    '">'+assessmentReview(row)+'</div></details>';
  }).join('');
  return '<details class="review-level"><summary>'+level.title+' · omówienia ('+attempts.length+')</summary>'+items+'</details>';
 }).join('');
 return '<section class="sectionblock lesson-reviews"><h2 class="subheading">Omówienia Twoich odpowiedzi</h2><p class="subcopy">'+
  description+'</p>'+groups+'</section>';
}
function scenario(c,i,display=0){
 const s=c.scenes[i],variant=(display+defaultVariant(c,i))%2,expected=s.answers[variant];
 const level=levelFor(i), events=logEvents(s.traces[variant]);
 const traceRows=renderTraceRows(events);
 const evidenceField=s.evidenceQuestion?'<div class="evidence-field"><label for="evidence">'+esc(s.evidenceQuestion)+
  '</label><select id="evidence" required><option value="">Wybierz wpis z dziennika</option>'+
  events.map(event=>'<option value="'+event.number+'">Wpis '+event.number+' · '+esc(event.label)+'</option>').join('')+
  '</select></div>':'';
 $('main').innerHTML=lessonHeader(c,true)+scenePicker(c,i)+'<article class="box labbody" id="exercise"><div class="labhead"><div><span class="caption">Scenariusz '+(i+1)+' z '+c.scenes.length+' · poziom '+level.label+' · symulacja</span><h2>'+esc(s.name)+'</h2></div><label class="selectwrap"><span class="sr">Wariant przebiegu</span><select id="tracevariant"><option value="0">Pierwszy przebieg</option><option value="1">Drugi przebieg</option></select>'+icon('down')+'</label></div><p>'+esc(s.context)+'</p><div class="rule"><b>Reguła aplikacji</b>'+esc(s.rule)+'</div><section class="sectionblock"><h3>'+icon('list')+'Dziennik zdarzeń ('+events.length+')</h3>'+journalIntro(s.journalGuide)+'<dl class="trace">'+traceRows+'</dl></section><form id="assessment"><fieldset><legend>Co wynika z dziennika w świetle podanej reguły?</legend><div class="optlist"><label class="opt"><input required type="radio" name="answer" value="1">Reguła zachowana</label><label class="opt"><input required type="radio" name="answer" value="0">Reguła naruszona</label><label class="opt"><input required type="radio" name="answer" value="2">Za mało danych</label></div>'+evidenceField+'</fieldset><details><summary>Dodaj notatkę do raportu</summary><textarea id="note" aria-label="Notatka do raportu" maxlength="2000" placeholder="Który wpis uzasadnia Twoją ocenę?"></textarea></details><div class="actions"><button id="grade" class="btn">'+icon('check')+'Sprawdź i zapisz ocenę</button></div></form><div id="feedback" aria-live="polite"></div></article>';
 $('tracevariant').value=String(display);
 $('tracevariant').onchange=e=>scenario(c,i,Number(e.target.value));
 let submitted=false;
 $('assessment').onsubmit=e=>{
  e.preventDefault();if(submitted)return;
  const radio=e.currentTarget.querySelector('input:checked');if(!radio)return;
  const evidence=s.evidenceKeys?Number($('evidence').value):null;
  if(s.evidenceKeys&&!events.some(event=>event.number===evidence)){ $('evidence').reportValidity();return }
  submitted=true;
  const answer=Number(radio.value),verdictOk=answer===expected;
  const evidenceOk=!s.evidenceKeys||evidence===s.evidenceKeys[variant];
  const ok=verdictOk&&evidenceOk;
  const uid=typeof crypto.randomUUID==='function'?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2);
  const row={uid,id:c.id,scene:i,revision:4,variant,display,answer,evidence,note:$('note').value.trim(),at:new Date().toISOString()};
  syncStorage(prev=>[...prev,row]);
  e.currentTarget.querySelector('fieldset').disabled=true;$('note').readOnly=true;$('grade').disabled=true;
  $('grade').textContent=storageOk?'Ocena zapisana':'Ocena zapisana w tej karcie';
  const nextLesson=library[library.indexOf(c)+1];
  const nextLink=i+1<c.scenes.length?sceneLink(c.id,i+1):nextLesson?sceneLink(nextLesson.id):'#katalog';
  const nextLabel=i+1<c.scenes.length?'Następne ćwiczenie':nextLesson?'Pierwsze ćwiczenie następnej lekcji':'Wróć do katalogu';
  $('feedback').innerHTML='<section class="feedback '+(ok?'':'retry')+'" tabindex="-1">'+assessmentReview(row)+'<div class="actions"><button class="btn border slim" id="othertrace">Porównaj drugi przebieg</button><a class="btn border slim" href="'+routeHref(nextLink)+'">'+nextLabel+'</a><a class="inline" href="'+routeHref('#wyniki')+'">Moje wyniki</a></div></section>';
  const picker=document.querySelector('.scene-picker');
  const expanded=[...picker.querySelectorAll('details[open]')].map(group=>group.dataset.level);
  picker.outerHTML=scenePicker(c,i,expanded);
  $('othertrace').onclick=()=>scenario(c,i,1-display);$('feedback').firstElementChild.focus();
 };
}

function renderPage(parts) {
  const lesson = byId.get(ownRoute.split('/')[1]);
  pageTitle(lesson.title);
  renderNav('katalog', lesson.topic);
  const number = Number(parts[3]);
  if (parts[2] === 'scenariusz' && Number.isInteger(number) && number >= 1 && number <= lesson.scenes.length) {
    scenario(lesson, number - 1, parts[4] === 'B' ? 1 : 0);
  } else {
    guide(lesson);
  }
}
