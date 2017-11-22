describe("Sorts", function () {
  let length, sort, board, size;
  describe("smooth first attempt", () => {
    beforeEach(function () {
      length = 10
      size = Sizes.xXLarge
      board = new Boards.Board(size)
      Sort = Sorts.Smooth
      sort = new Sort(board)
    });

    describe("create", function () {
      xit("xit has a txitle", () => {
        expect(Sort.txitle).toEqual('Smooth Sort')
      })

      xit("has leonardoNumbers", function () {
        expect(sort.leonardoNumbers).toEqual([1, 1, 3, 5, 9])
      })

      xit("has tree sizes", function () {
        expect(sort.treeSizes).toEqual([1, 1, 3, 1, 5, 1, 1, 3, 9, 1])
      })

      xit("has nodes to heap", function () {
        expect(sort.nodesToHeap).toEqual([2, 4, 7, 8])
      })

      xit("has roots", function () {
        expect(sort.roots).toEqual([8, 9])
      })

      xit("has roots to compare", function () {
        expect(sort.rootsToCompare).toEqual([8, 9])
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
    })

    describe("utils", () => {

      xit("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([2])
      })

      xit("xit handles ordered group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("xit does reverse group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("test random large set", () => {
        size = {
          elemCount: 30,
          label: 30
        }
        board.setSize(size)
        board.setPoints([
          15, 26, 16, 29, 6,
          24, 2, 25, 27, 19,
          28, 9, 7, 13, 4,
          8, 12, 10, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        sort = new Sort(board)
        expect(sort.leonardoNumbers).toEqual([1, 1, 3, 5, 9, 15, 25])
        expect(sort.treeSizes).toEqual([
          1, 1, 3, 1, 5,
          1, 1, 3, 9, 1,
          1, 3, 1, 5, 15,
          1, 1, 3, 1, 5,
          1, 1, 3, 9, 25,
          1, 1, 3, 1, 5
        ])
        expect(sort.nodesToHeap).toEqual([
          2, 4,
          7, 8,
          11, 13, 14,
          17, 19,
          22, 23, 24,
          27, 29
        ])
        expect(sort.roots).toEqual([24, 29])
        expect(sort.rootsToCompare).toEqual([24, 29])

        // heapify 2
        expect(sort.next()).toEqual([2, 1])
        expect(board.values()).toEqual([
          15, 16, 26, 29, 6,
          24, 2, 25, 27, 19,
          28, 9, 7, 13, 4,
          8, 12, 10, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        // heapify 4
        expect(sort.next()).toEqual([4, 3])
        expect(board.values()).toEqual([
          15, 16, 26, 6, 29,
          24, 2, 25, 27, 19,
          28, 9, 7, 13, 4,
          8, 12, 10, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        // heapify 7
        expect(sort.next()).toEqual([7])
        expect(board.values()).toEqual([
          15, 16, 26, 6, 29,
          24, 2, 25, 27, 19,
          28, 9, 7, 13, 4,
          8, 12, 10, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        // heapify 8
        expect(sort.next()).toEqual([8, 4])
        expect(board.values()).toEqual([
          15, 16, 26, 6, 27,
          24, 2, 25, 29, 19,
          28, 9, 7, 13, 4,
          8, 12, 10, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        expect(sort.next()).toEqual([4])
        expect(board.values()).toEqual([
          15, 16, 26, 6, 27,
          24, 2, 25, 29, 19,
          28, 9, 7, 13, 4,
          8, 12, 10, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        // heapify 11
        expect(sort.next()).toEqual([11, 10])
        expect(board.values()).toEqual([
          15, 16, 26, 6, 27,
          24, 2, 25, 29, 19,
          9, 28, 7, 13, 4,
          8, 12, 10, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        // heapify 13
        expect(sort.next()).toEqual([13, 11])
        expect(board.values()).toEqual([
          15, 16, 26, 6, 27,
          24, 2, 25, 29, 19,
          9, 13, 7, 28, 4,
          8, 12, 10, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        expect(sort.next()).toEqual([11, 9])
        expect(board.values()).toEqual([
          15, 16, 26, 6, 27,
          24, 2, 25, 29, 13,
          9, 19, 7, 28, 4,
          8, 12, 10, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        // heapify 14
        expect(sort.next()).toEqual([14, 8])
        expect(board.values()).toEqual([
          15, 16, 26, 6, 27,
          24, 2, 25, 4, 13,
          9, 19, 7, 28, 29,
          8, 12, 10, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        expect(sort.next()).toEqual([8, 4])
        expect(board.values()).toEqual([
          15, 16, 26, 6, 4,
          24, 2, 25, 27, 13,
          9, 19, 7, 28, 29,
          8, 12, 10, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        expect(sort.next()).toEqual([4, 2])
        expect(board.values()).toEqual([
          15, 16, 4, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 28, 29,
          8, 12, 10, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        expect(sort.next()).toEqual([2, 1])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 28, 29,
          8, 12, 10, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        // heapify 17
        expect(sort.next()).toEqual([17, 16])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 28, 29,
          8, 10, 12, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        // heapify 19
        expect(sort.next()).toEqual([19])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 28, 29,
          8, 10, 12, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        // heapify 22
        expect(sort.next()).toEqual([22])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 28, 29,
          8, 10, 12, 14, 17,
          5, 0, 20, 18, 23,
          22, 3, 11, 1, 21
        ])
        // heapify 23
        expect(sort.next()).toEqual([23, 22])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 28, 29,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 23,
          22, 3, 11, 1, 21
        ])
        expect(sort.next()).toEqual([22])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 28, 29,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 23,
          22, 3, 11, 1, 21
        ])
        // heapify 24
        expect(sort.next()).toEqual([24, 14])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 28, 23,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 29,
          22, 3, 11, 1, 21
        ])
        expect(sort.next()).toEqual([14, 13])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 23, 28,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 29,
          22, 3, 11, 1, 21
        ])
        expect(sort.next()).toEqual([13])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 23, 28,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 29,
          22, 3, 11, 1, 21
        ])
        // heapify 27
        expect(sort.next()).toEqual([27, 25])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 23, 28,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 29,
          11, 3, 22, 1, 21
        ])
        // heapify 29
        expect(sort.next()).toEqual([29, 27])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 23, 28,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 29,
          11, 3, 21, 1, 22
        ])
        expect(sort.next()).toEqual([27])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 23, 28,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 29,
          11, 3, 21, 1, 22
        ])

        // compare roots
        expect(sort.next()).toEqual([24, 29])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 23, 28,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 22,
          11, 3, 21, 1, 29
        ])
        expect(sort.next()).toEqual([24, 14])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 27, 13,
          9, 19, 7, 23, 22,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 28,
          11, 3, 21, 1, 29
        ])
        expect(sort.next()).toEqual([14, 8])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 26,
          24, 2, 25, 22, 13,
          9, 19, 7, 23, 27,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 28,
          11, 3, 21, 1, 29
        ])
        expect(sort.next()).toEqual([8, 4])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          24, 2, 25, 26, 13,
          9, 19, 7, 23, 27,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 28,
          11, 3, 21, 1, 29
        ])
        expect(sort.next()).toEqual([4])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          24, 2, 25, 26, 13,
          9, 19, 7, 23, 27,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 28,
          11, 3, 21, 1, 29
        ])

        // remove node
        expect(sort.next()).toEqual([29])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          24, 2, 25, 26, 13,
          9, 19, 7, 23, 27,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 28,
          11, 3, 21, 1, 29
        ])
        expect(sort.placed).toEqual([29])

        // compare roots
        expect(sort.next()).toEqual([24, 27, 28])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          24, 2, 25, 26, 13,
          9, 19, 7, 23, 27,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 1,
          11, 3, 21, 28, 29
        ])
        expect(sort.next()).toEqual([24, 14])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          24, 2, 25, 26, 13,
          9, 19, 7, 23, 1,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 27,
          11, 3, 21, 28, 29
        ])
        expect(sort.next()).toEqual([14, 8])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          24, 2, 25, 1, 13,
          9, 19, 7, 23, 26,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 27,
          11, 3, 21, 28, 29
        ])
        expect(sort.next()).toEqual([8, 7])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          24, 2, 1, 25, 13,
          9, 19, 7, 23, 26,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 27,
          11, 3, 21, 28, 29
        ])
        expect(sort.next()).toEqual([7, 5])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          1, 2, 24, 25, 13,
          9, 19, 7, 23, 26,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 27,
          11, 3, 21, 28, 29
        ])
        // compare remaining roots
        expect(sort.next()).toEqual([24, 27])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          1, 2, 24, 25, 13,
          9, 19, 7, 23, 26,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 21,
          11, 3, 27, 28, 29
        ])
        expect(sort.next()).toEqual([24, 14])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          1, 2, 24, 25, 13,
          9, 19, 7, 23, 21,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 26,
          11, 3, 27, 28, 29
        ])
        expect(sort.next()).toEqual([14, 8])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          1, 2, 24, 21, 13,
          9, 19, 7, 23, 25,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 26,
          11, 3, 27, 28, 29
        ])
        expect(sort.next()).toEqual([8, 7])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          1, 2, 21, 24, 13,
          9, 19, 7, 23, 25,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 26,
          11, 3, 27, 28, 29
        ])
        expect(sort.next()).toEqual([7])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          1, 2, 21, 24, 13,
          9, 19, 7, 23, 25,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 26,
          11, 3, 27, 28, 29
        ])
        // remove
        expect(sort.next()).toEqual([28])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          1, 2, 21, 24, 13,
          9, 19, 7, 23, 25,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 26,
          11, 3, 27, 28, 29
        ])
        expect(sort.next()).toEqual([27])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          1, 2, 21, 24, 13,
          9, 19, 7, 23, 25,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 26,
          11, 3, 27, 28, 29
        ])

        // compare nodes
        expect(sort.next()).toEqual([24, 25, 26])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          1, 2, 21, 24, 13,
          9, 19, 7, 23, 25,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 3,
          11, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([24, 14])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          1, 2, 21, 24, 13,
          9, 19, 7, 23, 3,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 25,
          11, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([14, 8])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 22,
          1, 2, 21, 3, 13,
          9, 19, 7, 23, 24,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 25,
          11, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([8, 4])
        expect(board.values()).toEqual([
          15, 4, 16, 6, 3,
          1, 2, 21, 22, 13,
          9, 19, 7, 23, 24,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 25,
          11, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([4, 2])
        expect(board.values()).toEqual([
          15, 4, 3, 6, 16,
          1, 2, 21, 22, 13,
          9, 19, 7, 23, 24,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 25,
          11, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([2, 0])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 21, 22, 13,
          9, 19, 7, 23, 24,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 25,
          11, 26, 27, 28, 29
        ])
        // finish compare
        expect(sort.next()).toEqual([24, 25])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 21, 22, 13,
          9, 19, 7, 23, 24,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 11,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([24, 14])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 21, 22, 13,
          9, 19, 7, 23, 11,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([14, 13])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 21, 22, 13,
          9, 19, 7, 11, 23,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([13, 11])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 21, 22, 13,
          9, 11, 7, 19, 23,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([11, 9])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 21, 22, 11,
          9, 13, 7, 19, 23,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 24,
          25, 26, 27, 28, 29
        ])
        // remove
        expect(sort.next()).toEqual([26])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 21, 22, 11,
          9, 13, 7, 19, 23,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([25])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 21, 22, 11,
          9, 13, 7, 19, 23,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([24])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 21, 22, 11,
          9, 13, 7, 19, 23,
          8, 10, 12, 14, 17,
          5, 0, 18, 20, 24,
          25, 26, 27, 28, 29
        ])

        // compare
        expect(sort.next()).toEqual([14, 23])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 21, 22, 11,
          9, 13, 7, 19, 20,
          8, 10, 12, 14, 17,
          5, 0, 18, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([14, 8])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 21, 20, 11,
          9, 13, 7, 19, 22,
          8, 10, 12, 14, 17,
          5, 0, 18, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([8, 7])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 20, 21, 11,
          9, 13, 7, 19, 22,
          8, 10, 12, 14, 17,
          5, 0, 18, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([7])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 20, 21, 11,
          9, 13, 7, 19, 22,
          8, 10, 12, 14, 17,
          5, 0, 18, 23, 24,
          25, 26, 27, 28, 29
        ])

        // remove
        expect(sort.next()).toEqual([23])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 20, 21, 11,
          9, 13, 7, 19, 22,
          8, 10, 12, 14, 17,
          5, 0, 18, 23, 24,
          25, 26, 27, 28, 29
        ])

        // compare
        expect(sort.next()).toEqual([14, 19, 22])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 20, 21, 11,
          9, 13, 7, 19, 18,
          8, 10, 12, 14, 17,
          5, 0, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([14, 8])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 20, 18, 11,
          9, 13, 7, 19, 21,
          8, 10, 12, 14, 17,
          5, 0, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([8, 7])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 18, 20, 11,
          9, 13, 7, 19, 21,
          8, 10, 12, 14, 17,
          5, 0, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([7])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 18, 20, 11,
          9, 13, 7, 19, 21,
          8, 10, 12, 14, 17,
          5, 0, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        // finish comparison
        expect(sort.next()).toEqual([14, 19])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 18, 20, 11,
          9, 13, 7, 19, 17,
          8, 10, 12, 14, 21,
          5, 0, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([14, 8])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 18, 17, 11,
          9, 13, 7, 19, 20,
          8, 10, 12, 14, 21,
          5, 0, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([8, 7])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 17, 18, 11,
          9, 13, 7, 19, 20,
          8, 10, 12, 14, 21,
          5, 0, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([7])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 17, 18, 11,
          9, 13, 7, 19, 20,
          8, 10, 12, 14, 21,
          5, 0, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        // remove
        expect(sort.next()).toEqual([22])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 17, 18, 11,
          9, 13, 7, 19, 20,
          8, 10, 12, 14, 21,
          5, 0, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.placed).toEqual([29, 28, 27, 26, 25, 24, 23, 22])

        // compare 4
        expect(sort.next()).toEqual([14, 19, 20, 21])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 17, 18, 11,
          9, 13, 7, 19, 20,
          8, 10, 12, 14, 0,
          5, 21, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([19, 18])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 17, 18, 11,
          9, 13, 7, 19, 20,
          8, 10, 12, 0, 14,
          5, 21, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        // compare 3
        expect(sort.next()).toEqual([14, 19, 20])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 17, 18, 11,
          9, 13, 7, 19, 5,
          8, 10, 12, 0, 14,
          20, 21, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([14, 13])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 17, 18, 11,
          9, 13, 7, 5, 19,
          8, 10, 12, 0, 14,
          20, 21, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([13, 11])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 17, 18, 11,
          9, 5, 7, 13, 19,
          8, 10, 12, 0, 14,
          20, 21, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([11, 9])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 17, 18, 5,
          9, 11, 7, 13, 19,
          8, 10, 12, 0, 14,
          20, 21, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        // compare 2
        expect(sort.next()).toEqual([14, 19])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 17, 18, 5,
          9, 11, 7, 13, 14,
          8, 10, 12, 0, 19,
          20, 21, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([14, 8])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 17, 14, 5,
          9, 11, 7, 13, 18,
          8, 10, 12, 0, 19,
          20, 21, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([8, 7])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 14, 17, 5,
          9, 11, 7, 13, 18,
          8, 10, 12, 0, 19,
          20, 21, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([7])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 14, 17, 5,
          9, 11, 7, 13, 18,
          8, 10, 12, 0, 19,
          20, 21, 22, 23, 24,
          25, 26, 27, 28, 29
        ])

        // remove
        expect(sort.next()).toEqual([21])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 14, 17, 5,
          9, 11, 7, 13, 18,
          8, 10, 12, 0, 19,
          20, 21, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([20])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 14, 17, 5,
          9, 11, 7, 13, 18,
          8, 10, 12, 0, 19,
          20, 21, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        expect(sort.next()).toEqual([19])
        expect(board.values()).toEqual([
          3, 4, 15, 6, 16,
          1, 2, 14, 17, 5,
          9, 11, 7, 13, 18,
          8, 10, 12, 0, 19,
          20, 21, 22, 23, 24,
          25, 26, 27, 28, 29
        ])
        // this doesn't do a full sort.
        // xit's here to fix a bug when you have more than 3 roots
      })
    })
  })

  describe("smooth setup up one at a time", () => {
    beforeEach(function () {
      length = 10
      size = Sizes.xXLarge
      board = new Boards.Board(size)
      Sort = Sorts.SmoothSetUpBottom
      sort = new Sort(board)
    });

    describe("create", function () {
      xit("xit has a txitle", () => {
        expect(Sort.txitle).toEqual('Smooth Sort(Set up from bottom)')
      })

      xit("has leonardoNumbers", function () {
        expect(sort.leonardoNumbers).toEqual([1, 1, 3, 5, 9])
      })

      xit("has tree sizes", function () {
        expect(sort.treeSizes).toEqual([1])
      })

      xit("has nodes to heap", function () {
        expect(sort.nodesToHeap).toEqual([])
      })

      xit("has roots", function () {
        expect(sort.roots).toEqual([0])
      })

      xit("has roots to compare", function () {
        expect(sort.rootsToCompare).toEqual([])
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
      expect(sort.baseNode).toEqual(1)
      expect(sort.comparisonNode).toEqual(1)
    })

    describe("utils", () => {
      xit("xit does reverse group", () => {
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
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })
    })
  })
});
