import * as Sizes from '../sizes'
import * as Shuffles from '../shuffles'
import * as Index from '../index'
import * as ValueTypes from '../valueTypes'
import * as Sorts from '../sorts/sorts'
import * as Boards from '../board'

namespace ReversedSorts {
    const ReverseElement = document.getElementById('reverse-sorts');
    const boxHeight = 200
    const boxWidth = 200
    const delay = 100
    const delayOnComplete = 100
    const size = Sizes._75
    const valueType = new ValueTypes.Integer()
    const shuffle = new Shuffles.ReversedShuffle()
    const board2 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort2 = new Sorts.Comb(board2)
    const board4 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort4 = new Sorts.Heap(board4)
    const board5 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort5 = new Sorts.OddEven(board5)
    const board7 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort7 = new Sorts.Smooth(board7)
    const boardList: any[] = [
        {
            board: board2,
            sort: sort2
        },
        {
            board: board4,
            sort: sort4
        },
        {
            board: board5,
            sort: sort5
        },
        {
            board: board7,
            sort: sort7
        }
    ]

    boardList.forEach((board, index) => {
        Index.createBoard(
            index, (board.sort.constructor as any), boardList,
            boxHeight, boxWidth, ReverseElement
        )
    })

    Index.autoRunBoards(
        boardList, boxHeight, boxWidth, ReverseElement, delay, delayOnComplete,
        (board) => {
            return (board.sort as any).steps < 200 && !(board.sort as any).done
        }
    )
}

namespace OrderedSorts {
    const OrderedElement = document.getElementById('ordered-sorts');
    const boxHeight = 200
    const boxWidth = 200
    const delay = 100
    const delayOnComplete = 100
    const size = Sizes._75
    const valueType = new ValueTypes.Integer()
    const shuffle = new Shuffles.OrderedShuffle()
    const board2 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort2 = new Sorts.Comb(board2)
    const board4 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort4 = new Sorts.Heap(board4)
    const board5 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort5 = new Sorts.OddEven(board5)
    const board7 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort7 = new Sorts.Smooth(board7)
    const boardList: any[] = [
        {
            board: board2,
            sort: sort2
        },
        {
            board: board4,
            sort: sort4
        },
        {
            board: board5,
            sort: sort5
        },
        {
            board: board7,
            sort: sort7
        }
    ]

    boardList.forEach((board, index) => {
        Index.createBoard(
            index, (board.sort.constructor as any), boardList,
            boxHeight, boxWidth, OrderedElement
        )
    })

    Index.autoRunBoards(
        boardList, boxHeight, boxWidth, OrderedElement, delay, delayOnComplete,
        (board) => {
            return (board.sort as any).steps < 200 && !(board.sort as any).done
        }
    )
}
