import assert from 'node:assert/strict';
import { grade, normalize } from '../grader.js';

const item = answer => ({ answer, alternatives: [] });

assert.equal(grade('Is your mom beautiful?', item('Is your mother beautiful?')).result, 'correct');
assert.equal(grade('Is your dad tall?', item('Is your father tall?')).result, 'correct');
assert.equal(grade('Is your phone expensive?', item('Is your cell phone expensive?')).result, 'correct');
assert.equal(grade("My room's small.", item('My room is small.')).result, 'correct');
assert.equal(grade("It isn't clean.", item('It is not clean.')).result, 'correct');
assert.equal(grade('Are your mom beautiful?', item('Is your mother beautiful?')).result, 'uncertain');
assert.equal(grade('Is your mom tall?', item('Is your mother beautiful?')).result, 'uncertain');
assert.equal(normalize('Is your cell phone expensive?'), normalize('Is your phone expensive?'));

console.log('Grader equivalence validation passed.');
