describe("Bogo", function() {
    let length, sort, board, size;
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
});
