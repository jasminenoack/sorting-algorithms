namespace script {
    let $boards = document.getElementById("boards")
    let $create = document.getElementById("create")
    let boxHeight = 300
    let boxWidth = 300

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
        boardList.push(board)
        createBoard(boardList.length - 1)
    })

    function createBoard (index) {
        let board = boardList[index]
        let $el = document.createElement('div')
        $el.className = 'board'
        $el.style.height = `${boxHeight}px`
        $el.style.width = `${boxWidth}px`
        $el.style.background = "aliceblue"
        $el.style.position = 'relative'
        $el.style.display = 'block'
        $el.style.border = '1px solid black'

        let values = board.values()

        let valueMin = board.min()
        let valueMax = board.max()
        let widthCount = values.length
        let heightCount = valueMax - valueMin + 1

        let valueHeight = boxHeight / heightCount
        let valueWidth = boxWidth / widthCount

        for (let i = 0; i < values.length; i++) {
            let value = values[i]
            let left = i * valueWidth
            let bottom = (value - valueMin) * valueHeight

            let $child = document.createElement('span')
            $child.style.height = `${valueHeight}px`
            $child.style.width = `${valueWidth}px`
            $child.style.bottom = `${bottom}px`
            $child.style.left = `${left}px`
            $child.style.background = 'orange'
            $child.style.position = 'absolute'
            $child.style.display = 'block'
            $el.appendChild($child)
        }

        let $wrapper = document.createElement('div')
        $wrapper.className = 'wrapper'
        $wrapper.style.display = 'inline-block'
        $wrapper.style.margin = '10px'
        $wrapper.style.background = 'lightgrey'
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
    }, '.remove')
}
