describe("Size", function() {
    beforeEach(function() {
    });

    describe("initializes sizes", function () {
        xit("should create small", () => {
        })

        xit("should create medium", () => {
        })

        it("should create large", () => {
            expect(Sizes.large).toBeTruthy()
            expect(Sizes.large.elemCount).toEqual(20)
            expect(Sizes.large.label).toEqual("Large")
        })

        xit("should create x-small", () => {
        })

        it("should create x-large", () => {
            expect(Sizes.xLarge).toBeTruthy()
            expect(Sizes.xLarge.elemCount).toEqual(10)
            expect(Sizes.xLarge.label).toEqual("X-Large")
        })

        xit("should create x-x-small", () => {
        })

        xit("should create x-x-large", () => {
        })
    })
});
