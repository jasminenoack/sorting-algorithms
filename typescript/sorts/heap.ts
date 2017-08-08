import {BaseSort} from './baseSort'

export class Heap extends BaseSort {
    static title = "Heap Sort"
    nodesToHeap: number[]

    setUp() {
        this.nodesToHeap = []
        let heapIndex = Math.floor(this.length / 2)  - 1
        for (let i = heapIndex; i >= 0; i--) {
            this.nodesToHeap.push(i)
        }
        this.comparisonNode = this.length - 1
    }

    currentNodes() {
        if (this.done) {
            return []
        }
        if (this.nodesToHeap.length) {
            return [this.nodesToHeap[0]]
        } else {
            return [0]
        }
    }

    heapify(node: number) {
        let values = this.board.values()
        let comparison = values[node]
        let leftChild = (2 * node) + 1
        let rightChild = (2 * node) + 2
        let left = leftChild <= this.comparisonNode && values[leftChild]
        let right = rightChild <= this.comparisonNode && values[rightChild]
        let swapNode
        this.comparisons += 2
        if (((left || left === 0) && left > comparison) || ((right || right === 0) && right > comparison)) {
            this.comparisons++
            if ((right || right === 0) && right > left) {
                swapNode = rightChild
            } else {
                swapNode = leftChild
            }
            this.swap([node, swapNode])
            let possibleChild = (2 * swapNode) + 1
            if (possibleChild <= this.comparisonNode) {
                this.nodesToHeap.unshift(swapNode)
            }
        }
    }

    removeNode() {
        this.swap([0, this.comparisonNode])
        this.placed.push(this.comparisonNode)
        this.nodesToHeap.unshift(0)
        this.comparisonNode--
    }

    next() {
        if (this.done) {
            return []
        }
        this.steps++
        let currentNodes = []
        if (this.nodesToHeap.length) {
            let node = this.nodesToHeap.shift()
            currentNodes.push(node)
            this.heapify(node)
        } else {
            this.removeNode()
        }
        if(this.comparisonNode === 0) {
            this.setDone()
        }
        this.trackProfile()
        return currentNodes
    }
}
