import {BaseSort} from './baseSort'

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
