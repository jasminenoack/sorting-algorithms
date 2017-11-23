import { Board } from "../../src/board";
import { BaseSort } from "../../src/sorts/baseSort";
import { ISize, xXLarge } from "./../../src/sizes";
import { Comb } from "./../../src/sorts/comb/base";

describe("comb", () => {
  let length: number;
  let sort: BaseSort;
  let board: Board;
  let size: ISize;

  beforeEach(() => {
    length = 10;
    size = xXLarge;
    board = new Board(size);
    sort = new Comb(board);
  });
  describe("create", () => {
    it("has a swaps count", () => {
      expect(sort.swaps).toEqual(0);
    });

    it("has a comparisons count", () => {
      expect(sort.comparisons).toEqual(0);
    });

    it("creates a sort", () => {
      expect(sort).toBeTruthy();
    });

    it("it has a title", () => {
      expect(Comb.title).toEqual("Comb Sort");
    });

    it("it has a base node", () => {
      expect(sort.baseNode).toEqual(0);
    });

    it("it has a comparison node", () => {
      expect(sort.comparisonNode).toEqual(Math.floor(10 / 1.3));
    });

    it("has a board", () => {
      expect(sort.board).toEqual(board);
    });

    it("it knows the board length", () => {
      expect(sort.length).toEqual(length);
    });

    it("starts as unsorted", () => {
      expect(sort.done).toEqual(false);
    });

    it("it has a gap", () => {
      expect(sort.gap).toEqual(Math.floor(10 / 1.3));
    });

    it("it has a shrink", () => {
      expect(sort.shrink).toEqual(1.3);
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
    expect(sort.comparisonNode).toEqual(sort.baseNode + sort.gap);
    expect(sort.gap).toEqual(Math.floor(sort.length / sort.shrink));
  });

  describe("utils", () => {
    it("it returns the current node indexes", () => {
      expect(sort.currentNodes()).toEqual([0, 7]);
      sort.baseNode = 5;
      sort.comparisonNode = 6;
      expect(sort.currentNodes()).toEqual([5, 6]);
    });

    it("it knows if nodes need to be switched", () => {
      let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      expect(sort.nodesInOrder(values)).toBeTruthy();
      expect(sort.ordered).toBeTruthy();
      values = [7, 1, 2, 3, 4, 5, 6, 0, 8, 9];
      expect(sort.nodesInOrder(values)).toBeFalsy();
      expect(sort.ordered).toBeFalsy();
      sort.baseNode = 5;
      sort.comparisonNode = 6;
      expect(sort.nodesInOrder(values)).toBeTruthy();
      expect(sort.ordered).toBeFalsy();
    });

    it("it changes to the next nodes", () => {
      const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      board.setPoints(values);
      expect(sort.gap).toEqual(7);
      expect(sort.currentNodes()).toEqual([0, 7]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([1, 8]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([2, 9]);
      expect(sort.done).toEqual(false);

      sort.setUpNext();
      expect(sort.gap).toEqual(5);
      expect(sort.currentNodes()).toEqual([0, 5]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([1, 6]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([2, 7]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([3, 8]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([4, 9]);
      expect(sort.done).toEqual(false);

      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([0, 3]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([1, 4]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([2, 5]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([3, 6]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([4, 7]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([5, 8]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([6, 9]);
      expect(sort.done).toEqual(false);

      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([0, 2]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([1, 3]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([2, 4]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([3, 5]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([4, 6]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([5, 7]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([6, 8]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([7, 9]);
      expect(sort.done).toEqual(false);

      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([0, 1]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([1, 2]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([2, 3]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([3, 4]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([4, 5]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([5, 6]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([6, 7]);
      sort.setUpNext();
      expect(sort.currentNodes()).toEqual([7, 8]);
      sort.setUpNext();
      expect(sort.next()).toEqual([8, 9]);
      expect(sort.next()).toEqual([]);
      expect(sort.done).toEqual(true);
    });

    it("it changes doesn't mark done if sort is needed", () => {
      const values = [0, 1, 2, 4, 3, 5, 6, 7, 8, 9];
      board.setPoints(values);
      expect(sort.next()).toEqual([0, 7]);
      expect(sort.next()).toEqual([1, 8]);
      expect(sort.next()).toEqual([2, 9]);
      expect(sort.done).toEqual(false);

      expect(sort.next()).toEqual([0, 5]);
      expect(sort.next()).toEqual([1, 6]);
      expect(sort.next()).toEqual([2, 7]);
      expect(sort.next()).toEqual([3, 8]);
      expect(sort.next()).toEqual([4, 9]);
      expect(sort.done).toEqual(false);

      expect(sort.next()).toEqual([0, 3]);
      expect(sort.next()).toEqual([1, 4]);
      expect(sort.next()).toEqual([2, 5]);
      expect(sort.next()).toEqual([3, 6]);
      expect(sort.next()).toEqual([4, 7]);
      expect(sort.next()).toEqual([5, 8]);
      expect(sort.next()).toEqual([6, 9]);
      expect(sort.done).toEqual(false);

      expect(sort.next()).toEqual([0, 2]);
      expect(sort.next()).toEqual([1, 3]);
      expect(sort.next()).toEqual([2, 4]);
      expect(sort.next()).toEqual([3, 5]);
      expect(sort.next()).toEqual([4, 6]);
      expect(sort.next()).toEqual([5, 7]);
      expect(sort.next()).toEqual([6, 8]);
      expect(sort.next()).toEqual([7, 9]);
      expect(sort.done).toEqual(false);

      expect(sort.next()).toEqual([0, 1]);
      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([3, 4]);
      expect(sort.next()).toEqual([4, 5]);
      expect(sort.next()).toEqual([5, 6]);
      expect(sort.next()).toEqual([6, 7]);
      expect(sort.next()).toEqual([7, 8]);
      expect(sort.next()).toEqual([8, 9]);
      expect(sort.done).toEqual(false);

      expect(sort.next()).toEqual([0, 1]);
    });

    it("it sets done after sorted", () => {
      const values = [0, 1, 2, 4, 3, 5, 6, 7, 8, 9];
      board.setPoints(values);
      expect(sort.next()).toEqual([0, 7]);
      expect(sort.next()).toEqual([1, 8]);
      expect(sort.next()).toEqual([2, 9]);
      expect(sort.done).toEqual(false);

      expect(sort.next()).toEqual([0, 5]);
      expect(sort.next()).toEqual([1, 6]);
      expect(sort.next()).toEqual([2, 7]);
      expect(sort.next()).toEqual([3, 8]);
      expect(sort.next()).toEqual([4, 9]);
      expect(sort.done).toEqual(false);

      expect(sort.next()).toEqual([0, 3]);
      expect(sort.next()).toEqual([1, 4]);
      expect(sort.next()).toEqual([2, 5]);
      expect(sort.next()).toEqual([3, 6]);
      expect(sort.next()).toEqual([4, 7]);
      expect(sort.next()).toEqual([5, 8]);
      expect(sort.next()).toEqual([6, 9]);
      expect(sort.done).toEqual(false);

      expect(sort.next()).toEqual([0, 2]);
      expect(sort.next()).toEqual([1, 3]);
      expect(sort.next()).toEqual([2, 4]);
      expect(sort.next()).toEqual([3, 5]);
      expect(sort.next()).toEqual([4, 6]);
      expect(sort.next()).toEqual([5, 7]);
      expect(sort.next()).toEqual([6, 8]);
      expect(sort.next()).toEqual([7, 9]);
      expect(sort.done).toEqual(false);

      expect(sort.next()).toEqual([0, 1]);
      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([3, 4]);
      expect(sort.next()).toEqual([4, 5]);
      expect(sort.next()).toEqual([5, 6]);
      expect(sort.next()).toEqual([6, 7]);
      expect(sort.next()).toEqual([7, 8]);
      expect(sort.next()).toEqual([8, 9]);
      expect(sort.done).toEqual(false);

      expect(sort.next()).toEqual([0, 1]);
      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([3, 4]);
      expect(sort.next()).toEqual([4, 5]);
      expect(sort.next()).toEqual([5, 6]);
      expect(sort.next()).toEqual([6, 7]);
      expect(sort.next()).toEqual([7, 8]);
      expect(sort.next()).toEqual([8, 9]);
      expect(sort.done).toEqual(true);

      expect(sort.next()).toEqual([]);
    });

    it("it sets done earlier fix", () => {
      const values = [0, 1, 4, 3, 2, 5, 6, 7, 8, 9];
      board.setPoints(values);
      expect(sort.next()).toEqual([0, 7]);
      expect(sort.next()).toEqual([1, 8]);
      expect(sort.next()).toEqual([2, 9]);
      expect(sort.done).toEqual(false);

      expect(sort.next()).toEqual([0, 5]);
      expect(sort.next()).toEqual([1, 6]);
      expect(sort.next()).toEqual([2, 7]);
      expect(sort.next()).toEqual([3, 8]);
      expect(sort.next()).toEqual([4, 9]);
      expect(sort.done).toEqual(false);

      expect(sort.next()).toEqual([0, 3]);
      expect(sort.next()).toEqual([1, 4]);
      expect(sort.next()).toEqual([2, 5]);
      expect(sort.next()).toEqual([3, 6]);
      expect(sort.next()).toEqual([4, 7]);
      expect(sort.next()).toEqual([5, 8]);
      expect(sort.next()).toEqual([6, 9]);
      expect(sort.done).toEqual(false);

      expect(sort.next()).toEqual([0, 2]);
      expect(sort.next()).toEqual([1, 3]);
      expect(sort.next()).toEqual([2, 4]);
      expect(sort.next()).toEqual([3, 5]);
      expect(sort.next()).toEqual([4, 6]);
      expect(sort.next()).toEqual([5, 7]);
      expect(sort.next()).toEqual([6, 8]);
      expect(sort.next()).toEqual([7, 9]);
      expect(sort.done).toEqual(false);

      expect(sort.next()).toEqual([0, 1]);
      expect(sort.next()).toEqual([1, 2]);
      expect(sort.next()).toEqual([2, 3]);
      expect(sort.next()).toEqual([3, 4]);
      expect(sort.next()).toEqual([4, 5]);
      expect(sort.next()).toEqual([5, 6]);
      expect(sort.next()).toEqual([6, 7]);
      expect(sort.next()).toEqual([7, 8]);
      expect(sort.next()).toEqual([8, 9]);
      expect(sort.done).toEqual(true);
      expect(sort.next()).toEqual([]);
    });

    it("it tracks comparisons", () => {
      const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      board.setPoints(values);
      sort.nodesInOrder(values);
      sort.setUpNext();
      sort.nodesInOrder(values);
      sort.setUpNext();
      sort.nodesInOrder(values);
      sort.setUpNext();
      sort.nodesInOrder(values);
      sort.setUpNext();
      sort.nodesInOrder(values);
      sort.setUpNext();
      sort.nodesInOrder(values);
      sort.setUpNext();
      sort.nodesInOrder(values);
      sort.setUpNext();
      sort.nodesInOrder(values);
      sort.setUpNext();
      sort.nodesInOrder(values);
      sort.setUpNext();
      expect(sort.swaps).toEqual(0);
      expect(sort.comparisons).toEqual(9);
    });
  });
});
