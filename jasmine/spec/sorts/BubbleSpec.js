describe("Bubble Sorts", function() {
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

            it('tracks profile', () => {
                board.setPoints([1, 0, 2, 3, 4, 5, 6, 7, 8, 9])
                sort.next(board)
                expect(sort.profile[1]).toEqual({
                    swaps: 1,
                    comparisons: 1
                })
                sort.next(board)
                expect(sort.profile[2]).toEqual({
                    swaps: 1,
                    comparisons: 2
                })
            });

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

    describe("concurrent bubble sort", () => {
        beforeEach(function() {
            length = 5
            size = Sizes.fewFew
            board = new Boards.Board(size)
            Sort = Sorts.BubbleSortConcurrent
            sort = new Sort(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sort.title).toEqual('Bubble Sort(Concurrent 2)')
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
            expect(sort.baseNodes).toEqual([0, 2])
            expect(sort.orderedSets).toEqual([true, false])
        })

        describe("utils", () => {

            it("has current nodes", () => {
                expect(sort.currentNodes()).toEqual([0, 2])
            })

            it("it handles ordered group", () => {
                board.setPoints([0, 1, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([2, 0])
                expect(sort.next()).toEqual([3, 1])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a random group", () => {
                board.setPoints([0, 3, 1, 4, 2])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([2, 0])
                expect(sort.next()).toEqual([3, 1])
                expect(sort.next()).toEqual([0, 2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping first group", () => {
                board.setPoints([1, 0, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([2, 0])
                expect(sort.next()).toEqual([3, 1])
                expect(sort.next()).toEqual([0, 2])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping last group", () => {
                board.setPoints([0, 1, 2, 4, 3])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([2, 0])
                expect(sort.next()).toEqual([3, 1])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it does reverse group", () => {
                board.setPoints([4, 3, 2, 1, 0])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([1, 3])
                expect(sort.next()).toEqual([2, 0])
                expect(sort.next()).toEqual([3, 1])
                expect(sort.next()).toEqual([0, 2])
                expect(sort.next()).toEqual([1])
                expect(sort.next()).toEqual([0])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })
        })
    })

    describe("Bubble don't restart", () => {
        beforeEach(function() {
            length = 5
            size = Sizes.fewFew
            board = new Boards.Board(size)
            Sort = Sorts.BubbleSortDontRestart
            sort = new Sort(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sort.title).toEqual("Bubble(Don't restart)")
            })
        })

        describe("utils", () => {
            it("handles a random group", () => {
                board.setPoints([0, 3, 1, 4, 2])
                sort = new Sort(board)

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([1, 3])
                expect(board.values()).toEqual([0, 1, 3, 4, 2])

                expect(sort.next()).toEqual([0, 1])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])
                expect(board.values()).toEqual([0, 1, 3, 2, 4])

                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([2, 4])
                expect(board.values()).toEqual([0, 1, 2, 3, 4])
                expect(sort.next()).toEqual([1, 2])
                expect(sort.next()).toEqual([2, 3])
                expect(sort.next()).toEqual([3, 4])

                expect(sort.done).toEqual(true)
                for(let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })
        })
    })
});
