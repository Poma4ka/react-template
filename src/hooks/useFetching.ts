import {useState} from "react";

export function useFetching<T>(callback, defaultLoading = false) : [(...props : T[]) => void, boolean] {
    const [loading,setLoading] = useState(defaultLoading);

    const fetching = (...props : T[]) => {
        setLoading(true)
        return callback(...props).finally(() => setLoading(false))
    }

    return [fetching,loading]
}