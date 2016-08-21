function setup () {
    window.last = undefined
    window.lengthToCheck = arr.length;
    superSetup()
    window.index = 1
}

function next () {
    var $lis = $("li")
    if (index + 2 > arr.length && index % 2 == 0) {
        console.log("last", index)
        if (sorted) {
            running = false;
            return
        }
        index = 1;
        setTimeout(next, delay)
    } else if (index + 2 > arr.length && (index + 1) % 2 == 0) {
        console.log("last", index)
        index = 0;
        sorted = true
        setTimeout(next, delay)
    } else {
        if (arr[index] > arr[index + 1]) {
            sorted = false
            var c = arr[index]
            arr[index] = arr[index + 1]
            arr[index + 1] = c
            $($lis[index]).css("bottom", arr[index] * multiplier + "px")
            $($lis[index + 1]).css("bottom", arr[index + 1] * multiplier + "px")
        }
        index += 2
        $lis.removeClass("current")
        $($lis[index]).addClass("current")
        setTimeout(next, delay)
    }
}
