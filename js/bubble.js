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
        if (arr[index] > arr[index + 1]) {
            sorted = false
            swapNodes(index, index + 1)
        }
        index++
        setCurrentNode(index)
        setTimeout(bubble.next, delay)
    }
}
