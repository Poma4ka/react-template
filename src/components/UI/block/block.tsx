import React from 'react';
import classes from "./index.module.scss";
import {Property} from "csstype";
import {multiClass} from "../../../helpers/multi-class";

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    padding? : string|number
    hoverable?: boolean
    cursor? : Property.Cursor
}

const Block = ({children,className,padding,style,cursor,hoverable,...props}  : Props) => {
    return (
        <div
            {...props}
            className={multiClass(className,classes.block,hoverable && classes.hoverable)}
            style={{
                ...style,
                padding:padding,
                cursor: cursor
        }}
        >
            {children}
        </div>
    );
};

export default Block;