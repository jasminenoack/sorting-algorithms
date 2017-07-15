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
            this.done = false;
            this.ordered = true;
            this.comparisons = 0;
            this.swaps = 0;
            this.length = board.length;
            this.baseNode = 0;
            this.comparisonNode = 1;
        }
        BaseSort.prototype.currentNodes = function () {
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
        return BaseSort;
    }());
    var Bubble = (function (_super) {
        __extends(Bubble, _super);
        function Bubble() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Bubble.prototype.setUpNext = function () {
            this.baseNode++;
            this.comparisonNode++;
            if (this.comparisonNode == this.length) {
                if (this.ordered) {
                    this.done = true;
                }
                else {
                    this.ordered = true;
                }
                this.baseNode = 0;
                this.comparisonNode = 1;
            }
        };
        Bubble.prototype.next = function () {
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
        return Bubble;
    }(BaseSort));
    Sorts.Bubble = Bubble;
    Bubble.title = "Bubble Sort";
    Sorts.sortList = [
        Bubble
    ];
})(Sorts || (Sorts = {}));
