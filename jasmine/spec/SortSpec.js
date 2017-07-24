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
                expect(Sorts.Bubble.title).toEqual('Bubble(Short Circuit)')
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

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.maxRounds).toEqual(board.length)
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
            expect(sort.end).toEqual(board.length - 1)
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
                sort.ordered = false
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

    describe("bubble non-optimized", () => {
        beforeEach(function() {
            length = 10
            size = Sizes.xXLarge
            board = new Boards.Board(size)
            sort = new Sorts.BubbleNonOptimized(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sorts.BubbleNonOptimized.title).toEqual('Bubble Sort')
            })
        })

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.maxRounds).toEqual(board.length)
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
            expect(sort.end).toEqual(board.length - 1)
        })

        describe("utils", () => {
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
                expect(sort.done).toEqual(false)
                expect(sort.swaps).toEqual(0)
                expect(sort.comparisons).toEqual(9)
            })

        })
    })

    describe("bubble skip sorted", () => {
        beforeEach(function() {
            length = 10
            size = Sizes.xXLarge
            board = new Boards.Board(size)
            sort = new Sorts.BubbleSkipsSorted(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sorts.BubbleSkipsSorted.title).toEqual('Bubble(Short Circuit & Skip Sorted)')
            })
        })

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
            expect(sort.maxRounds).toEqual(board.length)
            expect(sort.end).toEqual(board.length - 1)
        })

        describe("utils", () => {
            it("skips sorted nodes", () => {
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
                expect(sort.ordered).toEqual(true)
                expect(sort.done).toEqual(true)
                expect(sort.comparisons).toEqual(17)
                expect(sort.swaps).toEqual(1)
            })

            it("short circuits", () => {
                board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next(board)).toEqual([0, 1])
                expect(sort.next(board)).toEqual([1, 2])
                expect(sort.next(board)).toEqual([2, 3])
                expect(sort.next(board)).toEqual([3, 4])
                expect(sort.next(board)).toEqual([4, 5])
                expect(sort.next(board)).toEqual([5, 6])
                expect(sort.next(board)).toEqual([6, 7])
                expect(sort.next(board)).toEqual([7, 8])
                expect(sort.ordered).toEqual(true)
                expect(sort.done).toEqual(false)
                expect(sort.next(board)).toEqual([8, 9])
                expect(sort.ordered).toEqual(true)
                expect(sort.done).toEqual(true)
            })
        })
    })

    describe("bubble skip sorted no short circuit", () => {
        beforeEach(function() {
            length = 10
            size = Sizes.xXLarge
            board = new Boards.Board(size)
            sort = new Sorts.BubbleSkipNoShortCircuit(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sorts.BubbleSkipNoShortCircuit.title).toEqual('Bubble(Skip Sorted)')
            })
        })

        it("has a reset function", () => {
            size = Sizes.xXLarge
            board = new Boards.Board(size)
            sort = new Sorts.Bubble(board)

            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
            expect(sort.maxRounds).toEqual(board.length)
            expect(sort.end).toEqual(board.length - 1)
        })

        describe("utils", () => {
            it("skips sorted nodes", () => {
                board.setPoints([1, 0, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next(board)).toEqual([0, 1])
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
                expect(sort.ordered).toEqual(true)
                expect(sort.done).toEqual(false)
                expect(sort.comparisons).toEqual(17)
                expect(sort.swaps).toEqual(1)
            })

            it("skips short circuits", () => {
                board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next(board)).toEqual([0, 1])
                expect(sort.next(board)).toEqual([1, 2])
                expect(sort.next(board)).toEqual([2, 3])
                expect(sort.next(board)).toEqual([3, 4])
                expect(sort.next(board)).toEqual([4, 5])
                expect(sort.next(board)).toEqual([5, 6])
                expect(sort.next(board)).toEqual([6, 7])
                expect(sort.next(board)).toEqual([7, 8])
                expect(sort.ordered).toEqual(true)
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
                expect(sort.ordered).toEqual(true)
                expect(sort.done).toEqual(false)
                expect(sort.comparisons).toEqual(17)
                expect(sort.swaps).toEqual(0)
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

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
            expect(sort.start).toEqual(0)
            expect(sort.end).toEqual(sort.length - 1)
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

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(sort.baseNode + sort.gap)
            expect(sort.gap).toEqual(Math.floor(sort.length / sort.shrink))
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

    describe("bogo", () => {
        beforeEach(function() {
            length = 10
            size = Sizes.xXLarge
            board = new Boards.Board(size)
            sort = new Sorts.Bogo(board)
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
                expect(Sorts.Bogo.title).toEqual('Bogo')
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

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
        })

        describe("utils", () => {
            it("it returns all node indexes", () => {
                expect(sort.currentNodes()).toEqual(
                    Array.prototype.range(board.length)
                )
            })

            it("it changes to done if shuffles to sorted", () => {
                board.setPoints([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                sort.next()
                expect(sort.done).toEqual(true)
                expect(sort.swaps).toEqual(0)
                expect(sort.comparisons).toEqual(0)
            })

            it("next swaps values around and tracks swaps", () => {
                let firstValues = board.values().slice()
                sort.next()
                let newValues = board.values().slice()

                let differingValues = 0
                for (let i = 0; i < board.length; i++) {
                    if (firstValues[i] != newValues[i]) {
                        differingValues++
                    }
                }
                expect(differingValues).toBeGreaterThan(4)
                expect(sort.swaps).toEqual(differingValues/2)
            })

            it("is done if generated sorted", () => {
                board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                sort = new Sorts.Bogo(board)
                expect(sort.done).toEqual(true)
            })
        })
    })

    describe("bogo single swap", () => {
        beforeEach(function() {
            length = 10
            size = Sizes.xXLarge
            board = new Boards.Board(size)
            sort = new Sorts.BogoSingle(board)
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
                expect(Sorts.BogoSingle.title).toEqual('Bogo(Single Swap)')
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

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            let base = sort.baseNode
            let comparison = sort.comparisonNode
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
        })

        describe("utils", () => {
            it("it returns two nodes", () => {
                expect(sort.currentNodes().length).toEqual(2)
            })

            it("it changes to done if shuffles to sorted", () => {
                board.setPoints([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                sort.next()
                expect(sort.done).toEqual(true)
                expect(sort.swaps).toEqual(1)
                expect(sort.comparisons).toEqual(0)
            })

            it("next swaps 2 values", () => {
                let firstValues = board.values().slice()
                sort.next()
                let newValues = board.values().slice()

                let differingValues = 0
                for (let i = 0; i < board.length; i++) {
                    if (firstValues[i] != newValues[i]) {
                        differingValues++
                    }
                }
                expect(differingValues).toEqual(2)
                expect(sort.swaps).toEqual(1)
            })

            it("swaps random values", () => {
                let firstSwapped = []
                firstSwapped.push(sort.next()[0])
                firstSwapped.push(sort.next()[0])
                firstSwapped.push(sort.next()[0])
                expect(firstSwapped[0] !== firstSwapped[1] || firstSwapped[2] !== firstSwapped[1]).toEqual(true)
                expect(firstSwapped[0] !== 0 || firstSwapped[1] !== 1 || firstSwapped[2] !== 2).toEqual(true)
            })

            it("is done if generated sorted", () => {
                board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                sort = new Sorts.Bogo(board)
                expect(sort.done).toEqual(true)
            })

            it("swaps values if out of order", () => {
                board.setPoints([0, 2, 1, 3, 4, 5, 6, 7, 8, 9])
                sort.baseNode = 1
                sort.comparisonNode = 2
                sort.next()
                expect(board.values()[1]).toEqual(1)
                expect(board.values()[2]).toEqual(2)
                expect(sort.swaps).toEqual(1)
                expect(sort.comparisons).toEqual(0)
            })

            it("swaps values if in order", () => {
                board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                sort.baseNode = 1
                sort.comparisonNode = 2
                sort.next()
                expect(board.values()[1]).toEqual(2)
                expect(board.values()[2]).toEqual(1)
                expect(sort.swaps).toEqual(1)
                expect(sort.comparisons).toEqual(0)
            })
        })
    })

    describe("bogo actually compare", () => {
        beforeEach(function() {
            length = 10
            size = Sizes.xXLarge
            board = new Boards.Board(size)
            sort = new Sorts.BogoSingleCompare(board)
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
                expect(Sorts.BogoSingleCompare.title).toEqual('Bogo(Compare & Single Swap)')
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

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            let base = sort.baseNode
            let comparison = sort.comparisonNode
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
        })

        describe("utils", () => {
            it("it returns two nodes", () => {
                expect(sort.currentNodes().length).toEqual(2)
            })

            it("it changes to done if shuffles to sorted", () => {
                board.setPoints([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                sort.next()
                expect(sort.done).toEqual(true)
                expect(sort.swaps).toEqual(0)
                expect(sort.comparisons).toEqual(1)
            })

            it("swaps values if out of order", () => {
                board.setPoints([0, 2, 1, 3, 4, 5, 6, 7, 8, 9])
                sort.baseNode = 1
                sort.comparisonNode = 2
                sort.next()
                expect(board.values()[1]).toEqual(1)
                expect(board.values()[2]).toEqual(2)
                expect(sort.swaps).toEqual(1)
                expect(sort.comparisons).toEqual(1)
            })

            it("don't swaps values if in order", () => {
                board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                sort.baseNode = 1
                sort.comparisonNode = 2
                sort.next()
                expect(board.values()[1]).toEqual(1)
                expect(board.values()[2]).toEqual(2)
                expect(sort.swaps).toEqual(0)
                expect(sort.comparisons).toEqual(1)
            })

            it("swaps random values", () => {
                let firstSwapped = []
                firstSwapped.push(sort.next()[0])
                firstSwapped.push(sort.next()[0])
                firstSwapped.push(sort.next()[0])
                expect(firstSwapped[0] !== firstSwapped[1] || firstSwapped[2] !== firstSwapped[1]).toEqual(true)
                expect(firstSwapped[0] !== 0 || firstSwapped[1] !== 1 || firstSwapped[2] !== 2).toEqual(true)
            })

            it("is done if generated sorted", () => {
                board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                sort = new Sorts.Bogo(board)
                expect(sort.done).toEqual(true)
            })
        })
    })

    describe("cycle", () => {
        beforeEach(function() {
            length = 10
            size = Sizes.fewFew
            board = new Boards.Board(size)
            sort = new Sorts.Cycle(board)
        });
        describe("create", function () {
            it("it has a title", () => {
                expect(Sorts.Cycle.title).toEqual('Cycle Sort')
            })

            it("has a current value", () => {
                expect(sort.currentValue).toEqual(board.values()[0])
            })
        })

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
            expect(sort.currentValue).toEqual(board.values()[0])
            expect(sort.numberLess).toEqual(0)
        })

        describe("utils", () => {
            it("has current nodes", () => {
                expect(sort.currentNodes()).toEqual([1])
            })

            it("it looks at all before moving anything", () => {
                let beforeValues = board.values().slice()
                let first = beforeValues[0]
                sort.next()
                sort.next()
                sort.next()
                expect(sort.swaps).toEqual(0)
                expect(sort.comparisons).toEqual(3)
                sort.next()
                if (first != 0) {
                    expect(sort.swaps).toEqual(1)
                    expect(sort.comparisons).toEqual(4)
                } else {
                    expect(sort.swaps).toEqual(0)
                    expect(sort.comparisons).toEqual(4)
                }
                expect(board.values()[first]).toEqual(first)
                for(let i = 0; i < board.length; i++) {
                    if (i !== first) {
                        expect(beforeValues[i]).toEqual(board.values()[i])
                    }
                }
            })

            it("it adds a shadow element", () => {
                expect(sort.shadow.length).toEqual(1)
            })

            it("it does circle group", () => {
                board.setPoints([4, 2, 3, 0, 1])
                sort = new Sorts.Cycle(board)
                let currentValue = sort.currentValue
                expect(currentValue).toEqual(4)
                expect(sort.baseNode).toEqual(0)
                sort.next()
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(1)
                expect(sort.baseNode).toEqual(0)
                sort.next()
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(2)
                expect(sort.baseNode).toEqual(0)
                sort.next()
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(3)
                expect(sort.baseNode).toEqual(0)
                sort.next()
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(0)
                expect(sort.baseNode).toEqual(0)
                sort.next()
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                expect(sort.baseNode).toEqual(1)
                sort.next()
                sort.next()
                sort.next()

                expect(sort.baseNode).toEqual(2)
                sort.next()
                sort.next()

                expect(sort.baseNode).toEqual(3)
                sort.next()

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it does reverse group", () => {
                board.setPoints([4, 3, 2, 1, 0])
                sort = new Sorts.Cycle(board)
                let currentValue = sort.currentValue
                expect(currentValue).toEqual(4)
                expect(sort.baseNode).toEqual(0)
                sort.next()
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(0)
                expect(sort.baseNode).toEqual(0)
                sort.next()
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(3)
                expect(sort.baseNode).toEqual(1)
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(1)
                expect(sort.baseNode).toEqual(1)
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(2)
                expect(sort.baseNode).toEqual(2)
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                expect(sort.baseNode).toEqual(3)
                sort.next()

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it handles ordered group", () => {
                board.setPoints([0, 1, 2, 3, 4])
                sort = new Sorts.Cycle(board)
                let currentValue = sort.currentValue
                expect(currentValue).toEqual(0)
                expect(sort.baseNode).toEqual(0)
                sort.next()
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(1)
                expect(sort.baseNode).toEqual(1)
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(2)
                expect(sort.baseNode).toEqual(2)
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(3)
                expect(sort.baseNode).toEqual(3)
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles partially ordered grouping", () => {
                board.setPoints([0, 3, 2, 1, 4])
                sort = new Sorts.Cycle(board)
                let currentValue = sort.currentValue
                expect(currentValue).toEqual(0)
                expect(sort.baseNode).toEqual(0)
                sort.next()
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(3)
                expect(sort.baseNode).toEqual(1)
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(1)
                expect(sort.baseNode).toEqual(1)
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(2)
                expect(sort.baseNode).toEqual(2)
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(3)
                expect(sort.baseNode).toEqual(3)
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("only one when shadow changes", () => {
                board.setPoints([0, 3, 2, 1, 4])
                sort = new Sorts.Cycle(board)
                let currentValue = sort.currentValue
                expect(currentValue).toEqual(0)
                expect(sort.baseNode).toEqual(0)
                expect(sort.shadow.length).toEqual(1)
                expect(sort.shadow[0].value).toEqual(0)
                sort.next()
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(3)
                expect(sort.baseNode).toEqual(1)
                expect(sort.shadow.length).toEqual(1)
                expect(sort.shadow[0].value).toEqual(3)
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)
            })

            it("handles duplicates", () => {
                let values = [0, 2, 3, 1, 1]
                board.setPoints(values)
                sort = new Sorts.Cycle(board)
                let currentValue = sort.currentValue
                expect(currentValue).toEqual(0)
                expect(sort.baseNode).toEqual(0)
                sort.next()
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(2)
                expect(sort.baseNode).toEqual(1)
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[3]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(1)
                expect(sort.baseNode).toEqual(1)
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[currentValue]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(3)
                expect(sort.baseNode).toEqual(2)
                sort.next()
                sort.next()
                expect(board.values()[4]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(1)
                expect(sort.baseNode).toEqual(2)
                sort.next()
                sort.next()
                expect(board.values()[2]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(sort.baseNode).toEqual(3)
                expect(currentValue).toEqual(2)
                sort.next()

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            it("handles more duplicates", () => {
                let values = [2, 1, 1, 2, 1]
                board.setPoints(values)
                sort = new Sorts.Cycle(board)
                let currentValue = sort.currentValue
                expect(currentValue).toEqual(2)
                expect(sort.baseNode).toEqual(0)
                sort.next()
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[4]).toEqual(currentValue)
                // 1 1 1 2 2

                currentValue = sort.currentValue
                expect(currentValue).toEqual(1)
                expect(sort.baseNode).toEqual(0)
                sort.next()
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[0]).toEqual(currentValue)
                // 1 1 1 2 2

                currentValue = sort.currentValue
                expect(currentValue).toEqual(1)
                expect(sort.baseNode).toEqual(1)
                sort.next()
                sort.next()
                sort.next()
                expect(board.values()[1]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(1)
                expect(sort.baseNode).toEqual(2)
                sort.next()
                sort.next()
                expect(board.values()[2]).toEqual(currentValue)

                currentValue = sort.currentValue
                expect(currentValue).toEqual(2)
                expect(sort.baseNode).toEqual(3)
                sort.next()
                expect(board.values()[3]).toEqual(currentValue)

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })
        })
    })

    describe("gnome", () => {
        beforeEach(function() {
            length = 10
            size = Sizes.fewFew
            board = new Boards.Board(size)
            sort = new Sorts.Gnome(board)
            Sort = Sorts.Gnome
        });
        describe("create", function () {
            it("it has a title", () => {
                expect(Sort.title).toEqual('Gnome Sort')
            })
        })

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
            expect(sort.currentGnome).toEqual(1)
        })

        describe("utils", () => {
            it("has current nodes", () => {
                expect(sort.currentNodes()).toEqual([0, 1])
            })

            it("handles a random group", () => {
                board.setPoints([0, 3, 1, 4, 2])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                // 0 3 1 4 2
                expect(sort.next()).toEqual([1, 2])
                // 0 1 3 4 2
                expect(sort.next()).toEqual([0, 1])
                // 0 1 3 4 2
                expect(sort.next()).toEqual([2, 3])
                // 0 1 3 4 2
                expect(sort.next()).toEqual([3, 4])
                // 0 1 3 2 4
                expect(sort.next()).toEqual([2, 3])
                // 0 1 2 3 4
                expect(sort.next()).toEqual([1, 2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping first group", () => {
                board.setPoints([1, 0, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping last group", () => {
                board.setPoints([0, 1, 2, 4, 3])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])
                expect(sort.next()).toEqual([2, 3])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it does reverse group", () => {
                board.setPoints([4, 3, 2, 1, 0])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])

                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([0, 1])

                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([0, 1])

                expect(sort.next()).toEqual([3, 4])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([0, 1])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it handles ordered group", () => {
                board.setPoints([0, 1, 2, 3, 4])
                sort = new Sort(board)
                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])
                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it handles first and last swapped", () => {
                board.setPoints([4, 1, 2, 3, 0])
                sort = new Sort(board)
                expect(sort.next()).toEqual([0, 1])
                // 1 4 2 3 0

                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([0, 1])
                // 1 2 4 3 0

                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([1, 2])
                // 1 2 3 4 0

                expect(sort.next()).toEqual([3, 4])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([0, 1])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles partially ordered grouping", () => {
                board.setPoints([0, 3, 2, 1, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                // 0 3 2 1 4

                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([0, 1])
                // 0 2 3 1 4

                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([0, 1])
                // 0 1 2 3 4

                expect(sort.next()).toEqual([3, 4])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles duplicates", () => {
                let values = [0, 2, 3, 1, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])

                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([0, 1])

                expect(sort.next()).toEqual([3, 4])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([1, 2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            it("handles more duplicates", () => {
                let values = [2, 1, 1, 2, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                // 1 2 1 2 1

                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([0, 1])
                // 1 1 2 2 1

                expect(sort.next()).toEqual([2, 3])

                expect(sort.next()).toEqual([3, 4])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([1, 2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })
        })
    })

    describe("quick 2 left partition", () => {
        beforeEach(function() {
            length = 5
            size = Sizes.fewFew
            board = new Boards.Board(size)
            Sort = Sorts.QuickSort2
            sort = new Sort(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sort.title).toEqual('Quick Sort(Left Partition)')
            })

            it("has a partition", () => {
                expect(sort.partition).not.toEqual(undefined)
            })
        })

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
            expect(sort.lower).toEqual(sort.baseNode)
            expect(sort.higher).toEqual(sort.baseNode)
            expect(sort.partitionStart).toEqual(sort.baseNode)
            expect(sort.partitionEnd).toEqual(sort.length - 1)
            expect(sort.partition).toEqual(sort.lower)
            expect(sort.partitionTop).toEqual(sort.partition)
        })

        describe("utils", () => {

            it("has current nodes", () => {
                expect(sort.currentNodes()).toEqual([0])

                sort.lower = 1
                sort.partition = 2
                sort.higher = 3
                expect(sort.currentNodes()).toEqual([1, 2, 3])

                sort.lower = 2
                expect(sort.currentNodes()).toEqual([2, 3])

                sort.lower = 1
                sort.higher = 2
                expect(sort.currentNodes()).toEqual([1, 2])
            })

            it("it handles ordered group", () => {
                board.setPoints([0, 1, 2, 3, 4])
                sort = new Sort(board)

                sort.partition = 0

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a random group", () => {
                board.setPoints([0, 3, 1, 4, 2])
                sort = new Sort(board)

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([2, 3, 4])

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping first group", () => {
                board.setPoints([1, 0, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping last group", () => {
                board.setPoints([0, 1, 2, 4, 3])
                sort = new Sort(board)

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([3, 4])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it does reverse group", () => {
                board.setPoints([4, 3, 2, 1, 0])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])
                // 3 2 1 0

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                // 2 1 0

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])

                expect(sort.next()).toEqual([0, 1])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it handles first and last swapped", () => {
                board.setPoints([4, 1, 2, 3, 0])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])
                // 1, 2, 3, 0

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([0, 1, 2, 3])
                // _ _ 2 3

                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles partially ordered grouping", () => {
                board.setPoints([0, 3, 2, 1, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                // _ 3 2 1 4

                expect(sort.next()).toEqual([1, 2])
                // _ 2 *3 1 4
                expect(sort.next()).toEqual([2, 3])
                // _ 2 1 *3 4
                expect(sort.next()).toEqual([])
                // _ 2 1 _ _

                expect(sort.next()).toEqual([1, 2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles duplicates", () => {
                let values = [0, 2, 3, 1, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                // _ 2 3 1 1

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([1, 2, 3])
                expect(sort.next()).toEqual([2, 3, 4])
                // _ 1 1 _ _

                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            it("handles more duplicates", () => {
                let values = [2, 1, 1, 2, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([2, 3, 4])
                // 1 1 1 _ _

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })
        })
    })

    describe("quick 2 right partition", () => {
        beforeEach(function() {
            length = 5
            size = Sizes.fewFew
            board = new Boards.Board(size)
            Sort = Sorts.QuickSort2RightPartition
            sort = new Sort(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sort.title).toEqual('Quick Sort(Right Partition)')
            })

            it("has a partition", () => {
                expect(sort.partition).not.toEqual(undefined)
            })
        })

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
            expect(sort.lower).toEqual(sort.baseNode)
            expect(sort.higher).toEqual(sort.baseNode)
            expect(sort.partitionStart).toEqual(sort.baseNode)
            expect(sort.partitionEnd).toEqual(sort.length - 1)
            expect(sort.partition).toEqual(sort.lower)
            expect(sort.partitionTop).toEqual(sort.partition)
        })

        describe("utils", () => {

            it("has current nodes", () => {
                expect(sort.currentNodes()).toEqual([0])

                sort.lower = 1
                sort.partition = 2
                sort.higher = 3
                expect(sort.currentNodes()).toEqual([1, 2, 3])

                sort.lower = 2
                expect(sort.currentNodes()).toEqual([2, 3])

                sort.lower = 1
                sort.higher = 2
                expect(sort.currentNodes()).toEqual([1, 2])
            })

            it("it handles ordered group", () => {
                board.setPoints([0, 1, 2, 3, 4])
                sort = new Sort(board)

                sort.partition = 0

                expect(sort.next()).toEqual([0, 1, 4])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])
                // 0 2 3 1

                expect(sort.next()).toEqual([0, 3])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                // _ 1 3 2

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([])
                // _ _ 2 3

                expect(sort.next()).toEqual([2, 3])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a random group", () => {
                board.setPoints([0, 3, 1, 4, 2])
                sort = new Sort(board)

                // 0 3 1 4 2
                // 2 3 1 4 0
                expect(sort.next()).toEqual([0, 4])
                expect(sort.next()).toEqual([0, 1, 2])
                // 1 2 3 4 0
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([1, 2, 3, 4])

                // 1 0 _ 3 4

                expect(sort.next()).toEqual([0, 1])

                expect(sort.next()).toEqual([3, 4])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })
        })
    })

    describe("quick 3 left partition", () => {
        beforeEach(function() {
            length = 5
            size = Sizes.fewFew
            board = new Boards.Board(size)
            Sort = Sorts.QuickSort3
            sort = new Sort(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sort.title).toEqual('Quick Sort 3(Left Partition)')
            })

            it("has a partition", () => {
                expect(sort.partition).not.toEqual(undefined)
            })
        })

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
            expect(sort.lower).toEqual(sort.baseNode)
            expect(sort.higher).toEqual(sort.baseNode)
            expect(sort.partitionStart).toEqual(sort.baseNode)
            expect(sort.partitionEnd).toEqual(sort.length - 1)
            expect(sort.partition).toEqual(sort.lower)
            expect(sort.partitionTop).toEqual(sort.partition)
        })

        describe("utils", () => {

            it("has current nodes", () => {
                expect(sort.currentNodes()).toEqual([0])

                sort.lower = 1
                sort.partition = 2
                sort.higher = 3
                expect(sort.currentNodes()).toEqual([1, 2, 3])

                sort.lower = 2
                expect(sort.currentNodes()).toEqual([2, 3])

                sort.lower = 1
                sort.higher = 2
                expect(sort.currentNodes()).toEqual([1, 2])
            })

            it("it handles ordered group", () => {
                board.setPoints([0, 1, 2, 3, 4])
                sort = new Sort(board)

                sort.partition = 0

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })


            it("handles a random group", () => {
                board.setPoints([0, 3, 1, 4, 2])
                sort = new Sort(board)

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                // _ 3 1 4 2

                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([2, 3, 4])
                // _ 1 2 _ _

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping first group", () => {
                board.setPoints([1, 0, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping last group", () => {
                board.setPoints([0, 1, 2, 4, 3])
                sort = new Sort(board)

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([3, 4])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it does reverse group", () => {
                board.setPoints([4, 3, 2, 1, 0])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])
                // 3 2 1 0

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                // 2 1 0

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])

                expect(sort.next()).toEqual([0, 1])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it handles first and last swapped", () => {
                board.setPoints([4, 1, 2, 3, 0])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])
                // 1, 2, 3, 0

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([0, 1, 2, 3])
                // _ _ 2 3

                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles partially ordered grouping", () => {
                board.setPoints([0, 3, 2, 1, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                // _ 3 2 1 4

                expect(sort.next()).toEqual([1, 2])
                // _ 2 *3 1 4
                expect(sort.next()).toEqual([2, 3])
                // _ 2 1 *3 4
                expect(sort.next()).toEqual([])
                // _ 2 1 _ _

                expect(sort.next()).toEqual([1, 2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles duplicates", () => {
                let values = [1, 2, 3, 0, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([0, 1, 2, 3])
                expect(sort.next()).toEqual([0, 1, 2, 3, 4])
                // _ _ _ 2 3

                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            it("handles more duplicates", () => {
                let values = [1, 2, 1, 2, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([0, 1, 2])
                expect(sort.next()).toEqual([])
                expect(sort.next()).toEqual([0, 1, 2, 3, 4])

                expect(sort.next()).toEqual([2, 3, 4])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })
        })
    })

    describe("odd even single processor", () => {
        beforeEach(function() {
            length = 5
            size = Sizes.fewFew
            board = new Boards.Board(size)
            Sort = Sorts.OddEven
            sort = new Sort(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sort.title).toEqual('Odd Even(Single Processor)')
            })
        })

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNodes.length).toBeTruthy()
            expect(sort.baseNode).toEqual(1)
            expect(sort.comparisonNode).toEqual(2)
            expect(sort.evenSorted).toBeFalsy()
            expect(sort.oddSorted).toBeFalsy()
            expect(sort.oddPhase).toBeTruthy()
        })

        describe("utils", () => {

            it("has current nodes(returns base nodes)", () => {
                expect(sort.currentNodes()).toEqual([1, 3])
            })

            it("it handles ordered group", () => {
                board.setPoints([0, 1, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a random group", () => {
                board.setPoints([0, 3, 1, 4, 2])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping first group", () => {
                board.setPoints([1, 0, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping second group", () => {
                board.setPoints([0, 2, 1, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping last group", () => {
                board.setPoints([0, 1, 2, 4, 3])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it does reverse group", () => {
                board.setPoints([4, 3, 2, 1, 0])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it handles first and last swapped", () => {
                board.setPoints([4, 1, 2, 3, 0])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)
                // 4 1 2 0 3

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)
                // 1 4 0 2 3

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)
                // 1 0 4 2 3

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)
                // 0 1 2 4 3

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)
                // 0 1 2 3 4

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles partially ordered grouping", () => {
                board.setPoints([0, 3, 2, 1, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)
                // 0 2 3 1 4

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)
                // 0 2 1 3 4

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)
                // 0 1 2 3 4

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles duplicates", () => {
                let values = [0, 2, 3, 1, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)
                // 0 2 3 1 1

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)
                // 0 2 1 3 1

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)
                // 0 1 2 1 3

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)
                // 0 1 1 2 3

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            it("handles more duplicates", () => {
                let values = [2, 1, 1, 2, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)
                // 2 1 1 1 2

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)
                // 1 2 1 1 2

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)
                // 1 1 2 1 2

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])
                expect(sort.done).toEqual(false)
                // 1 1 1 2 2

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })
        })
    })

    describe("odd even concurrent", () => {
        beforeEach(function() {
            length = 5
            size = Sizes.fewFew
            board = new Boards.Board(size)
            Sort = Sorts.OddEvenConcurrent
            sort = new Sort(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sort.title).toEqual('Odd Even(Concurrent)')
            })
        })

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(1)
            expect(sort.comparisonNode).toEqual(2)
            expect(sort.evenSorted).toBeFalsy()
            expect(sort.oddSorted).toBeFalsy()
            expect(sort.oddPhase).toBeTruthy()
        })

        describe("utils", () => {

            it("has current nodes(returns base nodes)", () => {
                expect(sort.currentNodes()).toEqual([1, 3])
            })

            it("it handles ordered group", () => {
                board.setPoints([0, 1, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([0, 2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a random group", () => {
                board.setPoints([0, 3, 1, 4, 2])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping first group", () => {
                board.setPoints([1, 0, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping second group", () => {
                board.setPoints([0, 2, 1, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping last group", () => {
                board.setPoints([0, 1, 2, 4, 3])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])

                expect(sort.done).toEqual(true)
                expect(sort.next()).toEqual([])
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it does reverse group", () => {
                board.setPoints([4, 3, 2, 1, 0])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it handles first and last swapped", () => {
                board.setPoints([4, 1, 2, 3, 0])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)
                // 4 1 2 0 3

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)
                // 1 4 0 2 3

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)
                // 1 0 4 2 3

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)
                // 0 1 2 4 3

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)
                // 0 1 2 3 4

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles partially ordered grouping", () => {
                board.setPoints([0, 3, 2, 1, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)
                // 0 2 3 1 4

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)
                // 0 2 1 3 4

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)
                // 0 1 2 3 4

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([1, 3])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles duplicates", () => {
                let values = [0, 2, 3, 1, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)
                // 0 2 3 1 1

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)
                // 0 2 1 3 1

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)
                // 0 1 2 1 3

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)
                // 0 1 1 2 3

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            it("handles more duplicates", () => {
                let values = [2, 1, 1, 2, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)
                // 2 1 1 1 2

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)
                // 1 2 1 1 2

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)
                // 1 1 2 1 2

                expect(sort.next()).toEqual([0, 2])
                expect(sort.done).toEqual(false)
                // 1 1 1 2 2

                expect(sort.next()).toEqual([1, 3])
                expect(sort.done).toEqual(false)

                expect(sort.next()).toEqual([0, 2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })
        })
    })

    describe("selection sort", () => {
        beforeEach(function() {
            length = 5
            size = Sizes.fewFew
            board = new Boards.Board(size)
            Sort = Sorts.SelectionSort
            sort = new Sort(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sort.title).toEqual('Selection Sort')
            })
        })

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
        })

        describe("utils", () => {

            it("has current nodes", () => {
                board.setPoints([0, 1, 2, 3, 4])
                sort = new Sort(board)
                expect(sort.currentNodes()).toEqual([0, 1])
                sort.next()
                expect(sort.currentNodes()).toEqual([0, 2])
                sort.next()
                expect(sort.currentNodes()).toEqual([0, 3])
                sort.next()
                expect(sort.currentNodes()).toEqual([0, 4])
                sort.next()
                expect(sort.currentNodes()).toEqual([1, 2])
                sort.next()
                expect(sort.currentNodes()).toEqual([1, 3])
                sort.next()
                expect(sort.currentNodes()).toEqual([1, 4])
                sort.next()
                expect(sort.currentNodes()).toEqual([2, 3])
                sort.next()
                expect(sort.currentNodes()).toEqual([2, 4])
                sort.next()
                expect(sort.currentNodes()).toEqual([3, 4])
                sort.next()
                expect(sort.currentNodes()).toEqual([])
                sort.next()
            })

            it("it handles ordered group", () => {
                board.setPoints([0, 1, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([0, 3])
                expect(sort.next()).toEqual([0, 4])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([1, 4])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([2, 4])
                expect(sort.next()).toEqual([3, 4])

                expect(sort.swaps).toEqual(0)
                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a random group", () => {
                board.setPoints([0, 3, 1, 4, 2])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([0, 3])
                expect(sort.next()).toEqual([0, 4])
                // 0 3 1 4 2
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([2, 4])
                // 0 1 3 4 2
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([2, 4])
                // 0 1 2 3 4
                expect(sort.next()).toEqual([3, 4])

                expect(sort.swaps).toEqual(3)
                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping first group", () => {
                board.setPoints([1, 0, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([1, 4])

                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([1, 4])

                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([2, 4])
                expect(sort.next()).toEqual([3, 4])

                expect(sort.swaps).toEqual(1)
                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping last group", () => {
                board.setPoints([0, 1, 2, 4, 3])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([0, 3])
                expect(sort.next()).toEqual([0, 4])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([1, 4])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([2, 4])
                expect(sort.next()).toEqual([3, 4])

                expect(sort.swaps).toEqual(1)
                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it does reverse group", () => {
                board.setPoints([4, 3, 2, 1, 0])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])
                // 0 3 2 1 4

                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])
                // 0 1 2 3 4

                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([2, 4])
                expect(sort.next()).toEqual([3, 4])

                expect(sort.swaps).toEqual(2)
                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it handles first and last swapped", () => {
                board.setPoints([4, 1, 2, 3, 0])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([1, 4])

                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([1, 4])

                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([2, 4])

                expect(sort.next()).toEqual([3, 4])

                expect(sort.swaps).toEqual(1)
                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles partially ordered grouping", () => {
                board.setPoints([0, 3, 2, 1, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([0, 3])
                expect(sort.next()).toEqual([0, 4])

                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])

                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([2, 4])

                expect(sort.next()).toEqual([3, 4])

                expect(sort.swaps).toEqual(1)
                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles duplicates", () => {
                let values = [0, 2, 3, 1, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([0, 3])
                expect(sort.next()).toEqual([0, 4])

                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([3, 4])

                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])

                expect(sort.next()).toEqual([3, 4])

                expect(sort.swaps).toEqual(2)
                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            it("handles more duplicates", () => {
                let values = [2, 1, 1, 2, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([1, 4])

                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([2, 4])

                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([2, 4])

                expect(sort.next()).toEqual([3, 4])

                expect(sort.swaps).toEqual(3)
                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            it("handles more duplicates", () => {
                let values = [4, 5, 4, 1, 4]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([0, 3])
                expect(sort.next()).toEqual([3, 4])
                // 1 5 4 4 4

                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([2, 4])
                // 1 4 5 4 4

                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])
                // 1 4 4 5 4

                expect(sort.next()).toEqual([3, 4])

                expect(sort.swaps).toEqual(4)
                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })
        })
    })

    describe("heap sort", () => {
        beforeEach(function() {
            length = 5
            size = Sizes.fewFew
            board = new Boards.Board(size)
            Sort = Sorts.Heap
            sort = new Sort(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sort.title).toEqual('Heap Sort')
            })
        })

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(sort.length - 1)
        })

        describe("utils", () => {

            it("has current nodes", () => {
                expect(sort.currentNodes()).toEqual([1])
            })

            it("it handles ordered group", () => {
                board.setPoints([0, 1, 2, 3, 4])
                sort = new Sort(board)
                // if comparison return comparison
                // if remove return nothing
                expect(sort.next()).toEqual([1])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a random group", () => {
                board.setPoints([0, 3, 1, 4, 2])
                sort = new Sort(board)

                // make heap
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                // remove first
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping first group", () => {
                board.setPoints([1, 0, 2, 3, 4])
                sort = new Sort(board)

                // make heap
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                // remove first
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping last group", () => {
                board.setPoints([0, 1, 2, 4, 3])
                sort = new Sort(board)

                // make heap
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([4, 3, 2, 1, 0])
                // remove first
                expect(sort.next()).toEqual([])
                expect(board.values()).toEqual([0, 3, 2, 1, 4])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([3, 1, 2, 0, 4])
                expect(sort.next()).toEqual([])
                expect(board.values()).toEqual([0, 1, 2, 3, 4])

                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([2, 1, 0, 3, 4])
                expect(sort.next()).toEqual([])
                expect(board.values()).toEqual([0, 1, 2, 3, 4])

                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([1, 0, 2, 3, 4])
                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it does reverse group", () => {
                board.setPoints([4, 3, 2, 1, 0])
                sort = new Sort(board)

                // make heap
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([0])
                // remove first
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it handles first and last swapped", () => {
                board.setPoints([4, 1, 2, 3, 0])
                sort = new Sort(board)

                // make heap
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([0])
                // remove first
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles partially ordered grouping", () => {
                board.setPoints([0, 3, 2, 1, 4])
                sort = new Sort(board)

                // make heap
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                // remove first
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("highest no children", () => {
                board.setPoints([0, 2, 4, 1, 3])
                sort = new Sort(board)

                // make heap
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([4, 3, 0, 1, 2])
                // remove first
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([3, 2, 0, 1, 4])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles duplicates", () => {
                let values = [0, 2, 3, 1, 1]
                board.setPoints(values)
                sort = new Sort(board)

                // make heap
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([0])
                // remove first
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            it("handles more duplicates", () => {
                let values = [2, 1, 1, 2, 1]
                board.setPoints(values)
                sort = new Sort(board)

                // make heap
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([0])
                // remove first
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.next()).toEqual([0])
                expect(sort.next()).toEqual([])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            it("handles bug", () => {
                // bugs with zeros
                size = Sizes.xXLarge
                board = new Boards.Board(size)
                board.setPoints([0, -1, -1, -5, -2, 1, 0, 0, -1, 0])
                sort = new Sort(board)

                // make heap
                expect(sort.next()).toEqual([4])
                expect(board.values()).toEqual([0, -1, -1, -5, 0, 1, 0, 0, -1, -2])
                expect(sort.next()).toEqual([3])
                expect(board.values()).toEqual([0, -1, -1, 0, 0, 1, 0, -5, -1, -2])
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([0, -1, 1, 0, 0, -1, 0, -5, -1, -2])
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([0, 0, 1, -1, 0, -1, 0, -5, -1, -2])
                expect(sort.next()).toEqual([3])
                expect(board.values()).toEqual([0, 0, 1, -1, 0, -1, 0, -5, -1, -2])
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([1, 0, 0, -1, 0, -1, 0, -5, -1, -2])
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([1, 0, 0, -1, 0, -1, 0, -5, -1, -2])
                expect(sort.comparisonNode).toEqual(9)

                // remove
                expect(sort.next()).toEqual([])
                expect(board.values()).toEqual([-2, 0, 0, -1, 0, -1, 0, -5, -1, 1])
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([0, -2, 0, -1, 0, -1, 0, -5, -1, 1])
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([0, 0, 0, -1, -2, -1, 0, -5, -1, 1])
                expect(sort.comparisonNode).toEqual(8)

                // remove
                expect(sort.next()).toEqual([])
                expect(board.values()).toEqual([-1, 0, 0, -1, -2, -1, 0, -5, 0, 1])
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([0, -1, 0, -1, -2, -1, 0, -5, 0, 1])
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([0, -1, 0, -1, -2, -1, 0, -5, 0, 1])
                expect(sort.comparisonNode).toEqual(7)

                // remove
                expect(sort.next()).toEqual([])
                expect(board.values()).toEqual([-5, -1, 0, -1, -2, -1, 0, 0, 0, 1])
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([0, -1, -5, -1, -2, -1, 0, 0, 0, 1])
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([0, -1, 0, -1, -2, -1, -5, 0, 0, 1])
                expect(sort.comparisonNode).toEqual(6)

                // remove
                expect(sort.next()).toEqual([])
                expect(board.values()).toEqual([-5, -1, 0, -1, -2, -1, 0, 0, 0, 1])
                expect(sort.comparisonNode).toEqual(5)
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([0, -1, -5, -1, -2, -1, 0, 0, 0, 1])
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([0, -1, -1, -1, -2, -5, 0, 0, 0, 1])

                // remove
                expect(sort.next()).toEqual([])
                expect(board.values()).toEqual([-5, -1, -1, -1, -2, 0, 0, 0, 0, 1])
                expect(sort.comparisonNode).toEqual(4)
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([-1, -5, -1, -1, -2, 0, 0, 0, 0, 1])
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([-1, -1, -1, -5, -2, 0, 0, 0, 0, 1])

                // remove
                expect(sort.next()).toEqual([])
                expect(board.values()).toEqual([-2, -1, -1, -5, -1, 0, 0, 0, 0, 1])
                expect(sort.comparisonNode).toEqual(3)
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([-1, -2, -1, -5, -1, 0, 0, 0, 0, 1])
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([-1, -2, -1, -5, -1, 0, 0, 0, 0, 1])

                // remove
                expect(sort.next()).toEqual([])
                expect(board.values()).toEqual([-5, -2, -1, -1, -1, 0, 0, 0, 0, 1])
                expect(sort.comparisonNode).toEqual(2)
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([-1, -2, -5, -1, -1, 0, 0, 0, 0, 1])

                // remove
                expect(sort.next()).toEqual([])
                expect(board.values()).toEqual([-5, -2, -1, -1, -1, 0, 0, 0, 0, 1])
                expect(sort.comparisonNode).toEqual(1)
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([-2, -5, -1, -1, -1, 0, 0, 0, 0, 1])

                // remove
                expect(sort.next()).toEqual([])
                expect(board.values()).toEqual([-5, -2, -1, -1, -1, 0, 0, 0, 0, 1])

                expect(sort.done).toEqual(true)
            })
        })
    })

    describe("smooth first attempt", () => {
        beforeEach(function() {
            length = 10
            size = Sizes.xXLarge
            board = new Boards.Board(size)
            Sort = Sorts.Smooth
            sort = new Sort(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sort.title).toEqual('Smooth Sort')
            })

            it("has leonardoNumbers", function () {
                expect(sort.leonardoNumbers).toEqual([1, 1, 3, 5, 9])
            })

            it("has tree sizes", function () {
                expect(sort.treeSizes).toEqual([1, 1, 3, 1, 5, 1, 1, 3, 9, 1])
            })

            it("has nodes to heap", function () {
                expect(sort.nodesToHeap).toEqual([2, 4, 7, 8])
            })

            it("has roots", function () {
                expect(sort.roots).toEqual([8, 9])
            })

            it("has roots to compare", function () {
                expect(sort.rootsToCompare).toEqual([8, 9])
            })
        })

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
        })

        describe("utils", () => {

            it("has current nodes", () => {
                expect(sort.currentNodes()).toEqual([2])
            })

            it("it handles ordered group", () => {
                board.setPoints([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                sort = new Sort(board)

                // heapify
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([4])
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([7])
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([8])
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

                // compare roots
                expect(sort.next()).toEqual([8, 9])
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

                // remove
                expect(sort.next()).toEqual([9])
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([8])
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

                // compare nodes
                expect(sort.next([4, 7]))
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

                // remove
                expect(sort.next([7]))
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

                // compare nodes
                expect(sort.next([4, 5]))
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next([5, 6]))
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

                // remove
                expect(sort.next([6]))
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next([5]))
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next([4]))
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

                // compare nodes
                expect(sort.next([2, 3]))
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

                // remove
                expect(sort.next([3]))
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next([2]))
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

                // compare nodes
                expect(sort.next([0, 1]))
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

                // remove
                expect(sort.next([1]))
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next([0]))

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it does reverse group", () => {
                board.setPoints([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
                sort = new Sort(board)

                // heapify
                expect(sort.next()).toEqual([2, 0])
                expect(board.values()).toEqual([7, 8, 9, 6, 5, 4, 3, 2, 1, 0])
                expect(sort.next()).toEqual([4, 2])
                expect(board.values()).toEqual([7, 8, 5, 6, 9, 4, 3, 2, 1, 0])
                expect(sort.next()).toEqual([2, 1])
                expect(board.values()).toEqual([7, 5, 8, 6, 9, 4, 3, 2, 1, 0])
                expect(sort.next()).toEqual([7, 5])
                expect(board.values()).toEqual([7, 5, 8, 6, 9, 2, 3, 4, 1, 0])
                expect(sort.next()).toEqual([8, 4])
                expect(board.values()).toEqual([7, 5, 8, 6, 1, 2, 3, 4, 9, 0])
                expect(sort.next()).toEqual([4, 2])
                expect(board.values()).toEqual([7, 5, 1, 6, 8, 2, 3, 4, 9, 0])
                expect(sort.next()).toEqual([2, 0])
                expect(board.values()).toEqual([1, 5, 7, 6, 8, 2, 3, 4, 9, 0])

                // compare roots
                expect(sort.next()).toEqual([8, 9])
                expect(board.values()).toEqual([1, 5, 7, 6, 8, 2, 3, 4, 0, 9])
                // heapify
                expect(sort.next()).toEqual([8, 4])
                expect(board.values()).toEqual([1, 5, 7, 6, 0, 2, 3, 4, 8, 9])
                expect(sort.next()).toEqual([4, 2])
                expect(board.values()).toEqual([1, 5, 0, 6, 7, 2, 3, 4, 8, 9])
                expect(sort.next()).toEqual([2, 1])
                expect(board.values()).toEqual([1, 0, 5, 6, 7, 2, 3, 4, 8, 9])

                // remove
                expect(sort.next()).toEqual([9])
                expect(board.values()).toEqual([1, 0, 5, 6, 7, 2, 3, 4, 8, 9])
                expect(sort.next()).toEqual([8])
                expect(board.values()).toEqual([1, 0, 5, 6, 7, 2, 3, 4, 8, 9])

                // compare roots
                expect(sort.next()).toEqual([4, 7])
                expect(board.values()).toEqual([1, 0, 5, 6, 4, 2, 3, 7, 8, 9])
                // heapify
                expect(sort.next()).toEqual([4, 3])
                expect(board.values()).toEqual([1, 0, 5, 4, 6, 2, 3, 7, 8, 9])

                // remove
                expect(sort.next()).toEqual([7])
                expect(board.values()).toEqual([1, 0, 5, 4, 6, 2, 3, 7, 8, 9])

                // compare roots
                expect(sort.next()).toEqual([4, 5, 6])
                expect(board.values()).toEqual([1, 0, 5, 4, 3, 2, 6, 7, 8, 9])
                // heapify
                expect(sort.next()).toEqual([4, 2])
                expect(board.values()).toEqual([1, 0, 3, 4, 5, 2, 6, 7, 8, 9])
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([1, 0, 3, 4, 5, 2, 6, 7, 8, 9])
                // compare remaining roots
                expect(sort.next()).toEqual([4, 5])
                expect(board.values()).toEqual([1, 0, 3, 4, 2, 5, 6, 7, 8, 9])
                // heapify
                expect(sort.next()).toEqual([4, 3])
                expect(board.values()).toEqual([1, 0, 3, 2, 4, 5, 6, 7, 8, 9])

                // remove
                expect(sort.next()).toEqual([6])
                expect(board.values()).toEqual([1, 0, 3, 2, 4, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([5])
                expect(board.values()).toEqual([1, 0, 3, 2, 4, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([4])
                expect(board.values()).toEqual([1, 0, 3, 2, 4, 5, 6, 7, 8, 9])

                // compare roots
                expect(sort.next()).toEqual([2, 3])
                expect(board.values()).toEqual([1, 0, 2, 3, 4, 5, 6, 7, 8, 9])
                // heapify
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([1, 0, 2, 3, 4, 5, 6, 7, 8, 9])

                // remove
                expect(sort.next()).toEqual([3])
                expect(board.values()).toEqual([1, 0, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([1, 0, 2, 3, 4, 5, 6, 7, 8, 9])

                // compare roots
                expect(sort.next()).toEqual([0, 1])
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

                // remove
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([0])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("test random large set", () => {
                size = {
                    elemCount: 30,
                    label: 30
                }
                board.setSize(size)
                board.setPoints([
                    15, 26, 16, 29,  6,
                    24,  2, 25, 27, 19,
                    28,  9,  7, 13,  4,
                     8, 12, 10, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                sort = new Sort(board)
                expect(sort.leonardoNumbers).toEqual([1, 1, 3, 5, 9, 15, 25])
                expect(sort.treeSizes).toEqual([
                     1,  1,  3,  1,  5,
                     1,  1,  3,  9,  1,
                     1,  3,  1,  5, 15,
                     1,  1,  3,  1,  5,
                     1,  1,  3,  9, 25,
                     1,  1,  3,  1,  5
                ])
                expect(sort.nodesToHeap).toEqual([
                         2,      4,
                         7,  8,
                    11,     13, 14,
                        17,     19,
                        22, 23, 24,
                        27,     29
                ])
                expect(sort.roots).toEqual([24, 29])
                expect(sort.rootsToCompare).toEqual([24, 29])

                // heapify 2
                expect(sort.next()).toEqual([2, 1])
                expect(board.values()).toEqual([
                    15, 16, 26, 29,  6,
                    24,  2, 25, 27, 19,
                    28,  9,  7, 13,  4,
                     8, 12, 10, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                // heapify 4
                expect(sort.next()).toEqual([4, 3])
                expect(board.values()).toEqual([
                    15, 16, 26,  6, 29,
                    24,  2, 25, 27, 19,
                    28,  9,  7, 13,  4,
                     8, 12, 10, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                // heapify 7
                expect(sort.next()).toEqual([7])
                expect(board.values()).toEqual([
                    15, 16, 26,  6, 29,
                    24,  2, 25, 27, 19,
                    28,  9,  7, 13,  4,
                     8, 12, 10, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                // heapify 8
                expect(sort.next()).toEqual([8, 4])
                expect(board.values()).toEqual([
                    15, 16, 26,  6, 27,
                    24,  2, 25, 29, 19,
                    28,  9,  7, 13,  4,
                     8, 12, 10, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                expect(sort.next()).toEqual([4])
                expect(board.values()).toEqual([
                    15, 16, 26,  6, 27,
                    24,  2, 25, 29, 19,
                    28,  9,  7, 13,  4,
                     8, 12, 10, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                // heapify 11
                expect(sort.next()).toEqual([11, 10])
                expect(board.values()).toEqual([
                    15, 16, 26,  6, 27,
                    24,  2, 25, 29, 19,
                     9, 28,  7, 13,  4,
                     8, 12, 10, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                // heapify 13
                expect(sort.next()).toEqual([13, 11])
                expect(board.values()).toEqual([
                    15, 16, 26,  6, 27,
                    24,  2, 25, 29, 19,
                     9, 13,  7, 28,  4,
                     8, 12, 10, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                expect(sort.next()).toEqual([11, 9])
                expect(board.values()).toEqual([
                    15, 16, 26,  6, 27,
                    24,  2, 25, 29, 13,
                     9, 19,  7, 28,  4,
                     8, 12, 10, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                // heapify 14
                expect(sort.next()).toEqual([14, 8])
                expect(board.values()).toEqual([
                    15, 16, 26,  6, 27,
                    24,  2, 25,  4, 13,
                     9, 19,  7, 28, 29,
                     8, 12, 10, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                expect(sort.next()).toEqual([8, 4])
                expect(board.values()).toEqual([
                    15, 16, 26,  6,  4,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 28, 29,
                     8, 12, 10, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                expect(sort.next()).toEqual([4, 2])
                expect(board.values()).toEqual([
                    15, 16, 4,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 28, 29,
                     8, 12, 10, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                expect(sort.next()).toEqual([2, 1])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 28, 29,
                     8, 12, 10, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                // heapify 17
                expect(sort.next()).toEqual([17, 16])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 28, 29,
                     8, 10, 12, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                // heapify 19
                expect(sort.next()).toEqual([19])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 28, 29,
                     8, 10, 12, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                // heapify 22
                expect(sort.next()).toEqual([22])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 28, 29,
                     8, 10, 12, 14, 17,
                     5,  0, 20, 18, 23,
                    22,  3, 11,  1, 21
                ])
                // heapify 23
                expect(sort.next()).toEqual([23, 22])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 28, 29,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 23,
                    22,  3, 11,  1, 21
                ])
                expect(sort.next()).toEqual([22])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 28, 29,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 23,
                    22,  3, 11,  1, 21
                ])
                // heapify 24
                expect(sort.next()).toEqual([24, 14])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 28, 23,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 29,
                    22,  3, 11,  1, 21
                ])
                expect(sort.next()).toEqual([14, 13])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 23, 28,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 29,
                    22,  3, 11,  1, 21
                ])
                expect(sort.next()).toEqual([13])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 23, 28,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 29,
                    22,  3, 11,  1, 21
                ])
                // heapify 27
                expect(sort.next()).toEqual([27, 25])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 23, 28,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 29,
                    11,  3, 22,  1, 21
                ])
                // heapify 29
                expect(sort.next()).toEqual([29, 27])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 23, 28,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 29,
                    11,  3, 21,  1, 22
                ])
                expect(sort.next()).toEqual([27])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 23, 28,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 29,
                    11,  3, 21,  1, 22
                ])

                // compare roots
                expect(sort.next()).toEqual([24, 29])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 23, 28,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 22,
                    11,  3, 21,  1, 29
                ])
                expect(sort.next()).toEqual([24, 14])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 27, 13,
                     9, 19,  7, 23, 22,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 28,
                    11,  3, 21,  1, 29
                ])
                expect(sort.next()).toEqual([14, 8])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 26,
                    24,  2, 25, 22, 13,
                     9, 19,  7, 23, 27,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 28,
                    11,  3, 21,  1, 29
                ])
                expect(sort.next()).toEqual([8, 4])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                    24,  2, 25, 26, 13,
                     9, 19,  7, 23, 27,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 28,
                    11,  3, 21,  1, 29
                ])
                expect(sort.next()).toEqual([4])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                    24,  2, 25, 26, 13,
                     9, 19,  7, 23, 27,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 28,
                    11,  3, 21,  1, 29
                ])

                // remove node
                expect(sort.next()).toEqual([29])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                    24,  2, 25, 26, 13,
                     9, 19,  7, 23, 27,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 28,
                    11,  3, 21,  1, 29
                ])
                expect(sort.placed).toEqual([29])

                // compare roots
                expect(sort.next()).toEqual([24, 27, 28])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                    24,  2, 25, 26, 13,
                     9, 19,  7, 23, 27,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20,  1,
                    11,  3, 21,  28, 29
                ])
                expect(sort.next()).toEqual([24, 14])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                    24,  2, 25, 26, 13,
                     9, 19,  7, 23,  1,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 27,
                    11,  3, 21, 28, 29
                ])
                expect(sort.next()).toEqual([14, 8])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                    24,  2, 25,  1, 13,
                     9, 19,  7, 23, 26,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 27,
                    11,  3, 21, 28, 29
                ])
                expect(sort.next()).toEqual([8, 7])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                    24,  2,  1, 25, 13,
                     9, 19,  7, 23, 26,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 27,
                    11,  3, 21, 28, 29
                ])
                expect(sort.next()).toEqual([7, 5])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                     1,  2, 24, 25, 13,
                     9, 19,  7, 23, 26,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 27,
                    11,  3, 21, 28, 29
                ])
                // compare remaining roots
                expect(sort.next()).toEqual([24, 27])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                     1,  2, 24, 25, 13,
                     9, 19,  7, 23, 26,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 21,
                    11,  3, 27, 28, 29
                ])
                expect(sort.next()).toEqual([24, 14])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                     1,  2, 24, 25, 13,
                     9, 19,  7, 23, 21,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 26,
                    11,  3, 27, 28, 29
                ])
                expect(sort.next()).toEqual([14, 8])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                     1,  2, 24, 21, 13,
                     9, 19,  7, 23, 25,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 26,
                    11,  3, 27, 28, 29
                ])
                expect(sort.next()).toEqual([8, 7])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                     1,  2, 21, 24, 13,
                     9, 19,  7, 23, 25,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 26,
                    11,  3, 27, 28, 29
                ])
                expect(sort.next()).toEqual([7])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                     1,  2, 21, 24, 13,
                     9, 19,  7, 23, 25,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 26,
                    11,  3, 27, 28, 29
                ])
                // remove
                expect(sort.next()).toEqual([28])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                     1,  2, 21, 24, 13,
                     9, 19,  7, 23, 25,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 26,
                    11,  3, 27, 28, 29
                ])
                expect(sort.next()).toEqual([27])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                     1,  2, 21, 24, 13,
                     9, 19,  7, 23, 25,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 26,
                    11,  3, 27, 28, 29
                ])

                // compare nodes
                expect(sort.next()).toEqual([24, 25, 26])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                     1,  2, 21, 24, 13,
                     9, 19,  7, 23, 25,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20,  3,
                    11, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([24, 14])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                     1,  2, 21, 24, 13,
                     9, 19,  7, 23,  3,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 25,
                    11, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([14, 8])
                expect(board.values()).toEqual([
                    15,  4, 16,  6, 22,
                     1,  2, 21,  3, 13,
                     9, 19,  7, 23, 24,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 25,
                    11, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([8, 4])
                expect(board.values()).toEqual([
                    15,  4, 16,  6,  3,
                     1,  2, 21, 22, 13,
                     9, 19,  7, 23, 24,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 25,
                    11, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([4, 2])
                expect(board.values()).toEqual([
                    15,  4,  3,  6, 16,
                     1,  2, 21, 22, 13,
                     9, 19,  7, 23, 24,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 25,
                    11, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([2, 0])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 21, 22, 13,
                     9, 19,  7, 23, 24,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 25,
                    11, 26, 27, 28, 29
                ])
                // finish compare
                expect(sort.next()).toEqual([24, 25])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 21, 22, 13,
                     9, 19,  7, 23, 24,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 11,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([24, 14])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 21, 22, 13,
                     9, 19,  7, 23, 11,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([14, 13])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 21, 22, 13,
                     9, 19,  7, 11, 23,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([13, 11])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 21, 22, 13,
                     9, 11,  7, 19, 23,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([11, 9])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 21, 22, 11,
                     9, 13,  7, 19, 23,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 24,
                    25, 26, 27, 28, 29
                ])
                // remove
                expect(sort.next()).toEqual([26])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 21, 22, 11,
                     9, 13,  7, 19, 23,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([25])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 21, 22, 11,
                     9, 13,  7, 19, 23,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([24])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 21, 22, 11,
                     9, 13,  7, 19, 23,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 20, 24,
                    25, 26, 27, 28, 29
                ])

                // compare
                expect(sort.next()).toEqual([14, 23])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 21, 22, 11,
                     9, 13,  7, 19, 20,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([14, 8])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 21, 20, 11,
                     9, 13,  7, 19, 22,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([8, 7])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 20, 21, 11,
                     9, 13,  7, 19, 22,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([7])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 20, 21, 11,
                     9, 13,  7, 19, 22,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 23, 24,
                    25, 26, 27, 28, 29
                ])

                // remove
                expect(sort.next()).toEqual([23])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 20, 21, 11,
                     9, 13,  7, 19, 22,
                     8, 10, 12, 14, 17,
                     5,  0, 18, 23, 24,
                    25, 26, 27, 28, 29
                ])

                // compare
                expect(sort.next()).toEqual([14, 19, 22])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 20, 21, 11,
                     9, 13,  7, 19, 18,
                     8, 10, 12, 14, 17,
                     5,  0, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([14, 8])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 20, 18, 11,
                     9, 13,  7, 19, 21,
                     8, 10, 12, 14, 17,
                     5,  0, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([8, 7])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 18, 20, 11,
                     9, 13,  7, 19, 21,
                     8, 10, 12, 14, 17,
                     5,  0, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([7])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 18, 20, 11,
                     9, 13,  7, 19, 21,
                     8, 10, 12, 14, 17,
                     5,  0, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                // finish comparison
                expect(sort.next()).toEqual([14, 19])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 18, 20, 11,
                     9, 13,  7, 19, 17,
                     8, 10, 12, 14, 21,
                     5,  0, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([14, 8])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 18, 17, 11,
                     9, 13,  7, 19, 20,
                     8, 10, 12, 14, 21,
                     5,  0, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([8, 7])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 17, 18, 11,
                     9, 13,  7, 19, 20,
                     8, 10, 12, 14, 21,
                     5,  0, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([7])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 17, 18, 11,
                     9, 13,  7, 19, 20,
                     8, 10, 12, 14, 21,
                     5,  0, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                // remove
                expect(sort.next()).toEqual([22])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 17, 18, 11,
                     9, 13,  7, 19, 20,
                     8, 10, 12, 14, 21,
                     5,  0, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.placed).toEqual([29, 28, 27, 26, 25, 24, 23, 22])

                // compare 4
                expect(sort.next()).toEqual([14, 19, 20, 21])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 17, 18, 11,
                     9, 13,  7, 19, 20,
                     8, 10, 12, 14,  0,
                     5, 21, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([19, 18])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 17, 18, 11,
                     9, 13,  7, 19, 20,
                     8, 10, 12,  0, 14,
                     5, 21, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                // compare 3
                expect(sort.next()).toEqual([14, 19, 20])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 17, 18, 11,
                     9, 13,  7, 19,  5,
                     8, 10, 12,  0, 14,
                    20, 21, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([14, 13])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 17, 18, 11,
                     9, 13,  7,  5, 19,
                     8, 10, 12,  0, 14,
                    20, 21, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([13, 11])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 17, 18, 11,
                     9,  5,  7, 13, 19,
                     8, 10, 12,  0, 14,
                    20, 21, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([11, 9])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 17, 18,  5,
                     9, 11,  7, 13, 19,
                     8, 10, 12,  0, 14,
                    20, 21, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                // compare 2
                expect(sort.next()).toEqual([14, 19])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 17, 18,  5,
                     9, 11,  7, 13, 14,
                     8, 10, 12,  0, 19,
                    20, 21, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([14, 8])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 17, 14,  5,
                     9, 11,  7, 13, 18,
                     8, 10, 12,  0, 19,
                    20, 21, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([8, 7])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 14, 17,  5,
                     9, 11,  7, 13, 18,
                     8, 10, 12,  0, 19,
                    20, 21, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([7])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 14, 17,  5,
                     9, 11,  7, 13, 18,
                     8, 10, 12,  0, 19,
                    20, 21, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])

                // remove
                expect(sort.next()).toEqual([21])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 14, 17,  5,
                     9, 11,  7, 13, 18,
                     8, 10, 12,  0, 19,
                    20, 21, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([20])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 14, 17,  5,
                     9, 11,  7, 13, 18,
                     8, 10, 12,  0, 19,
                    20, 21, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                expect(sort.next()).toEqual([19])
                expect(board.values()).toEqual([
                     3,  4, 15,  6, 16,
                     1,  2, 14, 17,  5,
                     9, 11,  7, 13, 18,
                     8, 10, 12,  0, 19,
                    20, 21, 22, 23, 24,
                    25, 26, 27, 28, 29
                ])
                // this doesn't do a full sort.
                // it's here to fix a bug when you have more than 3 roots
            })
        })
    })

    describe("smooth setup up one at a time", () => {
        beforeEach(function() {
            length = 10
            size = Sizes.xXLarge
            board = new Boards.Board(size)
            Sort = Sorts.SmoothSetUpBottom
            sort = new Sort(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sort.title).toEqual('Smooth Sort(Set up from bottom)')
            })

            it("has leonardoNumbers", function () {
                expect(sort.leonardoNumbers).toEqual([1, 1, 3, 5, 9])
            })

            it("has tree sizes", function () {
                expect(sort.treeSizes).toEqual([1])
            })

            it("has nodes to heap", function () {
                expect(sort.nodesToHeap).toEqual([])
            })

            it("has roots", function () {
                expect(sort.roots).toEqual([0])
            })

            it("has roots to compare", function () {
                expect(sort.rootsToCompare).toEqual([])
            })
        })

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(1)
            expect(sort.comparisonNode).toEqual(1)
        })

        describe("utils", () => {
            it("it does reverse group", () => {
                board.setPoints([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
                sort = new Sort(board)

                expect(sort.roots).toEqual([0])
                // create the heaps
                // add index 1
                expect(sort.next()).toEqual([0, 1])
                expect(board.values()).toEqual([8, 9, 7, 6, 5, 4, 3, 2, 1, 0])
                expect(sort.roots).toEqual([0, 1])
                // add index 2
                expect(sort.next()).toEqual([2, 1])
                expect(board.values()).toEqual([8, 7, 9, 6, 5, 4, 3, 2, 1, 0])
                expect(sort.roots).toEqual([2])
                // add index 3
                expect(sort.next()).toEqual([2, 3])
                expect(board.values()).toEqual([8, 7, 6, 9, 5, 4, 3, 2, 1, 0])
                expect(sort.next()).toEqual([2, 0])
                expect(board.values()).toEqual([6, 7, 8, 9, 5, 4, 3, 2, 1, 0])
                expect(sort.roots).toEqual([2, 3])
                // add index 4
                expect(sort.next()).toEqual([4, 3])
                expect(board.values()).toEqual([6, 7, 8, 5, 9, 4, 3, 2, 1, 0])
                expect(sort.roots).toEqual([4])
                // add index 5
                expect(sort.next()).toEqual([4, 5])
                expect(board.values()).toEqual([6, 7, 8, 5, 4, 9, 3, 2, 1, 0])
                expect(sort.next()).toEqual([4, 2])
                expect(board.values()).toEqual([6, 7, 4, 5, 8, 9, 3, 2, 1, 0])
                expect(sort.next()).toEqual([2, 1])
                expect(board.values()).toEqual([6, 4, 7, 5, 8, 9, 3, 2, 1, 0])
                expect(sort.roots).toEqual([4, 5])
                // add index 6
                expect(sort.next()).toEqual([4, 5, 6])
                expect(board.values()).toEqual([6, 4, 7, 5, 8, 3, 9, 2, 1, 0])
                expect(sort.next()).toEqual([4, 5])
                expect(board.values()).toEqual([6, 4, 7, 5, 3, 8, 9, 2, 1, 0])
                expect(sort.next()).toEqual([4, 2])
                expect(board.values()).toEqual([6, 4, 3, 5, 7, 8, 9, 2, 1, 0])
                expect(sort.next()).toEqual([2, 0])
                expect(board.values()).toEqual([3, 4, 6, 5, 7, 8, 9, 2, 1, 0])
                expect(sort.roots).toEqual([4, 5, 6])
                // add index 7
                expect(sort.next()).toEqual([7, 6])
                expect(board.values()).toEqual([3, 4, 6, 5, 7, 8, 2, 9, 1, 0])
                expect(sort.roots).toEqual([4, 7])
                // add index 8
                expect(sort.next()).toEqual([8, 7])
                expect(board.values()).toEqual([3, 4, 6, 5, 7, 8, 2, 1, 9, 0])
                expect(sort.next()).toEqual([7, 5])
                expect(board.values()).toEqual([3, 4, 6, 5, 7, 1, 2, 8, 9, 0])
                expect(sort.roots).toEqual([8])
                // add index 9
                expect(sort.next()).toEqual([8, 9])
                expect(board.values()).toEqual([3, 4, 6, 5, 7, 1, 2, 8, 0, 9])
                expect(sort.next()).toEqual([8, 7])
                expect(board.values()).toEqual([3, 4, 6, 5, 7, 1, 2, 0, 8, 9])
                expect(sort.next()).toEqual([7, 6])
                expect(board.values()).toEqual([3, 4, 6, 5, 7, 1, 0, 2, 8, 9])
                expect(sort.treeSizes).toEqual([1, 1, 3, 1, 5, 1, 1, 3, 9, 1])
                expect(sort.roots).toEqual([8, 9])

                // remove
                expect(sort.next()).toEqual([9])
                expect(board.values()).toEqual([3, 4, 6, 5, 7, 1, 0, 2, 8, 9])
                expect(sort.next()).toEqual([8])
                expect(board.values()).toEqual([3, 4, 6, 5, 7, 1, 0, 2, 8, 9])

                // compare roots
                expect(sort.next()).toEqual([4, 7])
                expect(board.values()).toEqual([3, 4, 6, 5, 2, 1, 0, 7, 8, 9])
                expect(sort.next()).toEqual([4, 2])
                expect(board.values()).toEqual([3, 4, 2, 5, 6, 1, 0, 7, 8, 9])
                expect(sort.next()).toEqual([2, 1])
                expect(board.values()).toEqual([3, 2, 4, 5, 6, 1, 0, 7, 8, 9])

                // remove
                expect(sort.next()).toEqual([7])
                expect(board.values()).toEqual([3, 2, 4, 5, 6, 1, 0, 7, 8, 9])

                // compare nodes
                expect(sort.next()).toEqual([4, 5, 6])
                expect(board.values()).toEqual([3, 2, 4, 5, 0, 1, 6, 7, 8, 9])
                expect(sort.next()).toEqual([4, 3])
                expect(board.values()).toEqual([3, 2, 4, 0, 5, 1, 6, 7, 8, 9])

                // compare
                expect(sort.next()).toEqual([4, 5])
                expect(board.values()).toEqual([3, 2, 4, 0, 1, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([4, 2])
                expect(board.values()).toEqual([3, 2, 1, 0, 4, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([2, 0])
                expect(board.values()).toEqual([1, 2, 3, 0, 4, 5, 6, 7, 8, 9])

                // remove
                expect(sort.next()).toEqual([6])
                expect(board.values()).toEqual([1, 2, 3, 0, 4, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([5])
                expect(board.values()).toEqual([1, 2, 3, 0, 4, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([4])
                expect(board.values()).toEqual([1, 2, 3, 0, 4, 5, 6, 7, 8, 9])

                // compare
                expect(sort.next()).toEqual([2, 3])
                expect(board.values()).toEqual([1, 2, 0, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([2, 1])
                expect(board.values()).toEqual([1, 0, 2, 3, 4, 5, 6, 7, 8, 9])

                // remove
                expect(sort.next()).toEqual([3])
                expect(board.values()).toEqual([1, 0, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([1, 0, 2, 3, 4, 5, 6, 7, 8, 9])

                // compare
                expect(sort.next()).toEqual([0, 1])
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

                // remove
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })
        })
    })

    describe("insertion", () => {
        beforeEach(function() {
            length = 5
            size = Sizes.fewFew
            board = new Boards.Board(size)
            Sort = Sorts.Insertion
            sort = new Sort(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sort.title).toEqual('Insertion Sort')
            })
        })

        it("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(1)
            expect(sort.comparisonNode).toEqual(1)
        })

        describe("utils", () => {

            it("has current nodes", () => {
                expect(sort.currentNodes()).toEqual([1, 1])
            })

            it("it handles ordered group", () => {
                board.setPoints([0, 1, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([2])
                expect(sort.next()).toEqual([3])
                expect(sort.next()).toEqual([4])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a random group", () => {
                board.setPoints([0, 3, 1, 4, 2])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([0, 3, 1, 4, 2])
                expect(sort.next()).toEqual([1, 2])
                expect(board.values()).toEqual([0, 3, 3, 4, 2])
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([0, 1, 3, 4, 2])
                expect(sort.next()).toEqual([3])
                expect(board.values()).toEqual([0, 1, 3, 4, 2])
                expect(sort.next()).toEqual([3, 4])
                expect(board.values()).toEqual([0, 1, 3, 4, 4])
                expect(sort.next()).toEqual([2, 4])
                expect(board.values()).toEqual([0, 1, 3, 3, 4])
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([0, 1, 2, 3, 4])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping first group", () => {
                board.setPoints([1, 0, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(board.values()).toEqual([1, 1, 2, 3, 4])
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([0, 1, 2, 3, 4])
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([0, 1, 2, 3, 4])
                expect(sort.next()).toEqual([3])
                expect(board.values()).toEqual([0, 1, 2, 3, 4])
                expect(sort.next()).toEqual([4])
                expect(board.values()).toEqual([0, 1, 2, 3, 4])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping last group", () => {
                board.setPoints([0, 1, 2, 4, 3])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([0, 1, 2, 4, 3])
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([0, 1, 2, 4, 3])
                expect(sort.next()).toEqual([3])
                expect(board.values()).toEqual([0, 1, 2, 4, 3])
                expect(sort.next()).toEqual([3, 4])
                expect(board.values()).toEqual([0, 1, 2, 4, 4])
                expect(sort.next()).toEqual([3])
                expect(board.values()).toEqual([0, 1, 2, 3, 4])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it does reverse group", () => {
                board.setPoints([4, 3, 2, 1, 0])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(board.values()).toEqual([4, 4, 2, 1, 0])
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([3, 4, 2, 1, 0])

                expect(sort.next()).toEqual([1, 2])
                expect(board.values()).toEqual([3, 4, 4, 1, 0])
                expect(sort.next()).toEqual([0, 2])
                expect(board.values()).toEqual([3, 3, 4, 1, 0])
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([2, 3, 4, 1, 0])

                expect(sort.next()).toEqual([2, 3])
                expect(board.values()).toEqual([2, 3, 4, 4, 0])
                expect(sort.next()).toEqual([1, 3])
                expect(board.values()).toEqual([2, 3, 3, 4, 0])
                expect(sort.next()).toEqual([0, 3])
                expect(board.values()).toEqual([2, 2, 3, 4, 0])
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([1, 2, 3, 4, 0])

                expect(sort.next()).toEqual([3, 4])
                expect(board.values()).toEqual([1, 2, 3, 4, 4])
                expect(sort.next()).toEqual([2, 4])
                expect(board.values()).toEqual([1, 2, 3, 3, 4])
                expect(sort.next()).toEqual([1, 4])
                expect(board.values()).toEqual([1, 2, 2, 3, 4])
                expect(sort.next()).toEqual([0, 4])
                expect(board.values()).toEqual([1, 1, 2, 3, 4])
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([0, 1, 2, 3, 4])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it handles first and last swapped", () => {
                board.setPoints([4, 1, 2, 3, 0])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(board.values()).toEqual([4, 4, 2, 3, 0])
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([1, 4, 2, 3, 0])

                expect(sort.next()).toEqual([1, 2])
                expect(board.values()).toEqual([1, 4, 4, 3, 0])
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([1, 2, 4, 3, 0])

                expect(sort.next()).toEqual([2, 3])
                expect(board.values()).toEqual([1, 2, 4, 4, 0])
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([1, 2, 3, 4, 0])

                expect(sort.next()).toEqual([3, 4])
                expect(board.values()).toEqual([1, 2, 3, 4, 4])
                expect(sort.next()).toEqual([2, 4])
                expect(board.values()).toEqual([1, 2, 3, 3, 4])
                expect(sort.next()).toEqual([1, 4])
                expect(board.values()).toEqual([1, 2, 2, 3, 4])
                expect(sort.next()).toEqual([0, 4])
                expect(board.values()).toEqual([1, 1, 2, 3, 4])
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([0, 1, 2, 3, 4])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles partially ordered grouping", () => {
                board.setPoints([0, 3, 2, 1, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([0, 3, 2, 1, 4])

                expect(sort.next()).toEqual([1, 2])
                expect(board.values()).toEqual([0, 3, 3, 1, 4])
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([0, 2, 3, 1, 4])

                expect(sort.next()).toEqual([2, 3])
                expect(board.values()).toEqual([0, 2, 3, 3, 4])
                expect(sort.next()).toEqual([1, 3])
                expect(board.values()).toEqual([0, 2, 2, 3, 4])
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([0, 1, 2, 3, 4])

                expect(sort.next()).toEqual([4])
                expect(board.values()).toEqual([0, 1, 2, 3, 4])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles duplicates", () => {
                let values = [0, 2, 3, 1, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([0, 2, 3, 1, 1])

                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([0, 2, 3, 1, 1])

                expect(sort.next()).toEqual([2, 3])
                expect(board.values()).toEqual([0, 2, 3, 3, 1])
                expect(sort.next()).toEqual([1, 3])
                expect(board.values()).toEqual([0, 2, 2, 3, 1])
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([0, 1, 2, 3, 1])

                expect(sort.next()).toEqual([3, 4])
                expect(board.values()).toEqual([0, 1, 2, 3, 3])
                expect(sort.next()).toEqual([2, 4])
                expect(board.values()).toEqual([0, 1, 2, 2, 3])
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([0, 1, 1, 2, 3])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            it("handles more duplicates", () => {
                let values = [2, 1, 1, 2, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(board.values()).toEqual([2, 2, 1, 2, 1])
                expect(sort.next()).toEqual([0])
                expect(board.values()).toEqual([1, 2, 1, 2, 1])

                expect(sort.next()).toEqual([1, 2])
                expect(board.values()).toEqual([1, 2, 2, 2, 1])
                expect(sort.next()).toEqual([1])
                expect(board.values()).toEqual([1, 1, 2, 2, 1])

                expect(sort.next()).toEqual([3])
                expect(board.values()).toEqual([1, 1, 2, 2, 1])

                expect(sort.next()).toEqual([3, 4])
                expect(board.values()).toEqual([1, 1, 2, 2, 2])
                expect(sort.next()).toEqual([2, 4])
                expect(board.values()).toEqual([1, 1, 2, 2, 2])
                expect(sort.next()).toEqual([2])
                expect(board.values()).toEqual([1, 1, 1, 2, 2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })
        })
    })

    xdescribe("sort test base", () => {
        beforeEach(function() {
            length = 5
            size = Sizes.fewFew
            board = new Boards.Board(size)
            Sort = Sorts.QuickSort2
            sort = new Sort(board)
        });

        xdescribe("create", function () {
            xit("it has a title", () => {
                expect(Sort.title).toEqual('Title')
            })
        })

        xit("has a reset function", () => {
            while(!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(0)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
        })

        xdescribe("utils", () => {

            xit("has current nodes", () => {
                expect(sort.currentNodes()).toEqual([0, 1])
            })

            xit("it handles ordered group", () => {
                board.setPoints([0, 1, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            xit("handles a random group", () => {
                board.setPoints([0, 3, 1, 4, 2])
                sort = new Sort(board)

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            xit("handles a swaping first group", () => {
                board.setPoints([1, 0, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            xit("handles a swaping last group", () => {
                board.setPoints([0, 1, 2, 4, 3])
                sort = new Sort(board)

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            xit("it does reverse group", () => {
                board.setPoints([4, 3, 2, 1, 0])
                sort = new Sort(board)

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            xit("it handles first and last swapped", () => {
                board.setPoints([4, 1, 2, 3, 0])
                sort = new Sort(board)

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            xit("handles partially ordered grouping", () => {
                board.setPoints([0, 3, 2, 1, 4])
                sort = new Sort(board)

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            xit("handles duplicates", () => {
                let values = [0, 2, 3, 1, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            xit("handles more duplicates", () => {
                let values = [2, 1, 1, 2, 1]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            xit("handles negatives", () => {
                let values = [-2, 1, -1, 2, 0]
                board.setPoints(values)
                sort = new Sort(board)

                expect(sort.done).toEqual(true)
                expect(board.values()).toEqual([-2, -1, 0, 1, 2])
            })
        })
    })
});
