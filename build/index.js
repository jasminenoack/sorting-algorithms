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
    function step(boardList, boxHeight, boxWidth, boardsElement, noStep) {
        for (var i = 0; i < boardList.length; i++) {
            // update all points
            var boardData = boardList[i];
            var sort = boardData.sort;
            var board = boardData.board;
            if (!sort.done) {
                for (var i_1 = 0; i_1 < board.size.elemCount / 100; i_1++) {
                    sort.next();
                }
                reRenderBoard(i, sort.constructor, boardList, boxHeight, boxWidth, boardsElement);
            }
        }
    }
    Index.step = step;
    function addPoint(board, xCenter, yCenter, radius, currentNodes, i) {
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', xCenter + '');
        circle.setAttribute('cy', yCenter + '');
        circle.setAttribute('r', radius + '');
        circle.setAttribute('class', 'point');
        circle.setAttribute('class', 'point');
        if (currentNodes.indexOf(i) !== -1) {
            circle.classList.add('active');
        }
        board.appendChild(circle);
    }
    function createWrapper(Sort, sort) {
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
        return wrapperElement;
    }
    function createBoardElements(boxWidth, boxHeight) {
        var boardElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        boardElement.setAttribute('viewBox', "0 0 " + (boxWidth + 40) + " " + (boxHeight + 40));
        var gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        gElement.setAttribute('transform', "translate(" + 20 + ", " + 20 + ")");
        gElement.setAttribute('class', 'board');
        boardElement.appendChild(gElement);
        return [boardElement, gElement];
    }
    function buildBoard(index, Sort, boardList, boxHeight, boxWidth, boardsElement) {
        var board = boardList[index].board;
        var sort = boardList[index].sort;
        var values = board.values();
        var valueMin = board.min();
        var valueMax = board.max();
        var widthSpread = values.length - 1;
        var heightSpread = valueMax - valueMin;
        var radius = getRadius(boxHeight, heightSpread, boxHeight, widthSpread);
        var _a = createBoardElements(boxWidth, boxHeight), boardElement = _a[0], gElement = _a[1];
        var currentNodes = sort.currentNodes();
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            var _b = centers(heightSpread, widthSpread, boxHeight, boxWidth, value, i, valueMin), xCenter = _b[0], yCenter = _b[1];
            addPoint(gElement, xCenter, yCenter, radius, currentNodes, i);
        }
        renderShadow(sort, board, gElement, boxHeight, boxWidth);
        var wrapperElement = createWrapper(Sort, sort);
        wrapperElement.appendChild(boardElement);
        return wrapperElement;
    }
    function createBoard(index, Sort, boardList, boxHeight, boxWidth, boardsElement) {
        var wrapperElement = buildBoard(index, Sort, boardList, boxHeight, boxWidth, boardsElement);
        boardsElement.appendChild(wrapperElement);
    }
    Index.createBoard = createBoard;
    function reRenderBoard(index, Sort, boardList, boxHeight, boxWidth, boardsElement) {
        var wrapperElement = buildBoard(index, Sort, boardList, boxHeight, boxWidth, boardsElement);
        boardsElement.replaceChild(wrapperElement, boardsElement.getElementsByClassName('wrapper')[index]);
    }
    Index.reRenderBoard = reRenderBoard;
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
