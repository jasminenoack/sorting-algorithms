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
})

function setup () {
    shuffle(arr)
    $content = $(".content");
    for(var i = 0; i < arr.length; i++) {
        var cellValue = arr[i];
        $content.append(
            "<li style=left:"+i*multiplier+"px;bottom:"+cellValue*multiplier+"px></li>"
        )
    }
    $lis = $("li")
    $lis.removeClass("current")
    $($lis[0]).addClass("current")
    window.lengthToCheck = arr.length;
}

function next (index) {
    if (index + 1 === lengthToCheck) {
        if (sorted) {
            return
        }
        sorted = true;
        lengthToCheck--
        return setTimeout(next.bind(this, 0), delay)
    }
    $lis = $("li")
    if (arr[index] > arr[index + 1]) {
        sorted = false
        var c = arr[index]
        arr[index] = arr[index + 1]
        arr[index + 1] = c
        $($lis[index]).css("bottom", arr[index]*multiplier + "px")
        $($lis[index + 1]).css("bottom", arr[index + 1]*multiplier + "px")
    }
    $lis.removeClass("current")
    $($lis[index + 1]).addClass("current")
    setTimeout(next.bind(this, index+1), delay)
}
