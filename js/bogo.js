function setup () {
    superSetup()
}

function checkSort() {
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false
        }
    }
    return true
}

function next() {
    var sorted = checkSort()
    if (sorted) {
        running = false;
        return
    }
    if (index === 0) {
        index = arr.length - 1
        return next(arr.length - 1)
    }
    $lis = $("li")
    var randNum = Math.floor(Math.random() * arr.length);
    var cellValue = arr[index];
    arr[index] = arr[randNum];
    arr[randNum] = cellValue;

    setupLis(index, randNum);
    $lis.removeClass("current");
    $($lis[index]).addClass("current")
    index--
    setTimeout(next, delay)
}

function setupLis(a, b) {
    $($lis[a]).css("bottom", arr[a] * multiplier + "px")
    $($lis[b]).css("bottom", arr[b] * multiplier + "px")
}
