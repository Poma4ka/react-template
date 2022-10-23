import {MutableRefObject, useEffect, useRef} from "react";

interface Margin {
    top?: number | string
    right?: number | string
    bottom?: number | string
    left?: number | string
}

interface Options {
    ref: MutableRefObject<any>
    refRoot?: MutableRefObject<any>
    disabled?: boolean
    loading?: boolean
    margin?: Margin
    callback: () => void
    threshold?: number | number[],
}

export const useObserver = (options: Options) => {
    const observer = useRef<IntersectionObserver>();

    const margin = options.margin ? `
    ${options.margin?.top ? (Number.isInteger(options.margin?.top) ? `${options.margin.top}px` : options.margin.top) : `0px`}
    ${options.margin?.right ? (Number.isInteger(options.margin?.right) ? `${options.margin.right}px` : options.margin.right) : `0px`}
    ${options.margin?.bottom ? (Number.isInteger(options.margin?.bottom) ? `${options.margin.bottom}px` : options.margin.bottom) : `0px`}
    ${options.margin?.left ? (Number.isInteger(options.margin?.left) ? `${options.margin.left}px` : options.margin.left) : `0px`}
    ` : undefined

    useEffect(() => {
        if(options.loading) return;
        if(observer.current) observer.current.disconnect();

        const callback = (entries) => {
            if (entries[0].isIntersecting && !options.disabled) {
                options.callback()
            }
        };
        observer.current = new IntersectionObserver(callback,{
            rootMargin: margin,
            threshold: options.threshold,
            root: options.refRoot?.current
        });
        observer.current.observe(options.ref.current)
    }, [options.loading]);

};