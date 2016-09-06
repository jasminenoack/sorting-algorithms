smooth = {
    title: "Smooth Sort",

    setup: function () {
        setupArray()
        window.unsortedTop = arr.length - 1
        window.trees = []
        window.siftHead = 0
        window.rootToCompare = 0
        window.roots = []
        window.treesSetup = false
        window.setUpHead = 0
        window.rootIndex = undefined
        superSetup()
    },

    next: function () {
        if (!treesSetup) {
            treesSetup = true;
            return setTimeout(smooth.setUpTrees, delay)
        }
        if (unsortedTop < 1) {
            console.log(arr)
            running = false;
            return;
        }
        return setTimeout(smooth.compareRoots, delay)
    },

    setUpTrees: function () {
        if (setUpHead >= arr.length) {
            return setTimeout(smooth.next, delay)
        }
        // build all the trees
        prevTreeSize = trees[setUpHead - 1]
        prePrevTreeSize = trees[setUpHead - 1 - prevTreeSize]
        if (
            prevTreeSize &&
            prePrevTreeSize &&
            smooth.sizes.indexOf(prevTreeSize + prePrevTreeSize + 1) !== -1
        ) {
            trees.push(prevTreeSize + prePrevTreeSize + 1)
        } else {
            trees.push(1)
        }
        // set siftHead for the sift
        siftHead = setUpHead
        setUpHead++
        window.siftCallback = smooth.setUpTrees
        return setTimeout(smooth.sift, delay)
    },

    sift: function () {
        // sift values down the tree
        var value = arr[siftHead]
        if (trees[siftHead] === 1) {
            return setTimeout(window.siftCallback, delay)
        }
        var right = siftHead - 1
        var left = siftHead - 1 - trees[right]
        if (arr[right] < arr[siftHead] && arr[left] < arr[siftHead]) {
            return setTimeout(window.siftCallback, delay)
        }
        if (arr[right] > arr[left]) {
            arr[siftHead] = arr[right]
            siftHead = right
        } else {
            arr[siftHead] = arr[left]
            siftHead = left
        }
        arr[siftHead] = value
        return setTimeout(smooth.sift, delay)
    },

    compareRoots: function () {
        if (window.rootIndex >= roots.length) {
            window.rootIndex = undefined;
            unsortedTop--
            return setTimeout(smooth.next, delay)
        } else if (window.rootIndex === undefined) {
            window.rootIndex = 0;
        }
        smooth.getTreeRoots(unsortedTop)
        // for (var i = 0; i < roots.length -1; i++) {
            var firstRoot = roots[rootIndex]
            var secondRoot = roots[rootIndex + 1]
            if (arr[firstRoot] > arr[secondRoot]) {
                var c = arr[firstRoot]
                arr[firstRoot] = arr[secondRoot]
                arr[secondRoot] = c
                // set siftHead for the sift
                siftHead = firstRoot
                if (rootIndex !== 0) {
                    rootIndex -= 1;
                } else {
                    rootIndex++
                }
                window.siftCallback = smooth.compareRoots
                return setTimeout(smooth.sift, delay)
            } else {
                rootIndex++
                return setTimeout(smooth.compareRoots, delay)
            }
        // }
    },

    getTreeRoots: function () {
        // returns the tree roots in ascending order.
        window.roots = []
        var i = unsortedTop;
        while (i >= 0) {
            roots.push(i)
            var currentTreeSize = trees[i];
            var i = i - currentTreeSize;
        }
        roots = roots.reverse()
    },

    sizes: [1, 1, 3, 5, 9, 15, 25, 41, 67, 109],
}
