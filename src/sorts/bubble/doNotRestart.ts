import { Bubble } from "./base";

export class BubbleSortDontRestart extends Bubble {
  public static title = "Bubble(Don't restart)";
  public looking: boolean;

  public swapValues(index1: number, index2: number) {
    this.looking = false;
    this.swaps++;
    const baseValue = this.board.get(this.baseNode).value;
    const newValues = this.board.values().slice();
    newValues.splice(index1, 1);
    newValues.splice(index2 - 1, 0, baseValue);
    this.board.setPoints(newValues);
    this.baseNode = Math.max(index1 - 1, 0);
    this.comparisonNode = this.baseNode + 1;
  }

  public next() {
    if (this.done) {
      return [];
    }
    this.steps++;
    const currentNodes = this.currentNodes();

    const values = this.board.values();
    if (!this.nodesInOrder(values)) {
      this.looking = true;
      this.comparisonNode++;
      if (this.comparisonNode === this.length) {
        this.swapValues(this.baseNode, this.comparisonNode);
      }
    } else if (this.looking) {
      this.swapValues(this.baseNode, this.comparisonNode);
    } else {
      this.baseNode++;
      this.comparisonNode++;
      if (this.comparisonNode === this.length) {
        this.setDone();
      }
    }
    this.trackProfile();
    return currentNodes;
  }
}
