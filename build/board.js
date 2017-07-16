var Boards;
(function (Boards) {
    var Board = (function () {
        function Board(size, shuffle, valueType) {
            if (shuffle === void 0) { shuffle = new Shuffles.RandomShuffle(); }
            if (valueType === void 0) { valueType = new ValueTypes.Integer(); }
            this.shuffle = shuffle;
            this.valueType = valueType;
            this.points = [];
            this.setSize(size);
            this.createValues();
            this.shuffleBoard();
        }
        Board.prototype.createValues = function () {
            var values = this.valueType.generate(this.length);
            this.setPoints(values);
            this._min = Math.min.apply(Math, values);
            this._max = Math.max.apply(Math, values);
        };
        Board.prototype.shuffleBoard = function () {
            var values = this.values();
            this.shuffle.shuffle(values);
            this.setPoints(values);
        };
        Board.prototype.setPoints = function (values) {
            var that = this;
            values.forEach(function (value, index) {
                that.set(index, value);
            });
            this._min = Math.min.apply(Math, values);
            this._max = Math.max.apply(Math, values);
        };
        Board.prototype.set = function (index, value) {
            this.points[index].value = value;
        };
        Board.prototype.swap = function (index1, index2) {
            var temp = this.get(index1);
            this.points[index1] = this.get(index2);
            this.points[index2] = temp;
        };
        Board.prototype.values = function () {
            var items = [];
            for (var i = 0; i < this.length; i++) {
                items.push(this.points[i].value);
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
        Board.prototype.min = function () {
            return this._min;
        };
        Board.prototype.max = function () {
            return this._max;
        };
        Board.prototype.distribution = function () {
            var dist = {};
            var values = this.values();
            values.forEach(function (value) {
                dist[value] = (dist[value] || 0) + 1;
            });
            return dist;
        };
        return Board;
    }());
    Boards.Board = Board;
})(Boards || (Boards = {}));
