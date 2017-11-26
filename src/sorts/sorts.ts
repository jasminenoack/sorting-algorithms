// bogo
import { Bogo } from "./bogo/base";
import { BogoBogo } from "./bogo/bogoBogo";
import { Permutation } from "./bogo/permutation";
import { BogoSingle } from "./bogo/single";
import { BogoSingleCompare } from "./bogo/singleCompare";

// bubble
import { Bubble } from "./../sorts/bubble/base";
import { BubbleSortConcurrent } from "./../sorts/bubble/concurrent";
import { BubbleSortConcurrent10 } from "./../sorts/bubble/concurrent10";
import { BubbleSortConcurrent5 } from "./../sorts/bubble/concurrent5";
import { BubbleSortDontRestart } from "./../sorts/bubble/doNotRestart";
import { BubbleOptimized } from "./../sorts/bubble/optimized";
import { BubbleShortCircuit } from "./../sorts/bubble/shortCircuit";
import { BubbleSkipSorted } from "./../sorts/bubble/skipSorted";

// cocktail
import { Cocktail } from "./../sorts/cocktail/base";
import { CocktailShortCircuit } from "./../sorts/cocktail/shortCircuit";

// comb
import { Comb } from "./../sorts/comb/base";
import { CombEvenLarger } from "./../sorts/comb/evenLarger";
import { CombLargeShrink } from "./../sorts/comb/largeShrink";
import { CombSmallShrink } from "./../sorts/comb/smallShrink";

// comb and gnome
import { CombGnome10 } from "./combAndGnome/at10";
import { CombGnome2 } from "./combAndGnome/at2";
import { CombGnome3 } from "./combAndGnome/at3";
import { CombGnome5 } from "./combAndGnome/at5";
import { CombGnomeLargeShrink10 } from "./combAndGnome/largeShrink10";
import { CombGnomeLargeShrink2 } from "./combAndGnome/largeShrink2";
import { CombGnomeLargeShrink3 } from "./combAndGnome/largeShrink3";
import { CombGnomeLargeShrink5 } from "./combAndGnome/largeShrink5";

// cycle
import { Cycle } from "./cycle/base";
import { CycleOptimized } from "./cycle/optimized";

// gnome
import { Gnome } from "./gnome/base";

// heap
import { Heap } from "./heap/base";

// insertion
import { Insertion } from "./insertion/base";

// merge
import { Merge } from "./merge/base";
import { MergeOutOfPlace } from "./merge/outPlace";
import { MergeSmallest } from "./merge/smallest";

// odd even
import { OddEven } from "./oddEven/base";
import { OddEvenConcurrent } from "./oddEven/concurrent";

// quick
import { QuickSort2 } from "./quick/base";
import { QuickSort3 } from "./quick/partition3";
import { QuickSort3Random } from "./quick/partition3Random";
import { QuickSort3RightPartition } from "./quick/partition3Right";
import { QuickSort2Random } from "./quick/randomPartition";
import { QuickSort2RightPartition } from "./quick/rightPartition";

// selection
import { SelectionSort } from "./selection/base";

// smooth
import { Smooth } from "./smooth/base";
import { SmoothSetUpBottom } from "./smooth/fromBottom";

// stooge
import { Stooge } from "./stooge/base";

export {
  // bogo
  Bogo,
  BogoBogo,
  Permutation,
  BogoSingle,
  BogoSingleCompare,
  // bubble
  Bubble,
  BubbleSortConcurrent,
  BubbleSortConcurrent10,
  BubbleSortConcurrent5,
  BubbleSortDontRestart,
  BubbleOptimized,
  BubbleShortCircuit,
  BubbleSkipSorted,
  // cocktail
  Cocktail,
  CocktailShortCircuit,
  // comb
  Comb,
  CombEvenLarger,
  CombLargeShrink,
  CombSmallShrink,
  // comb and gnome
  CombGnome10,
  CombGnome2,
  CombGnome3,
  CombGnome5,
  CombGnomeLargeShrink10,
  CombGnomeLargeShrink2,
  CombGnomeLargeShrink3,
  CombGnomeLargeShrink5,
  // cycle
  Cycle,
  CycleOptimized,
  // gnome
  Gnome,
  // heap
  Heap,
  // insertion
  Insertion,
  // merge
  Merge,
  MergeOutOfPlace,
  MergeSmallest,
  // odd even
  OddEven,
  OddEvenConcurrent,
  // quick
  QuickSort2,
  QuickSort3,
  QuickSort3Random,
  QuickSort3RightPartition,
  QuickSort2Random,
  QuickSort2RightPartition,
  // selection
  SelectionSort,
  // smooth
  Smooth,
  SmoothSetUpBottom,
  // stooge
  Stooge,
};
