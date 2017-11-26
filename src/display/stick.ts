import * as d3 from "d3";
import * as jquery from "jquery";
import { filter } from "lodash";
import { Point } from "./../point";
import { AbstractDisplay, ITestGroup } from "./abstract";

export class StickDisplay extends AbstractDisplay {
  public delay: number = 250;
  public interval: any;
  public boardWidth: number;
  public boardHeight: number = 60;
  public lineHeight: number;
  public minAngle: number = -80;
  public maxAngle: number = 80;
  public margin: number;
  public wrapperClass: string = "stick-wrapper";

  constructor(
    displayEl: HTMLElement,
  ) {
    super(displayEl);
    this.lineHeight = 60;
    this.margin = this.lineHeight + 10;
    this.boardWidth = Math.min(document.body.clientWidth * 0.9 - this.lineHeight * 4, 1000);
  }

  /**
   * @override
   */
  public getTemplate() {
    return require("../../templates/board/sticks.njk");
  }

  /**
   * @override
   *
   * @param group
   * @param shadowCall
   */
  public draw(group: ITestGroup, shadowCall: boolean) {
    if (shadowCall) {
      return;
    }
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
    boardEl.selectAll("line.known").data(points)
      .enter().append("line").attr("class", "known");

    const baseX = 0;
    const baseY = this.boardHeight;
    const topX = 0;
    const topY = this.boardHeight - this.lineHeight;
    const t = this.getTransition();

    d3.select(`#${group.name}`).select(".board").selectAll("line.known").data(points)
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
        return `known ${currentNodes.indexOf(index) !== -1 ? "active" : ""} `
          + `${placed.indexOf(index) !== -1 ? "placed" : ""}`;
      });

    const shadow = sort.shadow;
    boardEl.selectAll("line.shadow").data(shadow)
      .enter().append("line").attr("class", "shadow");
    boardEl.selectAll("line.shadow").data(shadow).exit().remove();

    boardEl.selectAll("line.shadow").data(shadow).transition(t)
      // sets the bottom location
      .attr("x1", (point: Point) => 0)
      .attr("y1", (point: Point) => baseY)
      // sets top location based on sin and cosine
      .attr("x2", (point: Point) => {
        const index = point.index;
        const angle = Math.sin(this.getAngle(point.value, heightSpread, valueMin));
        return 0 + this.lineHeight * angle;
      })
      .attr("y2", (point: Point) => {
        const index = point.index;
        const angle = Math.cos(this.getAngle(point.value, heightSpread, valueMin));
        return baseY - this.lineHeight * angle;
      });
  }

  /**
   * Get the angle for the value.
   * @param value
   * @param valueSpread
   * @param valueMin
   */
  private getAngle(value: number, valueSpread: number, valueMin: number) {
    const angleSpread = this.maxAngle - this.minAngle;

    const valueTranslated = value - valueMin;
    const percentOfValue = valueTranslated / valueSpread;
    const angle = this.minAngle + angleSpread * percentOfValue;
    return this.toRadians(angle);
  }

  /**
   * Convert Degrees to radians
   */
  private toRadians(angle: number) {
    return angle * (Math.PI / 180);
  }
}
