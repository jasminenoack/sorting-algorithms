import * as d3 from "d3";
import { filter } from "lodash";
import { buildBoard } from "../index";
import { BaseSort } from "../sorts/baseSort";
import { Board } from "./../board";

interface ITestGroup {
  name: string;
  board: Board;
  sort: BaseSort;
  domElement?: Node;
}

export class BoardDisplay {
  public groups: ITestGroup[] = [];
  public delay: number = 100;
  public delayOnComplete: number = 100;

  constructor(
    public displayEl: HTMLElement,
    public boardHeight: number,
    public boardWidth: number,
  ) { }

  public add(group: ITestGroup) {
    const element = this.createBoardElement(group);
    group.domElement = element;
    this.displayEl.appendChild(element);
    this.drawSpots(group);
    this.groups.push(group);
  }

  public remove(name: string) {
    const currentGroup = filter(this.groups, (group) => group.name === name)[0];
    this.groups = filter(this.groups, (group) => group.name !== name);
    if (currentGroup) {
      this.displayEl.removeChild(currentGroup.domElement);
    }
  }

  public createBoardElement(group: ITestGroup) {
    const tpl = require("../../templates/board/board.njk");
    const board = group.board;
    const sort = group.sort;
    const numPoints = board.points.length;
    const html = tpl.render({
      board,
      height: this.boardHeight,
      name: group.name,
      shuffleTitle: board.shuffle.title,
      sort,
      title: (group.sort.constructor as any).title,
      width: this.boardWidth,
    });
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.firstChild;
  }

  public getRadius(boxHeight: number, heightSpread: number, boxWidth: number, widthSpread: number) {
    return Math.max(Math.min(
      boxHeight / heightSpread / 2, boxWidth / widthSpread / 2,
    ), 2);
  }

  public centers(
    heightSpread: number, widthSpread: number, boxHeight: number, boxWidth: number, value: number,
    index: number, valueMin: number,
  ) {
    let yCenter;
    if (heightSpread) {
      yCenter = (heightSpread - (value - valueMin)) / heightSpread * boxHeight;
    } else {
      yCenter = boxHeight / 2;
    }
    const xCenter = (index) / widthSpread * boxWidth;
    return [xCenter, yCenter];
  }

  public xCenter(index: number, widthSpread: number, width: number) {
    return (index) / widthSpread * width;
  }

  public yCenter(heightSpread: number, height: number, value: number, valueMin: number) {
    if (heightSpread) {
      return (heightSpread - (value - valueMin)) / heightSpread * height;
    } else {
      return height / 2;
    }
  }

  public drawSpots(group: ITestGroup) {
    const board = group.board;
    const sort = group.sort;
    const points = board.points;

    const valueMin = board.min();
    const valueMax = board.max();
    const heightSpread = valueMax - valueMin;
    const widthSpread = board.values().length - 1;

    const radius = this.getRadius(this.boardHeight, heightSpread, this.boardWidth, widthSpread);

    const placed = sort.placed;
    const currentNodes = sort.currentNodes();

    const boardEl = d3.select(
      `#${group.name}`,
    ).select("g").selectAll("circle").data(
      points,
    ).enter().append("circle").attr(
      "cx", (point, index) => this.xCenter(index, widthSpread, this.boardWidth),
    ).attr(
      "cy", (point) => this.yCenter(heightSpread, this.boardHeight, point.value, valueMin),
    ).attr(
      "r", radius,
    ).attr(
      "class", (point, index) => (
        `point ${currentNodes.indexOf(index) !== -1 ? "active" : ""} ${placed.indexOf(index) !== -1 ? "placed" : ""}`
      ),
    );
  }
}
