import * as jquery from "jquery";
import { Board } from "../board";
import { GraphDisplay } from "../display/graph";
import * as shuffles from "../shuffles";
import * as sizes from "../sizes";
import { BaseSort } from "../sorts/baseSort";
import * as sorts from "../sorts/sorts";
import * as valueTypes from "../valueTypes";
import { createBoard, sanitizeOptions } from "./utils";
import { profilePage } from "../templates/pages";

export const setUpProfile = (
  location: string,
  data: { [key: string]: string },
  query: { [key: string]: string },
) => {
  const html = profilePage({
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

export const profileCallback = () => {
  // graph display
  const listDisplayElement = document.getElementById("sorts");
  const graphElement = document.getElementById("graph");
  const oldGraphs = document.getElementById("previous");

  const display = new GraphDisplay(graphElement, listDisplayElement, oldGraphs);

  // create
  const createButton = document.getElementById("create");
  jquery(createButton).click(createBoard.bind(this, display));

  const runElement = document.getElementById("run");
  jquery(runElement).click(() => {
    display.setupAuto();
  });
};
