import { range } from "lodash";
import { BaseSort } from "../baseSort";

export class Gravity extends BaseSort {
  public static title = "Gravity Sort(positive integers only)";

  public setUp() {
    this.shadow = [];
  }

  public handleCurrentShadow() {
    const currentShadow = this.shadow.shift();
    let shadowValue = currentShadow.value;
    if (!shadowValue) {
      return;
    }
    let lowestIndex = 0;
    this.comparisons++;
    while (
      this.board.get(lowestIndex).value ===
      (this.board.get(lowestIndex + 1) && this.board.get(lowestIndex + 1).value)
    ) {
      if (lowestIndex) {
        this.comparisons++;
      }
      lowestIndex++;
    }

    while (lowestIndex) {
      const point = this.board.get(lowestIndex);
      const currentValue = point.value;
      if (lowestIndex === this.end) {
        const newValue = currentValue + shadowValue;
        point.value = newValue;
        shadowValue -= shadowValue;
        break;
      }

      const nextIndex = lowestIndex + 1;
      const nextPoint = this.board.get(lowestIndex + 1);
      const nextValue = nextPoint.value;
      this.comparisons++;
      if (nextValue !== currentValue) {
        const additional = Math.min(shadowValue, nextValue - currentValue);
        const newValue = currentValue + additional;
        point.value = newValue;
        shadowValue -= additional;
      }
      lowestIndex = nextIndex;
    }
  }

  public next() {
    if (this.done) {
      return [];
    }
    this.steps++;
    const currentNodes = this.currentNodes();
    if (!this.shadow.length) {
      const board = this.board;
      board.points.forEach((point) => {
        this.shadow.push({ index: point.index, value: point.value });
        point.value = 0;
      });
    } else {
      this.handleCurrentShadow();
      if (!this.shadow.length) {
        this.done = true;
      }
      this.trackProfile();
    }
    return currentNodes;
  }

  public currentNodes() {
    if (this.done) {
      return [];
    } else if (!this.shadow.length) {
      return range(0, this.board.length);
    }
    const count = this.board.length;
    const shadowValue = this.shadow[0].value;
    return range(count - shadowValue, count);
  }
}
