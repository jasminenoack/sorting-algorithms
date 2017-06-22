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

        xit("board size should be readonly", () => {
        })

        xit("board should have a length", () => {
        })

        xit("board has a points array", () => {
        })

        xit("points array is shuffled", () => {
        })

        xit("points array is the same lenth as length property", () => {
        })
    })

    describe("utils", function () {
        xit("can index into the board", () => {
        })

        describe("create", function () {
            xit("recreates the board", () => {
            })

            xit("creates a subsequent integers board", () => {
            })

            xit("create few unique board", () => {
            })

            xit("creates a random board", () => {
            })

            xit("creates a mostly sorted board", () => {
            })

            xit("creates a sorted board", () => {
            })

            xit("creates a reversed board", () => {
            })

            xit("creates a mostly reversed board", () => {
            })

            xit("uses the same board settings if not given", () => {
            })
        })

        describe("shuffle", function () {
            xit("can shuffle the board", () => {
            })

            xit("shuffles the same board", () => {
            })

            xit("replaces the points array with shuffled values", () => {
            })
        })

        describe("board size", function () {
            xit("can change size of board", () => {
            })

            xit("changing size changes the points array", () => {
            })

            xit("changing the size resets board size", () => {
            })

            xit("changing the size resets board length", () => {
            })
        })
    })
});
