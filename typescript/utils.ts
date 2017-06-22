interface Array<T> {
    shuffle(): T[];
    range(x: number): T[];
    sortNumbers(): T[];
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
