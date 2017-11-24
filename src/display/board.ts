import * as d3 from "d3";
import * as jquery from "jquery";
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
  public interval: any;

  constructor(
    public displayEl: HTMLElement,
    public boardHeight: number,
    public boardWidth: number,
  ) {
    this.setupReset();
  }

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
      verbosity: board.verbosity,
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

    const g = d3.select(
      `#${group.name}`,
    ).select("g");

    g.selectAll("circle").data(
      points,
    ).enter().append("circle");

    g.selectAll("circle").data(
      points,
    ).attr(
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

  public resetAll() {
    clearInterval(this.interval);
    this.interval = null;
    this.groups.forEach((group) => {
      this.resetGroup(group);
    });
  }

  public setupAuto() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      jquery(".reset").prop("disabled", false);
    } else {
      this.interval = setInterval(() => {
        let done = true;
        this.groups.forEach((group) => {
          const sort = group.sort;
          if (!sort.done) {
            group.sort.next();
            this.drawSpots(group);
            done = false;
          }
        });
        if (done) {
          setTimeout(() => {
            this.resetAll();
            this.setupAuto();
          }, this.delay * 5);
        }
      }, this.delay);
      jquery(".reset").prop("disabled", true);
    }
  }

  public setupReset() {
    this.createDelegatedEvent(
      this.displayEl, "click",
      this.reset.bind(this),
      ".reset",
    );
  }

  public resetGroup(group: ITestGroup) {
    group.sort.reset();
    this.drawSpots(group);
  }

  public reset(event: Event, target: HTMLElement) {
    const wrapper = jquery(target).closest(".wrapper")[0];
    const currentGroup = filter(this.groups, (group) => group.name === wrapper.id)[0];

    this.resetGroup(currentGroup);
  }

  public createDelegatedEvent(
    eventNode: HTMLElement, eventType: string,
    fun: (event: Event, target: HTMLElement) => void, selector: string,
  ) {
    const listener = eventNode.addEventListener(eventType, (event) => {
      const currentTarget = event.target;
      const foundClosestParent: HTMLElement = jquery(currentTarget).closest(selector)[0];
      if (foundClosestParent) {
        fun(event, foundClosestParent);
      }
    });
    return listener;
  }
}
