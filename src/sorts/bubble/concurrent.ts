import { Bubble } from "./base";

export class BubbleSortConcurrent extends Bubble {
  public static title = "Bubble Sort(Concurrent 2)";
  public static numberConcurrent = 2;
  public numberConcurrent: number;
  public baseNodes: number[];
  public orderedSets: boolean[];
  public fullRound: boolean[];

  public setUp() {
    super.setUp();
    this.numberConcurrent = (this.constructor as any).numberConcurrent;
    this.setUpBaseNodes();
  }

  public setUpBaseNodes(base: number = 0) {
    // sets up base nodes with a minimum diff of 2
    let numberConcurrent = this.numberConcurrent;
    let nodeDiffs = Math.floor(this.length / numberConcurrent);
    if (nodeDiffs < 2) {
      nodeDiffs = 2;
      numberConcurrent = Math.floor(this.length / 2);
    }
    this.baseNodes = [];
    this.orderedSets = [];
    this.fullRound = [];
    for (let i = 0; i < numberConcurrent; i++) {
      this.baseNodes.push(0 + i * nodeDiffs);
      if (i === 0) {
        this.orderedSets.push(true);
        this.fullRound.push(true);
      } else {
        this.orderedSets.push(false);
        this.fullRound.push(false);
      }
    }
  }

  public currentNodes() {
    if (this.done) {
      return [];
    }
    return this.baseNodes;
  }

  public setUpNext() {
    let indexToRemove;
    this.baseNodes.forEach((node, index) => {
      this.baseNodes[index] += 1;
    });
    this.baseNodes.forEach((node, index) => {
      if (node === this.end) {
        if (this.fullRound[index]) {
          this.placed.push(this.end);
          this.end--;
          this.maxRounds--;
          if (this.maxRounds === 0) {
            this.setDone();
          }
        }
        if (this.end === 0) {
          this.setDone();
        }
        if (this.orderedSets[index]) {
          this.setDone();
        }

        let nextIndex;
        if (index < this.baseNodes.length - 1) {
          nextIndex = index + 1;
        } else {
          nextIndex = 0;
        }

        if (this.baseNodes[nextIndex] <= 1 && this.fullRound[index]) {
          indexToRemove = index;
        } else {
          this.baseNodes[index] = 0;
        }
        this.orderedSets[index] = true;
        this.fullRound[index] = true;
      }
    });
    if (indexToRemove !== undefined) {
      this.baseNodes.splice(indexToRemove, 1);
      this.orderedSets.splice(indexToRemove, 1);
      this.fullRound.splice(indexToRemove, 1);
    }
  }

  public specificNodesInOrder(values: number[], firstIndex: number, secondIndex: number) {
    this.comparisons++;
    return values[firstIndex] < values[secondIndex];
  }

  public next() {
    if (this.done) {
      return [];
    }
    this.steps++;
    const currentNodes = this.currentNodes().slice();
    const values = this.board.values();
    const nodes = currentNodes;
    currentNodes.forEach((node, index) => {
      if (!this.specificNodesInOrder(values, node, node + 1)) {
        this.orderedSets[index] = false;
        this.swap([node, node + 1]);
      }
    });
    this.setUpNext();
    this.trackProfile();
    return currentNodes;
  }
}
