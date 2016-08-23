window.bubble = {
    title: "Bubble Sort",

    setup: function () {
        setupArray()
        window.lengthToCheck = arr.length;
        superSetup()
    },

    next: function () {
        if (stop) {
            stop = false;
            running = false;
            return
        }
        if (index + 1 === lengthToCheck) {
            if (sorted) {
                running = false
                return
            }
            sorted = true;
            lengthToCheck--
            index = 0
            return setTimeout(bubble.next, delay)
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
        index++
        setTimeout(bubble.next, delay)
    }
}
