import React, {CSSProperties, ReactNode} from 'react';
import {Property} from "csstype";
import {COLORS} from "../../assets/colors";
import {multiClass} from "../../helpers/multi-class";

interface Props {
    children?: ReactNode
    slim?: boolean
    bold?: boolean
    black?: boolean
    align?: Property.TextAlign
    color?: COLORS
    resizable?: boolean
    className?: string
    style?: CSSProperties
}

const H1 = ({children,align,bold,black,slim,color,resizable = true,style,className,...props} : Props) => {
    return (
        <h1
            {...props}
            className={multiClass(className,"h1")}
            data-resizible={resizable}
            style={{
                ...style,
                textAlign: align,
                fontWeight: slim ? 300 : bold ? 500 : black ? 600 : 400,
                color: color,
            }}
        >
            {children}
        </h1>
    );
};

export default H1;