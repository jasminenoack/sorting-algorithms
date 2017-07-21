namespace SortComp {
    let boardsElement = document.getElementById("boards")
    let $create = document.getElementById("create")
    let boxHeight = 500
    let boxWidth = 500
    let autoInterval = null
    let delay = 100

    let boardList = []

    // setup size dropdown
    let sizes = Sizes.sizeList
    let sizeElement = document.getElementById("size")
    sizes.forEach((size, index) => {
        let optionElement = document.createElement('option')
        optionElement.value = index + ''
        optionElement.textContent = size.label
        sizeElement.appendChild(optionElement)
    })

    // set up shuffles
    let orders = Shuffles.ShuffleList
    let orderSelect = document.getElementById('order')
    orders.forEach((shuffle, index) => {
        let optionElement = document.createElement('option')
        optionElement.value = index + ''
        optionElement.textContent = shuffle.title
        orderSelect.appendChild(optionElement)
    })

    // set up value types
    let valueTypes = ValueTypes.valueTypeList
    let valueTypeSelect = document.getElementById('value-type')
    valueTypes.forEach((valueType, index) => {
        let optionElement = document.createElement('option')
        optionElement.value = index + ''
        optionElement.textContent = valueType.title
        valueTypeSelect.appendChild(optionElement)
    })

    let sorts = Sorts.sortList
    let sortElement = document.getElementById("sort")
    sorts.forEach((sort, index) => {
        let optionElement = document.createElement('option')
        optionElement.value = index + ''
        optionElement.textContent = sort.title
        sortElement.appendChild(optionElement)
    })

    // when click create
    $create.addEventListener('click', function () {
        let size = sizes[sizeElement.value]
        let value = valueTypes[valueTypeSelect.value]
        let order = orders[orderSelect.value]
        let Sort = sorts[sortElement.value]

        // let board = new Boards.Board(size)
        let board = new Boards.Board(size, order, value)
        boardList.push({
            board: board,
            sort: new Sort(board)
        })
        Index.createBoard(boardList.length - 1, Sort, boardList, boxHeight, boxWidth, boardsElement)
    })

    let $step = document.getElementById("step")
    let boundStep = Index.step.bind(null, boardList, boxHeight, boxWidth)
    $step.addEventListener('click', boundStep)

    Index.createDelegatedEvent(boardsElement, 'click', function (event, target) {
        let $wrapper = Index.closestParent(target, '.wrapper')
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
            let boundStep = Index.step.bind(null, boardList, boxHeight, boxWidth)
            autoInterval = setInterval(boundStep, delay)
            event.currentTarget.classList.add('active')
        }
    })
}
