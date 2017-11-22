interface Array<T> {
  shuffle(): T[];
  range(x: number): T[];
  sortNumbers(): T[];
  differenceFromOrdered(): number;
  kShuffle(k: number): T[];
  distribution(): {};
  sorted(): boolean;
  any(func: (item: any) => boolean): boolean;
  isEqual(array: T[]): boolean;
}

Array.prototype.shuffle = function (): any[] {
  // fisher yates shuffling algorithm
  if (Object.keys(this.distribution()).length === 1) {
    return this
  }

  let newArr = this.slice()
  let old = newArr.slice()
  for (let i = 0; i < this.length; i++) {
    let randomInt = Math.floor(Math.random() * newArr.length)
    this[i] = newArr.splice(randomInt, 1)[0]
  }

  if (this.isEqual(old)) {
    this.shuffle()
  }
  return this
}

Array.prototype.isEqual = function (array: any[]): boolean {
  if (this.length !== array.length) {
    return false
  }
  return !this.any((num: number, i: number) => {
    return num !== array[i]
  })
}

Array.prototype.range = function (length): any[] {
  let arr = []
  for (let i = 0; i < length; i++) {
    arr.push(i);
  }
  return arr;
};

Array.prototype.sortNumbers = function (): any[] {
  this.sort(function (x: number, y: number) {
    if (x < y) {
      return -1
    } else if (y < x) {
      return 1
    } else {
      return 0
    }
  })
  return this
};

// Array.prototype.

Array.prototype.kShuffle = function (k): any[] {
  const startingArray = this.slice();
  let numberToShuffle = this.length / 5;
  while (numberToShuffle) {
    const indexToInsert = Math.floor(Math.random() * this.length);
    const add = Math.floor(Math.random() * 2);
    const movement = Math.ceil(Math.random() * k);

    let insertPoint;
    if (add) {
      insertPoint = Math.min(this.length - 1, indexToInsert + movement);
    } else {
      insertPoint = Math.max(0, indexToInsert - movement);
    }
    if (
      insertPoint !== indexToInsert &&
      startingArray[indexToInsert] === this[indexToInsert]
    ) {
      const valueToInsert = this[indexToInsert];
      this.splice(indexToInsert, 1);
      this.splice(insertPoint, 0, valueToInsert);
      numberToShuffle--;
    }
  }
  return this;
};

Array.prototype.distribution = function (): {} {
  const dist: { [value: number]: number } = {};
  const values = this;
  values.forEach((value: number) => {
    dist[value] = (dist[value] || 0) + 1;
  });
  return dist;
};

Array.prototype.sorted = function (): boolean {
  const values = this;
  const ordered = true;
  for (let i = 0; i < values.length - 1; i++) {
    if (values[i] > values[i + 1]) {
      return false;
    }
  }
  return true;
};

Array.prototype.any = function (fun: (item: any, index?: number) => boolean): boolean {
  for (let i = 0; i < this.length; i++) {
    if (fun(this[i], i)) {
      return true;
    }
  }
  return false;
};
