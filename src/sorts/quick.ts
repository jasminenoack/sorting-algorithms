import {BaseSort} from './baseSort'

export class QuickSort2 extends BaseSort {
    static title = "Quick Sort(Left Partition)"
    addToUpdate: number[]
    partition: number
    partitions: any[]
    partitionValue: number
    lower: number
    higher: number
    partitionStart: number
    partitionEnd: number
    // for 3-way partition
    partitionTop: number
    threeWay: boolean = false

    setUp() {
        this.addToUpdate = []
        this.partitions = []
        this.setUpValues([this.baseNode, this.length -1])
    }

    setUpValues(values: number[]) {
        this.lower = values[0]
        this.higher = values[0]
        this.partitionStart = values[0]
        this.partitionEnd = values[1]
        this.setPartition()
        this.partitionTop  = this.partition
    }

    currentNodes() {
        let nodes = []
        if (this.partition !== this.lower) {
            nodes.push(this.lower)
        }
        nodes.push(this.partition)
        if (this.partition !== this.higher) {
            nodes.push(this.higher)
        }
        return nodes
    }

    setUpNext(): number[] {
        // if higher is at the end of the current partition
        if (this.higher === this.partitionEnd) {
            if (this.threeWay) {
                for (let i = this.partition; i <= this.partitionTop; i++) {
                    this.placed.push(i)
                }
            } else {
                this.placed.push(this.partition)
            }
            let partitions = this.partitions
            let topLow
            if (this.threeWay) {
                topLow = this.partitionTop
            } else {
                topLow = this.partition
            }

            if (this.higher > topLow + 1) {
                partitions.unshift([topLow + 1, this.higher])
            }
            if (this.lower < this.partition - 1) {
                partitions.unshift([this.lower, this.partition - 1])
            }

            if (partitions.length) {
                let newPartition = partitions.shift()
                this.setUpValues(newPartition)
            } else {
                this.setDone()
                return []
            }
        }
    }

    setPartition() {
        this.partition = this.lower
    }

    next() {
        if (this.done) {
            return []
        }
        this.steps++

        let valuesToUpdate: number[] = []
        // look at the next value
        this.higher++
        let values = this.board.values()

        this.comparisons++
        let threeWay = this.threeWay && values[this.higher] === values[this.partition]
        if (values[this.higher] < values[this.partition] || threeWay) {
            // if the value at higher is less than the partition
            this.swaps++
            let temp = values.splice(this.higher, 1)[0];
            values.splice(this.partition, 0, temp)
            this.board.setPoints(values)

            if (threeWay) {
                this.partitionTop++
            } else {
                this.partition++
                this.partitionTop++
            }

            for (let i = this.partition - 1; i <= this.higher; i++) {
                if (i >= 0) {
                    valuesToUpdate.push(i)
                }
            }
        }
        if (
            this.addToUpdate.length
        ) {
            this.addToUpdate.forEach((index) => {
                if (valuesToUpdate.indexOf(index) === -1) {
                    valuesToUpdate.push(index)
                }
            })
            this.addToUpdate = []
        }
        this.setUpNext()
        this.trackProfile()
        return valuesToUpdate
    }
}

export class QuickSort2RightPartition extends QuickSort2 {
    static title = "Quick Sort(Right Partition)"

    setPartition() {
        this.partition = this.lower
        let temp = this.board.get(this.partitionEnd).value
        this.board.set(this.partitionEnd, this.board.get(this.partition).value)
        this.board.set(this.partition, temp)
        this.addToUpdate = [this.lower, this.partitionEnd]
    }

}

export class QuickSort2Random extends QuickSort2 {
    static title = "Quick Sort(Random Partition)"

    setPartition() {
        let diff = this.partitionEnd - this.partitionStart + 1
        let index = this.partitionStart + Math.floor(Math.random() * diff)
        this.partition = this.lower
        let temp = this.board.get(index).value
        this.board.set(index, this.board.get(this.partition).value)
        this.board.set(this.partition, temp)
        this.addToUpdate = [this.lower, index]
    }
}

export class QuickSort3 extends QuickSort2 {
    static title = "Quick Sort 3(Left Partition)"
    threeWay: boolean = true
}

export class QuickSort3RightPartition extends QuickSort2RightPartition {
    static title = "Quick Sort 3(Right Partition)"
    threeWay: boolean = true
}

export class QuickSort3Random extends QuickSort2Random {
    static title = "Quick Sort 3(Random Partition)"
    threeWay: boolean = true
}
