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
    const valueType = new ValueTypes.Integer()
    const shuffle = Shuffles.RandomShuffle
    const board = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.None)
    const sort = new Sorts.Cycle(board)
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
    const valueType = new ValueTypes.Integer()
    const shuffle = Shuffles.RandomShuffle
    const board = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort = new Sorts.Cycle(board)
    const board1 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    const sort1 = new Sorts.CycleOptimized(board1)
    boardList.push(
        {
            board: board,
            sort: sort
        },
        {
            board: board1,
            sort: sort1
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
