export class Shuffle {
    // this is the max distance we move a number
    static k: number
    static reversed: boolean
    static title: string

    public static shuffle(array: number[]) {
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
    static k = 0
    static reversed = false
    static title = "Ordered"
}

export class RandomShuffle extends Shuffle {
    static k: number = null
    static reversed = false
    static title = "Random"
}

export class K1Shuffle extends Shuffle {
    static k = 1
    static reversed = false
    static title = "K1"
}

export class K3Shuffle extends Shuffle {
    static k = 3
    static reversed = false
    static title = "K3"
}

export class K5Shuffle extends Shuffle {
    static k = 5
    static reversed = false
    static title = "K5"
}

export class K5ReversedShuffle extends Shuffle {
    static k = 5
    static reversed = true
    static title = "K5 Reversed"
}

export class K3ReversedShuffle extends Shuffle {
    static k = 3
    static reversed = true
    static title = "K3 Reversed"
}

export class K1ReversedShuffle extends Shuffle {
    static k = 1
    static reversed = true
    static title = "K1 Reversed"
}

export class ReversedShuffle extends Shuffle {
    static k = 0
    static reversed = true
    static title = "Reversed"
}

export class FirstAndLastSwapped extends Shuffle {
    static k = 0
    static reversed = false
    static title = "First and Last Swapped"

    static swap(array: number[]) {
        [array[0], array[array.length - 1]] = [array[array.length - 1], array[0]]
    }

    static shuffle(array: number[]) {
        (array as any).sortNumbers()
        this.swap(array)

        return array
    }
}

export class FirstTwoSwapped extends FirstAndLastSwapped {
    static k = 0
    static reversed = false
    static title = "First Two Swapped"
    static swap(array: number[]) {
        [array[0], array[1]] = [array[1], array[0]]
    }
}

export class LastTwoSwapped extends FirstAndLastSwapped {
    static k = 0
    static reversed = false
    static title = "Last Two Swapped"

    static swap(array: number[]) {
        [array[array.length - 2], array[array.length - 1]] = [array[array.length - 1], array[array.length - 2]]
    }
}
