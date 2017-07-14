describe("Bubble", function() {
    let length, sort;
    beforeEach(function() {
        length = 10
        sort = new Bubble.Bubble(length)
    });

    describe("create", function () {
        it("creates a bubble sort", () => {
            expect(sort).toBeTruthy()
        })

        it("it has a title", () => {
            expect(sort.title).toEqual('Bubble Sort')
        })

        it("it has a base node", () => {
            expect(sort.baseNode).toEqual(0)
        })

        it("it has a comparison node", () => {
            expect(sort.comparisonNode).toEqual(1)
        })

        it("it knows the board length", () => {
            expect(sort.length).toEqual(length)
        })

        it("starts as unsorted", () => {
            expect(sort.done).toEqual(false)
        })

        it("starts with ordered param", () => {
            expect(sort.ordered).toEqual(true)
        })
    })

    describe("utils", () => {
        it("it returns the current node indexs", () => {
            expect(sort.currentNodes()).toEqual([0, 1])
            sort.baseNode = 5
            sort.comparisonNode = 6
            expect(sort.currentNodes()).toEqual([5, 6])
        })

        it("it knows if nodes need to be switched", () => {
            let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            expect(sort.nodesInOrder(values)).toBeTruthy()
            expect(sort.ordered).toBeTruthy()
            values = [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]
            expect(sort.nodesInOrder(values)).toBeFalsy()
            expect(sort.ordered).toBeFalsy()
            sort.baseNode = 5
            sort.comparisonNode = 6
            expect(sort.nodesInOrder(values)).toBeTruthy()
            expect(sort.ordered).toBeFalsy()
        })

        it("it changes to the next nodes", () => {
            expect(sort.currentNodes()).toEqual([0, 1])
            sort.setUpNext()
            expect(sort.currentNodes()).toEqual([1, 2])
            sort.setUpNext()
            expect(sort.currentNodes()).toEqual([2, 3])
            sort.setUpNext()
            expect(sort.currentNodes()).toEqual([3, 4])
            sort.setUpNext()
            expect(sort.currentNodes()).toEqual([4, 5])
            sort.setUpNext()
            expect(sort.currentNodes()).toEqual([5, 6])
            sort.setUpNext()
            expect(sort.currentNodes()).toEqual([6, 7])
            sort.setUpNext()
            expect(sort.currentNodes()).toEqual([7, 8])
            sort.setUpNext()
            expect(sort.currentNodes()).toEqual([8, 9])
            sort.setUpNext()
            expect(sort.currentNodes()).toEqual([0, 1])
        })

        it("it changes to done if reseting with ordered", () => {
            let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            expect(sort.ordered).toBeTruthy()
            sort.setUpNext()
            expect(sort.done).toEqual(true)
        })

        it("if not ordered reset changes ordered back but not done", () => {
            let values = [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            sort.setUpNext()
            sort.nodesInOrder(values)
            expect(sort.ordered).toBeFalsy()
            sort.setUpNext()
            expect(sort.ordered).toBeTruthy()
            expect(sort.done).toEqual(false)
        })
    })
});
