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
    var ValueType;
    (function (ValueType) {
        ValueType[ValueType["Integers"] = 0] = "Integers";
        ValueType[ValueType["FewUnique"] = 1] = "FewUnique";
        ValueType[ValueType["Random"] = 2] = "Random";
    })(ValueType = Boards.ValueType || (Boards.ValueType = {}));
    var Board = (function () {
        function Board(size, shuffleType, valueType) {
            if (shuffleType === void 0) { shuffleType = Shuffle.Random; }
            if (valueType === void 0) { valueType = ValueType.Integers; }
            this.shuffleType = shuffleType;
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
            values.sortNumbers();
            if (this.shuffleType === Shuffle.MostlySorted ||
                this.shuffleType === Shuffle.MostlyReversed) {
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
            var numberOfSwitches = Math.ceil(Math.random() * this.length / 5) + 1;
            for (var i = 0; i < numberOfSwitches; i++) {
                var indexToInsert = Math.floor(Math.random() * this.length);
                var rangeStart = Math.max(0, indexToInsert - 3);
                var rangeEnd = Math.min(this.length - 1, indexToInsert + 3);
                // can be any inclusive
                var variability = rangeEnd - rangeStart + 1;
                var insertLocation = Math.floor(Math.random() * variability) + rangeStart;
                var valueToInsert = values[indexToInsert];
                values.splice(indexToInsert, 1);
                values.splice(insertLocation, 0, valueToInsert);
            }
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
        Board.prototype.differenceFromOrdered = function () {
            return 0;
            // let values = this.values()
            // let ordered = Array.prototype.range(values.length)
            // let difference = 0
            // for(let i = 0; i < values.length; i++) {
            //     difference += Math.abs(values[i] - i)
            // }
            // return difference
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
