export interface ValueType {
    generate(n: number): any[]
    title: string
}

export class Random implements ValueType {
    title = "Random"
    generate(n: number): number[] {
        let spread = n * 2
        let values = []
        for (let i = 0; i < n; i++) {
            values.push(Math.floor(Math.random() * spread))
        }
        return values
    }
}

export class Integer implements ValueType {
    title = "Range"
    generate(n: number): number[] {
        return Array.prototype.range(n)
    }
}

export class FewUnique implements ValueType {
    title = "Few Values"
    generate(n: number): number[] {
        let values = []
        for(let i = 0; i < n; i++) {
            values.push(i % 5)
        }
        return values
    }
}

export class AllBut2Equal implements ValueType {
    title = "All But 2 Equal"
    generate(n: number): number[] {
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

export class Equal implements ValueType {
    title = "Equal"
    generate(n: number): number[] {
        let values = []
        for(let i = 0; i < n; i++) {
            values.push(n / 2)
        }
        return values
    }
}

export class Logarithmic implements ValueType {
    title = "Logarithmic"
    generate(n: number): number[] {
        let values = []
        for(let i = 0; i < n; i++) {
            let j = (i + 1) / 8
            let num = Math.log(j)
            values.push(Math.floor(num * 10))
        }
        return values
    }
}

export class Quadratic implements ValueType {
    title = "Quadratic"
    generate(n: number): number[] {
        let values = []
        for(let i = 0; i < n; i++) {
            let j = 10 * (i / n) - 5
            let num = j * j
            values.push(Math.floor(num * 2))
        }
        return values
    }
}

export class Exponential implements ValueType {
    title = "Exponential"
    generate(n: number): number[] {
        let values = []
        for(let i = 0; i < n; i++) {
            let j = 10 * (i / n) - 5
            let num = Math.pow(2, j)
            values.push(Math.floor(num * 2))
        }
        return values
    }
}

export class Cubic implements ValueType {
    title = "Cubic"
    generate(n: number): number[] {
        let values = []
        for(let i = 0; i < n; i++) {
            let j = 4 * (i / n) - 2
            let num = j * j * j
            values.push(Math.floor(num * 3))
        }
        return values
    }
}

export class Quintic implements ValueType {
    title = "Quintic"
    generate(n: number): number[] {
        let values = []
        for(let i = 0; i < n; i++) {
            let j = 2 * (i / n) - 1
            let num = j * j * j * j * j
            values.push(Math.floor(num * 30))
        }
        return values
    }
}

export class Sin implements ValueType {
    title = "Sin"
    generate(n: number): number[] {
        let values = []
        for(let i = 0; i < n; i++) {
            let j = 12 * (i / n) - 6
            let num = Math.sin(j)
            values.push(Math.floor(num * 30))
        }
        return values
    }
}

export class Root implements ValueType {
    title = "Root"
    generate(n: number): number[] {
        let values = []
        for(let i = 0; i < n; i++) {
            let j = 5 * (i / n)
            let num = Math.sqrt(j)
            values.push(Math.floor(num * 15))
        }
        return values
    }
}

export let valueTypeList = [
    new Integer(),
    new Random(),
    new FewUnique(),
    new Equal(),
    new AllBut2Equal(),
    new Logarithmic(),
    new Quadratic(),
    new Exponential(),
    new Cubic(),
    new Quintic(),
    new Sin(),
    new Root()
]
