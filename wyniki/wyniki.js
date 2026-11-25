function reportData(r){
 const c=byId.get(r.id),s=recordedScene(r),events=logEvents(s.traces[r.variant]);
 return {typ:'Symulacja edukacyjna',id:r.id,temat:c.title,obszar:topics[c.topic].name,scenariusz:s.name,przebieg:(r.variant===defaultVariant(c,r.scene)?'Pierwszy przebieg':'Drugi przebieg'),regula:s.rule,wprowadzenie_do_dziennika:s.journalGuide||'',dziennik:events.map(e=>e.number+'. '+e.label+' — '+e.text).join('\n'),poziom:r.revision?levelFor(r.scene).label:'wersja wcześniejsza',pytanie_o_wpis:s.evidenceQuestion||'',wskazany_wpis:r.evidence??'',oczekiwany_wpis:s.evidenceKeys?.[r.variant]??'',ocena:verdicts[r.answer],oczekiwana:verdicts[s.answers[r.variant]],trafnosc:completed(r)?'Trafna':'Do powtórki',uzasadnienie:s.reasons[r.variant],notatka:r.note,data:r.at};
}
function download(name,content,type){
 const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);
}
function exportFile(format){
 const data=rows.map(reportData);if(!data.length)return;
 if(format==='json'){download('ai-hack-labs-wyniki.json',JSON.stringify({typ:'Symulacja edukacyjna',utworzono:new Date().toISOString(),wyniki:data},null,2),'application/json');return}
 const keys=Object.keys(data[0]);
 const q=value=>{let s=String(value??'');if(/^[\s\uFEFF]*[=+@-]/.test(s)||/^[\t\r\n]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'};
 download('ai-hack-labs-wyniki.csv','\uFEFF'+[keys.join(','),...data.map(r=>keys.map(k=>q(r[k])).join(','))].join('\r\n'),'text/csv;charset=utf-8');
}
function reports(){
 const data=[...rows].reverse();const disabled=data.length?'':' disabled';
 const hasCases=investigations.some(item=>readCaseResult(item));
 $('main').innerHTML=pageIntro+stats()+'<p class="case-report"><a href="'+routeHref('#sprawy')+'">Sprawy do zbadania</a> · Rozwiązane: '+caseProgress()+' / '+investigations.length+'</p><div class="secbar"><h2>Historia scenariuszy</h2></div><div class="reporttools"><button id="json" class="btn border slim"'+disabled+'>'+icon('download')+'Eksport JSON</button><button id="csv" class="btn border slim"'+disabled+'>'+icon('download')+'Eksport CSV</button><button id="clear" class="btn border slim clear"'+(hasCases?'':disabled)+'>Wyczyść wyniki</button></div>'+(data.length?'<div class="tabwrap"><table><thead><tr><th>Temat i scenariusz</th><th>Twoja ocena</th><th>Wynik</th><th>Data</th></tr></thead><tbody>'+data.map(r=>{
 const c=byId.get(r.id),d=reportData(r);
 return '<tr><td><a href="'+routeHref(sceneLink(c.id,r.scene)+(r.variant!==defaultVariant(c,r.scene)?'/B':''))+'"><b>'+esc(d.scenariusz)+'</b></a><small>'+esc(c.title)+' · '+d.przebieg+' · '+esc(d.poziom)+'</small></td><td>'+d.ocena+'<details><summary>Szczegóły</summary><small>'+esc(d.uzasadnienie)+(d.pytanie_o_wpis?'<br><strong>'+esc(d.pytanie_o_wpis)+'</strong><br>Twój wpis: '+esc(d.wskazany_wpis)+' · Właściwy wpis: '+esc(d.oczekiwany_wpis):'')+(r.note?'<br><b>Notatka</b> '+esc(r.note):'')+'</small></details></td><td class="'+(completed(r)?'result-ok':'result-no')+'">'+d.trafnosc+'</td><td>'+new Date(r.at).toLocaleString('pl-PL',{dateStyle:'short',timeStyle:'short'})+'</td></tr>';
 }).join('')+'</tbody></table></div>':'<div class="empty">'+icon('chart')+'<h3>Tu pojawi się pierwsza ocena</h3><p>Otwórz scenariusz i oceń regułę na podstawie dziennika.</p><a class="btn" href="'+routeHref(sceneLink('LLM-01'))+'">Otwórz scenariusz</a></div>')+'<p class="note">Scenariusz zaliczasz po pierwszej trafnej ocenie. W trudnych ćwiczeniach zaliczenie wymaga poprawnego werdyktu oraz wskazania właściwego wpisu. Trafność obejmuje wszystkie zapisane próby. Dane są przechowywane w tej przeglądarce.</p>';
 $('json').onclick=()=>exportFile('json');$('csv').onclick=()=>exportFile('csv');$('clear').onclick=()=>$('confirmClear').showModal();
}
$('confirmClear').addEventListener('close',()=>{if($('confirmClear').returnValue==='clear'){clearCaseResults();syncStorage(()=>[]);reports();$('live').textContent='Wyczyszczono zapisane wyniki.'}$('confirmClear').returnValue=''});

function renderPage() {
  pageTitle('Moje wyniki');
  renderNav('wyniki');
  reports();
}
