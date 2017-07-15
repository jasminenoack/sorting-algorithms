namespace ValueTypes {
    export interface ValueType {
        generate(n: number): any[]
    }

    export class Random implements ValueType {
        generate(n) {
            let spread = n * 2
            let values = []
            for (let i = 0; i < n; i++) {
                values.push(Math.floor(Math.random() * spread))
            }
            return values
        }
    }

    export class Integer implements ValueType {
        generate(n) {
            return Array.prototype.range(n)
        }
    }

    export class FewUnique implements ValueType {
        generate(n) {
            let values = []
            for(let i = 0; i < n; i++) {
                values.push(i % 5)
            }
            return values
        }
    }

    export class AllBut2Equal implements ValueType {
        generate(n) {
            let values = []
            for(let i = 0; i < n - 2; i++) {
                values.push(n / 2)
            }
            values.push(2)
            values.push(n - 2)
            values.sort()
            return values
        }
    }

    export class Logarithmic implements ValueType {
        generate(n) {
            let values = []
            for(let i = 0; i < n; i++) {
                let j = (i + 1) / 8
                values.push(Math.log(j))
            }
            return values
        }
    }

    export class Quadratic implements ValueType {
        generate(n) {
            let values = []
            for(let i = 0; i < n; i++) {
                let j = 10 * (i / n) - 5
                values.push(j * j)
            }
            return values
        }
    }

    export class Exponential implements ValueType {
        generate(n) {
            let values = []
            for(let i = 0; i < n; i++) {
                let j = 10 * (i / n) - 5
                values.push(Math.pow(2, j))
            }
            return values
        }
    }

    export class Cubic implements ValueType {
        generate(n) {
            let values = []
            for(let i = 0; i < n; i++) {
                let j = 4 * (i / n) - 2
                values.push(j * j * j)
            }
            return values
        }
    }

    export class Quintic implements ValueType {
        generate(n) {
            let values = []
            for(let i = 0; i < n; i++) {
                let j = 2 * (i / n) - 1
                values.push(j * j * j * j * j)
            }
            return values
        }
    }

    export class Sin implements ValueType {
        generate(n) {
            let values = []
            for(let i = 0; i < n; i++) {
                let j = 12 * (i / n) - 6
                values.push(Math.sin(j))
            }
            return values
        }
    }

    export class Root implements ValueType {
        generate(n) {
            let values = []
            for(let i = 0; i < n; i++) {
                let j = 5 * (i / n)
                values.push(Math.sqrt(j))
            }
            return values
        }
    }

    export let valueTypeList = [
        new Random(),
        new Integer(),
        new FewUnique(),
        new AllBut2Equal(),
        new Logarithmic(),
        new Quadratic(),
        new Exponential(),
        new Cubic(),
        new Quintic(),
        new Sin(),
        new Root()
    ]
}
