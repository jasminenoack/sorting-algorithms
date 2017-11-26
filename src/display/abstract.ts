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
  knownData?: any;
}

export abstract class AbstractDisplay {
  public groups: ITestGroup[];
  public delay: number = 250;
  public interval: any;
  public wrapperClass: string = "wrapper";
  public boardHeight: number;
  public boardWidth: number;
  public margin: number;
  public elementTemplate: string;

  constructor(
    public displayEl: HTMLElement,
  ) {
    this.groups = [];
    this.setupReset();
    this.setupRemove();
    this.margin = 0;
  }

  /**
   * Add a group to the element.
   * @param group
   */
  public add(group: ITestGroup) {
    const element = this.createElement(group);
    group.domElement = element;
    group.knownData = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < group.board.length; i++) {
      group.knownData.push([]);
    }
    this.updateData(group);
    this.displayEl.appendChild(element);
    this.draw(group, false);
    this.groups.push(group);
  }

  /**
   * Update data if that's something we are doing.
   */
  public updateData(group: ITestGroup) {
    return;
  }

  /**
   * Get the template for the element
   */
  public getTemplate() {
    return require("");
  }

  /**
   * Create the element for each group.
   *
   * @param group
   */
  public createElement(group: ITestGroup): HTMLElement {
    const board = group.board;
    const sort = group.sort;
    const tpl = this.getTemplate();
    const html = tpl.render({
      board,
      disabled: !!this.interval,
      height: this.boardHeight,
      margin: this.margin,
      name: group.name,
      shuffleTitle: board.shuffle.title,
      sort,
      sortName: (sort.constructor as any).title,
      title: (group.sort.constructor as any).title,
      verbosity: board.verbosity,
      width: this.boardWidth,
    });
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.firstChild as HTMLElement;
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
        this.updateData(group);
        this.draw(group, false);
        this.draw(group, true);
        done = false;
      } else {
        (group.domElement as HTMLElement).classList.add("done");
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

    if (value) {
      jquery("#auto").text("Stop");
    } else {
      jquery("#auto").text("Auto");
    }
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
   * Ensure indexes are accurate
   */
  public updateIndexes(group: ITestGroup) {
    const board = group.board;
    board.points.forEach((point, index) => {
      point.index = index;
    });
  }

  /**
   * Get points in order
   */
  public getPointsInOrder(group: ITestGroup) {
    this.updateIndexes(group);
    const board = group.board;
    // create a sorted version of the points.
    const points = board.points.slice().sort((pointA, pointB) => {
      if (pointA.value > pointB.value) {
        return 1;
      } else {
        return -1;
      }
    });
    return points;
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
