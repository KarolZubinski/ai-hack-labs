function catalogTools(){return '<div class="catalog-tools"><label class="searchwrap">'+icon('search')+'<span class="sr">Szukaj zagrożenia</span><input id="query" type="search" placeholder="Szukaj zagrożenia" value="'+esc(query)+'"></label><label class="selectwrap"><span class="sr">Obszar tematyczny</span><select id="filter"><option value="all">Wszystkie obszary</option>'+Object.entries(topics).map(([id,t])=>'<option value="'+id+'" '+(filter===id?'selected':'')+'>'+esc(t.name)+'</option>').join('')+'</select>'+icon('down')+'</label></div>'}
function catalogSection(home){return '<section aria-label="Katalog zagrożeń"><div class="secbar"><div>'+(home?'<h2>Katalog zagrożeń</h2>':'')+'<span id="count" class="caption" aria-live="polite"></span></div>'+catalogTools()+'</div><div class="cards" id="cards"></div></section>'}
function norm(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/gi,'l').toLocaleLowerCase('pl').trim()}
function cards(){
 const selected=library.filter(c=>(filter==='all'||filter===c.topic)&&norm([c.title,c.polishTitle,c.name,c.short,c.id,topics[c.topic].name,...c.mechanism].join(' ')).includes(norm(query)));
 $('count').textContent=selected.length+' z '+library.length+' tematów';
 const done=learned();
 $('cards').innerHTML=selected.map(c=>topicCard(c,done)).join('')||'<div class="empty">'+icon('search')+'<h3>Brak pasujących tematów</h3><p>Zmień wyszukiwaną frazę lub obszar.</p><button id="clearfilter" class="btn border">Wyczyść filtry</button></div>';
 if($('clearfilter'))$('clearfilter').onclick=()=>{query='';filter='all';if(location.hash.startsWith('#katalog/')||location.hash.startsWith('#pulpit/')){location.hash=location.hash.split('/')[0]}else{$('query').value='';$('filter').value='all';cards()}};
}
function renderCatalog(parts, heading) {
  filter = Object.hasOwn(topics, parts[1]) ? parts[1] : 'all';
  $('main').innerHTML = heading + catalogSection(ownRoute === 'pulpit');
  $('query').oninput = event => { query = event.target.value; cards(); };
  $('filter').onchange = event => {
    filter = event.target.value;
    location.hash = ownRoute + (filter === 'all' ? '' : '/' + filter);
  };
  cards();
}
