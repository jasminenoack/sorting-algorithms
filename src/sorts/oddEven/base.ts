import { BaseSort } from "../baseSort";

export class OddEven extends BaseSort {
  public static title = "Odd Even(Single Processor)";
  public oddPhase: boolean;
  public oddSorted: boolean;
  public evenSorted: boolean;
  public baseNodes: number[];

  public setUp() {
    this.oddPhase = true;
    this.oddSorted = false;
    this.evenSorted = false;
    this.setUpLists();
    this.baseNode = this.baseNodes.shift();
    this.comparisonNode = this.baseNode + 1;
  }

  public setUpLists() {
    this.baseNodes = [];
    if (this.oddPhase) {
      for (let i = 1; i < this.length - 1; i += 2) {
        this.baseNodes.push(i);
      }
    } else {
      for (let i = 0; i < this.length - 1; i += 2) {
        this.baseNodes.push(i);
      }
    }
  }

  public swap() {
    super.swap([this.baseNode, this.comparisonNode]);
  }

  public setUpNext() {
    if (!this.baseNodes.length) {
      if (this.ordered) {
        if (this.oddPhase) {
          this.oddSorted = true;
        } else {
          this.evenSorted = true;
        }
      } else {
        this.oddSorted = false;
        this.evenSorted = false;
      }
      if (this.evenSorted && this.oddSorted) {
        this.setDone();
        return;
      }
      this.oddPhase = !this.oddPhase;
      this.setUpLists();
      this.ordered = true;
    }
    this.baseNode = this.baseNodes.shift();
    this.comparisonNode = this.baseNode + 1;
  }

  public currentNodes() {
    if (this.baseNode !== undefined) {
      return [this.baseNode].concat(this.baseNodes);
    }
    return this.baseNodes;
  }
}
