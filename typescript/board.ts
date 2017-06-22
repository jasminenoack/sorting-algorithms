namespace Board {
    interface Point {
        index: number;
        value: number;
        color: string;
    }

    export class ExampleArray {
        points: Point[] = [];
        size: Sizes.Size;
        [index: number]: Point;
        length: number;
        constructor(size) {
            this.setSize(size)
            this.createArray()
        }
        createArray() {
            // TODO create different types of arrays
            // lots of similar
            // fully random
            // one of each number
            // to compare sorting speeds across

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
                that.points.push({
                    index: 0,
                    value: value,
                    // TODO set up enum for colors
                    color: "aliceblue"
                })
            })
        }
        setSize(size) {
            this.size = size
            this.length = this.size.elemCount
        }
    }
}
