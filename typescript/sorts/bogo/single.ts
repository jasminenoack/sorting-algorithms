import { BaseSort } from "./../baseSort";

export class BogoSingle extends BaseSort {
  public static title = "Bozo(Single Swap)";
  public setUp() {
    this.checkSorted();
    this.setUpNext();
  }

  public nodesInOrder(values: number[]) {
    // always swap
    return false;
  }

  public setUpNext() {
    const first = Math.floor(Math.random() * this.length);
    let second = Math.floor(Math.random() * this.length);
    while (first === second) {
      second = Math.floor(Math.random() * this.length);
    }
    this.baseNode = Math.min(first, second);
    this.comparisonNode = Math.max(first, second);
  }

  public next() {
    const currentNodes = this.currentNodes();
    super.next();
    this.checkSorted();
    this.trackProfile();
    return currentNodes;
  }
}
