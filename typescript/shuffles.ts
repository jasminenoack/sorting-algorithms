namespace Shuffles {
    export class Shuffle {
        // this is the max distance we move a number
        k: number
        reversed: boolean

        shuffle(array) {
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
    }

    export class RandomShuffle extends Shuffle {
        k = null
        reversed = false
    }

    export class K1Shuffle extends Shuffle {
        k = 1
        reversed = false
    }

    export class K3Shuffle extends Shuffle {
        k = 3
        reversed = false
    }

    export class K5Shuffle extends Shuffle {
        k = 5
        reversed = false
    }

    export class K5ReversedShuffle extends Shuffle {
        k = 5
        reversed = true
    }

    export class K3ReversedShuffle extends Shuffle {
        k = 3
        reversed = true
    }

    export class K1ReversedShuffle extends Shuffle {
        k = 1
        reversed = true
    }

    export class ReversedShuffle extends Shuffle {
        k = 0
        reversed = true
    }

    export let ShuffleList = [
        OrderedShuffle,
        K1Shuffle,
        K3Shuffle,
        K5Shuffle,
        RandomShuffle,
        K5ReversedShuffle,
        K3ReversedShuffle,
        K1ReversedShuffle,
        ReversedShuffle
    ]
}
