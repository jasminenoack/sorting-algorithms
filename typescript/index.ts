import {BaseSort} from './sorts/baseSort'
import {Board, Verbosity} from './board'

declare var d3: any;
declare var nv: any;

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
            let times = Math.min(board.size.elemCount / 100, 100)
            for (let i = 0; i < board.size.elemCount / 100; i++) {
                sort.next()
            }
            reRenderBoard(i, sort.constructor, boardList, boxHeight, boxWidth, boardsElement)
        }
    }
}

function addPoint (board: SVGElement, xCenter: number, yCenter: number, radius: number, currentNodes: number[], i: number, sort: BaseSort) {
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', xCenter + '')
    circle.setAttribute('cy', yCenter + '')
    circle.setAttribute('r', radius + '')
    circle.setAttribute('class', 'point')
    circle.setAttribute('class', 'point')
    if (currentNodes.indexOf(i) !== -1) {
        circle.classList.add('active')
    }
    if (sort.placed.indexOf(i) !== -1) {
        circle.classList.add('placed')
    }
    board.appendChild(circle)
}

function createWrapper (Sort: BaseSort, sort: BaseSort, board: Board) {
    let wrapperElement = document.createElement('div')
    wrapperElement.className = 'wrapper'

    if (board.verbosity !== Verbosity.None) {
        let headerElement = document.createElement('h1')
        headerElement.textContent = (Sort as any).title
        wrapperElement.appendChild(headerElement)
    }

    if (board.verbosity === Verbosity.Debug) {
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
    }

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
        addPoint (gElement, xCenter, yCenter, radius, currentNodes, i, sort)
    }
    if (!sort.done) {
        renderShadow(sort, board, gElement, boxHeight, boxWidth)
    }
    const wrapperElement = createWrapper(Sort, sort, board)
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

export function autoRunBoards(boardList: any[], boxHeight: number, 
                              boxWidth: number, boardsElement: HTMLElement,
                              delay: number, finishDelay: number, check?: (a: { [key: string]: Board | BaseSort }[]) => boolean
                             ) {
    if (!check) {
        check = (board: { [key: string]: Board | BaseSort }[]) => !(board.sort as any).done
    }
                            
    let autoRun = () => {
        if((boardList as any).any(check)) {
            step(boardList, boxHeight, boxWidth, boardsElement)
            setTimeout(autoRun, delay)
        } else {
            setTimeout(() => {
                boardList.forEach((board) => board.sort.reset())
                autoRunBoards(boardList, boxHeight, boxWidth, boardsElement,
                    delay, finishDelay, check)
            }, finishDelay)
        }
    }
    setTimeout(autoRun, delay)
}

function graphName(type: string, index: number, board: {[key: string]: any}) {
    return `${index + 1}-${type} ${board.sort.constructor.title}`.substring(0, 20) + '...'
}

export function manageAutoRunCharts(boardList: any[], delay: number, id: string) {
    const strokeWidth = 3
    let data: any[] = [];
    boardList.forEach((board, index) => {
        data.push({
            values: board.sort.profile.swaps,
            key: graphName('swaps', index, board),
            strokeWidth: strokeWidth,
        })

        data.push({
            values: board.sort.profile.comparisons,
            key: graphName('comps', index, board),
            strokeWidth: strokeWidth
        })
    })

    var chart: any = nv.models.lineChart();
    chart.options({
        duration: 300,
        useInteractiveGuideline: true
    })
    chart.xAxis
        .axisLabel("Steps")
        .tickFormat(d3.format(',.0f'))
        .staggerLabels(false);
    chart.yAxis
        .axisLabel('Count')
        .tickFormat(d3.format(',.0f'));

    d3.select('#' + id).append('svg')
        .datum(data)
        .call(chart);
    nv.utils.windowResize(chart.update);

    let processNext = () => {
        if ((boardList as any).any((board: { [key: string]: Board | BaseSort }[]) => !(board.sort as any).done)) {
            data = [];

            boardList.forEach((board, index) => {
                data.push({
                    values: board.sort.profile.swaps,
                    key: graphName('swaps', index, board),
                    strokeWidth: strokeWidth
                })
                data.push({
                    values: board.sort.profile.comparisons,
                    key: graphName('comps', index, board),
                    strokeWidth: strokeWidth
                })
            })

            d3.select('#' + id).select('svg')
                .datum(data)
                .call(chart);
            setTimeout(processNext, delay)
        }
    }

    const interval = setTimeout(processNext, delay)
}

