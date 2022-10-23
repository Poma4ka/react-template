import {useEffect, useRef} from "react";

const NavTitle = ({children}) => {
    const {current: oldTitle} = useRef<string>(document.title)

    useEffect(() => {
        document.title = children

        return () => {
            document.title = oldTitle
        }
    },[children])

    return null;
};

export default NavTitle;