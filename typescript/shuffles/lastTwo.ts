import { FirstAndLastSwapped } from "./firstLast";

export class LastTwoSwapped extends FirstAndLastSwapped {
  public static k = 0;
  public static reversed = false;
  public static title = "Last Two Swapped";

  public static swap(array: number[]) {
    [array[array.length - 2], array[array.length - 1]] = [array[array.length - 1], array[array.length - 2]];
  }
}
