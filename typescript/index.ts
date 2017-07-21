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

    function removeCurrentNodes(currentNodes, pointElements) {
        currentNodes.forEach(function (index) {
            pointElements[index].classList.remove("active")
        })
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

    export function step (boardList, boxHeight, boxWidth) {
        for (let i = 0; i < boardList.length; i++) {
            let currentNodes
            let boardData = boardList[i]
            let sort = boardData.sort
            let board = boardData.board
            let boardElement = document.getElementsByClassName('board')[i]
            let pointElements = boardElement.getElementsByClassName('point')

            currentNodes = sort.currentNodes()
            removeCurrentNodes(currentNodes, pointElements)
            removeShadow(boardElement)

            // update all points
            if (!sort.done) {
                for (let i = 0; i < board.size.elemCount / 100; i++) {
                    sort.next()
                }
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

                renderShadow(sort, board, boardElement, boxHeight, boxWidth)
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

        let $wrapper = document.createElement('div')
        $wrapper.className = 'wrapper'
        let $header = document.createElement('h1')
        $header.textContent = Sort.title
        $wrapper.appendChild($header)
        let $stepCount = document.createElement('span')
        $stepCount.innerHTML = getTextContent(sort)
        $stepCount.className = 'step-count'
        $wrapper.appendChild($stepCount)
        let $button = document.createElement('button')
        $button.textContent = 'X'
        $button.className = 'remove'
        $wrapper.appendChild($button)
        $wrapper.appendChild(boardElement)
        boardsElement.appendChild($wrapper)

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
