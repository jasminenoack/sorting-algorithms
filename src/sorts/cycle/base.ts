import { range } from "lodash";
import { BaseSort } from "../baseSort";

export class Cycle extends BaseSort {
  public static title = "Cycle Sort";
  public static links = [
    {
      name: "Cyclesort - a curious little sorting algorithm",
      url: "https://corte.si/posts/code/cyclesort/index.html",
    },
  ];
  public skipPlaced: boolean = false;
  public currentValue: number;
  public numberLess: number;

  public setUp() {
    this.setCurrentValue(this.baseNode);
    this.numberLess = 0;
  }

  public currentNodes() {
    return [this.comparisonNode];
  }

  public setCurrentValue(index: number) {
    this.currentValue = this.board.values()[index];
    this.shadow = [{ index: this.baseNode, value: this.currentValue }];
  }

  public next() {
    if (this.done) {
      return [];
    }
    this.steps++;
    const currentNodes = range(0, this.length);
    const values = this.board.values();
    this.lesserThanComparison(values);
    this.setUpNext();
    this.trackProfile();
    return currentNodes;
  }

  public lesserThanComparison(values: number[]) {
    this.comparisons++;
    if (this.currentValue > values[this.comparisonNode]) {
      this.numberLess++;
    }
  }

  public setUpNext() {
    let index = this.numberLess + this.baseNode;
    this.comparisonNode++;
    if (this.comparisonNode === this.baseNode) {
      this.comparisonNode++;
    }
    if (this.comparisonNode === this.length) {
      this.placed.push(index);
      if (
        index !== this.baseNode ||
        this.currentValue !== this.board.values()[this.baseNode]
      ) {
        const values = this.board.values();
        while (values[index] === this.currentValue) {
          index++;
        }
        const oldValue = this.currentValue;
        this.setCurrentValue(index);
        this.board.set(index, oldValue);
        this.swaps++;
      }
      if (this.baseNode === index) {
        this.baseNode++;
        while (this.skipPlaced && this.placed.indexOf(this.baseNode) !== -1) {
          this.baseNode++;
        }
        this.setCurrentValue(this.baseNode);
      }

      this.comparisonNode = this.baseNode + 1;
      this.numberLess = 0;

      if (this.baseNode >= this.length - 1) {
        this.setDone();
      }
    }
  }
}
