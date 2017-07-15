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
            expect(array).toEqual([
                -2.0794415416798357, -1.3862943611198906, -0.9808292530117262,
                -0.6931471805599453, -0.4700036292457356, -0.2876820724517809,
                -0.13353139262452263, 0, 0.11778303565638346,
                0.22314355131420976
            ])
        })

        it("should generate a quadratic", () => {
            let valueType = new ValueTypes.Quadratic()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([ 25, 16, 9, 4, 1, 0, 1, 4, 9, 16 ])
        })

        it("should generate a exponential", () => {
            let valueType = new ValueTypes.Exponential()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([ 0.03125, 0.0625, 0.125, 0.25, 0.5, 1, 2, 4, 8, 16 ])
        })

        it("should generate a cubic", () => {
            let valueType = new ValueTypes.Cubic()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([
                -8, -4.096000000000001, -1.728, -0.5120000000000001,
                -0.06399999999999996, 0, 0.06399999999999996,
                0.5119999999999997, 1.7280000000000006, 4.096000000000001
            ])
        })

        it("should generate a quintic", () => {
            let valueType = new ValueTypes.Quintic()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([
                -1, -0.32768000000000014, -0.07776, -0.010240000000000004,
                -0.00031999999999999965, 0, 0.00031999999999999965,
                0.010239999999999989, 0.07776000000000005, 0.32768000000000014
            ])
        })

        it("should generate a sin", () => {
            let valueType = new ValueTypes.Sin()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([
                0.27941549819892586, 0.9961646088358407, 0.4425204432948521,
                -0.6754631805511506, -0.9320390859672261, 0,
                0.9320390859672261, 0.675463180551152, -0.4425204432948537,
                -0.9961646088358406
            ])
        })

        it("should generate a root", () => {
            let valueType = new ValueTypes.Root()
            let array = valueType.generate(10)
            expect(array.length).toBeTruthy()
            expect(array).toEqual([
                0, 0.7071067811865476, 1, 1.224744871391589, 1.4142135623730951,
                1.5811388300841898, 1.7320508075688772, 1.8708286933869707,
                2, 2.1213203435596424
            ])
        })
    })
});
