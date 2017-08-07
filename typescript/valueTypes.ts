abstract class ValueType {
    static generate(n: number): any[] {return []}
    static title: string
}

export class Random implements ValueType {
    static title = "Random"
    static generate(n: number): number[] {
        let spread = n * 2
        let values = []
        for (let i = 0; i < n; i++) {
            values.push(Math.floor(Math.random() * spread))
        }
        return values
    }
}

export class Integer implements ValueType {
    static title = "Range"
    static generate(n: number): number[] {
        return (Array.prototype as any).range(n)
    }
}

export class FewUnique implements ValueType {
    static title = "Few Values"
    static generate(n: number): number[] {
        let values = []
        for(let i = 0; i < n; i++) {
            values.push(i % 5)
        }
        return values
    }
}

export class AllBut2Equal implements ValueType {
    static title = "All But 2 Equal"
    static generate(n: number): number[] {
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
    static title = "Equal"
    static generate(n: number): number[] {
        let values = []
        for(let i = 0; i < n; i++) {
            values.push(n / 2)
        }
        return values
    }
}

export class Logarithmic implements ValueType {
    static title = "Logarithmic"
    static generate(n: number): number[] {
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
    static title = "Quadratic"
    static generate(n: number): number[] {
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
    static title = "Exponential"
    static generate(n: number): number[] {
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
    static title = "Cubic"
    static generate(n: number): number[] {
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
    static title = "Quintic"
    static generate(n: number): number[] {
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
    static title = "Sin"
    static generate(n: number): number[] {
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
    static title = "Root"
    static generate(n: number): number[] {
        let values = []
        for(let i = 0; i < n; i++) {
            let j = 5 * (i / n)
            let num = Math.sqrt(j)
            values.push(Math.floor(num * 15))
        }
        return values
    }
}
