'use strict';

if (typeof URL.canParse !== 'function') {
  URL.canParse = function canParse(input, base) {
    try {
      if (base !== undefined) {
        new URL(input, base);
      } else {
        new URL(input);
      }
      return true;
    } catch {
      return false;
    }
  };
}

const defineArrayMethod = (name, implementation) => {
  if (!Object.prototype.hasOwnProperty.call(Array.prototype, name)) {
    Object.defineProperty(Array.prototype, name, {
      value: implementation,
      writable: true,
      configurable: true,
    });
  }
};

defineArrayMethod('toReversed', function toReversed() {
  return [...this].reverse();
});

defineArrayMethod('toSorted', function toSorted(compareFn) {
  return [...this].sort(compareFn);
});

defineArrayMethod('toSpliced', function toSpliced(start, deleteCount, ...items) {
  const copy = [...this];
  const actualDeleteCount = deleteCount === undefined ? copy.length - start : deleteCount;
  copy.splice(start, actualDeleteCount, ...items);
  return copy;
});

defineArrayMethod('with', function withValue(index, value) {
  const copy = [...this];
  const resolvedIndex = index < 0 ? copy.length + index : index;
  copy[resolvedIndex] = value;
  return copy;
});
