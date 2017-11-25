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
  /**
   * All
   */
  // The title of the sort
  public static title: string = "";
  // links to articles, more fun than meaningful
  public static links: any[];
  // If the sort is completed
  public done: boolean;

  /**
   * All Data
   */
  // how many steps have been taken
  public steps: number;
  // the number of comparisons
  public comparisons: number;
  // the number of swaps
  public swaps: number;
  // the data profile
  public profile: { [key: string]: IDatum[] };
  // Determine if we should track a point in the profile
  public nextItemToAdd: number;
  // The number of points
  public length: number;

  /**
   * Nodes being compared
   */
  public baseNode: number;
  public comparisonNode: number;
  // a group of base nodes
  public baseNodes?: number[]; // odd even && bubble

  /**
   * Permutation sort
   * -- always available.
   */
  // the original order of the values.
  public original: number[];

  /**
   * Used in determining when to end a sort.
   */
  // Are the elements in order
  public ordered: boolean; // Bubble, Comb, Cocktail, Bogo, OddEven
  // the start of the section being sorted
  public start?: number;
  // The end of the section being sorted
  public end: number; // bubble, cocktail
  // Elements that we know are in place
  public placed: number[]; // Bubble, Cocktail, Cycle, Heap, Quick, Smooth
  // Shadow Element being considered ((Used for display))
  public shadow: any[]; // cycle, insertion

  /**
   * Gnome
   */
  // track if we swapped the last two elements
  public lastSwapped: boolean;
  // The element that is the current gnome
  public currentGnome?: number;

  /**
   * Cocktail
   */
  // what direction are we sorting in.
  public direction?: number;

  /**
   * Figuring out
   */
  public maxRounds: number;

  /**
   * Bubble
   */
  // tracks sets for bubble concurrent;
  public orderedSets?: boolean[];

  /**
   * Comb
   */
  // the gap between the points
  public gap?: number;
  // the amount to shrink between rounds
  public shrink?: number;

  /**
   * Cycle
   */
  // The value we are looking for.
  public currentValue?: number;
  // The number lower than the value
  public numberLess?: number;

  /**
   * Partitions
   */
  // The element that is the partition
  public partition?: number; // quick
  // The element where the partition starts
  public partitionStart?: number; // quick
  // The element where the partition ends
  public partitionEnd?: number; // quick
  // The top of the partition
  public partitionTop?: number; // quick
  // A list of the partitions
  public partitions?: number[][]; // quick && cycle
  // the start index of the parition
  public lower?: number;
  // the end index of the partition
  public higher?: number;

  /**
   * Bogo
   */
  // the current permutation
  public permutation?: number[]; // permutation
  // the current top number
  public currentTop?: number; // bogobogo

  /**
   * Smooth
   */
  // The number of elements in the tree starting at the given element
  public treeSizes?: number[];
  // The list of leonardo numbers
  public leonardoNumbers?: number[];
  // list of roots for the heaps
  public roots?: number[];
  // list of roots that we need to compare
  public rootsToCompare?: number[];

  /**
   * Heaping
   */
  // list of nodes that we need to run a heap on.
  public nodesToHeap?: number[]; // smooth && heap

  /**
   * Odd Even Sort
   */
  // even round was sorted
  public evenSorted?: boolean;
  // odd round was sorted
  public oddSorted?: boolean;
  // Are we looking at odd numbers
  public oddPhase?: boolean;

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
