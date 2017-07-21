var ValueTypes;
(function (ValueTypes) {
    var Random = (function () {
        function Random() {
            this.title = "Random";
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
            this.title = "Range";
        }
        Integer.prototype.generate = function (n) {
            return Array.prototype.range(n);
        };
        return Integer;
    }());
    ValueTypes.Integer = Integer;
    var FewUnique = (function () {
        function FewUnique() {
            this.title = "Few Values";
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
            this.title = "All But 2 Equal";
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
    var Equal = (function () {
        function Equal() {
            this.title = "Equal";
        }
        Equal.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                values.push(n / 2);
            }
            return values;
        };
        return Equal;
    }());
    ValueTypes.Equal = Equal;
    var Logarithmic = (function () {
        function Logarithmic() {
            this.title = "Logarithmic";
        }
        Logarithmic.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                var j = (i + 1) / 8;
                var num = Math.log(j);
                values.push(Math.floor(num * 10));
            }
            return values;
        };
        return Logarithmic;
    }());
    ValueTypes.Logarithmic = Logarithmic;
    var Quadratic = (function () {
        function Quadratic() {
            this.title = "Quadratic";
        }
        Quadratic.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                var j = 10 * (i / n) - 5;
                var num = j * j;
                values.push(Math.floor(num * 2));
            }
            return values;
        };
        return Quadratic;
    }());
    ValueTypes.Quadratic = Quadratic;
    var Exponential = (function () {
        function Exponential() {
            this.title = "Exponential";
        }
        Exponential.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                var j = 10 * (i / n) - 5;
                var num = Math.pow(2, j);
                values.push(Math.floor(num * 2));
            }
            return values;
        };
        return Exponential;
    }());
    ValueTypes.Exponential = Exponential;
    var Cubic = (function () {
        function Cubic() {
            this.title = "Cubic";
        }
        Cubic.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                var j = 4 * (i / n) - 2;
                var num = j * j * j;
                values.push(Math.floor(num * 3));
            }
            return values;
        };
        return Cubic;
    }());
    ValueTypes.Cubic = Cubic;
    var Quintic = (function () {
        function Quintic() {
            this.title = "Quintic";
        }
        Quintic.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                var j = 2 * (i / n) - 1;
                var num = j * j * j * j * j;
                values.push(Math.floor(num * 30));
            }
            return values;
        };
        return Quintic;
    }());
    ValueTypes.Quintic = Quintic;
    var Sin = (function () {
        function Sin() {
            this.title = "Sin";
        }
        Sin.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                var j = 12 * (i / n) - 6;
                var num = Math.sin(j);
                values.push(Math.floor(num * 30));
            }
            return values;
        };
        return Sin;
    }());
    ValueTypes.Sin = Sin;
    var Root = (function () {
        function Root() {
            this.title = "Root";
        }
        Root.prototype.generate = function (n) {
            var values = [];
            for (var i = 0; i < n; i++) {
                var j = 5 * (i / n);
                var num = Math.sqrt(j);
                values.push(Math.floor(num * 15));
            }
            return values;
        };
        return Root;
    }());
    ValueTypes.Root = Root;
    ValueTypes.valueTypeList = [
        new Integer(),
        new Random(),
        new FewUnique(),
        new Equal(),
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
