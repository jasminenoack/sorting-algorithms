window.cycle = {
    title: "Cycle Sort",

    setup: function () {
        setupArray()
        cycle.setupIndexes(true)
        superSetup()
    },

    setupIndexes: function (setDefault) {
        if (!setDefault) {
            window.cycleStart++
        } else {
            window.cycleStart = 0;
        }
        window.comparisonIndex = window.cycleStart + 1;
        window.currentValue = undefined;
        window.expectedPos = window.cycleStart;
    },

    next: function () {
        // If we don't know the current value we find it.
        if (currentValue === undefined) {
            currentValue = arr[cycleStart];
        }
        if (stop) {
            stop = false;
            running = false;
            return;
        }
        $lis = $("li")
        if (window.comparisonIndex == arr.length) {
            // do swap
            c = arr[expectedPos]
            arr[expectedPos] = currentValue
            currentValue = c
            $($lis[expectedPos]).css("bottom", arr[expectedPos]*multiplier + "px")

            // if expectedPos == cycleStart
            if (expectedPos == cycleStart) {
                cycle.setupIndexes()
                if (cycleStart == arr.length) {
                    running = false;
                    return
                }
                return setTimeout(cycle.next, delay)
            } else {
                comparisonIndex = cycleStart + 1
                expectedPos = cycleStart
                return setTimeout(cycle.next, delay)
            }
        }
        // // compare
        if (arr[window.comparisonIndex] < window.currentValue) {
            window.expectedPos++
        }
        window.comparisonIndex++
        // // set current
        setCurrentNode(comparisonIndex)
        return setTimeout(cycle.next, delay)
    }
}
