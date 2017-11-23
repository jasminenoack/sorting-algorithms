import { Board } from "../../src/board";
import { BaseSort } from "../../src/sorts/baseSort";
import { fewFew, ISize, xXLarge } from "./../../src/sizes";
import { Bubble } from "./../../src/sorts/bubble/base";
import { BubbleSortConcurrent } from "./../../src/sorts/bubble/concurrent";
import { BubbleSortDontRestart } from "./../../src/sorts/bubble/doNotRestart";
import { BubbleOptimized } from "./../../src/sorts/bubble/optimized";
import { BubbleShortCircuit } from "./../../src/sorts/bubble/shortCircuit";
import { BubbleSkipSorted } from "./../../src/sorts/bubble/skipSorted";

describe("Bubble Sorts", () => {
  let length: number;
  let sort: BaseSort;
  let board: Board;
  let size: ISize;

  describe("short Circuit", () => {
    beforeEach(() => {
      length = 10;
      size = xXLarge;
      board = new Board(size);
      sort = new BubbleShortCircuit(board);
    });
    describe("create", () => {
      it("has a swaps count", () => {
        expect(sort.swaps).toEqual(0);
      });

      it("has a comparisons count", () => {
        expect(sort.comparisons).toEqual(0);
      });

      it("creates a bubble sort", () => {
        expect(sort).toBeTruthy();
      });

      it("has a title", () => {
        expect(BubbleShortCircuit.title).toEqual("Bubble(Short Circuit)");
      });

      it("has a base node", () => {
        expect(sort.baseNode).toEqual(0);
      });

      it("has a comparison node", () => {
        expect(sort.comparisonNode).toEqual(1);
      });

      it("has a board", () => {
        expect(sort.board).toEqual(board);
      });

      it("knows the board length", () => {
        expect(sort.length).toEqual(length);
      });

      it("starts as unsorted", () => {
        expect(sort.done).toEqual(false);
      });

      it("starts with ordered param", () => {
        expect(sort.ordered).toEqual(true);
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
      expect(sort.maxRounds).toEqual(board.length);
      expect(sort.baseNode).toEqual(0);
      expect(sort.comparisonNode).toEqual(1);
      expect(sort.end).toEqual(board.length - 1);
    });

    describe("utils", () => {
      it("returns the current node indexes", () => {
        expect(sort.currentNodes()).toEqual([0, 1]);
        sort.baseNode = 5;
        sort.comparisonNode = 6;
        expect(sort.currentNodes()).toEqual([5, 6]);
      });

      it("knows if nodes need to be switched", () => {
        let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(sort.nodesInOrder(values)).toBeTruthy();
        expect(sort.ordered).toBeTruthy();
        values = [1, 0, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(sort.nodesInOrder(values)).toBeFalsy();
        expect(sort.ordered).toBeFalsy();
        sort.baseNode = 5;
        sort.comparisonNode = 6;
        expect(sort.nodesInOrder(values)).toBeTruthy();
        expect(sort.ordered).toBeFalsy();
      });

      it("tracks profile", () => {
        board.setPoints([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        sort.next();
        expect(sort.profile).toEqual({
          comparisons: [{ x: 1, y: 1 }],
          swaps: [{ x: 1, y: 1 }],
        });
        sort.next();
        expect(sort.profile).toEqual({
          comparisons: [{ x: 1, y: 1 }, { x: 2, y: 2 }],
          swaps: [{ x: 1, y: 1 }, { x: 2, y: 1 }],
        });
      });

      it("changes to the next nodes", () => {
        sort.ordered = false;
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
        expect(sort.currentNodes()).toEqual([8, 9]);
        sort.setUpNext();
        expect(sort.currentNodes()).toEqual([0, 1]);
      });

      it("changes to done if reseting with ordered", () => {
        const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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
        expect(sort.ordered).toBeTruthy();
        sort.setUpNext();
        expect(sort.done).toEqual(true);
        expect(sort.swaps).toEqual(0);
        expect(sort.comparisons).toEqual(9);
      });

      it("if not ordered reset changes ordered back but not done", () => {
        const values = [1, 0, 2, 3, 4, 5, 6, 7, 8, 9];
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
        expect(sort.ordered).toBeFalsy();
        sort.setUpNext();
        expect(sort.ordered).toBeTruthy();
        expect(sort.done).toEqual(false);
      });

      it("performs full step and returns list of nodes to render", () => {
        board.setPoints([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.next()).toEqual([0, 1]);
        expect(sort.ordered).toBeFalsy();
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        expect(sort.next()).toEqual([4, 5]);
        expect(sort.next()).toEqual([5, 6]);
        expect(sort.next()).toEqual([6, 7]);
        expect(sort.next()).toEqual([7, 8]);
        expect(sort.ordered).toEqual(false);
        expect(sort.done).toEqual(false);
        expect(sort.next()).toEqual([8, 9]);
        expect(sort.ordered).toEqual(true);
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
        expect(sort.ordered).toEqual(true);
        expect(sort.done).toEqual(true);
        expect(sort.comparisons).toEqual(18);
        expect(sort.swaps).toEqual(1);
      });
    });
  });

  describe("bubble non-optimized", () => {
    beforeEach(() => {
      length = 10;
      size = xXLarge;
      board = new Board(size);
      sort = new Bubble(board);
    });

    describe("create", () => {
      it("has a title", () => {
        expect(Bubble.title).toEqual("Bubble Sort");
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
      expect(sort.maxRounds).toEqual(board.length);
      expect(sort.baseNode).toEqual(0);
      expect(sort.comparisonNode).toEqual(1);
      expect(sort.end).toEqual(board.length - 1);
    });

    describe("utils", () => {
      it("changes to done if reseting with ordered", () => {
        const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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
        expect(sort.ordered).toBeTruthy();
        sort.setUpNext();
        expect(sort.done).toEqual(false);
        expect(sort.swaps).toEqual(0);
        expect(sort.comparisons).toEqual(9);
      });

    });
  });

  describe("bubble skip sorted", () => {
    beforeEach(() => {
      length = 10;
      size = xXLarge;
      board = new Board(size);
      sort = new BubbleOptimized(board);
    });

    describe("create", () => {
      it("has a title", () => {
        expect(BubbleOptimized.title).toEqual("Bubble(Short Circuit & Skip Sorted)");
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
      expect(sort.maxRounds).toEqual(board.length);
      expect(sort.end).toEqual(board.length - 1);
    });

    describe("utils", () => {
      it("skips sorted nodes", () => {
        board.setPoints([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.next()).toEqual([0, 1]);
        expect(sort.ordered).toBeFalsy();
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        expect(sort.next()).toEqual([4, 5]);
        expect(sort.next()).toEqual([5, 6]);
        expect(sort.next()).toEqual([6, 7]);
        expect(sort.next()).toEqual([7, 8]);
        expect(sort.ordered).toEqual(false);
        expect(sort.done).toEqual(false);
        expect(sort.next()).toEqual([8, 9]);
        expect(sort.ordered).toEqual(true);
        expect(sort.done).toEqual(false);
        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        expect(sort.next()).toEqual([4, 5]);
        expect(sort.next()).toEqual([5, 6]);
        expect(sort.next()).toEqual([6, 7]);
        expect(sort.next()).toEqual([7, 8]);
        expect(sort.ordered).toEqual(true);
        expect(sort.done).toEqual(true);
        expect(sort.comparisons).toEqual(17);
        expect(sort.swaps).toEqual(1);
      });

      it("short circuits", () => {
        board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        expect(sort.next()).toEqual([4, 5]);
        expect(sort.next()).toEqual([5, 6]);
        expect(sort.next()).toEqual([6, 7]);
        expect(sort.next()).toEqual([7, 8]);
        expect(sort.ordered).toEqual(true);
        expect(sort.done).toEqual(false);
        expect(sort.next()).toEqual([8, 9]);
        expect(sort.ordered).toEqual(true);
        expect(sort.done).toEqual(true);
      });
    });
  });

  describe("bubble skip sorted no short circuit", () => {
    beforeEach(() => {
      length = 10;
      size = xXLarge;
      board = new Board(size);
      sort = new BubbleSkipSorted(board);
    });

    describe("create", () => {
      it("has a title", () => {
        expect(BubbleSkipSorted.title).toEqual("Bubble(Skip Sorted)");
      });
    });

    it("has a reset function", () => {
      size = xXLarge;
      board = new Board(size);
      sort = new Bubble(board);

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
      expect(sort.maxRounds).toEqual(board.length);
      expect(sort.end).toEqual(board.length - 1);
    });

    describe("utils", () => {
      it("skips sorted nodes", () => {
        board.setPoints([1, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        expect(sort.next()).toEqual([4, 5]);
        expect(sort.next()).toEqual([5, 6]);
        expect(sort.next()).toEqual([6, 7]);
        expect(sort.next()).toEqual([7, 8]);
        expect(sort.ordered).toEqual(false);
        expect(sort.done).toEqual(false);
        expect(sort.next()).toEqual([8, 9]);
        expect(sort.ordered).toEqual(true);
        expect(sort.done).toEqual(false);
        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        expect(sort.next()).toEqual([4, 5]);
        expect(sort.next()).toEqual([5, 6]);
        expect(sort.next()).toEqual([6, 7]);
        expect(sort.next()).toEqual([7, 8]);
        expect(sort.ordered).toEqual(true);
        expect(sort.done).toEqual(false);
        expect(sort.comparisons).toEqual(17);
        expect(sort.swaps).toEqual(1);
      });

      it("skips short circuits", () => {
        board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        expect(sort.next()).toEqual([4, 5]);
        expect(sort.next()).toEqual([5, 6]);
        expect(sort.next()).toEqual([6, 7]);
        expect(sort.next()).toEqual([7, 8]);
        expect(sort.ordered).toEqual(true);
        expect(sort.done).toEqual(false);
        expect(sort.next()).toEqual([8, 9]);
        expect(sort.ordered).toEqual(true);
        expect(sort.done).toEqual(false);
        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        expect(sort.next()).toEqual([4, 5]);
        expect(sort.next()).toEqual([5, 6]);
        expect(sort.next()).toEqual([6, 7]);
        expect(sort.next()).toEqual([7, 8]);
        expect(sort.ordered).toEqual(true);
        expect(sort.done).toEqual(false);
        expect(sort.comparisons).toEqual(17);
        expect(sort.swaps).toEqual(0);
      });
    });
  });

  describe("concurrent bubble sort", () => {
    let Sort: any;
    beforeEach(() => {
      length = 5;
      size = fewFew;
      board = new Board(size);
      Sort = BubbleSortConcurrent;
      sort = new Sort(board);
    });

    describe("create", () => {
      it("has a title", () => {
        expect(Sort.title).toEqual("Bubble Sort(Concurrent 2)");
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
      expect(sort.baseNodes).toEqual([0, 2]);
      expect(sort.orderedSets).toEqual([true, false]);
    });

    describe("utils", () => {

      it("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([0, 2]);
      });

      it("handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([2, 0]);
        expect(sort.next()).toEqual([3, 1]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([2, 0]);
        expect(sort.next()).toEqual([3, 1]);
        expect(sort.next()).toEqual([0, 2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a swaping first group", () => {
        board.setPoints([1, 0, 2, 3, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([2, 0]);
        expect(sort.next()).toEqual([3, 1]);
        expect(sort.next()).toEqual([0, 2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a swaping last group", () => {
        board.setPoints([0, 1, 2, 4, 3]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([2, 0]);
        expect(sort.next()).toEqual([3, 1]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("does reverse group", () => {
        board.setPoints([4, 3, 2, 1, 0]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([2, 0]);
        expect(sort.next()).toEqual([3, 1]);
        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([0]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });
    });
  });

  describe("Bubble don't restart", () => {
    let Sort: any;
    beforeEach(() => {
      length = 5;
      size = fewFew;
      board = new Board(size);
      Sort = BubbleSortDontRestart;
      sort = new Sort(board);
    });

    describe("create", () => {
      it("has a title", () => {
        expect(Sort.title).toEqual("Bubble(Don't restart)");
      });
    });

    describe("utils", () => {
      it("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([1, 3]);
        expect(board.values()).toEqual([0, 1, 3, 4, 2]);

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        expect(board.values()).toEqual([0, 1, 3, 2, 4]);

        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([2, 4]);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });
    });
  });
});
