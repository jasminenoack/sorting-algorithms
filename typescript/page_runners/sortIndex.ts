import * as Sizes from '../sizes'
import * as Shuffles from '../shuffles'
import * as Index from '../index'
import * as ValueTypes from '../valueTypes'
import * as Sorts from '../sorts/sorts'
import * as Boards from '../board'

namespace SortIndex {
    const ReverseElement = document.getElementById('reverse-sorts');
    const boxHeight = 500
    const boxWidth = 500
    // const delay = 100
    // const delayOnComplete = 2000
    // const size = Sizes._25
    // const valueType = new ValueTypes.Integer()
    // const shuffle = new Shuffles.RandomShuffle()
    // const board1 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    // const sort1 = new Bubble(board1)
    // const board2 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    // const sort2 = new BubbleShortCircuit(board2)
    // const board3 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    // const sort3 = new BubbleSkipLast(board3)
    // const board4 = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.Info)
    // const sort4 = new BubbleFullyOptimized(board4)
    // const boardList: any[] = [
    //     {
    //         board: board1,
    //         sort: sort1
    //     },
    //     {
    //         board: board2,
    //         sort: sort2
    //     },
    //     {
    //         board: board3,
    //         sort: sort3
    //     },
    //     {
    //         board: board4,
    //         sort: sort4
    //     }
    // ]

    // boardList.forEach((board, index) => {
    //     Index.createBoard(
    //         index, (board.sort.constructor as any), boardList,
    //         boxHeight, boxWidth, OptimizationsElement
    //     )
    // })

    // Index.autoRunBoards(boardList, boxHeight, boxWidth, OptimizationsElement, delay, delayOnComplete)
    // Index.manageAutoRunCharts(boardList, 1000, 'optimize-chart')
}
