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
        var $lis = $("li")
        if (index === arr.length) {
            running = false
            return
        }
        if (index === 0) {
            index++
        } else if (arr[index] < arr[index - 1]) {
            var c = arr[index]
            arr[index] = arr[index - 1]
            arr[index - 1] = c
            $($lis[index]).css("bottom", arr[index] * multiplier + "px")
            $($lis[index - 1]).css("bottom", arr[index - 1] * multiplier + "px")
            index--
        } else {
            index++
        }
        $lis.removeClass("current")
        $($lis[index]).addClass("current")
        setTimeout(gnome.next, delay)
    },
}
