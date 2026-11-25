const stages=[['Instrukcje i źródła','Rozpoznaj, skąd pochodzi polecenie i które źródło zostało użyte do odpowiedzi.',0,4],['Spójność reguł i poufność','Prześledź zmiany kontekstu rozmowy oraz dostęp do danych poszczególnych osób.',4,8],['Odpowiedzi i narzędzia','Sprawdź, co aplikacja zrobiła z wynikiem modelu i czy działanie miało zgodę użytkownika.',8,10]].map(([title,description,start,end],index)=>({
 number:index+1, title, description, lessons:library.slice(start,end)
}));
const byId=new Map(library.map(c=>[c.id,c]));
const totalScenes=library.reduce((total,lesson)=>total+lesson.scenes.length,0);
const verdicts=['Reguła naruszona','Reguła zachowana','Za mało danych'];
const levels=[
 {key:'easy', title:'Łatwe', label:'łatwy', start:0, end:3},
 {key:'medium', title:'Średnie', label:'średni', start:3, end:7},
 {key:'hard', title:'Trudne', label:'trudny', start:7, end:10}
];
function levelFor(index){return levels.find(level=>index>=level.start && index<level.end)}
function logEvents(trace){
 const events=[];
 for(let i=0;i<trace.length;i+=2)events.push({number:i/2+1,label:trace[i],text:trace[i+1]});
 return events;
}
const key='ai-hack-labs.assessments.v1';
let storageOk=true, rows=[], query='', filter='all', lastFocus=null;
function unpack(raw){
 const list=JSON.parse(raw||'[]');
 if(!Array.isArray(list))return [];
 return list.filter(r=>r&&typeof r.uid==='string'&&byId.has(r.id)&&Number.isInteger(r.scene)&&r.scene>=0&&r.scene<byId.get(r.id).scenes.length&&[0,1].includes(r.variant)&&[0,1,2].includes(r.answer)&&Number.isFinite(Date.parse(r.at))&&typeof r.note==='string');
}
function loadRows(){try{rows=unpack(localStorage.getItem(key))}catch{storageOk=false}}
function syncStorage(change){
 if(storageOk){try{rows=unpack(localStorage.getItem(key))}catch{storageOk=false}}
 rows=change(rows);
 if(storageOk){try{localStorage.setItem(key,JSON.stringify(rows))}catch{storageOk=false}}
 storageLabel();
}
function storageLabel(){$('storeStatus').textContent=storageOk?'W tej przeglądarce':'Tylko do zamknięcia karty'}
function recordedScene(r){
 const latest=byId.get(r.id).scenes[r.scene];
 if(r.revision>=4)return latest;
 const sceneKey=r.id+'/'+r.scene;
 const revisionThree={...latest,...scenesBeforeEvidenceReview[sceneKey]};
 if(r.revision===3)return revisionThree;
 const current={...revisionThree,...historicalScenes[sceneKey],journalGuide:null};
 if(!r.revision && current.previous)return {...current,...current.previous,evidenceQuestion:null,evidenceKeys:null};
 return current;
}
function completed(r){
 const s=recordedScene(r);
 return r.answer===s.answers[r.variant] && (!s.evidenceKeys || r.evidence===s.evidenceKeys[r.variant]);
}
function learned(){return new Set(rows.filter(completed).map(r=>r.id+'/'+r.scene))}
function sceneLink(id,scene=0){return '#temat/'+id+'/scenariusz/'+(scene+1)}
function nextScene(){const done=learned();for(const item of library){for(let n=0;n<item.scenes.length;n++){if(!done.has(item.id+'/'+n))return sceneLink(item.id,n)}}return '#katalog'}
function defaultVariant(c,scene){return (library.indexOf(c)+scene)%2}
