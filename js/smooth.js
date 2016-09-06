smooth = {
    title: "Smooth Sort",

    setup: function () {
        setupArray()
        superSetup()
    },

    next: function () {
        var arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
        var trees = smooth.setUpTrees(arr)
        smooth.compareRoots(arr, trees)
        // console.log(smooth.determineTreeSizes(arr.length))
    },

    setUpTrees: function (arr) {
        // build all the trees
        var i = 0;
        trees = []

        while ( i < arr.length) {
            prevTreeSize = trees[i - 1]
            prePrevTreeSize = trees[i - 1 - prevTreeSize]
            if (
                prevTreeSize &&
                prePrevTreeSize &&
                smooth.sizes.indexOf(prevTreeSize + prePrevTreeSize + 1) !== -1
            ) {
                trees.push(prevTreeSize + prePrevTreeSize + 1)
            } else {
                trees.push(1)
            }
            smooth.sift(arr, trees, i)
            i++
        }
        return trees
    },

    sift: function (arr, trees, head) {
        // sift values down the tree
        var value = arr[head]
        if (trees[head] === 1) {
            return
        }
        var right = head - 1
        var left = head - 1 - trees[right]
        if (arr[right] < arr[head] && arr[left] < arr[head]) {
            return;
        }
        if (arr[right] > arr[left]) {
            arr[head] = arr[right]
            head = right
        } else {
            arr[head] = arr[left]
            head = left
        }
        arr[head] = value
        smooth.sift(arr, trees, head)
    },

    compareRoots: function (arr, trees) {
        var roots = smooth.getTreeRoots(trees)
        for (var i = 0; i < roots.length -1; i++) {
            var firstRoot = roots[i]
            var secondRoot = roots[i + 1]
            console.log(i, firstRoot, secondRoot)
            if (arr[firstRoot] > arr[secondRoot]) {
                var c = arr[firstRoot]
                arr[firstRoot] = arr[secondRoot]
                arr[secondRoot] = c
                smooth.sift(arr, trees, firstRoot)
                if (i !== 0) {
                    i -= 2;
                }
            }
        }
        console.log(arr)
    },

    getTreeRoots: function (trees) {
        // returns the tree roots in ascending order.
        var roots = []
        var i = trees.length - 1;
        while (i > 0) {
            roots.push(i)
            var currentTreeSize = trees[i];
            var i = i - currentTreeSize;
        }
        return roots.reverse()
    },

    sizes: [1, 1, 3, 5, 9, 15, 25, 41, 67, 109],
}
