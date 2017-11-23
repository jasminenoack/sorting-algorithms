import { Board } from "../../src/board";
import { fewFew } from "./../../src/sizes";
import { Stooge } from "./../../src/sorts/stooge/base";

describe("Sorts", () => {
  let length;
  let sort;
  let board;
  let size;
  let Sort;

  describe("Stooge", () => {
    beforeEach(() => {
      length = 5;
      size = fewFew;
      board = new Board(size);
      Sort = Stooge;
      sort = new Sort(board);
    });

    describe("create", () => {
      it("it has a title", () => {
        expect(Sort.title).toEqual("Stooge Sort");
      });

      it("it has sets", () => {
        expect(sort.partitions).toEqual([
          [1, 2], [0, 1], // first 2 sets
          [1, 3], [0, 2], // other 3 sets
          [1, 4], [0, 3], // other 4 sets
        ]);
      });
    });

    it("has a reset function", () => {
      while (!sort.done) {
        sort.next();
      }
      const values = board.values().slice();
      sort.reset();
      expect(sort.done).toBeFalsy();
      expect(sort.steps).toEqual(0);
      expect(sort.swaps).toEqual(0);
      expect(sort.comparisons).toEqual(0);
      expect(values).not.toEqual(board.values());
      expect(sort.baseNode).toEqual(0);
      expect(sort.comparisonNode).toEqual(1);
      expect(sort.partitions).toEqual([
        [1, 2], [0, 1], // first 2 sets
        [1, 3], [0, 2], // other 3 sets
        [1, 4], [0, 3], // other 4 sets
      ]);
    });

    describe("utils", () => {
      it("creates subsets", () => {
        expect(sort.subsets([0, 4])).toEqual([[0, 3], [1, 4], [0, 3]]);
        expect(sort.subsets([0, 3])).toEqual([[0, 2], [1, 3], [0, 2]]);
        expect(sort.subsets([1, 4])).toEqual([[1, 3], [2, 4], [1, 3]]);
        expect(sort.subsets([0, 2])).toEqual([[0, 1], [1, 2], [0, 1]]);
        expect(sort.subsets([2, 4])).toEqual([[2, 3], [3, 4], [2, 3]]);
        expect(sort.subsets([0, 9])).toEqual([[0, 6], [3, 9], [0, 6]]);
        expect(sort.subsets([0, 99])).toEqual([[0, 66], [33, 99], [0, 66]]);
      });

      it("breaks down subsets", () => {
        expect(sort.breakDownSubset([0, 4])).toEqual([
          [0, 1], [1, 2], [0, 1], // first 2 sets
          [1, 3], [0, 2], // other 3 sets
          [1, 4], [0, 3], // other 4 sets
        ]);
        expect(sort.breakDownSubset([0, 3])).toEqual([
          [0, 1], [1, 2], [0, 1], // first 2 sets
          [1, 3], [0, 2], // other 3 sets
        ]);
        expect(sort.breakDownSubset([1, 4])).toEqual([
          [1, 2], [2, 3], [1, 2],
          [2, 4], [1, 3],
        ]);
        expect(sort.breakDownSubset([1, 3])).toEqual([
          [1, 2], [2, 3], [1, 2],
        ]);
      });

      it("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([0, 1]);
      });

      it("it handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([0, 1]);

        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([1, 2]);

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([0, 1]);

        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([1, 2]);

        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        expect(sort.next()).toEqual([2, 3]);

        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([1, 2]);

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([0, 1]);

        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([1, 2]);

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([0, 1]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });
    });
  });
});
