window.gnome = {
    title: "Gnome Sort",

    setup: function () {
        setupArray()
        window.last = undefined
        window.lengthToCheck = arr.length;
        superSetup()
    },

    next: function () {
        if (stop) {
            stop = false;
            running = false;
            return
        }
        if (index === arr.length) {
            running = false
            return
        }
        if (index === 0) {
            index++
        } else if (arr[index] < arr[index - 1]) {
            swapNodes(index, index - 1)
            index--
        } else {
            index++
        }
        setCurrentNode(index)
        setTimeout(gnome.next, delay)
    },
}
