window.oddEven = {
    title: "Odd-Even Sort",

    setup: function () {
        setupArray()
        window.last = undefined
        window.lengthToCheck = arr.length;
        superSetup(1)
    },

    next: function () {
        if (stop) {
            stop = false;
            running = false;
            return
        }
        if (index + 2 > arr.length && index % 2 == 0) {
            if (sorted) {
                running = false;
                return
            }
            index = 1;
            setTimeout(oddEven.next, delay)
        } else if (index + 2 > arr.length && (index + 1) % 2 == 0) {
            index = 0;
            sorted = true
            setTimeout(oddEven.next, delay)
        } else {
            if (arr[index] > arr[index + 1]) {
                sorted = false
                swapNodes(index, index + 1)
            }
            index += 2
            setCurrentNode(index)
            setTimeout(oddEven.next, delay)
        }
    },
}
