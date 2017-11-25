import * as Boards from "../board";

/**
 * database structure:
 *
 * sort_name:
 * order:
 * value_type:
 * point_count:
 * steps:
 * comparisons: []
 * swaps: []
 */

export interface IDatum {
  x: number;
  y: number;
}

export abstract class BaseSort {
  public static title: string = "";
  public static links: any[];
  public steps: number;
  public baseNode: number;
  public comparisonNode: number;
  // used for sorts that short circuit
  public done: boolean;
  // used for sorts that short circuit
  public ordered: boolean;
  public comparisons: number;
  public swaps: number;
  public length: number;
  public end: number;
  public maxRounds: number;
  public placed: number[];
  public shadow: any[];
  public lastSwapped: boolean;
  public profile: { [key: string]: IDatum[] };
  public nextItemToAdd: number;
  public direction?: number;
  public start?: number;
  public baseNodes?: number[];
  public orderedSets?: boolean[];
  public gap?: number;
  public shrink?: number;
  public currentValue?: number;
  public numberLess?: number;
  public partition?: number;
  public lower?: number;
  public higher?: number;
  public partitionStart?: number;
  public partitionEnd?: number;
  public partitionTop?: number;
  public partitions?: number[][];
  public original: number[];
  public permutation?: number[];
  public evenSorted?: boolean;
  public oddSorted?: boolean;
  public oddPhase?: boolean;
  public leonardoNumbers?: number[];
  public treeSizes?: number[];
  public nodesToHeap?: number[];
  public roots?: number[];
  public rootsToCompare?: number[];
  public currentTop?: number;
  public currentGnome?: number;

  constructor(public board: Boards.Board, public trackAll: boolean = false) {
    this.baseSetUp();
  }

  public subsets(num: number[]): number[][] { return []; }

  public breakDownSubset(num: number[]): number[][] { return []; }

  public setUpNext(): void { return; }

  public checkSorted() {
    let result = true;
    const values = this.board.values();
    for (let i = 0; i < values.length - 1; i++) {
      this.comparisons++;
      if (values[i] > values[i + 1]) {
        result = false;
        break;
      }
    }
    this.done = result;
    return this.done;
  }

  public setDone() {
    this.done = true;
  }

  public currentNodes() {
    if (this.done) {
      return [];
    }
    return [this.baseNode, this.comparisonNode];
  }

  public nodesInOrder(values: number[]) {
    // used to compare nodes
    const inOrder = values[this.baseNode] <= values[this.comparisonNode];
    if (!inOrder) {
      this.ordered = false;
      this.lastSwapped = true;
    } else {
      this.lastSwapped = false;
    }
    this.comparisons++;
    return inOrder;
  }

  public swap(currentNodes: number[]) {
    this.swaps++;
    this.board.swap.apply(this.board, currentNodes);
  }

  public next() {
    if (this.done) {
      return [];
    }
    this.steps++;
    const currentNodes = this.currentNodes();
    const values = this.board.values();
    if (!this.nodesInOrder(values)) {
      this.swap(currentNodes);
    }
    this.setUpNext();
    this.trackProfile();
    return currentNodes;
  }

  public trackProfile() {
    if (this.steps === this.nextItemToAdd || this.done) {
      this.profile.swaps.push({
        x: this.steps,
        y: this.swaps,
      });
      this.profile.comparisons.push({
        x: this.steps,
        y: this.comparisons,
      });
      if (this.trackAll) {
        this.nextItemToAdd++;
      } else {
        this.nextItemToAdd = Math.ceil(Math.min(this.nextItemToAdd * 1.1, this.nextItemToAdd + 16));
      }
    }
  }

  public reset() {
    this.board.shuffleBoard();
    this.baseSetUp();
    return this;
  }

  public baseSetUp() {
    this.profile = {
      comparisons: [],
      swaps: [],
    };
    this.length = this.board.length;
    this.baseNode = 0;
    this.comparisonNode = 1;
    this.end = this.length - 1;
    this.done = false;
    this.swaps = 0;
    this.comparisons = 0;
    this.steps = 0;
    this.baseNode = 0;
    this.comparisonNode = 1;
    this.length = this.board.length;
    this.end = this.length - 1;
    this.lastSwapped = false;
    this.ordered = true;
    this.placed = [];
    this.shadow = [];
    this.nextItemToAdd = 1;
    this.original = this.board.values().slice();
    this.setUp();
  }

  public setUp() {
    // tslint:disable-next-line:no-console
    console.log("not implemented");
    // tslint:disable-next-line:no-console
    console.log((this.constructor as any).title);
  }
}
