var Board;
(function (Board) {
    var ExampleArray = (function () {
        function ExampleArray(size) {
            this.points = [];
            this.setSize(size);
            this.createArray();
        }
        ExampleArray.prototype.createArray = function () {
            // TODO create different types of arrays
            var that = this;
            // reset points
            this.points = [];
            // create a list of values from 0 up to but not including the length
            // shuffle these values
            var values = [];
            for (var i = 0; i < this.length; i++) {
                values.push(i);
            }
            values.shuffle();
            // create a point for each value
            values.forEach(function (value, index) {
                that.points.push(new Points.Point(0, value));
            });
        };
        ExampleArray.prototype.setSize = function (size) {
            this.size = size;
            this.length = this.size.elemCount;
        };
        return ExampleArray;
    }());
    Board.ExampleArray = ExampleArray;
})(Board || (Board = {}));
