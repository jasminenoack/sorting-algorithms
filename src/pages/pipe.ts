import * as jquery from "jquery";
import { Board } from "../board";
import { PipeDisplay } from "../display/pipe";
import * as shuffles from "../shuffles";
import * as sizes from "../sizes";
import * as sorts from "../sorts/sorts";
import * as valueTypes from "../valueTypes";

export const setUpPipe = (
  location: string,
  data: { [key: string]: string },
  query: { [key: string]: string },
) => {
  // tslint:disable-next-line:no-var-requires
  const tpl = require("../../templates/pipe.njk");
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

const index = 1;

export const pipeCallback = () => {
  const pipeElement = document.getElementById("pipe");
  const display = new PipeDisplay(pipeElement);

  // // controls
  // const createButton = document.getElementById("create");

  // // on create
  // jquery(createButton).click(createBoard.bind(this, display));

  // const autoElement = document.getElementById("auto");
  // jquery(autoElement).click(() => {
  //   display.setupAuto();
  //   if (display.interval) {
  //     autoElement.innerText = "Stop";
  //   } else {
  //     autoElement.innerText = "Auto";
  //   }
  // });

  // const stepElement = document.getElementById("step");
  // jquery(stepElement).click(display.step.bind(display));
};
