import { flatten } from "lodash";
import { Merge } from "../sorts";

export class MergeOutOfPlace extends Merge {
  public static title = "Merge Sort(Out Of Place)";
  private mergedList: number[] = [];
  private mergedListStart?: number;

  /**
   * This will do an out of place merge
   */
  public takeStepInMerge() {
    const [first, second] = this.sections[this.sections.length - 1];
    if (this.mergedListStart === undefined) {
      this.mergedListStart = first[0];
    }
    const values = this.board.values();
    const firstIndex = first[0];
    const secondIndex = second[0];
    const firstValue = values[firstIndex];
    const secondValue = values[secondIndex];
    this.comparisons++;
    if (firstValue > secondValue) {
      this.mergedList.push(secondValue);
      second.shift();
    } else {
      this.mergedList.push(firstValue);
      first.shift();
    }

    if (first.length === 0 || second.length === 0) {
      const toAdd = flatten([first, second]);
      toAdd.forEach((currentIndex: number) => {
        this.mergedList.push(values[currentIndex]);
      });
      this.sections.pop();

      let index = this.mergedListStart;
      while (this.mergedList.length) {
        const currentValues = this.board.values();
        const currentValue = currentValues[index];
        const mergeValue = this.mergedList.shift();

        if (currentValue !== mergeValue) {
          // find number to swap in advance
          const swapIndex = currentValues.indexOf(mergeValue, index);
          this.swap([index, swapIndex]);
        }
        index++;
      }
      delete this.mergedListStart;
    }

    if (this.sections.length === 0) {
      this.done = true;
    }
  }
}
