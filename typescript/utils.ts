interface Array<T> {
    shuffle(): T[];
    range(x: number): T[];
    sortNumbers(): T[];
    differenceFromOrdered(): number;
    kShuffle(k: number): T[];
    distribution(): {};
}

Array.prototype.shuffle = function (): any[] {
    // fisher yates shuffling algorithm
    let newArr = this.slice()
    for (let i = 0; i < this.length; i++) {
        let randomInt = Math.floor(Math.random() * newArr.length)
        this[i] = newArr.splice(randomInt, 1)[0]
    }
    return this
}

Array.prototype.range = function (length): any[] {
    let arr = []
    for (let i = 0; i < length; i++) {
        arr.push(i)
    }
    return arr
}

Array.prototype.sortNumbers = function(): any[] {
    this.sort(function(x, y) {
        if (x < y) {
            return -1
        } else if (y < x) {
            return 1
        } else {
            return 0
        }
    })
    return this
}

Array.prototype.differenceFromOrdered = function(): number {
    let values = this
    let ordered = Array.prototype.range(values.length)
    let difference = 0
    for(let i = 0; i < values.length; i++) {
        difference += Math.abs(values[i] - i)
    }
    return difference
}

Array.prototype.kShuffle = function(k): any[] {
    let startingArray = this.slice()
    let numberToShuffle = this.length / 5
    while (numberToShuffle) {
        let indexToInsert = Math.floor(Math.random() * this.length);
        let add = Math.floor(Math.random() * 2)
        let movement = Math.ceil(Math.random() * k)

        let insertPoint
        if (add) {
            insertPoint = Math.min(this.length - 1, indexToInsert + movement)
        } else {
            insertPoint = Math.max(0, indexToInsert - movement)
        }
        if (
            insertPoint !== indexToInsert &&
            startingArray[indexToInsert] === this[indexToInsert]
        ) {
            // console.log(indexToInsert, insertPoint)
            let valueToInsert = this[indexToInsert]
            this.splice(indexToInsert, 1);
            this.splice(insertPoint, 0, valueToInsert);
            numberToShuffle--
        }
    }
    return this
}

Array.prototype.distribution = function (): {} {
    let dist = {}
    let values = this
    values.forEach((value) => {
        dist[value] = (dist[value] || 0) + 1
    })
    return dist
}
