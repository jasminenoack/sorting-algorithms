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
    var sorts = Sorts.sortList;
    var sortElement = document.getElementById("sort");
    sorts.forEach(function (sort, index) {
        var optionElement = document.createElement('option');
        optionElement.value = index;
        optionElement.textContent = sort.title;
        sortElement.appendChild(optionElement);
    });
    // when click create
    $create.addEventListener('click', function () {
        var size = sizes[sizeElement.value];
        var value = valueTypes[valueTypeSelect.value];
        var order = orders[orderSelect.value];
        var Sort = sorts[sortElement.value];
        // let board = new Boards.Board(size)
        var board = new Boards.Board(size, order, value);
        boardList.push({
            board: board,
            sort: new Sort(board)
        });
        createBoard(boardList.length - 1, Sort);
    });
    function renderShadow(sort, board, boardElement) {
        var valueMin = board.min();
        var valueMax = board.max();
        var widthSpread = board.values().length - 1;
        var heightSpread = valueMax - valueMin;
        var radius = getRadius(boxHeight, heightSpread, boxWidth, widthSpread);
        var shadow = sort.shadow;
        if (shadow.length) {
            shadow.forEach(function (obj) {
                var index = obj.index;
                var value = obj.value;
                var _a = centers(heightSpread, widthSpread, boxHeight, boxWidth, value, index, valueMin), xCenter = _a[0], yCenter = _a[1];
                var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', xCenter + '');
                circle.setAttribute('cy', yCenter + '');
                circle.setAttribute('r', radius + '');
                circle.setAttribute('class', 'point shadow');
                boardElement.appendChild(circle);
            });
        }
    }
    function removeShadow(boardElement) {
        var shadowElements = boardElement.getElementsByClassName('shadow');
        for (var i = 0; i < shadowElements.length; i++) {
            shadowElements[i].remove();
        }
    }
    function reRenderPoint(pointElements, board, index) {
        var value = board.get(index).value;
        var valueMin = board.min();
        var valueMax = board.max();
        var widthSpread = board.values().length - 1;
        var heightSpread = valueMax - valueMin;
        var radius = getRadius(boxHeight, heightSpread, boxWidth, widthSpread);
        var _a = centers(heightSpread, widthSpread, boxHeight, boxWidth, value, index, valueMin), xCenter = _a[0], yCenter = _a[1];
        var point = pointElements[index];
        point.setAttribute('cx', xCenter + '');
        point.setAttribute('cy', yCenter + '');
    }
    function setCurrentNodes(currentNodes, pointElements, sort) {
        currentNodes.forEach(function (index) {
            pointElements[index].classList.add("active");
        });
        var placed = sort.placed;
        if (placed.length) {
            for (var i = 0; i < placed.length; i++) {
                pointElements[placed[i]].classList.add("placed");
            }
        }
    }
    function removeCurrentNodes(currentNodes, pointElements) {
        currentNodes.forEach(function (index) {
            pointElements[index].classList.remove("active");
        });
    }
    function centers(heightSpread, widthSpread, boxHeight, boxWidth, value, index, valueMin) {
        var yCenter;
        if (heightSpread) {
            yCenter = (heightSpread - (value - valueMin)) / heightSpread * boxHeight;
        }
        else {
            yCenter = boxHeight / 2;
        }
        var xCenter = (index) / widthSpread * boxWidth;
        return [xCenter, yCenter];
    }
    function getRadius(boxHeight, heightSpread, boxWidth, widthSpread) {
        return Math.max(Math.min(boxHeight / heightSpread / 2, boxWidth / widthSpread / 2), 5);
    }
    function getTextContent(sort) {
        return "<div>\n            <span class=\"nowrap\">Order Type: " + sort.board.shuffle.title + ".</span>\n            <span class=\"nowrap\">Value Type: " + sort.board.valueType.title + ".</span>\n            <span class=\"nowrap\">Point Count: " + sort.board.size.label + ".</span>\n            <span class=\"nowrap\">Steps: " + sort.steps + ".</span>\n            <span class=\"nowrap\">Comparisons: " + sort.comparisons + ".</span>\n            <span class=\"nowrap\">Moves: " + sort.swaps + ".</span>\n        </div>";
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
            setCurrentNodes(currentNodes, pointElements, sort);
            boardElement.closest('.wrapper').getElementsByClassName('step-count')[0].innerHTML = getTextContent(sort);
            removeShadow(boardElement);
            renderShadow(sort, board, boardElement);
        };
        for (var i = 0; i < boardList.length; i++) {
            _loop_1(i);
        }
    }
    var $step = document.getElementById("step");
    $step.addEventListener('click', step);
    function createBoard(index, Sort) {
        var board = boardList[index].board;
        var sort = boardList[index].sort;
        var values = board.values();
        var valueMin = board.min();
        var valueMax = board.max();
        var widthSpread = values.length - 1;
        var heightSpread = valueMax - valueMin;
        var radius = getRadius(boxHeight, heightSpread, boxWidth, widthSpread);
        var boardElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        boardElement.setAttribute('viewBox', "0 0 " + (boxWidth + 40) + " " + (boxHeight + 40));
        var gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        gElement.setAttribute('transform', "translate(" + 20 + ", " + 20 + ")");
        gElement.setAttribute('class', 'board');
        boardElement.appendChild(gElement);
        var currentNodes = sort.currentNodes();
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            var _a = centers(heightSpread, widthSpread, boxHeight, boxWidth, value, i, valueMin), xCenter = _a[0], yCenter = _a[1];
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
        $header.textContent = Sort.title;
        $wrapper.appendChild($header);
        var $stepCount = document.createElement('span');
        $stepCount.innerHTML = getTextContent(sort);
        $stepCount.className = 'step-count';
        $wrapper.appendChild($stepCount);
        var $button = document.createElement('button');
        $button.textContent = 'X';
        $button.className = 'remove';
        $wrapper.appendChild($button);
        $wrapper.appendChild(boardElement);
        $boards.appendChild($wrapper);
        renderShadow(sort, board, gElement);
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
            autoInterval = setInterval(step, 100);
            event.currentTarget.classList.add('active');
        }
    });
})(script || (script = {}));
