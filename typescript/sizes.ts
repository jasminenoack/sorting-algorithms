namespace Sizes {
    export interface Size {
        elemCount: number;
        label: string;
    }

    export let xXSmall: Size = {
        elemCount: 320,
        label: "X-X-Small"
    }

    export let xSmall: Size = {
        elemCount: 160,
        label: "X-Small"
    }

    export let small: Size = {
        elemCount: 80,
        label: "Small"
    }

    export let medium: Size = {
        elemCount: 40,
        label: "Medium"
    }

    export let large: Size = {
        elemCount: 20,
        label: "Large"
    }

    export let xLarge: Size = {
        elemCount: 10,
        label: "X-Large"
    }

    export let xXLarge: Size = {
        elemCount: 5,
        label: "X-X-Large"
    }
}
