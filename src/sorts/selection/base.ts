import { BaseSort } from "../baseSort";

export class SelectionSort extends BaseSort {
  public static title = "Selection Sort";
  public baseIndex: number;

  public setUp() {
    this.baseIndex = 0;
  }

  public setUpNext() {
    this.comparisonNode++;
    if (this.comparisonNode === this.length) {
      if (this.baseNode !== this.baseIndex) {
        this.swap([this.baseNode, this.baseIndex]);
      }

      this.baseIndex++;
      this.baseNode = this.baseIndex;
      this.comparisonNode = this.baseNode + 1;

      if (this.baseNode === this.length - 1) {
        this.setDone();
      }
    }
  }

  public next() {
    if (this.done) {
      return [];
    }
    this.steps++;
    const currentNodes = this.currentNodes();
    const values = this.board.values();
    if (!this.nodesInOrder(values)) {
      this.baseNode = this.comparisonNode;
    }
    this.setUpNext();
    this.trackProfile();
    return currentNodes;
  }
}
