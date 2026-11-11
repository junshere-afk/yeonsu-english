const statuses = ['correct', 'incorrect', 'skipped', 'unresolved'];

export function summarizeResults(results) {
  const counts = Object.fromEntries(statuses.map(status => [status, 0]));
  results.forEach(result => { counts[statuses.includes(result.status) ? result.status : 'unresolved'] += 1; });
  const total = statuses.reduce((sum, status) => sum + counts[status], 0);
  return { total, ...counts, accuracy: total ? (counts.correct / total) * 100 : 0, allCorrect: total > 0 && counts.correct === total };
}
