import {BaseSort} from './baseSort'

export class Cocktail extends BaseSort {
    // is there a way to respect sorted sections?
    direction: number
    start: number
    end: number
    static readonly title = "Cocktail Sort"

    setUp() {
        this.start = 0
        this.end = this.length - 1
        this.direction = 1
    }

    setUpNext() {
        if(this.direction) {
            if (this.comparisonNode === this.end) {
                this.placed.push(this.end)
                this.end--
                this.baseNode--
                this.comparisonNode--
                this.direction = 0
            } else {
                this.baseNode++
                this.comparisonNode++
            }
        } else {
            if (this.baseNode === this.start) {
                this.placed.push(this.start)
                this.direction = 1
                this.start++
                this.baseNode++
                this.comparisonNode++
            } else {
                this.baseNode--
                this.comparisonNode--
            }
        }
        if (!(this.start < this.end)) {
            this.done = true
        }
    }
}
