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
Array.prototype.differenceFromOrdered = function () {
    var values = this;
    var ordered = Array.prototype.range(values.length);
    var difference = 0;
    for (var i = 0; i < values.length; i++) {
        difference += Math.abs(values[i] - i);
    }
    return difference;
};
Array.prototype.kShuffle = function (k) {
    var startingArray = this.slice();
    var numberToShuffle = this.length / 5;
    while (numberToShuffle) {
        var indexToInsert = Math.floor(Math.random() * this.length);
        var add = Math.floor(Math.random() * 2);
        var movement = Math.ceil(Math.random() * k);
        var insertPoint = void 0;
        if (add) {
            insertPoint = Math.min(this.length - 1, indexToInsert + movement);
        }
        else {
            insertPoint = Math.max(0, indexToInsert - movement);
        }
        if (insertPoint !== indexToInsert &&
            startingArray[indexToInsert] === this[indexToInsert]) {
            var valueToInsert = this[indexToInsert];
            this.splice(indexToInsert, 1);
            this.splice(insertPoint, 0, valueToInsert);
            numberToShuffle--;
        }
    }
    return this;
};
