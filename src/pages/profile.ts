import { Board } from "../board";
import {
  closestParent, createBoardList, createDelegatedEvent,
  functionRunBoardsWithoutRender, manageAutoRunCharts,
} from "../index";
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

export const profileCallback = () => {
  const createButton = document.getElementById("create");
  const sizeElement = document.getElementById("size");
  const orderSelect = document.getElementById("order");
  const valueTypeSelect = document.getElementById("value-type");
  const sortElement = document.getElementById("sort");
  const listDisplayElement = document.getElementById("sorts");
  const boardList: any[] = [];

  if (createButton) {
    createButton.addEventListener("click", () => {
      const size: ISize = (sizes as { [key: string]: ISize })[(sizeElement as any).value];
      const value: IValueType = (valueTypes as { [key: string]: IValueType })[(valueTypeSelect as any).value];
      const order: IShuffle = (shuffles as { [key: string]: IShuffle })[(orderSelect as any).value];
      const Sort: BaseSort = (sorts as any)[(sortElement as any).value];

      // let board = new Boards.Board(size)
      const board = new Board(size, order, value);
      boardList.push({
        board,
        sort: new (Sort as any)(board, true),
      });
      createBoardList(boardList, listDisplayElement);
    });
  }

  if (listDisplayElement) {
    createDelegatedEvent(listDisplayElement, "click", (event: Event, target: HTMLElement) => {
      const wrapperElement = closestParent(target, ".list-wrapper");
      const wrappers = document.getElementsByClassName("list-wrapper");
      for (let i = 0; i < wrappers.length; i++) {
        if (wrappers[i] === wrapperElement) {
          boardList.splice(i, 1);
          break;
        }
      }
      createBoardList(boardList, listDisplayElement);
    }, ".remove");
  }

  let running: boolean = null;
  const runElement = document.getElementById("run");
  const graphElement = document.getElementById("graph");
  const oldGraphs = document.getElementById("previous");
  if (runElement) {
    runElement.addEventListener("click", (event) => {
      if (!running) {
        running = true;

        const dataTypes = [];
        if ((document.getElementById("swaps") as any).checked) {
          dataTypes.push("swaps");
        }
        if ((document.getElementById("comps") as any).checked) {
          dataTypes.push("comps");
        }

        if (!(boardList.length && dataTypes.length)) {
          running = false;
          return;
        }
        createBoardList(boardList, listDisplayElement, false);

        (runElement as any).disabled = true;
        (createButton as any).disabled = true;
        functionRunBoardsWithoutRender(boardList, 100);
        manageAutoRunCharts(boardList, 500, "graph", dataTypes, () => {
          boardList.forEach((board) => {
            board.sort.reset();
          });
          const svg = graphElement.getElementsByTagName("svg")[0];
          const first = oldGraphs.firstChild;

          const newsortList = listDisplayElement.cloneNode(true);

          if (first) {
            oldGraphs.insertBefore(svg, first);
          } else {
            oldGraphs.appendChild(svg);
          }
          oldGraphs.insertBefore(newsortList, svg);
          graphElement.innerHTML = "";

          (runElement as any).disabled = false;
          (createButton as any).disabled = false;
          running = false;
          createBoardList(boardList, listDisplayElement);
        });
      }
    });
  }
};
