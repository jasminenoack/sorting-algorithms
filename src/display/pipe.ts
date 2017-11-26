import * as d3 from "d3";
import { AbstractDisplay, ITestGroup } from "./abstract";

export class PipeDisplay extends AbstractDisplay {
  public wrapperClass: string = "pipe-wrapper";
  constructor(
    displayEl: HTMLElement,
  ) {
    super(displayEl);
    this.margin = 60;
    this.boardWidth = Math.min(document.body.clientWidth * 0.9 - this.margin * 4, 800);
    this.boardHeight = 100;

  }

  /**
   * @override
   */
  public getTemplate() {
    return require("../../templates/board/pipe.njk");
  }

  /**
   * @override
   */
  public draw(group: ITestGroup, shadowCall: boolean) {
    if (shadowCall) {
      return;
    }
    const board = group.board;
    const sort = group.sort;
    const count = board.length;
    const width = this.boardWidth;
    const eachWidth = width / count;
    const firstLocation = eachWidth / 2;
    const valueMin = board.min();
    const valueMax = board.max();
    const heightSpread = valueMax - valueMin;

    const firstLine = group.knownData[0];

    const pieceHeight = 5;

    const paths: string[] = [];
    group.knownData.forEach((line: number[]) => {
      let path = "";
      line.forEach((location: number, index: number) => {
        if (index === 0) {
          path += "M";
        } else {
          path += " L";
        }
        path += `${firstLocation + location * eachWidth},${index * pieceHeight * 3 + pieceHeight}`;
        path += ` L${firstLocation + location * eachWidth},${index * pieceHeight * 3 + pieceHeight * 2}`;
      });
      paths.push(path);
    });
    const points = this.getPointsInOrder(group);

    d3.select(`#${group.name}`).select("svg")
      .attr("height", pieceHeight * 3 * group.knownData[0].length + 40);
    d3.select(`#${group.name}`).select("svg").select("g").selectAll("path")
      .data(paths)
      .enter().append("path")
      .attr("stroke-width", Math.min(Math.max(eachWidth + 4, pieceHeight), pieceHeight * 3));
    d3.select(`#${group.name}`).select("svg").select("g").selectAll("path")
      .data(paths).transition(this.getTransition()).attr("d", (path) => path)
      .attr("stroke", (d, i) => d3.interpolateRainbow((points[i].value - valueMin) / heightSpread));
    window.scrollTo(0, document.body.scrollHeight);
  }

  /**
   * @override
   * @param group
   */
  public updateData(group: ITestGroup) {
    const points = this.getPointsInOrder(group);
    const knownData: number[][] = group.knownData;
    points.forEach((point, index) => {
      knownData[index].push(point.index);
    });
  }

  /**
   * @override
   */
  public resetGroup(group: ITestGroup) {
    group.knownData.forEach((line: number[], index: number) => {
      group.knownData[index] = [];
    });
    super.resetGroup(group);
  }
}
