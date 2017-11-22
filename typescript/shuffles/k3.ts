import { Shuffle } from "./abstract";

export class K3Shuffle extends Shuffle {
  public static k = 3;
  public static reversed = false;
  public static title = "K3";
}
