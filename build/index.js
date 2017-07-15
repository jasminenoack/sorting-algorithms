var script;
(function (script) {
    var $boards = document.getElementById("boards");
    var $create = document.getElementById("create");
    var boxHeight = 400;
    var boxWidth = 400;
    var autoInterval = null;
    var boardList = [];
    // setup size dropdown
    var sizes = Sizes.sizeList;
    var sizeElement = document.getElementById("size");
    sizes.forEach(function (size, index) {
        var optionElement = document.createElement('option');
        optionElement.value = index;
        optionElement.textContent = size.label;
        sizeElement.appendChild(optionElement);
    });
    // set up shuffles
    var orders = Shuffles.ShuffleList;
    var orderSelect = document.getElementById('order');
    orders.forEach(function (shuffle, index) {
        var optionElement = document.createElement('option');
        optionElement.value = index;
        optionElement.textContent = shuffle.title;
        orderSelect.appendChild(optionElement);
    });
    // set up value types
    var valueTypes = ValueTypes.valueTypeList;
    var valueTypeSelect = document.getElementById('value-type');
    valueTypes.forEach(function (valueType, index) {
        var optionElement = document.createElement('option');
        optionElement.value = index;
        optionElement.textContent = valueType.title;
        valueTypeSelect.appendChild(optionElement);
    });
    var sorts = [
        Bubble.Bubble
    ];
    // when click create
    $create.addEventListener('click', function () {
        var size = sizes[sizeElement.value];
        var value = valueTypes[valueTypeSelect.value];
        var order = orders[orderSelect.value];
        var $sort = document.getElementById("sort");
        var Sort = sorts[$sort.value];
        // let board = new Boards.Board(size)
        var board = new Boards.Board(size, order, value);
        boardList.push({
            board: board,
            sort: new Sort(board)
        });
        createBoard(boardList.length - 1);
    });
    function reRenderPoint(pointElements, board, index) {
        var value = board.get(index).value;
        var valueMin = board.min();
        var valueMax = board.max();
        var widthSpread = board.values().length - 1;
        var heightSpread = valueMax - valueMin;
        var radius = Math.max(Math.min(boxHeight / heightSpread / 2 - 2, boxWidth / widthSpread / 2 - 2), 5);
        var yCenter = (heightSpread - (value - valueMin)) / heightSpread * boxHeight;
        var xCenter = (index) / widthSpread * boxWidth;
        var point = pointElements[index];
        point.setAttribute('cx', xCenter + '');
        point.setAttribute('cy', yCenter + '');
    }
    function setCurrentNodes(currentNodes, pointElements) {
        currentNodes.forEach(function (index) {
            pointElements[index].classList.add("active");
        });
    }
    function removeCurrentNodes(currentNodes, pointElements) {
        currentNodes.forEach(function (index) {
            pointElements[index].classList.remove("active");
        });
    }
    function step() {
        var _loop_1 = function (i) {
            var currentNodes = void 0;
            var boardData = boardList[i];
            var sort = boardData.sort;
            var board = boardData.board;
            var boardElement = document.getElementsByClassName('board')[i];
            var pointElements = boardElement.getElementsByClassName('point');
            currentNodes = sort.currentNodes();
            removeCurrentNodes(currentNodes, pointElements);
            var points = sort.next();
            points.forEach(function (point) {
                reRenderPoint(pointElements, board, point);
            });
            currentNodes = sort.currentNodes();
            setCurrentNodes(currentNodes, pointElements);
            boardElement.closest('.wrapper').getElementsByClassName('step-count')[0].textContent = "steps: " + sort.steps;
        };
        for (var i = 0; i < boardList.length; i++) {
            _loop_1(i);
        }
    }
    var $step = document.getElementById("step");
    $step.addEventListener('click', step);
    function createBoard(index) {
        var board = boardList[index].board;
        var sort = boardList[index].sort;
        var values = board.values();
        var valueMin = board.min();
        var valueMax = board.max();
        var widthSpread = values.length - 1;
        var heightSpread = valueMax - valueMin;
        var radius = Math.max(Math.min(boxHeight / heightSpread / 2 - 2, boxWidth / widthSpread / 2 - 2), 5);
        var boardElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        boardElement.setAttribute('class', 'board');
        boardElement.style.height = boxHeight + 40 + "px";
        boardElement.style.width = boxWidth + 40 + "px";
        var gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        gElement.setAttribute('transform', "translate(" + 20 + ", " + 20 + ")");
        boardElement.appendChild(gElement);
        var currentNodes = sort.currentNodes();
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            var yCenter = (heightSpread - (value - valueMin)) / heightSpread * boxHeight;
            var xCenter = (i) / widthSpread * boxWidth;
            var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', xCenter + '');
            circle.setAttribute('cy', yCenter + '');
            circle.setAttribute('r', radius + '');
            circle.setAttribute('class', 'point');
            if (currentNodes.indexOf(i) !== -1) {
                circle.classList.add('active');
            }
            gElement.appendChild(circle);
        }
        var $wrapper = document.createElement('div');
        $wrapper.className = 'wrapper';
        var $header = document.createElement('h1');
        $header.textContent = sort.title;
        $wrapper.appendChild($header);
        var $stepCount = document.createElement('span');
        $stepCount.textContent = "steps: " + sort.steps;
        $stepCount.className = 'step-count';
        $wrapper.appendChild($stepCount);
        var $button = document.createElement('button');
        $button.textContent = 'Remove';
        $button.className = 'remove';
        $wrapper.appendChild($button);
        $wrapper.appendChild(boardElement);
        $boards.appendChild($wrapper);
    }
    function createDelegatedEvent(eventNode, eventType, fun, selector) {
        var listener = eventNode.addEventListener(eventType, function (event) {
            var currentTarget = event.target;
            if (event.target.matches(selector)) {
                fun(event, event.target);
            }
        });
        return listener;
    }
    function closestParent(node, selector) {
        if (node.matches(selector)) {
            return node;
        }
        else if (!node.parentElement) {
            return null;
        }
        else {
            return closestParent(node.parentElement, selector);
        }
    }
    createDelegatedEvent($boards, 'click', function (event, target) {
        var $wrapper = closestParent(target, '.wrapper');
        var wrappers = document.getElementsByClassName('wrapper');
        for (var i = 0; i < wrappers.length; i++) {
            if (wrappers[i] === $wrapper) {
                boardList.splice(i, 1);
                break;
            }
        }
        $wrapper.remove();
    }, '.remove');
    var $auto = document.getElementById("auto");
    $auto.addEventListener('click', function (event) {
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
            event.currentTarget.classList.remove('active');
        }
        else {
            autoInterval = setInterval(step, 200);
            event.currentTarget.classList.add('active');
        }
    });
})(script || (script = {}));
