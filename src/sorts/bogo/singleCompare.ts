import { BogoSingle } from "./single";

export class BogoSingleCompare extends BogoSingle {
  public static title = "Smart Bozo(Compare & Single Swap)";
  public nodesInOrder(values: number[]) {
    // used to compare nodes
    const inOrder = values[this.baseNode] <= values[this.comparisonNode];
    if (!inOrder) {
      this.ordered = false;
    }
    this.comparisons++;
    return inOrder;
  }
}
