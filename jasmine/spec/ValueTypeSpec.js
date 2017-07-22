describe("Value Type", function() {
    beforeEach(function() {
    });

    describe("generates values", function () {
        it("should generate a random", () => {
            let valueType = new ValueTypes.Random()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array.length).toEqual(10)
            expect(Math.max.apply(this, array)).toBeGreaterThan(9)
        })

        it("should generate a range", () => {
            let valueType = new ValueTypes.Integer()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        })

        it("should generate a few unique", () => {
            let valueType = new ValueTypes.FewUnique()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array.distribution()).toEqual({
                0: 2,
                1: 2,
                2: 2,
                3: 2,
                4: 2,
            })
        })

        it("should generate a all but 2", () => {
            let valueType = new ValueTypes.AllBut2Equal()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([2, 5, 5, 5, 5, 5, 5, 5, 5, 8])
        })

        it("should generate equal", () => {
            let valueType = new ValueTypes.Equal()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([5, 5, 5, 5, 5, 5, 5, 5, 5, 5])
        })

        it("should generate a logarithmic", () => {
            let valueType = new ValueTypes.Logarithmic()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([ -21, -14, -10, -7, -5, -3, -2, 0, 1, 2 ])
        })

        it("should generate a quadratic", () => {
            let valueType = new ValueTypes.Quadratic()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([ 50, 32, 18, 8, 2, 0, 2, 8, 18, 32 ])
        })

        it("should generate a exponential", () => {
            let valueType = new ValueTypes.Exponential()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([ 0, 0, 0, 0, 1, 2, 4, 8, 16, 32 ])
        })

        it("should generate a cubic", () => {
            let valueType = new ValueTypes.Cubic()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([ -24, -13, -6, -2, -1, 0, 0, 1, 5, 12 ])
        })

        it("should generate a quintic", () => {
            let valueType = new ValueTypes.Quintic()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([ -30, -10, -3, -1, -1, 0, 0, 0, 2, 9 ])
        })

        it("should generate a sin", () => {
            let valueType = new ValueTypes.Sin()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([ 8, 29, 13, -21, -28, 0, 27, 20, -14, -30 ])
        })

        it("should generate a root", () => {
            let valueType = new ValueTypes.Root()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([ 0, 10, 15, 18, 21, 23, 25, 28, 30, 31 ])
        })
    })
});
