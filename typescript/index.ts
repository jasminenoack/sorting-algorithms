namespace script {
    let $boards = document.getElementById("boards")
    let $create = document.getElementById("create")
    let boxHeight = 400
    let boxWidth = 400
    let autoInterval = null

    let boardList = []

    // setup size dropdown
    let sizes = Sizes.sizeList
    let sizeElement = document.getElementById("size")
    sizes.forEach((size, index) => {
        let optionElement = document.createElement('option')
        optionElement.value = index
        optionElement.textContent = size.label
        sizeElement.appendChild(optionElement)
    })

    // set up shuffles
    let orders = Shuffles.ShuffleList
    let orderSelect = document.getElementById('order')
    orders.forEach((shuffle, index) => {
        let optionElement = document.createElement('option')
        optionElement.value = index
        optionElement.textContent = shuffle.title
        orderSelect.appendChild(optionElement)
    })

    // set up value types
    let valueTypes = ValueTypes.valueTypeList
    let valueTypeSelect = document.getElementById('value-type')
    valueTypes.forEach((valueType, index) => {
        let optionElement = document.createElement('option')
        optionElement.value = index
        optionElement.textContent = valueType.title
        valueTypeSelect.appendChild(optionElement)
    })





    let sorts = [
        Bubble.Bubble
    ]

    // when click create
    $create.addEventListener('click', function () {
        let size = sizes[sizeElement.value]
        let value = valueTypes[valueTypeSelect.value]
        let order = orders[orderSelect.value]

        let $sort = document.getElementById("sort")
        let Sort = sorts[$sort.value]

        // let board = new Boards.Board(size)
        let board = new Boards.Board(size, order, value)
        boardList.push({
            board: board,
            sort: new Sort(board)
        })
        createBoard(boardList.length - 1)
    })

    function reRenderPoint(pointElements, board, index) {
        let value = board.get(index).value
        let valueMin = board.min()
        let valueMax = board.max()
        let widthSpread = board.values().length - 1
        let heightSpread = valueMax - valueMin
        let radius = Math.max(Math.min(
            boxHeight / heightSpread / 2 - 2, boxWidth / widthSpread / 2 - 2
        ), 5)
        let yCenter = (heightSpread - (value - valueMin)) / heightSpread * boxHeight
        let xCenter = (index) / widthSpread * boxWidth
        let point = pointElements[index]
        point.setAttribute('cx', xCenter + '')
        point.setAttribute('cy', yCenter + '')
    }

    function setCurrentNodes(currentNodes, pointElements) {
        currentNodes.forEach(function (index) {
            pointElements[index].classList.add("active")
        })
    }

    function removeCurrentNodes(currentNodes, pointElements) {
        currentNodes.forEach(function (index) {
            pointElements[index].classList.remove("active")
        })
    }

    function step () {
        for (let i = 0; i < boardList.length; i++) {
            let currentNodes
            let boardData = boardList[i]
            let sort = boardData.sort
            let board = boardData.board
            let boardElement = document.getElementsByClassName('board')[i]
            let pointElements = boardElement.getElementsByClassName('point')

            currentNodes = sort.currentNodes()
            removeCurrentNodes(currentNodes, pointElements)

            let points = sort.next()
            points.forEach(function (point) {
                reRenderPoint(pointElements, board, point)
            })
            currentNodes = sort.currentNodes()
            setCurrentNodes(currentNodes, pointElements)
            boardElement.closest(
                '.wrapper'
            ).getElementsByClassName(
                'step-count'
            )[0].textContent = `steps: ${sort.steps}`
        }
    }

    let $step = document.getElementById("step")
    $step.addEventListener('click', step)

    function createBoard (index) {
        let board = boardList[index].board
        let sort = boardList[index].sort
        let values = board.values()
        let valueMin = board.min()
        let valueMax = board.max()
        let widthSpread = values.length - 1
        let heightSpread = valueMax - valueMin
        let radius = Math.max(Math.min(
            boxHeight / heightSpread / 2 - 2, boxWidth / widthSpread / 2 - 2
        ), 5)

        let boardElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        boardElement.setAttribute('class', 'board')
        boardElement.style.height = `${boxHeight + 40}px`
        boardElement.style.width = `${boxWidth + 40}px`

        let gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        gElement.setAttribute('transform', `translate(${20}, ${20})`)

        boardElement.appendChild(gElement)

        let currentNodes = sort.currentNodes()
        for (let i = 0; i < values.length; i++) {
            let value = values[i]

            let yCenter = (heightSpread - (value - valueMin)) / heightSpread * boxHeight
            let xCenter = (i) / widthSpread * boxWidth

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
        $header.textContent = sort.title
        $wrapper.appendChild($header)
        let $stepCount = document.createElement('span')
        $stepCount.textContent = `steps: ${sort.steps}`
        $stepCount.className = 'step-count'
        $wrapper.appendChild($stepCount)
        let $button = document.createElement('button')
        $button.textContent = 'Remove'
        $button.className = 'remove'
        $wrapper.appendChild($button)
        $wrapper.appendChild(boardElement)
        $boards.appendChild($wrapper)
    }

    function createDelegatedEvent(eventNode, eventType, fun, selector) {
        let listener = eventNode.addEventListener(eventType, function(event) {
            let currentTarget = event.target
            if (event.target.matches(selector)) {
                fun(event, event.target)
            }
        })
        return listener
    }

    function closestParent(node, selector) {
        if (node.matches(selector)) {
            return node
        } else if (!node.parentElement) {
            return null
        } else {
            return closestParent(node.parentElement, selector)
        }
    }

    createDelegatedEvent($boards, 'click', function (event, target) {
        let $wrapper = closestParent(target, '.wrapper')
        let wrappers = document.getElementsByClassName('wrapper')
        for (let i = 0; i < wrappers.length; i++) {
            if (wrappers[i] === $wrapper) {
                boardList.splice(i, 1)
                break
            }
        }
        $wrapper.remove()
    }, '.remove')

    let $auto = document.getElementById("auto")
    $auto.addEventListener('click', function (event) {
        if (autoInterval) {
            clearInterval(autoInterval)
            autoInterval = null
            event.currentTarget.classList.remove('active')
        } else {
            autoInterval = setInterval(step, 200)
            event.currentTarget.classList.add('active')
        }
    })
}
