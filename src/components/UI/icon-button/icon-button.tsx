import React, {ReactNode} from 'react';
import classes from "./index.module.scss"
import {multiClass} from "../../../helpers/multi-class";

export interface IconButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    disabledIcon?: ReactNode
    icon?: ReactNode
    disabled? : boolean
    onClick?(e: any) : void
    onDisabledClick?() : void
    onLoadingClick?() : void
    loading?: boolean
    children?: never
}

const IconButton = (
    {
        disabledIcon,
        icon,
        color,
        className,
        disabled,
        onClick = () => null,
        onDisabledClick = () => null,
        onLoadingClick = () => null,
        loading,
        ...props
    } : IconButtonProps) => {

    const click = (e) => {
        if (disabled) {
            e.preventDefault();
            onDisabledClick();
        } else if (loading) {
            e.preventDefault();
            onLoadingClick();
        } else {
            onClick(e);
        }
    }

    return (
        <button
            {...props}
            className={multiClass(className,classes.button)}
            onClick={click}
            disabled={disabled}
        >
            {
                loading
                    ?
                    <div className={classes.spinner}>
                        <svg viewBox="0 0 50 50">
                            <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"/>
                        </svg>
                    </div>
                    :
                    disabled
                        ?
                        disabledIcon || icon
                        :
                        icon
            }
        </button>
    );
};

export default IconButton;