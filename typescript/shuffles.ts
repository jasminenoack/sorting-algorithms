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

export class FirstAndLastSwapped extends Shuffle {
    k = 0
    reversed = false
    title = "First and Last Swapped"

    swap(array: number[]) {
        [array[0], array[array.length - 1]] = [array[array.length - 1], array[0]]
    }

    shuffle(array: number[]) {
        (array as any).sortNumbers()
        this.swap(array)

        return array
    }
}

export class FirstTwoSwapped extends FirstAndLastSwapped {
    k = 0
    reversed = false
    title = "First Two Swapped"
    swap(array: number[]) {
        [array[0], array[1]] = [array[1], array[0]]
    }
}

export class LastTwoSwapped extends FirstAndLastSwapped {
    k = 0
    reversed = false
    title = "Last Two Swapped"

    swap(array: number[]) {
        [array[array.length - 2], array[array.length - 1]] = [array[array.length - 1], array[array.length - 2]]
    }
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
    new ReversedShuffle(),
    new FirstAndLastSwapped(),
    new FirstTwoSwapped(),
    new LastTwoSwapped()
]
