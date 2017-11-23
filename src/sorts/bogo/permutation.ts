import { range } from "lodash";
import { BaseSort } from "../baseSort";
import { Bogo } from "./base";

export class Permutation extends BaseSort {
  public static title: string = "Permutation Sort";
  public original: number[];
  public permutation: number[];
  public changed: number[];

  public setUp() {
    this.original = this.board.values().slice();
    this.permutation = range(0, this.board.length);
    this.checkSorted();
    this.changed = [this.length - 1];
  }

  public currentNodes() {
    return this.changed;
  }

  public getHighestPossible(array: number[], highest: number) {
    while (array.indexOf(highest) !== -1) {
      highest--;
    }
    return highest;
  }

  public findNextPermutation() {
    const nextPermutation = this.permutation;
    let lastValue = nextPermutation.pop();

    while (lastValue === this.getHighestPossible(nextPermutation, this.length - 1)) {
      lastValue = nextPermutation.pop();
    }

    if (this.changed.indexOf(nextPermutation.length) === -1) {
      this.changed.push(nextPermutation.length);
    }

    let nextNum = lastValue + 1;
    while (nextPermutation.length < this.length) {
      if (nextPermutation.indexOf(nextNum) === -1) {
        nextPermutation.push(nextNum);
        nextNum = 0;
      } else {
        nextNum++;
      }
    }
  }

  public setValues() {
    const values: number[] = [];
    const oldValues = this.original;
    const currentBoard = this.board.values();
    this.permutation.forEach((index, i) => {
      if (currentBoard[i] !== oldValues[index]) {
        this.swaps++;
      }
      values.push(oldValues[index]);
    });
    this.board.setPoints(values);
  }

  public next() {
    if (this.done) {
      return [];
    }
    this.steps++;
    this.findNextPermutation();
    this.setValues();
    this.checkSorted();
    this.trackProfile();
    return this.currentNodes();
  }
}
