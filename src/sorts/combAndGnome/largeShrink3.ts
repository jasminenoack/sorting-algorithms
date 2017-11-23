import { CombEvenLarger } from "../comb/evenLarger";
import { Gnome } from "./../gnome/base";
import { CombGnomeLargeShrink5 } from "./largeShrink5";

export class CombGnomeLargeShrink3 extends CombGnomeLargeShrink5 {
  public static title = "Comb & Gnome(gap 3, shrink 2)";
  public gnomeSwitchValue: number = 3;
  public setUp() {
    this.comb = new CombEvenLarger(this.board);
    this.gnome = new Gnome(this.board);
  }
}
