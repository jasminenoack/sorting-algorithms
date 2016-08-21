var width = 200
var arr = Array.apply(null, {length: width}).map(Number.call, Number)
var delay = 5;
var multiplier = 2;
"use strict"
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

$(document).ready(function () {
    setup();
    window.sorted = true;
    $(".reset").click(setup)

    var sorted = checkSort()
    if (sorted) {return};
    setTimeout(shuffleEdit.bind(this, arr.length - 1), delay)
})

function setup () {
    shuffle(arr)
    $content = $(".content");
    $content.html("")
    for(var i = 0; i < arr.length; i++) {
        var cellValue = arr[i];
        $content.append(
            "<li style=left:"+i*multiplier+"px;bottom:"+cellValue*multiplier+"px></li>"
        )
    }
}

function checkSort() {
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false
        }
    }
    return true
}

function shuffleEdit(index) {
    var sorted = checkSort()
    if (sorted) {
        return
    }
    if (index === 0) {
        return shuffleEdit(arr.length - 1)
    }
    $lis = $("li")
    var randNum = Math.floor(Math.random() * arr.length);
    var cellValue = arr[index];
    arr[index] = arr[randNum];
    arr[randNum] = cellValue;

    setupLis(index, randNum);
    $lis.removeClass("current");
    $($lis[index]).addClass("current")
    setTimeout(shuffleEdit.bind(this, index - 1), delay)
}

function setupLis(a, b) {
    $($lis[a]).css("bottom", arr[a] * multiplier + "px")
    $($lis[b]).css("bottom", arr[b] * multiplier + "px")
}
