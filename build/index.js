var script;
(function (script) {
    var $boards = document.getElementById("boards");
    var $create = document.getElementById("create");
    var boxHeight = 300;
    var boxWidth = 300;
    var autoInterval = null;
    var boardList = [];
    var sizes = [
        Sizes.xXSmall,
        Sizes.xSmall,
        Sizes.small,
        Sizes.medium,
        Sizes.large,
        Sizes.xLarge,
        Sizes.xXLarge
    ];
    var valueTypes = [
        Boards.ValueType.Integers,
        Boards.ValueType.FewUnique,
        Boards.ValueType.Random
    ];
    var orders = [
        Boards.Shuffle.Random,
        Boards.Shuffle.Ordered,
        Boards.Shuffle.Reversed,
        Boards.Shuffle.MostlySorted,
        Boards.Shuffle.MostlyReversed
    ];
    // when click create
    $create.addEventListener('click', function () {
        var $size = document.getElementById("size");
        var size = sizes[$size.value];
        var $valueType = document.getElementById("value-type");
        var value = valueTypes[$valueType.value];
        var $order = document.getElementById("order");
        var order = orders[$order.value];
        // let board = new Boards.Board(size)
        var board = new Boards.Board(size, order, value);
        boardList.push({
            board: board,
            sort: new Bubble.Bubble(board)
        });
        createBoard(boardList.length - 1);
    });
    function reRenderPoint(pointElements, board, index) {
        var value = board.get(index).value;
        var valueMin = board.min();
        var valueMax = board.max();
        var heightCount = valueMax - valueMin + 1;
        var valueHeight = boxHeight / heightCount;
        var bottom = (value - valueMin) * valueHeight;
        var point = pointElements[index];
        point.style.bottom = bottom + "px";
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
        var $el = document.createElement('div');
        $el.className = 'board';
        $el.style.height = boxHeight + "px";
        $el.style.width = boxWidth + "px";
        var values = board.values();
        var valueMin = board.min();
        var valueMax = board.max();
        var widthCount = values.length;
        var heightCount = valueMax - valueMin + 1;
        var valueHeight = boxHeight / heightCount;
        var valueWidth = boxWidth / widthCount;
        var currentNodes = sort.currentNodes();
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            var left = i * valueWidth;
            var bottom = (value - valueMin) * valueHeight;
            var $child = document.createElement('span');
            $child.className = 'point';
            if (currentNodes.indexOf(i) !== -1) {
                $child.classList.add("active");
            }
            $child.style.height = valueHeight + "px";
            $child.style.width = valueWidth + "px";
            $child.style.bottom = bottom + "px";
            $child.style.left = left + "px";
            $el.appendChild($child);
        }
        var $wrapper = document.createElement('div');
        $wrapper.className = 'wrapper';
        var $button = document.createElement('button');
        $button.textContent = 'Remove';
        $button.className = 'remove';
        $wrapper.appendChild($button);
        $wrapper.appendChild($el);
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
    $auto.addEventListener('click', function () {
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
        else {
            autoInterval = setInterval(step, 200);
        }
    });
})(script || (script = {}));
