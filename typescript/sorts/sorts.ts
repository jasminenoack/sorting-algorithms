namespace Sorts {
    class BaseSort {
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
            let currentNodes = this.currentNodes()
            let values = this.board.values()
            if (!this.nodesInOrder(values)) {
                this.swap(currentNodes)
            }
            this.setUpNext()
            return currentNodes
        }
    }

    export class Bubble extends BaseSort {
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
    Bubble.title = "Bubble(Short Circuit)"

    export class BubbleNonOptimized extends Bubble {
        shortCircuit: boolean = false
    }
    BubbleNonOptimized.title = 'Bubble Sort'

    export class BubbleSkipsSorted extends Bubble {
        ordered: boolean = true
        skipSorted: boolean = true
    }
    BubbleSkipsSorted.title = "Bubble(Short Circuit & Skip Sorted)"

    export class BubbleSkipNoShortCircuit extends Bubble {
        skipSorted: boolean = true
        shortCircuit: boolean = false
    }
    BubbleSkipNoShortCircuit.title = "Bubble(Skip Sorted)"

    export class Cocktail extends BaseSort {
        // is there a way to respect sorted sections?
        direction: number = 1
        start: number
        end: number
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
    Cocktail.title = "Cocktail Sort"

    export class Comb extends BaseSort {
        // test different shrinks
        // test ceil over floor
        shrink: number = 1.3
        constructor(public board: Boards.Board) {
            super(board)
            // we start this at 1, because we want to stop at 1, when we
            // come back down
            this.gap = Math.floor(this.length / 1.3)
            this.comparisonNode = 0 + this.gap
        }

        setUpNext() {
            this.baseNode++
            this.comparisonNode++

            if (this.comparisonNode >= this.length) {
                if (this.ordered === true && this.gap === 1) {
                    this.done = true
                }
                this.gap = Math.max(Math.floor(this.gap / 1.3), 1)
                this.baseNode = 0
                this.comparisonNode = this.gap
                this.ordered = true
            }
        }
    }
    Comb.title = "Comb Sort"

    export let sortList = [
        BubbleNonOptimized,
        Bubble,
        BubbleSkipNoShortCircuit,
        BubbleSkipsSorted,
        Cocktail,
        Comb
    ]
}
