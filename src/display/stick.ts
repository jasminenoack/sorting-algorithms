import * as d3 from "d3";
import * as jquery from "jquery";
import { filter } from "lodash";
import { Point } from "./../point";
import { ITestGroup } from "./board";

export class StickDisplay {
  public groups: ITestGroup[];
  public delay: number = 250;
  public interval: any;
  public boardWidth: number;
  public boardHeight: number = 60;
  public lineHeight: number = 60;
  public minAngle: number = -80;
  public maxAngle: number = 80;

  constructor(
    public domElement: HTMLElement,
  ) {
    this.groups = [];
    this.boardWidth = Math.min(document.body.clientWidth * 0.9 - this.lineHeight * 4, 1000);
    this.setupReset();
    this.setupRemove();
  }

  public add(group: ITestGroup) {
    this.groups.push(group);
    group.domElement = this.createElement(group);
    this.domElement.appendChild(group.domElement);
    this.drawBoard(group);
  }

  public createElement(group: ITestGroup) {
    const board = group.board;
    const sort = group.sort;
    const tpl = require("../../templates/board/sticks.njk");
    const html = tpl.render({
      board,
      disabled: !!this.interval,
      height: this.boardHeight,
      margin: this.lineHeight + 10,
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

  public getAngle(value: number, valueSpread: number, valueMin: number) {
    const angleSpread = this.maxAngle - this.minAngle;

    const valueTranslated = value - valueMin;
    const percentOfValue = valueTranslated / valueSpread;
    const angle = this.minAngle + angleSpread * percentOfValue;
    return this.toRadians(angle);
  }

  public drawBoard(group: ITestGroup) {
    // find the variables
    const board = group.board;
    const sort = group.sort;

    // set indexes to actually be right.
    board.points.forEach((point, index) => {
      point.index = index;
    });

    // create a sorted version of the points.
    const points = board.points.slice().sort((pointA, pointB) => {
      if (pointA.value > pointB.value) {
        return 1;
      } else {
        return -1;
      }
    });

    // data for the math
    const valueMin = board.min();
    const valueMax = board.max();
    const heightSpread = valueMax - valueMin;
    const widthSpread = points.length - 1;
    const betweenDists = this.boardWidth / widthSpread;
    const placed = sort.placed;
    const currentNodes = sort.currentNodes();

    const boardEl = d3.select(`#${group.name}`).select(".board");
    boardEl.selectAll("line").data(points)
      .enter().append("line");

    const baseX = 0;
    const baseY = this.boardHeight;
    const topX = 0;
    const topY = this.boardHeight - this.lineHeight;
    const t = this.getTransition();
    d3.select(`#${group.name}`).select(".board").selectAll("line").data(points)
      .transition(t)
      // sets the bottom location
      .attr("x1", (point: Point) => point.index * betweenDists)
      .attr("y1", (point: Point) => baseY)
      // sets top location based on sin and cosine
      .attr("x2", (point: Point) => {
        const index = point.index;
        const angle = Math.sin(this.getAngle(point.value, heightSpread, valueMin));
        return index * betweenDists + this.lineHeight * angle;
      })
      .attr("y2", (point: Point) => {
        const index = point.index;
        const angle = Math.cos(this.getAngle(point.value, heightSpread, valueMin));
        return baseY - this.lineHeight * angle;
      }).attr("class", (point) => {
        const index = point.index;
        return `${currentNodes.indexOf(index) !== -1 ? "active" : ""} `
          + `${placed.indexOf(index) !== -1 ? "placed" : ""}`;
      });
  }

  public getTransition() {
    const t = d3.transition()
      .duration(this.delay);
    return t;
  }

  public remove(name: string) {
    const currentGroup = filter(this.groups, (group) => group.name === name)[0];
    this.domElement.removeChild(currentGroup.domElement);
    this.groups = filter(this.groups, (group) => group.name !== name);
  }

  public toRadians(angle: number) {
    return angle * (Math.PI / 180);
  }

  public step() {
    let done = true;
    this.groups.forEach((group) => {
      const sort = group.sort;
      if (!sort.done) {
        group.sort.next();
        this.drawBoard(group);
        done = false;
      }
      this.replaceData(group);
    });

    if (done) {
      clearInterval(this.interval);
      this.interval = null;
      setTimeout(() => {
        this.resetAll();
        this.startAuto();
      }, this.delay * 10);
    }
    return done;
  }

  public replaceData(group: ITestGroup) {
    const tpl = require("../../templates/board/boardData.njk");
    const board = group.board;
    const sort = group.sort;
    const numPoints = board.points.length;
    const html = tpl.render({
      board,
      shuffleTitle: board.shuffle.title,
      sort,
      verbosity: board.verbosity,
    });
    jquery(group.domElement).find(".board-information").html(html);
  }

  public resetAll() {
    this.groups.forEach((group) => {
      group.sort.reset();
      this.drawBoard(group);
    });
  }

  public startAuto() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      jquery(".reset").prop("disabled", false);
      jquery(".remove").prop("disabled", false);
    } else {
      const done = this.step();
      this.interval = setInterval(this.step.bind(this), this.delay);
      jquery(".reset").prop("disabled", true);
      jquery(".remove").prop("disabled", true);
    }
  }

  public setupReset() {
    jquery(this.domElement).on("click", ".reset", this.reset.bind(this));
  }

  public resetGroup(group: ITestGroup) {
    group.sort.reset();
    this.drawBoard(group);
  }

  public reset(event: Event) {
    const currentGroup = this.findGroupFromEvent(event);
    this.resetGroup(currentGroup);
  }

  public findGroupFromEvent(event: Event) {
    const wrapper = jquery(event.currentTarget).closest(".stick-wrapper")[0];
    return filter(this.groups, (group) => group.name === wrapper.id)[0];
  }

  public setupRemove() {
    jquery(this.domElement).on("click", ".remove", this.handleRemove.bind(this));
  }

  public handleRemove(event: Event) {
    const currentGroup = this.findGroupFromEvent(event);
    this.remove(currentGroup.name);
  }
}
