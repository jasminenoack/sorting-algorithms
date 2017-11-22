import { FirstAndLastSwapped } from "./firstLast";

export class FirstTwoSwapped extends FirstAndLastSwapped {
  public static k = 0;
  public static reversed = false;
  public static title = "First Two Swapped";
  public static swap(array: number[]) {
    [array[0], array[1]] = [array[1], array[0]];
  }
}
