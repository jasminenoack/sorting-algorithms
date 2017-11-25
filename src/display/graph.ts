import * as d3 from "d3";
import * as jquery from "jquery";
import { filter, map } from "lodash";
import { IDatum } from "./../sorts/baseSort";
import { ITestGroup } from "./board";

interface IGraphData {
  key: string;
  name: string;
  strokeWidth: number;
  values: IDatum[];
}

export class GraphDisplay {
  public groups: ITestGroup[];
  public delay: number = 250;
  public interval: any;
  public xAxisCall: any;
  public xScale: any;
  public yAxisCall: any;
  public yScale: any;

  constructor(
    public graphEl: HTMLElement,
    public listEl: HTMLElement,
    public historyEl: HTMLElement,
  ) {
    this.groups = [];
    // this.setupReset();
    this.setupRemove();
  }

  public setupRemove() {
    jquery(this.listEl).on("click", ".remove", this.handleRemove.bind(this));
  }

  public handleRemove(event: Event) {
    const currentGroup = this.findGroupFromEvent(event);
    this.remove(currentGroup.name);
  }

  public findGroupFromEvent(event: Event) {
    const item = jquery(event.currentTarget).closest(".item")[0];
    return filter(this.groups, (group) => group.name === item.id)[0];
  }

  public add(group: ITestGroup) {
    this.groups.push(group);
    group.domElement = this.createBoardList(group);
    this.listEl.appendChild(group.domElement);
  }

  public remove(name: string) {
    const currentGroup = filter(this.groups, (group) => group.name === name)[0];
    this.listEl.removeChild(currentGroup.domElement);
    this.groups = filter(this.groups, (group) => group.name !== name);
  }

  public createBoardList(group: ITestGroup) {
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
    return div.firstChild;
  }

  public step() {
    let done = true;
    this.groups.forEach((group) => {
      const sort = group.sort;
      if (!sort.done) {
        group.sort.next();
        done = false;
      }
    });
    return done;
  }

  public createXAxis(xMax: number, width: number, height: number, svg: SVGElement) {
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

  public createYAxis(yMax: number, height: number, svg: SVGElement) {
    this.yAxisCall = d3.axisLeft(undefined);

    this.yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([height, 0]);
    this.yAxisCall.scale(this.yScale);

    (svg as any).append("g")
      .attr("class", "y axis")
      .call(this.yAxisCall);
  }

  public createLine(svg: SVGElement, dataset: IGraphData) {
    const index = jquery(`#${dataset.name}`).index();

    // 7. d3's line generator
    const line = d3.line()
      .x((d: any) => this.xScale(d.x)) // set the x values for the line generator
      .y((d: any) => this.yScale(d.y)) // set the y values for the line generator
      .curve(d3.curveMonotoneX); // apply smoothing to the line

    (svg as any).append("path")
      .datum(dataset.values)
      .attr("stroke-width", dataset.strokeWidth)
      .attr(
      "class",
      `line ${dataset.key} ${dataset.key.indexOf("swaps") !== -1 ? "swaps" : "comps"}-${index}`,
    )
      .attr("d", line);

    (svg as any).selectAll(`.dot.${dataset.key}`)
      .data(dataset.values)
      .enter().append("circle")
      .attr(
      "class",
      `dot ${dataset.key} ${dataset.key.indexOf("swaps") !== -1 ? "swaps" : "comps"}-${index}`,
    )
      .attr("cx", (d: IDatum) => this.xScale(d.x))
      .attr("cy", (d: IDatum) => this.yScale(d.y))
      .attr("r", 5);
  }

  public createGraph() {
    const totalHeight = 500;
    const totalWidth = 500;
    const data = this.getData();

    const n = data[0].values.length;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = totalWidth - margin.left - margin.right;
    const height = totalHeight - margin.top - margin.bottom;

    let yMax = 0;
    let xMax = 0;
    data.forEach((datum: any) => {
      const lastValue = datum.values[datum.values.length - 1];
      const xValue = lastValue.x;
      const yValue = lastValue.y;
      yMax = Math.max(yMax, yValue);
      xMax = Math.max(xMax, xValue);
    });
    const wrapper: any = d3.select("#graph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.createXAxis(xMax, width, height, wrapper);
    this.createYAxis(yMax, height, wrapper);

    data.forEach((dataset, index) => {
      this.createLine(wrapper, dataset);
    });
  }

  public run() {
    const done = this.checkDone();
    if (done) {
      return this.handleDone();
    }
    this.step();
    const data = this.getData();
    let yMax = 0;
    let xMax = 0;
    data.forEach((datum: any) => {
      const lastValue = datum.values[datum.values.length - 1];
      const xValue = lastValue.x;
      const yValue = lastValue.y;
      yMax = Math.max(yMax, yValue);
      xMax = Math.max(xMax, xValue);
    });

    this.xScale.domain([0, xMax]);
    this.yScale.domain([0, yMax]);
    this.updateAxis();

    data.forEach((dataset, index) => {
      this.updateLine(dataset);
      this.updateDots(dataset);
    });
  }

  public updateDots(dataset: IGraphData) {
    const index = jquery(`#${dataset.name}`).index();
    const t = d3.transition()
      .duration(this.delay);

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

  public updateLine(dataset: IGraphData) {
    const index = jquery(`#${dataset.name}`).index();
    const line = d3.line()
      .x((d: any) => this.xScale(d.x)) // set the x values for the line generator
      .y((d: any) => this.yScale(d.y)) // set the y values for the line generator
      .curve(d3.curveMonotoneX);
    const t = d3.transition()
      .duration(this.delay);
    d3.select("#graph").select(`path.line.${dataset.key}`)
      .datum(dataset.values)
      .transition(t)
      .attr("d", line as any);
  }

  public updateAxis() {
    const t = d3.transition()
      .duration(this.delay);
    d3.select(".x.axis").transition(t).call(this.xAxisCall);
    d3.select(".y.axis").transition(t).call(this.yAxisCall);
  }

  public getData() {
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

  public handleDisable(value: boolean) {
    jquery(".remove").prop("disabled", value);
    jquery("#swaps").prop("disabled", value);
    jquery("#comps").prop("disabled", value);
    jquery("#create").prop("disabled", value);
    jquery("#run").prop("disabled", value);
  }

  public checkDone() {
    let done = true;
    this.groups.forEach((group) => {
      const sort = group.sort;
      if (!sort.done) {
        done = false;
      }
    });
    return done;
  }

  public resetAll() {
    this.groups.forEach((group) => {
      const sort = group.sort;
      sort.reset();
    });
  }

  public handleDone() {
    // stop the interval
    clearInterval(this.interval);
    this.interval = null;
    this.handleDisable(false);

    // reset all
    this.resetAll();

    // move chart to previous
    jquery("#previous").prepend(jquery("#graph svg"));
    jquery("#previous").prepend(jquery("#sorts .item").clone());
  }

  public setupRun() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.handleDisable(false);
    } else {
      const swaps = (document.getElementById("swaps") as any).checked;
      const comps = (document.getElementById("comps") as any).checked;
      if (!this.groups.length || !(swaps || comps)) {
        return;
      }
      this.handleDisable(true);
      this.step();
      this.createGraph();
      this.interval = setInterval(this.run.bind(this), this.delay);
    }
  }
}
