
declare module 'react-use-dimensions' {
    export interface DimensionObject {
        width: number;
        height: number;
        top: number;
        left: number;
        x: number;
        y: number;
        right: number;
        bottom: number;
    }

    export type UseDimensionsHook = [
        (node: HTMLElement) => void,
        {} | DimensionObject,
        HTMLElement
    ];

    export interface UseDimensionsArgs {
        liveMeasure?: boolean;
    }

    export type UseDimensions = () => UseDimensionsHook

    export = UseDimensions
}