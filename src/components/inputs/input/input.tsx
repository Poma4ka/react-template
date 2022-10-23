import React from 'react';
import classes from "./index.module.scss";
import {multiClass} from "../../../helpers/multi-class";

export type InputTextType = "text"|"number"|"password"|"email"|"search"|"tel"|"url"

export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    children?
    type?: InputTextType
    placeholder?: string
    error?: string
    postfix?: string
    className?: string
    name?: string
}

const Input = ({children,type,placeholder,error,postfix,className,style,...props} : InputProps) => {
    return (
        <label
            className={multiClass(className,classes.label)}
            data-error={error}
            data-postfix={postfix}
            title={error}
        >
            {children}
            <input
                {...props}
                placeholder={placeholder}
                className={classes.input}
                type={type ?? "text"}
            />
        </label>
    );
};

export default Input;