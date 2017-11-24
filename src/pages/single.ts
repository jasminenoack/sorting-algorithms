import * as jquery from "jquery";
import { Board, Verbosity } from "../board";
import { BoardDisplay } from "../display/board";
import { IShuffle, RandomShuffle } from "../shuffles";
import * as shuffles from "../shuffles";
import { _25 } from "../sizes";
import { BaseSort } from "../sorts/baseSort";
import { Comb } from "../sorts/sorts";
import * as sorts from "../sorts/sorts";
import { Integer, IValueType } from "../valueTypes";
import { ISize } from "./../sizes";

const defaults = {
  shuffle: "RandomShuffle",
  sort: "BubbleOptimized",
};

export const setUpSingle = () => {
  // tslint:disable-next-line:no-var-requires
  const tpl = require("../../templates/single.njk");
  const html = tpl.render({
    defaults,
    shuffles,
    sorts,
  });
  return html;
};

const createBoard = (size: ISize, shuffle: IShuffle, valueType: IValueType) => {
  return new Board(size, shuffle, valueType, Verbosity.Info);
};

export const singleCallback = () => {
  const boardElement = document.getElementById("single");
  const boxHeight = 600;
  const boxWidth = 600;
  const size = _25;
  const valueType = Integer;
  let shuffle: IShuffle = (shuffles as any)[defaults.shuffle];
  const name = "single-board";
  let Sort = (sorts as any)[defaults.sort];

  let board = createBoard(size, shuffle, valueType);
  let sort = new Sort(board);
  const display = new BoardDisplay(
    boardElement, boxHeight, boxWidth,
  );
  display.add({
    board,
    name,
    sort,
  });
  display.setupAuto();

  jquery("#sort").change((event) => {
    const sortName = (event.target as HTMLSelectElement).value;
    Sort = (sorts as any)[sortName];

    board = createBoard(size, shuffle, valueType);
    sort = new Sort(board);
    display.remove(name);
    display.add({
      board,
      name,
      sort,
    });
  });

  jquery("#order").change((event) => {
    const shuffleName = (event.target as HTMLSelectElement).value;
    shuffle = (shuffles as any)[shuffleName];

    board = createBoard(size, shuffle, valueType);
    sort = new Sort(board);
    display.remove(name);
    display.add({
      board,
      name,
      sort,
    });
  });
};
