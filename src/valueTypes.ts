import { range } from "lodash";

export interface IValueType {
  title: string;
  generate(n: number): any[];
}

export const Random: IValueType = {
  title: "Random",
  generate(n: number): number[] {
    const spread = n * 2;
    const values = [];
    for (let i = 0; i < n; i++) {
      values.push(Math.floor(Math.random() * spread));
    }
    return values;
  },
};

export const Integer: IValueType = {
  generate: (n: number) => {
    return range(0, n);
  },
  title: "Range",
};

export const FewUnique: IValueType = {
  title: "Few Values",
  generate(n: number): number[] {
    const values = [];
    for (let i = 0; i < n; i++) {
      values.push(i % 5);
    }
    return values;
  },
};

export const AllBut2Equal: IValueType = {
  title: "All But 2 Equal",
  generate(n: number): number[] {
    const values = [];
    for (let i = 0; i < n - 2; i++) {
      values.push(n / 2);
    }
    values.push(2);
    values.push(n - 2);
    values.sort();
    return values;
  },
};

export const Equal: IValueType = {
  title: "Equal",
  generate(n: number): number[] {
    const values = [];
    for (let i = 0; i < n; i++) {
      values.push(n / 2);
    }
    return values;
  },
};

export const Logarithmic: IValueType = {
  title: "Logarithmic",
  generate(n: number): number[] {
    const values = [];
    for (let i = 0; i < n; i++) {
      const j = (i + 1) / 8;
      const num = Math.log(j);
      values.push(Math.floor(num * 10));
    }
    return values;
  },
};

export const Quadratic: IValueType = {
  title: "Quadratic",
  generate(n: number): number[] {
    const values = [];
    for (let i = 0; i < n; i++) {
      const j = 10 * (i / n) - 5;
      const num = j * j;
      values.push(Math.floor(num * 2));
    }
    return values;
  },
};

export const Exponential: IValueType = {
  title: "Exponential",
  generate(n: number): number[] {
    const values = [];
    for (let i = 0; i < n; i++) {
      const j = 10 * (i / n) - 5;
      const num = Math.pow(2, j);
      values.push(Math.floor(num * 2));
    }
    return values;
  },
};

export const Cubic: IValueType = {
  title: "Cubic",
  generate(n: number): number[] {
    const values = [];
    for (let i = 0; i < n; i++) {
      const j = 4 * (i / n) - 2;
      const num = j * j * j;
      values.push(Math.floor(num * 3));
    }
    return values;
  },
};

export const Quintic: IValueType = {
  title: "Quintic",
  generate(n: number): number[] {
    const values = [];
    for (let i = 0; i < n; i++) {
      const j = 2 * (i / n) - 1;
      const num = j * j * j * j * j;
      values.push(Math.floor(num * 30));
    }
    return values;
  },
};

export const Sin: IValueType = {
  title: "Sin",
  generate(n: number): number[] {
    const values = [];
    for (let i = 0; i < n; i++) {
      const j = 12 * (i / n) - 6;
      const num = Math.sin(j);
      values.push(Math.floor(num * 30));
    }
    return values;
  },
};

export const Root: IValueType = {
  title: "Root",
  generate(n: number): number[] {
    const values = [];
    for (let i = 0; i < n; i++) {
      const j = 5 * (i / n);
      const num = Math.sqrt(j);
      values.push(Math.floor(num * 15));
    }
    return values;
  },
};
