import {BaseSort} from './baseSort'

export class Smooth extends BaseSort {
    static title = "Smooth Sort"
    static links = [
        {
            url: 'http://scidok.sulb.uni-saarland.de/volltexte/2011/4062/pdf/fb14_1982_11.pdf',
            name: "Smoothsort's Behavior on Presorted Sequences"
        }
    ]
    // size of each tree
    treeSizes: number[]
    // tree roots
    roots: number[]
    // numbers
    leonardoNumbers: number[]
    nodesToHeap: number[]
    rootsToCompare: number[]
    static fromBottom: boolean = false
    fromBottom: boolean

    setUp() {
        this.leonardoNumbers = []
        this.nodesToHeap = []
        this.rootsToCompare = []
        this.roots = []
        this.treeSizes = []
        this.fromBottom = (this.constructor as any).fromBottom
        this.setUpNumbers(this.fromBottom)
    }

    setUpNumbers(fromBottom: boolean) {
        this.leonardoNumbers = this.getLeoNums(this.length)
        if (!fromBottom) {
            this.treeSizes = this.getTreeSizes(this.length)
        }
    }

    getLeoNums(length: number) {
        let numbers = [1, 1]
        while(true) {
            let nextNum = numbers[numbers.length - 1] + numbers[numbers.length - 2] + 1
            if (nextNum >= this.length) {
                break
            }
            numbers.push(nextNum)
        }
        return numbers
    }

    getTreeSizes(length: number) {
        let numbers = []
        for (let i = 0; i < length; i++) {
            let sub1: number = numbers[i - 1]
            let sub2: number = numbers[i - 1 - sub1]
            if (this.leonardoNumbers.indexOf(sub1 + sub2 + 1) !== -1) {
                numbers.push(sub1 + sub2 + 1)
                this.roots.splice(this.roots.length - 2, 2, i)
                if (!this.fromBottom) {
                    this.nodesToHeap.push(i)
                }
            } else {
                numbers.push(1)
                this.roots.push(i)
            }
        }
        this.rootsToCompare = this.roots.slice()
        return numbers
    }

    currentNodes() {
        if (this.done) {
            return []
        }
        let nodes: number[]
        if (this.nodesToHeap.length) {
            return [this.nodesToHeap[0]]
        } else if (this.rootsToCompare.length) {
            return [this.rootsToCompare[0]]
        } else {
            return [this.roots[this.roots.length - 1]]
        }
    }

    next() {
        if (this.done) {
            return []
        }
        this.steps++
        let nodes: number[]
        if (this.nodesToHeap.length) {
            nodes = this.heapify(this.nodesToHeap.shift())
        } else if (this.rootsToCompare.length) {
            nodes = this.compare(this.rootsToCompare)
        } else if (this.fromBottom && this.baseNode < this.length) {
            nodes = this.addNextNode(this.baseNode)
            this.baseNode++
        } else {
            nodes = this.remove(this.roots.pop())
        }
        if (!this.roots.length && !(this.fromBottom && this.baseNode < this.length)) {
            this.setDone()
        }
        this.trackProfile()
        return nodes
    }

    addNextNode(index: number) {
        let [sub1, sub2] = this.getChildren(index)
        let nodes

        if (sub2 < 0) {
            // there is only sub 1
            this.roots.push(index)
            nodes = this.compare(this.roots.slice())
            this.treeSizes.push(1)
        } else if (this.leonardoNumbers.indexOf(1 + this.treeSizes[sub1] + this.treeSizes[sub2]) !== -1) {
            // combine trees
            nodes = this.heapify(index)
            this.roots.splice(this.roots.length - 2, 2, index)
            this.treeSizes.push(1 + this.treeSizes[sub1] + this.treeSizes[sub2])
        } else {
            // we are adding a tree
            this.treeSizes.push(1)
            this.roots.push(index)
            nodes = this.compare(this.roots.slice())
        }
        return nodes
    }

    compare(nodes: number[]) {
        let current = nodes.slice()
        let endpoint = nodes[nodes.length - 1]
        let maxNode = nodes[0]
        let values = this.board.values()
        for (let i = 1; i < nodes.length; i ++) {
            this.comparisons++
            if (values[maxNode] < values[nodes[i]]) {
                maxNode = nodes[i]
            }
        }

        if (maxNode !== endpoint) {
            this.swap([maxNode, endpoint])
            if (this.treeSizes[maxNode] > 1) {
                this.nodesToHeap.push(maxNode)
            }
        }

        if (nodes.length > 2) {
            let pickedIndex = nodes.indexOf(maxNode)
            nodes.splice(nodes.length - 1, 1)
            this.rootsToCompare = nodes
        } else {
            this.rootsToCompare = []
        }
        return current
    }

    remove(index: number) {
        let nodes = [index]
        if (this.treeSizes[index] > 1) {
            let [sub1, sub2] = this.getChildren(index)
            let prevRoot: number
            this.roots.push(sub2)
            this.roots.push(sub1)
            this.rootsToCompare = this.roots.slice()
        }
        this.placed.push(index)
        return nodes
    }

    getChildren(index: number) {
        let sub1 = index - 1
        let sub2 = sub1 - this.treeSizes[sub1]
        return [sub1, sub2]
    }

    heapify(index: number) {
        let nodes = [index]
        let [sub1, sub2] = this.getChildren(index)
        this.comparisons += 2
        let values = this.board.values()
        if (values[index] < values[sub1] || values[index] < values[sub2]) {
            this.comparisons++
            let high = values[sub2] > values[sub1] ? sub2 : sub1
            this.swap([index, high])
            nodes = [index, high]
            if (this.treeSizes[high] > 1) {
                this.nodesToHeap.unshift(high)
            }
        }
        return nodes
    }
}

export class SmoothSetUpBottom extends Smooth {
    static title = 'Smooth Sort(Set up from bottom)'
    static fromBottom: boolean = true

    setUp() {
        super.setUp()
        this.baseNode = 1
        this.treeSizes = [1]
        this.roots = [0]
    }
}
