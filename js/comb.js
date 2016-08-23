var shrinkFactor = 1.3
window.comb = {
    title: "Comb Sort",

    shrinkGap: function () {
        return Math.max(parseInt(gap / 1.3), 1)
    },

    setup: function () {
        setupArray()
        $lis = $("li")
        window.gap = parseInt(width / shrinkFactor);
        $($lis[gap]).addClass("current")
        superSetup()
    },

    next: function () {
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
            gap = comb.shrinkGap()
            sorted = true;
            index = 0;
            return setTimeout(comb.next, delay)
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
        setTimeout(comb.next, delay)
    },
}
