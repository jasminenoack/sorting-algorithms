import { range } from "d3";
import { take, takeRight } from "lodash";
import { Merge } from "./base";

export class MergeSmallest extends Merge {
  public static title = "Merge Sort(Smallest First)";

  protected setupSections(sections: number[][][]) {
    let index = 0;
    const indexes = range(0, this.board.length);
    let half = Math.floor(indexes.length / 2);
    let first = take(indexes, half);
    let second = takeRight(indexes, indexes.length - half);
    this.sections.push([first, second]);

    while (index < this.sections.length) {
      const section = this.sections[index];
      section.forEach((item) => {
        if (item.length === 1) {
          return;
        }
        half = Math.floor(item.length / 2);
        first = take(item, half);
        second = takeRight(item, item.length - half);
        this.sections.push([first, second]);
      });
      index++;
    }
  }
}
