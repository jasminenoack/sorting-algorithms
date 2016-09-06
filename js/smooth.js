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
        smooth.compareRoots()
        unsortedTop--
        return setTimeout(smooth.next, delay)
    },

    setUpTrees: function () {
        console.log("setupTrees")
        // build all the trees
        var i = 0;

        while ( setUpHead < arr.length) {
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
            smooth.sift()
            setUpHead++
        }

        setTimeout(smooth.next, delay)
    },

    sift: function () {
        console.log("sift")
        // sift values down the tree
        var value = arr[siftHead]
        if (trees[siftHead] === 1) {
            return
        }
        var right = siftHead - 1
        var left = siftHead - 1 - trees[right]
        if (arr[right] < arr[siftHead] && arr[left] < arr[siftHead]) {
            return;
        }
        if (arr[right] > arr[left]) {
            arr[siftHead] = arr[right]
            siftHead = right
        } else {
            arr[siftHead] = arr[left]
            siftHead = left
        }
        arr[siftHead] = value
        smooth.sift()
    },

    compareRoots: function () {
        console.log("compareRoots")
        smooth.getTreeRoots(unsortedTop)
        for (var i = 0; i < roots.length -1; i++) {
            var firstRoot = roots[i]
            var secondRoot = roots[i + 1]
            if (arr[firstRoot] > arr[secondRoot]) {
                var c = arr[firstRoot]
                arr[firstRoot] = arr[secondRoot]
                arr[secondRoot] = c
                // set siftHead for the sift
                siftHead = firstRoot
                smooth.sift()
                if (i !== 0) {
                    i -= 2;
                }
            }
        }
    },

    getTreeRoots: function () {
        console.log("getroots")
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
