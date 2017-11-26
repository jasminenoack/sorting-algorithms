import { flatten, range, take, takeRight } from "lodash";
import { BaseSort } from "../baseSort";

export class Merge extends BaseSort {
  public static title: string = "Merge Sort";
  private sections: number[][][];

  public setUp() {
    this.sections = [];
    this.setupSections(this.sections);
  }

  public currentNodes() {
    return flatten(this.sections[this.sections.length - 1]);
  }

  /**
   * To get the merge to work look at the sections
   * that are being merged.
   *
   * If the first element in the first section is smaller
   * than the first element in the second section.
   * Remove that element from the section.
   *
   * If the first element in the first section is larger
   * ---
   *
   * If there are no elements in either of the sections:
   * Then the current set is complete.
   *
   * If there are no sets left the sort is complete.
   */
  public takeStepInMerge() {
    let [first, second] = this.sections[this.sections.length - 1];
    const values = this.board.values();
    const firstIndex = first[0];
    const secondIndex = second[0];
    const firstValue = values[firstIndex];
    const secondValue = values[secondIndex];
    this.comparisons++;
    if (firstValue > secondValue) {
      const firstLength = first.length;
      const secondLength = second.length;

      // swap down to first location
      for (let i = secondIndex; i > firstIndex; i--) {
        this.swap([i, i - 1]);
      }

      const allNumbers = flatten([first, second]);
      allNumbers.shift();
      first = take(allNumbers, firstLength);
      second = takeRight(allNumbers, allNumbers.length - firstLength);
      this.sections.pop();
      this.sections.push([first, second]);
    } else {
      first.shift();
    }

    if (first.length === 0 || second.length === 0) {
      this.sections.pop();
    }

    if (this.sections.length === 0) {
      this.done = true;
    }
  }

  public next() {
    if (this.done) {
      return [];
    }
    this.steps++;
    const currentNodes = this.currentNodes();
    // handle mergggy
    this.takeStepInMerge();
    this.trackProfile();
    return currentNodes;
  }

  private setupSections(sections: number[][][]) {
    const queue = [range(0, this.board.length)];
    while (queue.length) {
      const current = queue.shift();
      if (current.length === 1) {
        continue;
      }
      const half = Math.floor(current.length / 2);
      const first = take(current, half);
      const second = takeRight(current, current.length - half);
      queue.unshift(second);
      queue.unshift(first);
      sections.push([first, second]);
    }
  }
}
