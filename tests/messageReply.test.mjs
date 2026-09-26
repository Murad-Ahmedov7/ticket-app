import test from 'node:test';
import assert from 'node:assert/strict';
import { getMessageContent, createReplySnapshot } from '../src/utils/messageReply.js';

test('new reply keeps answer separate and survives persistence', () => {
  const original = { id: 17, sender: 'Emil', text: 'İclas saat neçədədir?', type: 'text' };
  const replyTo = createReplySnapshot(original);
  const saved = JSON.parse(JSON.stringify({ text: 'Saat 12-də', replyTo }));
  assert.equal(getMessageContent(saved).text, 'Saat 12-də');
  assert.deepEqual(saved.replyTo, { id: 17, sender: 'Emil', text: original.text, type: 'text' });
  original.text = 'Changed';
  assert.equal(saved.replyTo.text, 'İclas saat neçədədir?');
});

test('legacy reply separates the quote without guessing identity', () => {
  const result = getMessageContent({ text: '↪ Cavab: "jjj..."\nsdkasd\nsecond line' });
  assert.equal(result.text, 'sdkasd\nsecond line');
  assert.equal(result.replyTo.text, 'jjj…');
  assert.equal(result.replyTo.sender, 'Əvvəlki mesaj');
  assert.equal(result.replyTo.id, undefined);
});

test('ordinary messages and explicit reply metadata are preserved', () => {
  assert.deepEqual(getMessageContent({ text: 'Normal text' }), { text: 'Normal text', replyTo: null });
  const replyTo = { id: 1, sender: 'Siz', text: 'Hello' };
  const text = '↪ Cavab: "quoted..."\nLiteral text';
  assert.deepEqual(getMessageContent({ text, replyTo }), { text, replyTo });
});

test('replying to a reply quotes only its answer', () => {
  const quote = createReplySnapshot({ id: 3, isOutgoing: true, text: '↪ Cavab: "first..."\nSecond' });
  assert.equal(quote.text, 'Second');
  assert.equal(quote.sender, 'Siz');
});

test('media replies have readable summaries instead of markup or empty text', () => {
  assert.equal(createReplySnapshot({ type: 'voice', duration: '0:05' }).text, 'Səsli mesaj · 0:05');
  assert.equal(createReplySnapshot({ type: 'poll', question: 'Hansı gün?' }).text, 'Sorğu: Hansı gün?');
  assert.equal(createReplySnapshot({ text: '📷 Şəkil göndərildi: <img src="data:image/png;base64,abc" />' }).text, 'Şəkil');
  assert.equal(createReplySnapshot(null), null);
});