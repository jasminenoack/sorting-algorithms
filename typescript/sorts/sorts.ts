namespace Sorts {
    class BaseSort {
        steps: number = 0
        static readonly title: string
        baseNode: number
        comparisonNode: number
        // used for sorts that short circuit
        done: boolean = false
        // used for sorts that short circuit
        ordered: boolean = true
        comparisons: number = 0
        swaps: number = 0
        length: number
        end: number
        maxRounds: number
        setUpNext(): void {}
        placed: number[] = []
        shadow: any[] = []
        lastSwapped: boolean = false

        constructor(public board: Boards.Board) {
            this.length = board.length
            this.baseNode = 0
            this.comparisonNode = 1
            this.end = this.length - 1
        }

        currentNodes() {
            if (this.done) {
                return []
            }
            return [this.baseNode, this.comparisonNode]
        }

        nodesInOrder(values) {
            // used to compare nodes
            let inOrder = values[this.baseNode] <= values[this.comparisonNode]
            if (!inOrder) {
                this.ordered = false
                this.lastSwapped = true
            } else {
                this.lastSwapped = false
            }
            this.comparisons++
            return inOrder
        }

        swap(currentNodes) {
            this.swaps++
            this.board.swap.apply(this.board, currentNodes)
        }

        next() {
            if (this.done) {
                return []
            }
            this.steps++
            let currentNodes = this.currentNodes()
            let values = this.board.values()
            if (!this.nodesInOrder(values)) {
                this.swap(currentNodes)
            }
            this.setUpNext()
            return currentNodes
        }
    }

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

    export class Bogo extends BaseSort {
        static title: string = 'Bogo'
        constructor (board) {
            super(board)
            this.checkSorted()
        }

        currentNodes () {
            if (!this.done) {
                return Array.prototype.range(this.board.length)
            } else {
                return []
            }
        }

        checkSorted () {
            let values = this.board.values()
            if (values.sorted()) {
                this.done = true
                return true
            }
            return false
        }

        next () {
            if (this.done) {
                return []
            }
            let currentNodes = this.currentNodes()
            this.steps++
            let values = this.board.values()
            let start = values.slice()
            this.board.setPoints(values.shuffle())
            let difference = 0
            for (let i = 0; i < values.length; i++) {
                if (values[i] !== start[i]) {
                    difference++
                }
            }
            this.swaps += difference / 2
            this.checkSorted()
            return currentNodes
        }
    }

    export class BogoSingle extends BaseSort {
        static title = "Bogo(Single Swap)"

        constructor (board) {
            super(board)
            this.checkSorted()
            this.setUpNext()
        }

        checkSorted () {
            let values = this.board.values()
            if (values.sorted()) {
                this.done = true
                return true
            }
            return false
        }

        nodesInOrder(values) {
            // always swap
            return false
        }

        setUpNext() {
            let first = Math.floor(Math.random() * this.length)
            let second = Math.floor(Math.random() * this.length)
            while (first === second) {
                second = Math.floor(Math.random() * this.length)
            }
            this.baseNode = Math.min(first, second)
            this.comparisonNode = Math.max(first, second)
        }

        next() {
            let currentNodes = this.currentNodes()
            super.next()
            this.checkSorted()
            return currentNodes
        }
    }

    export class BogoSingleCompare extends BogoSingle {
        static title = 'Bogo(Compare & Single Swap)'

        nodesInOrder(values) {
            // used to compare nodes
            let inOrder = values[this.baseNode] <= values[this.comparisonNode]
            if (!inOrder) {
                this.ordered = false
            }
            this.comparisons++
            return inOrder
        }
    }

    /*
        -- fast bogo sort (https://xkcd.com/1185/)

        -- Bogobogo sort

        -- bozo sort
    */

    export class Bubble extends BaseSort {
        static readonly title: string = "Bubble(Short Circuit)"
        ordered: boolean = true
        skipSorted: boolean = false
        shortCircuit: boolean = true

        constructor(board) {
            super(board)
            this.maxRounds = this.length
        }

        setUpNext() {
            if (this.comparisonNode == this.end) {
                this.maxRounds--
                if (this.maxRounds === 0) {
                    this.done = true
                }
                if (this.ordered && this.shortCircuit) {
                    this.done = true
                } else {
                    this.ordered = true
                }
                this.baseNode = 0
                this.comparisonNode = 1
                if (this.skipSorted) {
                    this.placed.push(this.end)
                    this.end--
                    if (this.end === 0) {
                        this.done = true
                    }
                }
            } else {
                this.baseNode++
                this.comparisonNode++
            }
        }
    }

    export class BubbleNonOptimized extends Bubble {
        shortCircuit: boolean = false
        static readonly title = 'Bubble Sort'
    }

    export class BubbleSkipsSorted extends Bubble {
        ordered: boolean = true
        skipSorted: boolean = true
        static readonly title = "Bubble(Short Circuit & Skip Sorted)"
    }

    export class BubbleSkipNoShortCircuit extends Bubble {
        skipSorted: boolean = true
        shortCircuit: boolean = false
        static readonly title = "Bubble(Skip Sorted)"
    }

    /*
        -- Bucket Sort

        -- Burst Sort

        -- caresian tree sort

        -- cascade merge sort

        -- cata sort
    */

    export class Cocktail extends BaseSort {
        // is there a way to respect sorted sections?
        direction: number = 1
        start: number
        end: number
        static readonly title = "Cocktail Sort"

        constructor(public board: Boards.Board) {
            super(board)
            // we start this at 1, because we want to stop at 1, when we
            // come back down
            this.start = 0
            this.end = this.length - 1
        }

        setUpNext() {
            if(this.direction) {
                if (this.comparisonNode === this.end) {
                    this.placed.push(this.end)
                    this.end--
                    this.baseNode--
                    this.comparisonNode--
                    this.direction = 0
                } else {
                    this.baseNode++
                    this.comparisonNode++
                }
            } else {
                if (this.baseNode === this.start) {
                    this.placed.push(this.start)
                    this.direction = 1
                    this.start++
                    this.baseNode++
                    this.comparisonNode++
                } else {
                    this.baseNode--
                    this.comparisonNode--
                }
            }
            if (!(this.start < this.end)) {
                this.done = true
            }
        }
    }

    export class Comb extends BaseSort {
        // test different shrinks
        // test ceil over floor
        static title = "Comb Sort"
        gap: number
        shrink: number = 1.3
        constructor(public board: Boards.Board) {
            super(board)
            // we start this at 1, because we want to stop at 1, when we
            // come back down
            this.gap = Math.floor(this.length / this.shrink)
            this.comparisonNode = 0 + this.gap
        }

        setUpNext() {
            this.baseNode++
            this.comparisonNode++

            if (this.comparisonNode >= this.length) {
                if (this.ordered === true && this.gap === 1) {
                    this.done = true
                }
                this.gap = Math.max(Math.floor(this.gap / this.shrink), 1)
                this.baseNode = 0
                this.comparisonNode = this.gap
                this.ordered = true
            }
        }
    }

    export class CombSmallShrink extends Comb {
        shrink = 1.1
        static title = "Comb(Small Shrink: 1.1)"
        constructor(public board: Boards.Board) {
            super(board)
            // we start this at 1, because we want to stop at 1, when we
            // come back down
            this.gap = Math.floor(this.length / this.shrink)
            this.comparisonNode = 0 + this.gap
        }
    }

    export class CombLargeShrink extends Comb {
        shrink = 1.5
        static title = "Comb(Large Shrink: 1.5)"
        constructor(public board: Boards.Board) {
            super(board)
            // we start this at 1, because we want to stop at 1, when we
            // come back down
            this.gap = Math.floor(this.length / this.shrink)
            this.comparisonNode = 0 + this.gap
        }
    }

    export class CombEvenLarger extends Comb {
        static title = "Comb(Shrink: 2.0)"
        shrink = 2.0
        constructor(public board: Boards.Board) {
            super(board)
            // we start this at 1, because we want to stop at 1, when we
            // come back down
            this.gap = Math.floor(this.length / this.shrink)
            this.comparisonNode = 0 + this.gap
        }
    }

    /*
        -- committee sort

        -- Conway sort

        -- Counting sort

        -- cube sort
    */

    export class Cycle extends BaseSort {
        static title = "Cycle Sort"
        currentValue: number
        numberLess: number = 0

        constructor(board) {
            super(board)
            this.setCurrentValue(this.baseNode)
        }

        currentNodes() {
            return [this.comparisonNode]
        }

        setCurrentValue(index) {
            this.currentValue = this.board.values()[index]
            this.shadow = [{index: this.baseNode, value: this.currentValue}]
        }

        next() {
            if (this.done) {
                return []
            }
            this.steps++
            let currentNodes = Array.prototype.range(this.length)
            let values = this.board.values()
            this.lesserThanComparison(values)
            this.setUpNext()
            return currentNodes
        }

        lesserThanComparison(values) {
            this.comparisons++
            if (this.currentValue > values[this.comparisonNode]) {
                this.numberLess++
            }
        }

        setUpNext() {
            let index = this.numberLess + this.baseNode
            this.comparisonNode++
            if (this.comparisonNode === this.baseNode) {
                this.comparisonNode++
            }
            if (this.comparisonNode === this.length) {
                if (
                    index !== this.baseNode ||
                    this.currentValue !== this.board.values()[this.baseNode]
                ) {
                    let values = this.board.values()
                    while(values[index] === this.currentValue) {
                        index++
                    }
                    let oldValue = this.currentValue
                    this.setCurrentValue(index)
                    this.board.set(index, oldValue)
                    this.swaps++
                }
                if (this.baseNode === index) {
                    this.placed.push(this.baseNode)
                    this.baseNode++
                    this.setCurrentValue(this.baseNode)
                }

                this.comparisonNode = this.baseNode + 1
                this.numberLess = 0

                if (this.baseNode === this.length - 1) {
                    this.done = true
                }
            }
        }
    }
    /*
        -- demonsort

        -- diamondsort

        -- dropsort

        -- flash sort

        -- Franceschini-Muthukrishnan-Pătrașcu algorithm
    */

    export class Gnome extends BaseSort {
            static title = "Gnome Sort"
            currentGnome: number = 1

            setUpNext() {
                if (this.baseNode === 0 || !this.lastSwapped) {
                    this.currentGnome++
                    this.comparisonNode = this.currentGnome
                    this.baseNode = this.currentGnome - 1
                } else if (this.lastSwapped) {
                    this.baseNode--
                    this.comparisonNode--
                }
                if (this.comparisonNode >= this.length) {
                    this.done = true
                }
            }
        }

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
    */

    export class OddEven extends BaseSort {
        static title = "Odd Even(Single Processor)"
        oddPhase: boolean = true
        oddSorted: boolean = false
        evenSorted: boolean = false
        baseNodes: number[] = []
        constructor (board) {
            super(board)
            this.setUpLists()
            this.baseNode = this.baseNodes.shift()
            this.comparisonNode = this.baseNode + 1
        }

        setUpLists () {
            if (this.oddPhase) {
                for (let i = 1; i < this.length - 1; i += 2) {
                    this.baseNodes.push(i)
                }
            } else {
                for (let i = 0; i < this.length - 1; i += 2) {
                    this.baseNodes.push(i)
                }
            }
        }

        swap() {
            super.swap([this.baseNode, this.comparisonNode])
        }

        setUpNext () {
            if (!this.baseNodes.length) {
                if (this.ordered) {
                    if (this.oddPhase) {
                        this.oddSorted = true
                    } else {
                        this.evenSorted = true
                    }
                } else {
                    this.oddSorted = false
                    this.evenSorted = false
                }
                if (this.evenSorted && this.oddSorted) {
                    this.done = true
                    return
                }
                this.oddPhase = !this.oddPhase
                this.setUpLists()
                this.ordered = true
            }
            this.baseNode = this.baseNodes.shift()
            this.comparisonNode = this.baseNode + 1
        }

        currentNodes() {
            if (this.baseNode !== undefined) {
                return [this.baseNode].concat(this.baseNodes)
            }
            return this.baseNodes
        }
    }

    export class OddEvenConcurrent extends OddEven {
        static title = "Odd Even(Concurrent)"
        next() {
            if (this.done) {
                return []
            }
            this.steps++
            let currentNodes = this.currentNodes()
            let values = this.board.values()

            while(this.baseNode !== undefined) {
                if (!this.nodesInOrder(values)) {
                    this.swap()
                }
                this.baseNode = this.baseNodes.shift()
                if (this.baseNode) {
                    this.comparisonNode = this.baseNode + 1
                }
            }
            this.setUpNext()
            return currentNodes
        }
    }

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

        -- radix sort (lsd, msd)

        -- rolling ball sort

        -- quantum bogo sort
    */

    export class QuickSort2 extends BaseSort {
        static title = "Quick Sort(Left Partition)"
        addToUpdate: number[] = []
        partition: number
        partitions: any[] = []
        partitionValue: number
        lower: number
        higher: number
        partitionStart: number
        partitionEnd: number
        // for 3-way partition
        partitionTop: number
        threeWay: boolean = false

        constructor(board) {
            super(board)
            this.setUpValues([this.baseNode, this.length -1])
        }

        setUpValues(values) {
            this.lower = values[0]
            this.higher = values[0]
            this.partitionStart = values[0]
            this.partitionEnd = values[1]
            this.setPartition()
            this.partitionTop  = this.partition
        }

        currentNodes() {
            let nodes = []
            if (this.partition !== this.lower) {
                nodes.push(this.lower)
            }
            nodes.push(this.partition)
            if (this.partition !== this.higher) {
                nodes.push(this.higher)
            }
            return nodes
        }

        setUpNext() {
            // if higher is at the end of the current partition
            if (this.higher === this.partitionEnd) {
                if (this.threeWay) {
                    for (let i = this.partition; i <= this.partitionTop; i++) {
                        this.placed.push(i)
                    }
                } else {
                    this.placed.push(this.partition)
                }
                let partitions = this.partitions
                let topLow
                if (this.threeWay) {
                    topLow = this.partitionTop
                } else {
                    topLow = this.partition
                }

                if (this.higher > topLow + 1) {
                    partitions.unshift([topLow + 1, this.higher])
                }
                if (this.lower < this.partition - 1) {
                    partitions.unshift([this.lower, this.partition - 1])
                }

                if (partitions.length) {
                    let newPartition = partitions.shift()
                    this.setUpValues(newPartition)
                } else {
                    this.done = true
                    return []
                }
            }
        }

        setPartition() {
            this.partition = this.lower
        }

        next() {
            if (this.done) {
                return []
            }
            this.steps++

            let valuesToUpdate = []
            // look at the next value
            this.higher++
            let values = this.board.values()

            this.comparisons++
            let threeWay = this.threeWay && values[this.higher] === values[this.partition]
            if (values[this.higher] < values[this.partition] || threeWay) {
                // if the value at higher is less than the partition
                this.swaps++
                let temp = values.splice(this.higher, 1)[0];
                values.splice(this.partition, 0, temp)
                this.board.setPoints(values)

                if (threeWay) {
                    this.partitionTop++
                } else {
                    this.partition++
                    this.partitionTop++
                }

                for (let i = this.partition - 1; i <= this.higher; i++) {
                    if (i >= 0) {
                        valuesToUpdate.push(i)
                    }
                }
            }
            if (
                this.addToUpdate.length
            ) {
                this.addToUpdate.forEach((index) => {
                    if (valuesToUpdate.indexOf(index) === -1) {
                        valuesToUpdate.push(index)
                    }
                })
                this.addToUpdate = []
            }
            this.setUpNext()
            return valuesToUpdate
        }
    }

    export class QuickSort2RightPartition extends QuickSort2 {
        static title = "Quick Sort(Right Partition)"

        setPartition() {
            this.partition = this.lower
            let temp = this.board.get(this.partitionEnd).value
            this.board.set(this.partitionEnd, this.board.get(this.partition).value)
            this.board.set(this.partition, temp)
            this.addToUpdate = [this.lower, this.partitionEnd]
        }

    }

    export class QuickSort2Random extends QuickSort2 {
        static title = "Quick Sort(Random Partition)"

        setPartition() {
            let diff = this.partitionEnd - this.partitionStart + 1
            let index = this.partitionStart + Math.floor(Math.random() * diff)
            this.partition = this.lower
            let temp = this.board.get(index).value
            this.board.set(index, this.board.get(this.partition).value)
            this.board.set(this.partition, temp)
            this.addToUpdate = [this.lower, index]
        }
    }

    export class QuickSort3 extends QuickSort2 {
        static title = "Quick Sort 3(Left Partition)"
        threeWay: boolean = true
    }

    export class QuickSort3RightPartition extends QuickSort2RightPartition {
        static title = "Quick Sort 3(Right Partition)"
        threeWay: boolean = true
    }

    export class QuickSort3Random extends QuickSort2Random {
        static title = "Quick Sort 3(Random Partition)"
        threeWay: boolean = true
    }

    /*
        -- quora sort

        -- sample sort
    */

        // selection (base, track multiple)

    /*
        -- shatter sort

        -- shell sort

        -- simple pancake sort

        -- ska sort

        -- slow sort

        -- sleep sort
    */

        // smooth

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

        -- unshuffle sort

        -- weak heap sort
    */

    export let sortList = [
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
        OddEven,
        OddEvenConcurrent,
        QuickSort2,
        QuickSort2RightPartition,
        QuickSort2Random,
        QuickSort3,
        QuickSort3RightPartition,
        QuickSort3Random
    ]
}
