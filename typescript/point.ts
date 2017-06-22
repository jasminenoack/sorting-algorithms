namespace Points {
    export class Point {
        index: number;
        value: number;
        color: string;
        constructor(index, value, color = "aliceblue") {
            this.index = index
            this.value = value
            // TODO maybe color should be type and type should have color?
            this.color = color
        }
    }
}
