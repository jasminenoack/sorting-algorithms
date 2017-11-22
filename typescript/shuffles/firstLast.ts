import { Shuffle } from "./abstract";

export class FirstAndLastSwapped extends Shuffle {
  public static k = 0;
  public static reversed = false;
  public static title = "First and Last Swapped";

  public static swap(array: number[]) {
    [array[0], array[array.length - 1]] = [array[array.length - 1], array[0]];
  }

  public static shuffle(array: number[]) {
    super.shuffle(array);
    this.swap(array);
    return array;
  }
}
