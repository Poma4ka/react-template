import {useCallback, useEffect, useState} from "react";
import {useFetching} from "./useFetching";

export const usePreloading : (callback,enabled?: boolean) => boolean = (callback,enabled = true) => {
    
    const [fetch,loading] = useFetching(callback,true);

    useEffect(() => {
        if (enabled) {
            fetch()
        }
    },[]);

    return loading;
}