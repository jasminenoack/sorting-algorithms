import { BaseSort } from "../baseSort";

export class Insertion extends BaseSort {
  public static title = "Insertion Sort";
  public insertValue: number = null;

  public setUp() {
    this.baseNode = 1;
  }

  public currentNodes() {
    if (this.done) {
      return [];
    }
    const nodes = [this.baseNode];
    if (this.comparisonNode >= 0) {
      nodes.push(this.comparisonNode);
    }
    return nodes;
  }

  public next() {
    if (this.done) {
      return [];
    }
    this.steps++;

    if (this.insertValue === null) {
      this.insertValue = this.board.values()[this.baseNode];
      this.shadow = [{ index: this.baseNode, value: this.insertValue }];
      this.comparisonNode = this.baseNode - 1;
    }

    let nodes = [this.baseNode];

    this.comparisons++;
    if (this.insertValue < this.board.values()[this.comparisonNode]) {
      nodes = [this.comparisonNode, this.baseNode];
      this.swaps += 0.5;
      this.board.set(
        this.comparisonNode + 1,
        this.board.values()[this.comparisonNode],
      );
      this.comparisonNode--;
    } else {
      if (this.comparisonNode + 1 !== this.baseNode) {
        nodes = [this.comparisonNode + 1];
        this.swaps += 0.5;
        this.board.set(
          this.comparisonNode + 1,
          this.insertValue,
        );
      }
      this.baseNode++;
      this.insertValue = null;
    }

    if (this.baseNode === this.length) {
      this.setDone();
    }
    this.trackProfile();
    return nodes;
  }
}
