import { some } from "lodash";
import { Board, Verbosity } from "./board";
import { BaseSort } from "./sorts/baseSort";

declare var d3: any;
declare var nv: any;

function renderShadow(sort: BaseSort, board: Board, boardElement: SVGElement, boxHeight: number, boxWidth: number) {
  const valueMin = board.min();
  const valueMax = board.max();
  const widthSpread = board.values().length - 1;
  const heightSpread = valueMax - valueMin;
  const radius = getRadius(boxHeight, heightSpread, boxWidth, widthSpread);
  const shadow = sort.shadow;

  if (shadow.length) {
    shadow.forEach((obj) => {
      const index = obj.index;
      const value = obj.value;
      const [xCenter, yCenter] = centers(
        heightSpread, widthSpread, boxHeight, boxWidth, value,
        index, valueMin,
      );
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", xCenter + "");
      circle.setAttribute("cy", yCenter + "");
      circle.setAttribute("r", radius + "");
      circle.setAttribute("class", "point shadow");
      boardElement.appendChild(circle);
    });
  }
}

function centers(
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

function getRadius(boxHeight: number, heightSpread: number, boxWidth: number, widthSpread: number) {
  return Math.max(Math.min(
    boxHeight / heightSpread / 2, boxWidth / widthSpread / 2,
  ), 2);
}

function getSortString(sort: BaseSort, index: number) {
  return (
    `${index}-${(sort.constructor as any).title}. <b>Order Type</b>`
    + `: ${sort.board.shuffle.title}. <b>Value Type</b>: ${sort.board.valueType.title}.`
    + ` <b>Point Count</b>: ${sort.board.size.label}.`
  );
}

export function createBoardList(boardList: any[], element: HTMLElement, showButton: boolean = true) {
  const wrapper = document.createElement("div");
  boardList.forEach((board, index) => {
    const p = document.createElement("p");
    p.classList.add("list-wrapper");
    let sortString = getSortString(board.sort, index + 1);
    if (showButton) {
      sortString += ' <span class="remove"><u>Remove</u></button>';
    }
    p.innerHTML = sortString;
    wrapper.appendChild(p);
  });
  element.innerHTML = "";
  element.appendChild(wrapper);
}

function getTextContent(sort: BaseSort) {
  return `<div>
        <span class="nowrap">Order Type: ${sort.board.shuffle.title}.</span>
        <span class="nowrap">Value Type: ${sort.board.valueType.title}.</span>
        <span class="nowrap">Point Count: ${sort.board.size.label}.</span>
        <span class="nowrap">Steps: ${sort.steps}.</span>
        <span class="nowrap">Comparisons: ${sort.comparisons}.</span>
        <span class="nowrap">Moves: ${sort.swaps}.</span>
    </div>`;
}

export function step(
  boardList: any[], boxHeight: number, boxWidth: number,
  boardsElement: HTMLElement, noStep?: boolean,
) {
  for (let i = 0; i < boardList.length; i++) {
    // update all points
    const boardData = boardList[i];
    const sort = boardData.sort;
    const board = boardData.board;
    if (!sort.done) {
      const times = Math.min(board.size.elemCount / 100, 100);
      for (let j = 0; j < board.size.elemCount / 100; j++) {
        sort.next();
      }
      reRenderBoard(i, sort.constructor, boardList, boxHeight, boxWidth, boardsElement);
    }
  }
}

function addPoint(
  board: SVGElement, xCenter: number, yCenter: number, radius: number,
  currentNodes: number[], i: number, sort: BaseSort,
) {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", xCenter + "");
  circle.setAttribute("cy", yCenter + "");
  circle.setAttribute("r", radius + "");
  circle.setAttribute("class", "point");
  circle.setAttribute("class", "point");
  if (currentNodes.indexOf(i) !== -1) {
    circle.classList.add("active");
  }
  if (sort.placed.indexOf(i) !== -1) {
    circle.classList.add("placed");
  }
  board.appendChild(circle);
}

function createWrapper(Sort: BaseSort, sort: BaseSort, board: Board) {
  const wrapperElement = document.createElement("div");
  wrapperElement.className = "wrapper";

  if (board.verbosity !== Verbosity.None) {
    const headerElement = document.createElement("h1");
    headerElement.textContent = (Sort as any).title;
    wrapperElement.appendChild(headerElement);
  }

  if (board.verbosity === Verbosity.Debug) {
    const textElement = document.createElement("span");
    textElement.innerHTML = getTextContent(sort);
    textElement.className = "step-count";
    wrapperElement.appendChild(textElement);

    const removeElement = document.createElement("button");
    removeElement.textContent = "X";
    removeElement.className = "remove";
    wrapperElement.appendChild(removeElement);

    const resetElement = document.createElement("button");
    resetElement.textContent = "Reset";
    resetElement.className = "reset";
    wrapperElement.appendChild(resetElement);
  }

  return wrapperElement;
}

function createBoardElements(boxWidth: number, boxHeight: number) {
  const boardElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  boardElement.setAttribute("viewBox", `0 0 ${boxWidth + 40} ${boxHeight + 40}`);

  const gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gElement.setAttribute("transform", `translate(${20}, ${20})`);
  gElement.setAttribute("class", "board");

  boardElement.appendChild(gElement);
  return [boardElement, gElement];
}

export function buildBoard(
  index: number, Sort: BaseSort, boardList: any[], boxHeight: number, boxWidth: number,
) {
  const board = boardList[index].board;
  const sort = boardList[index].sort;
  const values = board.values();
  const valueMin = board.min();
  const valueMax = board.max();
  const widthSpread = values.length - 1;
  const heightSpread = valueMax - valueMin;
  const radius = getRadius(boxHeight, heightSpread, boxHeight, widthSpread);

  const [boardElement, gElement] = createBoardElements(boxWidth, boxHeight);

  const currentNodes = sort.currentNodes();
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    const [xCenter, yCenter] = centers(
      heightSpread, widthSpread, boxHeight, boxWidth, value,
      i, valueMin,
    );
    addPoint(gElement, xCenter, yCenter, radius, currentNodes, i, sort);
  }
  if (!sort.done) {
    renderShadow(sort, board, gElement, boxHeight, boxWidth);
  }
  const wrapperElement = createWrapper(Sort, sort, board);
  wrapperElement.appendChild(boardElement);
  return wrapperElement;
}

export function createBoard(
  index: number, Sort: BaseSort, boardList: any[], boxHeight: number,
  boxWidth: number, boardsElement: HTMLElement,
) {
  const wrapperElement = buildBoard(index, Sort, boardList, boxHeight, boxWidth);
  boardsElement.appendChild(wrapperElement);
}

export function reRenderBoard(
  index: number, Sort: BaseSort, boardList: any[], boxHeight: number,
  boxWidth: number, boardsElement: HTMLElement,
) {
  const wrapperElement = buildBoard(index, Sort, boardList, boxHeight, boxWidth);
  boardsElement.replaceChild(wrapperElement, boardsElement.getElementsByClassName("wrapper")[index]);
}

export function closestParent(node: HTMLElement, selector: string): HTMLElement {
  if (node.matches(selector)) {
    return node;
  } else if (!node.parentElement) {
    return null;
  } else {
    return closestParent(node.parentElement, selector);
  }
}

export function createDelegatedEvent(
  eventNode: HTMLElement, eventType: string,
  fun: (event: Event, target: HTMLElement) => void, selector: string,
) {
  const listener = eventNode.addEventListener(eventType, (event) => {
    const currentTarget = event.target;
    const foundClosestParent: HTMLElement = closestParent(currentTarget as HTMLElement, selector);
    if (foundClosestParent) {
      fun(event, (event.target as HTMLElement));
    }
  });
  return listener;
}

export function functionRunBoardsWithoutRender(
  boardList: any[], delay: number,
) {
  const autoRun = () => {
    if (some(boardList, (board) => !(board.sort as any).done)) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < boardList.length; i++) {
        // update all points
        const boardData = boardList[i];
        const sort = boardData.sort;
        const board = boardData.board;
        if (!sort.done) {
          const times = Math.min(board.size.elemCount / 100, 100);
          for (let j = 0; j < board.size.elemCount / 100; j++) {
            sort.next();
          }
        }
      }
      setTimeout(autoRun, delay);
    }
  };
  setTimeout(autoRun, delay);
}

export function autoRunBoards(
  boardList: any[], boxHeight: number,
  boxWidth: number, boardsElement: HTMLElement,
  delay: number, finishDelay: number,
  check?: (a: Array<{ [key: string]: Board | BaseSort }>) => boolean,
) {
  if (!check) {
    check = (board: Array<{ [key: string]: Board | BaseSort }>) => !(board.sort as any).done;
  }

  const autoRun = () => {
    if (some(boardList, check)) {
      step(boardList, boxHeight, boxWidth, boardsElement);
      setTimeout(autoRun, delay);
    } else {
      setTimeout(() => {
        boardList.forEach((board) => board.sort.reset());
        autoRunBoards(boardList, boxHeight, boxWidth, boardsElement,
          delay, finishDelay, check);
      }, finishDelay);
    }
  };
  setTimeout(autoRun, delay);
}

function graphName(type: string, index: number, board: { [key: string]: any }) {
  return `${index + 1}-${type} ${board.sort.constructor.title}`.substring(0, 20) + "...";
}

export const manageAutoRunCharts = (
  boardList: any[], delay: number, id: string,
  names: string[] = ["swaps", "comps"], callback?: () => void,
) => {
  const strokeWidth = 3;
  let data: any[] = [];
  boardList.forEach((board, index) => {
    if (names.indexOf("swaps") !== -1) {
      data.push({
        key: graphName("swaps", index, board),
        strokeWidth,
        values: board.sort.profile.swaps,
      });
    }
    if (names.indexOf("comps") !== -1) {
      data.push({
        key: graphName("comps", index, board),
        strokeWidth,
        values: board.sort.profile.comparisons,
      });
    }
  });

  const chart: any = nv.models.lineChart();
  chart.options({
    duration: 300,
    useInteractiveGuideline: true,
  });
  chart.xAxis
    .axisLabel("Steps")
    .tickFormat(d3.format(",.0f"))
    .staggerLabels(false);
  chart.yAxis
    .axisLabel("Count")
    .tickFormat(d3.format(",.0f"));

  document.getElementById(id).innerHTML = '<svg class="graph"></svg>';

  d3.select("#" + id).select("svg")
    .datum(data)
    .call(chart);
  nv.utils.windowResize(chart.update);

  const processNext = () => {
    if (some(boardList, (board) => !(board.sort as any).done)) {
      data = [];

      boardList.forEach((board, index) => {
        if (names.indexOf("swaps") !== -1) {
          data.push({
            key: graphName("swaps", index, board),
            strokeWidth,
            values: board.sort.profile.swaps,
          });
        }
        if (names.indexOf("comps") !== -1) {
          data.push({
            key: graphName("comps", index, board),
            strokeWidth,
            values: board.sort.profile.comparisons,
          });
        }
      });

      d3.select("#" + id).select("svg")
        .datum(data)
        .call(chart);
      setTimeout(processNext, delay);
    } else {
      if (callback) {
        callback();
      }
    }
  };

  const interval = setTimeout(processNext, delay);
};
