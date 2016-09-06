window.stooge = {
    title: "Stooge Sort",

    setup: function () {
        setupArray()
        window.firstIndexes = [0]
        window.lastIndexes = [arr.length - 1]
        superSetup()
    },

    next: function () {
        var $lis = $("li")
        if (stop) {
            stop = false
            running = false
            return
        }
        if(!window.firstIndexes.length) {
            running = false
            return
        }

        i = firstIndexes.pop()
        j = lastIndexes.pop()
        setCurrentNode(i)
        $($lis[j]).addClass("current")

        if (arr[j] < arr[i]) {
            swapNodes(i, j)
        }

        if (j - i > 1) {
            var t = Math.floor((j - i + 1) / 3);
            firstIndexes.push(i)
            firstIndexes.push(i + t)
            firstIndexes.push(i)
            lastIndexes.push(j-t)
            lastIndexes.push(j)
            lastIndexes.push(j-t)
        }
        setTimeout(stooge.next, delay)
    }
};
