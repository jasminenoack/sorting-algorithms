import * as d3 from "d3";
import * as jquery from "jquery";
import { filter } from "lodash";
import { Board } from "../board";
import { BaseSort } from "../sorts/baseSort";

export interface ITestGroup {
  name: string;
  board: Board;
  sort: BaseSort;
  domElement?: Node;
}

export abstract class AbstractDisplay {
  public groups: ITestGroup[];
  public delay: number = 250;
  public interval: any;
  public wrapperClass: string = "wrapper";

  constructor(
    public displayEl: HTMLElement,
  ) {
    this.groups = [];
    this.setupReset();
    this.setupRemove();
  }

  /**
   * Add a group to the element.
   * @param group
   */
  public add(group: ITestGroup) {
    const element = this.createElement(group);
    group.domElement = element;
    this.displayEl.appendChild(element);
    this.draw(group, false);
    this.groups.push(group);
  }

  /**
   * Create the element for each group.
   *
   * @param group
   */
  public createElement(group: ITestGroup): HTMLElement {
    const div = document.createElement("div");
    div.innerText = "NOT IMPLEMENTED";
    return div;
  }

  /**
   * Draw the element for a specified group
   *
   * @param group
   * @param shadow
   */
  public draw(group: ITestGroup, shadow: boolean = false) {
    // tslint:disable-next-line:no-console
    console.error("IMPLEMENT DRAW");
  }

  /**
   * Remove a group from the element.
   * @param name
   */
  public remove(name: string) {
    const currentGroup = filter(this.groups, (group) => group.name === name)[0];
    this.groups = filter(this.groups, (group) => group.name !== name);
    if (currentGroup) {
      this.displayEl.removeChild(currentGroup.domElement);
    }
  }

  /**
   * Set up reseting element.
   */
  public setupReset() {
    jquery(this.displayEl).on("click", ".reset", this.reset.bind(this));
  }

  /**
   * Find a group and call reset on it.
   * @param event
   */
  public reset(event: Event) {
    const currentGroup = this.findGroupFromEvent(event);
    this.resetGroup(currentGroup);
  }

  /**
   * Reset a specific group
   * @param group
   */
  public resetGroup(group: ITestGroup) {
    group.sort.reset();
    this.draw(group, false);
  }

  /**
   * Figure out the current group from the event
   * @param event
   */
  public findGroupFromEvent(event: Event) {
    const wrapper = jquery(event.currentTarget).closest(`.${this.wrapperClass}`)[0];
    return filter(this.groups, (group) => group.name === wrapper.id)[0];
  }

  /**
   * Set up removing element.
   */
  public setupRemove() {
    jquery(this.displayEl).on("click", ".remove", this.handleRemove.bind(this));
  }

  /**
   * Handle a click on remove.
   * @param event
   */
  public handleRemove(event: Event) {
    const currentGroup = this.findGroupFromEvent(event);
    this.remove(currentGroup.name);
  }

  /**
   * Take a step on all the boards.
   */
  public step() {
    let done = true;
    this.groups.forEach((group) => {
      const sort = group.sort;
      if (!sort.done) {
        group.sort.next();
        this.draw(group, false);
        this.draw(group, true);
        done = false;
      }
      this.replaceData(group);
    });
    return done;
  }

  /**
   * Replace the board information for every board.
   *
   * @param group
   */
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

  /**
   * Reset every group.
   */
  public resetAll() {
    this.groups.forEach((group) => {
      this.resetGroup(group);
    });
  }

  /**
   * Change disabled state.
   *
   * @param value;
   */
  public disable(value: boolean) {
    jquery(".reset").prop("disabled", value);
    jquery(".remove").prop("disabled", value);
    jquery("#swaps").prop("disabled", value);
    jquery("#comps").prop("disabled", value);
    jquery("#create").prop("disabled", value);
    jquery("#step").prop("disabled", value);
  }

  /**
   * Set up auto running.
   */
  public setupAuto() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.disable(false);
    } else {
      this.startInterval();
    }
  }

  /**
   * Get the d3 transition
   */
  public getTransition() {
    const t = d3.transition()
      .duration(this.delay);
    return t;
  }

  /**
   * Code to start the interval
   */
  protected startInterval() {
    this.interval = setInterval(() => {
      const done = this.step();
      if (done) {
        clearInterval(this.interval);
        this.interval = null;
        this.disable(false);
      }
    }, this.delay);
    this.disable(true);
  }
}
