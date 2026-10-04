import test from 'node:test';
import assert from 'node:assert/strict';
import { detectGender, getAvatarByGender, maleAvatars, femaleAvatars, neutralAvatars } from '../src/components/groups/avatars.js';

test('known names use the correct pool, including Azerbaijani casing', () => {
  for (const name of ['Emil', 'İzzət', 'Izzat', 'Vasif', 'Ali', 'Sayid', 'EMİL Xanciqazov']) {
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
  for (const user of [{}, { name: 'Unknown' }, { name: 'user 99' }, { name: 'test' }, { name: 'user3' }, { name: 'User 2' }, { name: 'Alina' }, { name: 'Emil', gender: 'nonbinary' }, { name: 'Aygül', sex: 0 }]) {
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


test('every seeded user has the same avatar across all directory representations', async () => {
  const { initialState: store } = await import('../src/data/initialState.js');
  const { resolveAvatarUser } = await import('../src/utils/avatars.js');
  const records = [...store.users, ...store.employees, ...store.operatorApprovals];
  for (const user of records) {
    const expected = getAvatarByGender(resolveAvatarUser(user, records));
    for (const reference of [user.name, { name: user.name, id: 'unrelated-row-id' }, { name: user.name.toUpperCase() }]) {
      assert.equal(getAvatarByGender(resolveAvatarUser(reference, records)), expected, user.name);
    }
  }
});

test('uploaded photos and declared gender follow the user into name-only views', async () => {
  const { resolveAvatarUser } = await import('../src/utils/avatars.js');
  const users = [{ id: 8, name: 'Ali Mensimov', email: 'ali@example.com' }];
  const employee = { id: 3, name: 'Ali Mensimov', email: 'ali@example.com', avatar: '/uploads/ali.jpg' };
  const records = [...users, employee];
  for (const reference of [...records, 'Ali Mensimov', { name: 'ALI MENSIMOV', avatar: '/uploads/ali.jpg' }]) {
    assert.equal(getAvatarByGender(resolveAvatarUser(reference, records)), '/uploads/ali.jpg');
  }
  const declared = [{ name: 'Unknown', gender: 'female', email: 'person@example.com' }];
  assert.ok(femaleAvatars.includes(getAvatarByGender(resolveAvatarUser('Unknown', declared))));
  for (const field of ['avatar', 'profilePhoto', 'profile_photo', 'avatarUrl', 'avatar_url']) {
    assert.equal(getAvatarByGender({ name: 'Aygul', [field]: 'data:image/png;base64,uploaded' }), 'data:image/png;base64,uploaded');
  }
});

test('ambiguous names never borrow another account photo or use unrelated row IDs', async () => {
  const { resolveAvatarUser } = await import('../src/utils/avatars.js');
  const records = [
    { id: 1, name: 'Ali', email: 'one@example.com', avatar: '/one.jpg' },
    { id: 2, name: 'Ali', email: 'two@example.com', avatar: '/two.jpg' },
  ];
  assert.ok(maleAvatars.includes(getAvatarByGender(resolveAvatarUser('Ali', records))));
  assert.equal(getAvatarByGender(resolveAvatarUser({ id: 2, name: 'Ali', email: 'one@example.com' }, records)), '/one.jpg');
  assert.ok(neutralAvatars.includes(getAvatarByGender(resolveAvatarUser({ id: 1, name: 'Unknown' }, records))));
});

test('normalization, sorting and filtering do not reassign portraits', async () => {
  const { resolveAvatarUser } = await import('../src/utils/avatars.js');
  const records = [{ name: 'Aygul Mammadova', email: 'aygul@example.com' }, { name: 'Vasif', email: 'vasif@example.com' }];
  const expected = getAvatarByGender(resolveAvatarUser('Aygul Mammadova', records));
  assert.equal(getAvatarByGender(resolveAvatarUser('  AYGUL   MAMMADOVA ', [...records].reverse())), expected);
  assert.equal(getAvatarByGender(resolveAvatarUser('Aygul Mammadova', records.slice(0, 1))), expected);
  assert.equal(detectGender({ name: 'Ali Xalida' }), 'neutral');
  assert.ok(neutralAvatars.includes(getAvatarByGender(null)));
});
