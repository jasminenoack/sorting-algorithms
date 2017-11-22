describe("Quick Sort", function () {
  let length, sort, board, size;
  describe("quick 2 left partxition", () => {
    beforeEach(function () {
      length = 5
      size = Sizes.fewFew
      board = new Boards.Board(size)
      Sort = Sorts.QuickSort2
      sort = new Sort(board)
    });

    describe("create", function () {
      xit("xit has a txitle", () => {
        expect(Sort.txitle).toEqual('Quick Sort(Left Partxition)')
      })

      xit("has a partxition", () => {
        expect(sort.partxition).not.toEqual(undefined)
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
      expect(sort.lower).toEqual(sort.baseNode)
      expect(sort.higher).toEqual(sort.baseNode)
      expect(sort.partxitionStart).toEqual(sort.baseNode)
      expect(sort.partxitionEnd).toEqual(sort.length - 1)
      expect(sort.partxition).toEqual(sort.lower)
      expect(sort.partxitionTop).toEqual(sort.partxition)
    })

    describe("utils", () => {

      xit("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([0])

        sort.lower = 1
        sort.partxition = 2
        sort.higher = 3
        expect(sort.currentNodes()).toEqual([1, 2, 3])

        sort.lower = 2
        expect(sort.currentNodes()).toEqual([2, 3])

        sort.lower = 1
        sort.higher = 2
        expect(sort.currentNodes()).toEqual([1, 2])
      })

      xit("xit handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4])
        sort = new Sort(board)

        sort.partxition = 0

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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a random group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a swaping first group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a swaping last group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("xit does reverse group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("xit handles first and last swapped", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles partially ordered grouping", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles duplicates", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      })

      xit("handles more duplicates", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      })
    })
  })

  describe("quick 2 right partxition", () => {
    beforeEach(function () {
      length = 5
      size = Sizes.fewFew
      board = new Boards.Board(size)
      Sort = Sorts.QuickSort2RightPartxition
      sort = new Sort(board)
    });

    describe("create", function () {
      xit("xit has a txitle", () => {
        expect(Sort.txitle).toEqual('Quick Sort(Right Partxition)')
      })

      xit("has a partxition", () => {
        expect(sort.partxition).not.toEqual(undefined)
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
      expect(sort.lower).toEqual(sort.baseNode)
      expect(sort.higher).toEqual(sort.baseNode)
      expect(sort.partxitionStart).toEqual(sort.baseNode)
      expect(sort.partxitionEnd).toEqual(sort.length - 1)
      expect(sort.partxition).toEqual(sort.lower)
      expect(sort.partxitionTop).toEqual(sort.partxition)
    })

    describe("utils", () => {

      xit("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([0])

        sort.lower = 1
        sort.partxition = 2
        sort.higher = 3
        expect(sort.currentNodes()).toEqual([1, 2, 3])

        sort.lower = 2
        expect(sort.currentNodes()).toEqual([2, 3])

        sort.lower = 1
        sort.higher = 2
        expect(sort.currentNodes()).toEqual([1, 2])
      })

      xit("xit handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4])
        sort = new Sort(board)

        sort.partxition = 0

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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a random group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })
    })
  })

  describe("quick 3 left partxition", () => {
    beforeEach(function () {
      length = 5
      size = Sizes.fewFew
      board = new Boards.Board(size)
      Sort = Sorts.QuickSort3
      sort = new Sort(board)
    });

    describe("create", function () {
      xit("xit has a txitle", () => {
        expect(Sort.txitle).toEqual('Quick Sort 3(Left Partxition)')
      })

      xit("has a partxition", () => {
        expect(sort.partxition).not.toEqual(undefined)
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
      expect(sort.lower).toEqual(sort.baseNode)
      expect(sort.higher).toEqual(sort.baseNode)
      expect(sort.partxitionStart).toEqual(sort.baseNode)
      expect(sort.partxitionEnd).toEqual(sort.length - 1)
      expect(sort.partxition).toEqual(sort.lower)
      expect(sort.partxitionTop).toEqual(sort.partxition)
    })

    describe("utils", () => {

      xit("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([0])

        sort.lower = 1
        sort.partxition = 2
        sort.higher = 3
        expect(sort.currentNodes()).toEqual([1, 2, 3])

        sort.lower = 2
        expect(sort.currentNodes()).toEqual([2, 3])

        sort.lower = 1
        sort.higher = 2
        expect(sort.currentNodes()).toEqual([1, 2])
      })

      xit("xit handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4])
        sort = new Sort(board)

        sort.partxition = 0

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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })


      xit("handles a random group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a swaping first group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a swaping last group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("xit does reverse group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("xit handles first and last swapped", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles partially ordered grouping", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles duplicates", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      })

      xit("handles more duplicates", () => {
        let values = [1, 2, 1, 2, 1]
        board.setPoints(values)
        sort = new Sort(board)

        expect(sort.next()).toEqual([])
        expect(sort.next()).toEqual([0, 1, 2])
        expect(sort.next()).toEqual([])
        expect(sort.next()).toEqual([0, 1, 2, 3, 4])

        expect(sort.next()).toEqual([2, 3, 4])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      })
    })
  })
});
