import * as Sizes from '../sizes'
import * as Shuffles from '../shuffles'
import * as Index from '../index'
import * as ValueTypes from '../valueTypes'
import * as Sorts from '../sorts/sorts'
import * as Boards from '../board'
import { BaseSort } from '../sorts/baseSort'

let graphElement = document.getElementById("graph")
let oldGraphs = document.getElementById('previous')
let createButton = document.getElementById("create")
let boxHeight = 500
let boxWidth = 500
let running: boolean = null
let delay = 100
let listDisplayElement = document.getElementById('sorts')

let boardList: any[] = []

// setup size dropdown
let sizes = (Object as any).values(Sizes)
let sizeElement = document.getElementById("size")
sizes.forEach((size: Sizes.Size, index: number) => {
    let optionElement = document.createElement('option')
    optionElement.value = index + ''
    optionElement.textContent = size.label
    if (optionElement.label === "25") {
        optionElement.setAttribute('selected', '1')
    }
    sizeElement.appendChild(optionElement)
})

let orders = Object.values(Shuffles)
let orderSelect = document.getElementById('order')
orders.forEach((shuffle, index) => {
    if (!shuffle.title) {
        return
    }
    let optionElement = document.createElement('option')
    optionElement.value = index + ''
    optionElement.textContent = shuffle.title
    if (shuffle.title === "Random") {
        optionElement.setAttribute('selected', '1')
    }
    orderSelect.appendChild(optionElement)
})

// set up value types
let valueTypes = ValueTypes.valueTypeList
let valueTypeSelect = document.getElementById('value-type')
valueTypes.forEach((valueType, index) => {
    let optionElement = document.createElement('option')
    optionElement.value = index + ''
    optionElement.textContent = valueType.title
    if (valueType.title === "Range") {
        optionElement.setAttribute('selected', '1')
    }
    valueTypeSelect.appendChild(optionElement)

})

let sorts = (Object as any).values(Sorts);
let sortElement = document.getElementById("sort")
sorts.forEach((sort: BaseSort, index: number) => {
    let optionElement = document.createElement('option')
    optionElement.value = index + ''
    optionElement.textContent = (sort as any).title
    if ((sort as any).title === "Comb Sort") {
        optionElement.setAttribute('selected', '1')
    }
    sortElement.appendChild(optionElement)
})

// when click create
createButton.addEventListener('click', function () {
    let size = sizes[(sizeElement as any).value]
    let value = valueTypes[(valueTypeSelect as any).value]
    let order = orders[(orderSelect as any).value]
    let Sort = sorts[(sortElement as any).value]

    // let board = new Boards.Board(size)
    let board = new Boards.Board(size, order, value)
    boardList.push({
        board: board,
        sort: new Sort(board, true)
    })
    Index.createBoardList(boardList, listDisplayElement)
})

Index.createDelegatedEvent(listDisplayElement, 'click', function (event, target) {
    let wrapperElement = Index.closestParent(target, '.list-wrapper')
    let wrappers = document.getElementsByClassName('list-wrapper')
    for (let i = 0; i < wrappers.length; i++) {
        if (wrappers[i] === wrapperElement) {
            boardList.splice(i, 1)
            break
        }
    }
    Index.createBoardList(boardList, listDisplayElement)
}, '.remove')

let runElement = document.getElementById("run")
runElement.addEventListener('click', function (event) {
    if (!running) {
        running = true;

        const dataTypes = [];
        if ((document.getElementById('swaps') as any).checked) {
            dataTypes.push('swaps')
        }
        if ((document.getElementById('comps') as any).checked) {
            dataTypes.push('comps')
        }

        if (!(boardList.length && dataTypes.length)) {
            running = false
            return
        }
        Index.createBoardList(boardList, listDisplayElement, false);

        (runElement as any).disabled = true;
        (createButton as any).disabled = true;
        Index.functionRunBoardsWithoutRender(boardList, 100)
        Index.manageAutoRunCharts(boardList, 500, 'graph', dataTypes, () => {
            boardList.forEach((board) => {
                board.sort.reset();
            });
            let svg = graphElement.getElementsByTagName('svg')[0];
            let first = oldGraphs.firstChild;

            let newsortList = listDisplayElement.cloneNode(true)

            if (first) {
                oldGraphs.insertBefore(svg, first)
            } else {
                oldGraphs.appendChild(svg)
            }
            oldGraphs.insertBefore(newsortList, svg)
            graphElement.innerHTML = "";

            (runElement as any).disabled = false;
            (createButton as any).disabled = false;
            running = false;
            Index.createBoardList(boardList, listDisplayElement);
        })
    }
})
