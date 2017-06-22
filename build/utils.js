Array.prototype.shuffle = function () {
    // fisher yates shuffling algorithm
    var newArr = this.slice();
    for (var i = 0; i < this.length; i++) {
        var randomInt = Math.floor(Math.random() * newArr.length);
        this[i] = newArr.splice(randomInt, 1)[0];
    }
    return this;
};
