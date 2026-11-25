const paths = {
 logo:'<path d="m12 2 9 5v10l-9 5-9-5V7z M3 7l9 5 9-5 M12 12v10 M7.5 4.5l9 5v5"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/>',
 book:'<path d="M3 5c4-1 6-.5 9 1.5 3-2 5-2.5 9-1.5v14c-4-1-6-.5-9 1.5C9 18.5 7 18 3 19z M12 7v13"/>',
 terminal:'<rect x="2.5" y="4" width="19" height="16" rx="2.5"/><path d="m6 9 3 3-3 3m6 0h5"/>',
 layers:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5"/>',
 shield:'<path d="M12 2.5c3 2 5 3 8 3v6c0 4.7-3 7.9-8 10-5-2.1-8-5.3-8-10v-6c3 0 5-1 8-3Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
 fingerprint:'<path d="M4 13a8 8 0 0 1 16 0m-16 3c1 0 2-1 2-3a6 6 0 0 1 12 0c0 3 1 5 2 6M6 20c2-2 3-4 3-7a3 3 0 1 1 6 0c0 4 1 6 2 8m-8 0c2-2 3-5 3-8"/>',
 code:'<path d="m7 7-5 5 5 5m10-10 5 5-5 5m-4-13-3 16"/>',
 network:'<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="2" y="16" width="6" height="5" rx="1"/><rect x="16" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M5 16v-4h14v4"/>',
 database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
 chart:'<path d="M4 3v17h17M8 16v-4m5 4V7m5 9v-6"/>',
 route:'<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h8a3.5 3.5 0 0 1 0 7H9a3.5 3.5 0 0 0 0 7h8"/>',
 menu:'<path d="M3 6h18M3 12h18M3 18h18"/>', search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 down:'<path d="m6 9 6 6 6-6"/>', right:'<path d="m9 6 6 6-6 6"/>', left:'<path d="m15 6-6 6 6 6"/>',
 play:'<path d="m7 4 13 8-13 8z"/>', check:'<path d="m4 12 5 5L20 6"/>',
 doc:'<path d="M5 3h9l5 5v13H5z M14 3v6h5M8 13h8m-8 4h6"/>',
 list:'<path d="M9 6h12M9 12h12M9 18h12"/><circle cx="4" cy="6" r=".6"/><circle cx="4" cy="12" r=".6"/><circle cx="4" cy="18" r=".6"/>',
 target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
 flask:'<path d="M8 3h8m-6 0v7L4 19c-.5.8 0 2 1 2h14c1 0 1.5-1.2 1-2l-6-9V3M7 15h10"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>', info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.4"/>'
};
function icon(name){return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">'+(paths[name]||'')+'</svg>'}
const $ = id => document.getElementById(id);
function esc(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
const navs=[['pulpit','grid','Pulpit'],['katalog','book','Katalog zagrożeń'],['testy','flask','Scenariusze testowe'],['sprawy','search','Sprawy do zbadania'],['wyniki','chart','Moje wyniki'],['plan','route','Plan nauki']];
function renderNav(page,topic=''){
 $('mainnav').innerHTML=navs.map(([key,ic,title])=>'<a class="navlink '+(page===key?'active':'')+'" '+(page===key?'aria-current="page"':'')+' href="'+routeHref('#'+key)+'">'+icon(ic)+title+(key==='katalog'?'<span class="navnum">'+library.length+'</span>':'')+'</a>').join('');
 $('topicnav').innerHTML=Object.entries(topics).map(([key,t])=>'<a class="navlink topiclink '+t.color+(key===topic?' active':'')+'" '+(key===topic?'aria-current="true"':'')+' href="'+routeHref('#katalog/'+key)+'"><i class="dot"></i>'+esc(t.name)+'</a>').join('');
}
function drawer(open,returnFocus=false){
 document.body.classList.toggle('menu-open',open);
 $('shade').hidden=!open;
 $('menu').setAttribute('aria-expanded',String(open));
 if(open){lastFocus=document.activeElement;$('side').querySelector('a').focus()}
 else if(returnFocus&&lastFocus){lastFocus.focus();lastFocus=null}
}
$('menu').onclick=()=>drawer(true);$('shade').onclick=()=>drawer(false,true);
document.addEventListener('keydown',e=>{
 if(!document.body.classList.contains('menu-open')) return;
 if(e.key==='Escape'){drawer(false,true);return}
 if(e.key==='Tab'){const links=[...$('side').querySelectorAll('a')];if(e.shiftKey&&document.activeElement===links[0]){e.preventDefault();links.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===links.at(-1)){e.preventDefault();links[0].focus()}}
});
matchMedia('(max-width:790px)').addEventListener('change',()=>drawer(false));
$('side').addEventListener('click',e=>{if(e.target.closest('a')&&document.body.classList.contains('menu-open')){drawer(false);$('main').focus({preventScroll:true})}});
document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();$('main').focus()});
document.querySelector('.brandmark').innerHTML=icon('logo');
document.querySelectorAll('[data-icon]').forEach(n=>n.innerHTML=icon(n.dataset.icon));
function stat(label,value,ic,detail=''){return '<div class="stat"><span class="stat-label">'+label+'</span>'+icon(ic)+'<strong>'+value+'</strong>'+detail+'</div>'}
function stats(){
 const done=learned().size,total=totalScenes,correct=rows.filter(completed).length;
 return '<div class="stats">'+stat('Opanowane scenariusze',done+' <small>/ '+total+'</small>','book','<span class="meter"><i style="width:'+done/total*100+'%"></i></span>')+stat('Zapisane oceny',rows.length,'doc')+stat('Trafność ocen',rows.length?Math.round(correct/rows.length*100)+'<small> %</small>':'—','target')+'</div>';
}
function pageTitle(text){$('crumb').textContent=text;document.title=text+' · AI Hack Labs'}
function mast(title,desc){return '<div class="mast"><h1>'+title+'</h1><p>'+desc+'</p></div>'}
function lessonLabel(c){return 'Lekcja '+Number(c.id.slice(-2))}
function topicCard(c,done){
 const t=topics[c.topic];
 const count=c.scenes.filter((_,i)=>done.has(c.id+'/'+i)).length;
 return '<a class="card '+t.color+'" href="'+routeHref('#temat/'+c.id)+'"><div class="cardhead"><span class="iconbox">'+icon(t.icon)+'</span><span class="code">'+lessonLabel(c)+'</span></div><h3 lang="en">'+esc(c.title)+'</h3><p>'+esc(c.short)+'</p><div class="cardfoot"><span class="'+(count?'done':'')+'">'+icon(count?'check':'flask')+'Zaliczone: '+count+' / '+c.scenes.length+' scenariuszy</span>'+icon('book')+'</div></a>';
}
function journalIntro(text){return text ? '<p class="journal-intro">'+esc(text)+'</p>' : ''}
function renderTraceRows(events){
 return events.map(event=>'<div class="trace-row"><dt><span class="event-index">'+
  String(event.number).padStart(2,'0')+'</span>'+esc(event.label)+'</dt><dd>'+esc(event.text)+'</dd></div>').join('');
}
