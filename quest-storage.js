const KEY = 'speed-speaking-quest-v1';
const defaults = { targetScore: 20, records: {}, errors: {} };

export function getQuestData() {
  try { return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { ...defaults }; }
}
function save(data) { localStorage.setItem(KEY, JSON.stringify(data)); }
export function getQuestSettings() { return getQuestData().targetScore; }
export function setQuestTargetScore(score) {
  const data = getQuestData(); data.targetScore = Math.max(1, Math.min(200, Number(score) || defaults.targetScore)); save(data); return data.targetScore;
}
export function saveQuestCompletion({ score, passed, firstTryCorrect, hintTryCorrect, errors, durationSeconds }) {
  const data = getQuestData(), record = data.records.Q01 || { bestScore: 0 };
  data.records.Q01 = { bestScore: Math.max(record.bestScore || 0, score), lastScore: score, completedAt: new Date().toISOString(), passed, firstTryCorrect, hintTryCorrect, durationSeconds };
  for (const error of errors) data.errors[error] = (data.errors[error] || 0) + 1;
  save(data);
}
