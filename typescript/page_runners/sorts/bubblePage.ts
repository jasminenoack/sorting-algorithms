import * as Sizes from '../../sizes'
import * as Shuffles from '../../shuffles'
import * as Index from '../../index'
import * as ValueTypes from '../../valueTypes'
import * as Sorts from '../../sorts/sorts'
import * as Boards from '../../board'

const Bubble = Sorts.BubbleNonOptimized
const BubbleShortCircuit = Sorts.Bubble
const BubbleSkipLast = Sorts.BubbleSkipNoShortCircuit
const BubbleFullyOptimized = Sorts.BubbleSkipsSorted

const boxHeight = 200
const boxWidth = 200
const delay = 100
const delayOnComplete = 2000

namespace SimpleBubbleElement {
    const simpleBubbleElement = document.getElementById('bubble-example');
    const boardList: any[] = []
    const size = Sizes._25
    const valueType = ValueTypes.Integer
    const shuffle = Shuffles.RandomShuffle
    const board = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.None)
    const sort = new Bubble(board)
    boardList.push({
        board: board,
        sort: sort
    })

    Index.createBoard(
        boardList.length - 1, (sort.constructor as any), boardList, 
        boxHeight, boxWidth, simpleBubbleElement
    )
    Index.autoRunBoards(boardList, boxHeight, boxWidth, simpleBubbleElement, delay, delayOnComplete)
}
    
namespace BubbleOptimizations {
    const OptimizationsElement = document.getElementById('bubble-optimizations');
    const size = Sizes._25
    const valueType = ValueTypes.Integer
    const shuffle = Shuffles.RandomShuffle
    const board1 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort1 = new Bubble(board1)
    const board2 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort2 = new BubbleShortCircuit(board2)
    const board3 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort3 = new BubbleSkipLast(board3)
    const board4 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort4 = new BubbleFullyOptimized(board4)
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
            boxHeight, boxWidth, OptimizationsElement
        )
    })
    
    Index.autoRunBoards(boardList, boxHeight, boxWidth, OptimizationsElement, delay, delayOnComplete)
    Index.manageAutoRunCharts(boardList, 1000, 'optimize-chart')
}

namespace BubbleShuffles {
    const ShufflesElement = document.getElementById('bubble-shuffles');
    const size = Sizes._25
    const valueType = ValueTypes.Integer
    const board1 = new Boards.Board(size, Shuffles.OrderedShuffle, valueType, Boards.Verbosity.Info)
    const sort1 = new Sorts.BubbleSkipsSorted(board1)
    const board2 = new Boards.Board(size, Shuffles.K1Shuffle, valueType, Boards.Verbosity.Info)
    const sort2 = new Sorts.BubbleSkipsSorted(board2)
    const board3 = new Boards.Board(size, Shuffles.RandomShuffle, valueType, Boards.Verbosity.Info)
    const sort3 = new Sorts.BubbleSkipsSorted(board3)
    const board4 = new Boards.Board(size, Shuffles.ReversedShuffle, valueType, Boards.Verbosity.Info)
    const sort4 = new Sorts.BubbleSkipsSorted(board4)
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
            boxHeight, boxWidth, ShufflesElement
        )
    })

    Index.autoRunBoards(boardList, boxHeight, boxWidth, ShufflesElement, delay, delayOnComplete)
    Index.manageAutoRunCharts(boardList, 1000, 'shuffle-chart')
}

namespace BubbleConCur {
    const ConcurElement = document.getElementById('bubble-concur');
    const size = Sizes._25
    const shuffle = Shuffles.RandomShuffle
    const valueType = ValueTypes.Integer
    const board1 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort1 = new Sorts.BubbleSortConcurrent(board1)
    const board2 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort2 = new Sorts.BubbleSortConcurrent5(board2)
    const board3 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort3 = new Sorts.BubbleSortConcurrent10(board3)
    const board4 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort4 = new Sorts.OddEvenConcurrent(board4)
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
            boxHeight, boxWidth, ConcurElement
        )
    })

    Index.autoRunBoards(boardList, boxHeight, boxWidth, ConcurElement, delay, delayOnComplete)
    Index.manageAutoRunCharts(boardList, 1000, 'concur-chart')
}

namespace BubbleDontRestart {
    const RestartElement = document.getElementById('bubble-dont-restart');
    const size = Sizes._25
    const shuffle = Shuffles.RandomShuffle
    const valueType = ValueTypes.Integer
    const board1 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort1 = new BubbleFullyOptimized(board1)
    const board2 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort2 = new Sorts.BubbleSortDontRestart(board2)
    const board3 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort3 = new Sorts.Gnome(board3)
    const board4 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort4 = new Sorts.Cocktail(board4)
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
            boxHeight, boxWidth, RestartElement
        )
    })

    Index.autoRunBoards(boardList, boxHeight, boxWidth, RestartElement, delay, delayOnComplete)
    Index.manageAutoRunCharts(boardList, 1000, 'restart-chart')
}
