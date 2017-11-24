import { ReversedShuffle } from "../../src/shuffles";
import { fewFew } from "../../src/sizes";
import { BaseSort } from "../../src/sorts/baseSort";
import { Integer } from "../../src/valueTypes";
import { Board, Verbosity } from "./../../src/board";
import { BoardDisplay } from "./../../src/display/board";
import { Comb } from "./../../src/sorts/comb/base";
import { Heap } from "./../../src/sorts/heap/base";

describe("display board", () => {
  let board1: Board;
  let board2: Board;
  let sort1: BaseSort;
  let sort2: BaseSort;
  let displayBoard: BoardDisplay;

  beforeEach(() => {
    document.body.innerHTML = "";
    const el = document.createElement("div");
    document.body.appendChild(el);
    const size = fewFew;
    const valueType = Integer;
    const shuffle = ReversedShuffle;
    board1 = new Board(size, shuffle, valueType, Verbosity.Info);
    sort1 = new Comb(board1);
    board2 = new Board(size, shuffle, valueType, Verbosity.Info);
    sort2 = new Heap(board2);
    displayBoard = new BoardDisplay(el, 100, 200);
  });

  it("should create a board display", () => {
    expect(displayBoard).toBeTruthy();
  });

  it("should add a board to the display group", () => {
    expect(displayBoard.groups.length).toEqual(0);
    displayBoard.add({
      board: board1,
      name: "group-1",
      sort: sort1,
    });
    expect(displayBoard.groups.length).toEqual(1);
    expect(displayBoard.groups[0].sort).toEqual(sort1);
    expect(displayBoard.groups[0].board).toEqual(board1);
    displayBoard.add({
      board: board2,
      name: "group-2",
      sort: sort2,
    });
    expect(displayBoard.groups.length).toEqual(2);
    expect(displayBoard.groups[1].sort).toEqual(sort2);
    expect(displayBoard.groups[1].board).toEqual(board2);
  });

  it("should remove groups", () => {
    displayBoard.add({
      board: board1,
      name: "group-1",
      sort: sort1,
    });
    displayBoard.add({
      board: board2,
      name: "group-2",
      sort: sort2,
    });
    displayBoard.remove("group-1");
    expect(displayBoard.groups.length).toEqual(1);
    expect(displayBoard.groups[0].sort).toEqual(sort2);
    expect(displayBoard.groups[0].board).toEqual(board2);
    displayBoard.add({
      board: board1,
      name: "group-1",
      sort: sort1,
    });
    displayBoard.remove("fake-name");
    expect(displayBoard.groups.length).toEqual(2);
    displayBoard.remove("group-1");
    expect(displayBoard.groups.length).toEqual(1);
    expect(displayBoard.groups[0].sort).toEqual(sort2);
    expect(displayBoard.groups[0].board).toEqual(board2);
    displayBoard.remove("group-2");
    expect(displayBoard.groups.length).toEqual(0);
  });

  it("should add dom element for the boards", () => {
    const group1 = {
      board: board1,
      name: "group-1",
      sort: sort1,
    };
    expect(displayBoard.groups.length).toEqual(0);
    displayBoard.add(group1);
    let domElement = displayBoard.groups[0].domElement;
    expect(domElement).toBeTruthy();
    expect(domElement).toEqual(document.body.getElementsByClassName("wrapper")[0]);
    expect(document.body.getElementsByTagName("svg").length).toEqual(1);

    const group2 = {
      board: board2,
      name: "group-2",
      sort: sort2,
    };
    displayBoard.add(group2);
    domElement = displayBoard.groups[1].domElement;
    expect(domElement).toBeTruthy();
    expect(domElement).toEqual(document.body.getElementsByClassName("wrapper")[1]);
    expect(document.body.getElementsByTagName("svg").length).toEqual(2);
  });

  it("should remove dom element when a board is removed", () => {
    displayBoard.add({
      board: board1,
      name: "group-1",
      sort: sort1,
    });
    displayBoard.add({
      board: board2,
      name: "group-2",
      sort: sort2,
    });
    expect(document.body.getElementsByTagName("svg").length).toEqual(2);
    displayBoard.remove("group-2");
    expect(document.body.getElementsByTagName("svg").length).toEqual(1);
    let expectedElement = displayBoard.groups[0].domElement;
    let domElement = document.body.getElementsByClassName("wrapper")[0];
    expect(expectedElement).toEqual(domElement);

    displayBoard.add({
      board: board2,
      name: "group-2",
      sort: sort2,
    });
    expect(document.body.getElementsByTagName("svg").length).toEqual(2);
    displayBoard.remove("group-1");
    expect(document.body.getElementsByTagName("svg").length).toEqual(1);
    expectedElement = displayBoard.groups[0].domElement;
    domElement = document.body.getElementsByClassName("wrapper")[0];
    expect(expectedElement).toEqual(domElement);

    displayBoard.remove("group-2");
    expect(document.body.getElementsByTagName("svg").length).toEqual(0);
  });
});
