import { range } from "lodash";
import { Board } from "../board";
import * as Shuffles from "../shuffles";
import * as Sizes from "../sizes";
import * as ValueTypes from "../ValueTypes";

describe("Board", () => {
  let board;
  let size;

  describe("creates a board", () => {
    beforeEach(() => {
      size = Sizes.xLarge;
      board = new Board(size);
    });

    it("should create a new board", () => {
      expect(board).toBeTruthy();
    });

    it("board should have a size", () => {
      expect(board.size).toEqual(size);
    });

    it("board should have a length", () => {
      expect(board.length).toEqual(size.elemCount);
    });

    it("board has a points array", () => {
      expect(board.points.length).toBeTruthy();
    });

    it("points array is shuffled(slight chance shuffle may return in order)", () => {
      const values = board.values();
      const orderedArr = range(0, size.elemCount);
      expect(values).not.toEqual(orderedArr);
    });

    it("sets indexes of points", () => {
      const indexes = [];
      for (let i = 0; i < board.length; i++) {
        indexes.push(board.points[i].index);
      }
      const ordered = range(0, indexes.length);
      expect(indexes).toEqual(ordered);
    });

    it("points array is the same lenth as length property", () => {
      expect(board.points.length).toEqual(size.elemCount);
    });

    it("creates a subsequent integers board", () => {
      const points = board.values().sort((a, b) => a < b ? -1 : 1);
      const ordered = range(0, points.length);
      expect(points).toEqual(ordered);
    });

    it("create few unique board", () => {
      const secondBoard = new Board(size, Shuffles.OrderedShuffle,
        ValueTypes.FewUnique);
      expect(secondBoard.distribution()).toEqual({
        0: 4,
        1: 4,
        2: 4,
        3: 4,
        4: 4,
      });
    });

    it("creates a random numbers board", () => {
      const secondBoard = new Board(size, Shuffles.OrderedShuffle,
        ValueTypes.FewUnique);
      const values = secondBoard.values();
      expect(values).not.toEqual(range(0, secondBoard.length));
    });

    it("creates a random sort board", () => {
      const values = board.values();
      const ordered = range(0, values.length);
      expect(values).not.toEqual(ordered);
    });

    it("creates a mostly sorted board", () => {
      const secondBoard = new Board(size, Shuffles.K3Shuffle,
        ValueTypes.Integer);
      const values = secondBoard.values();
      const ordered = range(0, values.length);
      expect(values).not.toEqual(ordered);
    });

    it("creates a sorted board", () => {
      const secondBoard = new Board(size, Shuffles.OrderedShuffle,
        ValueTypes.Integer);
      const values = secondBoard.values();
      expect(values).toEqual(range(0, secondBoard.length));
    });

    it("creates a reversed board", () => {
      const secondBoard = new Board(size, Shuffles.ReversedShuffle,
        ValueTypes.Integer);
      const values = secondBoard.values();
      expect(values).toEqual(range(0, secondBoard.length).reverse());
    });

    it("creates a mostly reversed board", () => {
      const secondBoard = new Board(size,
        Shuffles.K3ReversedShuffle,
        ValueTypes.Integer);
      expect(secondBoard.values()).not.toEqual(
        range(0, secondBoard.length).reverse(),
      );
      const values = secondBoard.values();
      expect(values[0]).toBeGreaterThan(values.length - 6);
      expect(values[values.length - 1]).toBeLessThan(6);
    });
  });

  describe("utils", () => {
    beforeEach(() => {
      size = Sizes.xLarge;
      board = new Board(size);
    });

    it("can ask board for point", () => {
      expect(board.get(0)).toEqual(board.points[0]);
    });

    it("sets points to an array", () => {
      const newArr = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < board.length; i++) {
        newArr.push(20);
      }
      expect(board.values()).not.toEqual(newArr);
      board.setPoints(newArr);
      expect(board.values()).toEqual(newArr);
    });

    it("retrieves values", () => {
      const values = board.values();
      values.sort((a, b) => a < b ? -1 : 1);
      const arr = range(0, size.elemCount);
      expect(values).toEqual(arr);
    });

    it("can request board min", () => {
      expect(board.min()).toEqual(0);
      const newArr = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < board.length; i++) {
        newArr.push(20);
      }
      board.setPoints(newArr);
      expect(board.min()).toEqual(20);
    });

    it("can request board max", () => {
      expect(board.max()).toEqual(board.length - 1);
      const newArr = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < board.length; i++) {
        newArr.push(20);
      }
      board.setPoints(newArr);
      expect(board.max()).toEqual(20);
    });

    it("can swap two values", () => {
      let preFirst = board.get(0);
      let preSecond = board.get(1);
      board.swap(0, 1);
      expect(preFirst).toEqual(board.get(1));
      expect(preSecond).toEqual(board.get(0));

      preFirst = board.get(8);
      preSecond = board.get(4);
      board.swap(8, 4);
      expect(preFirst).toEqual(board.get(4));
      expect(preSecond).toEqual(board.get(8));
    });

    describe("createValues", () => {
      it("changes values on the board", () => {
        const values = board.values().sort((a, b) => a < b ? -1 : 1);
        const newArr = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < values.length; i++) {
          newArr.push(20);
        }
        board.setPoints(newArr);
        let newValues = board.values().sort((a, b) => a < b ? -1 : 1);
        expect(values).not.toEqual(newValues);
        board.createValues();
        newValues = board.values().sort((a, b) => a < b ? -1 : 1);
        expect(values).toEqual(newValues);
      });

      it("createValues a subsequent integers board", () => {
        board.createValues();
        const values = board.values().sort((a, b) => a < b ? -1 : 1);
        const test = range(0, values.length);
        expect(values).toEqual(test);
      });

      it("createValues few unique board", () => {
        board.valueType = ValueTypes.FewUnique;
        board.createValues();
        expect(board.distribution()).toEqual({
          0: 4,
          1: 4,
          2: 4,
          3: 4,
          4: 4,
        });
      });

      it("createValues a random board", () => {
        board.valueType = ValueTypes.FewUnique;
        board.createValues();
        const values = board.values();
        expect(values).not.toEqual(range(0, board.length));
      });
    });

    describe("shuffle", () => {
      it("can shuffle the board", () => {
        const values = board.values();
        board.shuffleBoard();
        const newValues = board.values();
        expect(values).not.toEqual(newValues);
      });

      it("shuffles the same board", () => {
        let values = board.values();
        board.shuffleBoard();
        let newValues = board.values();
        expect(values.sort((a, b) => a < b ? -1 : 1)).toEqual(newValues.sort((a, b) => a < b ? -1 : 1));

        values = [];
        for (let i = 0; i < newValues.length; i++) {
          values.push(i * 5);
        }
        board.setPoints(values);
        board.shuffleBoard();
        newValues = board.values();
        expect(values).not.toEqual(newValues);
        expect(values.sort((a, b) => a < b ? -1 : 1)).toEqual(newValues.sort((a, b) => a < b ? -1 : 1));
      });

      it("shuffles to a mostly sorted board", () => {
        board.shuffle = Shuffles.K3Shuffle;
        board.shuffleBoard();
        expect(board.values()).not.toEqual(range(0, board.values().length));
      });

      it("shuffles to a sorted board", () => {
        board.shuffle = Shuffles.OrderedShuffle;
        board.shuffleBoard();
        expect(board.values()).toEqual(range(0, board.values().length));
      });

      it("shuffles to a reversed board", () => {
        board.shuffle = Shuffles.ReversedShuffle;
        board.shuffleBoard();
        expect(board.values()).toEqual(range(0, board.values().length).reverse());
      });

      it("shuffles to a mostly reversed board", () => {
        board.shuffle = Shuffles.K3ReversedShuffle;
        board.shuffleBoard();
        expect(board.values()).not.toEqual(
          range(0, board.length).reverse(),
        );
      });

      it("shuffles to random", () => {
        board.shuffleBoard();
        expect(board.values()).not.toEqual(
          range(0, board.length).reverse(),
        );
        expect(board.values()).not.toEqual(
          range(0, board.length),
        );
      });
    });

    describe("board size", () => {
      it("can change size of board", () => {
        const newSize = Sizes.xLarge;
        board.setSize(newSize);
        expect(board.length).toEqual(newSize.elemCount);
        expect(board.points.length).toEqual(newSize.elemCount);
      });

      it("replaces the points array with 0s", () => {
        const newSize = Sizes.xLarge;
        board.setSize(newSize);
        const expected = [];
        for (let i = 0; i < newSize.elemCount; i++) {
          expected.push(0);
        }
        expect(board.values()).toEqual(expected);
      });
    });
  });
});
