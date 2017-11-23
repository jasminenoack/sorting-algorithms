import { Board } from "../../src/board";
import { fewFew } from "./../../src/sizes";
import { SelectionSort } from "./../../src/sorts/selection/base";

describe("selection sort", () => {
  let length;
  let sort;
  let board;
  let size;
  let Sort;

  beforeEach(() => {
    length = 5;
    size = fewFew;
    board = new Board(size);
    Sort = SelectionSort;
    sort = new Sort(board);
  });

  describe("create", () => {
    it("it has a title", () => {
      expect(Sort.title).toEqual("Selection Sort");
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
  });

  describe("utils", () => {

    it("has current nodes", () => {
      board.setPoints([0, 1, 2, 3, 4]);
      sort = new Sort(board);
      expect(sort.currentNodes()).toEqual([0, 1]);
      sort.next();
      expect(sort.currentNodes()).toEqual([0, 2]);
      sort.next();
      expect(sort.currentNodes()).toEqual([0, 3]);
      sort.next();
      expect(sort.currentNodes()).toEqual([0, 4]);
      sort.next();
      expect(sort.currentNodes()).toEqual([1, 2]);
      sort.next();
      expect(sort.currentNodes()).toEqual([1, 3]);
      sort.next();
      expect(sort.currentNodes()).toEqual([1, 4]);
      sort.next();
      expect(sort.currentNodes()).toEqual([2, 3]);
      sort.next();
      expect(sort.currentNodes()).toEqual([2, 4]);
      sort.next();
      expect(sort.currentNodes()).toEqual([3, 4]);
      sort.next();
      expect(sort.currentNodes()).toEqual([]);
      sort.next();
    });

    it("it handles ordered group", () => {
      board.setPoints([0, 1, 2, 3, 4]);
      sort = new Sort(board);

      expect(sort.next()).toEqual([0, 1]);
      expect(sort.next()).toEqual([0, 2]);
      expect(sort.next()).toEqual([0, 3]);
      expect(sort.next()).toEqual([0, 4]);
      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([1, 3]);
      expect(sort.next()).toEqual([1, 4]);
      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([2, 4]);
      expect(sort.next()).toEqual([3, 4]);

      expect(sort.swaps).toEqual(0);
      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("handles a random group", () => {
      board.setPoints([0, 3, 1, 4, 2]);
      sort = new Sort(board);

      expect(sort.next()).toEqual([0, 1]);
      expect(sort.next()).toEqual([0, 2]);
      expect(sort.next()).toEqual([0, 3]);
      expect(sort.next()).toEqual([0, 4]);
      // 0 3 1 4 2
      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([2, 4]);
      // 0 1 3 4 2
      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([2, 4]);
      // 0 1 2 3 4
      expect(sort.next()).toEqual([3, 4]);

      expect(sort.swaps).toEqual(3);
      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("handles a swaping first group", () => {
      board.setPoints([1, 0, 2, 3, 4]);
      sort = new Sort(board);

      expect(sort.next()).toEqual([0, 1]);
      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([1, 3]);
      expect(sort.next()).toEqual([1, 4]);

      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([1, 3]);
      expect(sort.next()).toEqual([1, 4]);

      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([2, 4]);
      expect(sort.next()).toEqual([3, 4]);

      expect(sort.swaps).toEqual(1);
      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("handles a swaping last group", () => {
      board.setPoints([0, 1, 2, 4, 3]);
      sort = new Sort(board);

      expect(sort.next()).toEqual([0, 1]);
      expect(sort.next()).toEqual([0, 2]);
      expect(sort.next()).toEqual([0, 3]);
      expect(sort.next()).toEqual([0, 4]);
      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([1, 3]);
      expect(sort.next()).toEqual([1, 4]);
      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([2, 4]);
      expect(sort.next()).toEqual([3, 4]);

      expect(sort.swaps).toEqual(1);
      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("it does reverse group", () => {
      board.setPoints([4, 3, 2, 1, 0]);
      sort = new Sort(board);

      expect(sort.next()).toEqual([0, 1]);
      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([3, 4]);
      // 0 3 2 1 4

      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([3, 4]);
      // 0 1 2 3 4

      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([2, 4]);
      expect(sort.next()).toEqual([3, 4]);

      expect(sort.swaps).toEqual(2);
      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("it handles first and last swapped", () => {
      board.setPoints([4, 1, 2, 3, 0]);
      sort = new Sort(board);

      expect(sort.next()).toEqual([0, 1]);
      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([1, 3]);
      expect(sort.next()).toEqual([1, 4]);

      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([1, 3]);
      expect(sort.next()).toEqual([1, 4]);

      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([2, 4]);

      expect(sort.next()).toEqual([3, 4]);

      expect(sort.swaps).toEqual(1);
      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("handles partially ordered grouping", () => {
      board.setPoints([0, 3, 2, 1, 4]);
      sort = new Sort(board);

      expect(sort.next()).toEqual([0, 1]);
      expect(sort.next()).toEqual([0, 2]);
      expect(sort.next()).toEqual([0, 3]);
      expect(sort.next()).toEqual([0, 4]);

      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([3, 4]);

      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([2, 4]);

      expect(sort.next()).toEqual([3, 4]);

      expect(sort.swaps).toEqual(1);
      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(i).toEqual(board.values()[i]);
      }
    });

    it("handles duplicates", () => {
      const values = [0, 2, 3, 1, 1];
      board.setPoints(values);
      sort = new Sort(board);

      expect(sort.next()).toEqual([0, 1]);
      expect(sort.next()).toEqual([0, 2]);
      expect(sort.next()).toEqual([0, 3]);
      expect(sort.next()).toEqual([0, 4]);

      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([1, 3]);
      expect(sort.next()).toEqual([3, 4]);

      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([3, 4]);

      expect(sort.next()).toEqual([3, 4]);

      expect(sort.swaps).toEqual(2);
      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(values.slice().sort()[i]).toEqual(board.values()[i]);
      }
    });

    it("handles more duplicates", () => {
      const values = [2, 1, 1, 2, 1];
      board.setPoints(values);
      sort = new Sort(board);

      expect(sort.next()).toEqual([0, 1]);
      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([1, 3]);
      expect(sort.next()).toEqual([1, 4]);

      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([2, 4]);

      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([2, 4]);

      expect(sort.next()).toEqual([3, 4]);

      expect(sort.swaps).toEqual(3);
      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(values.slice().sort()[i]).toEqual(board.values()[i]);
      }
    });

    it("handles more duplicates", () => {
      const values = [4, 5, 4, 1, 4];
      board.setPoints(values);
      sort = new Sort(board);

      expect(sort.next()).toEqual([0, 1]);
      expect(sort.next()).toEqual([0, 2]);
      expect(sort.next()).toEqual([0, 3]);
      expect(sort.next()).toEqual([3, 4]);
      // 1 5 4 4 4

      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([2, 4]);
      // 1 4 5 4 4

      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([3, 4]);
      // 1 4 4 5 4

      expect(sort.next()).toEqual([3, 4]);

      expect(sort.swaps).toEqual(4);
      expect(sort.done).toEqual(true);
      for (let i = 0; i < board.length; i++) {
        expect(values.slice().sort()[i]).toEqual(board.values()[i]);
      }
    });
  });
});
