window.cocktail = {
    title: "Cocktail Sort",

    setup: function () {
        setupArray()
        window.maxIndex = arr.length;
        window.minIndex = 0;
        window.direction = 1;
        superSetup()
    },

    next: function () {
        if (stop) {
            stop = false;
            running = false;
            return
        }
        if (
            (direction > 0 && index + direction === maxIndex) ||
            (direction < 0 && index === minIndex)
        ) {
            if (sorted) {
                running = false
                return
            }
            sorted = true;
            if (index + direction === maxIndex) {
                maxIndex--
            }
            if (index === minIndex) {
                minIndex++
            }
            direction *= -1
            index += direction
            return setTimeout(cocktail.next, delay)
        }
        $lis = $("li")
        if (
            (arr[index] > arr[index + direction] && direction > 0) ||
            (arr[index] < arr[index + direction] && direction < 0)
        ) {
            sorted = false
            var c = arr[index]
            arr[index] = arr[index + direction]
            arr[index + direction] = c
            $($lis[index]).css("bottom", arr[index]*multiplier + "px")
            $($lis[index + direction]).css("bottom", arr[index + direction]*multiplier + "px")
        }
        $lis.removeClass("current")
        $($lis[index + direction]).addClass("current")
        index += direction
        setTimeout(cocktail.next, delay)
    },
}
