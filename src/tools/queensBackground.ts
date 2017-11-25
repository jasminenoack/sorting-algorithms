const queens = [
  // tslint:disable:max-line-length
  ["Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null],
  ["Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null],
  ["Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null],
  ["Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null],
  [null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null],
  [null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null],
  [null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null],
  [null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null],
  [null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null],
  [null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null],
  [null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null],
  [null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null],
  [null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null],
  [null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null],
  [null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null],
  [null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null],
  [null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null],
  [null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null],
  [null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null],
  [null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null],
  [null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null],
  [null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null],
  [null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null],
  [null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null],
  [null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen"],
  [null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null],
  [null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null],
  [null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null],
  [null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null],
  [null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null],
  [null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null],
  [null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null],
  [null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null],
  [null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null],
  [null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null],
  [null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null],
  [null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null],
  [null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null],
  [null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen"],
  [null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null],
  [null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null],
  [null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null],
  [null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null],
  [null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null],
  [null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null],
  [null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null],
  [null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null],
  [null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null],
  [null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null],
  [null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen"],
  [null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null],
  [null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null],
  [null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null],
  [null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null],
  [null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null],
  [null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null],
  [null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen"],
  [null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null],
  [null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null],
  [null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null],
  [null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null],
  [null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null],
  [null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null],
  [null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null],
  [null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null],
  [null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, null, null, null, null, null, "Queen", null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null],
  [null, null, null, null, null, null, null, "Queen", null, null, "Queen", null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null],
  [null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, "Queen", null, null, null, null, null, null, null, null, null, null, null, null, "Queen", null, null, null, null, null, "Queen", null, null, null],
  // tslint:enable:max-line-length
];
let queensIndex: number;

const body = document.getElementsByTagName("body")[0];
const ul = document.createElement("ul");
ul.className = "background";
// tslint:disable-next-line:prefer-for-of
for (let i = 0; i < queens[0].length; i++) {
  const li = document.createElement("li");
  ul.appendChild(li);
  li.className = "square";
}
body.appendChild(ul);

function setIndex() {
  queensIndex = Math.floor(Math.random() * queens.length);
}
function renderQueens() {
  setIndex();
  const squares = document.getElementsByClassName("square");
  const board = queens[queensIndex];
  for (let i = 0; i < board.length; i++) {
    if (board[i]) {
      squares[i].classList.add("queen");
    } else {
      squares[i].classList.remove("queen");
    }
  }
}

export const setUpQueens = () => {
  renderQueens();

  setInterval(() => {
    renderQueens();
  }, 5000);
};