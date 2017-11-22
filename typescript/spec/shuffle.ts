import { range } from "lodash";
import * as Shuffles from "../shuffles";

const differenceFromOrdered = (array) => {
  const values = array;
  const ordered = range(0, values.length);
  let difference = 0;
  for (let i = 0; i < values.length; i++) {
    difference += Math.abs(values[i] - i);
  }
  return difference;
};

describe("Shuffle", () => {
  let shuffle;
  let orderedArray;
  let testOrdered;
  let testNonOrdered;
  let testReversedArray;
  let nonOrderedArray;
  let reversedArray;

  beforeEach(() => {
    orderedArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    testOrdered = orderedArray.slice();
    nonOrderedArray = [9, 8, 7, 1, 2, 3, 0, 4, 5, 6];
    testNonOrdered = nonOrderedArray.slice();
    reversedArray = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    testReversedArray = reversedArray.slice();
  });

  describe("ordered", () => {
    beforeEach(() => {
      shuffle = Shuffles.OrderedShuffle;
    });

    it("returns ordered array", () => {
      expect(testOrdered).toEqual(shuffle.shuffle(orderedArray));
      expect(testOrdered).toEqual(shuffle.shuffle(nonOrderedArray));
      expect(testOrdered).toEqual(shuffle.shuffle(reversedArray));
    });

    it("is in expected difference from ordered", () => {
      const array = nonOrderedArray;
      shuffle.shuffle(array);
      const difference = differenceFromOrdered(array);
      expect(difference).toEqual(0);
    });
  });

  describe("k-1 sorted", () => {
    beforeEach(() => {
      shuffle = Shuffles.K1Shuffle;
    });

    it("returns shuffled array", () => {
      expect(testOrdered).not.toEqual(shuffle.shuffle(orderedArray));
      expect(testNonOrdered).not.toEqual(shuffle.shuffle(nonOrderedArray));
      expect(testReversedArray).not.toEqual(shuffle.shuffle(reversedArray));
    });

    it("is in expected difference from ordered", () => {
      const array = nonOrderedArray;
      shuffle.shuffle(array);
      const difference = differenceFromOrdered(array);
      expect(difference).not.toBeGreaterThan(4);
      expect(difference).not.toBeLessThan(1);
    });
  });

  describe("k-3 sorted", () => {
    beforeEach(() => {
      shuffle = Shuffles.K3Shuffle;
    });

    it("returns shuffled array", () => {

      expect(testOrdered).not.toEqual(shuffle.shuffle(orderedArray));
      expect(testNonOrdered).not.toEqual(shuffle.shuffle(nonOrderedArray));
      expect(testReversedArray).not.toEqual(shuffle.shuffle(reversedArray));
    });

    it("is in expected difference from ordered", () => {
      const array = nonOrderedArray;
      shuffle.shuffle(array);
      const difference = differenceFromOrdered(array);
      expect(difference).not.toBeGreaterThan(12);
      expect(difference).not.toBeLessThan(1);
    });
  });

  describe("k-5 sorted", () => {
    beforeEach(() => {
      shuffle = Shuffles.K5Shuffle;
    });

    it("returns shuffled array", () => {
      expect(testOrdered).not.toEqual(shuffle.shuffle(orderedArray));
      expect(testNonOrdered).not.toEqual(shuffle.shuffle(nonOrderedArray));
      expect(testReversedArray).not.toEqual(shuffle.shuffle(reversedArray));
    });

    it("is in expected difference from ordered", () => {
      const array = nonOrderedArray;
      shuffle.shuffle(array);
      const difference = differenceFromOrdered(array);
      expect(difference).not.toBeGreaterThan(20);
      expect(difference).not.toBeLessThan(1);
    });
  });

  describe("random", () => {
    beforeEach(() => {
      shuffle = Shuffles.RandomShuffle;
    });

    it("returns shuffled array", () => {
      expect(testOrdered).not.toEqual(shuffle.shuffle(orderedArray));
      expect(testNonOrdered).not.toEqual(shuffle.shuffle(nonOrderedArray));
      expect(testReversedArray).not.toEqual(shuffle.shuffle(reversedArray));
      expect(orderedArray).not.toEqual(testOrdered);
      expect(orderedArray.sort((a, b) => a < b ? -1 : 1)).toEqual(testOrdered);
    });

    it("is in expected difference from ordered", () => {
      const array = nonOrderedArray;
      const trials = 5;
      let sum = 0;
      for (let i = 0; i < trials; i++) {
        shuffle.shuffle(array);
        sum += differenceFromOrdered(array);
      }
      const avgDiff = sum / trials;
      expect(avgDiff).not.toBeGreaterThan(40);
      expect(avgDiff).not.toBeLessThan(10);
    });
  });

  describe("k-5 reversed", () => {
    beforeEach(() => {
      shuffle = Shuffles.K5ReversedShuffle;
    });

    it("returns shuffled array", () => {
      expect(testOrdered).not.toEqual(shuffle.shuffle(orderedArray));
      expect(testNonOrdered).not.toEqual(shuffle.shuffle(nonOrderedArray));
      expect(testReversedArray).not.toEqual(shuffle.shuffle(reversedArray));
    });

    it("is in expected difference from ordered", () => {
      const array = nonOrderedArray;
      shuffle.shuffle(array);
      const difference = differenceFromOrdered(array);
      expect(difference).not.toBeGreaterThan(50);
      expect(difference).not.toBeLessThan(30);
    });
  });

  describe("k-3 reversed", () => {
    beforeEach(() => {
      shuffle = Shuffles.K3ReversedShuffle;
    });

    it("returns shuffled array", () => {
      expect(testOrdered).not.toEqual(shuffle.shuffle(orderedArray));
      expect(testNonOrdered).not.toEqual(shuffle.shuffle(nonOrderedArray));
      expect(testReversedArray).not.toEqual(shuffle.shuffle(reversedArray));
    });

    it("is in expected difference from ordered", () => {
      const array = nonOrderedArray;
      shuffle.shuffle(array);
      const difference = differenceFromOrdered(array);
      expect(difference).not.toBeGreaterThan(50);
      expect(difference).not.toBeLessThan(38);
    });
  });

  describe("k-1 reversed", () => {
    beforeEach(() => {
      shuffle = Shuffles.K1ReversedShuffle;
    });

    it("returns shuffled array", () => {
      expect(testOrdered).not.toEqual(shuffle.shuffle(orderedArray));
      expect(testNonOrdered).not.toEqual(shuffle.shuffle(nonOrderedArray));
      expect(testReversedArray).not.toEqual(shuffle.shuffle(reversedArray));
    });

    it("is in expected difference from ordered", () => {
      const array = nonOrderedArray;
      shuffle.shuffle(array);
      const difference = differenceFromOrdered(array);
      expect(difference).not.toBeGreaterThan(50);
      expect(difference).not.toBeLessThan(46);
    });
  });

  describe("reversed", () => {
    beforeEach(() => {
      shuffle = Shuffles.ReversedShuffle;
    });

    it("returns reversed array", () => {
      expect(testOrdered).not.toEqual(shuffle.shuffle(orderedArray));
      expect(testNonOrdered).not.toEqual(shuffle.shuffle(nonOrderedArray));
      expect(testReversedArray).toEqual(shuffle.shuffle(reversedArray));
    });

    it("is in expected difference from ordered", () => {
      const array = nonOrderedArray;
      shuffle.shuffle(array);
      const difference = differenceFromOrdered(array);
      expect(difference).toEqual(50);
    });
  });

  describe("swaps first and last", () => {
    beforeEach(() => {
      shuffle = Shuffles.FirstAndLastSwapped;
    });

    it("returns array", () => {
      expect([9, 1, 2, 3, 4, 5, 6, 7, 8, 0]).toEqual(shuffle.shuffle(orderedArray));
      expect([9, 1, 2, 3, 4, 5, 6, 7, 8, 0]).toEqual(shuffle.shuffle(nonOrderedArray));
      expect([9, 1, 2, 3, 4, 5, 6, 7, 8, 0]).toEqual(shuffle.shuffle(reversedArray));
    });
  });

  describe("swaps first two", () => {
    beforeEach(() => {
      shuffle = Shuffles.FirstTwoSwapped;
    });

    it("returns array", () => {
      expect([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]).toEqual(shuffle.shuffle(orderedArray));
      expect([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]).toEqual(shuffle.shuffle(nonOrderedArray));
      expect([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]).toEqual(shuffle.shuffle(reversedArray));
    });
  });

  describe("swaps last two", () => {
    beforeEach(() => {
      shuffle = Shuffles.LastTwoSwapped;
    });

    it("returns array", () => {
      expect([0, 1, 2, 3, 4, 5, 6, 7, 9, 8]).toEqual(shuffle.shuffle(orderedArray));
      expect([0, 1, 2, 3, 4, 5, 6, 7, 9, 8]).toEqual(shuffle.shuffle(nonOrderedArray));
      expect([0, 1, 2, 3, 4, 5, 6, 7, 9, 8]).toEqual(shuffle.shuffle(reversedArray));
    });
  });
});
