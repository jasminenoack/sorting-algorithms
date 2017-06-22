interface Array<T> {
    shuffle(): T[]
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
