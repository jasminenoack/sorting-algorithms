namespace Boards {
    export enum ValueType {Integers, FewUnique, Random}

    export class Board {
        points: Points.Point[] = [];
        size: Sizes.Size;
        length: number;
        constructor(
            size, public shuffle: Shuffles.Shuffle = new Shuffles.RandomShuffle(),
            public valueType: ValueType = ValueType.Integers
        ) {
            this.setSize(size)
            this.createValues()
            this.shuffleBoard()
        }
        createValues() {
            let values = []
            if (this.valueType === ValueType.FewUnique) {
                let numberPerSection = this.length / 5
                for (let i = 0; i < this.length; i ++) {
                    values.push(
                        Math.floor(i / numberPerSection) * numberPerSection
                    )
                }
            } else if (this.valueType === ValueType.Random) {
                for (let i = 0; i < this.length; i++) {
                    values.push(Math.floor(Math.random() * this.length))
                }
            } else {
                values = Array.prototype.range(this.length)
            }
            this.setPoints(values)

        }
        shuffleBoard() {
            let values = this.values()
            this.shuffle.shuffle(values)
            this.setPoints(values)
        }
        setPoints(values) {
            let that = this
            values.forEach(function(value, index) {
                that.points[index].value = value
            })
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
            return Math.min(...this.values())
        }
        max() {
            return Math.max(...this.values())
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
}
