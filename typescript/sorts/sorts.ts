namespace Sorts {
    class BaseSort {
        steps: number
        static readonly title: string
        baseNode: number
        comparisonNode: number
        // used for sorts that short circuit
        done: boolean
        // used for sorts that short circuit
        ordered: boolean
        comparisons: number
        swaps: number
        length: number
        end: number
        maxRounds: number
        setUpNext(): void {}
        placed: number[]
        shadow: any[]
        lastSwapped: boolean
        static links: any[]

        constructor(public board: Boards.Board) {
            this.baseSetUp()
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

        reset() {
            this.board.shuffleBoard()
            this.baseSetUp()
        }

        baseSetUp() {
            this.length = this.board.length
            this.baseNode = 0
            this.comparisonNode = 1
            this.end = this.length - 1
            this.done = false
            this.swaps = 0
            this.comparisons = 0
            this.steps = 0
            this.baseNode = 0
            this.comparisonNode = 1
            this.length = this.board.length
            this.end = this.length - 1
            this.lastSwapped = false
            this.ordered = true
            this.placed = []
            this.shadow = []
            this.setUp()
        }

        setUp() {
            console.log("not implemented")
            console.log(this)
        }
    }

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

    export class Bogo extends BaseSort {
        static title: string = 'Bogo'
        setUp() {
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
        setUp() {
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
        ordered: boolean
        skipSorted: boolean = false
        shortCircuit: boolean = true
        static links = [
            {
                url: 'https://users.cs.duke.edu/~ola/bubble/bubble.pdf',
                name: 'Bubble Sort: An Archaeological Algorithmic Analysis'
            }
        ]

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

        setUp() {
            this.maxRounds = this.length
            this.ordered = true
        }
    }

    export class BubbleNonOptimized extends Bubble {
        shortCircuit: boolean = false
        static readonly title = 'Bubble Sort'
    }

    export class BubbleSkipsSorted extends Bubble {
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

        -- cata sort https://github.com/Folatt/Catasort/blob/master/catasort.py

        -- check sort http://academia.wikia.com/wiki/Check_sort#Check_sort_and_Rapid_sort

        -- Circle Sort http://rosettacode.org/wiki/Sorting_Algorithms/Circle_Sort http://www.cscjournals.org/manuscript/Journals/IJEA/Volume6/Issue2/IJEA-48.pdf
    */

    export class Cocktail extends BaseSort {
        // is there a way to respect sorted sections?
        direction: number
        start: number
        end: number
        static readonly title = "Cocktail Sort"

        setUp() {
            this.start = 0
            this.end = this.length - 1
            this.direction = 1
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
        static shrink: number = 1.3
        shrink: number

        setUp() {
            this.shrink = this.constructor.shrink
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
        static shrink = 1.1
        static title = "Comb(Small Shrink: 1.1)"
    }

    export class CombLargeShrink extends Comb {
        static shrink = 1.5
        static title = "Comb(Large Shrink: 1.5)"
    }

    export class CombEvenLarger extends Comb {
        static title = "Comb(Shrink: 2.0)"
        static shrink = 2.0
    }

    export class CombGnome5 extends BaseSort {
        comb: Comb
        gnome: BaseSort
        gnomeSwitchValue: number = 5
        static title = "Comb & Gnome(at gap 5)"

        setUp() {
            this.comb = new Comb(this.board)
            this.gnome = new Gnome(this.board)
        }

        currentNodes() {
            if (this.comb.gap >= this.gnomeSwitchValue) {
                return this.comb.currentNodes()
            } else {
                return this.gnome.currentNodes()
            }
        }

        next() {
            let currentNodes
            if (this.comb.gap >= this.gnomeSwitchValue) {
                currentNodes = this.comb.currentNodes()
                this.comb.next()
            } else {
                this.gnome.next()
            }
            this.steps = this.comb.steps + this.gnome.steps
            this.swaps = this.comb.swaps + this.gnome.swaps
            this.comparisons = this.comb.comparisons + this.gnome.comparisons
            return currentNodes
        }
    }

    export class CombGnome3 extends CombGnome5 {
        gnomeSwitchValue: number = 3
        static title = "Comb & Gnome(at gap 3)"
    }

    export class CombGnome2 extends CombGnome5 {
        gnomeSwitchValue: number = 2
        static title = "Comb & Gnome(at gap 2)"
    }

    export class CombGnome10 extends CombGnome5 {
        gnomeSwitchValue: number = 10
        static title = "Comb & Gnome(at gap 10)"
    }

    // try there with large shrink

    // comb and insertion
    // comb shrink faster if no switching???

    /*
        -- committee sort

        -- Conway sort

        -- Counting sort

        -- cube sort
    */

    export class Cycle extends BaseSort {
        static title = "Cycle Sort"
        currentValue: number
        numberLess: number
        static links = [
            {
                url: 'https://corte.si/posts/code/cyclesort/index.html',
                name: 'Cyclesort - a curious little sorting algorithm'
            }
        ]

        setUp() {
            this.setCurrentValue(this.baseNode)
            this.numberLess = 0
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

        -- evil sort http://richardhartersworld.com/cri_d/cri/2001/badsort.html

        -- flash sort

        -- Franceschini-Muthukrishnan-Pătrașcu algorithm
    */

    export class Gnome extends BaseSort {
            static title = "Gnome Sort"
            currentGnome: number

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

            setUp() {
                this.currentGnome = 1
            }
        }

    /*
        -- goro sort https://code.google.com/codejam/contest/dashboard?c=975485#s=p3

        -- gravity sort

        -- Grouping Comparison sort http://www.cscjournals.org/manuscript/Journals/IJCSS/Volume7/Issue3/IJCSS-877.pdf

        -- half hearted merge sort (https://xkcd.com/1185/)

        -- han's algorithm

        -- hanoi sort
    */

    export class Heap extends BaseSort {
        static title = "Heap Sort"
        nodesToHeap: number[]

        setUp() {
            this.nodesToHeap = []
            let heapIndex = Math.floor(this.length / 2)  - 1
            for (let i = heapIndex; i >= 0; i--) {
                this.nodesToHeap.push(i)
            }
            this.comparisonNode = this.length - 1
        }

        currentNodes() {
            if (this.done) {
                return []
            }
            if (this.nodesToHeap.length) {
                return [this.nodesToHeap[0]]
            } else {
                return [0]
            }
        }

        heapify(node) {
            let values = this.board.values()
            let comparison = values[node]
            let leftChild = (2 * node) + 1
            let rightChild = (2 * node) + 2
            let left = leftChild <= this.comparisonNode && values[leftChild]
            let right = rightChild <= this.comparisonNode && values[rightChild]
            let swapNode
            this.comparisons += 2
            if (((left || left === 0) && left > comparison) || ((right || right === 0) && right > comparison)) {
                this.comparisons++
                if ((right || (right !== false && right !== undefined)) && right > left) {
                    swapNode = rightChild
                } else {
                    swapNode = leftChild
                }
                this.swap([node, swapNode])
                let possibleChild = (2 * swapNode) + 1
                if (possibleChild <= this.comparisonNode) {
                    this.nodesToHeap.unshift(swapNode)
                }
            }
        }

        removeNode() {
            this.swap([0, this.comparisonNode])
            this.placed.push(this.comparisonNode)
            this.nodesToHeap.unshift(0)
            this.comparisonNode--
        }

        next() {
            if (this.done) {
                return []
            }
            this.steps++
            let currentNodes = []
            if (this.nodesToHeap.length) {
                let node = this.nodesToHeap.shift()
                currentNodes.push(node)
                this.heapify(node)
            } else {
                this.removeNode()
            }
            if(this.comparisonNode === 0) {
                this.done = true
            }
            return currentNodes
        }
    }

    /*
        -- index sort http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.403.2955&rep=rep1&type=pdf
    */

    export class Insertion extends BaseSort {
        static title = "Insertion Sort"
        insertValue: number = null

        setUp() {
            this.baseNode = 1
        }

        currentNodes() {
            if (this.done) {
                return []
            }
            let nodes = [this.baseNode]
            if (this.comparisonNode >= 0) {
                nodes.push(this.comparisonNode)
            }
            return nodes
        }

        next() {
            if (this.done) {
                return []
            }
            this.steps++

            if (this.insertValue === null) {
                this.insertValue = this.board.values()[this.baseNode]
                this.shadow = [{index: this.baseNode, value: this.insertValue}]
                this.comparisonNode = this.baseNode - 1
            }

            let nodes = [this.baseNode]

            this.comparisons++
            if (this.insertValue < this.board.values()[this.comparisonNode]) {
                nodes = [this.comparisonNode, this.baseNode]
                this.swaps += 0.5
                this.board.set(
                    this.comparisonNode + 1,
                    this.board.values()[this.comparisonNode]
                )
                this.comparisonNode--
            } else {
                if (this.comparisonNode + 1 !== this.baseNode) {
                    nodes = [this.comparisonNode + 1]
                    this.swaps += 0.5
                    this.board.set(
                        this.comparisonNode + 1,
                        this.insertValue
                    )
                }
                this.baseNode++
                this.insertValue = null
            }

            if (this.baseNode === this.length) {
                this.done = true
            }
            return nodes
        }
    }

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

    export class OddEven extends BaseSort {
        static title = "Odd Even(Single Processor)"
        oddPhase: boolean
        oddSorted: boolean
        evenSorted: boolean
        baseNodes: number[]

        setUp() {
            this.oddPhase = true
            this.oddSorted = false
            this.evenSorted = false
            this.setUpLists()
            this.baseNode = this.baseNodes.shift()
            this.comparisonNode = this.baseNode + 1
            console.log(this.baseNodes, this.baseNode, this.comparisonNode)
        }

        setUpLists () {
            this.baseNodes = []
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
            console.log(this.baseNodes, this.baseNode, this.comparisonNode)
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

        -- quantum bogo sort
    */

    export class QuickSort2 extends BaseSort {
        static title = "Quick Sort(Left Partition)"
        addToUpdate: number[]
        partition: number
        partitions: any[]
        partitionValue: number
        lower: number
        higher: number
        partitionStart: number
        partitionEnd: number
        // for 3-way partition
        partitionTop: number
        threeWay: boolean = false

        setUp() {
            this.addToUpdate = []
            this.partitions = []
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

        -- radix sort (lsd, msd)

        -- rapid sort http://academia.wikia.com/wiki/Check_sort#Check_sort_and_Rapid_sort

        -- reverse subsequence Reversing subsequence algorithm

        -- rolling ball sort

        -- rva sorting http://dl.acm.org/citation.cfm?id=2677942&CFID=787105030&CFTOKEN=78811798

        -- sample sort

        -- Schwartzian transform https://en.wikibooks.org/wiki/Algorithm_Implementation/Sorting/Schwartzian_transform
    */

    export class SelectionSort extends BaseSort {
        static title = "Selection Sort"
        baseIndex: number

        setUp() {
            this.baseIndex = 0
        }

        setUpNext() {
            this.comparisonNode++
            if (this.comparisonNode === this.length) {
                if (this.baseNode !== this.baseIndex) {
                    this.swap([this.baseNode, this.baseIndex])
                }

                this.baseIndex++
                this.baseNode = this.baseIndex
                this.comparisonNode = this.baseNode + 1

                if (this.baseNode === this.length - 1) {
                    this.done = true
                }
            }
        }

        next() {
            if (this.done) {
                return []
            }
            this.steps++
            let currentNodes = this.currentNodes()
            let values = this.board.values()
            if (!this.nodesInOrder(values)) {
                this.baseNode = this.comparisonNode
            }
            this.setUpNext()
            return currentNodes
        }
    }

    // select highest and lowest

    /*
        -- shatter sort

        -- shell sort http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.193.6248&rep=rep1&type=pdf TIGCC (a GCC-based compiler for TI-89/92/V200 graphing calculators) uses Shell sort for the qsort implementation in its standard library: http://www.thechalkface.net/resources/Sorting_Algorithms.pdf

        -- silly sort http://richardhartersworld.com/cri_d/cri/2001/badsort.html

        -- simple pancake sort

        -- ska sort

        -- slow sort https://en.wikipedia.org/wiki/Slowsort, http://www.mipmip.org/tidbits/pasa.pdf

        -- sleep sort
    */

    export class Smooth extends BaseSort {
        static title = "Smooth Sort"
        static links = [
            {
                url: 'http://scidok.sulb.uni-saarland.de/volltexte/2011/4062/pdf/fb14_1982_11.pdf',
                name: "Smoothsort's Behavior on Presorted Sequences"
            }
        ]
        // size of each tree
        treeSizes: number[]
        // tree roots
        roots: number[]
        // numbers
        leonardoNumbers: number[]
        nodesToHeap: number[]
        rootsToCompare: number[]
        static fromBottom: boolean = false
        fromBottom: boolean

        setUp() {
            this.leonardoNumbers = []
            this.nodesToHeap = []
            this.rootsToCompare = []
            this.roots = []
            this.treeSizes = []
            this.fromBottom = this.constructor.fromBottom
            this.setUpNumbers(this.fromBottom)
        }

        setUpNumbers(fromBottom) {
            this.leonardoNumbers = this.getLeoNums(this.length)
            if (!fromBottom) {
                this.treeSizes = this.getTreeSizes(this.length)
            }
        }

        getLeoNums(length) {
            let numbers = [1, 1]
            while(true) {
                let nextNum = numbers[numbers.length - 1] + numbers[numbers.length - 2] + 1
                if (nextNum >= this.length) {
                    break
                }
                numbers.push(nextNum)
            }
            return numbers
        }

        getTreeSizes(length) {
            let numbers = []
            for (let i = 0; i < length; i++) {
                let sub1 = numbers[i - 1]
                let sub2 = numbers[i - 1 - sub1]
                if (this.leonardoNumbers.indexOf(sub1 + sub2 + 1) !== -1) {
                    numbers.push(sub1 + sub2 + 1)
                    this.roots.splice(this.roots.length - 2, 2, i)
                    if (!this.fromBottom) {
                        this.nodesToHeap.push(i)
                    }
                } else {
                    numbers.push(1)
                    this.roots.push(i)
                }
            }
            this.rootsToCompare = this.roots.slice()
            return numbers
        }

        currentNodes() {
            if (this.done) {
                return []
            }
            let nodes: number[]
            if (this.nodesToHeap.length) {
                return [this.nodesToHeap[0]]
            } else if (this.rootsToCompare.length) {
                return [this.rootsToCompare[0]]
            } else {
                return [this.roots[this.roots.length - 1]]
            }
        }

        next() {
            if (this.done) {
                return []
            }
            this.steps++
            let nodes: number[]
            if (this.nodesToHeap.length) {
                nodes = this.heapify(this.nodesToHeap.shift())
            } else if (this.rootsToCompare.length) {
                nodes = this.compare(this.rootsToCompare)
            } else if (this.fromBottom && this.baseNode < this.length) {
                nodes = this.addNextNode(this.baseNode)
                this.baseNode++
            } else {
                nodes = this.remove(this.roots.pop())
            }
            if (!this.roots.length && !(this.fromBottom && this.baseNode < this.length)) {
                this.done = true
            }
            return nodes
        }

        addNextNode(index) {
            let [sub1, sub2] = this.getChildren(index)
            let nodes

            if (sub2 < 0) {
                // there is only sub 1
                this.roots.push(index)
                nodes = this.compare(this.roots.slice())
                this.treeSizes.push(1)
            } else if (this.leonardoNumbers.indexOf(1 + this.treeSizes[sub1] + this.treeSizes[sub2]) !== -1) {
                // combine trees
                nodes = this.heapify(index)
                this.roots.splice(this.roots.length - 2, 2, index)
                this.treeSizes.push(1 + this.treeSizes[sub1] + this.treeSizes[sub2])
            } else {
                // we are adding a tree
                this.treeSizes.push(1)
                this.roots.push(index)
                nodes = this.compare(this.roots.slice())
            }
            return nodes
        }

        compare(nodes) {
            let current = nodes.slice()
            let endpoint = nodes[nodes.length - 1]
            let maxNode = nodes[0]
            let values = this.board.values()
            for (let i = 1; i < nodes.length; i ++) {
                this.comparisons++
                if (values[maxNode] < values[nodes[i]]) {
                    maxNode = nodes[i]
                }
            }

            if (maxNode !== endpoint) {
                this.swap([maxNode, endpoint])
                if (this.treeSizes[maxNode] > 1) {
                    this.nodesToHeap.push(maxNode)
                }
            }

            if (nodes.length > 2) {
                let pickedIndex = nodes.indexOf(maxNode)
                nodes.splice(nodes.length - 1, 1)
                this.rootsToCompare = nodes
            } else {
                this.rootsToCompare = []
            }
            return current
        }

        remove(index) {
            let nodes = [index]
            if (this.treeSizes[index] > 1) {
                let [sub1, sub2] = this.getChildren(index)
                let prevRoot: number
                this.roots.push(sub2)
                this.roots.push(sub1)
                this.rootsToCompare = this.roots.slice()
            }
            this.placed.push(index)
            return nodes
        }

        getChildren(index) {
            let sub1 = index - 1
            let sub2 = sub1 - this.treeSizes[sub1]
            return [sub1, sub2]
        }

        heapify(index) {
            let nodes = [index]
            let [sub1, sub2] = this.getChildren(index)
            this.comparisons += 2
            let values = this.board.values()
            if (values[index] < values[sub1] || values[index] < values[sub2]) {
                this.comparisons++
                let high = values[sub2] > values[sub1] ? sub2 : sub1
                this.swap([index, high])
                nodes = [index, high]
                if (this.treeSizes[high] > 1) {
                    this.nodesToHeap.unshift(high)
                }
            }
            return nodes
        }
    }

    export class SmoothSetUpBottom extends Smooth {
        static title = 'Smooth Sort(Set up from bottom)'
        static fromBottom: boolean = true

        setUp() {
            super.setUp()
            this.baseNode = 1
            this.treeSizes = [1]
            this.roots = [0]
        }
    }

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

    export let sortList = [
        Bogo,
        BogoSingle,
        BogoSingleCompare,
        BubbleNonOptimized,
        Bubble,
        BubbleSkipNoShortCircuit,
        BubbleSkipsSorted,
        Cocktail,
        CombSmallShrink,
        Comb,
        CombLargeShrink,
        CombEvenLarger,
        CombGnome2,
        CombGnome3,
        CombGnome5,
        CombGnome10,
        Cycle,
        Gnome,
        Heap,
        Insertion,
        OddEven,
        OddEvenConcurrent,
        QuickSort2,
        QuickSort2RightPartition,
        QuickSort2Random,
        QuickSort3,
        QuickSort3RightPartition,
        QuickSort3Random,
        SelectionSort,
        Smooth,
        SmoothSetUpBottom
    ]
}
