"use strict"
var width = 100
var running = false;
var arr = Array.apply(null, {length: width}).map(Number.call, Number)
var delay = 5;
var multiplier = 4;

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function superSetup() {
    shuffle(arr)
    var $content = $(".content");
    $content.html("")
    for(var i = 0; i < arr.length; i++) {
        var cellValue = arr[i];
        $content.append(
            "<li style=left:"+i*multiplier+"px;bottom:"+cellValue*multiplier+"px></li>"
        )
    }
    var $lis = $("li")
    $lis.removeClass("current")
    $($lis[0]).addClass("current")
    window.sorted = true;
    window.index = 0;
    if (!running) {
        running = true;
        next()
    }
}

$(document).ready(function () {
    if (window.setup) {
        setup();
        $(".reset").click(setup)
    }
    $(".card header").click(
        function (event) {
            event.stopPropagation();
            $(event.currentTarget).parent().toggleClass("footer-hidden")
        }
    )
})
