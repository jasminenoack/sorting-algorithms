import { OddEven } from "./base";

export class OddEvenConcurrent extends OddEven {
  public static title = "Odd Even(Concurrent)";
  public next() {
    if (this.done) {
      return [];
    }
    this.steps++;
    const currentNodes = this.currentNodes();
    const values = this.board.values();

    while (this.baseNode !== undefined) {
      if (!this.nodesInOrder(values)) {
        this.swap();
      }
      this.baseNode = this.baseNodes.shift();
      if (this.baseNode) {
        this.comparisonNode = this.baseNode + 1;
      }
    }
    this.setUpNext();
    this.trackProfile();
    return currentNodes;
  }
}
