import { Board } from "../../src/board";
import { BaseSort } from "../../src/sorts/baseSort";
import { fewFew, ISize } from "./../../src/sizes";
import { Cycle } from "./../../src/sorts/cycle/base";
import { CycleOptimized } from "./../../src/sorts/cycle/optimized";

describe("Sorts", () => {
  let length: number;
  let sort: BaseSort;
  let board: Board;
  let size: ISize;

  describe("cycle", () => {
    beforeEach(() => {
      length = 10;
      size = fewFew;
      board = new Board(size);
      sort = new Cycle(board);
    });
    describe("create", () => {
      it("it has a title", () => {
        expect(Cycle.title).toEqual("Cycle Sort");
      });

      it("has a current value", () => {
        expect(sort.currentValue).toEqual(board.values()[0]);
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
      expect(sort.currentValue).toEqual(board.values()[0]);
      expect(sort.numberLess).toEqual(0);
    });

    describe("utils", () => {
      it("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([1]);
      });

      it("it looks at all before moving anything", () => {
        const beforeValues = board.values().slice();
        const first = beforeValues[0];
        sort.next();
        sort.next();
        sort.next();
        expect(sort.swaps).toEqual(0);
        expect(sort.comparisons).toEqual(3);
        sort.next();
        if (first !== 0) {
          expect(sort.swaps).toEqual(1);
          expect(sort.comparisons).toEqual(4);
        } else {
          expect(sort.swaps).toEqual(0);
          expect(sort.comparisons).toEqual(4);
        }
        expect(board.values()[first]).toEqual(first);
        for (let i = 0; i < board.length; i++) {
          if (i !== first) {
            expect(beforeValues[i]).toEqual(board.values()[i]);
          }
        }
      });

      it("it adds a shadow element", () => {
        expect(sort.shadow.length).toEqual(1);
      });

      it("it does circle group", () => {
        board.setPoints([4, 2, 3, 0, 1]);
        sort = new Cycle(board);
        let currentValue = sort.currentValue;
        expect(currentValue).toEqual(4);
        expect(sort.baseNode).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(1);
        expect(sort.baseNode).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(2);
        expect(sort.baseNode).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(3);
        expect(sort.baseNode).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(0);
        expect(sort.baseNode).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        expect(sort.baseNode).toEqual(1);
        sort.next();
        sort.next();
        sort.next();

        expect(sort.baseNode).toEqual(2);
        sort.next();
        sort.next();

        expect(sort.baseNode).toEqual(3);
        sort.next();

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("it does reverse group", () => {
        board.setPoints([4, 3, 2, 1, 0]);
        sort = new Cycle(board);
        let currentValue = sort.currentValue;
        expect(currentValue).toEqual(4);
        expect(sort.baseNode).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(0);
        expect(sort.baseNode).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(3);
        expect(sort.baseNode).toEqual(1);
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(1);
        expect(sort.baseNode).toEqual(1);
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(2);
        expect(sort.baseNode).toEqual(2);
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        expect(sort.baseNode).toEqual(3);
        sort.next();

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("it handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4]);
        sort = new Cycle(board);
        let currentValue = sort.currentValue;
        expect(currentValue).toEqual(0);
        expect(sort.baseNode).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(1);
        expect(sort.baseNode).toEqual(1);
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(2);
        expect(sort.baseNode).toEqual(2);
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(3);
        expect(sort.baseNode).toEqual(3);
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles partially ordered grouping", () => {
        board.setPoints([0, 3, 2, 1, 4]);
        sort = new Cycle(board);
        let currentValue = sort.currentValue;
        expect(currentValue).toEqual(0);
        expect(sort.baseNode).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(3);
        expect(sort.baseNode).toEqual(1);
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(1);
        expect(sort.baseNode).toEqual(1);
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(2);
        expect(sort.baseNode).toEqual(2);
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(3);
        expect(sort.baseNode).toEqual(3);
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("only one when shadow changes", () => {
        board.setPoints([0, 3, 2, 1, 4]);
        sort = new Cycle(board);
        let currentValue = sort.currentValue;
        expect(currentValue).toEqual(0);
        expect(sort.baseNode).toEqual(0);
        expect(sort.shadow.length).toEqual(1);
        expect(sort.shadow[0].value).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(3);
        expect(sort.baseNode).toEqual(1);
        expect(sort.shadow.length).toEqual(1);
        expect(sort.shadow[0].value).toEqual(3);
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);
      });

      it("handles duplicates", () => {
        const values = [0, 2, 3, 1, 1];
        board.setPoints(values);
        sort = new Cycle(board);
        let currentValue = sort.currentValue;
        expect(currentValue).toEqual(0);
        expect(sort.baseNode).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(2);
        expect(sort.baseNode).toEqual(1);
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[3]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(1);
        expect(sort.baseNode).toEqual(1);
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(3);
        expect(sort.baseNode).toEqual(2);
        sort.next();
        sort.next();
        expect(board.values()[4]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(1);
        expect(sort.baseNode).toEqual(2);
        sort.next();
        sort.next();
        expect(board.values()[2]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(sort.baseNode).toEqual(3);
        expect(currentValue).toEqual(2);
        sort.next();

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });

      it("handles more duplicates", () => {
        const values = [2, 1, 1, 2, 1];
        board.setPoints(values);
        sort = new Cycle(board);
        let currentValue = sort.currentValue;
        expect(currentValue).toEqual(2);
        expect(sort.baseNode).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[4]).toEqual(currentValue);
        // 1 1 1 2 2

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(1);
        expect(sort.baseNode).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[0]).toEqual(currentValue);
        // 1 1 1 2 2

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(1);
        expect(sort.baseNode).toEqual(1);
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[1]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(1);
        expect(sort.baseNode).toEqual(2);
        sort.next();
        sort.next();
        expect(board.values()[2]).toEqual(currentValue);

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(2);
        expect(sort.baseNode).toEqual(3);
        sort.next();
        expect(board.values()[3]).toEqual(currentValue);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });
    });
  });

  describe("cycle optimized", () => {
    let Sort: any;

    beforeEach(() => {
      length = 5;
      size = fewFew;
      board = new Board(size);
      Sort = CycleOptimized;
      sort = new Sort(board);
    });

    describe("create", () => {
      it("it has a title", () => {
        expect(Sort.title).toEqual("Cycle Optimized");
      });
    });

    describe("utils", () => {
      it("it does reverse group", () => {
        board.setPoints([4, 3, 2, 1, 0]);
        sort = new Sort(board);

        let currentValue = sort.currentValue;
        expect(currentValue).toEqual(4);
        expect(sort.baseNode).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);
        // placed 4

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(0);
        expect(sort.baseNode).toEqual(0);
        sort.next();
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);
        //  placed 0

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(3);
        expect(sort.baseNode).toEqual(1);
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);
        // placed 3

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(1);
        expect(sort.baseNode).toEqual(1);
        sort.next();
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);
        // placed 1

        currentValue = sort.currentValue;
        expect(currentValue).toEqual(2);
        expect(sort.baseNode).toEqual(2);
        sort.next();
        sort.next();
        expect(board.values()[currentValue]).toEqual(currentValue);
        // placed 2

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });
    });
  });
});
