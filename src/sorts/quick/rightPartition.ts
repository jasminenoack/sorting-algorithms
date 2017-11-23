import { QuickSort2 } from "./base";

export class QuickSort2RightPartition extends QuickSort2 {
  public static title = "Quick Sort(Right Partition)";

  public setPartition() {
    this.partition = this.lower;
    const temp = this.board.get(this.partitionEnd).value;
    this.board.set(this.partitionEnd, this.board.get(this.partition).value);
    this.board.set(this.partition, temp);
    this.addToUpdate = [this.lower, this.partitionEnd];
  }
}
