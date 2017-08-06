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
        this.comparisons += this.length - 1
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
        this.trackProfile()
        return currentNodes
    }
}

export class BogoSingle extends BaseSort {
    static title = "Bozo(Single Swap)"
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
        this.trackProfile()
        return currentNodes
    }
}

export class BogoSingleCompare extends BogoSingle {
    static title = 'Smart Bozo(Compare & Single Swap)'

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

export class Bogobogo extends BaseSort {
    currentTop: number 
    static title: string = 'Bogobogosort'
    setUp() {
        this.currentTop = 0
    }

    currentNodes() {
        return [this.currentTop]
    }

    next() {
        if (this.done) {
            return []
        }
        let currentNodes = this.currentNodes()
        this.steps++

        const values = this.board.values()
        this.comparisons++
        if (values[this.currentTop] < values[this.currentTop + 1]) {
            this.currentTop++
        } else {
            let start = values.slice()
            let shuffledSubset = (values.slice(0, this.currentTop + 2) as any).shuffle()
            values.splice(0, shuffledSubset.length, ...shuffledSubset)
            this.board.setPoints(values)
            let difference = 0
            for (let i = 0; i < values.length; i++) {
                if (values[i] !== start[i]) {
                    difference++
                }
            }
            this.swaps += difference / 2

            this.currentTop = 0
        }

        if(this.currentTop === this.length - 1) {
            this.done = true
        }

        return currentNodes
    }
}

export class Permutation extends BaseSort {
    original: number[]
    permutation: number[]
    static title: string = 'Permutation Sort'
    changed: number[]

    setUp() {
        this.original = this.board.values().slice()
        this.permutation = (Array.prototype as any).range(this.board.length)
        this.checkSorted()
        this.changed = [this.length - 1]
    }

    checkSorted() {
        Bogo.prototype.checkSorted.call(this)
    }

    currentNodes() {
        return this.changed
    }

    getHighestPossible(array: number[], highest: number) {
        while(array.indexOf(highest) !== -1) {
            highest--
        }
        return highest
    }

    findNextPermutation() {
        let nextPermutation = this.permutation
        let lastValue = nextPermutation.pop()

        while(lastValue === this.getHighestPossible(nextPermutation, this.length - 1)) {
            lastValue = nextPermutation.pop()
        }

        if (this.changed.indexOf(nextPermutation.length) === -1) {
            this.changed.push(nextPermutation.length)
        }

        let nextNum = lastValue + 1
        while (nextPermutation.length < this.length) {
            if (nextPermutation.indexOf(nextNum) === -1) {
                nextPermutation.push(nextNum)
                nextNum = 0
            } else {
                nextNum++
            }
        }
    }

    setValues() {
        let values: number[] = []
        const oldValues = this.original
        const currentBoard = this.board.values()
        this.permutation.forEach((index, i) => {
            if (currentBoard[i] !== oldValues[index]) {
                this.swaps++
            }
            values.push(oldValues[index])
        })
        this.board.setPoints(values)
    }

    next() {
        if (this.done) {
            return []
        }
        this.steps++
        this.findNextPermutation()
        this.setValues()
        this.checkSorted()
        this.trackProfile()
        return this.currentNodes()
    }
}