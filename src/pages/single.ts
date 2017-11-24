import { Board, Verbosity } from "../board";
import { BoardDisplay } from "../display/board";
import { ReversedShuffle } from "../shuffles";
import { _75 } from "../sizes";
import { Comb } from "../sorts/sorts";
import { Integer } from "../valueTypes";

export const setUpSingle = () => {
  // tslint:disable-next-line:no-var-requires
  const tpl = require("../../templates/single.njk");
  const html = tpl.render({});
  return html;
};

export const singleCallback = () => {
  const boardElement = document.getElementById("single");
  const boxHeight = 400;
  const boxWidth = 400;
  const delay = 100;
  const delayOnComplete = 100;
  const size = _75;
  const valueType = Integer;
  const shuffle = ReversedShuffle;
  const board = new Board(size, shuffle, valueType, Verbosity.Info);
  const sort = new Comb(board);
  const display = new BoardDisplay(
    boardElement, boxHeight, boxWidth,
  );
  display.add({
    board,
    name: "board",
    sort,
  });
};
