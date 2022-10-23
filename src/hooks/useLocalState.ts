import {useState} from "react";

export function useLocalState<T>(storage,defaultValue: T = null) : [T,(value: T) => void] {
    const [value,setValue] = useState<T>(function() : T {
        let item = window.localStorage.getItem(storage)
        try {
            item = JSON.parse(item)
        } catch (e) {}
        return item ? item as unknown as T : defaultValue
    })

    const changeValue = (newValue : T | ((prevState: T) => T)) => {
        if (newValue instanceof Function) {
            newValue = newValue(value)
        }
        switch (typeof newValue) {
            case "object": {
                window.localStorage[storage] = JSON.stringify(newValue)
                break;
            }
            default : {
                 window.localStorage[storage] = newValue
            }
        }
        setValue(newValue)
    }

    return [value,changeValue];
}
