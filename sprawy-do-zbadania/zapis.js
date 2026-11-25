const investigationPrefix = 'ai-hack-labs.investigations.v1.';
const caseResults = new Map();

function validCaseResult(item, result) {
 return result && Number.isInteger(result.answer) && result.answer >= 0 &&
  result.answer < item.choices.length && Array.isArray(result.entries) &&
  result.entries.length === item.evidence.length &&
  result.entries.every(n => Number.isInteger(n) && n >= 1 && n <= item.events.length);
}

function readCaseResult(item) {
 if (storageOk) {
  let value;
  try { value = localStorage.getItem(investigationPrefix + item.id) }
  catch { storageOk = false; storageLabel(); return caseResults.get(item.id) }
  let result;
  try { result = JSON.parse(value) } catch { result = null }
  if (validCaseResult(item, result)) caseResults.set(item.id, result);
  else caseResults.delete(item.id);
 }
 return caseResults.get(item.id);
}

function caseSolved(item, result) {
 return result?.answer === item.answer && item.evidence.every((clue, i) => result.entries[i] === clue[1]);
}

function rememberCase(item, result) {
 const prior = readCaseResult(item);
 if (caseSolved(item, prior)) return;
 caseResults.set(item.id, result);
 if (storageOk) {
  try { localStorage.setItem(investigationPrefix + item.id, JSON.stringify(result)) }
  catch { storageOk = false; storageLabel() }
 }
}


function caseProgress() {
 return investigations.filter(item => caseSolved(item, readCaseResult(item))).length;
}
function clearCaseResults() {
 caseResults.clear();
 if (storageOk) {
  try {
   for (const item of investigations) localStorage.removeItem(investigationPrefix + item.id);
  } catch { storageOk = false; storageLabel() }
 }
}
