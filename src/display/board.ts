import * as d3 from "d3";
import * as jquery from "jquery";
import { filter } from "lodash";
import { BaseSort } from "../sorts/baseSort";
import { Board } from "./../board";
import { AbstractDisplay, ITestGroup } from "./abstract";

export class BoardDisplay extends AbstractDisplay {
  constructor(
    public displayEl: HTMLElement,
    public boardHeight: number,
    public boardWidth: number,
  ) {
    super(displayEl);
  }

  /**
   * @override
   */
  public getTemplate() {
    return require("../../templates/board/board.njk");
  }

  /**
   * @override
   *
   * @param group
   * @param shadow
   */
  public draw(group: ITestGroup, shadow: boolean) {
    const board = group.board;
    const sort = group.sort;
    let points;
    if (!shadow) {
      points = this.getPointsInOrder(group);
    } else {
      points = sort.shadow.slice();
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

    const t = this.getTransition();
    g.selectAll("circle").data(
      points,
    ).transition(t).attr(
      "cx", (point) => {
        const index = shadow ? 0 : point.index;
        return this.xCenter(index, widthSpread, this.boardWidth);
      },
    ).attr(
      "cy", (point) => this.yCenter(heightSpread, this.boardHeight, point.value, valueMin),
    ).attr(
      "r", radius,
    ).attr(
      "class", (point) => (
        `point ${currentNodes.indexOf(point.index) !== -1 && !shadow ? "active" : ""} `
        + `${placed.indexOf(point.index) !== -1 && !shadow ? "placed" : ""} `
        + `${shadow ? "shadow" : ""}`
      ),
    );
  }

  /**
   * Get the radius for a spot.
   * @param boxHeight
   * @param heightSpread
   * @param boxWidth
   * @param widthSpread
   */
  private getRadius(boxHeight: number, heightSpread: number, boxWidth: number, widthSpread: number) {
    return Math.max(Math.min(
      boxHeight / heightSpread / 2, boxWidth / widthSpread / 2,
    ), 2);
  }

  /**
   * Get the x coordinate for the center for a spot.
   * @param index
   * @param widthSpread
   * @param width
   */
  private xCenter(index: number, widthSpread: number, width: number) {
    return (index) / widthSpread * width;
  }

  /**
   * Get the y coordinate for the center of a spot.
   * @param heightSpread
   * @param height
   * @param value
   * @param valueMin
   */
  private yCenter(heightSpread: number, height: number, value: number, valueMin: number) {
    if (heightSpread) {
      return (heightSpread - (value - valueMin)) / heightSpread * height;
    } else {
      return height / 2;
    }
  }
}
