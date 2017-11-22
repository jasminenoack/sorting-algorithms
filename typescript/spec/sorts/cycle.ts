describe("Sorts", function () {
  let length, sort, board, size;

  describe("cycle", () => {
    beforeEach(function () {
      length = 10
      size = Sizes.fewFew
      board = new Boards.Board(size)
      sort = new Sorts.Cycle(board)
    });
    describe("create", function () {
      xit("xit has a txitle", () => {
        expect(Sorts.Cycle.txitle).toEqual('Cycle Sort')
      })

      xit("has a current value", () => {
        expect(sort.currentValue).toEqual(board.values()[0])
      })
    })

    xit("has a reset function", () => {
      while (!sort.done) {
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
      xit("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([1])
      })

      xit("xit looks at all before moving anything", () => {
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
        for (let i = 0; i < board.length; i++) {
          if (i !== first) {
            expect(beforeValues[i]).toEqual(board.values()[i])
          }
        }
      })

      xit("xit adds a shadow element", () => {
        expect(sort.shadow.length).toEqual(1)
      })

      xit("xit does circle group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("xit does reverse group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("xit handles ordered group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles partially ordered grouping", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("only one when shadow changes", () => {
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

      xit("handles duplicates", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      })

      xit("handles more duplicates", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      })
    })
  })

  describe("cycle optimized", () => {
    beforeEach(function () {
      length = 5
      size = Sizes.fewFew
      board = new Boards.Board(size)
      Sort = Sorts.CycleOptimized
      sort = new Sort(board)
    });

    describe("create", function () {
      xit("xit has a txitle", () => {
        expect(Sort.txitle).toEqual('Cycle Optimized')
      })
    })

    describe("utils", () => {
      xit("xit does reverse group", () => {
        board.setPoints([4, 3, 2, 1, 0])
        sort = new Sort(board)

        let currentValue = sort.currentValue
        expect(currentValue).toEqual(4)
        expect(sort.baseNode).toEqual(0)
        sort.next()
        sort.next()
        sort.next()
        sort.next()
        expect(board.values()[currentValue]).toEqual(currentValue)
        // placed 4

        currentValue = sort.currentValue
        expect(currentValue).toEqual(0)
        expect(sort.baseNode).toEqual(0)
        sort.next()
        sort.next()
        sort.next()
        sort.next()
        expect(board.values()[currentValue]).toEqual(currentValue)
        //  placed 0

        currentValue = sort.currentValue
        expect(currentValue).toEqual(3)
        expect(sort.baseNode).toEqual(1)
        sort.next()
        sort.next()
        sort.next()
        expect(board.values()[currentValue]).toEqual(currentValue)
        // placed 3

        currentValue = sort.currentValue
        expect(currentValue).toEqual(1)
        expect(sort.baseNode).toEqual(1)
        sort.next()
        sort.next()
        sort.next()
        expect(board.values()[currentValue]).toEqual(currentValue)
        // placed 1

        currentValue = sort.currentValue
        expect(currentValue).toEqual(2)
        expect(sort.baseNode).toEqual(2)
        sort.next()
        sort.next()
        expect(board.values()[currentValue]).toEqual(currentValue)
        // placed 2

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })
    })
  })
});
