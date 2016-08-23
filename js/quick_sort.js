window.quicksort = {
    title: "Quicksort",

    setup: function () {
        setupArray()
        window.nextBottomPivot = [0]
        window.nextTopPivot = [arr.length - 1]
        superSetup()
    },

    setupPivot: function () {
        $lis = $("li");
        c = arr[pivotIndex]
        arr[pivotIndex] = arr[topElement]
        arr[topElement] = c
        $($lis[topElement]).css("bottom", arr[topElement] * multiplier + "px")
        $($lis[pivotIndex]).css("bottom", arr[pivotIndex] * multiplier + "px")

        $("li.currentPivot").removeClass("current-pivot")
        $($lis[topElement]).addClass("current-pivot")
        pivotIndex = topElement
        window.lowerIndex = bottomElement;
        window.higherIndex = bottomElement;
        window.index = bottomElement;
        $(".higher-index").removeClass(".higher-index")
        $(".lower-index").removeClass(".lower-index")
        $($lis[lowerIndex]).addClass("lower-index")
        $($lis[higherIndex]).addClass("higher-index")
    },

    pivot: function () {
        if (stop) {
            stop = false;
            running = false;
            return
        }
        $lis = $("li");
        if (index >= topElement) {
            c = arr[pivotIndex]
            arr[pivotIndex] = arr[lowerIndex]
            arr[lowerIndex] = c
            $($lis[lowerIndex]).css("bottom", arr[lowerIndex] * multiplier + "px")
            $($lis[pivotIndex]).css("bottom", arr[pivotIndex] * multiplier + "px")
            $lis.removeClass("current-pivot")
            $($lis[lowerIndex]).addClass("previous-pivot")
            pivotIndex = lowerIndex;
            higherIndex++
            $(".higher-index").removeClass("higher-index").addClass("higher")
            $($lis[higherIndex - 1]).addClass("higher-index")
            if (topElement - pivotIndex > 1) {
                nextTopPivot.push(topElement)
                nextBottomPivot.push(pivotIndex + 1)
            }
            if (pivotIndex - bottomElement > 1) {
                nextTopPivot.push(pivotIndex - 1)
                nextBottomPivot.push(bottomElement)
            }
            return setTimeout(quicksort.next, delay)
        }
        if (arr[index] >  arr[pivotIndex]) {
            higherIndex++
        } else {
            c = arr[lowerIndex]
            arr[lowerIndex] = arr[index]
            arr[index] = c
            $($lis[index]).css("bottom", arr[index] * multiplier + "px")
            $($lis[lowerIndex]).css("bottom", arr[lowerIndex] * multiplier + "px")
            lowerIndex++
            higherIndex++
        }
        $(".higher-index").removeClass("higher-index")
        $(".lower-index").removeClass("lower-index")
        $($lis[lowerIndex - 1]).addClass("lower-index")
        $($lis[higherIndex - 1]).addClass("higher-index")
        index++
        setTimeout(quicksort.pivot, delay)
    },

    next: function () {
        if (stop) {
            stop = false;
            running = false;
            return
        }
        if (!nextTopPivot.length) {
            running = false;
            return
        }
        $(".current").removeClass()
        $(".higher-index").removeClass("higher-index")
        $(".lower-index").removeClass("lower-index")
        window.topElement = nextTopPivot.pop()
        window.bottomElement = nextBottomPivot.pop()
        window.pivotIndex = (
            Math.floor(
                Math.random() * ((topElement + 1) - bottomElement)
            )
        ) + bottomElement;
        index = bottomElement;
        quicksort.setupPivot()
        setTimeout(quicksort.pivot, delay)
    }
}
