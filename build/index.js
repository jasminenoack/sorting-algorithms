var Index;
(function (Index) {
    function renderShadow(sort, board, boardElement, boxHeight, boxWidth) {
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
    function reRenderPoint(pointElements, board, index, boxHeight, boxWidth) {
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
    function removeCurrentNodes(boardElement) {
        var currentNodes = Array.prototype.slice.call(boardElement.getElementsByClassName('active'));
        for (var i = 0; i < currentNodes.length; i++) {
            currentNodes[i].classList.remove("active");
        }
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
        return Math.max(Math.min(boxHeight / heightSpread / 2, boxWidth / widthSpread / 2), 2);
    }
    function getTextContent(sort) {
        return "<div>\n            <span class=\"nowrap\">Order Type: " + sort.board.shuffle.title + ".</span>\n            <span class=\"nowrap\">Value Type: " + sort.board.valueType.title + ".</span>\n            <span class=\"nowrap\">Point Count: " + sort.board.size.label + ".</span>\n            <span class=\"nowrap\">Steps: " + sort.steps + ".</span>\n            <span class=\"nowrap\">Comparisons: " + sort.comparisons + ".</span>\n            <span class=\"nowrap\">Moves: " + sort.swaps + ".</span>\n        </div>";
    }
    function renderBoard(i, sort, board, boxHeight, boxWidth) {
        var currentNodes;
        var boardElement = document.getElementsByClassName('board')[i];
        var pointElements = boardElement.getElementsByClassName('point');
        removeCurrentNodes(boardElement);
        removeShadow(boardElement);
        var points = Array.prototype.range(sort.length);
        points.forEach(function (point) {
            reRenderPoint(pointElements, board, point, boxHeight, boxWidth);
        });
        currentNodes = sort.currentNodes();
        setCurrentNodes(currentNodes, pointElements, sort);
        boardElement.closest('.wrapper').getElementsByClassName('step-count')[0].innerHTML = getTextContent(sort);
        renderShadow(sort, board, boardElement, boxHeight, boxWidth);
    }
    Index.renderBoard = renderBoard;
    function step(boardList, boxHeight, boxWidth, noStep) {
        for (var i = 0; i < boardList.length; i++) {
            // update all points
            var boardData = boardList[i];
            var sort = boardData.sort;
            var board = boardData.board;
            if (!sort.done) {
                for (var i_1 = 0; i_1 < board.size.elemCount / 100; i_1++) {
                    sort.next();
                }
                renderBoard(i, sort, board, boxHeight, boxWidth);
            }
        }
    }
    Index.step = step;
    function createBoard(index, Sort, boardList, boxHeight, boxWidth, boardsElement) {
        var board = boardList[index].board;
        var sort = boardList[index].sort;
        var values = board.values();
        var valueMin = board.min();
        var valueMax = board.max();
        var widthSpread = values.length - 1;
        var heightSpread = valueMax - valueMin;
        var radius = getRadius(boxHeight, heightSpread, boxHeight, widthSpread);
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
        var wrapperElement = document.createElement('div');
        wrapperElement.className = 'wrapper';
        var headerElement = document.createElement('h1');
        headerElement.textContent = Sort.title;
        wrapperElement.appendChild(headerElement);
        var textElement = document.createElement('span');
        textElement.innerHTML = getTextContent(sort);
        textElement.className = 'step-count';
        wrapperElement.appendChild(textElement);
        var removeElement = document.createElement('button');
        removeElement.textContent = 'X';
        removeElement.className = 'remove';
        wrapperElement.appendChild(removeElement);
        var resetElement = document.createElement('button');
        resetElement.textContent = 'Reset';
        resetElement.className = 'reset';
        wrapperElement.appendChild(resetElement);
        wrapperElement.appendChild(boardElement);
        boardsElement.appendChild(wrapperElement);
        renderShadow(sort, board, gElement, boxHeight, boxWidth);
    }
    Index.createBoard = createBoard;
    function createDelegatedEvent(eventNode, eventType, fun, selector) {
        var listener = eventNode.addEventListener(eventType, function (event) {
            var currentTarget = event.target;
            if (event.target.matches(selector)) {
                fun(event, event.target);
            }
        });
        return listener;
    }
    Index.createDelegatedEvent = createDelegatedEvent;
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
    Index.closestParent = closestParent;
})(Index || (Index = {}));
