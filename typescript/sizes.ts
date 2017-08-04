export namespace Sizes {
    export interface Size {
        elemCount: number;
        label: string;
    }

    export let speedTest = {
        elemCount: 9000,
        label: "9000"
    };

    export let stupidNumber = {
        elemCount: 1000,
        label: "1000"
    };

    export let manyMany: Size = {
        elemCount: 300,
        label: "300"
    }

    export let xXSmall: Size = {
        elemCount: 70,
        label: "70"
    }

    export let xSmall: Size = {
        elemCount: 60,
        label: "60"
    }

    export let small: Size = {
        elemCount: 50,
        label: "50"
    }

    export let medium: Size = {
        elemCount: 40,
        label: "40"
    }

    export let large: Size = {
        elemCount: 30,
        label: "30"
    }

    export let xLarge: Size = {
        elemCount: 20,
        label: "20"
    }

    export let xXLarge: Size = {
        elemCount: 10,
        label: "10"
    }

    export let fewFew = {
        elemCount: 5,
        label: '5'
    }

    export const sizeList = [
        fewFew,
        xXLarge,
        xLarge,
        large,
        medium,
        small,
        xSmall,
        xXSmall,
        manyMany,
        stupidNumber,
        speedTest
    ]
}
