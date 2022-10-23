import React from "react";
import {Property} from "csstype";
import {COLORS} from "../../assets/colors";
import {multiClass} from "../../helpers/multi-class";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
    align? : Property.TextAlign
    color?: COLORS
}

const Note = ({children,style,align,className,color,...props} : Props) => {
    return (
        <p
            className={multiClass(className,"note")}
            {...props}
            style={{
                ...style,
                textAlign: align,
                color: color
            }}
        >
            {children}
        </p>
    );
};

export default Note;