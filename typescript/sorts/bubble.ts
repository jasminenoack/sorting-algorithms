namespace Bubble {
    export class Bubble {
        title: string = "Bubble Sort"
        baseNode: number
        comparisonNode: number
        done: boolean = false
        ordered: boolean = true
        steps: number = 0

        constructor(public board: Boards.Board) {
            this.length = board.length
            this.baseNode = 0
            this.comparisonNode = 1
        }

        currentNodes() {
            return [this.baseNode, this.comparisonNode]
        }

        nodesInOrder(values) {
            let inOrder = values[this.baseNode] <= values[this.comparisonNode]
            if (!inOrder) {
                this.ordered = false
            }
            return inOrder
        }

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
                this.board.swap.apply(this.board, currentNodes)
            }
            this.setUpNext()
            this.steps++
            return currentNodes
        }
    }
}
