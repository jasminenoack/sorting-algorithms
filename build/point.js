var Points;
(function (Points) {
    var Point = (function () {
        function Point(index, value, color) {
            if (value === void 0) { value = 0; }
            if (color === void 0) { color = "aliceblue"; }
            this.index = index;
            this.value = value;
            // TODO maybe color should be type and type should have color?
            this.color = color;
        }
        return Point;
    }());
    Points.Point = Point;
})(Points || (Points = {}));
