describe("Sorts", function() {
    let length, sort, board, size;

    describe("bubble", () => {
        beforeEach(function() {
            length = 10
            size = Sizes.xXLarge
            board = new Boards.Board(size)
            sort = new Sorts.Bubble(board)
        });
        describe("create", function () {
            it("has a swaps count", () => {
                expect(sort.swaps).toEqual(0)
            })

            it("has a comparisons count", () => {
                expect(sort.comparisons).toEqual(0)
            })

            it("creates a bubble sort", () => {
                expect(sort).toBeTruthy()
            })

            it("it has a title", () => {
                expect(Sorts.Bubble.title).toEqual('Bubble Sort')
            })

            it("it has a base node", () => {
                expect(sort.baseNode).toEqual(0)
            })

            it("it has a comparison node", () => {
                expect(sort.comparisonNode).toEqual(1)
            })

            it("has a board", () => {
                expect(sort.board).toEqual(board)
            })

            it("it knows the board length", () => {
                expect(sort.length).toEqual(length)
            })

            it("starts as unsorted", () => {
                expect(sort.done).toEqual(false)
            })

            it("starts with ordered param", () => {
                expect(sort.ordered).toEqual(true)
            })
        })

        describe("utils", () => {
            it("it returns the current node indexs", () => {
                expect(sort.currentNodes()).toEqual([0, 1])
                sort.baseNode = 5
                sort.comparisonNode = 6
                expect(sort.currentNodes()).toEqual([5, 6])
            })

            it("it knows if nodes need to be switched", () => {
                let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                expect(sort.nodesInOrder(values)).toBeTruthy()
                expect(sort.ordered).toBeTruthy()
                values = [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]
                expect(sort.nodesInOrder(values)).toBeFalsy()
                expect(sort.ordered).toBeFalsy()
                sort.baseNode = 5
                sort.comparisonNode = 6
                expect(sort.nodesInOrder(values)).toBeTruthy()
                expect(sort.ordered).toBeFalsy()
            })

            it("it changes to the next nodes", () => {
                expect(sort.currentNodes()).toEqual([0, 1])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([1, 2])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([2, 3])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([3, 4])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([4, 5])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([5, 6])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([6, 7])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([7, 8])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([8, 9])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([0, 1])
            })

            it("it changes to done if reseting with ordered", () => {
                let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                expect(sort.ordered).toBeTruthy()
                sort.setUpNext()
                expect(sort.done).toEqual(true)
                expect(sort.swaps).toEqual(0)
                expect(sort.comparisons).toEqual(9)
            })

            it("if not ordered reset changes ordered back but not done", () => {
                let values = [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                expect(sort.ordered).toBeFalsy()
                sort.setUpNext()
                expect(sort.ordered).toBeTruthy()
                expect(sort.done).toEqual(false)
            })

            it("performs full step and returns list of nodes to render", () => {
                board.setPoints([1, 0, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next(board)).toEqual([0, 1])
                expect(sort.ordered).toBeFalsy()
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next(board)).toEqual([1, 2])
                expect(sort.next(board)).toEqual([2, 3])
                expect(sort.next(board)).toEqual([3, 4])
                expect(sort.next(board)).toEqual([4, 5])
                expect(sort.next(board)).toEqual([5, 6])
                expect(sort.next(board)).toEqual([6, 7])
                expect(sort.next(board)).toEqual([7, 8])
                expect(sort.ordered).toEqual(false)
                expect(sort.done).toEqual(false)
                expect(sort.next(board)).toEqual([8, 9])
                expect(sort.ordered).toEqual(true)
                expect(sort.done).toEqual(false)
                expect(sort.next(board)).toEqual([0, 1])
                expect(sort.next(board)).toEqual([1, 2])
                expect(sort.next(board)).toEqual([2, 3])
                expect(sort.next(board)).toEqual([3, 4])
                expect(sort.next(board)).toEqual([4, 5])
                expect(sort.next(board)).toEqual([5, 6])
                expect(sort.next(board)).toEqual([6, 7])
                expect(sort.next(board)).toEqual([7, 8])
                expect(sort.next(board)).toEqual([8, 9])
                expect(sort.ordered).toEqual(true)
                expect(sort.done).toEqual(true)
                expect(sort.comparisons).toEqual(18)
                expect(sort.swaps).toEqual(1)
            })
        })
    })

    describe("cocktail", () => {
        beforeEach(function() {
            length = 10
            size = Sizes.xXLarge
            board = new Boards.Board(size)
            sort = new Sorts.Cocktail(board)
        });
        describe("create", function () {
            it("has a swaps count", () => {
                expect(sort.swaps).toEqual(0)
            })

            it("has a comparisons count", () => {
                expect(sort.comparisons).toEqual(0)
            })

            it("creates a sort", () => {
                expect(sort).toBeTruthy()
            })

            it("it has a title", () => {
                expect(Sorts.Cocktail.title).toEqual('Cocktail Sort')
            })

            it("it has a base node", () => {
                expect(sort.baseNode).toEqual(0)
            })

            it("it has a comparison node", () => {
                expect(sort.comparisonNode).toEqual(1)
            })

            it("it has a direction", () => {
                expect(sort.direction).toEqual(1)
            })

            it("has a board", () => {
                expect(sort.board).toEqual(board)
            })

            it("it knows the board length", () => {
                expect(sort.length).toEqual(length)
            })

            it("starts as unsorted", () => {
                expect(sort.done).toEqual(false)
            })

            it("has a start node", () => {
                expect(sort.start).toEqual(0)
            })

            it("it has an end node", () => {
                expect(sort.end).toEqual(9)
            })
        })

        describe("utils", () => {
            it("it returns the current node indexes", () => {
                expect(sort.currentNodes()).toEqual([0, 1])
                sort.baseNode = 5
                sort.comparisonNode = 6
                expect(sort.currentNodes()).toEqual([5, 6])
            })

            it("it knows if nodes need to be switched", () => {
                let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                expect(sort.nodesInOrder(values)).toBeTruthy()
                expect(sort.ordered).toBeTruthy()
                values = [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]
                expect(sort.nodesInOrder(values)).toBeFalsy()
                expect(sort.ordered).toBeFalsy()
                sort.baseNode = 5
                sort.comparisonNode = 6
                expect(sort.nodesInOrder(values)).toBeTruthy()
                expect(sort.ordered).toBeFalsy()
            })

            it("it changes to the next nodes", () => {
                expect(sort.currentNodes()).toEqual([0, 1])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([1, 2])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([2, 3])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([3, 4])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([4, 5])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([5, 6])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([6, 7])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([7, 8])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([8, 9])
                expect(sort.direction).toEqual(1)
                sort.setUpNext()
                expect(sort.direction).toEqual(0)
                expect(sort.currentNodes()).toEqual([7, 8])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([6, 7])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([5, 6])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([4, 5])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([3, 4])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([2, 3])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([1, 2])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([0, 1])
                expect(sort.direction).toEqual(0)
                sort.setUpNext()
                expect(sort.direction).toEqual(1)
                expect(sort.currentNodes()).toEqual([1, 2])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([2, 3])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([3, 4])
            })

            it("it tracks comparisons", () => {
                let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                expect(sort.swaps).toEqual(0)
                expect(sort.comparisons).toEqual(9)
            })

            it("changes to done at the end of the sort", () => {
                sort.start = 5
                sort.end = 6
                sort.baseNode = 5
                sort.comparisonNode = 6
                expect(sort.done).toBeFalsy()
                sort.setUpNext()
                expect(sort.done).toBeTruthy()
            })

            it("performs full step and returns list of nodes to render", () => {
                board.setPoints([1, 0, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next(board)).toEqual([0, 1])
                expect(sort.ordered).toBeFalsy()
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next(board)).toEqual([1, 2])
                expect(sort.next(board)).toEqual([2, 3])
                expect(sort.next(board)).toEqual([3, 4])
                expect(sort.next(board)).toEqual([4, 5])
                expect(sort.next(board)).toEqual([5, 6])
                expect(sort.next(board)).toEqual([6, 7])
                expect(sort.next(board)).toEqual([7, 8])
                expect(sort.next(board)).toEqual([8, 9])
                expect(sort.next(board)).toEqual([7, 8])
                expect(sort.next(board)).toEqual([6, 7])
                expect(sort.next(board)).toEqual([5, 6])
                expect(sort.next(board)).toEqual([4, 5])
                expect(sort.next(board)).toEqual([3, 4])
                expect(sort.next(board)).toEqual([2, 3])
                expect(sort.next(board)).toEqual([1, 2])
                expect(sort.next(board)).toEqual([0, 1])
                expect(sort.next(board)).toEqual([1, 2])
                expect(sort.next(board)).toEqual([2, 3])
                expect(sort.next(board)).toEqual([3, 4])
                expect(sort.next(board)).toEqual([4, 5])
                expect(sort.next(board)).toEqual([5, 6])
                expect(sort.next(board)).toEqual([6, 7])
                expect(sort.next(board)).toEqual([7, 8])
                expect(sort.next(board)).toEqual([6, 7])
                expect(sort.next(board)).toEqual([5, 6])
                expect(sort.next(board)).toEqual([4, 5])
                expect(sort.next(board)).toEqual([3, 4])
                expect(sort.next(board)).toEqual([2, 3])
                expect(sort.next(board)).toEqual([1, 2])
                expect(sort.next(board)).toEqual([2, 3])
                expect(sort.next(board)).toEqual([3, 4])
                expect(sort.next(board)).toEqual([4, 5])
                expect(sort.next(board)).toEqual([5, 6])
                expect(sort.next(board)).toEqual([6, 7])
            })
        })
    })

    describe("comb", () => {
        beforeEach(function() {
            length = 10
            size = Sizes.xXLarge
            board = new Boards.Board(size)
            sort = new Sorts.Comb(board)
        });
        describe("create", function () {
            it("has a swaps count", () => {
                expect(sort.swaps).toEqual(0)
            })

            it("has a comparisons count", () => {
                expect(sort.comparisons).toEqual(0)
            })

            it("creates a sort", () => {
                expect(sort).toBeTruthy()
            })

            it("it has a title", () => {
                expect(Sorts.Comb.title).toEqual('Comb Sort')
            })

            it("it has a base node", () => {
                expect(sort.baseNode).toEqual(0)
            })

            it("it has a comparison node", () => {
                expect(sort.comparisonNode).toEqual(Math.floor(10 / 1.3))
            })

            it("has a board", () => {
                expect(sort.board).toEqual(board)
            })

            it("it knows the board length", () => {
                expect(sort.length).toEqual(length)
            })

            it("starts as unsorted", () => {
                expect(sort.done).toEqual(false)
            })

            it("it has a gap", () => {
                expect(sort.gap).toEqual(Math.floor(10 / 1.3))
            })

            it("it has a shrink", () => {
                expect(sort.shrink).toEqual(1.3)
            })
        })

        describe("utils", () => {
            it("it returns the current node indexes", () => {
                expect(sort.currentNodes()).toEqual([0, 7])
                sort.baseNode = 5
                sort.comparisonNode = 6
                expect(sort.currentNodes()).toEqual([5, 6])
            })

            it("it knows if nodes need to be switched", () => {
                let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                expect(sort.nodesInOrder(values)).toBeTruthy()
                expect(sort.ordered).toBeTruthy()
                values = [7, 1, 2, 3, 4, 5, 6, 0, 8, 9]
                expect(sort.nodesInOrder(values)).toBeFalsy()
                expect(sort.ordered).toBeFalsy()
                sort.baseNode = 5
                sort.comparisonNode = 6
                expect(sort.nodesInOrder(values)).toBeTruthy()
                expect(sort.ordered).toBeFalsy()
            })

            it("it changes to the next nodes", () => {
                let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                board.setPoints(values)
                expect(sort.gap).toEqual(7)
                expect(sort.currentNodes()).toEqual([0, 7])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([1, 8])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([2, 9])
                expect(sort.done).toEqual(false)

                sort.setUpNext()
                expect(sort.gap).toEqual(5)
                expect(sort.currentNodes()).toEqual([0, 5])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([1, 6])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([2, 7])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([3, 8])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([4, 9])
                expect(sort.done).toEqual(false)

                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([0, 3])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([1, 4])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([2, 5])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([3, 6])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([4, 7])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([5, 8])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([6, 9])
                expect(sort.done).toEqual(false)

                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([0, 2])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([1, 3])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([2, 4])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([3, 5])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([4, 6])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([5, 7])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([6, 8])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([7, 9])
                expect(sort.done).toEqual(false)

                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([0, 1])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([1, 2])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([2, 3])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([3, 4])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([4, 5])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([5, 6])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([6, 7])
                sort.setUpNext()
                expect(sort.currentNodes()).toEqual([7, 8])
                sort.setUpNext()
                expect(sort.next(board)).toEqual([8, 9])
                expect(sort.next(board)).toEqual([])
                expect(sort.done).toEqual(true)
            })

            it("it changes doesn't mark done if sort is needed", () => {
                let values = [0, 1, 2, 4, 3, 5, 6, 7, 8, 9]
                board.setPoints(values)
                expect(sort.next(board)).toEqual([0, 7])
                expect(sort.next(board)).toEqual([1, 8])
                expect(sort.next(board)).toEqual([2, 9])
                expect(sort.done).toEqual(false)

                expect(sort.next(board)).toEqual([0, 5])
                expect(sort.next(board)).toEqual([1, 6])
                expect(sort.next(board)).toEqual([2, 7])
                expect(sort.next(board)).toEqual([3, 8])
                expect(sort.next(board)).toEqual([4, 9])
                expect(sort.done).toEqual(false)

                expect(sort.next(board)).toEqual([0, 3])
                expect(sort.next(board)).toEqual([1, 4])
                expect(sort.next(board)).toEqual([2, 5])
                expect(sort.next(board)).toEqual([3, 6])
                expect(sort.next(board)).toEqual([4, 7])
                expect(sort.next(board)).toEqual([5, 8])
                expect(sort.next(board)).toEqual([6, 9])
                expect(sort.done).toEqual(false)

                expect(sort.next(board)).toEqual([0, 2])
                expect(sort.next(board)).toEqual([1, 3])
                expect(sort.next(board)).toEqual([2, 4])
                expect(sort.next(board)).toEqual([3, 5])
                expect(sort.next(board)).toEqual([4, 6])
                expect(sort.next(board)).toEqual([5, 7])
                expect(sort.next(board)).toEqual([6, 8])
                expect(sort.next(board)).toEqual([7, 9])
                expect(sort.done).toEqual(false)

                expect(sort.next(board)).toEqual([0, 1])
                expect(sort.next(board)).toEqual([1, 2])
                expect(sort.next(board)).toEqual([2, 3])
                expect(sort.next(board)).toEqual([3, 4])
                expect(sort.next(board)).toEqual([4, 5])
                expect(sort.next(board)).toEqual([5, 6])
                expect(sort.next(board)).toEqual([6, 7])
                expect(sort.next(board)).toEqual([7, 8])
                expect(sort.next(board)).toEqual([8, 9])
                expect(sort.done).toEqual(false)

                expect(sort.next(board)).toEqual([0, 1])
            })

            it("it sets done after sorted", () => {
                let values = [0, 1, 2, 4, 3, 5, 6, 7, 8, 9]
                board.setPoints(values)
                expect(sort.next(board)).toEqual([0, 7])
                expect(sort.next(board)).toEqual([1, 8])
                expect(sort.next(board)).toEqual([2, 9])
                expect(sort.done).toEqual(false)

                expect(sort.next(board)).toEqual([0, 5])
                expect(sort.next(board)).toEqual([1, 6])
                expect(sort.next(board)).toEqual([2, 7])
                expect(sort.next(board)).toEqual([3, 8])
                expect(sort.next(board)).toEqual([4, 9])
                expect(sort.done).toEqual(false)

                expect(sort.next(board)).toEqual([0, 3])
                expect(sort.next(board)).toEqual([1, 4])
                expect(sort.next(board)).toEqual([2, 5])
                expect(sort.next(board)).toEqual([3, 6])
                expect(sort.next(board)).toEqual([4, 7])
                expect(sort.next(board)).toEqual([5, 8])
                expect(sort.next(board)).toEqual([6, 9])
                expect(sort.done).toEqual(false)

                expect(sort.next(board)).toEqual([0, 2])
                expect(sort.next(board)).toEqual([1, 3])
                expect(sort.next(board)).toEqual([2, 4])
                expect(sort.next(board)).toEqual([3, 5])
                expect(sort.next(board)).toEqual([4, 6])
                expect(sort.next(board)).toEqual([5, 7])
                expect(sort.next(board)).toEqual([6, 8])
                expect(sort.next(board)).toEqual([7, 9])
                expect(sort.done).toEqual(false)

                expect(sort.next(board)).toEqual([0, 1])
                expect(sort.next(board)).toEqual([1, 2])
                expect(sort.next(board)).toEqual([2, 3])
                expect(sort.next(board)).toEqual([3, 4])
                expect(sort.next(board)).toEqual([4, 5])
                expect(sort.next(board)).toEqual([5, 6])
                expect(sort.next(board)).toEqual([6, 7])
                expect(sort.next(board)).toEqual([7, 8])
                expect(sort.next(board)).toEqual([8, 9])
                expect(sort.done).toEqual(false)

                expect(sort.next(board)).toEqual([0, 1])
                expect(sort.next(board)).toEqual([1, 2])
                expect(sort.next(board)).toEqual([2, 3])
                expect(sort.next(board)).toEqual([3, 4])
                expect(sort.next(board)).toEqual([4, 5])
                expect(sort.next(board)).toEqual([5, 6])
                expect(sort.next(board)).toEqual([6, 7])
                expect(sort.next(board)).toEqual([7, 8])
                expect(sort.next(board)).toEqual([8, 9])
                expect(sort.done).toEqual(true)

                expect(sort.next(board)).toEqual([])
            })

            it("it sets done earlier fix", () => {
                let values = [0, 1, 4, 3, 2, 5, 6, 7, 8, 9]
                board.setPoints(values)
                expect(sort.next(board)).toEqual([0, 7])
                expect(sort.next(board)).toEqual([1, 8])
                expect(sort.next(board)).toEqual([2, 9])
                expect(sort.done).toEqual(false)

                expect(sort.next(board)).toEqual([0, 5])
                expect(sort.next(board)).toEqual([1, 6])
                expect(sort.next(board)).toEqual([2, 7])
                expect(sort.next(board)).toEqual([3, 8])
                expect(sort.next(board)).toEqual([4, 9])
                expect(sort.done).toEqual(false)

                expect(sort.next(board)).toEqual([0, 3])
                expect(sort.next(board)).toEqual([1, 4])
                expect(sort.next(board)).toEqual([2, 5])
                expect(sort.next(board)).toEqual([3, 6])
                expect(sort.next(board)).toEqual([4, 7])
                expect(sort.next(board)).toEqual([5, 8])
                expect(sort.next(board)).toEqual([6, 9])
                expect(sort.done).toEqual(false)

                expect(sort.next(board)).toEqual([0, 2])
                expect(sort.next(board)).toEqual([1, 3])
                expect(sort.next(board)).toEqual([2, 4])
                expect(sort.next(board)).toEqual([3, 5])
                expect(sort.next(board)).toEqual([4, 6])
                expect(sort.next(board)).toEqual([5, 7])
                expect(sort.next(board)).toEqual([6, 8])
                expect(sort.next(board)).toEqual([7, 9])
                expect(sort.done).toEqual(false)

                expect(sort.next(board)).toEqual([0, 1])
                expect(sort.next(board)).toEqual([1, 2])
                expect(sort.next(board)).toEqual([2, 3])
                expect(sort.next(board)).toEqual([3, 4])
                expect(sort.next(board)).toEqual([4, 5])
                expect(sort.next(board)).toEqual([5, 6])
                expect(sort.next(board)).toEqual([6, 7])
                expect(sort.next(board)).toEqual([7, 8])
                expect(sort.next(board)).toEqual([8, 9])
                expect(sort.done).toEqual(true)
                expect(sort.next(board)).toEqual([])
            })

            it("it tracks comparisons", () => {
                let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                board.setPoints(values)
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                sort.nodesInOrder(values)
                sort.setUpNext()
                expect(sort.swaps).toEqual(0)
                expect(sort.comparisons).toEqual(9)
            })
        })
    })
});
