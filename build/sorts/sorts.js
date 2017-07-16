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
    Sorts.Bubble = Bubble;
    Bubble.title = "Bubble(Short Circuit)";
    var BubbleNonOptimized = (function (_super) {
        __extends(BubbleNonOptimized, _super);
        function BubbleNonOptimized() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.shortCircuit = false;
            return _this;
        }
        return BubbleNonOptimized;
    }(Bubble));
    Sorts.BubbleNonOptimized = BubbleNonOptimized;
    BubbleNonOptimized.title = 'Bubble Sort';
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
    Sorts.BubbleSkipsSorted = BubbleSkipsSorted;
    BubbleSkipsSorted.title = "Bubble(Short Circuit & Skip Sorted)";
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
    Sorts.BubbleSkipNoShortCircuit = BubbleSkipNoShortCircuit;
    BubbleSkipNoShortCircuit.title = "Bubble(Skip Sorted)";
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
    Sorts.Cocktail = Cocktail;
    Cocktail.title = "Cocktail Sort";
    var Comb = (function (_super) {
        __extends(Comb, _super);
        function Comb(board) {
            var _this = _super.call(this, board) || this;
            _this.board = board;
            // test different shrinks
            // test ceil over floor
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
    Sorts.Comb = Comb;
    Comb.title = "Comb Sort";
    Sorts.sortList = [
        BubbleNonOptimized,
        Bubble,
        BubbleSkipNoShortCircuit,
        BubbleSkipsSorted,
        Cocktail,
        Comb
    ];
})(Sorts || (Sorts = {}));
