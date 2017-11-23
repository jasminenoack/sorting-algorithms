import { Board } from "../board";
import {
  closestParent, createBoard, createBoardList,
  createDelegatedEvent, functionRunBoardsWithoutRender, manageAutoRunCharts, reRenderBoard, step,
} from "../index";
import * as shuffles from "../shuffles";
import * as sizes from "../sizes";
import { BaseSort } from "../sorts/baseSort";
import * as sorts from "../sorts/sorts";
import * as valueTypes from "../valueTypes";
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
    shuffles,
    sizes,
    sorts,
    valueTypes,
  });
  return html;
};

export const scatterCallback = () => {
  const boardsElement = document.getElementById("boards");
  const createButton = document.getElementById("create");
  const sizeElement = document.getElementById("size");
  const orderSelect = document.getElementById("order");
  const valueTypeSelect = document.getElementById("value-type");
  const sortElement = document.getElementById("sort");
  const boxHeight = 500;
  const boxWidth = 500;
  const boardList: any[] = [];
  let autoInterval: any = null;
  const delay = 100;
  createButton.addEventListener("click", () => {
    const size: ISize = (sizes as { [key: string]: ISize })[(sizeElement as any).value];
    const value: IValueType = (valueTypes as { [key: string]: IValueType })[(valueTypeSelect as any).value];
    const order: IShuffle = (shuffles as { [key: string]: IShuffle })[(orderSelect as any).value];
    const Sort: BaseSort = (sorts as any)[(sortElement as any).value];

    // let board = new Boards.Board(size)
    const board = new Board(size, order, value);
    boardList.push({
      board,
      sort: new (Sort as any)(board),
    });
    createBoard(boardList.length - 1, Sort, boardList, boxHeight, boxWidth, boardsElement);
  });

  const stepElement = document.getElementById("step");
  const boundStep = step.bind(null, boardList, boxHeight, boxWidth, boardsElement);
  stepElement.addEventListener("click", boundStep);

  createDelegatedEvent(boardsElement, "click", (event, target) => {
    const wrapperElement = closestParent(target, ".wrapper");
    const wrappers = document.getElementsByClassName("wrapper");
    for (let i = 0; i < wrappers.length; i++) {
      if (wrappers[i] === wrapperElement) {
        boardList.splice(i, 1);
        break;
      }
    }
    wrapperElement.remove();
  }, ".remove");

  createDelegatedEvent(boardsElement, "click", (event, target) => {
    const wrapperElement = closestParent(target, ".wrapper");
    const wrappers = document.getElementsByClassName("wrapper");
    let wrapperIndex;
    for (let i = 0; i < wrappers.length; i++) {
      if (wrappers[i] === wrapperElement) {
        wrapperIndex = i;
        break;
      }
    }
    const item = boardList[wrapperIndex];
    item.sort.reset();
    reRenderBoard(wrapperIndex, item.sort.constructor, boardList, boxHeight, boxWidth, boardsElement);
  }, ".reset");

  const autoElement = document.getElementById("auto");
  autoElement.addEventListener("click", (event) => {
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
      (event.currentTarget as HTMLElement).classList.remove("active");
      boardsElement.classList.remove("auto");
    } else {
      const currentBoundStep = step.bind(null, boardList, boxHeight, boxWidth, boardsElement);
      autoInterval = setInterval(currentBoundStep, delay);
      (event.currentTarget as HTMLElement).classList.add("active");
      boardsElement.classList.add("auto");
    }
  });
};
