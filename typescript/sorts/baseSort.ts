import * as Boards from '../board'

export abstract class BaseSort {
    steps: number
    static title: string = ''
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
    profile: { [key: string]: {[key: string]: number}[] }
    nextItemToAdd: number = 1

    constructor(public board: Boards.Board) {
        this.baseSetUp()
    }

    currentNodes() {
        if (this.done) {
            return []
        }
        return [this.baseNode, this.comparisonNode]
    }

    nodesInOrder(values: number[]) {
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

    swap(currentNodes: number[]) {
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
        this.trackProfile()
        return currentNodes
    }

    trackProfile() {
        if (this.steps === this.nextItemToAdd || this.done) {
            this.profile['swaps'].push({
                x: this.steps,
                y: this.swaps
            })
            this.profile['comparisons'].push({
                x: this.steps,
                y: this.comparisons
            })
            this.nextItemToAdd = Math.ceil(Math.min(this.nextItemToAdd * 1.2, this.nextItemToAdd + 16))
        }
    }

    reset() {
        this.board.shuffleBoard()
        this.baseSetUp()
    }

    baseSetUp() {
        this.profile = {
            swaps: [],
            comparisons: [],
        };
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
