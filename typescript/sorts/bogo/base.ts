import { range } from "lodash";
import { RandomShuffle } from "./../../shuffles/random";
import { BaseSort } from "./../baseSort";

export class Bogo extends BaseSort {
  public static title: string = "Bogo";
  public setUp() {
    this.checkSorted();
  }

  public currentNodes() {
    if (!this.done) {
      return range(0, this.board.length);
    } else {
      return [];
    }
  }

  public next() {
    if (this.done) {
      return [];
    }
    const currentNodes = this.currentNodes();
    this.steps++;
    const values = this.board.values();
    const start = values.slice();
    this.board.setPoints(RandomShuffle.shuffle(values));
    let difference = 0;
    for (let i = 0; i < values.length; i++) {
      if (values[i] !== start[i]) {
        difference++;
      }
    }
    this.swaps += difference / 2;
    this.checkSorted();
    this.trackProfile();
    return currentNodes;
  }
}
