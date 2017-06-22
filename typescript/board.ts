namespace Boards {
    export class Board {
        points: Points.Point[] = [];
        size: Sizes.Size;
        [index: number]: Points.Point;
        length: number;
        constructor(size) {
            this.setSize(size)
            this.createArray()
        }
        createArray() {
            let that = this;
            // reset points
            this.points = []
            // create a list of values from 0 up to but not including the length
            // shuffle these values
            let values = Array.prototype.range(length)
            values.forEach(function(value, index) {
                that.points.push(new Points.Point(0, value))
            })
        }
        shuffleBoard() {
            let that = this;
            let values = []
            for (let i = 0; i < this.length; i++) {
                values.push(this.points[i].value)
            }
            values.shuffle()
            values.forEach(function(value, index) {
                that.points[index].value = value
            })
        }
        setSize(size) {
            this.size = size
            this.length = this.size.elemCount
        }
    }
}
