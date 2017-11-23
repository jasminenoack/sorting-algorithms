import { Board } from "../../src/board";
import { fewFew } from "../../src/sizes";
import { BaseSort } from "../../src/sorts/baseSort";
import { ISize } from "./../../src/sizes";
import { OddEven } from "./../../src/sorts/oddEven/base";
import { OddEvenConcurrent } from "./../../src/sorts/oddEven/concurrent";

describe("Odd Even", () => {
  let length: number;
  let sort: BaseSort;
  let board: Board;
  let size: ISize;
  let Sort: any;
  describe("odd even single processor", () => {
    beforeEach(() => {
      length = 5;
      size = fewFew;
      board = new Board(size);
      Sort = OddEven;
      sort = new Sort(board);
    });

    describe("create", () => {
      it("it has a title", () => {
        expect(Sort.title).toEqual("Odd Even(Single Processor)");
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
      expect(sort.baseNodes.length).toBeTruthy();
      expect(sort.baseNode).toEqual(1);
      expect(sort.comparisonNode).toEqual(2);
      expect(sort.evenSorted).toBeFalsy();
      expect(sort.oddSorted).toBeFalsy();
      expect(sort.oddPhase).toBeTruthy();
    });

    describe("utils", () => {

      it("has current nodes(returns base nodes)", () => {
        expect(sort.currentNodes()).toEqual([1, 3]);
      });

      it("it handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a swaping first group", () => {
        board.setPoints([1, 0, 2, 3, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a swaping second group", () => {
        board.setPoints([0, 2, 1, 3, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a swaping last group", () => {
        board.setPoints([0, 1, 2, 4, 3]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("it does reverse group", () => {
        board.setPoints([4, 3, 2, 1, 0]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("it handles first and last swapped", () => {
        board.setPoints([4, 1, 2, 3, 0]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);
        // 4 1 2 0 3

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);
        // 1 4 0 2 3

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);
        // 1 0 4 2 3

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);
        // 0 1 2 4 3

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);
        // 0 1 2 3 4

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles partially ordered grouping", () => {
        board.setPoints([0, 3, 2, 1, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);
        // 0 2 3 1 4

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);
        // 0 2 1 3 4

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);
        // 0 1 2 3 4

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles duplicates", () => {
        const values = [0, 2, 3, 1, 1];
        board.setPoints(values);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);
        // 0 2 3 1 1

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);
        // 0 2 1 3 1

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);
        // 0 1 2 1 3

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);
        // 0 1 1 2 3

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });

      it("handles more duplicates", () => {
        const values = [2, 1, 1, 2, 1];
        board.setPoints(values);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);
        // 2 1 1 1 2

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);
        // 1 2 1 1 2

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);
        // 1 1 2 1 2

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);
        expect(sort.done).toEqual(false);
        // 1 1 1 2 2

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });
    });
  });

  describe("odd even concurrent", () => {
    beforeEach(() => {
      length = 5;
      size = fewFew;
      board = new Board(size);
      Sort = OddEvenConcurrent;
      sort = new Sort(board);
    });

    describe("create", () => {
      it("it has a title", () => {
        expect(Sort.title).toEqual("Odd Even(Concurrent)");
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
      expect(sort.baseNode).toEqual(1);
      expect(sort.comparisonNode).toEqual(2);
      expect(sort.evenSorted).toBeFalsy();
      expect(sort.oddSorted).toBeFalsy();
      expect(sort.oddPhase).toBeTruthy();
    });

    describe("utils", () => {

      it("has current nodes(returns base nodes)", () => {
        expect(sort.currentNodes()).toEqual([1, 3]);
      });

      it("it handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([0, 2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a swaping first group", () => {
        board.setPoints([1, 0, 2, 3, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a swaping second group", () => {
        board.setPoints([0, 2, 1, 3, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a swaping last group", () => {
        board.setPoints([0, 1, 2, 4, 3]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);

        expect(sort.done).toEqual(true);
        expect(sort.next()).toEqual([]);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("it does reverse group", () => {
        board.setPoints([4, 3, 2, 1, 0]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("it handles first and last swapped", () => {
        board.setPoints([4, 1, 2, 3, 0]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);
        // 4 1 2 0 3

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);
        // 1 4 0 2 3

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);
        // 1 0 4 2 3

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);
        // 0 1 2 4 3

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);
        // 0 1 2 3 4

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles partially ordered grouping", () => {
        board.setPoints([0, 3, 2, 1, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);
        // 0 2 3 1 4

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);
        // 0 2 1 3 4

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);
        // 0 1 2 3 4

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([1, 3]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles duplicates", () => {
        const values = [0, 2, 3, 1, 1];
        board.setPoints(values);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);
        // 0 2 3 1 1

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);
        // 0 2 1 3 1

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);
        // 0 1 2 1 3

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);
        // 0 1 1 2 3

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });

      it("handles more duplicates", () => {
        const values = [2, 1, 1, 2, 1];
        board.setPoints(values);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);
        // 2 1 1 1 2

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);
        // 1 2 1 1 2

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);
        // 1 1 2 1 2

        expect(sort.next()).toEqual([0, 2]);
        expect(sort.done).toEqual(false);
        // 1 1 1 2 2

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.done).toEqual(false);

        expect(sort.next()).toEqual([0, 2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });
    });
  });
});
