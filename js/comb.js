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

        if (arr[index] > arr[index + gap]) {
            sorted = false;
            swapNodes(index, index + gap)
        }
        index++
        setCurrentNode(index)
        $($lis[index + gap]).addClass("current")

        setTimeout(comb.next, delay)
    },
}
