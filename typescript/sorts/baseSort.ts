import * as Boards from '../board'

declare const firebase: any

/**
* database structure:
*
* sort_name:
* order:
* value_type:
* point_count:
* steps:
* comparisons: []
* swaps: []
*/

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
    nextItemToAdd: number
    database: any

    constructor(public board: Boards.Board, public trackAll: boolean = false) {
        if (window.firebase) {
            this.database = firebase.database()
        }
        this.baseSetUp()
    }

    writeToDatabase() {
        if (this.database) {
            firebase.auth().signInAnonymously()
            firebase.database().ref('sortstats/').push({
                sort_name: this.constructor.title,
                order: this.board.shuffle.title,
                value_type: this.board.valueType.title,
                point_count: this.length,
                steps: this.steps,
                comparisons: this.comparisons,
                swaps: this.swaps
              });
        }
    }

    setDone() {
        this.done = true;
        this.writeToDatabase();
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
            if (this.trackAll) {
                this.nextItemToAdd++
            } else {
                this.nextItemToAdd = Math.ceil(Math.min(this.nextItemToAdd * 1.1, this.nextItemToAdd + 16))
            }
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
        this.nextItemToAdd = 1
        this.setUp()
    }

    setUp() {
        console.log("not implemented")
        console.log((this.constructor as any).title)
    }
}
