import { BaseSort } from "../baseSort";

export class Gnome extends BaseSort {
  public static title = "Gnome Sort";
  public currentGnome: number;

  public setUpNext() {
    if (this.baseNode === 0 || !this.lastSwapped) {
      this.currentGnome++;
      this.comparisonNode = this.currentGnome;
      this.baseNode = this.currentGnome - 1;
    } else if (this.lastSwapped) {
      this.baseNode--;
      this.comparisonNode--;
    }
    if (this.comparisonNode >= this.length) {
      this.setDone();
    }
  }

  public setUp() {
    this.currentGnome = 1;
  }
}
