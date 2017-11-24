import * as d3 from "d3";
import * as jquery from "jquery";
import { filter } from "lodash";
import { BaseSort } from "../sorts/baseSort";
import { Board } from "./../board";

interface ITestGroup {
  name: string;
  board: Board;
  sort: BaseSort;
  domElement?: Node;
}

export class BoardDisplay {
  public groups: ITestGroup[];
  public delay: number = 100;
  public interval: any;

  constructor(
    public displayEl: HTMLElement,
    public boardHeight: number,
    public boardWidth: number,
  ) {
    this.groups = [];
    this.setupReset();
    this.setupRemove();
  }

  public add(group: ITestGroup) {
    const element = this.createBoardElement(group);
    group.domElement = element;
    this.displayEl.appendChild(element);
    this.drawSpots(group, false);
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

  public drawSpots(group: ITestGroup, shadow: boolean) {
    const board = group.board;
    const sort = group.sort;
    let points;
    if (!shadow) {
      points = board.points;
    } else {
      points = sort.shadow;
    }
    if (!points || !points.length) {
      return;
    }

    const valueMin = board.min();
    const valueMax = board.max();
    const heightSpread = valueMax - valueMin;
    const widthSpread = board.values().length - 1;

    const radius = this.getRadius(this.boardHeight, heightSpread, this.boardWidth, widthSpread);

    const placed = sort.placed;
    const currentNodes = sort.currentNodes();

    let g;
    if (shadow) {
      g = d3.select(
        `#${group.name}`,
      ).select("g.shadow");
    } else {
      g = d3.select(
        `#${group.name}`,
      ).select(".board");
    }

    g.selectAll(`circle`).data(points).enter().append("circle");
    g.selectAll(`circle`).data(points).exit().remove();

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
        `point ${currentNodes.indexOf(index) !== -1 && !shadow ? "active" : ""} `
        + `${placed.indexOf(index) !== -1 && !shadow ? "placed" : ""} `
        + `${shadow ? "shadow" : ""}`
      ),
    );
  }

  public resetAll() {
    this.groups.forEach((group) => {
      this.resetGroup(group);
    });
  }

  public step() {
    let done = true;
    this.groups.forEach((group) => {
      const sort = group.sort;
      if (!sort.done) {
        group.sort.next();
        this.drawSpots(group, false);
        this.drawSpots(group, true);
        done = false;
      }
    });
    return done;
  }

  public setupAuto() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      jquery(".reset").prop("disabled", false);
      jquery(".remove").prop("disabled", false);
    } else {
      this.interval = setInterval(() => {
        const done = this.step();
        if (done) {
          clearInterval(this.interval);
          this.interval = null;
          setTimeout(() => {
            this.resetAll();
            this.setupAuto();
          }, this.delay * 10);
        }
      }, this.delay);
      jquery(".reset").prop("disabled", true);
      jquery(".remove").prop("disabled", false);
    }
  }

  public setupReset() {
    jquery(this.displayEl).on("click", ".reset", this.reset.bind(this));
  }

  public setupRemove() {
    jquery(this.displayEl).on("click", ".remove", this.handleRemove.bind(this));
  }

  public handleRemove(event: Event) {
    const currentGroup = this.findGroupFromEvent(event);
    this.remove(currentGroup.name);
  }

  public findGroupFromEvent(event: Event) {
    const wrapper = jquery(event.currentTarget).closest(".wrapper")[0];
    return filter(this.groups, (group) => group.name === wrapper.id)[0];
  }

  public resetGroup(group: ITestGroup) {
    group.sort.reset();
    this.drawSpots(group);
  }

  public reset(event: Event) {
    const currentGroup = this.findGroupFromEvent(event);
    this.resetGroup(currentGroup);
  }
}
