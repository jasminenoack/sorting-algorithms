import { Board } from "../src/board";
import { fewFew, xXLarge } from "../src/sizes";

xdescribe("sort test base", () => {
  let size;
  let board;
  let Sort;
  let sort;

  beforeEach(() => {
    length = 5;
    size = xXLarge;
    board = new Board(size);
    Sort = Sort;
    sort = new Sort(board);
  });

  xdescribe("create", () => {
    xit("it has a title", () => {
      expect(Sort.title).toEqual("Title");
    });

    xit("has current nodes", () => {
      expect(sort.currentNodes()).toEqual([0, 1]);
    });
  });

  xit("has a reset function", () => {
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
  });

  xdescribe("utils", () => {
    xit("it handles ordered group", () => {
      board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(sort.swaps).not.toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("handles a random group", () => {
      board.setPoints([2, 5, 0, 7, 9, 3, 1, 6, 8, 4]);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(sort.swaps).not.toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("handles a swaping first group", () => {
      board.setPoints([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(sort.swaps).not.toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("handles a swaping last group", () => {
      board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 9, 8]);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(sort.swaps).not.toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("it does reverse group", () => {
      board.setPoints([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(sort.swaps).not.toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("it handles first and last swapped", () => {
      board.setPoints([9, 1, 2, 3, 4, 5, 6, 7, 8, 0]);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(sort.swaps).not.toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("handles partially ordered grouping", () => {
      board.setPoints([1, 0, 2, 3, 4, 5, 7, 6, 8, 9]);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(sort.swaps).not.toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("handles duplicates", () => {
      const values = [0, 2, 0, 4, 1, 2, 3, 4, 1, 3];
      board.setPoints(values);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([0, 0, 1, 1, 2, 2, 3, 3, 4, 4]);
      expect(sort.swaps).not.toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("handles more duplicates", () => {
      const values = [2, 1, 1, 2, 1, 1, 2, 2, 1, 1];
      board.setPoints(values);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([1, 1, 1, 1, 1, 1, 2, 2, 2, 2]);
      expect(sort.swaps).not.toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("handles negatives", () => {
      const values = [-2, 1, -1, 2, 0, -3, 3, -4, 4, 0];
      board.setPoints(values);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([-4, -3, -2, -1, 0, 0, 1, 2, 3, 4]);
      expect(sort.swaps).not.toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });

    xit("handles different size", () => {
      board = new Board(fewFew);
      const values = [3, 0, 2, 1, 4];
      board.setPoints(values);
      sort = new Sort(board);

      expect(sort.done).toEqual(true);
      expect(board.values()).toEqual([0, 1, 2, 3, 4]);
      expect(sort.swaps).not.toEqual(0);
      expect(sort.comparisons).not.toEqual(0);
      expect(sort.steps).not.toEqual(0);
    });
  });
});
