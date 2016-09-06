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
            swapNodes(unsortedIndex, smallestIndex)
            // reset variables
            selection.setupIndexes();
            setCurrentNode(comparisonIndex)
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
        setCurrentNode(comparisonIndex)
        return setTimeout(selection.next, delay)
    }
}
