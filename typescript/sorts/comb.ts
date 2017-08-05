import {BaseSort} from './baseSort'
import {Gnome} from './gnome'

export class Comb extends BaseSort {
    // test different shrinks
    // test ceil over floor
    static title = "Comb Sort"
    gap: number
    static shrink: number = 1.3
    shrink: number

    setUp() {
        this.shrink = (this.constructor as any).shrink
        this.gap = Math.floor(this.length / this.shrink)
        this.comparisonNode = 0 + this.gap
    }

    setUpNext() {
        this.baseNode++
        this.comparisonNode++

        if (this.comparisonNode >= this.length) {
            if (this.ordered === true && this.gap === 1) {
                this.done = true
            }
            this.gap = Math.max(Math.floor(this.gap / this.shrink), 1)
            this.baseNode = 0
            this.comparisonNode = this.gap
            this.ordered = true
        }
    }
}

export class CombSmallShrink extends Comb {
    static shrink = 1.1
    static title = "Comb(Small Shrink: 1.1)"
}

export class CombLargeShrink extends Comb {
    static shrink = 1.5
    static title = "Comb(Large Shrink: 1.5)"
}

export class CombEvenLarger extends Comb {
    static title = "Comb(Shrink: 2.0)"
    static shrink = 2.0
}

export class CombGnome5 extends BaseSort {
    comb: Comb
    gnome: BaseSort
    gnomeSwitchValue: number = 5
    static title = "Comb & Gnome(at gap 5)"

    setUp() {
        this.comb = new Comb(this.board)
        this.gnome = new Gnome(this.board)
    }

    currentNodes() {
        if (this.comb.gap >= this.gnomeSwitchValue) {
            return this.comb.currentNodes()
        } else {
            return this.gnome.currentNodes()
        }
    }

    reset() {
        super.reset()
        this.gnome.done = false
    }

    next() {
        if (this.done) {
            return []
        }
        let currentNodes
        if (this.comb.gap >= this.gnomeSwitchValue) {
            currentNodes = this.comb.currentNodes()
            this.comb.next()
        } else {
            this.gnome.next()
        }
        this.steps = this.comb.steps + this.gnome.steps
        this.swaps = this.comb.swaps + this.gnome.swaps
        this.comparisons = this.comb.comparisons + this.gnome.comparisons
        this.done = this.gnome.done
        this.trackProfile()
        return currentNodes
    }
}

export class CombGnome3 extends CombGnome5 {
    gnomeSwitchValue: number = 3
    static title = "Comb & Gnome(at gap 3)"
}

export class CombGnome2 extends CombGnome5 {
    gnomeSwitchValue: number = 2
    static title = "Comb & Gnome(at gap 2)"
}

export class CombGnome10 extends CombGnome5 {
    gnomeSwitchValue: number = 10
    static title = "Comb & Gnome(at gap 10)"
}

export class CombGnomeLargeShrink5 extends CombGnome5 {
    static title = "Comb & Gnome(gap 5, shrink 2)"
    gnomeSwitchValue: number = 5
    setUp() {
        this.comb = new CombEvenLarger(this.board)
        this.gnome = new Gnome(this.board)
    }
}

export class CombGnomeLargeShrink2 extends CombGnomeLargeShrink5 {
    static title = "Comb & Gnome(gap 2, shrink 2)"
    gnomeSwitchValue: number = 2
    setUp() {
        this.comb = new CombEvenLarger(this.board)
        this.gnome = new Gnome(this.board)
    }
}

export class CombGnomeLargeShrink3 extends CombGnomeLargeShrink5 {
    static title = "Comb & Gnome(gap 3, shrink 2)"
    gnomeSwitchValue: number = 3
    setUp() {
        this.comb = new CombEvenLarger(this.board)
        this.gnome = new Gnome(this.board)
    }
}

export class CombGnomeLargeShrink10 extends CombGnomeLargeShrink5 {
    static title = "Comb & Gnome(gap 10, shrink 2)"
    gnomeSwitchValue: number = 10
    setUp() {
        this.comb = new CombEvenLarger(this.board)
        this.gnome = new Gnome(this.board)
    }
}
