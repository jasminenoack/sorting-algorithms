var Boards;
(function (Boards) {
    var Board = (function () {
        function Board(size) {
            this.points = [];
            this.setSize(size);
            this.createValues();
            this.shuffleBoard();
        }
        Board.prototype.createValues = function () {
            var values = Array.prototype.range(this.length);
            this.setPoints(values);
        };
        Board.prototype.shuffleBoard = function () {
            // get the values in the current array
            var values = this.values();
            values.sortNumbers();
            // shuffle the array
            values.shuffle();
            this.setPoints(values);
        };
        Board.prototype.setPoints = function (values) {
            var that = this;
            values.forEach(function (value, index) {
                that.points[index].value = value;
            });
        };
        Board.prototype.values = function () {
            var items = [];
            for (var i = 0; i < this.length; i++) {
                items.push(this.get(i).value);
            }
            return items;
        };
        Board.prototype.setSize = function (size) {
            this.size = size;
            this.length = this.size.elemCount;
            this.points = [];
            for (var i = 0; i < this.length; i++) {
                this.points.push(new Points.Point(i));
            }
        };
        Board.prototype.get = function (index) {
            return this.points[index];
        };
        return Board;
    }());
    Boards.Board = Board;
})(Boards || (Boards = {}));
