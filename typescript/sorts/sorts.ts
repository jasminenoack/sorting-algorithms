namespace Sorts {
    class BaseSort {
        baseNode: number
        comparisonNode: number
        done: boolean = false
        ordered: boolean = true
        comparisons: number = 0
        swaps: number = 0

        constructor(public board: Boards.Board) {
            this.length = board.length
            this.baseNode = 0
            this.comparisonNode = 1
        }

        currentNodes() {
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
    }

    export class Bubble extends BaseSort {
        // currently using short circuit should do one without
        // try one that skips the ones it already looked at. 
        setUpNext() {
            this.baseNode++
            this.comparisonNode++

            if (this.comparisonNode == this.length) {
                if (this.ordered) {
                    this.done = true
                } else {
                    this.ordered = true
                }
                this.baseNode = 0
                this.comparisonNode = 1
            }
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
    Bubble.title = "Bubble Sort"

    export let sortList = [
        Bubble
    ]
}
