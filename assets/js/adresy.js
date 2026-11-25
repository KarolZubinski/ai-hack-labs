const pagePaths = {
  "pulpit": "index.html",
  "katalog": "katalog/index.html",
  "testy": "scenariusze-testowe/index.html",
  "sprawy": "sprawy-do-zbadania/index.html",
  "wyniki": "wyniki/index.html",
  "plan": "plan-nauki/index.html",
  "start": "wprowadzenie/index.html",
  "temat/LLM-01": "zagrozenia/direct-prompt-injection/index.html",
  "temat/LLM-02": "zagrozenia/instruction-override/index.html",
  "temat/LLM-03": "zagrozenia/indirect-prompt-injection/index.html",
  "temat/LLM-04": "zagrozenia/rag-knowledge-base-poisoning/index.html",
  "temat/LLM-05": "zagrozenia/role-play-jailbreaking/index.html",
  "temat/LLM-06": "zagrozenia/multilingual-and-obfuscated-prompts/index.html",
  "temat/LLM-07": "zagrozenia/sensitive-information-disclosure/index.html",
  "temat/LLM-08": "zagrozenia/cross-user-data-leakage/index.html",
  "temat/LLM-09": "zagrozenia/improper-output-handling/index.html",
  "temat/LLM-10": "zagrozenia/excessive-agency/index.html"
};
const ownRoute = document.body.dataset.route;
const rootPath = document.body.dataset.root;
const pageIntro = document.querySelector('main > header, main > .mast')?.outerHTML || '';

function routeOwner(route) {
  const [section, lessonId] = route.split('/');
  return section === 'temat' ? section + '/' + lessonId : section;
}

function routeHref(hash) {
  const route = hash.replace(/^#/, '');
  const owner = routeOwner(route);
  if (!Object.hasOwn(pagePaths, owner)) return rootPath + pagePaths.pulpit;
  const fragment = route === owner ? '' : '#' + route;
  if (owner === ownRoute && fragment) return fragment;
  return rootPath + pagePaths[owner] + fragment;
}

function currentRoute() {
  return location.hash.slice(1) || ownRoute;
}
