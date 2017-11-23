import { BaseSort } from "../baseSort";

export class Heap extends BaseSort {
  public static title = "Heap Sort";
  public nodesToHeap: number[];

  public setUp() {
    this.nodesToHeap = [];
    const heapIndex = Math.floor(this.length / 2) - 1;
    for (let i = heapIndex; i >= 0; i--) {
      this.nodesToHeap.push(i);
    }
    this.comparisonNode = this.length - 1;
  }

  public currentNodes() {
    if (this.done) {
      return [];
    }
    if (this.nodesToHeap.length) {
      return [this.nodesToHeap[0]];
    } else {
      return [0];
    }
  }

  public heapify(node: number) {
    const values = this.board.values();
    const comparison = values[node];
    const leftChild = (2 * node) + 1;
    const rightChild = (2 * node) + 2;
    const left = leftChild <= this.comparisonNode && values[leftChild];
    const right = rightChild <= this.comparisonNode && values[rightChild];
    let swapNode;
    this.comparisons += 2;
    if (((left || left === 0) && left > comparison) || ((right || right === 0) && right > comparison)) {
      this.comparisons++;
      if ((right || right === 0) && right > left) {
        swapNode = rightChild;
      } else {
        swapNode = leftChild;
      }
      this.swap([node, swapNode]);
      const possibleChild = (2 * swapNode) + 1;
      if (possibleChild <= this.comparisonNode) {
        this.nodesToHeap.unshift(swapNode);
      }
    }
  }

  public removeNode() {
    this.swap([0, this.comparisonNode]);
    this.placed.push(this.comparisonNode);
    this.nodesToHeap.unshift(0);
    this.comparisonNode--;
  }

  public next() {
    if (this.done) {
      return [];
    }
    this.steps++;
    const currentNodes = [];
    if (this.nodesToHeap.length) {
      const node = this.nodesToHeap.shift();
      currentNodes.push(node);
      this.heapify(node);
    } else {
      this.removeNode();
    }
    if (this.comparisonNode === 0) {
      this.setDone();
    }
    this.trackProfile();
    return currentNodes;
  }
}
