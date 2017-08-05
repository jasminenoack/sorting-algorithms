import {BaseSort} from './baseSort'

export class Bubble extends BaseSort {
    static title: string = "Bubble(Short Circuit)"
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

export class BubbleSortConcurrent extends Bubble {
    static title = "Bubble Sort(Concurrent 2)"
    static numberConcurrent = 2
    numberConcurrent: number
    baseNodes: number[]
    orderedSets: boolean[]
    fullRound: boolean[]

    setUp() {
        super.setUp()
        this.numberConcurrent = (this.constructor as any).numberConcurrent
        this.setUpBaseNodes()
    }

    setUpBaseNodes(base: number = 0) {
        // sets up base nodes with a minimum diff of 2
        let numberConcurrent = this.numberConcurrent
        let nodeDiffs = Math.floor(this.length / numberConcurrent)
        if (nodeDiffs < 2) {
            nodeDiffs = 2
            numberConcurrent = Math.floor(this.length / 2)
        }
        this.baseNodes = []
        this.orderedSets = []
        this.fullRound = []
        for(let i = 0; i < numberConcurrent; i++) {
            this.baseNodes.push(0 + i * nodeDiffs)
            if (i === 0) {
                this.orderedSets.push(true)
                this.fullRound.push(true)
            } else {
                this.orderedSets.push(false)
                this.fullRound.push(false)
            }
        }
    }

    currentNodes() {
        if (this.done) {
            return []
        }
        return this.baseNodes
    }

    setUpNext() {
        let indexToRemove
        this.baseNodes.forEach((node, index) => {
            this.baseNodes[index] += 1
        });
        this.baseNodes.forEach((node, index) => {
            if (node == this.end) {
                if (this.fullRound[index]) {
                    this.placed.push(this.end)
                    this.end--
                    this.maxRounds--
                    if (this.maxRounds === 0) {
                        this.done = true
                    }
                }
                if (this.end === 0) {
                    this.done = true
                }
                if (this.orderedSets[index]) {
                    this.done = true
                }

                let nextIndex
                if (index < this.baseNodes.length - 1) {
                    nextIndex = index + 1
                } else {
                    nextIndex = 0
                }

                if (this.baseNodes[nextIndex] <= 1 && this.fullRound[index]) {
                    indexToRemove = index
                } else {
                    this.baseNodes[index] = 0
                }
                this.orderedSets[index] = true
                this.fullRound[index] = true
            }
        })
        if (indexToRemove !== undefined) {
            this.baseNodes.splice(indexToRemove, 1)
            this.orderedSets.splice(indexToRemove, 1)
            this.fullRound.splice(indexToRemove, 1)
        }
    }

    specificNodesInOrder(values: number[], firstIndex: number, secondIndex: number) {
        this.comparisons++
        return values[firstIndex] < values[secondIndex]
    }

    next() {
        if (this.done) {
            return []
        }
        this.steps++
        let currentNodes = this.currentNodes().slice()
        let values = this.board.values()
        let nodes = currentNodes
        currentNodes.forEach((node, index) => {
            if(!this.specificNodesInOrder(values, node, node + 1)) {
                this.orderedSets[index] = false
                this.swap([node, node + 1])
            }
        })
        this.setUpNext()
        this.trackProfile()
        return currentNodes
    }
}

export class BubbleSortConcurrent5 extends BubbleSortConcurrent {
    static title = "Bubble Sort(Concurrent 5)"
    static numberConcurrent = 5
}

export class BubbleSortConcurrent10 extends BubbleSortConcurrent {
    static title = "Bubble Sort(Concurrent 10)"
    static numberConcurrent = 10
}

export class BubbleSortDontRestart extends Bubble {
    static title = "Bubble(Don't restart)"
    looking: boolean

    swapValues(index1: number, index2: number) {
        this.looking = false
        this.swaps++
        let baseValue = this.board.get(this.baseNode).value
        let newValues = this.board.values().slice()
        newValues.splice(index1, 1)
        newValues.splice(index2 - 1, 0, baseValue)
        this.board.setPoints(newValues)
        this.baseNode = Math.max(index1 - 1, 0)
        this.comparisonNode = this.baseNode + 1
    }

    next() {
        if (this.done) {
            return []
        }
        this.steps++
        let currentNodes = this.currentNodes()

        let values = this.board.values()
        if (!this.nodesInOrder(values)) {
            this.looking = true
            this.comparisonNode++
            if (this.comparisonNode === this.length) {
                this.swapValues(this.baseNode, this.comparisonNode)
            }
        } else if (this.looking) {
            this.swapValues(this.baseNode, this.comparisonNode)
        } else {
            this.baseNode++
            this.comparisonNode++
            if (this.comparisonNode === this.length) {
                this.done = true
            }
        }
        this.trackProfile()
        return currentNodes
    }
}
