var shrinkFactor = 1.3

function shrinkGap () {
    return Math.max(parseInt(gap / 1.3), 1)
}

function setup () {
    setupArray()
    $lis = $("li")
    window.gap = parseInt(width / shrinkFactor);
    $($lis[gap]).addClass("current")
    superSetup()
}

function next () {
    if (stop) {
        stop = false;
        running = false;
        return
    }
    if (index + gap >= arr.length) {
        if (gap === 1 && sorted) {
            running = false;
            return
        }
        gap = shrinkGap()
        sorted = true;
        index = 0;
        return setTimeout(next, delay)
    }

    $lis = $("li")
    if (arr[index] > arr[index + gap]) {
        sorted = false;
        var c = arr[index]
        arr[index] = arr[index + gap]
        arr[index + gap] = c
        $($lis[index]).css("bottom", arr[index]*multiplier + "px")
        $($lis[index + gap]).css("bottom", arr[index + gap]*multiplier + "px")
    }
    $lis.removeClass("current")
    $($lis[index + 1]).addClass("current")
    $($lis[index + 1 + gap]).addClass("current")
    index++
    setTimeout(next, delay)
}
