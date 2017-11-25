import { ReversedShuffle } from "../../src/shuffles";
import { fewFew } from "../../src/sizes";
import { BaseSort } from "../../src/sorts/baseSort";
import { Integer } from "../../src/valueTypes";
import { Board, Verbosity } from "./../../src/board";
import { GraphDisplay } from "./../../src/display/graph";
import { Comb } from "./../../src/sorts/comb/base";
import { Heap } from "./../../src/sorts/heap/base";

describe("display graphd", () => {
  let board1: Board;
  let board2: Board;
  let sort1: BaseSort;
  let sort2: BaseSort;
  let displayGraph: GraphDisplay;

  beforeEach(() => {
    document.body.innerHTML = "";
    const graphEl = document.createElement("div");
    document.body.appendChild(graphEl);
    const listEl = document.createElement("div");
    document.body.appendChild(listEl);
    const historyEl = document.createElement("div");
    document.body.appendChild(historyEl);
    const size = fewFew;
    const valueType = Integer;
    const shuffle = ReversedShuffle;
    board1 = new Board(size, shuffle, valueType, Verbosity.Info);
    sort1 = new Comb(board1);
    board2 = new Board(size, shuffle, valueType, Verbosity.Info);
    sort2 = new Heap(board2);
    displayGraph = new GraphDisplay(graphEl, listEl, historyEl);
  });

  it("should create a board display", () => {
    expect(displayGraph).toBeTruthy();
  });

  it("should add a board to the display group", () => {
    expect(displayGraph.groups.length).toEqual(0);
    displayGraph.add({
      board: board1,
      name: "group-1",
      sort: sort1,
    });
    expect(displayGraph.groups.length).toEqual(1);
    expect(displayGraph.groups[0].sort).toEqual(sort1);
    expect(displayGraph.groups[0].board).toEqual(board1);
    displayGraph.add({
      board: board2,
      name: "group-2",
      sort: sort2,
    });
    expect(displayGraph.groups.length).toEqual(2);
    expect(displayGraph.groups[1].sort).toEqual(sort2);
    expect(displayGraph.groups[1].board).toEqual(board2);
  });

  it("should remove groups", () => {
    displayGraph.add({
      board: board1,
      name: "group-1",
      sort: sort1,
    });
    displayGraph.add({
      board: board2,
      name: "group-2",
      sort: sort2,
    });
    displayGraph.remove("group-1");
    expect(displayGraph.groups.length).toEqual(1);
    expect(displayGraph.groups[0].sort).toEqual(sort2);
    expect(displayGraph.groups[0].board).toEqual(board2);
    displayGraph.add({
      board: board1,
      name: "group-1",
      sort: sort1,
    });
    displayGraph.remove("fake-name");
    expect(displayGraph.groups.length).toEqual(2);
    displayGraph.remove("group-1");
    expect(displayGraph.groups.length).toEqual(1);
    expect(displayGraph.groups[0].sort).toEqual(sort2);
    expect(displayGraph.groups[0].board).toEqual(board2);
    displayGraph.remove("group-2");
    expect(displayGraph.groups.length).toEqual(0);
  });
});
