import {useEffect, useRef, useState} from "react";

export function useDelayChange<T>(callback: (value: T) => void,defaultValue?: T,delay = 300): [T,(value: T | ((prevState: T) => T)) => void] {
    const [state,setState] = useState<T>(defaultValue)
    const timeout = useRef<any>()

    const changeState = (value) => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            callback(value)
        },delay);
        setState(value);
    }

    useEffect(() => {
        return () => {
            clearTimeout(timeout.current);
        }
    },[]);

    return [state,changeState]
}