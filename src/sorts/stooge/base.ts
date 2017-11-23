import { BaseSort } from "../baseSort";

export class Stooge extends BaseSort {
  public static title = "Stooge Sort";
  public partitions: number[][];

  public subsets(indexes: number[]) {
    const [first, last] = indexes;
    // find the number of elements
    const diff = last - first + 1;
    // find the number to adjust by
    const sectionSize = Math.ceil(diff * 2 / 3) - 1;
    return [
      [first, first + sectionSize],
      [last - sectionSize, last],
      [first, first + sectionSize],
    ];
  }

  public breakDownSubset(indexes: number[]) {
    let final: number[][] = [indexes];
    while (this.hasLargeEnoughDiff(final[0])) {
      final = this.subsets(final.shift()).concat(final);
    }
    return final;
  }

  public hasLargeEnoughDiff(nums: number[]): boolean {
    return nums[1] - nums[0] >= 2;
  }

  public setUp() {
    this.partitions = this.breakDownSubset([0, this.length - 1]);
    const nextValuess: number[] = this.partitions.shift();
    [this.baseNode, this.comparisonNode] = nextValuess;
  }

  public setUpNext() {
    if (this.partitions.length) {
      let nextValues = this.partitions.shift();
      if (this.hasLargeEnoughDiff(nextValues)) {
        this.partitions = this.breakDownSubset(nextValues).concat(this.partitions);
        nextValues = this.partitions.shift();
      }
      [this.baseNode, this.comparisonNode] = nextValues;
    } else {
      this.setDone();
    }
  }
}
