describe("Utils", function() {
    beforeEach(function() {
    });

    describe("array utils", function () {
        it("array should have a shuffle function", () => {
            expect(Array.prototype.hasOwnProperty("shuffle")).toBeTruthy()
        })

        it("shuffle should change the array(possible expected error due to 1/10 chance the array may shuffle into the same order)", () => {
            let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            oldArr = arr.slice()
            newArr = arr.shuffle()
            expect(oldArr).not.toEqual(arr)
        })

        it("shuffle changes in place", () => {
            let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            oldArr = arr.slice()
            newArr = arr.shuffle()
            expect(arr).toEqual(newArr)
        })
    })
});
