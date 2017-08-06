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
                expect(sort.comparisons).toEqual(9)
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
                expect(sort.comparisons).toEqual(9)
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
                expect(Sorts.BogoSingle.title).toEqual('Bozo(Single Swap)')
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
                expect(Sorts.BogoSingleCompare.title).toEqual('Smart Bozo(Compare & Single Swap)')
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

    describe("Permutation sort", () => {
        beforeEach(function () {
            length = 5
            size = Sizes.fewFew
            board = new Boards.Board(size)
            Sort = Sorts.Permutation
            sort = new Sort(board)
        });

        describe("create", function () {
            it("it has a title", () => {
                expect(Sort.title).toEqual('Permutation Sort')
            })

            it("has original order", () => {
                expect(sort.original).toEqual(board.values())
            })

            it("has permutation tracker", () => {
                expect(sort.permutation).toEqual(Array.prototype.range(board.length))
            })
        })

        it("has a reset function", () => {
            while (!sort.done) {
                sort.next()
            }
            let values = board.values().slice()
            sort.reset()
            expect(sort.done).toBeFalsy()
            expect(sort.steps).toEqual(0)
            expect(sort.swaps).toEqual(0)
            expect(sort.comparisons).toEqual(4)
            expect(values).not.toEqual(board.values())
            expect(sort.baseNode).toEqual(0)
            expect(sort.comparisonNode).toEqual(1)
            expect(sort.original).toEqual(board.values())
            expect(sort.permutation).toEqual(Array.prototype.range(board.length))
        })

        describe("utils", () => {

            it("has current nodes", () => {
                expect(sort.currentNodes()).toEqual([0, 1, 2, 3, 4])
            })

            it("it handles ordered group", () => {
                board.setPoints([0, 1, 2, 3, 4])
                sort = new Sort(board)

                expect(sort.done).toEqual(true)
                for (let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a random group", () => {
                board.setPoints([0, 3, 1, 4, 2])
                sort = new Sort(board)

                // [0, 3, 1, 4, 2]
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 2, 4, 3])
                expect(board.values()).toEqual([0, 3, 1, 2, 4])

                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 2, 4])
                expect(board.values()).toEqual([0, 3, 4, 1, 2])

                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 4, 2])
                expect(board.values()).toEqual([0, 3, 4, 2, 1])

                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 2, 3])
                expect(board.values()).toEqual([0, 3, 2, 1, 4])

                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 3, 2])
                expect(board.values()).toEqual([0, 3, 2, 4, 1])

                // [0, 3, 1, 4, 2]
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 3, 4])
                expect(board.values()).toEqual([0, 1, 3, 4, 2])

                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 4, 3])
                expect(board.values()).toEqual([0, 1, 3, 2, 4])

                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 1, 4])
                expect(board.values()).toEqual([0, 1, 4, 3, 2])

                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 4, 1])
                expect(board.values()).toEqual([0, 1, 4, 2, 3])

                sort.next()
                expect(sort.permutation).toEqual([0, 2, 4, 1, 3])
                expect(board.values()).toEqual([0, 1, 2, 3, 4])

                expect(sort.done).toEqual(true)

                sort.next()
                expect(sort.next()).toEqual([])
                expect(sort.steps).toBeGreaterThan(0)
                expect(sort.swaps).toBeGreaterThan(0)
                expect(sort.comparisons).toBeGreaterThan(0)
                expect(sort.profile.swaps.length).toBeTruthy()
                for (let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping first group", () => {
                board.setPoints([1, 0, 2, 3, 4])
                sort = new Sort(board)

                sort.next()
                expect(sort.permutation).toEqual([0, 1, 2, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 3, 2])
                // [0, 3, 1, 4, 2]
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 4, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 4, 3, 1])

                sort.next()
                expect(sort.permutation).toEqual([0, 3, 1, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 1, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 2, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 2, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 4, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 4, 2, 1])

                sort.next()
                expect(sort.permutation).toEqual([0, 4, 1, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 1, 3, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 2, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 2, 3, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 3, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 3, 2, 1])

                sort.next()
                expect(sort.permutation).toEqual([1, 0, 2, 3, 4])

                expect(sort.done).toEqual(true)
                for (let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles a swaping last group", () => {
                board.setPoints([0, 1, 2, 4, 3])
                sort = new Sort(board)

                sort.next()
                expect(sort.permutation).toEqual([0, 1, 2, 4, 3])

                expect(sort.done).toEqual(true)
                for (let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it does reverse group", () => {
                board.setPoints([4, 3, 2, 1, 0])
                sort = new Sort(board)

                board.setPoints([4, 3, 2, 1, 0])
                sort = new Sort(board)

                sort.next()
                expect(sort.permutation).toEqual([0, 1, 2, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 3, 2])
                // [0, 3, 1, 4, 2]
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 4, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 4, 3, 1])

                sort.next()
                expect(sort.permutation).toEqual([0, 3, 1, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 1, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 2, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 2, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 4, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 4, 2, 1])

                sort.next()
                expect(sort.permutation).toEqual([0, 4, 1, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 1, 3, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 2, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 2, 3, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 3, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 3, 2, 1])

                sort.next()
                expect(sort.permutation).toEqual([1, 0, 2, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 2, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 3, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 3, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 4, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 4, 3, 2])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 0, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 0, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 3, 0, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 3, 4, 0])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 4, 0, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 4, 3, 0])
                sort.next()
                expect(sort.permutation).toEqual([1, 3, 0, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 3, 0, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([1, 3, 2, 0, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 3, 2, 4, 0])
                sort.next()
                expect(sort.permutation).toEqual([1, 3, 4, 0, 2])
                sort.next()
                expect(sort.permutation).toEqual([1, 3, 4, 2, 0])
                sort.next()
                expect(sort.permutation).toEqual([1, 4, 0, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 4, 0, 3, 2])
                sort.next()
                expect(sort.permutation).toEqual([1, 4, 2, 0, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 4, 2, 3, 0])
                sort.next()
                expect(sort.permutation).toEqual([1, 4, 3, 0, 2])
                sort.next()
                expect(sort.permutation).toEqual([1, 4, 3, 2, 0])

                sort.next()
                expect(sort.permutation).toEqual([2, 0, 1, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([2, 0, 1, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([2, 0, 3, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([2, 0, 3, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([2, 0, 4, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([2, 0, 4, 3, 1])
                sort.next()
                expect(sort.permutation).toEqual([2, 1, 0, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([2, 1, 0, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([2, 1, 3, 0, 4])
                sort.next()
                expect(sort.permutation).toEqual([2, 1, 3, 4, 0])
                sort.next()
                expect(sort.permutation).toEqual([2, 1, 4, 0, 3])
                sort.next()
                expect(sort.permutation).toEqual([2, 1, 4, 3, 0])
                sort.next()
                expect(sort.permutation).toEqual([2, 3, 0, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([2, 3, 0, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([2, 3, 1, 0, 4])
                sort.next()
                expect(sort.permutation).toEqual([2, 3, 1, 4, 0])
                sort.next()
                expect(sort.permutation).toEqual([2, 3, 4, 0, 1])
                sort.next()
                expect(sort.permutation).toEqual([2, 3, 4, 1, 0])
                sort.next()
                expect(sort.permutation).toEqual([2, 4, 0, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([2, 4, 0, 3, 1])
                sort.next()
                expect(sort.permutation).toEqual([2, 4, 1, 0, 3])
                sort.next()
                expect(sort.permutation).toEqual([2, 4, 1, 3, 0])
                sort.next()
                expect(sort.permutation).toEqual([2, 4, 3, 0, 1])
                sort.next()
                expect(sort.permutation).toEqual([2, 4, 3, 1, 0])

                sort.next()
                expect(sort.permutation).toEqual([3, 0, 1, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([3, 0, 1, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([3, 0, 2, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([3, 0, 2, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([3, 0, 4, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([3, 0, 4, 2, 1])
                sort.next()
                expect(sort.permutation).toEqual([3, 1, 0, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([3, 1, 0, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([3, 1, 2, 0, 4])
                sort.next()
                expect(sort.permutation).toEqual([3, 1, 2, 4, 0])
                sort.next()
                expect(sort.permutation).toEqual([3, 1, 4, 0, 2])
                sort.next()
                expect(sort.permutation).toEqual([3, 1, 4, 2, 0])
                sort.next()
                expect(sort.permutation).toEqual([3, 2, 0, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([3, 2, 0, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([3, 2, 1, 0, 4])
                sort.next()
                expect(sort.permutation).toEqual([3, 2, 1, 4, 0])
                sort.next()
                expect(sort.permutation).toEqual([3, 2, 4, 0, 1])
                sort.next()
                expect(sort.permutation).toEqual([3, 2, 4, 1, 0])
                sort.next()
                expect(sort.permutation).toEqual([3, 4, 0, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([3, 4, 0, 2, 1])
                sort.next()
                expect(sort.permutation).toEqual([3, 4, 1, 0, 2])
                sort.next()
                expect(sort.permutation).toEqual([3, 4, 1, 2, 0])
                sort.next()
                expect(sort.permutation).toEqual([3, 4, 2, 0, 1])
                sort.next()
                expect(sort.permutation).toEqual([3, 4, 2, 1, 0])

                sort.next()
                expect(sort.permutation).toEqual([4, 0, 1, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([4, 0, 1, 3, 2])
                sort.next()
                expect(sort.permutation).toEqual([4, 0, 2, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([4, 0, 2, 3, 1])
                sort.next()
                expect(sort.permutation).toEqual([4, 0, 3, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([4, 0, 3, 2, 1])
                sort.next()
                expect(sort.permutation).toEqual([4, 1, 0, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([4, 1, 0, 3, 2])
                sort.next()
                expect(sort.permutation).toEqual([4, 1, 2, 0, 3])
                sort.next()
                expect(sort.permutation).toEqual([4, 1, 2, 3, 0])
                sort.next()
                expect(sort.permutation).toEqual([4, 1, 3, 0, 2])
                sort.next()
                expect(sort.permutation).toEqual([4, 1, 3, 2, 0])
                sort.next()
                expect(sort.permutation).toEqual([4, 2, 0, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([4, 2, 0, 3, 1])
                sort.next()
                expect(sort.permutation).toEqual([4, 2, 1, 0, 3])
                sort.next()
                expect(sort.permutation).toEqual([4, 2, 1, 3, 0])
                sort.next()
                expect(sort.permutation).toEqual([4, 2, 3, 0, 1])
                sort.next()
                expect(sort.permutation).toEqual([4, 2, 3, 1, 0])
                sort.next()
                expect(sort.permutation).toEqual([4, 3, 0, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([4, 3, 0, 2, 1])
                sort.next()
                expect(sort.permutation).toEqual([4, 3, 1, 0, 2])
                sort.next()
                expect(sort.permutation).toEqual([4, 3, 1, 2, 0])
                sort.next()
                expect(sort.permutation).toEqual([4, 3, 2, 0, 1])
                sort.next()
                expect(sort.permutation).toEqual([4, 3, 2, 1, 0])

                expect(sort.done).toEqual(true)
                for (let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("it handles first and last swapped", () => {
                board.setPoints([4, 1, 2, 3, 0])
                // 4, 1, 2, 3, 0
                sort = new Sort(board)

                sort.next()
                expect(sort.permutation).toEqual([0, 1, 2, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 3, 2])
                // [0, 3, 1, 4, 2]
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 4, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 4, 3, 1])

                sort.next()
                expect(sort.permutation).toEqual([0, 3, 1, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 1, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 2, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 2, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 4, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 4, 2, 1])

                sort.next()
                expect(sort.permutation).toEqual([0, 4, 1, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 1, 3, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 2, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 2, 3, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 3, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 3, 2, 1])

                sort.next()
                expect(sort.permutation).toEqual([1, 0, 2, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 2, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 3, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 3, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 4, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 4, 3, 2])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 0, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 0, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 3, 0, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 3, 4, 0])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 4, 0, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 4, 3, 0])
                sort.next()
                expect(sort.permutation).toEqual([1, 3, 0, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 3, 0, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([1, 3, 2, 0, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 3, 2, 4, 0])
                sort.next()
                expect(sort.permutation).toEqual([1, 3, 4, 0, 2])
                sort.next()
                expect(sort.permutation).toEqual([1, 3, 4, 2, 0])
                sort.next()
                expect(sort.permutation).toEqual([1, 4, 0, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 4, 0, 3, 2])
                sort.next()
                expect(sort.permutation).toEqual([1, 4, 2, 0, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 4, 2, 3, 0])
                sort.next()
                expect(sort.permutation).toEqual([1, 4, 3, 0, 2])
                sort.next()
                expect(sort.permutation).toEqual([1, 4, 3, 2, 0])

                sort.next()
                expect(sort.permutation).toEqual([2, 0, 1, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([2, 0, 1, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([2, 0, 3, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([2, 0, 3, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([2, 0, 4, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([2, 0, 4, 3, 1])
                sort.next()
                expect(sort.permutation).toEqual([2, 1, 0, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([2, 1, 0, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([2, 1, 3, 0, 4])
                sort.next()
                expect(sort.permutation).toEqual([2, 1, 3, 4, 0])
                sort.next()
                expect(sort.permutation).toEqual([2, 1, 4, 0, 3])
                sort.next()
                expect(sort.permutation).toEqual([2, 1, 4, 3, 0])
                sort.next()
                expect(sort.permutation).toEqual([2, 3, 0, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([2, 3, 0, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([2, 3, 1, 0, 4])
                sort.next()
                expect(sort.permutation).toEqual([2, 3, 1, 4, 0])
                sort.next()
                expect(sort.permutation).toEqual([2, 3, 4, 0, 1])
                sort.next()
                expect(sort.permutation).toEqual([2, 3, 4, 1, 0])
                sort.next()
                expect(sort.permutation).toEqual([2, 4, 0, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([2, 4, 0, 3, 1])
                sort.next()
                expect(sort.permutation).toEqual([2, 4, 1, 0, 3])
                sort.next()
                expect(sort.permutation).toEqual([2, 4, 1, 3, 0])
                sort.next()
                expect(sort.permutation).toEqual([2, 4, 3, 0, 1])
                sort.next()
                expect(sort.permutation).toEqual([2, 4, 3, 1, 0])

                sort.next()
                expect(sort.permutation).toEqual([3, 0, 1, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([3, 0, 1, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([3, 0, 2, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([3, 0, 2, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([3, 0, 4, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([3, 0, 4, 2, 1])
                sort.next()
                expect(sort.permutation).toEqual([3, 1, 0, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([3, 1, 0, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([3, 1, 2, 0, 4])
                sort.next()
                expect(sort.permutation).toEqual([3, 1, 2, 4, 0])
                sort.next()
                expect(sort.permutation).toEqual([3, 1, 4, 0, 2])
                sort.next()
                expect(sort.permutation).toEqual([3, 1, 4, 2, 0])
                sort.next()
                expect(sort.permutation).toEqual([3, 2, 0, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([3, 2, 0, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([3, 2, 1, 0, 4])
                sort.next()
                expect(sort.permutation).toEqual([3, 2, 1, 4, 0])
                sort.next()
                expect(sort.permutation).toEqual([3, 2, 4, 0, 1])
                sort.next()
                expect(sort.permutation).toEqual([3, 2, 4, 1, 0])
                sort.next()
                expect(sort.permutation).toEqual([3, 4, 0, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([3, 4, 0, 2, 1])
                sort.next()
                expect(sort.permutation).toEqual([3, 4, 1, 0, 2])
                sort.next()
                expect(sort.permutation).toEqual([3, 4, 1, 2, 0])
                sort.next()
                expect(sort.permutation).toEqual([3, 4, 2, 0, 1])
                sort.next()
                expect(sort.permutation).toEqual([3, 4, 2, 1, 0])

                sort.next()
                expect(sort.permutation).toEqual([4, 0, 1, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([4, 0, 1, 3, 2])
                sort.next()
                expect(sort.permutation).toEqual([4, 0, 2, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([4, 0, 2, 3, 1])
                sort.next()
                expect(sort.permutation).toEqual([4, 0, 3, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([4, 0, 3, 2, 1])
                sort.next()
                expect(sort.permutation).toEqual([4, 1, 0, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([4, 1, 0, 3, 2])
                sort.next()
                expect(sort.permutation).toEqual([4, 1, 2, 0, 3])
                sort.next()
                expect(sort.permutation).toEqual([4, 1, 2, 3, 0])

                expect(sort.done).toEqual(true)
                for (let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles partially ordered grouping", () => {
                board.setPoints([0, 3, 2, 1, 4])
                // 0 3 2 1 4
                sort = new Sort(board)

                sort.next()
                expect(sort.permutation).toEqual([0, 1, 2, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 3, 2])

                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 4, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 4, 3, 1])

                sort.next()
                expect(sort.permutation).toEqual([0, 3, 1, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 1, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 2, 1, 4])

                expect(sort.done).toEqual(true)
                for (let i = 0; i < board.length; i++) {
                    expect(i).toEqual(board.values()[i])
                }
            })

            it("handles duplicates", () => {
                let values = [0, 2, 3, 1, 1]
                // 0 3 4 1 2
                board.setPoints(values)
                sort = new Sort(board)

                sort.next()
                expect(sort.permutation).toEqual([0, 1, 2, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 3, 2])
                // [0, 3, 1, 4, 2]
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 4, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 4, 3, 1])

                sort.next()
                expect(sort.permutation).toEqual([0, 3, 1, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 1, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 2, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 2, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 4, 1, 2])

                expect(sort.done).toEqual(true)
                for (let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            it("handles more duplicates", () => {
                let values = [2, 1, 1, 2, 1]
                // 1 2 4 0 3
                board.setPoints(values)
                sort = new Sort(board)

                sort.next()
                expect(sort.permutation).toEqual([0, 1, 2, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 3, 2])
                // [0, 3, 1, 4, 2]
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 4, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 4, 3, 1])

                sort.next()
                expect(sort.permutation).toEqual([0, 3, 1, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 1, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 2, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 2, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 4, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 3, 4, 2, 1])

                sort.next()
                expect(sort.permutation).toEqual([0, 4, 1, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 1, 3, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 2, 1, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 2, 3, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 3, 1, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 4, 3, 2, 1])

                sort.next()
                expect(sort.permutation).toEqual([1, 0, 2, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 2, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 3, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 3, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 4, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 0, 4, 3, 2])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 0, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 0, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 3, 0, 4])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 3, 4, 0])
                sort.next()
                expect(sort.permutation).toEqual([1, 2, 4, 0, 3])

                expect(sort.done).toEqual(true)
                for (let i = 0; i < board.length; i++) {
                    expect(values.slice().sort()[i]).toEqual(board.values()[i])
                }
            })

            it("handles negatives", () => {
                let values = [-2, 1, -1, 2, 0]
                // 0 2 4 1 3
                board.setPoints(values)
                sort = new Sort(board)

                sort.next()
                expect(sort.permutation).toEqual([0, 1, 2, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 2, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 3, 4, 2])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 2, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 1, 4, 3, 2])
                // [0, 3, 1, 4, 2]
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 3, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 1, 4, 3])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 1, 4])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 3, 4, 1])
                sort.next()
                expect(sort.permutation).toEqual([0, 2, 4, 1, 3])

                expect(sort.done).toEqual(true)
                expect(board.values()).toEqual([-2, -1, 0, 1, 2])
            })
        })
    })
});
