import {BaseSort} from './sorts/baseSort'
import {Board} from './board'

function renderShadow(sort: BaseSort, board: Board, boardElement: SVGElement, boxHeight: number, boxWidth: number) {
    let valueMin = board.min()
    let valueMax = board.max()
    let widthSpread = board.values().length - 1
    let heightSpread = valueMax - valueMin
    let radius = getRadius(boxHeight, heightSpread, boxWidth, widthSpread)
    let shadow = sort.shadow

    if (shadow.length) {
        shadow.forEach((obj) => {
            let index = obj.index
            let value = obj.value
            let [xCenter, yCenter] = centers(
                    heightSpread, widthSpread, boxHeight, boxWidth, value,
                    index, valueMin
            )
            let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            circle.setAttribute('cx', xCenter + '')
            circle.setAttribute('cy', yCenter + '')
            circle.setAttribute('r', radius + '')
            circle.setAttribute('class', 'point shadow')
            boardElement.appendChild(circle)
        })
    }
}

function centers(heightSpread: number, widthSpread: number, boxHeight: number, boxWidth: number, value: number,
                 index: number, valueMin: number) {
    let yCenter
    if (heightSpread) {
        yCenter = (heightSpread - (value - valueMin)) / heightSpread * boxHeight
    } else {
        yCenter = boxHeight / 2
    }
    let xCenter = (index) / widthSpread * boxWidth
    return [xCenter, yCenter]
}

function getRadius(boxHeight: number, heightSpread: number, boxWidth: number, widthSpread: number) {
    return Math.max(Math.min(
        boxHeight / heightSpread / 2, boxWidth / widthSpread / 2
    ), 2)
}

function getTextContent (sort: BaseSort) {
    return `<div>
        <span class="nowrap">Order Type: ${sort.board.shuffle.title}.</span>
        <span class="nowrap">Value Type: ${sort.board.valueType.title}.</span>
        <span class="nowrap">Point Count: ${sort.board.size.label}.</span>
        <span class="nowrap">Steps: ${sort.steps}.</span>
        <span class="nowrap">Comparisons: ${sort.comparisons}.</span>
        <span class="nowrap">Moves: ${sort.swaps}.</span>
    </div>`
}

export function step (boardList: any[], boxHeight: number, boxWidth: number, boardsElement: HTMLElement, noStep?: boolean) {
    for (let i = 0; i < boardList.length; i++) {
        // update all points
        let boardData = boardList[i]
        let sort = boardData.sort
        let board = boardData.board
        if (!sort.done) {
            for (let i = 0; i < board.size.elemCount / 100; i++) {
                sort.next()
            }
            reRenderBoard(i, sort.constructor, boardList, boxHeight, boxWidth, boardsElement)
        }
    }
}

function addPoint (board: SVGElement, xCenter: number, yCenter: number, radius: number, currentNodes: number[], i: number) {
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', xCenter + '')
    circle.setAttribute('cy', yCenter + '')
    circle.setAttribute('r', radius + '')
    circle.setAttribute('class', 'point')
    circle.setAttribute('class', 'point')
    if (currentNodes.indexOf(i) !== -1) {
        circle.classList.add('active')
    }
    board.appendChild(circle)
}

function createWrapper (Sort: BaseSort, sort: BaseSort) {
    let wrapperElement = document.createElement('div')
    wrapperElement.className = 'wrapper'

    let headerElement = document.createElement('h1')
    headerElement.textContent = (Sort as any).title
    wrapperElement.appendChild(headerElement)

    let textElement = document.createElement('span')
    textElement.innerHTML = getTextContent(sort)
    textElement.className = 'step-count'
    wrapperElement.appendChild(textElement)

    let removeElement = document.createElement('button')
    removeElement.textContent = 'X'
    removeElement.className = 'remove'
    wrapperElement.appendChild(removeElement)

    let resetElement = document.createElement('button')
    resetElement.textContent = 'Reset'
    resetElement.className = 'reset'
    wrapperElement.appendChild(resetElement)

    return wrapperElement
}

function createBoardElements (boxWidth: number, boxHeight: number) {
    let boardElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    boardElement.setAttribute('viewBox', `0 0 ${boxWidth + 40} ${boxHeight + 40}`)

    let gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    gElement.setAttribute('transform', `translate(${20}, ${20})`)
    gElement.setAttribute('class', 'board')

    boardElement.appendChild(gElement)
    return [boardElement, gElement]
}

function buildBoard(index: number, Sort: BaseSort, boardList: any[], boxHeight: number, boxWidth: number, boardsElement: HTMLElement) {
    let board = boardList[index].board
    let sort = boardList[index].sort
    let values = board.values()
    let valueMin = board.min()
    let valueMax = board.max()
    let widthSpread = values.length - 1
    let heightSpread = valueMax - valueMin
    let radius = getRadius(boxHeight, heightSpread, boxHeight, widthSpread)

    const [boardElement, gElement] = createBoardElements(boxWidth, boxHeight)

    let currentNodes = sort.currentNodes()
    for (let i = 0; i < values.length; i++) {
        let value = values[i]
        let [xCenter, yCenter] = centers(
                heightSpread, widthSpread, boxHeight, boxWidth, value,
                i, valueMin
        )
        addPoint (gElement, xCenter, yCenter, radius, currentNodes, i)
    }

    renderShadow(sort, board, gElement, boxHeight, boxWidth)
    const wrapperElement = createWrapper(Sort, sort)
    wrapperElement.appendChild(boardElement)
    return wrapperElement
}

export function createBoard (index: number, Sort: BaseSort, boardList: any[], boxHeight: number, boxWidth: number, boardsElement: HTMLElement) {
    const wrapperElement = buildBoard(index, Sort, boardList, boxHeight, boxWidth, boardsElement)
    boardsElement.appendChild(wrapperElement)
}

export function reRenderBoard (index: number, Sort: BaseSort, boardList: any[], boxHeight: number, boxWidth: number, boardsElement: HTMLElement) {
    const wrapperElement = buildBoard(index, Sort, boardList, boxHeight, boxWidth, boardsElement)
    boardsElement.replaceChild(wrapperElement, boardsElement.getElementsByClassName('wrapper')[index])
}

export function createDelegatedEvent(eventNode: HTMLElement, eventType: string, fun: (event: Event, target: HTMLElement) => void, selector: string) {
    let listener = eventNode.addEventListener(eventType, function(event) {
        let currentTarget = event.target
        if ((event.target as HTMLElement).matches(selector)) {
            fun(event, (event.target as HTMLElement))
        }
    })
    return listener
}

export function closestParent(node: HTMLElement, selector: string): HTMLElement {
    if (node.matches(selector)) {
        return node
    } else if (!node.parentElement) {
        return null
    } else {
        return closestParent(node.parentElement, selector)
    }
}
