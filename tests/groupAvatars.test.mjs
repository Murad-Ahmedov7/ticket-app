import test from 'node:test';
import assert from 'node:assert/strict';
import { detectGender, getAvatarByGender, maleAvatars, femaleAvatars, neutralAvatars } from '../src/components/groups/avatars.js';

test('known names and account aliases use the correct pool, including Azerbaijani casing', () => {
  for (const name of ['Emil', 'İzzət', 'Izzat', 'Vasif', 'Ali', 'Sayid', 'user3', 'user q2', 'test', 'User 2', 'EMİL Xanciqazov']) {
    assert.equal(detectGender({ name }), 'male', name);
    assert.ok(maleAvatars.includes(getAvatarByGender({ name })), name);
  }
  for (const name of ['Aygul', 'Aygül', 'Səmaya', 'Semaya', 'Xalida', 'Yusifova Xalida', '  AYGÜL  ']) {
    assert.equal(detectGender({ name }), 'female', name);
    assert.ok(femaleAvatars.includes(getAvatarByGender({ name })), name);
  }
});

test('backend gender takes precedence and uncertain values stay neutral', () => {
  assert.equal(detectGender({ name: 'Emil', gender: 'female' }), 'female');
  assert.equal(detectGender({ name: 'Aygül', sex: 'M' }), 'male');
  assert.equal(detectGender({ name: 'Emil', gender: '', sex: 'Qadın' }), 'female');
  assert.equal(detectGender({ gender: 'Kişi' }), 'male');
  for (const user of [{}, { name: 'Unknown' }, { name: 'user 99' }, { name: 'Alina' }, { name: 'Emil', gender: 'nonbinary' }, { name: 'Aygül', sex: 0 }]) {
    assert.equal(detectGender(user), 'neutral');
    assert.ok(neutralAvatars.includes(getAvatarByGender(user)));
  }
});

test('stable identity gives the same avatar across repeated calls and display-name changes', () => {
  const user = { id: 0, username: 'emil', name: 'Emil', gender: 'male' };
  const avatar = getAvatarByGender(user);
  for (let i = 0; i < 10; i++) assert.equal(getAvatarByGender({ ...user }), avatar);
  assert.equal(getAvatarByGender({ ...user, username: 'renamed', name: 'Vasif' }), avatar);
  assert.equal(getAvatarByGender({ username: 'stable', name: 'Emil' }), getAvatarByGender({ username: 'stable', name: 'Ali' }));
  assert.equal(getAvatarByGender({ ...user, avatar: '/profile.jpg' }), '/profile.jpg');
  assert.equal(detectGender({ first_name: 'Xalida', name: 'Yusifova' }), 'female');
});
