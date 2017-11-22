import { Shuffle } from "./abstract";

export class RandomShuffle extends Shuffle {
  public static k: number = null;
  public static reversed = false;
  public static title = "Random";
}
