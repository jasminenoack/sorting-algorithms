import * as Points from './point'
import * as Shuffles from './shuffles'
import * as ValueTypes from './ValueTypes'
import * as Sizes from './sizes'

export class Board {
    points: Points.Point[] = [];
    size: Sizes.Size;
    length: number;
    private _min: number
    private _max: number
    constructor(
        size: Sizes.Size, public shuffle: Shuffles.Shuffle = new Shuffles.RandomShuffle(),
        public valueType: ValueTypes.ValueType = new ValueTypes.Integer()
    ) {
        this.setSize(size)
        this.createValues()
        this.shuffleBoard()
    }
    createValues() {
        let values = this.valueType.generate(this.length)
        this.setPoints(values)
        this._min = Math.min(...values)
        this._max = Math.max(...values)
    }
    shuffleBoard() {
        let values = this.values()
        this.shuffle.shuffle(values)
        this.setPoints(values)
    }
    setPoints(values) {
        let that = this
        values.forEach(function(value, index) {
            that.set(index, value)
        })
        this._min = Math.min(...values)
        this._max = Math.max(...values)
    }
    set(index, value) {
        this.points[index].value = value
    }
    swap(index1, index2) {
        let temp = this.get(index1)
        this.points[index1] = this.get(index2)
        this.points[index2] = temp
    }
    values() {
        let items = []
        for (let i = 0; i < this.length; i++) {
            items.push(this.points[i].value)
        }
        return items
    }
    setSize(size) {
        this.size = size
        this.length = this.size.elemCount
        this.points = []
        for (let i = 0; i < this.length; i++) {
            this.points.push(new Points.Point(i))
        }
    }
    get(index) {
        return this.points[index]
    }
    min() {
        return this._min
    }
    max() {
        return this._max
    }
    distribution() {
        let dist = {}
        let values = this.values()
        values.forEach((value) => {
            dist[value] = (dist[value] || 0) + 1
        })
        return dist
    }
}
