import {BaseSort} from './baseSort'

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

    nodesInOrder(values: number[]) {
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

    nodesInOrder(values: number[]) {
        // used to compare nodes
        let inOrder = values[this.baseNode] <= values[this.comparisonNode]
        if (!inOrder) {
            this.ordered = false
        }
        this.comparisons++
        return inOrder
    }
}
