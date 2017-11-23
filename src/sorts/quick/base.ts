import { BaseSort } from "../baseSort";

export class QuickSort2 extends BaseSort {
  public static title = "Quick Sort(Left Partition)";
  public addToUpdate: number[];
  public partition: number;
  public partitions: any[];
  public partitionValue: number;
  public lower: number;
  public higher: number;
  public partitionStart: number;
  public partitionEnd: number;
  // for 3-way partition
  public partitionTop: number;
  public threeWay: boolean = false;

  public setUp() {
    this.addToUpdate = [];
    this.partitions = [];
    this.setUpValues([this.baseNode, this.length - 1]);
  }

  public setUpValues(values: number[]) {
    this.lower = values[0];
    this.higher = values[0];
    this.partitionStart = values[0];
    this.partitionEnd = values[1];
    this.setPartition();
    this.partitionTop = this.partition;
  }

  public currentNodes() {
    const nodes = [];
    if (this.partition !== this.lower) {
      nodes.push(this.lower);
    }
    nodes.push(this.partition);
    if (this.partition !== this.higher) {
      nodes.push(this.higher);
    }
    return nodes;
  }

  public setUpNext(): number[] {
    // if higher is at the end of the current partition
    if (this.higher === this.partitionEnd) {
      if (this.threeWay) {
        for (let i = this.partition; i <= this.partitionTop; i++) {
          this.placed.push(i);
        }
      } else {
        this.placed.push(this.partition);
      }
      const partitions = this.partitions;
      let topLow;
      if (this.threeWay) {
        topLow = this.partitionTop;
      } else {
        topLow = this.partition;
      }

      if (this.higher > topLow + 1) {
        partitions.unshift([topLow + 1, this.higher]);
      }
      if (this.lower < this.partition - 1) {
        partitions.unshift([this.lower, this.partition - 1]);
      }

      if (partitions.length) {
        const newPartition = partitions.shift();
        this.setUpValues(newPartition);
      } else {
        this.setDone();
        return [];
      }
    }
  }

  public setPartition() {
    this.partition = this.lower;
  }

  public next() {
    if (this.done) {
      return [];
    }
    this.steps++;

    const valuesToUpdate: number[] = [];
    // look at the next value
    this.higher++;
    const values = this.board.values();

    this.comparisons++;
    const threeWay = this.threeWay && values[this.higher] === values[this.partition];
    if (values[this.higher] < values[this.partition] || threeWay) {
      // if the value at higher is less than the partition
      this.swaps++;
      const temp = values.splice(this.higher, 1)[0];
      values.splice(this.partition, 0, temp);
      this.board.setPoints(values);

      if (threeWay) {
        this.partitionTop++;
      } else {
        this.partition++;
        this.partitionTop++;
      }

      for (let i = this.partition - 1; i <= this.higher; i++) {
        if (i >= 0) {
          valuesToUpdate.push(i);
        }
      }
    }
    if (
      this.addToUpdate.length
    ) {
      this.addToUpdate.forEach((index) => {
        if (valuesToUpdate.indexOf(index) === -1) {
          valuesToUpdate.push(index);
        }
      });
      this.addToUpdate = [];
    }
    this.setUpNext();
    this.trackProfile();
    return valuesToUpdate;
  }
}
