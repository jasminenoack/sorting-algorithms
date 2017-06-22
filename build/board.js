var Boards;
(function (Boards) {
    var Board = (function () {
        function Board(size) {
            this.points = [];
            this.setSize(size);
            this.createArray();
        }
        Board.prototype.createArray = function () {
            var that = this;
            // reset points
            this.points = [];
            // create a list of values from 0 up to but not including the length
            // shuffle these values
            var values = Array.prototype.range(length);
            values.forEach(function (value, index) {
                that.points.push(new Points.Point(0, value));
            });
        };
        Board.prototype.shuffleBoard = function () {
            var that = this;
            var values = [];
            for (var i = 0; i < this.length; i++) {
                values.push(this.points[i].value);
            }
            values.shuffle();
            values.forEach(function (value, index) {
                that.points[index].value = value;
            });
        };
        Board.prototype.setSize = function (size) {
            this.size = size;
            this.length = this.size.elemCount;
        };
        return Board;
    }());
    Boards.Board = Board;
})(Boards || (Boards = {}));
