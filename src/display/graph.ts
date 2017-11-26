import * as d3 from "d3";
import * as jquery from "jquery";
import { filter, map } from "lodash";
import { IDatum } from "./../sorts/baseSort";
import { AbstractDisplay, ITestGroup } from "./abstract";

interface IGraphData {
  key: string;
  name: string;
  strokeWidth: number;
  values: IDatum[];
}

export class GraphDisplay extends AbstractDisplay {
  public groups: ITestGroup[];
  public delay: number = 250;
  public interval: any;
  public xAxisCall: any;
  public xScale: any;
  public yAxisCall: any;
  public yScale: any;
  public numberSteps: number = 5;
  public wrapperClass: string = "item";

  constructor(
    public graphEl: HTMLElement,
    public displayEl: HTMLElement,
    public historyEl: HTMLElement,
  ) {
    super(displayEl);
    this.groups = [];
  }

  /**
   * @override
   *
   * nothing to draw until we start profiling.
   * @param group
   * @param shadow
   */
  public draw(group: ITestGroup, shadow: boolean) {
    return;
  }

  /**
   * @override
   * @param group
   */
  public createElement(group: ITestGroup): HTMLElement {
    const tpl = require("../../templates/board/list.njk");
    const sort = group.sort;
    const board = group.board;
    const html = tpl.render({
      name: group.name,
      shuffleName: board.shuffle.title,
      size: board.size.label,
      sortName: (sort.constructor as any).title,
      valueType: board.valueType.title,
    });
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.firstChild as HTMLElement;
  }

  /**
   * @override
   */
  public step() {
    const done = super.step();
    const data = this.getData();
    this.updateAxis(data);
    data.forEach((dataset) => {
      const index = jquery(`#${dataset.name}`).index();
      this.drawLine(dataset, index);
      this.drawDots(dataset, index);
    });
    return done;
  }

  /**
   * @override
   */
  protected startInterval() {
    const swaps = (document.getElementById("swaps") as any).checked;
    const comps = (document.getElementById("comps") as any).checked;
    if (!this.groups.length || !(swaps || comps)) {
      return;
    }
    this.disable(true);
    this.createGraph();
    super.startInterval();
  }

  /**
   * Build the x-axis
   * @param xMax
   * @param width
   * @param height
   * @param svg
   */
  private createXAxis(xMax: number, width: number, height: number, svg: SVGElement) {
    if (!(svg as any).select(".x.axis").empty()) {
      return;
    }

    this.xAxisCall = d3.axisBottom(undefined);

    this.xScale = d3.scaleLinear()
      .domain([0, xMax])
      .range([0, width]);
    this.xAxisCall.scale(this.xScale);

    (svg as any).append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(this.xAxisCall);
  }

  /**
   * build the y-axis
   * @param yMax
   * @param height
   * @param svg
   */
  private createYAxis(yMax: number, height: number, svg: SVGElement) {
    if (!(svg as any).select(".y.axis").empty()) {
      return;
    }
    this.yAxisCall = d3.axisLeft(undefined);

    this.yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([height, 0]);
    this.yAxisCall.scale(this.yScale);

    (svg as any).append("g")
      .attr("class", "y axis")
      .call(this.yAxisCall);
  }

  /**
   * Update Axis
   * @param data
   */
  private updateAxis(data: IGraphData[]) {
    const [xMax, yMax] = this.getMinAndMax(data);
    this.xScale.domain([0, xMax]);
    this.yScale.domain([0, yMax]);
    const t = this.getTransition();
    d3.select(".x.axis").transition(t).call(this.xAxisCall);
    d3.select(".y.axis").transition(t).call(this.yAxisCall);
  }

  /**
   * Daws the line part of the graph
   * @param svg
   * @param dataset
   */
  private drawLineGraph(svg: SVGElement, dataset: IGraphData) {
    const index = jquery(`#${dataset.name}`).index();
    this.drawLine(dataset, index);
    this.drawDots(dataset, index);
  }

  /**
   * Draws the path for the graph
   * @param dataset
   * @param index
   */
  private drawLine(dataset: IGraphData, index: number) {
    d3.select("#graph").select("g").selectAll(`path.line.${dataset.key}`)
      .data(dataset.values)
      .enter().append("path")
      .attr("stroke-width", dataset.strokeWidth)
      .attr(
      "class",
      `line ${dataset.key} ${dataset.key.indexOf("swaps") !== -1 ? "swaps" : "comps"}-${index}`,
    );

    const line = d3.line()
      .x((d: any) => this.xScale(d.x)) // set the x values for the line generator
      .y((d: any) => this.yScale(d.y)) // set the y values for the line generator
      .curve(d3.curveMonotoneX);
    const t = this.getTransition();
    d3.select("#graph").select(`path.line.${dataset.key}`)
      .datum(dataset.values)
      .transition(t)
      .attr("d", line as any);
  }

  /**
   * Draws the dots for the graph
   * @param dataset
   * @param index
   */
  private drawDots(dataset: IGraphData, index: number) {
    const t = this.getTransition();
    d3.select("#graph").select("g").selectAll(`.dot.${dataset.key}`)
      .data(dataset.values)
      .enter().append("circle")
      .attr(
      "class",
      `dot ${dataset.key} ${dataset.key.indexOf("swaps") !== -1 ? "swaps" : "comps"}-${index}`,
    );
    d3.select("#graph").select("g").selectAll(`.dot.${dataset.key}`)
      .data(dataset.values)
      .transition(t)
      .attr("cx", (d) => this.xScale(d.x))
      .attr("cy", (d) => this.yScale(d.y))
      .attr("r", 5);
  }

  /**
   * Gets the maxes for the graph.
   * @param data
   */
  private getMinAndMax(data: IGraphData[]) {
    let yMax = 0;
    let xMax = 0;
    data.forEach((datum: any) => {
      const lastValue = datum.values[datum.values.length - 1];
      if (!lastValue) {
        return;
      }
      const xValue = lastValue.x;
      const yValue = lastValue.y;
      yMax = Math.max(yMax, yValue);
      xMax = Math.max(xMax, xValue);
    });
    return [xMax, yMax];
  }

  /**
   * Draw the graph
   */
  private createGraph() {
    const totalHeight = 500;
    const totalWidth = 500;
    const data = this.getData();

    const n = data[0].values.length;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = totalWidth - margin.left - margin.right;
    const height = totalHeight - margin.top - margin.bottom;
    const [xMax, yMax] = this.getMinAndMax(data);

    d3.select("#graph").selectAll("svg").data([1]).enter().append("svg");
    d3.select("#graph svg").selectAll("g").data([1]).enter().append("g");

    const wrapper: any = d3.select("#graph").select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .select("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.createXAxis(xMax, width, height, wrapper);
    this.createYAxis(yMax, height, wrapper);

    data.forEach((dataset, index) => {
      this.drawLineGraph(wrapper, dataset);
    });
  }

  /**
   * Gets the data for the graph.
   */
  private getData() {
    const swaps = (document.getElementById("swaps") as any).checked;
    const comps = (document.getElementById("comps") as any).checked;
    const strokeWidth = 3;
    const data: IGraphData[] = [];
    this.groups.forEach((group) => {
      if (swaps) {
        data.push({
          key: `swaps-${group.name}`,
          name: group.name,
          strokeWidth,
          values: group.sort.profile.swaps,
        });
      }
      if (comps) {
        data.push({
          key: `comps-${group.name}`,
          name: group.name,
          strokeWidth,
          values: group.sort.profile.comparisons,
        });
      }
    });
    return data;
  }
}
