import * as Boards from "../board";

declare const firebase: any;

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
  public profile: { [key: string]: Array<{ [key: string]: number }> };
  public nextItemToAdd: number;
  public database: any;

  constructor(public board: Boards.Board, public trackAll: boolean = false) {
    if (window.firebase) {
      this.database = firebase.database();
    }
    this.baseSetUp();
  }

  public setUpNext(): void { return; }

  public writeToDatabase() {
    if (this.database) {
      firebase.auth().signInAnonymously();
      firebase.database().ref("sortstats/").push({
        sort_name: (this.constructor as any).title,
        order: this.board.shuffle.title,
        value_type: this.board.valueType.title,
        point_count: this.length,
        steps: this.steps,
        comparisons: this.comparisons,
        swaps: this.swaps,
      });
    }
  }

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
    this.writeToDatabase();
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
      swaps: [],
      comparisons: [],
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
    this.setUp();
  }

  public setUp() {
    console.log("not implemented");
    console.log((this.constructor as any).title);
  }
}
