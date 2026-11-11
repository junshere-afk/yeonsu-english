const KEY = 'speed-speaking-v01-history';

export function getHistory() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } }
export function saveAttempt({ id, result, responseTime }) {
  const history = getHistory(); const old = history[id] || { attempts: 0, correct: 0 };
  history[id] = { attempts: old.attempts + 1, correct: old.correct + (result === 'correct' ? 1 : 0), lastResult: result, lastStudied: new Date().toISOString(), responseTime };
  localStorage.setItem(KEY, JSON.stringify(history));
}
export function wrongIds() { return Object.entries(getHistory()).filter(([, record]) => record.lastResult !== 'correct').map(([id]) => id); }
