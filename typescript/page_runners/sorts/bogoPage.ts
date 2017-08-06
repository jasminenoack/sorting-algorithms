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
    const sort = new Sorts.Bogo(board)
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

namespace Bozo {
    const element = document.getElementById('bozo');
    const boardList: any[] = []
    const size = Sizes._25
    const valueType = new ValueTypes.Integer()
    const shuffle = new Shuffles.RandomShuffle()
    const board = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.None)
    const sort = new Sorts.BogoSingle(board)
    boardList.push({
        board: board,
        sort: sort
    })

    Index.createBoard(
        boardList.length - 1, (sort.constructor as any), boardList,
        boxHeight, boxWidth, element
    )
    Index.autoRunBoards(boardList, boxHeight, boxWidth, element, delay, delayOnComplete)
}

namespace Permutation {
    const element = document.getElementById('permutation');
    const boardList: any[] = []
    const size = Sizes._25
    const valueType = new ValueTypes.Integer()
    const shuffle = new Shuffles.RandomShuffle()
    const board = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.None)
    const sort = new Sorts.Permutation(board)
    boardList.push({
        board: board,
        sort: sort
    })

    Index.createBoard(
        boardList.length - 1, (sort.constructor as any), boardList,
        boxHeight, boxWidth, element
    )
    Index.autoRunBoards(boardList, boxHeight, boxWidth, element, delay, delayOnComplete)
}

namespace Smart {
    const element = document.getElementById('smart-bozo');
    const boardList: any[] = []
    const size = Sizes._25
    const valueType = new ValueTypes.Integer()
    const shuffle = new Shuffles.RandomShuffle()
    const board = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.None)
    const sort = new Sorts.BogoSingleCompare(board)
    boardList.push({
        board: board,
        sort: sort
    })

    Index.createBoard(
        boardList.length - 1, (sort.constructor as any), boardList,
        boxHeight, boxWidth, element
    )
    Index.autoRunBoards(boardList, boxHeight, boxWidth, element, delay, delayOnComplete)
}

namespace Bogobogo {
    const element = document.getElementById('bogobogo');
    const boardList: any[] = []
    const size = Sizes._25
    const valueType = new ValueTypes.Integer()
    const shuffle = new Shuffles.RandomShuffle()
    const board = new Boards.Board(size, shuffle, valueType, Boards.Verbosity.None)
    const sort = new Sorts.Bogobogo(board)
    boardList.push({
        board: board,
        sort: sort
    })

    Index.createBoard(
        boardList.length - 1, (sort.constructor as any), boardList,
        boxHeight, boxWidth, element
    )
    Index.autoRunBoards(boardList, boxHeight, boxWidth, element, delay, delayOnComplete)
}