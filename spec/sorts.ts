// describe("Sorts", () => {












//   xdescribe("sort test base", () => {
//     beforeEach(() => {
//       length = 5;
//       size = fewFew;
//       board = new Board(size);
//       Sort = QuickSort2;
//       sort = new Sort(board);
//     });

//     xdescribe("create", () => {
//       xit("it has a title", () => {
//         expect(Sort.title).toEqual("Title");
//       });
//     });

//     xit("has a reset function", () => {
//       while (!sort.done) {
//         sort.next();
//       }
//       const values = board.values().slice();
//       sort.reset();
//       expect(sort.done).toBeFalsy();
//       expect(sort.steps).toEqual(0);
//       expect(sort.swaps).toEqual(0);
//       expect(sort.comparisons).toEqual(0);
//       expect(values).not.toEqual(board.values());
//       expect(sort.baseNode).toEqual(0);
//       expect(sort.comparisonNode).toEqual(1);
//     });

//     xdescribe("utils", () => {

//       xit("has current nodes", () => {
//         expect(sort.currentNodes()).toEqual([0, 1]);
//       });

//       xit("it handles ordered group", () => {
//         board.setPoints([0, 1, 2, 3, 4]);
//         sort = new Sort(board);

//         expect(sort.done).toEqual(true);
//         for (let i = 0; i < board.length; i++) {
//           expect(i).toEqual(board.values()[i]);
//         }
//       });

//       xit("handles a random group", () => {
//         board.setPoints([0, 3, 1, 4, 2]);
//         sort = new Sort(board);

//         expect(sort.done).toEqual(true);
//         for (let i = 0; i < board.length; i++) {
//           expect(i).toEqual(board.values()[i]);
//         }
//       });

//       xit("handles a swaping first group", () => {
//         board.setPoints([1, 0, 2, 3, 4]);
//         sort = new Sort(board);

//         expect(sort.done).toEqual(true);
//         for (let i = 0; i < board.length; i++) {
//           expect(i).toEqual(board.values()[i]);
//         }
//       });

//       xit("handles a swaping last group", () => {
//         board.setPoints([0, 1, 2, 4, 3]);
//         sort = new Sort(board);

//         expect(sort.done).toEqual(true);
//         for (let i = 0; i < board.length; i++) {
//           expect(i).toEqual(board.values()[i]);
//         }
//       });

//       xit("it does reverse group", () => {
//         board.setPoints([4, 3, 2, 1, 0]);
//         sort = new Sort(board);

//         expect(sort.done).toEqual(true);
//         for (let i = 0; i < board.length; i++) {
//           expect(i).toEqual(board.values()[i]);
//         }
//       });

//       xit("it handles first and last swapped", () => {
//         board.setPoints([4, 1, 2, 3, 0]);
//         sort = new Sort(board);

//         expect(sort.done).toEqual(true);
//         for (let i = 0; i < board.length; i++) {
//           expect(i).toEqual(board.values()[i]);
//         }
//       });

//       xit("handles partially ordered grouping", () => {
//         board.setPoints([0, 3, 2, 1, 4]);
//         sort = new Sort(board);

//         expect(sort.done).toEqual(true);
//         for (let i = 0; i < board.length; i++) {
//           expect(i).toEqual(board.values()[i]);
//         }
//       });

//       xit("handles duplicates", () => {
//         const values = [0, 2, 3, 1, 1];
//         board.setPoints(values);
//         sort = new Sort(board);

//         expect(sort.done).toEqual(true);
//         for (let i = 0; i < board.length; i++) {
//           expect(values.slice().sort()[i]).toEqual(board.values()[i]);
//         }
//       });

//       xit("handles more duplicates", () => {
//         const values = [2, 1, 1, 2, 1];
//         board.setPoints(values);
//         sort = new Sort(board);

//         expect(sort.done).toEqual(true);
//         for (let i = 0; i < board.length; i++) {
//           expect(values.slice().sort()[i]).toEqual(board.values()[i]);
//         }
//       });

//       xit("handles negatives", () => {
//         const values = [-2, 1, -1, 2, 0];
//         board.setPoints(values);
//         sort = new Sort(board);

//         expect(sort.done).toEqual(true);
//         expect(board.values()).toEqual([-2, -1, 0, 1, 2]);
//       });
//     });
//   });
// });
