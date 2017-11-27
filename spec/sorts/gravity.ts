import { Board } from "../../src/board";
import { fewFew, ISize, xXLarge } from "../../src/sizes";
import { Gravity } from "./../../src/sorts/gravity/base";

describe("gravity sort", () => {
  let size: ISize;
  let board: Board;
  let Sort: any;
  let sort: Gravity;
  let step: number;

  beforeEach(() => {
    length = 10;
    size = xXLarge;
    board = new Board(size);
    Sort = Gravity;
    sort = new Sort(board);
    step = 1;
  });

  describe("create", () => {
    it("it has a title", () => {
      expect(Sort.title).toEqual("Gravity Sort(positive integers only)");
    });

    it("has current nodes", () => {
      expect(sort.currentNodes().length).toBeGreaterThan(0);
    });

    it("all board values are 0 after first step", () => {
      sort.next();
      expect(board.values()).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });

    it("has all shadows", () => {
      expect(sort.shadow.length).toEqual(0);
      sort.next();
      expect(sort.shadow.length).toEqual(10);
    });
  });

  function takeStep(
    currentNodes: number[], shadowLength: number,
    comparison: number, values: number[],
  ) {
    expect(sort.next()).toEqual(currentNodes);
    expect(sort.steps).toEqual(step);
    expect(sort.comparisons).toEqual(comparison);
    expect(sort.shadow.length).toEqual(shadowLength);
    expect(board.values()).toEqual(values);
    step++;
  }

  describe("utils", () => {
    it("it handles ordered group", () => {
      board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      sort = new Sort(board);
      takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      // 0
      takeStep([], 9, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      // 1
      takeStep([9], 8, 9, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
      // 2
      takeStep([8, 9], 7, 18, [0, 0, 0, 0, 0, 0, 0, 0, 1, 2]);
      // 3
      takeStep([7, 8, 9], 6, 27, [0, 0, 0, 0, 0, 0, 0, 1, 2, 3]);
      // 4
      takeStep([6, 7, 8, 9], 5, 36, [0, 0, 0, 0, 0, 0, 1, 2, 3, 4]);
      // 5
      takeStep([5, 6, 7, 8, 9], 4, 45, [0, 0, 0, 0, 0, 1, 2, 3, 4, 5]);
      // 6
      takeStep([4, 5, 6, 7, 8, 9], 3, 54, [0, 0, 0, 0, 1, 2, 3, 4, 5, 6]);
      // 7
      takeStep([3, 4, 5, 6, 7, 8, 9], 2, 63, [0, 0, 0, 1, 2, 3, 4, 5, 6, 7]);
      // 8
      takeStep([2, 3, 4, 5, 6, 7, 8, 9], 1, 72, [0, 0, 1, 2, 3, 4, 5, 6, 7, 8]);
      // 9
      takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 0, 81, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(sort.swaps).toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    it("handles a random group", () => {
      board.setPoints([2, 5, 0, 7, 9, 3, 1, 6, 8, 4]);
      sort = new Sort(board);

      takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      // 2
      takeStep([8, 9], 9, 9, [0, 0, 0, 0, 0, 0, 0, 0, 0, 2]);
      // 5
      takeStep([5, 6, 7, 8, 9], 8, 18, [0, 0, 0, 0, 0, 0, 0, 0, 2, 5]);
      // 0
      takeStep([], 7, 18, [0, 0, 0, 0, 0, 0, 0, 0, 2, 5]);
      // 7
      takeStep([3, 4, 5, 6, 7, 8, 9], 6, 27, [0, 0, 0, 0, 0, 0, 0, 2, 5, 7]);
      // 9
      takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 5, 36, [0, 0, 0, 0, 0, 0, 2, 5, 7, 9]);
      // 3
      takeStep([7, 8, 9], 4, 45, [0, 0, 0, 0, 0, 2, 3, 5, 7, 9]);
      // 1
      takeStep([9], 3, 54, [0, 0, 0, 0, 1, 2, 3, 5, 7, 9]);
      // 6
      takeStep([4, 5, 6, 7, 8, 9], 2, 63, [0, 0, 0, 1, 2, 3, 5, 6, 7, 9]);
      // 8
      takeStep([2, 3, 4, 5, 6, 7, 8, 9], 1, 72, [0, 0, 1, 2, 3, 5, 6, 7, 8, 9]);
      // 4
      takeStep([6, 7, 8, 9], 0, 81, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(sort.swaps).toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("it does reverse group", () => {
      board.setPoints([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(sort.swaps).toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("handles duplicates", () => {
      const values = [0, 2, 0, 4, 1, 2, 3, 4, 1, 3];
      board.setPoints(values);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([0, 0, 1, 1, 2, 2, 3, 3, 4, 4]);
      expect(sort.swaps).toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("handles more duplicates", () => {
      const values = [2, 1, 1, 2, 1, 1, 2, 2, 1, 1];
      board.setPoints(values);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([1, 1, 1, 1, 1, 1, 2, 2, 2, 2]);
      expect(sort.swaps).toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("handles negatives", () => {
      const values = [-2, 1, -1, 2, 0, -3, 3, -4, 4, 0];
      board.setPoints(values);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([-4, -3, -2, -1, 0, 0, 1, 2, 3, 4]);
      expect(sort.swaps).toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("handles decimals");

    xit("handles space between numbers");

    xit("all high");
  });

  xit("has a reset function", () => {
    const rounds = 0;
    while (!sort.done && rounds < 100) {
      sort.next();
    }
    expect(sort.done).toEqual(true);
    const values = board.values().slice();
    sort.reset();
    expect(sort.done).toBeFalsy();
    expect(sort.steps).toEqual(0);
    expect(sort.swaps).toEqual(0);
    expect(sort.comparisons).toEqual(0);
    expect(values).not.toEqual(board.values());
    expect(sort.baseNode).toEqual(0);
    expect(sort.comparisonNode).toEqual(1);
  });
});
