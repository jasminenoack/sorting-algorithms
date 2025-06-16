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
import { createBoard, sanitizeOptions } from "./utils";
import { stickPage } from "../templates/pages";

const index = 0;

export const setUpStick = (
  location: string,
  data: { [key: string]: string },
  query: { [key: string]: string },
) => {
  const html = stickPage({
    defaults: {
      count: "xLarge",
      shuffle: "ReversedShuffle",
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
