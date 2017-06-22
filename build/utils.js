Array.prototype.shuffle = function () {
    // fisher yates shuffling algorithm
    var newArr = this.slice();
    for (var i = 0; i < this.length; i++) {
        var randomInt = Math.floor(Math.random() * newArr.length);
        this[i] = newArr.splice(randomInt, 1)[0];
    }
    return this;
};
Array.prototype.range = function (length) {
    var arr = [];
    for (var i = 0; i < length; i++) {
        arr.push(i);
    }
    return arr;
};
Array.prototype.sortNumbers = function () {
    this.sort(function (x, y) {
        if (x < y) {
            return -1;
        }
        else if (y < x) {
            return 1;
        }
        else {
            return 0;
        }
    });
    return this;
};
