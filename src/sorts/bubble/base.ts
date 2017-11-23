import { BaseSort } from "../baseSort";

export class Bubble extends BaseSort {
  public static title: string = "Bubble Sort";
  public static links = [
    {
      name: "Bubble Sort: An Archaeological Algorithmic Analysis",
      url: "https://users.cs.duke.edu/~ola/bubble/bubble.pdf",
    },
  ];
  public ordered: boolean;
  public skipSorted: boolean = false;
  public shortCircuit: boolean = false;

  public setUpNext() {
    if (this.comparisonNode === this.end) {
      this.maxRounds--;
      if (this.maxRounds === 0) {
        this.setDone();
      }
      if (this.ordered && this.shortCircuit) {
        this.setDone();
      } else {
        this.ordered = true;
      }
      this.baseNode = 0;
      this.comparisonNode = 1;
      if (this.skipSorted) {
        this.placed.push(this.end);
        this.end--;
        if (this.end === 0) {
          this.setDone();
        }
      }
    } else {
      this.baseNode++;
      this.comparisonNode++;
    }
  }

  public setUp() {
    this.maxRounds = this.length;
    this.ordered = true;
  }
}
