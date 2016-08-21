var width = 200
var arr = Array.apply(null, {length: width}).map(Number.call, Number)
var delay = 5;
var multiplier = 2;

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
    setTimeout(next.bind(this, 0), delay)
    $(".reset").click(setup)
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
    $lis = $("li")
    $lis.removeClass("current")
    $($lis[0]).addClass("current")

    window.maxIndex = arr.length;
    window.minIndex = 0;
    window.direction = 1;
}

function next (index) {
    if (
        (direction > 0 && index + direction === maxIndex) ||
        (direction < 0 && index === minIndex)
    ) {
        if (sorted) {
            return
        }
        sorted = true;
        if (index + direction === maxIndex) {
            maxIndex--
        }
        if (index === minIndex) {
            minIndex++
        }
        direction *= -1
        return setTimeout(next.bind(this, index + direction), delay)
    }
    $lis = $("li")
    if (
        (arr[index] > arr[index + direction] && direction > 0) ||
        (arr[index] < arr[index + direction] && direction < 0)
    ) {
        sorted = false
        var c = arr[index]
        arr[index] = arr[index + direction]
        arr[index + direction] = c
        $($lis[index]).css("bottom", arr[index]*multiplier + "px")
        $($lis[index + direction]).css("bottom", arr[index + direction]*multiplier + "px")
    }
    // if
    $lis.removeClass("current")
    $($lis[index + direction]).addClass("current")
    setTimeout(next.bind(this, index + direction), delay)
}
