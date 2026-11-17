import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { grade } from '../grader.js';

const lesson = JSON.parse(readFileSync(new URL('../data/day1-2017-revised.json', import.meta.url)));
assert.deepEqual(lesson.sequence, ['new_words', 'warming_up', 'question_translation', 'answer_reaction']);
assert.equal(lesson.new_words.items.length, 22);
assert.ok(lesson.new_words.items.every(item => item.word && item.ipa && item.meaning_ko && item.repeat_count === 2));
assert.equal(lesson.warming_up.items.length, 12);
assert.equal(lesson.question_translation.items.length, 18);
assert.deepEqual(lesson.answer_reaction.question_ids_in_order, lesson.question_translation.items.map(item => item.id));
assert.ok(lesson.question_translation.items.every(item => item.question_en && item.answer_yes && item.answer_no));
for (const item of lesson.warming_up.items) assert.equal(grade(item.answer, { answer:item.answer, alternatives:item.accepted_answers }).result, 'correct');
for (const item of lesson.question_translation.items) {
  assert.equal(grade(item.question_en, { answer:item.question_en, alternatives:item.accepted_questions }).result, 'correct');
  assert.equal(grade(item.answer_yes, { answer:item.answer_yes, alternatives:[...item.accepted_yes, ...item.accepted_no] }).result, 'correct');
  assert.equal(grade(item.answer_no, { answer:item.answer_yes, alternatives:[...item.accepted_yes, ...item.accepted_no] }).result, 'correct');
  assert.equal(grade('Yes.', { answer:item.answer_yes, alternatives:[...item.accepted_yes, ...item.accepted_no] }).result, 'uncertain');
  assert.equal(grade('No, they are.', { answer:item.answer_yes, alternatives:[...item.accepted_yes, ...item.accepted_no] }).result, 'uncertain');
}
console.log('Day 1 2017 data validation passed.');
