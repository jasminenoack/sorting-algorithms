import { CombEvenLarger } from "./../comb/evenLarger";
import { Gnome } from "./../gnome/base";
import { CombGnome5 } from "./at5";

export class CombGnomeLargeShrink5 extends CombGnome5 {
  public static title = "Comb & Gnome(gap 5, shrink 2)";
  public gnomeSwitchValue: number = 5;
  public setUp() {
    this.comb = new CombEvenLarger(this.board);
    this.gnome = new Gnome(this.board);
  }
}
