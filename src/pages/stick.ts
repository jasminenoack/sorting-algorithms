import * as jquery from "jquery";
import { Board } from "../board";
import { StickDisplay } from "../display/stick";
import * as shuffles from "../shuffles";
import * as sizes from "../sizes";
import { BaseSort } from "../sorts/baseSort";
import * as sorts from "../sorts/sorts";
import * as valueTypes from "../valueTypes";
import { Verbosity } from "./../board";
import { BoardDisplay } from "./../display/board";
import { IShuffle } from "./../shuffles/abstract";
import { ISize } from "./../sizes";
import { IValueType } from "./../valueTypes";

let index = 0;

export const setUpStick = (
  location: string,
  data: { [key: string]: string },
  query: { [key: string]: string },
) => {
  const tpl = require("../../templates/stick.njk");
  const html = tpl.render({
    defaults: {
      count: "xLarge",
      shuffle: "ReversedShuffle",
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

const createBoard = (display: StickDisplay) => {
  const sizeElement = document.getElementById("size");
  const size: ISize = (sizes as { [key: string]: ISize })[(sizeElement as any).value];

  const orderSelect = document.getElementById("order");
  const order: IShuffle = (shuffles as { [key: string]: IShuffle })[(orderSelect as any).value];

  const valueTypeSelect = document.getElementById("value-type");
  const value: IValueType = (valueTypes as { [key: string]: IValueType })[(valueTypeSelect as any).value];

  const sortElement = document.getElementById("sort");
  const Sort: BaseSort = (sorts as any)[(sortElement as any).value];

  const board = new Board(size, order, value, Verbosity.Debug);
  const sort = new (Sort as any)(board);

  display.add({
    board,
    name: `board-${index}`,
    sort,
  });
  index++;
};

export const stickCallback = () => {
  const element = document.getElementById("sticks");
  const display = new StickDisplay(element);

  jquery("#create").click(createBoard.bind(this, display));
  jquery("#step").click(display.step.bind(display));
  const auto = jquery("#auto");
  auto.click(() => {
    display.setupAuto();
    if (display.interval) {
      auto.text("Stop");
    } else {
      auto.text("Auto");
    }
  });
};
