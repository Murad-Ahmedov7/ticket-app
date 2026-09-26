import test from 'node:test';
import assert from 'node:assert/strict';
import { createPollOptionDrag } from '../src/utils/pollOptionDrag.js';

function setup(index = 0) {
  let swaps = 0;
  let paint;
  const rows = [0, 60].map(top => ({
    style: Object.fromEntries(['transform', 'transition', 'position', 'zIndex', 'opacity', 'cursor', 'userSelect', 'willChange'].map(key => [key, ''])),
    getBoundingClientRect: () => ({ top }),
    captured: false,
    setPointerCapture() { this.captured = true; },
    hasPointerCapture() { return this.captured; },
    releasePointerCapture() { this.captured = false; },
  }));
  const controller = createPollOptionDrag({
    getRows: () => rows,
    onSwap: () => { swaps++; },
    requestFrame: fn => { paint = fn; return 1; },
    cancelFrame: () => { paint = null; },
  });
  const event = (y, overrides = {}) => ({
    isPrimary: true, button: 0, pointerId: 1, clientX: 30, clientY: y,
    currentTarget: rows[index], preventDefault() { this.prevented = true; }, ...overrides,
  });
  return { controller, rows, event, swaps: () => swaps, flush: () => { const fn = paint; paint = null; fn?.(); }, pending: () => !!paint };
}

test('captures immediately; normal clicks and horizontal text selection do not reorder', () => {
  const s = setup();
  s.controller.start(s.event(20), 0);
  assert.equal(s.rows[0].captured, true);
  const move = s.event(22, { clientX: 100 });
  s.controller.move(move);
  assert.equal(move.prevented, undefined);
  s.controller.end(s.event(22));
  assert.equal(s.swaps(), 0);
  assert.equal(s.rows[0].captured, false);
});

test('fast downward drag beyond the target swaps once and cancels queued paint', () => {
  const s = setup();
  s.controller.start(s.event(20), 0);
  s.controller.move(s.event(160));
  assert.equal(s.pending(), true);
  s.controller.end(s.event(200));
  s.controller.cancel(s.event(200));
  assert.equal(s.swaps(), 1);
  assert.equal(s.pending(), false);
  assert.equal(s.rows[0].style.transform, '');
});

test('upward drag previews both slots and commits above the midpoint', () => {
  const s = setup(1);
  s.controller.start(s.event(80), 1);
  s.controller.move(s.event(40));
  s.flush();
  assert.equal(s.rows[1].style.transform, 'translateY(-40px)');
  assert.equal(s.rows[0].style.transform, 'translateY(60px)');
  s.controller.end(s.event(40));
  assert.equal(s.swaps(), 1);
  assert.equal(s.rows[0].style.transform, '');
  assert.equal(s.rows[1].style.transition, '');
});

test('returning to the original slot and cancellation restore styles without swapping', () => {
  for (const cancel of [true, false]) {
    const s = setup();
    s.controller.start(s.event(20), 0);
    s.controller.move(s.event(65));
    s.flush();
    s.controller.move(s.event(25));
    if (cancel) s.controller.cancel(s.event(25));
    else s.controller.end(s.event(25));
    assert.equal(s.swaps(), 0);
    assert.equal(s.rows[0].style.opacity, '');
    assert.equal(s.rows[1].style.transform, '');
    assert.equal(s.rows[0].captured, false);
  }
});

test('ignores other pointers and safely cleans up on unmount', () => {
  const s = setup();
  s.controller.start(s.event(20), 0);
  s.controller.move(s.event(90, { pointerId: 2 }));
  s.controller.end(s.event(90, { pointerId: 2 }));
  assert.equal(s.swaps(), 0);
  assert.equal(s.rows[0].captured, true);
  s.controller.move(s.event(65));
  s.controller.cancel();
  assert.equal(s.pending(), false);
  assert.equal(s.rows[0].captured, false);
});
