import { isEqual, shuffle } from "lodash";

export interface IShuffle {
  k: number;
  reversed: boolean;
  title: string;
  shuffle: (array: number[]) => number[];
}

export class Shuffle {
  // this is the max distance we move a number
  public static k: number;
  public static reversed: boolean;
  public static title: string;

  public static shuffle(array: number[]) {
    array.sort((x: number, y: number) => {
      if (x < y) {
        return -1;
      } else if (y < x) {
        return 1;
      } else {
        return 0;
      }
    });
    if (this.k === null) {
      const oldArray = array.slice();
      let newArray = array;

      let attempts = 0;

      // try to shuffle a second time if the first doesn't seem to work
      while (oldArray.join(",") === newArray.join(",") && attempts < 10) {
        newArray = shuffle(newArray);
        attempts++;
      }

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < array.length; i++) {
        array[i] = newArray[i];
      }
    } else if (this.k) {
      this.kShuffle(array, this.k);
    }

    if (this.reversed) {
      array.reverse();
    }
    return array;
  }

  private static kShuffle(array: number[], k: number): any[] {
    const startingArray = array.slice();
    let numberToShuffle = array.length / 5;
    while (numberToShuffle) {
      const indexToInsert = Math.floor(Math.random() * array.length);
      const add = Math.floor(Math.random() * 2);
      const movement = Math.ceil(Math.random() * k);

      let insertPoint;
      if (add) {
        insertPoint = Math.min(array.length - 1, indexToInsert + movement);
      } else {
        insertPoint = Math.max(0, indexToInsert - movement);
      }
      if (
        insertPoint !== indexToInsert &&
        startingArray[indexToInsert] === array[indexToInsert]
      ) {
        const valueToInsert = array[indexToInsert];
        array.splice(indexToInsert, 1);
        array.splice(insertPoint, 0, valueToInsert);
        numberToShuffle--;
      }
    }
    return array;
  }
}
