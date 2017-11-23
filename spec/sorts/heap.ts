import { Board } from "../../src/board";
import { fewFew, xXLarge } from "./../../src/sizes";
import { Heap } from "./../../src/sorts/heap/base";

describe("heap sort", () => {
  let length;
  let sort;
  let board;
  let size;
  let Sort;

  beforeEach(() => {
    length = 5;
    size = fewFew;
    board = new Board(size);
    Sort = Heap;
    sort = new Sort(board);
  });

  describe("create", () => {
    it("it has a title", () => {
      expect(Sort.title).toEqual("Heap Sort");
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
    expect(sort.comparisonNode).toEqual(sort.length - 1);
  });

  describe("utils", () => {

    it("has current nodes", () => {
      expect(sort.currentNodes()).toEqual([1]);
    });

    it("it handles ordered group", () => {
      board.setPoints([0, 1, 2, 3, 4]);
      sort = new Sort(board);
      // if comparison return comparison
      // if remove return nothing
      expect(sort.next()).toEqual([1]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("handles a random group", () => {
      board.setPoints([0, 3, 1, 4, 2]);
      sort = new Sort(board);

      // make heap
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      // remove first
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("handles a swaping first group", () => {
      board.setPoints([1, 0, 2, 3, 4]);
      sort = new Sort(board);

      // make heap
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      // remove first
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("handles a swaping last group", () => {
      board.setPoints([0, 1, 2, 4, 3]);
      sort = new Sort(board);

      // make heap
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      expect(board.values()).toEqual([4, 3, 2, 1, 0]);
      // remove first
      expect(sort.next()).toEqual([]);
      expect(board.values()).toEqual([0, 3, 2, 1, 4]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      expect(board.values()).toEqual([3, 1, 2, 0, 4]);
      expect(sort.next()).toEqual([]);
      expect(board.values()).toEqual([0, 1, 2, 3, 4]);

      expect(sort.next()).toEqual([0]);
      expect(board.values()).toEqual([2, 1, 0, 3, 4]);
      expect(sort.next()).toEqual([]);
      expect(board.values()).toEqual([0, 1, 2, 3, 4]);

      expect(sort.next()).toEqual([0]);
      expect(board.values()).toEqual([1, 0, 2, 3, 4]);
      expect(sort.next()).toEqual([]);

      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("it does reverse group", () => {
      board.setPoints([4, 3, 2, 1, 0]);
      sort = new Sort(board);

      // make heap
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([0]);
      // remove first
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("it handles first and last swapped", () => {
      board.setPoints([4, 1, 2, 3, 0]);
      sort = new Sort(board);

      // make heap
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([0]);
      // remove first
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("handles partially ordered grouping", () => {
      board.setPoints([0, 3, 2, 1, 4]);
      sort = new Sort(board);

      // make heap
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      // remove first
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("highest no children", () => {
      board.setPoints([0, 2, 4, 1, 3]);
      sort = new Sort(board);

      // make heap
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([0]);
      expect(board.values()).toEqual([4, 3, 0, 1, 2]);
      // remove first
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      expect(board.values()).toEqual([3, 2, 0, 1, 4]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("handles duplicates", () => {
      const values = [0, 2, 3, 1, 1];
      board.setPoints(values);
      sort = new Sort(board);

      // make heap
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([0]);
      // remove first
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(values.slice().sort()[i]).toEqual(board.values()[i]);
      }
    });

    it("handles more duplicates", () => {
      const values = [2, 1, 1, 2, 1];
      board.setPoints(values);
      sort = new Sort(board);

      // make heap
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([0]);
      // remove first
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([1]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.next()).toEqual([0]);
      expect(sort.next()).toEqual([]);

      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(values.slice().sort()[i]).toEqual(board.values()[i]);
      }
    });

    it("handles bug", () => {
      // bugs with zeros
      size = xXLarge;
      board = new Board(size);
      board.setPoints([0, -1, -1, -5, -2, 1, 0, 0, -1, 0]);
      sort = new Sort(board);

      // make heap
      expect(sort.next()).toEqual([4]);
      expect(board.values()).toEqual([0, -1, -1, -5, 0, 1, 0, 0, -1, -2]);
      expect(sort.next()).toEqual([3]);
      expect(board.values()).toEqual([0, -1, -1, 0, 0, 1, 0, -5, -1, -2]);
      expect(sort.next()).toEqual([2]);
      expect(board.values()).toEqual([0, -1, 1, 0, 0, -1, 0, -5, -1, -2]);
      expect(sort.next()).toEqual([1]);
      expect(board.values()).toEqual([0, 0, 1, -1, 0, -1, 0, -5, -1, -2]);
      expect(sort.next()).toEqual([3]);
      expect(board.values()).toEqual([0, 0, 1, -1, 0, -1, 0, -5, -1, -2]);
      expect(sort.next()).toEqual([0]);
      expect(board.values()).toEqual([1, 0, 0, -1, 0, -1, 0, -5, -1, -2]);
      expect(sort.next()).toEqual([2]);
      expect(board.values()).toEqual([1, 0, 0, -1, 0, -1, 0, -5, -1, -2]);
      expect(sort.comparisonNode).toEqual(9);

      // remove
      expect(sort.next()).toEqual([]);
      expect(board.values()).toEqual([-2, 0, 0, -1, 0, -1, 0, -5, -1, 1]);
      expect(sort.next()).toEqual([0]);
      expect(board.values()).toEqual([0, -2, 0, -1, 0, -1, 0, -5, -1, 1]);
      expect(sort.next()).toEqual([1]);
      expect(board.values()).toEqual([0, 0, 0, -1, -2, -1, 0, -5, -1, 1]);
      expect(sort.comparisonNode).toEqual(8);

      // remove
      expect(sort.next()).toEqual([]);
      expect(board.values()).toEqual([-1, 0, 0, -1, -2, -1, 0, -5, 0, 1]);
      expect(sort.next()).toEqual([0]);
      expect(board.values()).toEqual([0, -1, 0, -1, -2, -1, 0, -5, 0, 1]);
      expect(sort.next()).toEqual([1]);
      expect(board.values()).toEqual([0, -1, 0, -1, -2, -1, 0, -5, 0, 1]);
      expect(sort.comparisonNode).toEqual(7);

      // remove
      expect(sort.next()).toEqual([]);
      expect(board.values()).toEqual([-5, -1, 0, -1, -2, -1, 0, 0, 0, 1]);
      expect(sort.next()).toEqual([0]);
      expect(board.values()).toEqual([0, -1, -5, -1, -2, -1, 0, 0, 0, 1]);
      expect(sort.next()).toEqual([2]);
      expect(board.values()).toEqual([0, -1, 0, -1, -2, -1, -5, 0, 0, 1]);
      expect(sort.comparisonNode).toEqual(6);

      // remove
      expect(sort.next()).toEqual([]);
      expect(board.values()).toEqual([-5, -1, 0, -1, -2, -1, 0, 0, 0, 1]);
      expect(sort.comparisonNode).toEqual(5);
      expect(sort.next()).toEqual([0]);
      expect(board.values()).toEqual([0, -1, -5, -1, -2, -1, 0, 0, 0, 1]);
      expect(sort.next()).toEqual([2]);
      expect(board.values()).toEqual([0, -1, -1, -1, -2, -5, 0, 0, 0, 1]);

      // remove
      expect(sort.next()).toEqual([]);
      expect(board.values()).toEqual([-5, -1, -1, -1, -2, 0, 0, 0, 0, 1]);
      expect(sort.comparisonNode).toEqual(4);
      expect(sort.next()).toEqual([0]);
      expect(board.values()).toEqual([-1, -5, -1, -1, -2, 0, 0, 0, 0, 1]);
      expect(sort.next()).toEqual([1]);
      expect(board.values()).toEqual([-1, -1, -1, -5, -2, 0, 0, 0, 0, 1]);

      // remove
      expect(sort.next()).toEqual([]);
      expect(board.values()).toEqual([-2, -1, -1, -5, -1, 0, 0, 0, 0, 1]);
      expect(sort.comparisonNode).toEqual(3);
      expect(sort.next()).toEqual([0]);
      expect(board.values()).toEqual([-1, -2, -1, -5, -1, 0, 0, 0, 0, 1]);
      expect(sort.next()).toEqual([1]);
      expect(board.values()).toEqual([-1, -2, -1, -5, -1, 0, 0, 0, 0, 1]);

      // remove
      expect(sort.next()).toEqual([]);
      expect(board.values()).toEqual([-5, -2, -1, -1, -1, 0, 0, 0, 0, 1]);
      expect(sort.comparisonNode).toEqual(2);
      expect(sort.next()).toEqual([0]);
      expect(board.values()).toEqual([-1, -2, -5, -1, -1, 0, 0, 0, 0, 1]);

      // remove
      expect(sort.next()).toEqual([]);
      expect(board.values()).toEqual([-5, -2, -1, -1, -1, 0, 0, 0, 0, 1]);
      expect(sort.comparisonNode).toEqual(1);
      expect(sort.next()).toEqual([0]);
      expect(board.values()).toEqual([-2, -5, -1, -1, -1, 0, 0, 0, 0, 1]);

      // remove
      expect(sort.next()).toEqual([]);
      expect(board.values()).toEqual([-5, -2, -1, -1, -1, 0, 0, 0, 0, 1]);

      expect(sort.done).toEqual(true);
    });
  });
});
