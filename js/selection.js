window.selection = {
    title: "Selection Sort",

    setup: function () {
        setupArray()
        selection.setupIndexes(true)
        superSetup()
    },

    setupIndexes: function (setDefault) {
        if (!setDefault) {
            window.unsortedIndex++
        } else {
            window.unsortedIndex = 0;
        }
        window.smallestIndex = window.unsortedIndex;
        window.comparisonIndex = window.unsortedIndex + 1;
    },

    next: function () {
        if (stop) {
            stop = false;
            running = false;
            return;
        }
        $lis = $("li")
        if (window.comparisonIndex == arr.length) {
            // do swap
            var c = arr[unsortedIndex]
            arr[unsortedIndex] = arr[smallestIndex]
            arr[smallestIndex] = c
            $($lis[unsortedIndex]).css("bottom", arr[unsortedIndex]*multiplier + "px")
            $($lis[smallestIndex]).css("bottom", arr[smallestIndex]*multiplier + "px")
            // reset variables
            selection.setupIndexes();
            $lis.removeClass("current")
            $($lis[window.comparisonIndex]).addClass("current")
            if (window.comparisonIndex == arr.length) {
                running = false;
                return;
            }
            return setTimeout(selection.next, delay)
        }
        // compare
        if (arr[window.comparisonIndex] < arr[window.smallestIndex]) {
            window.smallestIndex = window.comparisonIndex;
        }
        window.comparisonIndex++
        // set current
        $lis.removeClass("current")
        $($lis[window.comparisonIndex]).addClass("current")
        return setTimeout(selection.next, delay)
    }
}
