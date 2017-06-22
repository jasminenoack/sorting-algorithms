describe("Utils", function() {
    beforeEach(function() {
    });

    describe("array utils", function () {
        describe("shuffle", () => {
            it("array should have a shuffle function", function () {
                expect(Array.prototype.hasOwnProperty("shuffle")).toBeTruthy()
            })

            it("shuffle should change the array(possible expected error due to 1/10 chance the array may shuffle into the same order)", () => {
                let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                oldArr = arr.slice()
                newArr = arr.shuffle()
                expect(oldArr).not.toEqual(arr)
            })

            it("shuffle changes in place", function () {
                let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                oldArr = arr.slice()
                newArr = arr.shuffle()
                expect(arr).toEqual(newArr)
            })
        })

        describe("range", () => {
            it("array should have a range function", () => {
                expect(Array.prototype.hasOwnProperty("range")).toBeTruthy()
            })

            it("range should generate array from 0 to x - 1", () => {
                let arr = Array.prototype.range(10)
                expect(arr).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

                arr = Array.prototype.range(8)
                expect(arr).toEqual([0, 1, 2, 3, 4, 5, 6, 7])
            })
        })
    })
});
