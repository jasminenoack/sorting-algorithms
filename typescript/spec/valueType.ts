import { countBy } from "lodash";
import * as ValueTypes from "../valueTypes";
import { Logarithmic } from "./../valueTypes";

describe("Value Type", () => {
  describe("generates values", () => {
    it("should generate a random", () => {
      const valueType = ValueTypes.Random;
      const array = valueType.generate(10);
      expect(array.length).toBeTruthy();
      expect(array.length).toEqual(10);
      expect(Math.max.apply(this, array)).toBeGreaterThan(9);
    });

    it("should generate a range", () => {
      const valueType = ValueTypes.Integer;
      const array = valueType.generate(10);
      expect(array.length).toBeTruthy();
      expect(array).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("should generate a few unique", () => {
      const valueType = ValueTypes.FewUnique;
      const array = valueType.generate(10);
      expect(array.length).toBeTruthy();
      expect(countBy(array, (x) => x)).toEqual({
        0: 2,
        1: 2,
        2: 2,
        3: 2,
        4: 2,
      });
    });

    it("should generate a all but 2", () => {
      const valueType = ValueTypes.AllBut2Equal;
      const array = valueType.generate(10);
      expect(array.length).toBeTruthy();
      expect(array).toEqual([2, 5, 5, 5, 5, 5, 5, 5, 5, 8]);
    });

    it("should generate equal", () => {
      const valueType = ValueTypes.Equal;
      const array = valueType.generate(10);
      expect(array.length).toBeTruthy();
      expect(array).toEqual([5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
    });

    it("should generate a logarithmic", () => {
      const valueType = ValueTypes.Logarithmic;
      const array = valueType.generate(10);
      expect(array.length).toBeTruthy();
      expect(array).toEqual([-21, -14, -10, -7, -5, -3, -2, 0, 1, 2]);
    });

    it("should generate a quadratic", () => {
      const valueType = ValueTypes.Quadratic;
      const array = valueType.generate(10);
      expect(array.length).toBeTruthy();
      expect(array).toEqual([50, 32, 18, 8, 2, 0, 2, 8, 18, 32]);
    });

    it("should generate a exponential", () => {
      const valueType = ValueTypes.Exponential;
      const array = valueType.generate(10);
      expect(array.length).toBeTruthy();
      expect(array).toEqual([0, 0, 0, 0, 1, 2, 4, 8, 16, 32]);
    });

    it("should generate a cubic", () => {
      const valueType = ValueTypes.Cubic;
      const array = valueType.generate(10);
      expect(array.length).toBeTruthy();
      expect(array).toEqual([-24, -13, -6, -2, -1, 0, 0, 1, 5, 12]);
    });

    it("should generate a quintic", () => {
      const valueType = ValueTypes.Quintic;
      const array = valueType.generate(10);
      expect(array.length).toBeTruthy();
      expect(array).toEqual([-30, -10, -3, -1, -1, 0, 0, 0, 2, 9]);
    });

    it("should generate a sin", () => {
      const valueType = ValueTypes.Sin;
      const array = valueType.generate(10);
      expect(array.length).toBeTruthy();
      expect(array).toEqual([8, 29, 13, -21, -28, 0, 27, 20, -14, -30]);
    });

    it("should generate a root", () => {
      const valueType = ValueTypes.Root;
      const array = valueType.generate(10);
      expect(array.length).toBeTruthy();
      expect(array).toEqual([0, 10, 15, 18, 21, 23, 25, 28, 30, 31]);
    });
  });
});
