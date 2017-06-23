namespace Boards {
    export class Board {
        points: Points.Point[] = [];
        size: Sizes.Size;
        length: number;
        constructor(size) {
            this.setSize(size)
            this.createValues()
            this.shuffleBoard()
        }
        createValues() {
            let that = this;
            let values = Array.prototype.range(this.length)
            this.setPoints(values)
        }
        shuffleBoard() {
            // get the values in the current array
            let values = this.values()
            values.sortNumbers()
            // shuffle the array
            values.shuffle()
            this.setPoints(values)
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
    }
}
