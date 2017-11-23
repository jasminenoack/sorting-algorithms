import { Bubble } from "./base";

export class BubbleOptimized extends Bubble {
  public static readonly title = "Bubble(Short Circuit & Skip Sorted)";
  public skipSorted: boolean = true;
  public shortCircuit: boolean = true;
}
