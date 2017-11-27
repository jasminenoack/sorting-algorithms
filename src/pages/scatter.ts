import * as jquery from "jquery";
import * as shuffles from "../shuffles";
import * as sizes from "../sizes";
import * as sorts from "../sorts/sorts";
import * as valueTypes from "../valueTypes";
import { BoardDisplay } from "./../display/board";
import { createBoard } from "./utils";

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
      sort: "Gravity",
      valueType: "Integer",
    },
    shuffles,
    sizes,
    sorts,
    valueTypes,
  });
  return html;
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
