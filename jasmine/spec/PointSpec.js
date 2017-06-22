describe("Point", function() {
    describe("create", function () {
        let point, index, value, color;
        beforeEach(function() {
            index = 5
            value = 15
            color = "blue"
            point = new Points.Point(index, value, color)
        });

        it("point has an index", () => {
            expect(point.index).toEqual(index)
        })

        it("point has a value", () => {
            expect(point.value).toEqual(value)
        })

        it("point has a color", () => {
            expect(point.color).toEqual(color)
        })

        it("points have a default color", () => {
            let secondPoint = new Points.Point(index, color)
            expect(secondPoint.color).toBeTruthy()
        })
    })
});
