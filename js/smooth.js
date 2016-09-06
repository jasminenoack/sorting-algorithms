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
        window.rootIndex = 0
        superSetup()
    },

    next: function () {
        if (stop) {
            stop = false;
            running = false;
            return
        }
        if (!treesSetup) {
            treesSetup = true;
            return setTimeout(smooth.setUpTrees, delay)
        }
        if (unsortedTop < 1) {
            running = false;
            return;
        }
        smooth.getTreeRoots()
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
        smooth.setCurrentNode(setUpHead)
        setUpHead++
        window.siftCallback = smooth.setUpTrees
        return setTimeout(smooth.sift, delay)
    },

    sift: function () {
        if (stop) {
            stop = false;
            running = false;
            return
        }
        // sift values down the tree
        if (trees[siftHead] === 1) {
            return setTimeout(window.siftCallback, delay)
        }
        var right = siftHead - 1
        var left = siftHead - 1 - trees[right]
        if (arr[right] < arr[siftHead] && arr[left] < arr[siftHead]) {
            return setTimeout(window.siftCallback, delay)
        }
        if (arr[right] > arr[left]) {
            swapNodes(right, siftHead)
            smooth.setCurrentNode(right)
        } else {
            swapNodes(left, siftHead)
            smooth.setCurrentNode(left)
        }
        return setTimeout(smooth.sift, delay)
    },

    compareRoots: function () {
        if (window.rootIndex >= roots.length) {
            window.rootIndex = 0;
            unsortedTop--
            return setTimeout(smooth.next, delay)
        }
        smooth.getTreeRoots(unsortedTop)
        var firstRoot = roots[rootIndex]
        var secondRoot = roots[rootIndex + 1]
        if (arr[firstRoot] > arr[secondRoot]) {
            swapNodes(firstRoot, secondRoot)
            // set siftHead for the sift
            smooth.setCurrentNode(firstRoot)
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
    },

    setCurrentNode(node) {
        siftHead = node;
        $lis = $("li")
        $lis.removeClass("current");
        $($lis[node]).addClass("current")
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
