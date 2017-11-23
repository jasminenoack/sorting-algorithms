import { QuickSort2 } from "./base";

export class QuickSort2Random extends QuickSort2 {
  public static title = "Quick Sort(Random Partition)";

  public setPartition() {
    const diff = this.partitionEnd - this.partitionStart + 1;
    const index = this.partitionStart + Math.floor(Math.random() * diff);
    this.partition = this.lower;
    const temp = this.board.get(index).value;
    this.board.set(index, this.board.get(this.partition).value);
    this.board.set(this.partition, temp);
    this.addToUpdate = [this.lower, index];
  }
}
