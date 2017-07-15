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
        let $size = document.getElementById("size")
        let size = sizes[$size.value]

        let $valueType = document.getElementById("value-type")
        let value = valueTypes[$valueType.value]

        let $order = document.getElementById("order")
        let order = orders[$order.value]

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
        let heightCount = valueMax - valueMin + 1
        let valueHeight = boxHeight / heightCount
        let bottom = (value - valueMin) * valueHeight
        let point = pointElements[index]
        point.style.bottom = `${bottom}px`
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
        let $el = document.createElement('div')
        $el.className = 'board'
        $el.style.height = `${boxHeight}px`
        $el.style.width = `${boxWidth}px`

        let values = board.values()

        let valueMin = board.min()
        let valueMax = board.max()
        let widthCount = values.length
        let heightCount = valueMax - valueMin + 1

        let valueHeight = boxHeight / heightCount
        let valueWidth = boxWidth / widthCount

        let currentNodes = sort.currentNodes()
        for (let i = 0; i < values.length; i++) {
            let value = values[i]
            let left = i * valueWidth
            let bottom = (value - valueMin) * valueHeight

            let $child = document.createElement('span')
            $child.className = 'point'
            if (currentNodes.indexOf(i) !== -1) {
                $child.classList.add("active")
            }
            $child.style.height = `${valueHeight}px`
            $child.style.width = `${valueWidth}px`
            $child.style.bottom = `${bottom}px`
            $child.style.left = `${left}px`
            $el.appendChild($child)
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
        $wrapper.appendChild($el)
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
