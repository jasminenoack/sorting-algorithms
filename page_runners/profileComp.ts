import * as Sizes from '../sizes'
import * as Shuffles from '../shuffles'
import * as Index from '../index'
import * as ValueTypes from '../valueTypes';
import * as Sorts from '../sorts/sorts'
import * as Boards from '../board'
import { BaseSort } from '../sorts/baseSort';

let graphElement = document.getElementById("graph");
let oldGraphs = document.getElementById('previous')
let createButton = document.getElementById("create");
let boxHeight = 500
let boxWidth = 500
let running: boolean = null
let delay = 100
let listDisplayElement = document.getElementById('sorts')

let boardList: any[] = []

// setup size dropdown
let sizes = (Object as any).values(Sizes);
const sizeElement = document.getElementById("size")
if (sizeElement) {
  sizes.forEach((size: Sizes.Size, index: number) => {
    let optionElement = document.createElement('option')
    optionElement.value = index + ""
    optionElement.textContent = size.label
    if (optionElement.label === "25") {
      optionElement.setAttribute('selected', '1')
    }
    sizeElement.appendChild(optionElement)
  })
}

const orders = Object.values(Shuffles)
const orderSelect = document.getElementById('order')
if (orderSelect) {
  orders.forEach((shuffle, index) => {
    if (!shuffle.title) {
      return
    }
    const optionElement = document.createElement('option')
    optionElement.value = index + ''
    optionElement.textContent = shuffle.title
    if (shuffle.title === "Random") {
      optionElement.setAttribute('selected', "1")
    }
    orderSelect.appendChild(optionElement)
  })
}

// set up value types
const valueTypes = (Object as any).values(ValueTypes)
const valueTypeSelect = document.getElementById('value-type')
if (valueTypeSelect) {
  valueTypes.forEach((valueType, index) => {
    if (!valueType.title) {
      return
    }
    const optionElement = document.createElement('option')
    optionElement.value = index + ''
    optionElement.textContent = valueType.title
    if (valueType.title === "Range") {
      optionElement.setAttribute('selected', '1')
    }
    valueTypeSelect.appendChild(optionElement)
  })
}

const sorts = (Object as any).values(Sorts);
const sortElement = document.getElementById("sort")
if (sortElement) {
  sorts.forEach((sort: BaseSort, index: number) => {
    const optionElement = document.createElement("option")
    optionElement.value = index + ""
    optionElement.textContent = (sort as any).title
    if ((sort as any).title === "Comb Sort") {
      optionElement.setAttribute("selected", "1")
    }
    sortElement.appendChild(optionElement)
  })
}

// when click create
if (createButton) {
  createButton.addEventListener("click", function () {
    const size = sizes[(sizeElement as any).value]
    const value = valueTypes[(valueTypeSelect as any).value]
    const order = orders[(orderSelect as any).value]
    const Sort = sorts[(sortElement as any).value]

    // let board = new Boards.Board(size)
    const board = new Boards.Board(size, order, value)
    boardList.push({
      board,
      sort: new Sort(board, true)
    })
    Index.createBoardList(boardList, listDisplayElement)
  })
}

if (listDisplayElement) {
  Index.createDelegatedEvent(listDisplayElement, "click", function (event, target) {
    const wrapperElement = Index.closestParent(target, ".list-wrapper")
    const wrappers = document.getElementsByClassName("list-wrapper")
    for (let i = 0; i < wrappers.length; i++) {
      if (wrappers[i] === wrapperElement) {
        boardList.splice(i, 1)
        break
      }
    }
    Index.createBoardList(boardList, listDisplayElement)
  }, ".remove");
}

const runElement = document.getElementById("run");
if (runElement) {
  runElement.addEventListener("click", function (event) {
    if (!running) {
      running = true;

      const dataTypes = [];
      if ((document.getElementById("swaps") as any).checked) {
        dataTypes.push("swaps");
      }
      if ((document.getElementById("comps") as any).checked) {
        dataTypes.push("comps");
      }

      if (!(boardList.length && dataTypes.length)) {
        running = false;
        return;
      }
      Index.createBoardList(boardList, listDisplayElement, false);

      (runElement as any).disabled = true;
      (createButton as any).disabled = true;
      Index.functionRunBoardsWithoutRender(boardList, 100);
      Index.manageAutoRunCharts(boardList, 500, "graph", dataTypes, () => {
        boardList.forEach((board) => {
          board.sort.reset();
        });
        const svg = graphElement.getElementsByTagName("svg")[0];
        const first = oldGraphs.firstChild;

        const newsortList = listDisplayElement.cloneNode(true);

        if (first) {
          oldGraphs.insertBefore(svg, first);
        } else {
          oldGraphs.appendChild(svg);
        }
        oldGraphs.insertBefore(newsortList, svg);
        graphElement.innerHTML = "";

        (runElement as any).disabled = false;
        (createButton as any).disabled = false;
        running = false;
        Index.createBoardList(boardList, listDisplayElement);
      });
    }
  });
}
