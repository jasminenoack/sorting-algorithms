import { Smooth } from "./base";

export class SmoothSetUpBottom extends Smooth {
  public static title = "Smooth Sort(Set up from bottom)";
  public static fromBottom: boolean = true;

  public setUp() {
    super.setUp();
    this.baseNode = 1;
    this.treeSizes = [1];
    this.roots = [0];
  }
}
