import { BaseSort } from "../baseSort";

export class Comb extends BaseSort {
  // test different shrinks
  // test ceil over floor
  public static title = "Comb Sort";
  public static shrink: number = 1.3;
  public gap: number;
  public shrink: number;

  public setUp() {
    this.shrink = (this.constructor as any).shrink;
    this.gap = Math.floor(this.length / this.shrink);
    this.comparisonNode = 0 + this.gap;
  }

  public setUpNext() {
    this.baseNode++;
    this.comparisonNode++;

    if (this.comparisonNode >= this.length) {
      if (this.ordered === true && this.gap === 1) {
        this.setDone();
      }
      this.gap = Math.max(Math.floor(this.gap / this.shrink), 1);
      this.baseNode = 0;
      this.comparisonNode = this.gap;
      this.ordered = true;
    }
  }
}
