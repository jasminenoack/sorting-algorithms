import * as jquery from "jquery";
import { Board } from "../board";
import { AbstractDisplay } from "../display/abstract";
import * as shuffles from "../shuffles";
import * as sizes from "../sizes";
import { BaseSort } from "../sorts/baseSort";
import * as sorts from "../sorts/sorts";
import * as valueTypes from "../valueTypes";
import { IShuffle } from "./../shuffles/abstract";
import { ISize } from "./../sizes";
import { IValueType } from "./../valueTypes";

let index = 0;

export const createBoard = (display: AbstractDisplay) => {
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
