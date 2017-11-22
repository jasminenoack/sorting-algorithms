import * as Points from "./point";
import { IShuffle, RandomShuffle } from "./shuffles";
import * as Sizes from "./sizes";
import { Integer, IValueType } from "./valueTypes";

export enum Verbosity { None = 0, Info = 1, Debug = 5 }

export class Board {
  public points: Points.Point[] = [];
  public size: Sizes.ISize;
  public length: number;
  private _min: number;
  private _max: number;

  constructor(
    size: Sizes.ISize, public shuffle: IShuffle = RandomShuffle,
    public valueType: IValueType = Integer,
    public verbosity: Verbosity = Verbosity.Debug,
  ) {
    this.setSize(size);
    this.createValues();
    this.shuffleBoard();
  }
  public createValues() {
    const values = this.valueType.generate(this.length);
    this.setPoints(values);
    this._min = Math.min(...values);
    this._max = Math.max(...values);
  }
  public shuffleBoard() {
    const values = this.values();
    this.shuffle.shuffle(values);
    this.setPoints(values);
  }
  public setPoints(values: number[]) {
    const that = this;
    values.forEach(function (value, index) {
      that.set(index, value);
    });
    this._min = Math.min(...values);
    this._max = Math.max(...values);
  }
  public set(index: number, value: number) {
    this.points[index].value = value;
  }
  public swap(index1: number, index2: number) {
    const temp = this.get(index1);
    this.points[index1] = this.get(index2);
    this.points[index2] = temp;
  }
  public values() {
    const items = [];
    for (let i = 0; i < this.length; i++) {
      items.push(this.points[i].value);
    }
    return items;
  }
  public setSize(size: Sizes.ISize) {
    this.size = size;
    this.length = this.size.elemCount;
    this.points = [];
    for (let i = 0; i < this.length; i++) {
      this.points.push(new Points.Point(i));
    }
  }
  public get(index: number) {
    return this.points[index];
  }
  public min() {
    return this._min;
  }
  public max() {
    return this._max;
  }
  public distribution() {
    const dist: { [value: number]: number } = {};
    const values = this.values();
    values.forEach((value) => {
      dist[value] = (dist[value] || 0) + 1;
    });
    return dist;
  }
}
