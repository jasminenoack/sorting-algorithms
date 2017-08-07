import * as Sizes from '../../sizes'
import * as Shuffles from '../../shuffles'
import * as Index from '../../index'
import * as ValueTypes from '../../valueTypes'
import * as Sorts from '../../sorts/sorts'
import * as Boards from '../../board'

const boxHeight = 200
const boxWidth = 200
const delay = 100
const delayOnComplete = 2000

namespace Example {
    const exampleElement = document.getElementById('example');
    const boardList: any[] = []
    const size = Sizes._25
    const valueType = ValueTypes.Integer
    const shuffle = Shuffles.RandomShuffle
    const board = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.None)
    const sort = new Sorts.Cocktail(board)
    boardList.push({
        board: board,
        sort: sort
    })

    Index.createBoard(
        boardList.length - 1, (sort.constructor as any), boardList,
        boxHeight, boxWidth, exampleElement
    )
    Index.autoRunBoards(boardList, boxHeight, boxWidth, exampleElement, delay, delayOnComplete)
}

namespace Optimized {
    const element = document.getElementById('optimized');
    const boardList: any[] = []
    const size = Sizes._25
    const valueType = ValueTypes.Integer
    const shuffle = Shuffles.RandomShuffle
    const board = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort = new Sorts.BubbleSkipNoShortCircuit(board)
    const board1 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort1 = new Sorts.BubbleSkipsSorted(board1)
    const board2 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort2 = new Sorts.Cocktail(board2)
    const board3 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort3 = new Sorts.CocktailShortCircuit(board3)
    boardList.push(
        {
            board: board,
            sort: sort
        },
        {
            board: board1,
            sort: sort1
        },
        {
            board: board2,
            sort: sort2
        },
        {
            board: board3,
            sort: sort3
        },
    )

    boardList.forEach((board, index) => {
        Index.createBoard(
            index, (board.sort.constructor as any), boardList,
            boxHeight, boxWidth, element
        )
    })
    Index.autoRunBoards(boardList, boxHeight, boxWidth, element, delay, delayOnComplete)
    Index.manageAutoRunCharts(boardList, 1000, 'optimize-chart')
}

namespace FirstLast {
    const exampleElement = document.getElementById('firstlast');
    const boardList: any[] = []
    const size = Sizes._25
    const valueType = ValueTypes.Integer
    const shuffle = Shuffles.FirstAndLastSwapped
    const board = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.None)
    const sort = new Sorts.CocktailShortCircuit(board)
    boardList.push({
        board: board,
        sort: sort
    })

    Index.createBoard(
        boardList.length - 1, (sort.constructor as any), boardList,
        boxHeight, boxWidth, exampleElement
    )
    Index.autoRunBoards(boardList, boxHeight, boxWidth, exampleElement, delay, delayOnComplete)
}

namespace Shuffle {
    const element = document.getElementById('order');
    const size = Sizes._25
    const valueType = ValueTypes.Integer
    const board1 = new Boards.Board(size, Shuffles.OrderedShuffle, valueType, Boards.Verbosity.Info)
    const sort1 = new Sorts.CocktailShortCircuit(board1)
    const board2 = new Boards.Board(size, Shuffles.FirstAndLastSwapped, valueType, Boards.Verbosity.Info)
    const sort2 = new Sorts.CocktailShortCircuit(board2)
    const board3 = new Boards.Board(size, Shuffles.RandomShuffle, valueType, Boards.Verbosity.Info)
    const sort3 = new Sorts.CocktailShortCircuit(board3)
    const board4 = new Boards.Board(size, Shuffles.ReversedShuffle, valueType, Boards.Verbosity.Info)
    const sort4 = new Sorts.CocktailShortCircuit(board4)
    const boardList: any[] = [
        {
            board: board1,
            sort: sort1
        },
        {
            board: board2,
            sort: sort2
        },
        {
            board: board3,
            sort: sort3
        },
        {
            board: board4,
            sort: sort4
        }
    ]

    boardList.forEach((board, index) => {
        Index.createBoard(
            index, (board.sort.constructor as any), boardList,
            boxHeight, boxWidth, element
        )
    })

    Index.autoRunBoards(boardList, boxHeight, boxWidth, element, delay, delayOnComplete)
    Index.manageAutoRunCharts(boardList, 1000, 'order-chart')
}
