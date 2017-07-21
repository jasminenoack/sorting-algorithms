var SortComp;
(function (SortComp) {
    var boardsElement = document.getElementById("boards");
    var $create = document.getElementById("create");
    var boxHeight = 500;
    var boxWidth = 500;
    var autoInterval = null;
    var delay = 100;
    var boardList = [];
    // setup size dropdown
    var sizes = Sizes.sizeList;
    var sizeElement = document.getElementById("size");
    sizes.forEach(function (size, index) {
        var optionElement = document.createElement('option');
        optionElement.value = index + '';
        optionElement.textContent = size.label;
        sizeElement.appendChild(optionElement);
    });
    // set up shuffles
    var orders = Shuffles.ShuffleList;
    var orderSelect = document.getElementById('order');
    orders.forEach(function (shuffle, index) {
        var optionElement = document.createElement('option');
        optionElement.value = index + '';
        optionElement.textContent = shuffle.title;
        orderSelect.appendChild(optionElement);
    });
    // set up value types
    var valueTypes = ValueTypes.valueTypeList;
    var valueTypeSelect = document.getElementById('value-type');
    valueTypes.forEach(function (valueType, index) {
        var optionElement = document.createElement('option');
        optionElement.value = index + '';
        optionElement.textContent = valueType.title;
        valueTypeSelect.appendChild(optionElement);
    });
    var sorts = Sorts.sortList;
    var sortElement = document.getElementById("sort");
    sorts.forEach(function (sort, index) {
        var optionElement = document.createElement('option');
        optionElement.value = index + '';
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
        Index.createBoard(boardList.length - 1, Sort, boardList, boxHeight, boxWidth, boardsElement);
    });
    var $step = document.getElementById("step");
    var boundStep = Index.step.bind(null, boardList, boxHeight, boxWidth);
    $step.addEventListener('click', boundStep);
    Index.createDelegatedEvent(boardsElement, 'click', function (event, target) {
        var $wrapper = Index.closestParent(target, '.wrapper');
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
            var boundStep_1 = Index.step.bind(null, boardList, boxHeight, boxWidth);
            autoInterval = setInterval(boundStep_1, delay);
            event.currentTarget.classList.add('active');
        }
    });
})(SortComp || (SortComp = {}));
