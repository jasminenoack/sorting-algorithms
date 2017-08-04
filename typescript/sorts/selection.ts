import {BaseSort} from './baseSort'

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
