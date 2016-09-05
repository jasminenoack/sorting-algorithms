"use strict"
var width = 40;
var multiplier = 10;
var running = false;
var arr = [];
var delay = 30;
var stop = false;
var program = {};

$(document).ready(function () {
    var $template = $("#sort");
    var compiled = _.template($template.html());
    program = window[window.location.search.replace("?", "") || "quicksort"]
    $("body").html(compiled({
        name: program.title,
        delay: delay
    }));
    $(".reset").click(stopAndReset);
    $(".card header").click(
        function (event) {
            event.stopPropagation();
            $(event.currentTarget).parent().toggleClass("footer-hidden")
        }
    );
    $(".x-x-sm").click(function () {
        $(".content").removeClass().addClass("content item-x-x-sm")
        width = 400;
        multiplier = 1;
        stopAndReset();
    });
    $(".x-sm").click(function () {
        $(".content").removeClass().addClass("content item-x-sm")
        width = 200;
        multiplier = 2;
        stopAndReset();
    });
    $(".sm").click(function () {
        $(".content").removeClass().addClass("content item-sm")
        width = 80;
        multiplier = 5;
        stopAndReset();
    });
    $(".md").click(function () {
        $(".content").removeClass().addClass("content item-md")
        width = 40;
        multiplier = 10;
        stopAndReset();
    });
    $(".lg").click(function () {
        $(".content").removeClass().addClass("content item-lg")
        width = 20;
        multiplier = 20;
        stopAndReset();
    });
    $(".x-lg").click(function () {
        $(".content").removeClass().addClass("content item-x-lg")
        width = 10;
        multiplier = 40;
        stopAndReset();
    });
    $(".x-x-lg").click(function () {
        $(".content").removeClass().addClass("content item-x-x-lg")
        width = 5;
        multiplier = 80;
        stopAndReset();
    });
    $(".faster").click(function () {
        delay = Math.min(delay, delay - 10);
        $(".delay").text(delay + " milliseconds")
    });
    $(".slower").click(function () {
        delay += 10;
        $(".delay").text(delay + " milliseconds")
    });

    program.setup();
});


function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
function setupArray () {
    arr = Array.apply(null, {length: width}).map(Number.call, Number)
}

function superSetup(firstIndex) {
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
    window.index = firstIndex || 0;
    if (!running) {
        running = true;
        setTimeout(program.next, delay)
    }
}

function resetIfStopped () {
    if (!stop && !running) {
        program.setup()
    } else {
        setTimeout(resetIfStopped, 5);
    }
}

function stopAndReset() {
    if (!running) {
        program.setup();
    } else {
        stop = true;
        setTimeout(resetIfStopped, 5);
    }
}
