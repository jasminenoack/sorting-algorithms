namespace Index {
    function renderShadow(sort, board, boardElement, boxHeight, boxWidth) {
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

    function removeShadow(boardElement) {
        let shadowElements = boardElement.getElementsByClassName('shadow')
        for(let i = 0; i < shadowElements.length; i++) {
            shadowElements[i].remove()
        }
    }

    function reRenderPoint(pointElements, board, index, boxHeight, boxWidth) {
        let value = board.get(index).value
        let valueMin = board.min()
        let valueMax = board.max()
        let widthSpread = board.values().length - 1
        let heightSpread = valueMax - valueMin
        let radius = getRadius(boxHeight, heightSpread, boxWidth, widthSpread)

        let [xCenter, yCenter] = centers(
                heightSpread, widthSpread, boxHeight, boxWidth, value,
                index, valueMin
        )

        let point = pointElements[index]
        point.setAttribute('cx', xCenter + '')
        point.setAttribute('cy', yCenter + '')
    }

    function setCurrentNodes(currentNodes, pointElements, sort) {
        currentNodes.forEach(function (index) {
            pointElements[index].classList.add("active")
        })
        let placed = sort.placed
        if (placed.length) {
            for (let i = 0; i < placed.length; i++) {
                pointElements[placed[i]].classList.add("placed")
            }
        }
    }

    function removeCurrentNodes(boardElement) {
        let currentNodes = Array.prototype.slice.call(boardElement.getElementsByClassName('active'))
        for (let i = 0; i < currentNodes.length; i++) {
            currentNodes[i].classList.remove("active")
        }
    }

    function centers(heightSpread, widthSpread, boxHeight, boxWidth, value,
                     index, valueMin) {
        let yCenter
        if (heightSpread) {
            yCenter = (heightSpread - (value - valueMin)) / heightSpread * boxHeight
        } else {
            yCenter = boxHeight / 2
        }
        let xCenter = (index) / widthSpread * boxWidth
        return [xCenter, yCenter]
    }

    function getRadius(boxHeight, heightSpread, boxWidth, widthSpread) {
        return Math.max(Math.min(
            boxHeight / heightSpread / 2, boxWidth / widthSpread / 2
        ), 2)
    }

    function getTextContent (sort) {
        return `<div>
            <span class="nowrap">Order Type: ${sort.board.shuffle.title}.</span>
            <span class="nowrap">Value Type: ${sort.board.valueType.title}.</span>
            <span class="nowrap">Point Count: ${sort.board.size.label}.</span>
            <span class="nowrap">Steps: ${sort.steps}.</span>
            <span class="nowrap">Comparisons: ${sort.comparisons}.</span>
            <span class="nowrap">Moves: ${sort.swaps}.</span>
        </div>`
    }

    export function renderBoard (i, sort, board, boxHeight, boxWidth) {
        let currentNodes
        let boardElement = document.getElementsByClassName('board')[i]
        let pointElements = boardElement.getElementsByClassName('point')
        removeCurrentNodes(boardElement)
        removeShadow(boardElement)
        let points = Array.prototype.range(sort.length)
        points.forEach(function (point) {
            reRenderPoint(pointElements, board, point, boxHeight, boxWidth)
        })
        currentNodes = sort.currentNodes()
        setCurrentNodes(currentNodes, pointElements, sort)
        boardElement.closest(
            '.wrapper'
        ).getElementsByClassName(
            'step-count'
        )[0].innerHTML = getTextContent(sort)

        if (!sort.done) {
            renderShadow(sort, board, boardElement, boxHeight, boxWidth)
        }
    }

    export function step (boardList, boxHeight, boxWidth, noStep?) {
        for (let i = 0; i < boardList.length; i++) {
            // update all points
            let boardData = boardList[i]
            let sort = boardData.sort
            let board = boardData.board
            if (!sort.done) {
                for (let i = 0; i < board.size.elemCount / 100; i++) {
                    sort.next()
                }
                renderBoard(i, sort, board, boxHeight, boxWidth)
            }
        }
    }

    export function createBoard (index, Sort, boardList, boxHeight, boxWidth, boardsElement) {
        let board = boardList[index].board
        let sort = boardList[index].sort
        let values = board.values()
        let valueMin = board.min()
        let valueMax = board.max()
        let widthSpread = values.length - 1
        let heightSpread = valueMax - valueMin
        let radius = getRadius(boxHeight, heightSpread, boxHeight, widthSpread)

        let boardElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        boardElement.setAttribute('viewBox', `0 0 ${boxWidth + 40} ${boxHeight + 40}`)

        let gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        gElement.setAttribute('transform', `translate(${20}, ${20})`)
        gElement.setAttribute('class', 'board')

        boardElement.appendChild(gElement)

        let currentNodes = sort.currentNodes()
        for (let i = 0; i < values.length; i++) {
            let value = values[i]

            let [xCenter, yCenter] = centers(
                    heightSpread, widthSpread, boxHeight, boxWidth, value,
                    i, valueMin
            )

            let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            circle.setAttribute('cx', xCenter + '')
            circle.setAttribute('cy', yCenter + '')
            circle.setAttribute('r', radius + '')

            circle.setAttribute('class', 'point')
            if (currentNodes.indexOf(i) !== -1) {
                circle.classList.add('active')
            }

            gElement.appendChild(circle)
        }

        let wrapperElement = document.createElement('div')
        wrapperElement.className = 'wrapper'
        let headerElement = document.createElement('h1')
        headerElement.textContent = Sort.title
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

        wrapperElement.appendChild(boardElement)
        boardsElement.appendChild(wrapperElement)

        renderShadow(sort, board, gElement, boxHeight, boxWidth)
    }

    export function createDelegatedEvent(eventNode, eventType, fun, selector) {
        let listener = eventNode.addEventListener(eventType, function(event) {
            let currentTarget = event.target
            if (event.target.matches(selector)) {
                fun(event, event.target)
            }
        })
        return listener
    }

    export function closestParent(node, selector) {
        if (node.matches(selector)) {
            return node
        } else if (!node.parentElement) {
            return null
        } else {
            return closestParent(node.parentElement, selector)
        }
    }
}
