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
            this.placed = [];
            this.shadow = [];
            this.lastSwapped = false;
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
            return currentNodes;
        };
        return BaseSort;
    }());
    /*
        -- Abacus sort

        -- American Flag Sort

        -- Batcher Odd Even Merge Sort

        -- Bead Sort

        -- Binary Insertion Sort

        -- Binary Tree Sort

        -- Bitonic sorter

        -- Block Sort

        -- Block Merge Sort
    */
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
    /*
        -- fast bogo sort (https://xkcd.com/1185/)

        -- Bogobogo sort

        -- bozo sort
    */
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
    /*
        -- Bucket Sort

        -- Burst Sort

        -- caresian tree sort

        -- cascade merge sort

        -- cata sort
    */
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
            _this.gap = Math.floor(_this.length / _this.shrink);
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
                this.gap = Math.max(Math.floor(this.gap / this.shrink), 1);
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
    var CombSmallShrink = (function (_super) {
        __extends(CombSmallShrink, _super);
        function CombSmallShrink(board) {
            var _this = _super.call(this, board) || this;
            _this.board = board;
            _this.shrink = 1.1;
            // we start this at 1, because we want to stop at 1, when we
            // come back down
            _this.gap = Math.floor(_this.length / _this.shrink);
            _this.comparisonNode = 0 + _this.gap;
            return _this;
        }
        return CombSmallShrink;
    }(Comb));
    CombSmallShrink.title = "Comb(Small Shrink: 1.1)";
    Sorts.CombSmallShrink = CombSmallShrink;
    var CombLargeShrink = (function (_super) {
        __extends(CombLargeShrink, _super);
        function CombLargeShrink(board) {
            var _this = _super.call(this, board) || this;
            _this.board = board;
            _this.shrink = 1.5;
            // we start this at 1, because we want to stop at 1, when we
            // come back down
            _this.gap = Math.floor(_this.length / _this.shrink);
            _this.comparisonNode = 0 + _this.gap;
            return _this;
        }
        return CombLargeShrink;
    }(Comb));
    CombLargeShrink.title = "Comb(Large Shrink: 1.5)";
    Sorts.CombLargeShrink = CombLargeShrink;
    var CombEvenLarger = (function (_super) {
        __extends(CombEvenLarger, _super);
        function CombEvenLarger(board) {
            var _this = _super.call(this, board) || this;
            _this.board = board;
            _this.shrink = 2.0;
            // we start this at 1, because we want to stop at 1, when we
            // come back down
            _this.gap = Math.floor(_this.length / _this.shrink);
            _this.comparisonNode = 0 + _this.gap;
            return _this;
        }
        return CombEvenLarger;
    }(Comb));
    CombEvenLarger.title = "Comb(Shrink: 2.0)";
    Sorts.CombEvenLarger = CombEvenLarger;
    /*
        -- committee sort

        -- Conway sort

        -- Counting sort

        -- cube sort
    */
    var Cycle = (function (_super) {
        __extends(Cycle, _super);
        function Cycle(board) {
            var _this = _super.call(this, board) || this;
            _this.numberLess = 0;
            _this.setCurrentValue(_this.baseNode);
            return _this;
        }
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
        return Cycle;
    }(BaseSort));
    Cycle.title = "Cycle Sort";
    Sorts.Cycle = Cycle;
    /*
        -- demonsort

        -- diamondsort

        -- dropsort

        -- flash sort

        -- Franceschini-Muthukrishnan-Pătrașcu algorithm
    */
    var Gnome = (function (_super) {
        __extends(Gnome, _super);
        function Gnome() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.currentGnome = 1;
            return _this;
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
        return Gnome;
    }(BaseSort));
    Gnome.title = "Gnome Sort";
    Sorts.Gnome = Gnome;
    /*

        -- gravity sort

        -- half hearted merge sort (https://xkcd.com/1185/)

        -- han's algorithm

        -- hanoi sort

        -- heap sort

        -- Insertion sort

        -- intelligent design sort

        -- internet sort

        -- Introsort

        -- jingle sort

        -- job interview quicksort (https://xkcd.com/1185/)

        -- Library sort

        -- merge sort

        -- 3-way merge sort

        -- miracle sort

        odd even

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

        -- radix sort (lsd, msd)

        -- rolling ball sort

        -- quantum bogo sort
    */
    var QuickSort2 = (function (_super) {
        __extends(QuickSort2, _super);
        function QuickSort2(board) {
            var _this = _super.call(this, board) || this;
            _this.addToUpdate = [];
            _this.partitions = [];
            _this.threeWay = false;
            _this.setUpValues([_this.baseNode, _this.length - 1]);
            return _this;
        }
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
        return QuickSort2;
    }(BaseSort));
    QuickSort2.title = "Quick Sort(Left Partition)";
    Sorts.QuickSort2 = QuickSort2;
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
        return QuickSort2RightPartition;
    }(QuickSort2));
    QuickSort2RightPartition.title = "Quick Sort(Right Partition)";
    Sorts.QuickSort2RightPartition = QuickSort2RightPartition;
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
        return QuickSort2Random;
    }(QuickSort2));
    QuickSort2Random.title = "Quick Sort(Random Partition)";
    Sorts.QuickSort2Random = QuickSort2Random;
    var QuickSort3 = (function (_super) {
        __extends(QuickSort3, _super);
        function QuickSort3() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.threeWay = true;
            return _this;
        }
        return QuickSort3;
    }(QuickSort2));
    QuickSort3.title = "Quick Sort 3(Left Partition)";
    Sorts.QuickSort3 = QuickSort3;
    var QuickSort3RightPartition = (function (_super) {
        __extends(QuickSort3RightPartition, _super);
        function QuickSort3RightPartition() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.threeWay = true;
            return _this;
        }
        return QuickSort3RightPartition;
    }(QuickSort2RightPartition));
    QuickSort3RightPartition.title = "Quick Sort 3(Right Partition)";
    Sorts.QuickSort3RightPartition = QuickSort3RightPartition;
    var QuickSort3Random = (function (_super) {
        __extends(QuickSort3Random, _super);
        function QuickSort3Random() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.threeWay = true;
            return _this;
        }
        return QuickSort3Random;
    }(QuickSort2Random));
    QuickSort3Random.title = "Quick Sort 3(Random Partition)";
    Sorts.QuickSort3Random = QuickSort3Random;
    /*
        random partition
        quick sort(2, 3)

        -- quora sort

        -- sample sort

        selection (base, track multiple)

        -- shatter sort

        -- shell sort

        -- simple pancake sort

        -- ska sort

        -- slow sort

        -- sleep sort

        smooth

        -- solar bitflip

        -- sorting networks

        -- Spaghetti sort(poll)

        -- splay sort

        -- spread sort

        -- stack sort

        -- stalin sort

        stooge

        -- strand sort

        -- stupid sort

        -- tag sort

        -- throups algorithm

        -- tim sort

        -- topological sorting

        -- tournament sort

        -- tree sort

        -- unshuffle sort

        -- weak heap sort
    */
    Sorts.sortList = [
        Bogo,
        BogoSingle,
        BogoSingleCompare,
        BubbleNonOptimized,
        Bubble,
        BubbleSkipNoShortCircuit,
        BubbleSkipsSorted,
        Cocktail,
        Comb,
        CombSmallShrink,
        CombLargeShrink,
        CombEvenLarger,
        Cycle,
        Gnome,
        QuickSort2,
        QuickSort2RightPartition,
        QuickSort2Random,
        QuickSort3,
        QuickSort3RightPartition,
        QuickSort3Random
    ];
})(Sorts || (Sorts = {}));
