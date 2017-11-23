import { BaseSort } from "../baseSort";
import { Comb } from "../comb/base";
import { Gnome } from "../gnome/base";

export class CombGnome5 extends BaseSort {
  public static title = "Comb & Gnome(at gap 5)";
  public comb: Comb;
  public gnome: BaseSort;
  public gnomeSwitchValue: number = 5;

  public setUp() {
    this.comb = new Comb(this.board);
    this.gnome = new Gnome(this.board);
  }

  public currentNodes() {
    if (this.comb.gap >= this.gnomeSwitchValue) {
      return this.comb.currentNodes();
    } else {
      return this.gnome.currentNodes();
    }
  }

  public reset() {
    super.reset();
    this.gnome.done = false;
    return this;
  }

  public next() {
    if (this.done) {
      return [];
    }
    let currentNodes;
    if (this.comb.gap >= this.gnomeSwitchValue) {
      currentNodes = this.comb.currentNodes();
      this.comb.next();
    } else {
      this.gnome.next();
    }
    this.steps = this.comb.steps + this.gnome.steps;
    this.swaps = this.comb.swaps + this.gnome.swaps;
    this.comparisons = this.comb.comparisons + this.gnome.comparisons;
    this.done = this.gnome.done;
    this.trackProfile();
    return currentNodes;
  }
}
