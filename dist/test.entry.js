/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSort = (function () {
    function BaseSort(board) {
        this.board = board;
        this.nextItemToAdd = 1;
        this.baseSetUp();
    }
    BaseSort.prototype.setUpNext = function () { };
    BaseSort.prototype.currentNodes = function () {
        if (this.done) {
            return [];
        }
        return [this.baseNode, this.comparisonNode];
    };
    BaseSort.prototype.nodesInOrder = function (values) {
        // used to compare nodes
        var inOrder = values[this.baseNode] <= values[this.comparisonNode];
        if (!inOrder) {
            this.ordered = false;
            this.lastSwapped = true;
        }
        else {
            this.lastSwapped = false;
        }
        this.comparisons++;
        return inOrder;
    };
    BaseSort.prototype.swap = function (currentNodes) {
        this.swaps++;
        this.board.swap.apply(this.board, currentNodes);
    };
    BaseSort.prototype.next = function () {
        if (this.done) {
            return [];
        }
        this.steps++;
        var currentNodes = this.currentNodes();
        var values = this.board.values();
        if (!this.nodesInOrder(values)) {
            this.swap(currentNodes);
        }
        this.setUpNext();
        this.trackProfile();
        return currentNodes;
    };
    BaseSort.prototype.trackProfile = function () {
        if (this.steps === this.nextItemToAdd || this.done) {
            this.profile['swaps'].push({
                x: this.steps,
                y: this.swaps
            });
            this.profile['comparisons'].push({
                x: this.steps,
                y: this.comparisons
            });
            this.nextItemToAdd = Math.ceil(Math.min(this.nextItemToAdd * 1.2, this.nextItemToAdd + 16));
        }
    };
    BaseSort.prototype.reset = function () {
        this.board.shuffleBoard();
        this.baseSetUp();
    };
    BaseSort.prototype.baseSetUp = function () {
        this.profile = {
            swaps: [],
            comparisons: [],
        };
        this.length = this.board.length;
        this.baseNode = 0;
        this.comparisonNode = 1;
        this.end = this.length - 1;
        this.done = false;
        this.swaps = 0;
        this.comparisons = 0;
        this.steps = 0;
        this.baseNode = 0;
        this.comparisonNode = 1;
        this.length = this.board.length;
        this.end = this.length - 1;
        this.lastSwapped = false;
        this.ordered = true;
        this.placed = [];
        this.shadow = [];
        this.setUp();
    };
    BaseSort.prototype.setUp = function () {
        console.log("not implemented");
        console.log(this);
    };
    BaseSort.title = '';
    return BaseSort;
}());
exports.BaseSort = BaseSort;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Shuffle = (function () {
    function Shuffle() {
    }
    Shuffle.prototype.shuffle = function (array) {
        array.sortNumbers();
        if (this.k === null) {
            array.shuffle();
        }
        else if (this.k) {
            array.kShuffle(this.k);
        }
        if (this.reversed) {
            array.reverse();
        }
        return array;
    };
    return Shuffle;
}());
exports.Shuffle = Shuffle;
var OrderedShuffle = (function (_super) {
    __extends(OrderedShuffle, _super);
    function OrderedShuffle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.k = 0;
        _this.reversed = false;
        _this.title = "Ordered";
        return _this;
    }
    return OrderedShuffle;
}(Shuffle));
exports.OrderedShuffle = OrderedShuffle;
var RandomShuffle = (function (_super) {
    __extends(RandomShuffle, _super);
    function RandomShuffle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.k = null;
        _this.reversed = false;
        _this.title = "Random";
        return _this;
    }
    return RandomShuffle;
}(Shuffle));
exports.RandomShuffle = RandomShuffle;
var K1Shuffle = (function (_super) {
    __extends(K1Shuffle, _super);
    function K1Shuffle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.k = 1;
        _this.reversed = false;
        _this.title = "K1";
        return _this;
    }
    return K1Shuffle;
}(Shuffle));
exports.K1Shuffle = K1Shuffle;
var K3Shuffle = (function (_super) {
    __extends(K3Shuffle, _super);
    function K3Shuffle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.k = 3;
        _this.reversed = false;
        _this.title = "K3";
        return _this;
    }
    return K3Shuffle;
}(Shuffle));
exports.K3Shuffle = K3Shuffle;
var K5Shuffle = (function (_super) {
    __extends(K5Shuffle, _super);
    function K5Shuffle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.k = 5;
        _this.reversed = false;
        _this.title = "K5";
        return _this;
    }
    return K5Shuffle;
}(Shuffle));
exports.K5Shuffle = K5Shuffle;
var K5ReversedShuffle = (function (_super) {
    __extends(K5ReversedShuffle, _super);
    function K5ReversedShuffle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.k = 5;
        _this.reversed = true;
        _this.title = "K5 Reversed";
        return _this;
    }
    return K5ReversedShuffle;
}(Shuffle));
exports.K5ReversedShuffle = K5ReversedShuffle;
var K3ReversedShuffle = (function (_super) {
    __extends(K3ReversedShuffle, _super);
    function K3ReversedShuffle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.k = 3;
        _this.reversed = true;
        _this.title = "K3 Reversed";
        return _this;
    }
    return K3ReversedShuffle;
}(Shuffle));
exports.K3ReversedShuffle = K3ReversedShuffle;
var K1ReversedShuffle = (function (_super) {
    __extends(K1ReversedShuffle, _super);
    function K1ReversedShuffle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.k = 1;
        _this.reversed = true;
        _this.title = "K1 Reversed";
        return _this;
    }
    return K1ReversedShuffle;
}(Shuffle));
exports.K1ReversedShuffle = K1ReversedShuffle;
var ReversedShuffle = (function (_super) {
    __extends(ReversedShuffle, _super);
    function ReversedShuffle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.k = 0;
        _this.reversed = true;
        _this.title = "Reversed";
        return _this;
    }
    return ReversedShuffle;
}(Shuffle));
exports.ReversedShuffle = ReversedShuffle;
exports.ShuffleList = [
    new OrderedShuffle(),
    new K1Shuffle(),
    new K3Shuffle(),
    new K5Shuffle(),
    new RandomShuffle(),
    new K5ReversedShuffle(),
    new K3ReversedShuffle(),
    new K1ReversedShuffle(),
    new ReversedShuffle()
];


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Points = __webpack_require__(5);
var Shuffles = __webpack_require__(1);
var ValueTypes = __webpack_require__(3);
var Verbosity;
(function (Verbosity) {
    Verbosity[Verbosity["None"] = 0] = "None";
    Verbosity[Verbosity["Info"] = 1] = "Info";
    Verbosity[Verbosity["Debug"] = 5] = "Debug";
})(Verbosity = exports.Verbosity || (exports.Verbosity = {}));
var Board = (function () {
    function Board(size, shuffle, valueType, verbosity) {
        if (shuffle === void 0) { shuffle = new Shuffles.RandomShuffle(); }
        if (valueType === void 0) { valueType = new ValueTypes.Integer(); }
        if (verbosity === void 0) { verbosity = Verbosity.Debug; }
        this.shuffle = shuffle;
        this.valueType = valueType;
        this.verbosity = verbosity;
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
exports.Board = Board;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.Random = Random;
var Integer = (function () {
    function Integer() {
        this.title = "Range";
    }
    Integer.prototype.generate = function (n) {
        return Array.prototype.range(n);
    };
    return Integer;
}());
exports.Integer = Integer;
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
exports.FewUnique = FewUnique;
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
exports.AllBut2Equal = AllBut2Equal;
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
exports.Equal = Equal;
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
exports.Logarithmic = Logarithmic;
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
exports.Quadratic = Quadratic;
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
exports.Exponential = Exponential;
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
exports.Cubic = Cubic;
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
exports.Quintic = Quintic;
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
exports.Sin = Sin;
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
exports.Root = Root;
exports.valueTypeList = [
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseSort_1 = __webpack_require__(0);
var Gnome = (function (_super) {
    __extends(Gnome, _super);
    function Gnome() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Gnome.prototype.setUpNext = function () {
        if (this.baseNode === 0 || !this.lastSwapped) {
            this.currentGnome++;
            this.comparisonNode = this.currentGnome;
            this.baseNode = this.currentGnome - 1;
        }
        else if (this.lastSwapped) {
            this.baseNode--;
            this.comparisonNode--;
        }
        if (this.comparisonNode >= this.length) {
            this.done = true;
        }
    };
    Gnome.prototype.setUp = function () {
        this.currentGnome = 1;
    };
    Gnome.title = "Gnome Sort";
    return Gnome;
}(baseSort_1.BaseSort));
exports.Gnome = Gnome;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.Point = Point;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.speedTest = {
    elemCount: 9000,
    label: "9000"
};
exports._7500 = {
    elemCount: 7500,
    label: "7500"
};
exports._5000 = {
    elemCount: 5000,
    label: "5000"
};
exports._4000 = {
    elemCount: 4000,
    label: "4000"
};
exports._3000 = {
    elemCount: 3000,
    label: "3000"
};
exports._2000 = {
    elemCount: 2000,
    label: "2000"
};
exports.stupidNumber = {
    elemCount: 1000,
    label: "1000"
};
exports._750 = {
    elemCount: 750,
    label: "750"
};
exports._500 = {
    elemCount: 500,
    label: "500"
};
exports.manyMany = {
    elemCount: 300,
    label: "300"
};
exports._250 = {
    elemCount: 250,
    label: "250"
};
exports._100 = {
    elemCount: 100,
    label: "100"
};
exports._75 = {
    elemCount: 75,
    label: "75"
};
exports.xXSmall = {
    elemCount: 70,
    label: "70"
};
exports.xSmall = {
    elemCount: 60,
    label: "60"
};
exports.small = {
    elemCount: 50,
    label: "50"
};
exports.medium = {
    elemCount: 40,
    label: "40"
};
exports.large = {
    elemCount: 30,
    label: "30"
};
exports._25 = {
    elemCount: 25,
    label: "25"
};
exports.xLarge = {
    elemCount: 20,
    label: "20"
};
exports.xXLarge = {
    elemCount: 10,
    label: "10"
};
exports.fewFew = {
    elemCount: 5,
    label: '5'
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var board_1 = __webpack_require__(2);
function renderShadow(sort, board, boardElement, boxHeight, boxWidth) {
    var valueMin = board.min();
    var valueMax = board.max();
    var widthSpread = board.values().length - 1;
    var heightSpread = valueMax - valueMin;
    var radius = getRadius(boxHeight, heightSpread, boxWidth, widthSpread);
    var shadow = sort.shadow;
    if (shadow.length) {
        shadow.forEach(function (obj) {
            var index = obj.index;
            var value = obj.value;
            var _a = centers(heightSpread, widthSpread, boxHeight, boxWidth, value, index, valueMin), xCenter = _a[0], yCenter = _a[1];
            var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', xCenter + '');
            circle.setAttribute('cy', yCenter + '');
            circle.setAttribute('r', radius + '');
            circle.setAttribute('class', 'point shadow');
            boardElement.appendChild(circle);
        });
    }
}
function centers(heightSpread, widthSpread, boxHeight, boxWidth, value, index, valueMin) {
    var yCenter;
    if (heightSpread) {
        yCenter = (heightSpread - (value - valueMin)) / heightSpread * boxHeight;
    }
    else {
        yCenter = boxHeight / 2;
    }
    var xCenter = (index) / widthSpread * boxWidth;
    return [xCenter, yCenter];
}
function getRadius(boxHeight, heightSpread, boxWidth, widthSpread) {
    return Math.max(Math.min(boxHeight / heightSpread / 2, boxWidth / widthSpread / 2), 2);
}
function getTextContent(sort) {
    return "<div>\n        <span class=\"nowrap\">Order Type: " + sort.board.shuffle.title + ".</span>\n        <span class=\"nowrap\">Value Type: " + sort.board.valueType.title + ".</span>\n        <span class=\"nowrap\">Point Count: " + sort.board.size.label + ".</span>\n        <span class=\"nowrap\">Steps: " + sort.steps + ".</span>\n        <span class=\"nowrap\">Comparisons: " + sort.comparisons + ".</span>\n        <span class=\"nowrap\">Moves: " + sort.swaps + ".</span>\n    </div>";
}
function step(boardList, boxHeight, boxWidth, boardsElement, noStep) {
    for (var i = 0; i < boardList.length; i++) {
        // update all points
        var boardData = boardList[i];
        var sort = boardData.sort;
        var board = boardData.board;
        if (!sort.done) {
            var times = Math.min(board.size.elemCount / 100, 100);
            for (var i_1 = 0; i_1 < board.size.elemCount / 100; i_1++) {
                sort.next();
            }
            reRenderBoard(i, sort.constructor, boardList, boxHeight, boxWidth, boardsElement);
        }
    }
}
exports.step = step;
function addPoint(board, xCenter, yCenter, radius, currentNodes, i, sort) {
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', xCenter + '');
    circle.setAttribute('cy', yCenter + '');
    circle.setAttribute('r', radius + '');
    circle.setAttribute('class', 'point');
    circle.setAttribute('class', 'point');
    if (currentNodes.indexOf(i) !== -1) {
        circle.classList.add('active');
    }
    if (sort.placed.indexOf(i) !== -1) {
        circle.classList.add('placed');
    }
    board.appendChild(circle);
}
function createWrapper(Sort, sort, board) {
    var wrapperElement = document.createElement('div');
    wrapperElement.className = 'wrapper';
    if (board.verbosity !== board_1.Verbosity.None) {
        var headerElement = document.createElement('h1');
        headerElement.textContent = Sort.title;
        wrapperElement.appendChild(headerElement);
    }
    if (board.verbosity === board_1.Verbosity.Debug) {
        var textElement = document.createElement('span');
        textElement.innerHTML = getTextContent(sort);
        textElement.className = 'step-count';
        wrapperElement.appendChild(textElement);
        var removeElement = document.createElement('button');
        removeElement.textContent = 'X';
        removeElement.className = 'remove';
        wrapperElement.appendChild(removeElement);
        var resetElement = document.createElement('button');
        resetElement.textContent = 'Reset';
        resetElement.className = 'reset';
        wrapperElement.appendChild(resetElement);
    }
    return wrapperElement;
}
function createBoardElements(boxWidth, boxHeight) {
    var boardElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    boardElement.setAttribute('viewBox', "0 0 " + (boxWidth + 40) + " " + (boxHeight + 40));
    var gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    gElement.setAttribute('transform', "translate(" + 20 + ", " + 20 + ")");
    gElement.setAttribute('class', 'board');
    boardElement.appendChild(gElement);
    return [boardElement, gElement];
}
function buildBoard(index, Sort, boardList, boxHeight, boxWidth, boardsElement) {
    var board = boardList[index].board;
    var sort = boardList[index].sort;
    var values = board.values();
    var valueMin = board.min();
    var valueMax = board.max();
    var widthSpread = values.length - 1;
    var heightSpread = valueMax - valueMin;
    var radius = getRadius(boxHeight, heightSpread, boxHeight, widthSpread);
    var _a = createBoardElements(boxWidth, boxHeight), boardElement = _a[0], gElement = _a[1];
    var currentNodes = sort.currentNodes();
    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        var _b = centers(heightSpread, widthSpread, boxHeight, boxWidth, value, i, valueMin), xCenter = _b[0], yCenter = _b[1];
        addPoint(gElement, xCenter, yCenter, radius, currentNodes, i, sort);
    }
    if (!sort.done) {
        renderShadow(sort, board, gElement, boxHeight, boxWidth);
    }
    var wrapperElement = createWrapper(Sort, sort, board);
    wrapperElement.appendChild(boardElement);
    return wrapperElement;
}
function createBoard(index, Sort, boardList, boxHeight, boxWidth, boardsElement) {
    var wrapperElement = buildBoard(index, Sort, boardList, boxHeight, boxWidth, boardsElement);
    boardsElement.appendChild(wrapperElement);
}
exports.createBoard = createBoard;
function reRenderBoard(index, Sort, boardList, boxHeight, boxWidth, boardsElement) {
    var wrapperElement = buildBoard(index, Sort, boardList, boxHeight, boxWidth, boardsElement);
    boardsElement.replaceChild(wrapperElement, boardsElement.getElementsByClassName('wrapper')[index]);
}
exports.reRenderBoard = reRenderBoard;
function createDelegatedEvent(eventNode, eventType, fun, selector) {
    var listener = eventNode.addEventListener(eventType, function (event) {
        var currentTarget = event.target;
        if (event.target.matches(selector)) {
            fun(event, event.target);
        }
    });
    return listener;
}
exports.createDelegatedEvent = createDelegatedEvent;
function closestParent(node, selector) {
    if (node.matches(selector)) {
        return node;
    }
    else if (!node.parentElement) {
        return null;
    }
    else {
        return closestParent(node.parentElement, selector);
    }
}
exports.closestParent = closestParent;
function autoRunBoards(boardList, boxHeight, boxWidth, boardsElement, delay, finishDelay) {
    var interval = setInterval(function () {
        if (boardList.any(function (board) { return !board.sort.done; })) {
            step(boardList, boxHeight, boxWidth, boardsElement);
        }
        else {
            clearInterval(interval);
            setTimeout(function () {
                boardList.forEach(function (board) { return board.sort.reset(); });
                autoRunBoards(boardList, boxHeight, boxWidth, boardsElement, delay, finishDelay);
            }, finishDelay);
        }
    }, delay);
}
exports.autoRunBoards = autoRunBoards;
function graphName(type, index, board) {
    return (index + 1 + "-" + type + " " + board.sort.constructor.title).substring(0, 20) + '...';
}
function manageAutoRunCharts(boardList, delay, id) {
    var strokeWidth = 3;
    var data = [];
    boardList.forEach(function (board, index) {
        data.push({
            values: board.sort.profile.swaps,
            key: graphName('swaps', index, board),
            strokeWidth: strokeWidth,
        });
        data.push({
            values: board.sort.profile.comparisons,
            key: graphName('comparisons', index, board),
            strokeWidth: strokeWidth
        });
    });
    var chart = nv.models.lineChart();
    chart.options({
        duration: 300,
        useInteractiveGuideline: true
    });
    chart.xAxis
        .axisLabel("Steps")
        .tickFormat(d3.format(',.0f'))
        .staggerLabels(false);
    chart.yAxis
        .axisLabel('Count')
        .tickFormat(d3.format(',.0f'));
    d3.select('#' + id).append('svg')
        .datum(data)
        .call(chart);
    nv.utils.windowResize(chart.update);
    var interval = setInterval(function () {
        if (boardList.any(function (board) { return !board.sort.done; })) {
            data = [];
            boardList.forEach(function (board, index) {
                data.push({
                    values: board.sort.profile.swaps,
                    key: graphName('swaps', index, board),
                    strokeWidth: strokeWidth
                });
                data.push({
                    values: board.sort.profile.comparisons,
                    key: graphName('comparisons', index, board),
                    strokeWidth: strokeWidth
                });
            });
            d3.select('#' + id).select('svg')
                .datum(data)
                .call(chart);
        }
        else {
            clearInterval(interval);
        }
    }, delay);
}
exports.manageAutoRunCharts = manageAutoRunCharts;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(9));
__export(__webpack_require__(10));
__export(__webpack_require__(11));
__export(__webpack_require__(12));
__export(__webpack_require__(13));
__export(__webpack_require__(4));
__export(__webpack_require__(14));
__export(__webpack_require__(15));
__export(__webpack_require__(16));
__export(__webpack_require__(17));
__export(__webpack_require__(18));
__export(__webpack_require__(19));
/*
    -- AA - sort http://www.dia.eui.upm.es/asignatu/pro_par/articulos/AASort.pdf

    -- Abacus sort

    -- American Flag Sort

    -- arc sort https://arxiv.org/pdf/1406.2262.pdf

    -- Batcher Odd Even Merge Sort

    -- Bead Sort

    -- Binary Insertion Sort

    -- Binary Tree Sort

    -- Bitonic sorter http://www.dcc.fc.up.pt/~fds/aulas/PPD/1112/sorting.pdf

    -- Block Sort

    -- Block Merge Sort
*/
/*
    -- fast bogo sort (https://xkcd.com/1185/)

    -- Bogobogo sort

    -- bozo sort
*/
/*
    -- Bucket Sort

    -- Burst Sort

    -- caresian tree sort

    -- cascade merge sort

    -- cata sort https://github.com/Folatt/Catasort/blob/master/catasort.py

    -- check sort http://academia.wikia.com/wiki/Check_sort#Check_sort_and_Rapid_sort

    -- Circle Sort http://rosettacode.org/wiki/Sorting_Algorithms/Circle_Sort http://www.cscjournals.org/manuscript/Journals/IJEA/Volume6/Issue2/IJEA-48.pdf
*/
/*
    -- committee sort

    -- Conway sort

    -- Counting sort

    -- cube sort
*/
/*
    -- demonsort

    -- diamondsort

    -- dropsort

    -- evil sort http://richardhartersworld.com/cri_d/cri/2001/badsort.html

    -- flash sort

    -- Franceschini-Muthukrishnan-Pătrașcu algorithm
*/
/*
    -- goro sort https://code.google.com/codejam/contest/dashboard?c=975485#s=p3

    -- gravity sort

    -- Grouping Comparison sort http://www.cscjournals.org/manuscript/Journals/IJCSS/Volume7/Issue3/IJCSS-877.pdf

    -- half hearted merge sort (https://xkcd.com/1185/)

    -- han's algorithm

    -- hanoi sort
*/
/*
    -- index sort http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.403.2955&rep=rep1&type=pdf
*/
/*
    -- intelligent design sort https://motherboard.vice.com/en_us/article/4xad8b/a-real-sorting-algorithm-based-on-the-fake-theory-of-intelligent-design

    -- internet sort

    -- Introsort

    -- jingle sort

    -- job interview quicksort (https://xkcd.com/1185/)

    -- JumpDownSort (modified bubble sort) https://users.cs.duke.edu/~ola/bubble/bubble.pdf

    -- Library sort

    -- List Sort https://arxiv.org/pdf/1310.7890.pdf

    -- merge sort

    -- 3-way merge sort

    -- miracle sort

    -- monkey sort http://richardhartersworld.com/cri_d/cri/2001/badsort.html
*/
/*
    -- oscillating merge sort

    -- Pairwise Sorting Network

    -- Pancake sorting

    -- panic sort (https://xkcd.com/1185/)

    -- patience sorting

    -- permutation sort

    -- pigeonhole sort

    -- polyphase merge sort

    -- postman sort

    -- proxmap sort

    -- quantum bogo sort
*/
/*
    -- quora sort

    -- radix sort (lsd, msd)

    -- rapid sort http://academia.wikia.com/wiki/Check_sort#Check_sort_and_Rapid_sort

    -- reverse subsequence Reversing subsequence algorithm

    -- rolling ball sort

    -- rva sorting http://dl.acm.org/citation.cfm?id=2677942&CFID=787105030&CFTOKEN=78811798

    -- sample sort

    -- Schwartzian transform https://en.wikibooks.org/wiki/Algorithm_Implementation/Sorting/Schwartzian_transform
*/
/*
    -- shatter sort

    -- shell sort http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.193.6248&rep=rep1&type=pdf TIGCC (a GCC-based compiler for TI-89/92/V200 graphing calculators) uses Shell sort for the qsort implementation in its standard library: http://www.thechalkface.net/resources/Sorting_Algorithms.pdf

    -- silly sort http://richardhartersworld.com/cri_d/cri/2001/badsort.html

    -- simple pancake sort

    -- ska sort

    -- slow sort https://en.wikipedia.org/wiki/Slowsort, http://www.mipmip.org/tidbits/pasa.pdf

    -- sleep sort
*/
/*
    -- solar bitflip

    -- sorting networks

    -- Spaghetti sort(poll)

    -- splay sort

    -- spread sort

    -- stack sort

    -- stalin sort
*/
// stooge
/*
    -- strand sort

    -- stupid sort

    -- tag sort

    -- throups algorithm

    -- tim sort

    -- topological sorting

    -- tournament sort

    -- tree sort

    -- Two-way replacement selection http://dl.acm.org/citation.cfm?id=1920952

    -- unshuffle sort

    -- weak heap sort
*/


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseSort_1 = __webpack_require__(0);
var Bogo = (function (_super) {
    __extends(Bogo, _super);
    function Bogo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bogo.prototype.setUp = function () {
        this.checkSorted();
    };
    Bogo.prototype.currentNodes = function () {
        if (!this.done) {
            return Array.prototype.range(this.board.length);
        }
        else {
            return [];
        }
    };
    Bogo.prototype.checkSorted = function () {
        var values = this.board.values();
        if (values.sorted()) {
            this.done = true;
            return true;
        }
        return false;
    };
    Bogo.prototype.next = function () {
        if (this.done) {
            return [];
        }
        var currentNodes = this.currentNodes();
        this.steps++;
        var values = this.board.values();
        var start = values.slice();
        this.board.setPoints(values.shuffle());
        var difference = 0;
        for (var i = 0; i < values.length; i++) {
            if (values[i] !== start[i]) {
                difference++;
            }
        }
        this.swaps += difference / 2;
        this.checkSorted();
        return currentNodes;
    };
    Bogo.title = 'Bogo';
    return Bogo;
}(baseSort_1.BaseSort));
exports.Bogo = Bogo;
var BogoSingle = (function (_super) {
    __extends(BogoSingle, _super);
    function BogoSingle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BogoSingle.prototype.setUp = function () {
        this.checkSorted();
        this.setUpNext();
    };
    BogoSingle.prototype.checkSorted = function () {
        var values = this.board.values();
        if (values.sorted()) {
            this.done = true;
            return true;
        }
        return false;
    };
    BogoSingle.prototype.nodesInOrder = function (values) {
        // always swap
        return false;
    };
    BogoSingle.prototype.setUpNext = function () {
        var first = Math.floor(Math.random() * this.length);
        var second = Math.floor(Math.random() * this.length);
        while (first === second) {
            second = Math.floor(Math.random() * this.length);
        }
        this.baseNode = Math.min(first, second);
        this.comparisonNode = Math.max(first, second);
    };
    BogoSingle.prototype.next = function () {
        var currentNodes = this.currentNodes();
        _super.prototype.next.call(this);
        this.checkSorted();
        return currentNodes;
    };
    BogoSingle.title = "Bogo(Single Swap)";
    return BogoSingle;
}(baseSort_1.BaseSort));
exports.BogoSingle = BogoSingle;
var BogoSingleCompare = (function (_super) {
    __extends(BogoSingleCompare, _super);
    function BogoSingleCompare() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BogoSingleCompare.prototype.nodesInOrder = function (values) {
        // used to compare nodes
        var inOrder = values[this.baseNode] <= values[this.comparisonNode];
        if (!inOrder) {
            this.ordered = false;
        }
        this.comparisons++;
        return inOrder;
    };
    BogoSingleCompare.title = 'Bogo(Compare & Single Swap)';
    return BogoSingleCompare;
}(BogoSingle));
exports.BogoSingleCompare = BogoSingleCompare;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseSort_1 = __webpack_require__(0);
var Bubble = (function (_super) {
    __extends(Bubble, _super);
    function Bubble() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.skipSorted = false;
        _this.shortCircuit = true;
        return _this;
    }
    Bubble.prototype.setUpNext = function () {
        if (this.comparisonNode == this.end) {
            this.maxRounds--;
            if (this.maxRounds === 0) {
                this.done = true;
            }
            if (this.ordered && this.shortCircuit) {
                this.done = true;
            }
            else {
                this.ordered = true;
            }
            this.baseNode = 0;
            this.comparisonNode = 1;
            if (this.skipSorted) {
                this.placed.push(this.end);
                this.end--;
                if (this.end === 0) {
                    this.done = true;
                }
            }
        }
        else {
            this.baseNode++;
            this.comparisonNode++;
        }
    };
    Bubble.prototype.setUp = function () {
        this.maxRounds = this.length;
        this.ordered = true;
    };
    Bubble.title = "Bubble(Short Circuit)";
    Bubble.links = [
        {
            url: 'https://users.cs.duke.edu/~ola/bubble/bubble.pdf',
            name: 'Bubble Sort: An Archaeological Algorithmic Analysis'
        }
    ];
    return Bubble;
}(baseSort_1.BaseSort));
exports.Bubble = Bubble;
var BubbleNonOptimized = (function (_super) {
    __extends(BubbleNonOptimized, _super);
    function BubbleNonOptimized() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shortCircuit = false;
        return _this;
    }
    BubbleNonOptimized.title = 'Bubble Sort';
    return BubbleNonOptimized;
}(Bubble));
exports.BubbleNonOptimized = BubbleNonOptimized;
var BubbleSkipsSorted = (function (_super) {
    __extends(BubbleSkipsSorted, _super);
    function BubbleSkipsSorted() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.skipSorted = true;
        return _this;
    }
    BubbleSkipsSorted.title = "Bubble(Short Circuit & Skip Sorted)";
    return BubbleSkipsSorted;
}(Bubble));
exports.BubbleSkipsSorted = BubbleSkipsSorted;
var BubbleSkipNoShortCircuit = (function (_super) {
    __extends(BubbleSkipNoShortCircuit, _super);
    function BubbleSkipNoShortCircuit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.skipSorted = true;
        _this.shortCircuit = false;
        return _this;
    }
    BubbleSkipNoShortCircuit.title = "Bubble(Skip Sorted)";
    return BubbleSkipNoShortCircuit;
}(Bubble));
exports.BubbleSkipNoShortCircuit = BubbleSkipNoShortCircuit;
var BubbleSortConcurrent = (function (_super) {
    __extends(BubbleSortConcurrent, _super);
    function BubbleSortConcurrent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BubbleSortConcurrent.prototype.setUp = function () {
        _super.prototype.setUp.call(this);
        this.numberConcurrent = this.constructor.numberConcurrent;
        this.setUpBaseNodes();
    };
    BubbleSortConcurrent.prototype.setUpBaseNodes = function (base) {
        if (base === void 0) { base = 0; }
        // sets up base nodes with a minimum diff of 2
        var numberConcurrent = this.numberConcurrent;
        var nodeDiffs = Math.floor(this.length / numberConcurrent);
        if (nodeDiffs < 2) {
            nodeDiffs = 2;
            numberConcurrent = Math.floor(this.length / 2);
        }
        this.baseNodes = [];
        this.orderedSets = [];
        this.fullRound = [];
        for (var i = 0; i < numberConcurrent; i++) {
            this.baseNodes.push(0 + i * nodeDiffs);
            if (i === 0) {
                this.orderedSets.push(true);
                this.fullRound.push(true);
            }
            else {
                this.orderedSets.push(false);
                this.fullRound.push(false);
            }
        }
    };
    BubbleSortConcurrent.prototype.currentNodes = function () {
        if (this.done) {
            return [];
        }
        return this.baseNodes;
    };
    BubbleSortConcurrent.prototype.setUpNext = function () {
        var _this = this;
        var indexToRemove;
        this.baseNodes.forEach(function (node, index) {
            _this.baseNodes[index] += 1;
        });
        this.baseNodes.forEach(function (node, index) {
            if (node == _this.end) {
                if (_this.fullRound[index]) {
                    _this.placed.push(_this.end);
                    _this.end--;
                    _this.maxRounds--;
                    if (_this.maxRounds === 0) {
                        _this.done = true;
                    }
                }
                if (_this.end === 0) {
                    _this.done = true;
                }
                if (_this.orderedSets[index]) {
                    _this.done = true;
                }
                var nextIndex = void 0;
                if (index < _this.baseNodes.length - 1) {
                    nextIndex = index + 1;
                }
                else {
                    nextIndex = 0;
                }
                if (_this.baseNodes[nextIndex] <= 1 && _this.fullRound[index]) {
                    indexToRemove = index;
                }
                else {
                    _this.baseNodes[index] = 0;
                }
                _this.orderedSets[index] = true;
                _this.fullRound[index] = true;
            }
        });
        if (indexToRemove !== undefined) {
            this.baseNodes.splice(indexToRemove, 1);
            this.orderedSets.splice(indexToRemove, 1);
            this.fullRound.splice(indexToRemove, 1);
        }
    };
    BubbleSortConcurrent.prototype.specificNodesInOrder = function (values, firstIndex, secondIndex) {
        this.comparisons++;
        return values[firstIndex] < values[secondIndex];
    };
    BubbleSortConcurrent.prototype.next = function () {
        var _this = this;
        if (this.done) {
            return [];
        }
        this.steps++;
        var currentNodes = this.currentNodes().slice();
        var values = this.board.values();
        var nodes = currentNodes;
        currentNodes.forEach(function (node, index) {
            if (!_this.specificNodesInOrder(values, node, node + 1)) {
                _this.orderedSets[index] = false;
                _this.swap([node, node + 1]);
            }
        });
        this.setUpNext();
        this.trackProfile();
        return currentNodes;
    };
    BubbleSortConcurrent.title = "Bubble Sort(Concurrent 2)";
    BubbleSortConcurrent.numberConcurrent = 2;
    return BubbleSortConcurrent;
}(Bubble));
exports.BubbleSortConcurrent = BubbleSortConcurrent;
var BubbleSortConcurrent5 = (function (_super) {
    __extends(BubbleSortConcurrent5, _super);
    function BubbleSortConcurrent5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BubbleSortConcurrent5.title = "Bubble Sort(Concurrent 5)";
    BubbleSortConcurrent5.numberConcurrent = 5;
    return BubbleSortConcurrent5;
}(BubbleSortConcurrent));
exports.BubbleSortConcurrent5 = BubbleSortConcurrent5;
var BubbleSortConcurrent10 = (function (_super) {
    __extends(BubbleSortConcurrent10, _super);
    function BubbleSortConcurrent10() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BubbleSortConcurrent10.title = "Bubble Sort(Concurrent 10)";
    BubbleSortConcurrent10.numberConcurrent = 10;
    return BubbleSortConcurrent10;
}(BubbleSortConcurrent));
exports.BubbleSortConcurrent10 = BubbleSortConcurrent10;
var BubbleSortDontRestart = (function (_super) {
    __extends(BubbleSortDontRestart, _super);
    function BubbleSortDontRestart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BubbleSortDontRestart.prototype.swapValues = function (index1, index2) {
        this.looking = false;
        this.swaps++;
        var baseValue = this.board.get(this.baseNode).value;
        var newValues = this.board.values().slice();
        newValues.splice(index1, 1);
        newValues.splice(index2 - 1, 0, baseValue);
        this.board.setPoints(newValues);
        this.baseNode = Math.max(index1 - 1, 0);
        this.comparisonNode = this.baseNode + 1;
    };
    BubbleSortDontRestart.prototype.next = function () {
        if (this.done) {
            return [];
        }
        this.steps++;
        var currentNodes = this.currentNodes();
        var values = this.board.values();
        if (!this.nodesInOrder(values)) {
            this.looking = true;
            this.comparisonNode++;
            if (this.comparisonNode === this.length) {
                this.swapValues(this.baseNode, this.comparisonNode);
            }
        }
        else if (this.looking) {
            this.swapValues(this.baseNode, this.comparisonNode);
        }
        else {
            this.baseNode++;
            this.comparisonNode++;
            if (this.comparisonNode === this.length) {
                this.done = true;
            }
        }
        this.trackProfile();
        return currentNodes;
    };
    BubbleSortDontRestart.title = "Bubble(Don't restart)";
    return BubbleSortDontRestart;
}(Bubble));
exports.BubbleSortDontRestart = BubbleSortDontRestart;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseSort_1 = __webpack_require__(0);
var Cocktail = (function (_super) {
    __extends(Cocktail, _super);
    function Cocktail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cocktail.prototype.setUp = function () {
        this.start = 0;
        this.end = this.length - 1;
        this.direction = 1;
    };
    Cocktail.prototype.setUpNext = function () {
        if (this.direction) {
            if (this.comparisonNode === this.end) {
                this.placed.push(this.end);
                this.end--;
                this.baseNode--;
                this.comparisonNode--;
                this.direction = 0;
            }
            else {
                this.baseNode++;
                this.comparisonNode++;
            }
        }
        else {
            if (this.baseNode === this.start) {
                this.placed.push(this.start);
                this.direction = 1;
                this.start++;
                this.baseNode++;
                this.comparisonNode++;
            }
            else {
                this.baseNode--;
                this.comparisonNode--;
            }
        }
        if (!(this.start < this.end)) {
            this.done = true;
        }
    };
    Cocktail.title = "Cocktail Sort";
    return Cocktail;
}(baseSort_1.BaseSort));
exports.Cocktail = Cocktail;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseSort_1 = __webpack_require__(0);
var gnome_1 = __webpack_require__(4);
var Comb = (function (_super) {
    __extends(Comb, _super);
    function Comb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Comb.prototype.setUp = function () {
        this.shrink = this.constructor.shrink;
        this.gap = Math.floor(this.length / this.shrink);
        this.comparisonNode = 0 + this.gap;
    };
    Comb.prototype.setUpNext = function () {
        this.baseNode++;
        this.comparisonNode++;
        if (this.comparisonNode >= this.length) {
            if (this.ordered === true && this.gap === 1) {
                this.done = true;
            }
            this.gap = Math.max(Math.floor(this.gap / this.shrink), 1);
            this.baseNode = 0;
            this.comparisonNode = this.gap;
            this.ordered = true;
        }
    };
    // test different shrinks
    // test ceil over floor
    Comb.title = "Comb Sort";
    Comb.shrink = 1.3;
    return Comb;
}(baseSort_1.BaseSort));
exports.Comb = Comb;
var CombSmallShrink = (function (_super) {
    __extends(CombSmallShrink, _super);
    function CombSmallShrink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombSmallShrink.shrink = 1.1;
    CombSmallShrink.title = "Comb(Small Shrink: 1.1)";
    return CombSmallShrink;
}(Comb));
exports.CombSmallShrink = CombSmallShrink;
var CombLargeShrink = (function (_super) {
    __extends(CombLargeShrink, _super);
    function CombLargeShrink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombLargeShrink.shrink = 1.5;
    CombLargeShrink.title = "Comb(Large Shrink: 1.5)";
    return CombLargeShrink;
}(Comb));
exports.CombLargeShrink = CombLargeShrink;
var CombEvenLarger = (function (_super) {
    __extends(CombEvenLarger, _super);
    function CombEvenLarger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombEvenLarger.title = "Comb(Shrink: 2.0)";
    CombEvenLarger.shrink = 2.0;
    return CombEvenLarger;
}(Comb));
exports.CombEvenLarger = CombEvenLarger;
var CombGnome5 = (function (_super) {
    __extends(CombGnome5, _super);
    function CombGnome5() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gnomeSwitchValue = 5;
        return _this;
    }
    CombGnome5.prototype.setUp = function () {
        this.comb = new Comb(this.board);
        this.gnome = new gnome_1.Gnome(this.board);
    };
    CombGnome5.prototype.currentNodes = function () {
        if (this.comb.gap >= this.gnomeSwitchValue) {
            return this.comb.currentNodes();
        }
        else {
            return this.gnome.currentNodes();
        }
    };
    CombGnome5.prototype.next = function () {
        var currentNodes;
        if (this.comb.gap >= this.gnomeSwitchValue) {
            currentNodes = this.comb.currentNodes();
            this.comb.next();
        }
        else {
            this.gnome.next();
        }
        this.steps = this.comb.steps + this.gnome.steps;
        this.swaps = this.comb.swaps + this.gnome.swaps;
        this.comparisons = this.comb.comparisons + this.gnome.comparisons;
        return currentNodes;
    };
    CombGnome5.title = "Comb & Gnome(at gap 5)";
    return CombGnome5;
}(baseSort_1.BaseSort));
exports.CombGnome5 = CombGnome5;
var CombGnome3 = (function (_super) {
    __extends(CombGnome3, _super);
    function CombGnome3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gnomeSwitchValue = 3;
        return _this;
    }
    CombGnome3.title = "Comb & Gnome(at gap 3)";
    return CombGnome3;
}(CombGnome5));
exports.CombGnome3 = CombGnome3;
var CombGnome2 = (function (_super) {
    __extends(CombGnome2, _super);
    function CombGnome2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gnomeSwitchValue = 2;
        return _this;
    }
    CombGnome2.title = "Comb & Gnome(at gap 2)";
    return CombGnome2;
}(CombGnome5));
exports.CombGnome2 = CombGnome2;
var CombGnome10 = (function (_super) {
    __extends(CombGnome10, _super);
    function CombGnome10() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gnomeSwitchValue = 10;
        return _this;
    }
    CombGnome10.title = "Comb & Gnome(at gap 10)";
    return CombGnome10;
}(CombGnome5));
exports.CombGnome10 = CombGnome10;
var CombGnomeLargeShrink5 = (function (_super) {
    __extends(CombGnomeLargeShrink5, _super);
    function CombGnomeLargeShrink5() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gnomeSwitchValue = 5;
        return _this;
    }
    CombGnomeLargeShrink5.prototype.setUp = function () {
        this.comb = new CombEvenLarger(this.board);
        this.gnome = new gnome_1.Gnome(this.board);
    };
    CombGnomeLargeShrink5.title = "Comb & Gnome(gap 5, shrink 2)";
    return CombGnomeLargeShrink5;
}(CombGnome5));
exports.CombGnomeLargeShrink5 = CombGnomeLargeShrink5;
var CombGnomeLargeShrink2 = (function (_super) {
    __extends(CombGnomeLargeShrink2, _super);
    function CombGnomeLargeShrink2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gnomeSwitchValue = 2;
        return _this;
    }
    CombGnomeLargeShrink2.prototype.setUp = function () {
        this.comb = new CombEvenLarger(this.board);
        this.gnome = new gnome_1.Gnome(this.board);
    };
    CombGnomeLargeShrink2.title = "Comb & Gnome(gap 2, shrink 2)";
    return CombGnomeLargeShrink2;
}(CombGnomeLargeShrink5));
exports.CombGnomeLargeShrink2 = CombGnomeLargeShrink2;
var CombGnomeLargeShrink3 = (function (_super) {
    __extends(CombGnomeLargeShrink3, _super);
    function CombGnomeLargeShrink3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gnomeSwitchValue = 3;
        return _this;
    }
    CombGnomeLargeShrink3.prototype.setUp = function () {
        this.comb = new CombEvenLarger(this.board);
        this.gnome = new gnome_1.Gnome(this.board);
    };
    CombGnomeLargeShrink3.title = "Comb & Gnome(gap 3, shrink 2)";
    return CombGnomeLargeShrink3;
}(CombGnomeLargeShrink5));
exports.CombGnomeLargeShrink3 = CombGnomeLargeShrink3;
var CombGnomeLargeShrink10 = (function (_super) {
    __extends(CombGnomeLargeShrink10, _super);
    function CombGnomeLargeShrink10() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gnomeSwitchValue = 10;
        return _this;
    }
    CombGnomeLargeShrink10.prototype.setUp = function () {
        this.comb = new CombEvenLarger(this.board);
        this.gnome = new gnome_1.Gnome(this.board);
    };
    CombGnomeLargeShrink10.title = "Comb & Gnome(gap 10, shrink 2)";
    return CombGnomeLargeShrink10;
}(CombGnomeLargeShrink5));
exports.CombGnomeLargeShrink10 = CombGnomeLargeShrink10;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseSort_1 = __webpack_require__(0);
var Cycle = (function (_super) {
    __extends(Cycle, _super);
    function Cycle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cycle.prototype.setUp = function () {
        this.setCurrentValue(this.baseNode);
        this.numberLess = 0;
    };
    Cycle.prototype.currentNodes = function () {
        return [this.comparisonNode];
    };
    Cycle.prototype.setCurrentValue = function (index) {
        this.currentValue = this.board.values()[index];
        this.shadow = [{ index: this.baseNode, value: this.currentValue }];
    };
    Cycle.prototype.next = function () {
        if (this.done) {
            return [];
        }
        this.steps++;
        var currentNodes = Array.prototype.range(this.length);
        var values = this.board.values();
        this.lesserThanComparison(values);
        this.setUpNext();
        return currentNodes;
    };
    Cycle.prototype.lesserThanComparison = function (values) {
        this.comparisons++;
        if (this.currentValue > values[this.comparisonNode]) {
            this.numberLess++;
        }
    };
    Cycle.prototype.setUpNext = function () {
        var index = this.numberLess + this.baseNode;
        this.comparisonNode++;
        if (this.comparisonNode === this.baseNode) {
            this.comparisonNode++;
        }
        if (this.comparisonNode === this.length) {
            if (index !== this.baseNode ||
                this.currentValue !== this.board.values()[this.baseNode]) {
                var values = this.board.values();
                while (values[index] === this.currentValue) {
                    index++;
                }
                var oldValue = this.currentValue;
                this.setCurrentValue(index);
                this.board.set(index, oldValue);
                this.swaps++;
            }
            if (this.baseNode === index) {
                this.placed.push(this.baseNode);
                this.baseNode++;
                this.setCurrentValue(this.baseNode);
            }
            this.comparisonNode = this.baseNode + 1;
            this.numberLess = 0;
            if (this.baseNode === this.length - 1) {
                this.done = true;
            }
        }
    };
    Cycle.title = "Cycle Sort";
    Cycle.links = [
        {
            url: 'https://corte.si/posts/code/cyclesort/index.html',
            name: 'Cyclesort - a curious little sorting algorithm'
        }
    ];
    return Cycle;
}(baseSort_1.BaseSort));
exports.Cycle = Cycle;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseSort_1 = __webpack_require__(0);
var Heap = (function (_super) {
    __extends(Heap, _super);
    function Heap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Heap.prototype.setUp = function () {
        this.nodesToHeap = [];
        var heapIndex = Math.floor(this.length / 2) - 1;
        for (var i = heapIndex; i >= 0; i--) {
            this.nodesToHeap.push(i);
        }
        this.comparisonNode = this.length - 1;
    };
    Heap.prototype.currentNodes = function () {
        if (this.done) {
            return [];
        }
        if (this.nodesToHeap.length) {
            return [this.nodesToHeap[0]];
        }
        else {
            return [0];
        }
    };
    Heap.prototype.heapify = function (node) {
        var values = this.board.values();
        var comparison = values[node];
        var leftChild = (2 * node) + 1;
        var rightChild = (2 * node) + 2;
        var left = leftChild <= this.comparisonNode && values[leftChild];
        var right = rightChild <= this.comparisonNode && values[rightChild];
        var swapNode;
        this.comparisons += 2;
        if (((left || left === 0) && left > comparison) || ((right || right === 0) && right > comparison)) {
            this.comparisons++;
            if ((right || right === 0) && right > left) {
                swapNode = rightChild;
            }
            else {
                swapNode = leftChild;
            }
            this.swap([node, swapNode]);
            var possibleChild = (2 * swapNode) + 1;
            if (possibleChild <= this.comparisonNode) {
                this.nodesToHeap.unshift(swapNode);
            }
        }
    };
    Heap.prototype.removeNode = function () {
        this.swap([0, this.comparisonNode]);
        this.placed.push(this.comparisonNode);
        this.nodesToHeap.unshift(0);
        this.comparisonNode--;
    };
    Heap.prototype.next = function () {
        if (this.done) {
            return [];
        }
        this.steps++;
        var currentNodes = [];
        if (this.nodesToHeap.length) {
            var node = this.nodesToHeap.shift();
            currentNodes.push(node);
            this.heapify(node);
        }
        else {
            this.removeNode();
        }
        if (this.comparisonNode === 0) {
            this.done = true;
        }
        return currentNodes;
    };
    Heap.title = "Heap Sort";
    return Heap;
}(baseSort_1.BaseSort));
exports.Heap = Heap;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseSort_1 = __webpack_require__(0);
var Insertion = (function (_super) {
    __extends(Insertion, _super);
    function Insertion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.insertValue = null;
        return _this;
    }
    Insertion.prototype.setUp = function () {
        this.baseNode = 1;
    };
    Insertion.prototype.currentNodes = function () {
        if (this.done) {
            return [];
        }
        var nodes = [this.baseNode];
        if (this.comparisonNode >= 0) {
            nodes.push(this.comparisonNode);
        }
        return nodes;
    };
    Insertion.prototype.next = function () {
        if (this.done) {
            return [];
        }
        this.steps++;
        if (this.insertValue === null) {
            this.insertValue = this.board.values()[this.baseNode];
            this.shadow = [{ index: this.baseNode, value: this.insertValue }];
            this.comparisonNode = this.baseNode - 1;
        }
        var nodes = [this.baseNode];
        this.comparisons++;
        if (this.insertValue < this.board.values()[this.comparisonNode]) {
            nodes = [this.comparisonNode, this.baseNode];
            this.swaps += 0.5;
            this.board.set(this.comparisonNode + 1, this.board.values()[this.comparisonNode]);
            this.comparisonNode--;
        }
        else {
            if (this.comparisonNode + 1 !== this.baseNode) {
                nodes = [this.comparisonNode + 1];
                this.swaps += 0.5;
                this.board.set(this.comparisonNode + 1, this.insertValue);
            }
            this.baseNode++;
            this.insertValue = null;
        }
        if (this.baseNode === this.length) {
            this.done = true;
        }
        return nodes;
    };
    Insertion.title = "Insertion Sort";
    return Insertion;
}(baseSort_1.BaseSort));
exports.Insertion = Insertion;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseSort_1 = __webpack_require__(0);
var OddEven = (function (_super) {
    __extends(OddEven, _super);
    function OddEven() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OddEven.prototype.setUp = function () {
        this.oddPhase = true;
        this.oddSorted = false;
        this.evenSorted = false;
        this.setUpLists();
        this.baseNode = this.baseNodes.shift();
        this.comparisonNode = this.baseNode + 1;
    };
    OddEven.prototype.setUpLists = function () {
        this.baseNodes = [];
        if (this.oddPhase) {
            for (var i = 1; i < this.length - 1; i += 2) {
                this.baseNodes.push(i);
            }
        }
        else {
            for (var i = 0; i < this.length - 1; i += 2) {
                this.baseNodes.push(i);
            }
        }
    };
    OddEven.prototype.swap = function () {
        _super.prototype.swap.call(this, [this.baseNode, this.comparisonNode]);
    };
    OddEven.prototype.setUpNext = function () {
        if (!this.baseNodes.length) {
            if (this.ordered) {
                if (this.oddPhase) {
                    this.oddSorted = true;
                }
                else {
                    this.evenSorted = true;
                }
            }
            else {
                this.oddSorted = false;
                this.evenSorted = false;
            }
            if (this.evenSorted && this.oddSorted) {
                this.done = true;
                return;
            }
            this.oddPhase = !this.oddPhase;
            this.setUpLists();
            this.ordered = true;
        }
        this.baseNode = this.baseNodes.shift();
        this.comparisonNode = this.baseNode + 1;
    };
    OddEven.prototype.currentNodes = function () {
        if (this.baseNode !== undefined) {
            return [this.baseNode].concat(this.baseNodes);
        }
        return this.baseNodes;
    };
    OddEven.title = "Odd Even(Single Processor)";
    return OddEven;
}(baseSort_1.BaseSort));
exports.OddEven = OddEven;
var OddEvenConcurrent = (function (_super) {
    __extends(OddEvenConcurrent, _super);
    function OddEvenConcurrent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OddEvenConcurrent.prototype.next = function () {
        if (this.done) {
            return [];
        }
        this.steps++;
        var currentNodes = this.currentNodes();
        var values = this.board.values();
        while (this.baseNode !== undefined) {
            if (!this.nodesInOrder(values)) {
                this.swap();
            }
            this.baseNode = this.baseNodes.shift();
            if (this.baseNode) {
                this.comparisonNode = this.baseNode + 1;
            }
        }
        this.setUpNext();
        this.trackProfile();
        return currentNodes;
    };
    OddEvenConcurrent.title = "Odd Even(Concurrent)";
    return OddEvenConcurrent;
}(OddEven));
exports.OddEvenConcurrent = OddEvenConcurrent;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseSort_1 = __webpack_require__(0);
var QuickSort2 = (function (_super) {
    __extends(QuickSort2, _super);
    function QuickSort2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.threeWay = false;
        return _this;
    }
    QuickSort2.prototype.setUp = function () {
        this.addToUpdate = [];
        this.partitions = [];
        this.setUpValues([this.baseNode, this.length - 1]);
    };
    QuickSort2.prototype.setUpValues = function (values) {
        this.lower = values[0];
        this.higher = values[0];
        this.partitionStart = values[0];
        this.partitionEnd = values[1];
        this.setPartition();
        this.partitionTop = this.partition;
    };
    QuickSort2.prototype.currentNodes = function () {
        var nodes = [];
        if (this.partition !== this.lower) {
            nodes.push(this.lower);
        }
        nodes.push(this.partition);
        if (this.partition !== this.higher) {
            nodes.push(this.higher);
        }
        return nodes;
    };
    QuickSort2.prototype.setUpNext = function () {
        // if higher is at the end of the current partition
        if (this.higher === this.partitionEnd) {
            if (this.threeWay) {
                for (var i = this.partition; i <= this.partitionTop; i++) {
                    this.placed.push(i);
                }
            }
            else {
                this.placed.push(this.partition);
            }
            var partitions = this.partitions;
            var topLow = void 0;
            if (this.threeWay) {
                topLow = this.partitionTop;
            }
            else {
                topLow = this.partition;
            }
            if (this.higher > topLow + 1) {
                partitions.unshift([topLow + 1, this.higher]);
            }
            if (this.lower < this.partition - 1) {
                partitions.unshift([this.lower, this.partition - 1]);
            }
            if (partitions.length) {
                var newPartition = partitions.shift();
                this.setUpValues(newPartition);
            }
            else {
                this.done = true;
                return [];
            }
        }
    };
    QuickSort2.prototype.setPartition = function () {
        this.partition = this.lower;
    };
    QuickSort2.prototype.next = function () {
        if (this.done) {
            return [];
        }
        this.steps++;
        var valuesToUpdate = [];
        // look at the next value
        this.higher++;
        var values = this.board.values();
        this.comparisons++;
        var threeWay = this.threeWay && values[this.higher] === values[this.partition];
        if (values[this.higher] < values[this.partition] || threeWay) {
            // if the value at higher is less than the partition
            this.swaps++;
            var temp = values.splice(this.higher, 1)[0];
            values.splice(this.partition, 0, temp);
            this.board.setPoints(values);
            if (threeWay) {
                this.partitionTop++;
            }
            else {
                this.partition++;
                this.partitionTop++;
            }
            for (var i = this.partition - 1; i <= this.higher; i++) {
                if (i >= 0) {
                    valuesToUpdate.push(i);
                }
            }
        }
        if (this.addToUpdate.length) {
            this.addToUpdate.forEach(function (index) {
                if (valuesToUpdate.indexOf(index) === -1) {
                    valuesToUpdate.push(index);
                }
            });
            this.addToUpdate = [];
        }
        this.setUpNext();
        return valuesToUpdate;
    };
    QuickSort2.title = "Quick Sort(Left Partition)";
    return QuickSort2;
}(baseSort_1.BaseSort));
exports.QuickSort2 = QuickSort2;
var QuickSort2RightPartition = (function (_super) {
    __extends(QuickSort2RightPartition, _super);
    function QuickSort2RightPartition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuickSort2RightPartition.prototype.setPartition = function () {
        this.partition = this.lower;
        var temp = this.board.get(this.partitionEnd).value;
        this.board.set(this.partitionEnd, this.board.get(this.partition).value);
        this.board.set(this.partition, temp);
        this.addToUpdate = [this.lower, this.partitionEnd];
    };
    QuickSort2RightPartition.title = "Quick Sort(Right Partition)";
    return QuickSort2RightPartition;
}(QuickSort2));
exports.QuickSort2RightPartition = QuickSort2RightPartition;
var QuickSort2Random = (function (_super) {
    __extends(QuickSort2Random, _super);
    function QuickSort2Random() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuickSort2Random.prototype.setPartition = function () {
        var diff = this.partitionEnd - this.partitionStart + 1;
        var index = this.partitionStart + Math.floor(Math.random() * diff);
        this.partition = this.lower;
        var temp = this.board.get(index).value;
        this.board.set(index, this.board.get(this.partition).value);
        this.board.set(this.partition, temp);
        this.addToUpdate = [this.lower, index];
    };
    QuickSort2Random.title = "Quick Sort(Random Partition)";
    return QuickSort2Random;
}(QuickSort2));
exports.QuickSort2Random = QuickSort2Random;
var QuickSort3 = (function (_super) {
    __extends(QuickSort3, _super);
    function QuickSort3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.threeWay = true;
        return _this;
    }
    QuickSort3.title = "Quick Sort 3(Left Partition)";
    return QuickSort3;
}(QuickSort2));
exports.QuickSort3 = QuickSort3;
var QuickSort3RightPartition = (function (_super) {
    __extends(QuickSort3RightPartition, _super);
    function QuickSort3RightPartition() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.threeWay = true;
        return _this;
    }
    QuickSort3RightPartition.title = "Quick Sort 3(Right Partition)";
    return QuickSort3RightPartition;
}(QuickSort2RightPartition));
exports.QuickSort3RightPartition = QuickSort3RightPartition;
var QuickSort3Random = (function (_super) {
    __extends(QuickSort3Random, _super);
    function QuickSort3Random() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.threeWay = true;
        return _this;
    }
    QuickSort3Random.title = "Quick Sort 3(Random Partition)";
    return QuickSort3Random;
}(QuickSort2Random));
exports.QuickSort3Random = QuickSort3Random;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseSort_1 = __webpack_require__(0);
var SelectionSort = (function (_super) {
    __extends(SelectionSort, _super);
    function SelectionSort() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionSort.prototype.setUp = function () {
        this.baseIndex = 0;
    };
    SelectionSort.prototype.setUpNext = function () {
        this.comparisonNode++;
        if (this.comparisonNode === this.length) {
            if (this.baseNode !== this.baseIndex) {
                this.swap([this.baseNode, this.baseIndex]);
            }
            this.baseIndex++;
            this.baseNode = this.baseIndex;
            this.comparisonNode = this.baseNode + 1;
            if (this.baseNode === this.length - 1) {
                this.done = true;
            }
        }
    };
    SelectionSort.prototype.next = function () {
        if (this.done) {
            return [];
        }
        this.steps++;
        var currentNodes = this.currentNodes();
        var values = this.board.values();
        if (!this.nodesInOrder(values)) {
            this.baseNode = this.comparisonNode;
        }
        this.setUpNext();
        return currentNodes;
    };
    SelectionSort.title = "Selection Sort";
    return SelectionSort;
}(baseSort_1.BaseSort));
exports.SelectionSort = SelectionSort;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseSort_1 = __webpack_require__(0);
var Smooth = (function (_super) {
    __extends(Smooth, _super);
    function Smooth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Smooth.prototype.setUp = function () {
        this.leonardoNumbers = [];
        this.nodesToHeap = [];
        this.rootsToCompare = [];
        this.roots = [];
        this.treeSizes = [];
        this.fromBottom = this.constructor.fromBottom;
        this.setUpNumbers(this.fromBottom);
    };
    Smooth.prototype.setUpNumbers = function (fromBottom) {
        this.leonardoNumbers = this.getLeoNums(this.length);
        if (!fromBottom) {
            this.treeSizes = this.getTreeSizes(this.length);
        }
    };
    Smooth.prototype.getLeoNums = function (length) {
        var numbers = [1, 1];
        while (true) {
            var nextNum = numbers[numbers.length - 1] + numbers[numbers.length - 2] + 1;
            if (nextNum >= this.length) {
                break;
            }
            numbers.push(nextNum);
        }
        return numbers;
    };
    Smooth.prototype.getTreeSizes = function (length) {
        var numbers = [];
        for (var i = 0; i < length; i++) {
            var sub1 = numbers[i - 1];
            var sub2 = numbers[i - 1 - sub1];
            if (this.leonardoNumbers.indexOf(sub1 + sub2 + 1) !== -1) {
                numbers.push(sub1 + sub2 + 1);
                this.roots.splice(this.roots.length - 2, 2, i);
                if (!this.fromBottom) {
                    this.nodesToHeap.push(i);
                }
            }
            else {
                numbers.push(1);
                this.roots.push(i);
            }
        }
        this.rootsToCompare = this.roots.slice();
        return numbers;
    };
    Smooth.prototype.currentNodes = function () {
        if (this.done) {
            return [];
        }
        var nodes;
        if (this.nodesToHeap.length) {
            return [this.nodesToHeap[0]];
        }
        else if (this.rootsToCompare.length) {
            return [this.rootsToCompare[0]];
        }
        else {
            return [this.roots[this.roots.length - 1]];
        }
    };
    Smooth.prototype.next = function () {
        if (this.done) {
            return [];
        }
        this.steps++;
        var nodes;
        if (this.nodesToHeap.length) {
            nodes = this.heapify(this.nodesToHeap.shift());
        }
        else if (this.rootsToCompare.length) {
            nodes = this.compare(this.rootsToCompare);
        }
        else if (this.fromBottom && this.baseNode < this.length) {
            nodes = this.addNextNode(this.baseNode);
            this.baseNode++;
        }
        else {
            nodes = this.remove(this.roots.pop());
        }
        if (!this.roots.length && !(this.fromBottom && this.baseNode < this.length)) {
            this.done = true;
        }
        return nodes;
    };
    Smooth.prototype.addNextNode = function (index) {
        var _a = this.getChildren(index), sub1 = _a[0], sub2 = _a[1];
        var nodes;
        if (sub2 < 0) {
            // there is only sub 1
            this.roots.push(index);
            nodes = this.compare(this.roots.slice());
            this.treeSizes.push(1);
        }
        else if (this.leonardoNumbers.indexOf(1 + this.treeSizes[sub1] + this.treeSizes[sub2]) !== -1) {
            // combine trees
            nodes = this.heapify(index);
            this.roots.splice(this.roots.length - 2, 2, index);
            this.treeSizes.push(1 + this.treeSizes[sub1] + this.treeSizes[sub2]);
        }
        else {
            // we are adding a tree
            this.treeSizes.push(1);
            this.roots.push(index);
            nodes = this.compare(this.roots.slice());
        }
        return nodes;
    };
    Smooth.prototype.compare = function (nodes) {
        var current = nodes.slice();
        var endpoint = nodes[nodes.length - 1];
        var maxNode = nodes[0];
        var values = this.board.values();
        for (var i = 1; i < nodes.length; i++) {
            this.comparisons++;
            if (values[maxNode] < values[nodes[i]]) {
                maxNode = nodes[i];
            }
        }
        if (maxNode !== endpoint) {
            this.swap([maxNode, endpoint]);
            if (this.treeSizes[maxNode] > 1) {
                this.nodesToHeap.push(maxNode);
            }
        }
        if (nodes.length > 2) {
            var pickedIndex = nodes.indexOf(maxNode);
            nodes.splice(nodes.length - 1, 1);
            this.rootsToCompare = nodes;
        }
        else {
            this.rootsToCompare = [];
        }
        return current;
    };
    Smooth.prototype.remove = function (index) {
        var nodes = [index];
        if (this.treeSizes[index] > 1) {
            var _a = this.getChildren(index), sub1 = _a[0], sub2 = _a[1];
            var prevRoot = void 0;
            this.roots.push(sub2);
            this.roots.push(sub1);
            this.rootsToCompare = this.roots.slice();
        }
        this.placed.push(index);
        return nodes;
    };
    Smooth.prototype.getChildren = function (index) {
        var sub1 = index - 1;
        var sub2 = sub1 - this.treeSizes[sub1];
        return [sub1, sub2];
    };
    Smooth.prototype.heapify = function (index) {
        var nodes = [index];
        var _a = this.getChildren(index), sub1 = _a[0], sub2 = _a[1];
        this.comparisons += 2;
        var values = this.board.values();
        if (values[index] < values[sub1] || values[index] < values[sub2]) {
            this.comparisons++;
            var high = values[sub2] > values[sub1] ? sub2 : sub1;
            this.swap([index, high]);
            nodes = [index, high];
            if (this.treeSizes[high] > 1) {
                this.nodesToHeap.unshift(high);
            }
        }
        return nodes;
    };
    Smooth.title = "Smooth Sort";
    Smooth.links = [
        {
            url: 'http://scidok.sulb.uni-saarland.de/volltexte/2011/4062/pdf/fb14_1982_11.pdf',
            name: "Smoothsort's Behavior on Presorted Sequences"
        }
    ];
    Smooth.fromBottom = false;
    return Smooth;
}(baseSort_1.BaseSort));
exports.Smooth = Smooth;
var SmoothSetUpBottom = (function (_super) {
    __extends(SmoothSetUpBottom, _super);
    function SmoothSetUpBottom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmoothSetUpBottom.prototype.setUp = function () {
        _super.prototype.setUp.call(this);
        this.baseNode = 1;
        this.treeSizes = [1];
        this.roots = [0];
    };
    SmoothSetUpBottom.title = 'Smooth Sort(Set up from bottom)';
    SmoothSetUpBottom.fromBottom = true;
    return SmoothSetUpBottom;
}(Smooth));
exports.SmoothSetUpBottom = SmoothSetUpBottom;


/***/ }),
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Sizes = __webpack_require__(6);
var Shuffles = __webpack_require__(1);
var Index = __webpack_require__(7);
var ValueTypes = __webpack_require__(3);
var Sorts = __webpack_require__(8);
var Boards = __webpack_require__(2);
var Points = __webpack_require__(5);
window.Sizes = Sizes;
window.Shuffles = Shuffles;
window.Index = Index;
window.ValueTypes = ValueTypes;
window.Sorts = Sorts;
window.Boards = Boards;
window.Points = Points;


/***/ })
/******/ ]);