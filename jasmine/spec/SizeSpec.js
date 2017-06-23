describe("Size", function() {
    beforeEach(function() {
    });

    describe("initializes sizes", function () {
        it("should create small", () => {
            expect(Sizes.small).toBeTruthy()
            expect(Sizes.small.elemCount).toEqual(80)
            expect(Sizes.small.label).toEqual("Small")
        })

        it("should create medium", () => {
            expect(Sizes.medium).toBeTruthy()
            expect(Sizes.medium.elemCount).toEqual(40)
            expect(Sizes.medium.label).toEqual("Medium")
        })

        it("should create large", () => {
            expect(Sizes.large).toBeTruthy()
            expect(Sizes.large.elemCount).toEqual(20)
            expect(Sizes.large.label).toEqual("Large")
        })

        it("should create x-small", () => {
            expect(Sizes.xSmall).toBeTruthy()
            expect(Sizes.xSmall.elemCount).toEqual(160)
            expect(Sizes.xSmall.label).toEqual("X-Small")
        })

        it("should create x-large", () => {
            expect(Sizes.xLarge).toBeTruthy()
            expect(Sizes.xLarge.elemCount).toEqual(10)
            expect(Sizes.xLarge.label).toEqual("X-Large")
        })

        it("should create x-x-small", () => {
            expect(Sizes.xXSmall).toBeTruthy()
            expect(Sizes.xXSmall.elemCount).toEqual(320)
            expect(Sizes.xXSmall.label).toEqual("X-X-Small")
        })

        it("should create x-x-large", () => {
            expect(Sizes.xXLarge).toBeTruthy()
            expect(Sizes.xXLarge.elemCount).toEqual(5)
            expect(Sizes.xXLarge.label).toEqual("X-X-Large")
        })
    })
});
