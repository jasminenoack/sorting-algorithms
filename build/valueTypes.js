var ValueTypes;
(function (ValueTypes) {
    var Random = (function () {
        function Random() {
        }
        Random.prototype.generate = function (n) {
            var spread = n * 2;
            var values = [];
            for (var i = 0; i < n; i++) {
                values.push(Math.floor(Math.random() * spread));
            }
            return values;
        };
        return Random;
    }());
    ValueTypes.Random = Random;
    var Integer = (function () {
        function Integer() {
        }
        Integer.prototype.generate = function (n) {
            return Array.prototype.range(n);
        };
        return Integer;
    }());
    ValueTypes.Integer = Integer;
    var FewUnique = (function () {
        function FewUnique() {
        }
        FewUnique.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                values.push(i % 5);
            }
            return values;
        };
        return FewUnique;
    }());
    ValueTypes.FewUnique = FewUnique;
    var AllBut2Equal = (function () {
        function AllBut2Equal() {
        }
        AllBut2Equal.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n - 2; i++) {
                values.push(n / 2);
            }
            values.push(2);
            values.push(n - 2);
            values.sort();
            return values;
        };
        return AllBut2Equal;
    }());
    ValueTypes.AllBut2Equal = AllBut2Equal;
    var Logarithmic = (function () {
        function Logarithmic() {
        }
        Logarithmic.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                var j = (i + 1) / 8;
                values.push(Math.log(j));
            }
            return values;
        };
        return Logarithmic;
    }());
    ValueTypes.Logarithmic = Logarithmic;
    var Quadratic = (function () {
        function Quadratic() {
        }
        Quadratic.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                var j = 10 * (i / n) - 5;
                values.push(j * j);
            }
            return values;
        };
        return Quadratic;
    }());
    ValueTypes.Quadratic = Quadratic;
    var Exponential = (function () {
        function Exponential() {
        }
        Exponential.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                var j = 10 * (i / n) - 5;
                values.push(Math.pow(2, j));
            }
            return values;
        };
        return Exponential;
    }());
    ValueTypes.Exponential = Exponential;
    var Cubic = (function () {
        function Cubic() {
        }
        Cubic.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                var j = 4 * (i / n) - 2;
                values.push(j * j * j);
            }
            return values;
        };
        return Cubic;
    }());
    ValueTypes.Cubic = Cubic;
    var Quintic = (function () {
        function Quintic() {
        }
        Quintic.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                var j = 2 * (i / n) - 1;
                values.push(j * j * j * j * j);
            }
            return values;
        };
        return Quintic;
    }());
    ValueTypes.Quintic = Quintic;
    var Sin = (function () {
        function Sin() {
        }
        Sin.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                var j = 12 * (i / n) - 6;
                values.push(Math.sin(j));
            }
            return values;
        };
        return Sin;
    }());
    ValueTypes.Sin = Sin;
    var Root = (function () {
        function Root() {
        }
        Root.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                var j = 5 * (i / n);
                values.push(Math.sqrt(j));
            }
            return values;
        };
        return Root;
    }());
    ValueTypes.Root = Root;
    ValueTypes.valueTypeList = [
        new Random(),
        new Integer(),
        new FewUnique(),
        new AllBut2Equal(),
        new Logarithmic(),
        new Quadratic(),
        new Exponential(),
        new Cubic(),
        new Quintic(),
        new Sin(),
        new Root()
    ];
})(ValueTypes || (ValueTypes = {}));
