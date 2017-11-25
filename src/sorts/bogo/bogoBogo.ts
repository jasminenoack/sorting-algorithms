import { shuffle } from "lodash";
import { BaseSort } from "../baseSort";

export class BogoBogo extends BaseSort {
  public static title: string = "Bogobogosort";

  public currentTop: number;
  public setUp() {
    this.currentTop = 0;
  }

  public currentNodes() {
    return [this.currentTop];
  }

  public next() {
    if (this.done) {
      return [];
    }
    const currentNodes = this.currentNodes();
    this.steps++;

    const values = this.board.values();
    this.comparisons++;
    if (values[this.currentTop] <= values[this.currentTop + 1]) {
      this.currentTop++;
    } else {
      const start = values.slice();
      const shuffledSubset = shuffle((values.slice(0, this.currentTop + 2) as any));
      values.splice(0, shuffledSubset.length, ...shuffledSubset);
      this.board.setPoints(values);
      let difference = 0;
      for (let i = 0; i < values.length; i++) {
        if (values[i] !== start[i]) {
          difference++;
        }
      }
      this.swaps += difference / 2;

      this.currentTop = 0;
    }

    if (this.currentTop === this.length - 1) {
      this.setDone();
    }

    this.trackProfile();
    return currentNodes;
  }
}
