((thisObj: typeof globalThis) => {
  writeEmptyPrefs();
  init(thisObj);
})(this);
