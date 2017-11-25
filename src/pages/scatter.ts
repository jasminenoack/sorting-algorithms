import * as jquery from "jquery";
import { Board } from "../board";
import * as shuffles from "../shuffles";
import * as sizes from "../sizes";
import { BaseSort } from "../sorts/baseSort";
import * as sorts from "../sorts/sorts";
import * as valueTypes from "../valueTypes";
import { BoardDisplay } from "./../display/board";
import { IShuffle } from "./../shuffles/abstract";
import { ISize } from "./../sizes";
import { IValueType } from "./../valueTypes";

export const setUpScatter = (
  location: string,
  data: { [key: string]: string },
  query: { [key: string]: string },
) => {
  // tslint:disable-next-line:no-var-requires
  const tpl = require("../../templates/scatter.njk");
  const html = tpl.render({
    defaults: {
      count: "xLarge",
      shuffle: "RandomShuffle",
      sort: "Comb",
      valueType: "Integer",
    },
    shuffles,
    sizes,
    sorts,
    valueTypes,
  });
  return html;
};

let index = 1;

const createBoard = (display: BoardDisplay) => {
  // the figure out the size
  const sizeElement = document.getElementById("size");
  const size: ISize = (sizes as { [key: string]: ISize })[(sizeElement as any).value];

  // figure out the order
  const orderSelect = document.getElementById("order");
  const order: IShuffle = (shuffles as { [key: string]: IShuffle })[(orderSelect as any).value];

  // figure out the value type
  const valueTypeSelect = document.getElementById("value-type");
  const value: IValueType = (valueTypes as { [key: string]: IValueType })[(valueTypeSelect as any).value];

  // figure out the sort
  const sortElement = document.getElementById("sort");
  const Sort: BaseSort = (sorts as any)[(sortElement as any).value];

  const board = new Board(size, order, value);
  const sort = new (Sort as any)(board);

  display.add({
    board,
    name: `board-${index}`,
    sort,
  });
  index++;
};

export const scatterCallback = () => {
  // the wrapper for the boards
  const boardsElement = document.getElementById("boards");
  const display = new BoardDisplay(boardsElement, 500, 500);

  // controls
  const createButton = document.getElementById("create");

  // on create
  jquery(createButton).click(createBoard.bind(this, display));

  const autoElement = document.getElementById("auto");
  jquery(autoElement).click(() => {
    display.setupAuto();
    if (display.interval) {
      autoElement.innerText = "Stop";
    } else {
      autoElement.innerText = "Auto";
    }
  });

  const stepElement = document.getElementById("step");
  jquery(stepElement).click(display.step.bind(display));
};
