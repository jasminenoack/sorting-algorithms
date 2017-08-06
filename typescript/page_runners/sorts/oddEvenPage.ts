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
    const shuffle = new Shuffles.RandomShuffle()
    const board = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.None)
    const sort = new Sorts.OddEvenConcurrent(board)
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