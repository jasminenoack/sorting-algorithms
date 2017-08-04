export class Shuffle {
    // this is the max distance we move a number
    k: number
    reversed: boolean
    title: string

    shuffle(array: number[]) {
        array.sortNumbers()
        if (this.k === null) {
            array.shuffle()
        } else if (this.k) {
            array.kShuffle(this.k)
        }

        if (this.reversed) {
            array.reverse()
        }
        return array
    }
}

export class OrderedShuffle extends Shuffle {
    k = 0
    reversed = false
    title = "Ordered"
}

export class RandomShuffle extends Shuffle {
    k: number = null
    reversed = false
    title = "Random"
}

export class K1Shuffle extends Shuffle {
    k = 1
    reversed = false
    title = "K1"
}

export class K3Shuffle extends Shuffle {
    k = 3
    reversed = false
    title = "K3"
}

export class K5Shuffle extends Shuffle {
    k = 5
    reversed = false
    title = "K5"
}

export class K5ReversedShuffle extends Shuffle {
    k = 5
    reversed = true
    title = "K5 Reversed"
}

export class K3ReversedShuffle extends Shuffle {
    k = 3
    reversed = true
    title = "K3 Reversed"
}

export class K1ReversedShuffle extends Shuffle {
    k = 1
    reversed = true
    title = "K1 Reversed"
}

export class ReversedShuffle extends Shuffle {
    k = 0
    reversed = true
    title = "Reversed"
}

export let ShuffleList = [
    new OrderedShuffle(),
    new K1Shuffle(),
    new K3Shuffle(),
    new K5Shuffle(),
    new RandomShuffle(),
    new K5ReversedShuffle(),
    new K3ReversedShuffle(),
    new K1ReversedShuffle(),
    new ReversedShuffle()
]
