import { Shuffle } from "./abstract";

export class K3ReversedShuffle extends Shuffle {
  public static k = 3;
  public static reversed = true;
  public static title = "K3 Reversed";
}
