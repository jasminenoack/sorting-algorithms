describe("Board", function() {
    var board, size;
    describe("creates a board", function () {
        beforeEach(function() {
            size = Sizes.large
            board = new Boards.Board(size)
        });

        it("should create a new board", () => {
            expect(board).toBeTruthy()
        })

        it("board should have a size", () => {
            expect(board.size).toEqual(size)
        })

        it("board should have a length", () => {
            expect(board.length).toEqual(size.elemCount)
        })

        it("board has a points array", () => {
            expect(board.points.length).toBeTruthy()
        })

        it("points array is shuffled(slight chance shuffle may return in order)", () => {
            let values = board.values()
            let orderedArr = Array.prototype.range(size.elemCount)
            expect(values).not.toEqual(orderedArr)
        })

        it("sets indexes of points", () => {
            let indexes = []
            for (let i = 0; i < board.length; i++) {
                indexes.push(board.points[i].index)
            }
            let ordered = Array.prototype.range(indexes.length)
            expect(indexes).toEqual(ordered)
        })

        it("points array is the same lenth as length property", () => {
            expect(board.points.length).toEqual(size.elemCount)
        })

        it("creates a subsequent integers board", () => {
            let points = board.values().sortNumbers()
            let ordered = Array.prototype.range(points.length)
            expect(points).toEqual(ordered)
        })

        it("create few unique board", () => {
            let secondBoard = new Boards.Board(size, Boards.Shuffle.Ordered,
                                               Boards.ValueType.FewUnique)
            expect(secondBoard.distribution()).toEqual({
                0: 4,
                4: 4,
                8: 4,
                12: 4,
                16: 4,
            })
        })

        it("creates a random numbers board", () => {
            let secondBoard = new Boards.Board(size, Boards.Shuffle.Ordered,
                                               Boards.ValueType.Random)
            let values = secondBoard.values()
            expect(values).not.toEqual(Array.prototype.range(secondBoard.length))
        })

        it("creates a random sort board(shuffle is slightly problematic to test)", () => {
            let values = board.values()
            let ordered = Array.prototype.range(values.length)
            expect(values).not.toEqual(ordered)
            // I don't know what this value should be. but this seems okay
            expect(board.differenceFromOrdered()).toBeGreaterThan(90)
            expect(board.differenceFromOrdered()).toBeLessThan(160)
        })

        it("creates a mostly sorted board", () => {
            let secondBoard = new Boards.Board(size, Boards.Shuffle.MostlySorted,
                                               Boards.ValueType.Integers)
            expect(secondBoard.differenceFromOrdered()).toBeLessThan(60)
            expect(secondBoard.differenceFromOrdered()).toBeGreaterThan(1)
        })

        it("creates a sorted board", () => {
            let secondBoard = new Boards.Board(size, Boards.Shuffle.Ordered,
                                               Boards.ValueType.Integers)
            let values = secondBoard.values()
            expect(values).toEqual(Array.prototype.range(secondBoard.length))
        })

        it("creates a reversed board", () => {
            let secondBoard = new Boards.Board(size, Boards.Shuffle.Reversed,
                                               Boards.ValueType.Integers)
            expect(secondBoard.differenceFromOrdered()).toEqual(200)
        })

        it("creates a mostly reversed board", () => {
            let secondBoard = new Boards.Board(size,
                                               Boards.Shuffle.MostlyReversed,
                                               Boards.ValueType.Integers)
           expect(secondBoard.differenceFromOrdered()).toBeGreaterThan(160)
           expect(secondBoard.values).not.toEqual(
               Array.prototype.range(secondBoard.length).reverse()
           )
        })
    })

    describe("utils", function () {
        beforeEach(function() {
            size = Sizes.large
            board = new Boards.Board(size)
        });

        it("can ask board for point", () => {
            expect(board.get(0)).toEqual(board.points[0])
        })

        it("sets points to an array", () => {
            let newArr = []
            for (var i = 0; i < board.length; i++) {
                newArr.push(20)
            }
            expect(board.values()).not.toEqual(newArr)
            board.setPoints(newArr)
            expect(board.values()).toEqual(newArr)
        })

        it("retrieves values", () => {
            let values = board.values()
            values.sortNumbers()
            let arr = Array.prototype.range(size.elemCount)
            expect(values).toEqual(arr)
        })

        it("can request board min", () => {
            expect(board.min()).toEqual(0)
            let newArr = []
            for (var i = 0; i < board.length; i++) {
                newArr.push(20)
            }
            board.setPoints(newArr)
            expect(board.min()).toEqual(20)
        })

        it("can request board max", () => {
            expect(board.max()).toEqual(board.length - 1)
            let newArr = []
            for (var i = 0; i < board.length; i++) {
                newArr.push(20)
            }
            board.setPoints(newArr)
            expect(board.max()).toEqual(20)
        })

        describe("createValues", function () {
            it("changes values on the board", () => {
                let values = board.values().sortNumbers()
                let newArr = []
                for (var i = 0; i < values.length; i++) {
                    newArr.push(20)
                }
                board.setPoints(newArr)
                let newValues = board.values().sortNumbers()
                expect(values).not.toEqual(newValues)
                board.createValues()
                newValues = board.values().sortNumbers()
                expect(values).toEqual(newValues)
            })

            it("createValues a subsequent integers board", () => {
                board.createValues()
                let values = board.values().sortNumbers()
                let range = Array.prototype.range(values.length)
                expect(values).toEqual(range)
            })

            it("createValues few unique board", () => {
                board.valueType = Boards.ValueType.FewUnique
                board.createValues()
                expect(board.distribution()).toEqual({
                    0: 4,
                    4: 4,
                    8: 4,
                    12: 4,
                    16: 4,
                })
            })

            it("createValues a random board", () => {
                board.valueType = Boards.ValueType.Random
                board.createValues()
                let values = board.values()
                expect(values).not.toEqual(Array.prototype.range(board.length))
            })
        })

        describe("shuffle", function () {
            it("can shuffle the board", () => {
                let values = board.values()
                board.shuffleBoard()
                let newValues = board.values()
                expect(values).not.toEqual(newValues)
            })

            it("shuffles the same board", () => {
                let values = board.values()
                board.shuffleBoard()
                let newValues = board.values()
                expect(values.sortNumbers()).toEqual(newValues.sortNumbers())

                values = []
                for (let i = 0; i < newValues.length; i++) {
                    values.push(i * 5)
                }
                board.setPoints(values)
                board.shuffleBoard()
                newValues = board.values()
                expect(values).not.toEqual(newValues)
                expect(values.sortNumbers()).toEqual(newValues.sortNumbers())
            })

            it("shuffles to a mostly sorted board", () => {
                board.shuffleType = Boards.Shuffle.MostlySorted
                board.shuffleBoard()
                expect(board.differenceFromOrdered()).toBeLessThan(60)
                expect(board.differenceFromOrdered()).toBeGreaterThan(1)
            })

            it("shuffles to a sorted board", () => {
                board.shuffleType = Boards.Shuffle.Ordered
                board.shuffleBoard()
                expect(board.differenceFromOrdered()).toEqual(0)
            })

            it("shuffles to a reversed board", () => {
                board.shuffleType = Boards.Shuffle.Reversed
                board.shuffleBoard()
                expect(board.differenceFromOrdered()).toEqual(200)
            })

            it("shuffles to a mostly reversed board", () => {
                board.shuffleType = Boards.Shuffle.MostlyReversed
                board.shuffleBoard()
                expect(board.differenceFromOrdered()).toBeGreaterThan(160)
                expect(board.values).not.toEqual(
                    Array.prototype.range(board.length).reverse()
                )
            })

            it("shuffles to random", () => {
                board.shuffleBoard()
                // I don't know what this value should be. but this seems okay
                expect(board.differenceFromOrdered()).toBeGreaterThan(90)
            })
        })

        describe("board size", function () {
            it("can change size of board", () => {
                newSize = Sizes.xLarge
                board.setSize(newSize)
                expect(board.length).toEqual(newSize.elemCount)
                expect(board.points.length).toEqual(newSize.elemCount)
            })

            it("replaces the points array with 0s", () => {
                newSize = Sizes.xLarge
                board.setSize(newSize)
                let expected = []
                for (let i = 0; i < newSize.elemCount; i++) {
                    expected.push(0)
                }
                expect(board.values()).toEqual(expected)
            })
        })
    })
});
