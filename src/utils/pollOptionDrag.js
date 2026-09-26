// Keep pointer movement outside React renders; commit the new order on release.
export function createPollOptionDrag({ getRows, onSwap, requestFrame = requestAnimationFrame, cancelFrame = cancelAnimationFrame }) {
  let drag = null;
  let frame = null;
  const properties = ['transform', 'transition', 'position', 'zIndex', 'opacity', 'cursor', 'userSelect', 'willChange'];

  function paint() {
    frame = null;
    if (!drag?.active) return;
    const { rows, index, offset, distance } = drag;
    const crossed = offset * Math.sign(distance) > Math.abs(distance) / 2;
    rows[index].style.transform = 'translateY(' + offset + 'px)';
    rows[1 - index].style.transform = crossed ? 'translateY(' + (-distance) + 'px)' : '';
  }

  function reset() {
    const previous = drag;
    drag = null;
    if (frame !== null) cancelFrame(frame);
    frame = null;
    if (!previous) return;
    previous.rows.forEach((row, index) => {
      for (const property of properties) row.style[property] = previous.styles[index][property];
    });
    if (previous.owner.hasPointerCapture(previous.pointerId)) previous.owner.releasePointerCapture(previous.pointerId);
  }

  return {
    start(event, index) {
      if (drag || !event.isPrimary || event.button !== 0) return;
      const rows = getRows();
      if (!rows[0] || !rows[1]) return;
      const rects = rows.map(row => row.getBoundingClientRect());
      const distance = rects[1 - index].top - rects[index].top;
      if (!distance) return;
      drag = {
        index, rows: [...rows], distance, pointerId: event.pointerId,
        owner: event.currentTarget, startX: event.clientX, startY: event.clientY,
        offset: 0, active: false,
        styles: rows.map(row => Object.fromEntries(properties.map(property => [property, row.style[property]]))),
      };
      // Capture immediately, before a fast movement can leave the input.
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    move(event) {
      if (!drag || drag.pointerId !== event.pointerId) return;
      const offset = event.clientY - drag.startY;
      if (!drag.active) {
        if (Math.abs(offset) < 8 || Math.abs(offset) <= Math.abs(event.clientX - drag.startX)) return;
        drag.active = true;
        drag.rows.forEach((row, index) => {
          row.style.transition = index === drag.index ? 'none' : 'transform 120ms ease';
          row.style.willChange = 'transform';
          row.style.userSelect = 'none';
        });
        Object.assign(drag.rows[drag.index].style, { position: 'relative', zIndex: '2', opacity: '0.9', cursor: 'grabbing' });
      }
      event.preventDefault();
      // Limit movement to the neighbouring slot, allowing release beyond it.
      drag.offset = Math.max(Math.min(0, drag.distance), Math.min(Math.max(0, drag.distance), offset));
      if (frame === null) frame = requestFrame(paint);
    },
    end(event) {
      if (!drag || drag.pointerId !== event.pointerId) return;
      const offset = event.clientY - drag.startY;
      const shouldSwap = drag.active && offset * Math.sign(drag.distance) > Math.abs(drag.distance) / 2;
      reset();
      if (shouldSwap) onSwap();
    },
    cancel(event) {
      if (!event || drag?.pointerId === event.pointerId) reset();
    },
  };
}
