namespace Bubble {
    export class Bubble {
        title: string = "Bubble Sort"
        baseNode: number
        comparisonNode: number
        done: boolean = false
        ordered: boolean = true

        constructor(public length: number) {
            this.baseNode = 0
            this.comparisonNode = 1
        }

        currentNodes() {
            return [this.baseNode, this.comparisonNode]
        }

        nodesInOrder(values) {
            let inOrder = values[this.baseNode] < values[this.comparisonNode]
            if (!inOrder) {
                this.ordered = false
            }
            return inOrder
        }

        setUpNext() {
            this.baseNode++
            this.comparisonNode++

            if (this.comparisonNode == this.length) {
                if (this.ordered) {
                    this.done = true
                } else {
                    this.ordered = true
                }
                this.baseNode = 0
                this.comparisonNode = 1
            }
        }

        // next() function () {
        //     if (stop) {
        //         stop = false;
        //         running = false;
        //         return
        //     }
        //     if (index + 1 === lengthToCheck) {
        //         if (sorted) {
        //             running = false
        //             return
        //         }
        //         sorted = true;
        //         lengthToCheck--
        //         index = 0
        //         return setTimeout(bubble.next, delay)
        //     }
        //     if (arr[index] > arr[index + 1]) {
        //         sorted = false
        //         swapNodes(index, index + 1)
        //     }
        //     index++
        //     setCurrentNode(index)
        //     setTimeout(bubble.next, delay)
        // }
    }
}
