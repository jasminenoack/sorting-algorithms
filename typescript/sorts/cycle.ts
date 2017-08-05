import {BaseSort} from './baseSort'

export class Cycle extends BaseSort {
    static title = "Cycle Sort"
    currentValue: number
    numberLess: number
    static links = [
        {
            url: 'https://corte.si/posts/code/cyclesort/index.html',
            name: 'Cyclesort - a curious little sorting algorithm'
        }
    ]

    setUp() {
        this.setCurrentValue(this.baseNode)
        this.numberLess = 0
    }

    currentNodes() {
        return [this.comparisonNode]
    }

    setCurrentValue(index: number) {
        this.currentValue = this.board.values()[index]
        this.shadow = [{index: this.baseNode, value: this.currentValue}]
    }

    next() {
        if (this.done) {
            return []
        }
        this.steps++
        let currentNodes = Array.prototype.range(this.length)
        let values = this.board.values()
        this.lesserThanComparison(values)
        this.setUpNext()
        this.trackProfile()
        return currentNodes
    }

    lesserThanComparison(values: number[]) {
        this.comparisons++
        if (this.currentValue > values[this.comparisonNode]) {
            this.numberLess++
        }
    }

    setUpNext() {
        let index = this.numberLess + this.baseNode
        this.comparisonNode++
        if (this.comparisonNode === this.baseNode) {
            this.comparisonNode++
        }
        if (this.comparisonNode === this.length) {
            if (
                index !== this.baseNode ||
                this.currentValue !== this.board.values()[this.baseNode]
            ) {
                let values = this.board.values()
                while(values[index] === this.currentValue) {
                    index++
                }
                let oldValue = this.currentValue
                this.setCurrentValue(index)
                this.board.set(index, oldValue)
                this.swaps++
            }
            if (this.baseNode === index) {
                this.placed.push(this.baseNode)
                this.baseNode++
                this.setCurrentValue(this.baseNode)
            }

            this.comparisonNode = this.baseNode + 1
            this.numberLess = 0

            if (this.baseNode === this.length - 1) {
                this.done = true
            }
        }
    }
}
