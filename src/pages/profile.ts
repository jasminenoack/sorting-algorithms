import * as jquery from "jquery";
import { Board } from "../board";
import { GraphDisplay } from "../display/graph";
import * as shuffles from "../shuffles";
import * as sizes from "../sizes";
import { BaseSort } from "../sorts/baseSort";
import * as sorts from "../sorts/sorts";
import * as valueTypes from "../valueTypes";
import { IShuffle } from "./../shuffles/abstract";
import { ISize } from "./../sizes";
import { IValueType } from "./../valueTypes";

export const setUpProfile = (
  location: string,
  data: { [key: string]: string },
  query: { [key: string]: string },
) => {
  // tslint:disable-next-line:no-var-requires
  const tpl = require("../../templates/profile.njk");
  const html = tpl.render({
    defaults: {
      count: "xLarge",
      shuffle: "RandomShuffle",
      sort: "Comb",
      value: "Integer",
    },
    shuffles,
    sizes,
    sorts,
    valueTypes,
  });
  return html;
};

let index = 0;

export const createSort = (display: GraphDisplay) => {
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

export const profileCallback = () => {
  // graph display
  const listDisplayElement = document.getElementById("sorts");
  const graphElement = document.getElementById("graph");
  const oldGraphs = document.getElementById("previous");

  const display = new GraphDisplay(graphElement, listDisplayElement, oldGraphs);

  // create
  const createButton = document.getElementById("create");
  jquery(createButton).click(createSort.bind(this, display));

  const runElement = document.getElementById("run");
  jquery(runElement).click(() => {
    display.setupAuto();
  });
};
