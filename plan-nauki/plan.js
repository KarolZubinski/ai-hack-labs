function stageProgress(stage,done){
 const ids=stage.lessons.flatMap(c=>c.scenes.map((_,i)=>c.id+'/'+i));
 return 'Zaliczone: '+ids.filter(id=>done.has(id)).length+' / '+ids.length+' scenariuszy';
}
function plan(stageNumber){
 const stage=stages.find(group=>String(group.number)===stageNumber);
 const done=learned();
 if(stage){
  pageTitle('Etap '+stage.number+' · '+stage.title);
  $('main').innerHTML='<a href="'+routeHref('#plan')+'" class="back">'+icon('left')+'Plan nauki</a>'+
   '<header class="mast"><div class="overline">Etap '+stage.number+' z '+stages.length+'</div><h1>'+esc(stage.title)+'</h1><p>'+esc(stage.description)+'</p></header>'+
   '<section><div class="secbar"><h2>Tematy w tym etapie ('+stage.lessons.length+')</h2><span class="caption">'+stageProgress(stage,done)+'</span></div>'+
   '<div class="cards stage-topics">'+stage.lessons.map(c=>topicCard(c,done)).join('')+'</div></section>';
  return;
 }
 $('main').innerHTML=pageIntro+
  '<a class="back" href="'+routeHref('#start')+'">'+icon('book')+'Jak czytać dziennik? Przykład z zaproszeniem</a>'+
  '<div class="road">'+stages.map(group=>
   '<section class="box"><span class="overline">Etap '+group.number+'</span><h2>'+esc(group.title)+'</h2><p>'+esc(group.description)+'</p>'+
   '<span class="caption">'+stageProgress(group,done)+'</span><a class="btn border slim" href="'+routeHref('#plan/'+group.number)+'">Pokaż tematy ('+group.lessons.length+')</a></section>'
  ).join('')+'</div>';
}

function renderPage(parts) {
  pageTitle('Plan nauki');
  renderNav('plan');
  plan(parts[1]);
}
