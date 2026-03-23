// Polyfill Array.prototype.findLastIndex for older browsers (e.g. Chromebooks with Chrome < 97)
if (typeof Array.prototype.findLastIndex !== "function") {
  Array.prototype.findLastIndex = function (predicate, thisArg) {
    for (let i = this.length - 1; i >= 0; i--) {
      if (predicate.call(thisArg, this[i], i, this)) return i;
    }
    return -1;
  };
}
