import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const bank = JSON.parse(readFileSync(new URL('../data/quest01-be-adjective-100.json', import.meta.url)));
assert.equal(bank.items.length, 100);
assert.equal(new Set(bank.items.map(item => item.id)).size, 100);
assert.equal(bank.items.filter(item => item.type === 'sentence').length, 68);
assert.equal(bank.items.filter(item => item.type === 'response').length, 32);
assert.ok(bank.items.every(item => item.prompt_ko && item.answer && Array.isArray(item.accepted_answers)));
assert.ok(bank.items.filter(item => item.type === 'response').every(item => item.question_en && item.response_type === 'guided'));
assert.ok(bank.items.every(item => ['am_is_are','question_order','negation','pronoun','short_answer'].includes(item.error_focus)));
console.log('Quest 1 bank validation passed.');
