namespace script {
    let $boards = document.getElementById("boards")
    let $create = document.getElementById("create")
    let boxHeight = 300
    let boxWidth = 300
    let autoInterval = null

    let boardList = []

    let sizes = [
        Sizes.xXSmall,
        Sizes.xSmall,
        Sizes.small,
        Sizes.medium,
        Sizes.large,
        Sizes.xLarge,
        Sizes.xXLarge
    ]

    let valueTypes = [
        Boards.ValueType.Integers,
        Boards.ValueType.FewUnique,
        Boards.ValueType.Random
    ]

    let orders = [
        Boards.Shuffle.Random,
        Boards.Shuffle.Ordered,
        Boards.Shuffle.Reversed,
        Boards.Shuffle.MostlySorted,
        Boards.Shuffle.MostlyReversed
    ]

    // when click create
    $create.addEventListener('click', function () {
        let $size = document.getElementById("size")
        let size = sizes[$size.value]

        let $valueType = document.getElementById("value-type")
        let value = valueTypes[$valueType.value]

        let $order = document.getElementById("order")
        let order = orders[$order.value]

        // let board = new Boards.Board(size)
        let board = new Boards.Board(size, order, value)
        boardList.push({
            board: board,
            sort: new Bubble.Bubble(board)
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
        $wrapper.remove()
        console.log("Remove from array!!!!!")
    }, '.remove')

    let $auto = document.getElementById("auto")
    $auto.addEventListener('click', function () {
        if (autoInterval) {
            clearInterval(autoInterval)
            autoInterval = null
        } else {
            autoInterval = setInterval(step, 200)
        }
    })
}
