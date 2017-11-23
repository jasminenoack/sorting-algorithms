import { BaseSort } from "../baseSort";

export class Smooth extends BaseSort {
  public static fromBottom: boolean = false;
  public static title = "Smooth Sort";
  public static links = [
    {
      name: "Smoothsort's Behavior on Presorted Sequences",
      url: "http://scidok.sulb.uni-saarland.de/volltexte/2011/4062/pdf/fb14_1982_11.pdf",
    },
  ];
  // size of each tree
  public treeSizes: number[];
  // tree roots
  public roots: number[];
  // numbers
  public leonardoNumbers: number[];
  public nodesToHeap: number[];
  public rootsToCompare: number[];
  public fromBottom: boolean;

  public setUp() {
    this.leonardoNumbers = [];
    this.nodesToHeap = [];
    this.rootsToCompare = [];
    this.roots = [];
    this.treeSizes = [];
    this.fromBottom = (this.constructor as any).fromBottom;
    this.setUpNumbers(this.fromBottom);
  }

  public setUpNumbers(fromBottom: boolean) {
    this.leonardoNumbers = this.getLeoNums(this.length);
    if (!fromBottom) {
      this.treeSizes = this.getTreeSizes(this.length);
    }
  }

  public getLeoNums(length: number) {
    const numbers = [1, 1];
    while (true) {
      const nextNum = numbers[numbers.length - 1] + numbers[numbers.length - 2] + 1;
      if (nextNum >= this.length) {
        break;
      }
      numbers.push(nextNum);
    }
    return numbers;
  }

  public getTreeSizes(length: number) {
    const numbers = [];
    for (let i = 0; i < length; i++) {
      const sub1: number = numbers[i - 1];
      const sub2: number = numbers[i - 1 - sub1];
      if (this.leonardoNumbers.indexOf(sub1 + sub2 + 1) !== -1) {
        numbers.push(sub1 + sub2 + 1);
        this.roots.splice(this.roots.length - 2, 2, i);
        if (!this.fromBottom) {
          this.nodesToHeap.push(i);
        }
      } else {
        numbers.push(1);
        this.roots.push(i);
      }
    }
    this.rootsToCompare = this.roots.slice();
    return numbers;
  }

  public currentNodes() {
    if (this.done) {
      return [];
    }
    let nodes: number[];
    if (this.nodesToHeap.length) {
      return [this.nodesToHeap[0]];
    } else if (this.rootsToCompare.length) {
      return [this.rootsToCompare[0]];
    } else {
      return [this.roots[this.roots.length - 1]];
    }
  }

  public next() {
    if (this.done) {
      return [];
    }
    this.steps++;
    let nodes: number[];
    if (this.nodesToHeap.length) {
      nodes = this.heapify(this.nodesToHeap.shift());
    } else if (this.rootsToCompare.length) {
      nodes = this.compare(this.rootsToCompare);
    } else if (this.fromBottom && this.baseNode < this.length) {
      nodes = this.addNextNode(this.baseNode);
      this.baseNode++;
    } else {
      nodes = this.remove(this.roots.pop());
    }
    if (!this.roots.length && !(this.fromBottom && this.baseNode < this.length)) {
      this.setDone();
    }
    this.trackProfile();
    return nodes;
  }

  public addNextNode(index: number) {
    const [sub1, sub2] = this.getChildren(index);
    let nodes;

    if (sub2 < 0) {
      // there is only sub 1
      this.roots.push(index);
      nodes = this.compare(this.roots.slice());
      this.treeSizes.push(1);
    } else if (this.leonardoNumbers.indexOf(1 + this.treeSizes[sub1] + this.treeSizes[sub2]) !== -1) {
      // combine trees
      nodes = this.heapify(index);
      this.roots.splice(this.roots.length - 2, 2, index);
      this.treeSizes.push(1 + this.treeSizes[sub1] + this.treeSizes[sub2]);
    } else {
      // we are adding a tree
      this.treeSizes.push(1);
      this.roots.push(index);
      nodes = this.compare(this.roots.slice());
    }
    return nodes;
  }

  public compare(nodes: number[]) {
    const current = nodes.slice();
    const endpoint = nodes[nodes.length - 1];
    let maxNode = nodes[0];
    const values = this.board.values();
    for (let i = 1; i < nodes.length; i++) {
      this.comparisons++;
      if (values[maxNode] < values[nodes[i]]) {
        maxNode = nodes[i];
      }
    }

    if (maxNode !== endpoint) {
      this.swap([maxNode, endpoint]);
      if (this.treeSizes[maxNode] > 1) {
        this.nodesToHeap.push(maxNode);
      }
    }

    if (nodes.length > 2) {
      const pickedIndex = nodes.indexOf(maxNode);
      nodes.splice(nodes.length - 1, 1);
      this.rootsToCompare = nodes;
    } else {
      this.rootsToCompare = [];
    }
    return current;
  }

  public remove(index: number) {
    const nodes = [index];
    if (this.treeSizes[index] > 1) {
      const [sub1, sub2] = this.getChildren(index);
      let prevRoot: number;
      this.roots.push(sub2);
      this.roots.push(sub1);
      this.rootsToCompare = this.roots.slice();
    }
    this.placed.push(index);
    return nodes;
  }

  public getChildren(index: number) {
    const sub1 = index - 1;
    const sub2 = sub1 - this.treeSizes[sub1];
    return [sub1, sub2];
  }

  public heapify(index: number) {
    let nodes = [index];
    const [sub1, sub2] = this.getChildren(index);
    this.comparisons += 2;
    const values = this.board.values();
    if (values[index] < values[sub1] || values[index] < values[sub2]) {
      this.comparisons++;
      const high = values[sub2] > values[sub1] ? sub2 : sub1;
      this.swap([index, high]);
      nodes = [index, high];
      if (this.treeSizes[high] > 1) {
        this.nodesToHeap.unshift(high);
      }
    }
    return nodes;
  }
}
