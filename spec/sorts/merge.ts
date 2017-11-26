import { Board } from "../../src/board";
import { fewFew, xXLarge } from "../../src/sizes";
import { ISize } from "./../../src/sizes";
import { Merge } from "./../../src/sorts/merge/base";
import { MergeOutOfPlace } from "./../../src/sorts/merge/outPlace";
import { MergeSmallest } from "./../../src/sorts/merge/smallest";

describe("merge sort", () => {
  let size: ISize;
  let board: Board;
  let Sort: any;
  let sort: Merge;
  let step: number;

  function takeStep(
    currentNodes: number[],
    swaps: number,
    current: number[],
    done: boolean = false,
  ) {
    sort.next();
    expect(sort.currentNodes()).toEqual(currentNodes);
    expect(sort.comparisons).toEqual(step);
    expect(sort.swaps).toEqual(swaps);
    expect(sort.steps).toEqual(step);
    expect(board.values()).toEqual(current);
    expect(sort.done).toEqual(done);
    step++;
  }

  describe("base", () => {
    beforeEach(() => {
      length = 5;
      size = xXLarge;
      board = new Board(size);
      Sort = Merge;
      sort = new Merge(board);
      step = 1;
    });

    describe("setup", () => {
      it("should find tree for length 4", () => {
        board = new Board({
          elemCount: 4,
          label: "test",
        });
        sort = new Merge(board);
        const expected = [
          [[0, 1], [2, 3]],
          [[0], [1]],
          [[2], [3]],
        ];
        expect((sort as any).sections).toEqual(expected);
      });

      it("should find tree for length 5", () => {
        board = new Board({
          elemCount: 5,
          label: "test",
        });
        sort = new Merge(board);
        const expected = [
          [[0, 1], [2, 3, 4]],
          [[0], [1]],
          [[2], [3, 4]],
          [[3], [4]],
        ];
        expect((sort as any).sections).toEqual(expected);
      });

      it("should find tree for length 10", () => {
        board = new Board({
          elemCount: 10,
          label: "test",
        });
        sort = new Merge(board);
        const expected = [
          [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]],
          [[0, 1], [2, 3, 4]],
          [[0], [1]],
          [[2], [3, 4]],
          [[3], [4]],
          [[5, 6], [7, 8, 9]],
          [[5], [6]],
          [[7], [8, 9]],
          [[8], [9]],
        ];
        expect((sort as any).sections).toEqual(expected);
      });

      it("should find tree for length 15", () => {
        board = new Board({
          elemCount: 15,
          label: "test",
        });
        sort = new Merge(board);
        const expected = [
          [[0, 1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12, 13, 14]],
          [[0, 1, 2], [3, 4, 5, 6]],
          [[0], [1, 2]],
          [[1], [2]],
          [[3, 4], [5, 6]],
          [[3], [4]],
          [[5], [6]],
          [[7, 8, 9, 10], [11, 12, 13, 14]],
          [[7, 8], [9, 10]],
          [[7], [8]],
          [[9], [10]],
          [[11, 12], [13, 14]],
          [[11], [12]],
          [[13], [14]],
        ];
        expect((sort as any).sections).toEqual(expected);
      });

      it("should find tree for length 20", () => {
        board = new Board({
          elemCount: 20,
          label: "test",
        });
        sort = new Merge(board);
        const expected = [
          [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]],
          [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]],
          [[0, 1], [2, 3, 4]],
          [[0], [1]],
          [[2], [3, 4]],
          [[3], [4]],
          [[5, 6], [7, 8, 9]],
          [[5], [6]],
          [[7], [8, 9]],
          [[8], [9]],
          [[10, 11, 12, 13, 14], [15, 16, 17, 18, 19]],
          [[10, 11], [12, 13, 14]],
          [[10], [11]],
          [[12], [13, 14]],
          [[13], [14]],
          [[15, 16], [17, 18, 19]],
          [[15], [16]],
          [[17], [18, 19]],
          [[18], [19]],
        ];
        expect((sort as any).sections).toEqual(expected);
      });
    });

    describe("create", () => {
      it("it has a title", () => {
        expect(Sort.title).toEqual("Merge Sort(In Place)");
      });

      it("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([8, 9]);
      });
    });

    describe("utils", () => {
      it("it handles ordered group", () => {
        const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        board.setPoints(array.slice());
        sort = new Sort(board);
        expect(sort.currentNodes()).toEqual([8, 9]);
        takeStep([7, 8, 9], 0, array);
        takeStep([5, 6], 0, array);
        takeStep([5, 6, 7, 8, 9], 0, array);
        takeStep([6, 7, 8, 9], 0, array);
        takeStep([3, 4], 0, array);
        takeStep([2, 3, 4], 0, array);
        takeStep([0, 1], 0, array);
        takeStep([0, 1, 2, 3, 4], 0, array);
        takeStep([1, 2, 3, 4], 0, array);
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, array);
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 0, array);
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 0, array);
        takeStep([3, 4, 5, 6, 7, 8, 9], 0, array);
        takeStep([4, 5, 6, 7, 8, 9], 0, array);
        takeStep([], 0, array, true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.swaps).toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles a random group", () => {
        board.setPoints([2, 5, 0, 7, 9, 3, 1, 6, 8, 4]);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 1, [2, 5, 0, 7, 9, 3, 1, 6, 4, 8]);
        // 7 | 8 9
        takeStep([8, 9], 2, [2, 5, 0, 7, 9, 3, 1, 4, 6, 8]);
        // 8 | 9
        takeStep([5, 6], 2, [2, 5, 0, 7, 9, 3, 1, 4, 6, 8]);
        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 3, [2, 5, 0, 7, 9, 1, 3, 4, 6, 8]);
        // 5 6 | 7 8 9
        takeStep([6, 7, 8, 9], 3, [2, 5, 0, 7, 9, 1, 3, 4, 6, 8]);
        // 6 | 7 8 9
        takeStep([3, 4], 3, [2, 5, 0, 7, 9, 1, 3, 4, 6, 8]);
        // 3 | 4
        takeStep([2, 3, 4], 3, [2, 5, 0, 7, 9, 1, 3, 4, 6, 8]);
        // 2 | 3 4
        takeStep([0, 1], 3, [2, 5, 0, 7, 9, 1, 3, 4, 6, 8]);
        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 3, [2, 5, 0, 7, 9, 1, 3, 4, 6, 8]);
        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 5, [0, 2, 5, 7, 9, 1, 3, 4, 6, 8]);
        // 1 2 | 3 4
        takeStep([2, 3, 4], 5, [0, 2, 5, 7, 9, 1, 3, 4, 6, 8]);
        // 2 | 3 4
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5, [0, 2, 5, 7, 9, 1, 3, 4, 6, 8]);
        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 5, [0, 2, 5, 7, 9, 1, 3, 4, 6, 8]);
        // 1 2 3 4 | 5 6 7 8 9
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 9, [0, 1, 2, 5, 7, 9, 3, 4, 6, 8]);
        // 2 3 4 5 | 6 7 8 9
        takeStep([3, 4, 5, 6, 7, 8, 9], 9, [0, 1, 2, 5, 7, 9, 3, 4, 6, 8]);
        // 3 4 5 | 6 7 8 9
        takeStep([4, 5, 6, 7, 8, 9], 12, [0, 1, 2, 3, 5, 7, 9, 4, 6, 8]);
        // 4 5 6 | 7 8 9
        takeStep([5, 6, 7, 8, 9], 15, [0, 1, 2, 3, 4, 5, 7, 9, 6, 8]);
        // 5 6 7 | 8 9
        takeStep([6, 7, 8, 9], 15, [0, 1, 2, 3, 4, 5, 7, 9, 6, 8]);
        // 6 7 | 8 9
        takeStep([7, 8, 9], 17, [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
        // 7 8 | 9
        takeStep([8, 9], 17, [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
        // 8 | 9
        takeStep([], 18, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles a swaping first group", () => {
        board.setPoints([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 0, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 7 | 8 9
        takeStep([5, 6], 0, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 0, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 5 6 | 7 8 9
        takeStep([6, 7, 8, 9], 0, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 6 | 7 8 9
        takeStep([3, 4], 0, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 3 | 4
        takeStep([2, 3, 4], 0, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 2 | 3 4
        takeStep([0, 1], 0, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 1 | 2 3 4
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 1 2 3 4 | 5 6 7 8 9
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 2 3 4 | 5 6 7 8 9
        takeStep([3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 3 4 | 5 6 7 8 9
        takeStep([4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 4 |  5 6 7 8 9
        takeStep([], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles a swaping last group", () => {
        board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 7 | 8 9
        takeStep([5, 6], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 5 6 | 7 8 9
        takeStep([6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 6 | 7 8 9
        takeStep([3, 4], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 3 | 4
        takeStep([2, 3, 4], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 2 | 3 4
        takeStep([0, 1], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 1 | 2 3 4
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 1 2 3 4 | 5 6 7 8 9
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 2 3 4 | 5 6 7 8 9
        takeStep([3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 3 4 | 5 6 7 8 9
        takeStep([4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 4 |  5 6 7 8 9
        takeStep([], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("it does reverse group", () => {
        board.setPoints([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
        sort = new Sort(board);

        // 8 | 9
        takeStep([7, 8, 9], 1, [9, 8, 7, 6, 5, 4, 3, 2, 0, 1]);
        // 7 | 8 9
        takeStep([8, 9], 2, [9, 8, 7, 6, 5, 4, 3, 0, 2, 1]);
        // 8 | 9
        takeStep([5, 6], 3, [9, 8, 7, 6, 5, 4, 3, 0, 1, 2]);
        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 4, [9, 8, 7, 6, 5, 3, 4, 0, 1, 2]);
        // 5 6 | 7 8 9
        takeStep([6, 7, 8, 9], 6, [9, 8, 7, 6, 5, 0, 3, 4, 1, 2]);
        // 6 7 | 8 9
        takeStep([7, 8, 9], 8, [9, 8, 7, 6, 5, 0, 1, 3, 4, 2]);
        // 7 8 | 9
        takeStep([3, 4], 10, [9, 8, 7, 6, 5, 0, 1, 2, 3, 4]);
        // 3 | 4
        takeStep([2, 3, 4], 11, [9, 8, 7, 5, 6, 0, 1, 2, 3, 4]);
        // 2 | 3 4
        takeStep([3, 4], 12, [9, 8, 5, 7, 6, 0, 1, 2, 3, 4]);
        // 3 | 4
        takeStep([0, 1], 13, [9, 8, 5, 6, 7, 0, 1, 2, 3, 4]);
        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 14, [8, 9, 5, 6, 7, 0, 1, 2, 3, 4]);
        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 16, [5, 8, 9, 6, 7, 0, 1, 2, 3, 4]);
        // 1 2 | 3 4
        takeStep([2, 3, 4], 18, [5, 6, 8, 9, 7, 0, 1, 2, 3, 4]);
        // 2 3 | 4
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 25, [0, 5, 6, 7, 8, 9, 1, 2, 3, 4]);
        // 1 2 3 4 5 | 6 7 8 9
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 30, [0, 1, 5, 6, 7, 8, 9, 2, 3, 4]);
        // // 2 3 4 5 6 | 7 8 9
        takeStep([3, 4, 5, 6, 7, 8, 9], 35, [0, 1, 2, 5, 6, 7, 8, 9, 3, 4]);
        // 3 4 5 6 7 | 8 9
        takeStep([4, 5, 6, 7, 8, 9], 40, [0, 1, 2, 3, 5, 6, 7, 8, 9, 4]);
        // 4 5 6 7 8 | 9
        takeStep([], 45, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("it handles first and last swapped", () => {
        board.setPoints([9, 1, 2, 3, 4, 5, 6, 7, 8, 0]);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 1, [9, 1, 2, 3, 4, 5, 6, 7, 0, 8]);

        // 7 | 8 9
        takeStep([8, 9], 2, [9, 1, 2, 3, 4, 5, 6, 0, 7, 8]);
        takeStep([5, 6], 2, [9, 1, 2, 3, 4, 5, 6, 0, 7, 8]);

        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 2, [9, 1, 2, 3, 4, 5, 6, 0, 7, 8]);

        // 5 6 | 7 8 9
        takeStep([6, 7, 8, 9], 4, [9, 1, 2, 3, 4, 0, 5, 6, 7, 8]);
        takeStep([7, 8, 9], 4, [9, 1, 2, 3, 4, 0, 5, 6, 7, 8]);
        takeStep([3, 4], 4, [9, 1, 2, 3, 4, 0, 5, 6, 7, 8]);

        // 3 | 4
        takeStep([2, 3, 4], 4, [9, 1, 2, 3, 4, 0, 5, 6, 7, 8]);

        // 2 | 3 4
        takeStep([0, 1], 4, [9, 1, 2, 3, 4, 0, 5, 6, 7, 8]);

        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 5, [1, 9, 2, 3, 4, 0, 5, 6, 7, 8]);

        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 5, [1, 9, 2, 3, 4, 0, 5, 6, 7, 8]);
        takeStep([2, 3, 4], 6, [1, 2, 9, 3, 4, 0, 5, 6, 7, 8]);
        takeStep([3, 4], 7, [1, 2, 3, 9, 4, 0, 5, 6, 7, 8]);
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, [1, 2, 3, 4, 9, 0, 5, 6, 7, 8]);

        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 13, [0, 1, 2, 3, 4, 9, 5, 6, 7, 8]);
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 13, [0, 1, 2, 3, 4, 9, 5, 6, 7, 8]);
        takeStep([3, 4, 5, 6, 7, 8, 9], 13, [0, 1, 2, 3, 4, 9, 5, 6, 7, 8]);
        takeStep([4, 5, 6, 7, 8, 9], 13, [0, 1, 2, 3, 4, 9, 5, 6, 7, 8]);
        takeStep([5, 6, 7, 8, 9], 13, [0, 1, 2, 3, 4, 9, 5, 6, 7, 8]);
        takeStep([6, 7, 8, 9], 14, [0, 1, 2, 3, 4, 5, 9, 6, 7, 8]);
        takeStep([7, 8, 9], 15, [0, 1, 2, 3, 4, 5, 6, 9, 7, 8]);
        takeStep([8, 9], 16, [0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
        takeStep([], 17, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles partially ordered grouping", () => {
        board.setPoints([1, 0, 2, 3, 4, 5, 7, 6, 8, 9]);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 0, [1, 0, 2, 3, 4, 5, 7, 6, 8, 9]);

        // 7 | 8 9
        takeStep([5, 6], 0, [1, 0, 2, 3, 4, 5, 7, 6, 8, 9]);

        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 0, [1, 0, 2, 3, 4, 5, 7, 6, 8, 9]);

        // 5 6 | 7 8 9
        takeStep([6, 7, 8, 9], 0, [1, 0, 2, 3, 4, 5, 7, 6, 8, 9]);
        takeStep([7, 8, 9], 1, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        takeStep([3, 4], 1, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);

        // 3 | 4
        takeStep([2, 3, 4], 1, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);

        // 2 | 3 4
        takeStep([0, 1], 1, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);

        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        takeStep([3, 4, 5, 6, 7, 8, 9], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        takeStep([4, 5, 6, 7, 8, 9], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        takeStep([], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles duplicates", () => {
        const values = [0, 2, 0, 4, 1, 2, 3, 4, 1, 3];
        board.setPoints(values);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 0, [0, 2, 0, 4, 1, 2, 3, 4, 1, 3]);

        // 7 | 8 9
        takeStep([8, 9], 1, [0, 2, 0, 4, 1, 2, 3, 1, 4, 3]);
        takeStep([5, 6], 2, [0, 2, 0, 4, 1, 2, 3, 1, 3, 4]);

        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 2, [0, 2, 0, 4, 1, 2, 3, 1, 3, 4]);

        // 5 6 | 7 8 9
        takeStep([6, 7, 8, 9], 4, [0, 2, 0, 4, 1, 1, 2, 3, 3, 4]);
        takeStep([7, 8, 9], 4, [0, 2, 0, 4, 1, 1, 2, 3, 3, 4]);
        takeStep([3, 4], 4, [0, 2, 0, 4, 1, 1, 2, 3, 3, 4]);

        // 3 | 4
        takeStep([2, 3, 4], 5, [0, 2, 0, 1, 4, 1, 2, 3, 3, 4]);

        // 2 | 3 4
        takeStep([0, 1], 5, [0, 2, 0, 1, 4, 1, 2, 3, 3, 4]);

        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 5, [0, 2, 0, 1, 4, 1, 2, 3, 3, 4]);

        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 5, [0, 2, 0, 1, 4, 1, 2, 3, 3, 4]);
        takeStep([2, 3, 4], 6, [0, 0, 2, 1, 4, 1, 2, 3, 3, 4]);
        takeStep([3, 4], 7, [0, 0, 1, 2, 4, 1, 2, 3, 3, 4]);
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 7, [0, 0, 1, 2, 4, 1, 2, 3, 3, 4]);

        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 7, [0, 0, 1, 2, 4, 1, 2, 3, 3, 4]);
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 7, [0, 0, 1, 2, 4, 1, 2, 3, 3, 4]);
        takeStep([3, 4, 5, 6, 7, 8, 9], 7, [0, 0, 1, 2, 4, 1, 2, 3, 3, 4]);
        takeStep([4, 5, 6, 7, 8, 9], 9, [0, 0, 1, 1, 2, 4, 2, 3, 3, 4]);
        takeStep([5, 6, 7, 8, 9], 9, [0, 0, 1, 1, 2, 4, 2, 3, 3, 4]);
        takeStep([6, 7, 8, 9], 10, [0, 0, 1, 1, 2, 2, 4, 3, 3, 4]);
        takeStep([7, 8, 9], 11, [0, 0, 1, 1, 2, 2, 3, 4, 3, 4]);
        takeStep([8, 9], 12, [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]);
        takeStep([], 12, [0, 0, 1, 1, 2, 2, 3, 3, 4, 4], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 0, 1, 1, 2, 2, 3, 3, 4, 4]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles more duplicates", () => {
        const values = [2, 1, 1, 2, 1, 1, 2, 2, 1, 1];
        board.setPoints(values);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 0, [2, 1, 1, 2, 1, 1, 2, 2, 1, 1]);

        // 7 | 8 9
        takeStep([8, 9], 1, [2, 1, 1, 2, 1, 1, 2, 1, 2, 1]);
        takeStep([5, 6], 2, [2, 1, 1, 2, 1, 1, 2, 1, 1, 2]);

        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 2, [2, 1, 1, 2, 1, 1, 2, 1, 1, 2]);

        // 5 6 | 7 8 9
        takeStep([6, 7, 8, 9], 2, [2, 1, 1, 2, 1, 1, 2, 1, 1, 2]);
        takeStep([7, 8, 9], 3, [2, 1, 1, 2, 1, 1, 1, 2, 1, 2]);
        takeStep([8, 9], 4, [2, 1, 1, 2, 1, 1, 1, 1, 2, 2]);
        takeStep([3, 4], 4, [2, 1, 1, 2, 1, 1, 1, 1, 2, 2]);

        // 3 | 4
        takeStep([2, 3, 4], 5, [2, 1, 1, 1, 2, 1, 1, 1, 2, 2]);

        // 2 | 3 4
        takeStep([0, 1], 5, [2, 1, 1, 1, 2, 1, 1, 1, 2, 2]);

        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 6, [1, 2, 1, 1, 2, 1, 1, 1, 2, 2]);

        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 6, [1, 2, 1, 1, 2, 1, 1, 1, 2, 2]);
        takeStep([2, 3, 4], 7, [1, 1, 2, 1, 2, 1, 1, 1, 2, 2]);
        takeStep([3, 4], 8, [1, 1, 1, 2, 2, 1, 1, 1, 2, 2]);
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, [1, 1, 1, 2, 2, 1, 1, 1, 2, 2]);

        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 8, [1, 1, 1, 2, 2, 1, 1, 1, 2, 2]);
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 8, [1, 1, 1, 2, 2, 1, 1, 1, 2, 2]);
        takeStep([3, 4, 5, 6, 7, 8, 9], 8, [1, 1, 1, 2, 2, 1, 1, 1, 2, 2]);
        takeStep([4, 5, 6, 7, 8, 9], 10, [1, 1, 1, 1, 2, 2, 1, 1, 2, 2]);
        takeStep([5, 6, 7, 8, 9], 12, [1, 1, 1, 1, 1, 2, 2, 1, 2, 2]);
        takeStep([6, 7, 8, 9], 14, [1, 1, 1, 1, 1, 1, 2, 2, 2, 2]);
        takeStep([7, 8, 9], 14, [1, 1, 1, 1, 1, 1, 2, 2, 2, 2]);
        takeStep([], 14, [1, 1, 1, 1, 1, 1, 2, 2, 2, 2], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([1, 1, 1, 1, 1, 1, 2, 2, 2, 2]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles negatives", () => {
        const values = [-2, 1, -1, 2, 0, -3, 3, -4, 4, 0];
        board.setPoints(values);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 1, [-2, 1, -1, 2, 0, -3, 3, -4, 0, 4]);

        // 7 | 8 9
        takeStep([5, 6], 1, [-2, 1, -1, 2, 0, -3, 3, -4, 0, 4]);

        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 1, [-2, 1, -1, 2, 0, -3, 3, -4, 0, 4]);

        // 5 6 | 7 8 9
        takeStep([6, 7, 8, 9], 3, [-2, 1, -1, 2, 0, -4, -3, 3, 0, 4]);
        takeStep([7, 8, 9], 3, [-2, 1, -1, 2, 0, -4, -3, 3, 0, 4]);
        takeStep([8, 9], 4, [-2, 1, -1, 2, 0, -4, -3, 0, 3, 4]);
        takeStep([3, 4], 4, [-2, 1, -1, 2, 0, -4, -3, 0, 3, 4]);

        // 3 | 4
        takeStep([2, 3, 4], 5, [-2, 1, -1, 0, 2, -4, -3, 0, 3, 4]);

        // 2 | 3 4
        takeStep([0, 1], 5, [-2, 1, -1, 0, 2, -4, -3, 0, 3, 4]);

        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 5, [-2, 1, -1, 0, 2, -4, -3, 0, 3, 4]);

        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 5, [-2, 1, -1, 0, 2, -4, -3, 0, 3, 4]);
        takeStep([2, 3, 4], 6, [-2, -1, 1, 0, 2, -4, -3, 0, 3, 4]);
        takeStep([3, 4], 7, [-2, -1, 0, 1, 2, -4, -3, 0, 3, 4]);
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 7, [-2, -1, 0, 1, 2, -4, -3, 0, 3, 4]);

        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 12, [-4, -2, -1, 0, 1, 2, -3, 0, 3, 4]);
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 17, [-4, -3, -2, -1, 0, 1, 2, 0, 3, 4]);
        takeStep([3, 4, 5, 6, 7, 8, 9], 17, [-4, -3, -2, -1, 0, 1, 2, 0, 3, 4]);
        takeStep([4, 5, 6, 7, 8, 9], 17, [-4, -3, -2, -1, 0, 1, 2, 0, 3, 4]);
        takeStep([5, 6, 7, 8, 9], 17, [-4, -3, -2, -1, 0, 1, 2, 0, 3, 4]);
        takeStep([6, 7, 8, 9], 19, [-4, -3, -2, -1, 0, 0, 1, 2, 3, 4]);
        takeStep([7, 8, 9], 19, [-4, -3, -2, -1, 0, 0, 1, 2, 3, 4]);
        takeStep([], 19, [-4, -3, -2, -1, 0, 0, 1, 2, 3, 4], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([-4, -3, -2, -1, 0, 0, 1, 2, 3, 4]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles different size", () => {
        board = new Board(fewFew);
        const values = [3, 0, 2, 1, 4];
        board.setPoints(values);
        sort = new Sort(board);

        // 3 | 4
        takeStep([2, 3, 4], 0, [3, 0, 2, 1, 4]);

        // 2 | 3 4
        takeStep([3, 4], 1, [3, 0, 1, 2, 4]);
        takeStep([0, 1], 1, [3, 0, 1, 2, 4]);

        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 2, [0, 3, 1, 2, 4]);

        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 2, [0, 3, 1, 2, 4]);
        takeStep([2, 3, 4], 3, [0, 1, 3, 2, 4]);
        takeStep([3, 4], 4, [0, 1, 2, 3, 4]);
        takeStep([], 4, [0, 1, 2, 3, 4], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });
    });

    it("has a reset function", () => {
      const rounds = 0;
      while (!sort.done && rounds < 10000) {
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
      const expected = [
        [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]],
        [[0, 1], [2, 3, 4]],
        [[0], [1]],
        [[2], [3, 4]],
        [[3], [4]],
        [[5, 6], [7, 8, 9]],
        [[5], [6]],
        [[7], [8, 9]],
        [[8], [9]],
      ];
      expect((sort as any).sections).toEqual(expected);
    });
  });

  describe("smallest first", () => {
    beforeEach(() => {
      length = 5;
      size = xXLarge;
      board = new Board(size);
      Sort = MergeSmallest;
      sort = new Sort(board);
      step = 1;
    });

    it("it has a title", () => {
      expect(Sort.title).toEqual("Merge Sort(Smallest First)");
    });

    describe("setup", () => {
      it("should find tree for length 4", () => {
        board = new Board({
          elemCount: 4,
          label: "test",
        });
        sort = new Sort(board);
        const expected = [
          [[0, 1], [2, 3]],
          [[0], [1]],
          [[2], [3]],
        ];
        expect((sort as any).sections).toEqual(expected);
      });

      it("should find tree for length 5", () => {
        board = new Board({
          elemCount: 5,
          label: "test",
        });
        sort = new Sort(board);
        const expected = [
          [[0, 1], [2, 3, 4]],
          [[0], [1]],
          [[2], [3, 4]],
          [[3], [4]],
        ];
        expect((sort as any).sections).toEqual(expected);
      });

      it("should find tree for length 10", () => {
        board = new Board({
          elemCount: 10,
          label: "test",
        });
        sort = new Sort(board);
        const expected = [
          [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]],
          [[0, 1], [2, 3, 4]],
          [[5, 6], [7, 8, 9]],
          [[0], [1]],
          [[2], [3, 4]],
          [[5], [6]],
          [[7], [8, 9]],
          [[3], [4]],
          [[8], [9]],
        ];
        expect((sort as any).sections).toEqual(expected);
      });

      it("should find tree for length 15", () => {
        board = new Board({
          elemCount: 15,
          label: "test",
        });
        sort = new Sort(board);
        const expected = [
          [[0, 1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12, 13, 14]],
          [[0, 1, 2], [3, 4, 5, 6]],
          [[7, 8, 9, 10], [11, 12, 13, 14]],
          [[0], [1, 2]],
          [[3, 4], [5, 6]],
          [[7, 8], [9, 10]],
          [[11, 12], [13, 14]],
          [[1], [2]],
          [[3], [4]],
          [[5], [6]],
          [[7], [8]],
          [[9], [10]],
          [[11], [12]],
          [[13], [14]],
        ];
        expect((sort as any).sections).toEqual(expected);
      });

      it("should find tree for length 20", () => {
        board = new Board({
          elemCount: 20,
          label: "test",
        });
        sort = new Sort(board);
        const expected = [
          [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]],
          [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]],
          [[10, 11, 12, 13, 14], [15, 16, 17, 18, 19]],
          [[0, 1], [2, 3, 4]],
          [[5, 6], [7, 8, 9]],
          [[10, 11], [12, 13, 14]],
          [[15, 16], [17, 18, 19]],
          [[0], [1]],
          [[2], [3, 4]],
          [[5], [6]],
          [[7], [8, 9]],
          [[10], [11]],
          [[12], [13, 14]],
          [[15], [16]],
          [[17], [18, 19]],
          [[3], [4]],
          [[8], [9]],
          [[13], [14]],
          [[18], [19]],
        ];
        expect((sort as any).sections).toEqual(expected);
      });
    });
  });

  describe("out of place", () => {
    beforeEach(() => {
      length = 5;
      size = xXLarge;
      board = new Board(size);
      Sort = MergeOutOfPlace;
      sort = new Sort(board);
      step = 1;
    });

    describe("create", () => {
      it("it has a title", () => {
        expect(Sort.title).toEqual("Merge Sort(Out Of Place)");
      });

      it("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([8, 9]);
      });
    });

    describe("utils", () => {
      it("it handles ordered group", () => {
        const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        board.setPoints(array.slice());
        sort = new Sort(board);
        expect(sort.currentNodes()).toEqual([8, 9]);
        takeStep([7, 8, 9], 0, array);
        takeStep([5, 6], 0, array);
        takeStep([5, 6, 7, 8, 9], 0, array);
        takeStep([6, 7, 8, 9], 0, array);
        takeStep([3, 4], 0, array);
        takeStep([2, 3, 4], 0, array);
        takeStep([0, 1], 0, array);
        takeStep([0, 1, 2, 3, 4], 0, array);
        takeStep([1, 2, 3, 4], 0, array);
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, array);
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 0, array);
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 0, array);
        takeStep([3, 4, 5, 6, 7, 8, 9], 0, array);
        takeStep([4, 5, 6, 7, 8, 9], 0, array);
        takeStep([], 0, array, true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.swaps).toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles a random group", () => {
        board.setPoints([2, 5, 0, 7, 9, 3, 1, 6, 8, 4]);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 1, [2, 5, 0, 7, 9, 3, 1, 6, 4, 8]);

        // 7 | 9
        takeStep([7, 9], 1, [2, 5, 0, 7, 9, 3, 1, 6, 4, 8]);
        takeStep([5, 6], 2, [2, 5, 0, 7, 9, 3, 1, 4, 6, 8]);

        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 3, [2, 5, 0, 7, 9, 1, 3, 4, 6, 8]);

        // 5 6 | 7 8 9
        takeStep([6, 7, 8, 9], 3, [2, 5, 0, 7, 9, 1, 3, 4, 6, 8]);
        takeStep([3, 4], 3, [2, 5, 0, 7, 9, 1, 3, 4, 6, 8]);

        // 3 | 4
        takeStep([2, 3, 4], 3, [2, 5, 0, 7, 9, 1, 3, 4, 6, 8]);

        // 2 | 3 4
        takeStep([0, 1], 3, [2, 5, 0, 7, 9, 1, 3, 4, 6, 8]);

        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 3, [2, 5, 0, 7, 9, 1, 3, 4, 6, 8]);

        // 0 1 | 2 3 4
        takeStep([0, 1, 3, 4], 3, [2, 5, 0, 7, 9, 1, 3, 4, 6, 8]);
        takeStep([1, 3, 4], 3, [2, 5, 0, 7, 9, 1, 3, 4, 6, 8]);
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5, [0, 2, 5, 7, 9, 1, 3, 4, 6, 8]);

        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 5, [0, 2, 5, 7, 9, 1, 3, 4, 6, 8]);
        takeStep([1, 2, 3, 4, 6, 7, 8, 9], 5, [0, 2, 5, 7, 9, 1, 3, 4, 6, 8]);
        takeStep([2, 3, 4, 6, 7, 8, 9], 5, [0, 2, 5, 7, 9, 1, 3, 4, 6, 8]);
        takeStep([2, 3, 4, 7, 8, 9], 5, [0, 2, 5, 7, 9, 1, 3, 4, 6, 8]);
        takeStep([2, 3, 4, 8, 9], 5, [0, 2, 5, 7, 9, 1, 3, 4, 6, 8]);
        takeStep([3, 4, 8, 9], 5, [0, 2, 5, 7, 9, 1, 3, 4, 6, 8]);
        takeStep([3, 4, 9], 5, [0, 2, 5, 7, 9, 1, 3, 4, 6, 8]);
        takeStep([4, 9], 5, [0, 2, 5, 7, 9, 1, 3, 4, 6, 8]);
        takeStep([], 12, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles a swaping first group", () => {
        board.setPoints([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 0, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 7 | 8 9
        takeStep([5, 6], 0, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 0, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 5 6 | 7 8 9
        takeStep([6, 7, 8, 9], 0, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 6 | 7 8 9
        takeStep([3, 4], 0, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 3 | 4
        takeStep([2, 3, 4], 0, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 2 | 3 4
        takeStep([0, 1], 0, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 1 | 2 3 4
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 1 2 3 4 | 5 6 7 8 9
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 2 3 4 | 5 6 7 8 9
        takeStep([3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 3 4 | 5 6 7 8 9
        takeStep([4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 4 |  5 6 7 8 9
        takeStep([], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles a swaping last group", () => {
        board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 7 | 8 9
        takeStep([5, 6], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 5 6 | 7 8 9
        takeStep([6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 6 | 7 8 9
        takeStep([3, 4], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 3 | 4
        takeStep([2, 3, 4], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 2 | 3 4
        takeStep([0, 1], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 1 | 2 3 4
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 1 2 3 4 | 5 6 7 8 9
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 2 3 4 | 5 6 7 8 9
        takeStep([3, 4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 3 4 | 5 6 7 8 9
        takeStep([4, 5, 6, 7, 8, 9], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // 4 |  5 6 7 8 9
        takeStep([], 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("it does reverse group", () => {
        board.setPoints([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
        sort = new Sort(board);

        // 8 | 9
        takeStep([7, 8, 9], 1, [9, 8, 7, 6, 5, 4, 3, 2, 0, 1]);

        // 7 | 8 9
        takeStep([7, 9], 1, [9, 8, 7, 6, 5, 4, 3, 2, 0, 1]);
        takeStep([5, 6], 3, [9, 8, 7, 6, 5, 4, 3, 0, 1, 2]);

        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 4, [9, 8, 7, 6, 5, 3, 4, 0, 1, 2]);

        // 5 6 | 7 8 9
        takeStep([5, 6, 8, 9], 4, [9, 8, 7, 6, 5, 3, 4, 0, 1, 2]);
        takeStep([5, 6, 9], 4, [9, 8, 7, 6, 5, 3, 4, 0, 1, 2]);
        takeStep([3, 4], 8, [9, 8, 7, 6, 5, 0, 1, 2, 3, 4]);

        // 3 | 4
        takeStep([2, 3, 4], 9, [9, 8, 7, 5, 6, 0, 1, 2, 3, 4]);

        // 2 | 3 4
        takeStep([2, 4], 9, [9, 8, 7, 5, 6, 0, 1, 2, 3, 4]);
        takeStep([0, 1], 11, [9, 8, 5, 6, 7, 0, 1, 2, 3, 4]);

        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 12, [8, 9, 5, 6, 7, 0, 1, 2, 3, 4]);

        // 0 1 | 2 3 4
        takeStep([0, 1, 3, 4], 12, [8, 9, 5, 6, 7, 0, 1, 2, 3, 4]);
        takeStep([0, 1, 4], 12, [8, 9, 5, 6, 7, 0, 1, 2, 3, 4]);
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 16, [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);

        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([0, 1, 2, 3, 4, 6, 7, 8, 9], 16, [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
        takeStep([0, 1, 2, 3, 4, 7, 8, 9], 16, [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
        takeStep([0, 1, 2, 3, 4, 8, 9], 16, [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
        takeStep([0, 1, 2, 3, 4, 9], 16, [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
        takeStep([], 21, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("it handles first and last swapped", () => {
        board.setPoints([9, 1, 2, 3, 4, 5, 6, 7, 8, 0]);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 1, [9, 1, 2, 3, 4, 5, 6, 7, 0, 8]);

        // 7 | 8 9
        takeStep([7, 9], 1, [9, 1, 2, 3, 4, 5, 6, 7, 0, 8]);
        takeStep([5, 6], 2, [9, 1, 2, 3, 4, 5, 6, 0, 7, 8]);

        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 2, [9, 1, 2, 3, 4, 5, 6, 0, 7, 8]);

        // 5 6 | 7 8 9
        takeStep([5, 6, 8, 9], 2, [9, 1, 2, 3, 4, 5, 6, 0, 7, 8]);
        takeStep([6, 8, 9], 2, [9, 1, 2, 3, 4, 5, 6, 0, 7, 8]);
        takeStep([3, 4], 4, [9, 1, 2, 3, 4, 0, 5, 6, 7, 8]);

        // 3 | 4
        takeStep([2, 3, 4], 4, [9, 1, 2, 3, 4, 0, 5, 6, 7, 8]);

        // 2 | 3 4
        takeStep([0, 1], 4, [9, 1, 2, 3, 4, 0, 5, 6, 7, 8]);

        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 5, [1, 9, 2, 3, 4, 0, 5, 6, 7, 8]);

        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 5, [1, 9, 2, 3, 4, 0, 5, 6, 7, 8]);
        takeStep([1, 3, 4], 5, [1, 9, 2, 3, 4, 0, 5, 6, 7, 8]);
        takeStep([1, 4], 5, [1, 9, 2, 3, 4, 0, 5, 6, 7, 8]);
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, [1, 2, 3, 4, 9, 0, 5, 6, 7, 8]);

        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([0, 1, 2, 3, 4, 6, 7, 8, 9], 8, [1, 2, 3, 4, 9, 0, 5, 6, 7, 8]);
        takeStep([1, 2, 3, 4, 6, 7, 8, 9], 8, [1, 2, 3, 4, 9, 0, 5, 6, 7, 8]);
        takeStep([2, 3, 4, 6, 7, 8, 9], 8, [1, 2, 3, 4, 9, 0, 5, 6, 7, 8]);
        takeStep([3, 4, 6, 7, 8, 9], 8, [1, 2, 3, 4, 9, 0, 5, 6, 7, 8]);
        takeStep([4, 6, 7, 8, 9], 8, [1, 2, 3, 4, 9, 0, 5, 6, 7, 8]);
        takeStep([4, 7, 8, 9], 8, [1, 2, 3, 4, 9, 0, 5, 6, 7, 8]);
        takeStep([4, 8, 9], 8, [1, 2, 3, 4, 9, 0, 5, 6, 7, 8]);
        takeStep([4, 9], 8, [1, 2, 3, 4, 9, 0, 5, 6, 7, 8]);
        takeStep([], 17, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles partially ordered grouping", () => {
        board.setPoints([1, 0, 2, 3, 4, 5, 7, 6, 8, 9]);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 0, [1, 0, 2, 3, 4, 5, 7, 6, 8, 9]);

        // 7 | 8 9
        takeStep([5, 6], 0, [1, 0, 2, 3, 4, 5, 7, 6, 8, 9]);

        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 0, [1, 0, 2, 3, 4, 5, 7, 6, 8, 9]);

        // 5 6 | 7 8 9
        takeStep([6, 7, 8, 9], 0, [1, 0, 2, 3, 4, 5, 7, 6, 8, 9]);
        takeStep([6, 8, 9], 0, [1, 0, 2, 3, 4, 5, 7, 6, 8, 9]);
        takeStep([3, 4], 1, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);

        // 3 | 4
        takeStep([2, 3, 4], 1, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);

        // 2 | 3 4
        takeStep([0, 1], 1, [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);

        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        takeStep([3, 4, 5, 6, 7, 8, 9], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        takeStep([4, 5, 6, 7, 8, 9], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        takeStep([], 2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles duplicates", () => {
        const values = [0, 2, 0, 4, 1, 2, 3, 4, 1, 3];
        board.setPoints(values);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 0, [0, 2, 0, 4, 1, 2, 3, 4, 1, 3]);

        // 7 | 8 9
        takeStep([7, 9], 0, [0, 2, 0, 4, 1, 2, 3, 4, 1, 3]);
        takeStep([5, 6], 2, [0, 2, 0, 4, 1, 2, 3, 1, 3, 4]);

        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 2, [0, 2, 0, 4, 1, 2, 3, 1, 3, 4]);

        // 5 6 | 7 8 9
        takeStep([5, 6, 8, 9], 2, [0, 2, 0, 4, 1, 2, 3, 1, 3, 4]);
        takeStep([6, 8, 9], 2, [0, 2, 0, 4, 1, 2, 3, 1, 3, 4]);
        takeStep([3, 4], 4, [0, 2, 0, 4, 1, 1, 2, 3, 3, 4]);

        // 3 | 4
        takeStep([2, 3, 4], 5, [0, 2, 0, 1, 4, 1, 2, 3, 3, 4]);

        // 2 | 3 4
        takeStep([0, 1], 5, [0, 2, 0, 1, 4, 1, 2, 3, 3, 4]);

        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 5, [0, 2, 0, 1, 4, 1, 2, 3, 3, 4]);

        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 5, [0, 2, 0, 1, 4, 1, 2, 3, 3, 4]);
        takeStep([1, 3, 4], 5, [0, 2, 0, 1, 4, 1, 2, 3, 3, 4]);
        takeStep([1, 4], 5, [0, 2, 0, 1, 4, 1, 2, 3, 3, 4]);
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 7, [0, 0, 1, 2, 4, 1, 2, 3, 3, 4]);

        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 7, [0, 0, 1, 2, 4, 1, 2, 3, 3, 4]);
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 7, [0, 0, 1, 2, 4, 1, 2, 3, 3, 4]);
        takeStep([3, 4, 5, 6, 7, 8, 9], 7, [0, 0, 1, 2, 4, 1, 2, 3, 3, 4]);
        takeStep([3, 4, 6, 7, 8, 9], 7, [0, 0, 1, 2, 4, 1, 2, 3, 3, 4]);
        takeStep([4, 6, 7, 8, 9], 7, [0, 0, 1, 2, 4, 1, 2, 3, 3, 4]);
        takeStep([4, 7, 8, 9], 7, [0, 0, 1, 2, 4, 1, 2, 3, 3, 4]);
        takeStep([4, 8, 9], 7, [0, 0, 1, 2, 4, 1, 2, 3, 3, 4]);
        takeStep([4, 9], 7, [0, 0, 1, 2, 4, 1, 2, 3, 3, 4]);
        takeStep([], 12, [0, 0, 1, 1, 2, 2, 3, 3, 4, 4], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 0, 1, 1, 2, 2, 3, 3, 4, 4]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles more duplicates", () => {
        const values = [2, 1, 1, 2, 1, 1, 2, 2, 1, 1];
        board.setPoints(values);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 0, [2, 1, 1, 2, 1, 1, 2, 2, 1, 1]);

        // 7 | 8 9
        takeStep([7, 9], 0, [2, 1, 1, 2, 1, 1, 2, 2, 1, 1]);
        takeStep([5, 6], 2, [2, 1, 1, 2, 1, 1, 2, 1, 1, 2]);

        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 2, [2, 1, 1, 2, 1, 1, 2, 1, 1, 2]);

        // 5 6 | 7 8 9
        takeStep([6, 7, 8, 9], 2, [2, 1, 1, 2, 1, 1, 2, 1, 1, 2]);
        takeStep([6, 8, 9], 2, [2, 1, 1, 2, 1, 1, 2, 1, 1, 2]);
        takeStep([6, 9], 2, [2, 1, 1, 2, 1, 1, 2, 1, 1, 2]);
        takeStep([3, 4], 4, [2, 1, 1, 2, 1, 1, 1, 1, 2, 2]);

        // 3 | 4
        takeStep([2, 3, 4], 5, [2, 1, 1, 1, 2, 1, 1, 1, 2, 2]);

        // 2 | 3 4
        takeStep([0, 1], 5, [2, 1, 1, 1, 2, 1, 1, 1, 2, 2]);

        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 6, [1, 2, 1, 1, 2, 1, 1, 1, 2, 2]);

        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 6, [1, 2, 1, 1, 2, 1, 1, 1, 2, 2]);
        takeStep([1, 3, 4], 6, [1, 2, 1, 1, 2, 1, 1, 1, 2, 2]);
        takeStep([1, 4], 6, [1, 2, 1, 1, 2, 1, 1, 1, 2, 2]);
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, [1, 1, 1, 2, 2, 1, 1, 1, 2, 2]);

        // // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([1, 2, 3, 4, 5, 6, 7, 8, 9], 8, [1, 1, 1, 2, 2, 1, 1, 1, 2, 2]);
        takeStep([2, 3, 4, 5, 6, 7, 8, 9], 8, [1, 1, 1, 2, 2, 1, 1, 1, 2, 2]);
        takeStep([3, 4, 5, 6, 7, 8, 9], 8, [1, 1, 1, 2, 2, 1, 1, 1, 2, 2]);
        takeStep([3, 4, 6, 7, 8, 9], 8, [1, 1, 1, 2, 2, 1, 1, 1, 2, 2]);
        takeStep([3, 4, 7, 8, 9], 8, [1, 1, 1, 2, 2, 1, 1, 1, 2, 2]);
        takeStep([3, 4, 8, 9], 8, [1, 1, 1, 2, 2, 1, 1, 1, 2, 2]);
        takeStep([4, 8, 9], 8, [1, 1, 1, 2, 2, 1, 1, 1, 2, 2]);
        takeStep([], 11, [1, 1, 1, 1, 1, 1, 2, 2, 2, 2], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([1, 1, 1, 1, 1, 1, 2, 2, 2, 2]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles negatives", () => {
        const values = [-2, 1, -1, 2, 0, -3, 3, -4, 4, 0];
        board.setPoints(values);
        sort = new Sort(board);

        // 8 9
        takeStep([7, 8, 9], 1, [-2, 1, -1, 2, 0, -3, 3, -4, 0, 4]);

        // 7 | 8 9
        takeStep([5, 6], 1, [-2, 1, -1, 2, 0, -3, 3, -4, 0, 4]);

        // 5 | 6
        takeStep([5, 6, 7, 8, 9], 1, [-2, 1, -1, 2, 0, -3, 3, -4, 0, 4]);

        // 5 6 | 7 8 9
        takeStep([5, 6, 8, 9], 1, [-2, 1, -1, 2, 0, -3, 3, -4, 0, 4]);
        takeStep([6, 8, 9], 1, [-2, 1, -1, 2, 0, -3, 3, -4, 0, 4]);
        takeStep([6, 9], 1, [-2, 1, -1, 2, 0, -3, 3, -4, 0, 4]);
        takeStep([3, 4], 4, [-2, 1, -1, 2, 0, -4, -3, 0, 3, 4]);

        // 3 | 4
        takeStep([2, 3, 4], 5, [-2, 1, -1, 0, 2, -4, -3, 0, 3, 4]);

        // 2 | 3 4
        takeStep([0, 1], 5, [-2, 1, -1, 0, 2, -4, -3, 0, 3, 4]);

        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 5, [-2, 1, -1, 0, 2, -4, -3, 0, 3, 4]);

        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 5, [-2, 1, -1, 0, 2, -4, -3, 0, 3, 4]);
        takeStep([1, 3, 4], 5, [-2, 1, -1, 0, 2, -4, -3, 0, 3, 4]);
        takeStep([1, 4], 5, [-2, 1, -1, 0, 2, -4, -3, 0, 3, 4]);
        takeStep([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 7, [-2, -1, 0, 1, 2, -4, -3, 0, 3, 4]);

        // 0 1 2 3 4 | 5 6 7 8 9
        takeStep([0, 1, 2, 3, 4, 6, 7, 8, 9], 7, [-2, -1, 0, 1, 2, -4, -3, 0, 3, 4]);
        takeStep([0, 1, 2, 3, 4, 7, 8, 9], 7, [-2, -1, 0, 1, 2, -4, -3, 0, 3, 4]);
        takeStep([1, 2, 3, 4, 7, 8, 9], 7, [-2, -1, 0, 1, 2, -4, -3, 0, 3, 4]);
        takeStep([2, 3, 4, 7, 8, 9], 7, [-2, -1, 0, 1, 2, -4, -3, 0, 3, 4]);
        takeStep([3, 4, 7, 8, 9], 7, [-2, -1, 0, 1, 2, -4, -3, 0, 3, 4]);
        takeStep([3, 4, 8, 9], 7, [-2, -1, 0, 1, 2, -4, -3, 0, 3, 4]);
        takeStep([4, 8, 9], 7, [-2, -1, 0, 1, 2, -4, -3, 0, 3, 4]);
        takeStep([], 13, [-4, -3, -2, -1, 0, 0, 1, 2, 3, 4], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([-4, -3, -2, -1, 0, 0, 1, 2, 3, 4]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });

      it("handles different size", () => {
        board = new Board(fewFew);
        const values = [3, 0, 2, 1, 4];
        board.setPoints(values);
        sort = new Sort(board);

        // 3 | 4
        takeStep([2, 3, 4], 0, [3, 0, 2, 1, 4]);

        // 2 | 3 4
        takeStep([2, 4], 0, [3, 0, 2, 1, 4]);
        takeStep([0, 1], 1, [3, 0, 1, 2, 4]);

        // 0 | 1
        takeStep([0, 1, 2, 3, 4], 2, [0, 3, 1, 2, 4]);

        // 0 1 | 2 3 4
        takeStep([1, 2, 3, 4], 2, [0, 3, 1, 2, 4]);
        takeStep([1, 3, 4], 2, [0, 3, 1, 2, 4]);
        takeStep([1, 4], 2, [0, 3, 1, 2, 4]);
        takeStep([], 4, [0, 1, 2, 3, 4], true);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);
        expect(sort.swaps).not.toEqual(0);
        expect(sort.comparisons).not.toEqual(0);
        expect(sort.steps).not.toEqual(0);
      });
    });

    it("has a reset function", () => {
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
      const expected = [
        [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]],
        [[0, 1], [2, 3, 4]],
        [[0], [1]],
        [[2], [3, 4]],
        [[3], [4]],
        [[5, 6], [7, 8, 9]],
        [[5], [6]],
        [[7], [8, 9]],
        [[8], [9]],
      ];
      expect((sort as any).sections).toEqual(expected);
    });
  });
});
