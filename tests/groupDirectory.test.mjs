import test from 'node:test';
import assert from 'node:assert/strict';
import { filterGroups, matchingMembers } from '../src/components/groups/directory.js';

const groups = [
  { id: 'support', name: 'Texniki Dəstək', members: ['Ali', 'İzzət'] },
  { id: 'it', name: 'İT və İnkişaf Qrupu', members: ['Emil'] },
  { id: 'empty', name: 'Yeni qrup', members: [] },
];

test('search handles Azerbaijani casing and whitespace, and reveals matching members', () => {
  assert.deepEqual(filterGroups(groups, { search: '  İZZƏT ' }), [groups[0]]);
  assert.deepEqual(matchingMembers(groups[0], 'izzət'), ['İzzət']);
  assert.equal(matchingMembers(groups[0], 'dəstək'), groups[0].members);
});

test('group filter and search intersect; empty groups remain available', () => {
  assert.deepEqual(filterGroups(groups, { search: 'Ali', groupFilter: 'it' }), []);
  assert.deepEqual(filterGroups(groups, { groupFilter: 'empty' }), [groups[2]]);
  assert.deepEqual(filterGroups([], {}), []);
  assert.deepEqual(filterGroups(groups, { search: 'missing' }), []);
});

test('all sort orders preserve original group objects, member counts and source order', () => {
  const snapshot = JSON.stringify(groups);
  const az = filterGroups(groups);
  assert.deepEqual(filterGroups(groups, { sort: 'za' }), [...az].reverse());
  assert.deepEqual(filterGroups(groups, { sort: 'most' }), groups);
  assert.deepEqual(filterGroups(groups, { sort: 'least' }), [...groups].reverse());
  assert.equal(filterGroups(groups, { search: 'Ali' })[0], groups[0]);
  assert.equal(JSON.stringify(groups), snapshot);
});
