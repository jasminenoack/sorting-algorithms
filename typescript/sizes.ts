namespace Sizes {
    export interface Size {
        elemCount: number;
        label: string;
    }

    export let xXSmall: Size = {
        elemCount: 70,
        label: "X-X-Small"
    }

    export let xSmall: Size = {
        elemCount: 60,
        label: "X-Small"
    }

    export let small: Size = {
        elemCount: 50,
        label: "Small"
    }

    export let medium: Size = {
        elemCount: 40,
        label: "Medium"
    }

    export let large: Size = {
        elemCount: 30,
        label: "Large"
    }

    export let xLarge: Size = {
        elemCount: 20,
        label: "X-Large"
    }

    export let xXLarge: Size = {
        elemCount: 10,
        label: "X-X-Large"
    }

    export const sizeList = [
        Sizes.xXLarge,
        Sizes.xLarge,
        Sizes.large,
        Sizes.medium,
        Sizes.small,
        Sizes.xSmall,
        Sizes.xXSmall,
    ]
}
