import { Bubble } from "./base";

export class BubbleSkipSorted extends Bubble {
  public static readonly title = "Bubble(Skip Sorted)";
  public skipSorted: boolean = true;
  public shortCircuit: boolean = false;
}
