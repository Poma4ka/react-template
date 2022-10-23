import {useEffect, useState} from "react";

export const useKeyPress = (key: string,callback: () => void) => {
    const [cb,setCb] = useState<boolean>(false)

    const listener = (e) => {
        if (e.key === key) {
            setCb(true)
        }
    }

    useEffect(() => {
        document.addEventListener("keyup",listener)
        return () => document.removeEventListener("keyup",listener)
    },[])

    useEffect(() => {
        if (cb) {
            callback()
            setCb(false)
        }
    },[cb])
}