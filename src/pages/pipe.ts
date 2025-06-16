import * as jquery from "jquery";
import { Board } from "../board";
import { PipeDisplay } from "../display/pipe";
import * as shuffles from "../shuffles";
import * as sizes from "../sizes";
import * as sorts from "../sorts/sorts";
import * as valueTypes from "../valueTypes";
import { createBoard, sanitizeOptions } from "./utils";
import { pipePage } from "../templates/pages";

export const setUpPipe = (
  location: string,
  data: { [key: string]: string },
  query: { [key: string]: string },
) => {
  const html = pipePage({
    defaults: {
      count: "xLarge",
      shuffle: "RandomShuffle",
      sort: "Comb",
      valueType: "Integer",
    },
    shuffles: sanitizeOptions(shuffles, ["title"]),
    sizes: sanitizeOptions(sizes, ["label"]),
    sorts: sanitizeOptions(sorts, ["title"]),
    valueTypes: sanitizeOptions(valueTypes, ["title"]),
  });
  return html;
};

const index = 1;

export const pipeCallback = () => {
  const pipeElement = document.getElementById("pipe");
  const display = new PipeDisplay(pipeElement);

  const autoElement = document.getElementById("auto");
  jquery(autoElement).click(() => {
    display.setupAuto();
    if (display.interval) {
      autoElement.innerText = "Stop";
    } else {
      autoElement.innerText = "Auto";
    }
  });

  const createButton = document.getElementById("create");
  jquery(createButton).click(createBoard.bind(this, display));

  const stepElement = document.getElementById("step");
  jquery(stepElement).click(display.step.bind(display));
};
