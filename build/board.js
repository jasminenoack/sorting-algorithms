var Boards;
(function (Boards) {
    var Shuffle;
    (function (Shuffle) {
        Shuffle[Shuffle["Random"] = 0] = "Random";
        Shuffle[Shuffle["Ordered"] = 1] = "Ordered";
        Shuffle[Shuffle["Reversed"] = 2] = "Reversed";
        Shuffle[Shuffle["MostlySorted"] = 3] = "MostlySorted";
        Shuffle[Shuffle["MostlyReversed"] = 4] = "MostlyReversed";
    })(Shuffle = Boards.Shuffle || (Boards.Shuffle = {}));
    var Board = (function () {
        function Board(size, shuffleType) {
            if (shuffleType === void 0) { shuffleType = Shuffle.Random; }
            this.shuffleType = shuffleType;
            this.points = [];
            this.setSize(size);
            this.createValues();
            this.shuffleBoard();
        }
        Board.prototype.createValues = function () {
            var that = this;
            var values = Array.prototype.range(this.length);
            this.setPoints(values);
        };
        Board.prototype.shuffleBoard = function () {
            var values = this.values();
            values.sortNumbers();
            if (this.shuffleType === Shuffle.MostlySorted) {
                this.shuffleToMostlySorted(values);
            }
            if (this.shuffleType === Shuffle.Random) {
                values.shuffle();
            }
            if (this.shuffleType === Shuffle.Reversed ||
                this.shuffleType === Shuffle.MostlyReversed) {
                values.reverse();
            }
            this.setPoints(values);
        };
        Board.prototype.shuffleToMostlySorted = function (values) {
            var portionLength = Math.min(5, this.length);
            var portionCount = this.length / portionLength;
            for (var i = 0; i < portionCount; i++) {
                var first = Math.floor(Math.random() * portionLength) + 5 * i;
                var second = Math.floor(Math.random() * portionLength) + 5 * i;
                var temp = values[first];
                values[first] = values[second];
                values[second] = temp;
            }
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
            return Math.min.apply(Math, this.values());
        };
        Board.prototype.max = function () {
            return Math.max.apply(Math, this.values());
        };
        Board.prototype.differenceFromOrdered = function () {
            var values = this.values();
            var ordered = Array.prototype.range(values.length);
            var difference = 0;
            for (var i = 0; i < values.length; i++) {
                difference += Math.abs(values[i] - i);
            }
            return difference;
        };
        return Board;
    }());
    Boards.Board = Board;
})(Boards || (Boards = {}));
