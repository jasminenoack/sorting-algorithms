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
var Sorts;
(function (Sorts) {
    var BaseSort = (function () {
        function BaseSort(board) {
            this.board = board;
            this.steps = 0;
            // used for sorts that short circuit
            this.done = false;
            // used for sorts that short circuit
            this.ordered = true;
            this.comparisons = 0;
            this.swaps = 0;
            this.length = board.length;
            this.baseNode = 0;
            this.comparisonNode = 1;
            this.end = this.length - 1;
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
            return currentNodes;
        };
        return BaseSort;
    }());
    var Bubble = (function (_super) {
        __extends(Bubble, _super);
        function Bubble(board) {
            var _this = _super.call(this, board) || this;
            _this.ordered = true;
            _this.skipSorted = false;
            _this.shortCircuit = true;
            _this.maxRounds = _this.length;
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
        return Bubble;
    }(BaseSort));
    Bubble.title = "Bubble(Short Circuit)";
    Sorts.Bubble = Bubble;
    var BubbleNonOptimized = (function (_super) {
        __extends(BubbleNonOptimized, _super);
        function BubbleNonOptimized() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shortCircuit = false;
            return _this;
        }
        return BubbleNonOptimized;
    }(Bubble));
    BubbleNonOptimized.title = 'Bubble Sort';
    Sorts.BubbleNonOptimized = BubbleNonOptimized;
    var BubbleSkipsSorted = (function (_super) {
        __extends(BubbleSkipsSorted, _super);
        function BubbleSkipsSorted() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ordered = true;
            _this.skipSorted = true;
            return _this;
        }
        return BubbleSkipsSorted;
    }(Bubble));
    BubbleSkipsSorted.title = "Bubble(Short Circuit & Skip Sorted)";
    Sorts.BubbleSkipsSorted = BubbleSkipsSorted;
    var BubbleSkipNoShortCircuit = (function (_super) {
        __extends(BubbleSkipNoShortCircuit, _super);
        function BubbleSkipNoShortCircuit() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.skipSorted = true;
            _this.shortCircuit = false;
            return _this;
        }
        return BubbleSkipNoShortCircuit;
    }(Bubble));
    BubbleSkipNoShortCircuit.title = "Bubble(Skip Sorted)";
    Sorts.BubbleSkipNoShortCircuit = BubbleSkipNoShortCircuit;
    var Cocktail = (function (_super) {
        __extends(Cocktail, _super);
        function Cocktail(board) {
            var _this = _super.call(this, board) || this;
            _this.board = board;
            // is there a way to respect sorted sections?
            _this.direction = 1;
            // we start this at 1, because we want to stop at 1, when we
            // come back down
            _this.start = 0;
            _this.end = _this.length - 1;
            return _this;
        }
        Cocktail.prototype.setUpNext = function () {
            if (this.direction) {
                if (this.comparisonNode === this.end) {
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
        return Cocktail;
    }(BaseSort));
    Cocktail.title = "Cocktail Sort";
    Sorts.Cocktail = Cocktail;
    var Comb = (function (_super) {
        __extends(Comb, _super);
        function Comb(board) {
            var _this = _super.call(this, board) || this;
            _this.board = board;
            _this.shrink = 1.3;
            // we start this at 1, because we want to stop at 1, when we
            // come back down
            _this.gap = Math.floor(_this.length / 1.3);
            _this.comparisonNode = 0 + _this.gap;
            return _this;
        }
        Comb.prototype.setUpNext = function () {
            this.baseNode++;
            this.comparisonNode++;
            if (this.comparisonNode >= this.length) {
                if (this.ordered === true && this.gap === 1) {
                    this.done = true;
                }
                this.gap = Math.max(Math.floor(this.gap / 1.3), 1);
                this.baseNode = 0;
                this.comparisonNode = this.gap;
                this.ordered = true;
            }
        };
        return Comb;
    }(BaseSort));
    // test different shrinks
    // test ceil over floor
    Comb.title = "Comb Sort";
    Sorts.Comb = Comb;
    var Bogo = (function (_super) {
        __extends(Bogo, _super);
        function Bogo(board) {
            var _this = _super.call(this, board) || this;
            _this.checkSorted();
            return _this;
        }
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
        return Bogo;
    }(BaseSort));
    Bogo.title = 'Bogo';
    Sorts.Bogo = Bogo;
    var BogoSingle = (function (_super) {
        __extends(BogoSingle, _super);
        function BogoSingle(board) {
            var _this = _super.call(this, board) || this;
            _this.checkSorted();
            _this.setUpNext();
            return _this;
        }
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
        return BogoSingle;
    }(BaseSort));
    BogoSingle.title = "Bogo(Single Swap)";
    Sorts.BogoSingle = BogoSingle;
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
        return BogoSingleCompare;
    }(BogoSingle));
    BogoSingleCompare.title = 'Bogo(Compare & Single Swap)';
    Sorts.BogoSingleCompare = BogoSingleCompare;
    Sorts.sortList = [
        Bogo,
        BogoSingle,
        BogoSingleCompare,
        BubbleNonOptimized,
        Bubble,
        BubbleSkipNoShortCircuit,
        BubbleSkipsSorted,
        Cocktail,
        Comb
    ];
})(Sorts || (Sorts = {}));
