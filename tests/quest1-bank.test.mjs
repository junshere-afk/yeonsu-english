import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const bank = JSON.parse(readFileSync(new URL('../data/quest01-day1-sentence-only.json', import.meta.url)));
assert.equal(bank.items.length, 13);
assert.equal(new Set(bank.items.map(item => item.id)).size, 13);
assert.equal(bank.items.filter(item => item.type === 'sentence').length, 13);
assert.equal(bank.items.filter(item => item.type === 'response').length, 0);
assert.ok(bank.items.every(item => item.prompt_ko && item.answer && Array.isArray(item.accepted_answers)));
assert.ok(bank.items.every(item => item.type === 'sentence'));
console.log('Quest 1 bank validation passed.');
