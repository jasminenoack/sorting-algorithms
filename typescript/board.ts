namespace Boards {
    export enum Shuffle {Random, Ordered, Reversed, MostlySorted, MostlyReversed}

    export enum ValueType {Integers, FewUnique, Random}

    export class Board {
        points: Points.Point[] = [];
        size: Sizes.Size;
        length: number;
        constructor(
            size, public shuffleType: Shuffle = Shuffle.Random,
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
            values.sortNumbers()
            if (this.shuffleType === Shuffle.MostlySorted) {
                this.shuffleToMostlySorted(values)
            }
            if (this.shuffleType === Shuffle.Random) {
                values.shuffle()
            }
            if (
                this.shuffleType === Shuffle.Reversed ||
                this.shuffleType === Shuffle.MostlyReversed
            ) {
                values.reverse()
            }
            this.setPoints(values)
        }
        shuffleToMostlySorted(values) {
            let portionLength = Math.min(5, this.length)
            let portionCount = this.length / portionLength

            for (let i = 0; i < portionCount; i++) {
                let first = Math.floor(Math.random() * portionLength) + 5 * i
                let second = Math.floor(Math.random() * portionLength) + 5 * i
                let temp = values[first]
                values[first] = values[second]
                values[second] = temp
            }
        }
        setPoints(values) {
            let that = this
            values.forEach(function(value, index) {
                that.points[index].value = value
            })
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
        differenceFromOrdered() {
            let values = this.values()
            let ordered = Array.prototype.range(values.length)
            let difference = 0
            for(let i = 0; i < values.length; i++) {
                difference += Math.abs(values[i] - i)
            }
            return difference
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
