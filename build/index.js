var script;
(function (script) {
    var $boards = document.getElementById("boards");
    var $create = document.getElementById("create");
    var boxHeight = 300;
    var boxWidth = 300;
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
        boardList.push(board);
        createBoard(boardList.length - 1);
    });
    function createBoard(index) {
        var board = boardList[index];
        var $el = document.createElement('div');
        $el.className = 'board';
        $el.style.height = boxHeight + "px";
        $el.style.width = boxWidth + "px";
        $el.style.background = "aliceblue";
        $el.style.position = 'relative';
        $el.style.display = 'inline-block';
        $el.style.margin = '10px';
        $el.style.border = '1px solid black';
        var values = board.values();
        var valueMin = board.min();
        var valueMax = board.max();
        var widthCount = values.length;
        var heightCount = valueMax - valueMin + 1;
        var valueHeight = boxHeight / heightCount;
        var valueWidth = boxWidth / widthCount;
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            var left = i * valueWidth;
            var bottom = (value - valueMin) * valueHeight;
            var $child = document.createElement('span');
            $child.style.height = valueHeight + "px";
            $child.style.width = valueWidth + "px";
            $child.style.bottom = bottom + "px";
            $child.style.left = left + "px";
            $child.style.background = 'orange';
            $child.style.position = 'absolute';
            $child.style.display = 'block';
            $el.appendChild($child);
        }
        $boards.appendChild($el);
    }
})(script || (script = {}));
