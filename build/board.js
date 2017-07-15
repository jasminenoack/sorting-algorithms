var Boards;
(function (Boards) {
    var ValueType;
    (function (ValueType) {
        ValueType[ValueType["Integers"] = 0] = "Integers";
        ValueType[ValueType["FewUnique"] = 1] = "FewUnique";
        ValueType[ValueType["Random"] = 2] = "Random";
    })(ValueType = Boards.ValueType || (Boards.ValueType = {}));
    var Board = (function () {
        function Board(size, shuffle, valueType) {
            if (shuffle === void 0) { shuffle = new Shuffles.RandomShuffle(); }
            if (valueType === void 0) { valueType = ValueType.Integers; }
            this.shuffle = shuffle;
            this.valueType = valueType;
            this.points = [];
            this.setSize(size);
            this.createValues();
            this.shuffleBoard();
        }
        Board.prototype.createValues = function () {
            var values = [];
            if (this.valueType === ValueType.FewUnique) {
                var numberPerSection = this.length / 5;
                for (var i = 0; i < this.length; i++) {
                    values.push(Math.floor(i / numberPerSection) * numberPerSection);
                }
            }
            else if (this.valueType === ValueType.Random) {
                for (var i = 0; i < this.length; i++) {
                    values.push(Math.floor(Math.random() * this.length));
                }
            }
            else {
                values = Array.prototype.range(this.length);
            }
            this.setPoints(values);
        };
        Board.prototype.shuffleBoard = function () {
            var values = this.values();
            this.shuffle.shuffle(values);
            this.setPoints(values);
        };
        Board.prototype.setPoints = function (values) {
            var that = this;
            values.forEach(function (value, index) {
                that.points[index].value = value;
            });
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
            return Math.min.apply(Math, this.values());
        };
        Board.prototype.max = function () {
            return Math.max.apply(Math, this.values());
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
