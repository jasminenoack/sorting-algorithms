import { Point } from "../src/point";

describe("Point", () => {
  describe("create", () => {
    let point: Point;
    let index: number;
    let value: number;
    let color: string;
    beforeEach(() => {
      index = 5;
      value = 15;
      color = "blue";
      point = new Point(index, value, color);
    });

    it("point has an index", () => {
      expect(point.index).toEqual(index);
    });

    it("point has a value", () => {
      expect(point.value).toEqual(value);
    });

    it("point has a color", () => {
      expect(point.color).toEqual(color);
    });

    it("points have a default color", () => {
      const secondPoint = new Point(index, value, color);
      expect(secondPoint.color).toBeTruthy();
    });

    it("defaults value", () => {
      const secondPoint = new Point(index);
      expect(secondPoint.value).toEqual(0);
    });
  });
});
