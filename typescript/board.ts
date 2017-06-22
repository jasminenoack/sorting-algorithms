namespace Board {
    export class ExampleArray {
        points: Points.Point[] = [];
        size: Sizes.Size;
        [index: number]: Points.Point;
        length: number;
        constructor(size) {
            this.setSize(size)
            this.createArray()
        }
        createArray() {
            // TODO create different types of arrays

            let that = this;
            // reset points
            this.points = []

            // create a list of values from 0 up to but not including the length
            // shuffle these values
            let values = []
            for (let i = 0; i < this.length; i++) {
                values.push(i)
            }
            values.shuffle()
            // create a point for each value
            values.forEach(function(value, index) {
                that.points.push(new Points.Point(0, value))
            })
        }
        setSize(size) {
            this.size = size
            this.length = this.size.elemCount
        }
    }
}
