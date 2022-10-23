import React, {ReactNode} from 'react';
import classes from "./index.module.scss";
import {COLORS} from "../../../assets/colors";
import {multiClass} from "../../../helpers/multi-class";

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    disabledChildren? : ReactNode
    color? : keyof typeof COLORS | string
    disabled? : boolean
    onClick?(e: any) : void
    onDisabledClick?() : void
    onLoadingClick?() : void
    loading?: boolean
}

const Button = (
    {
        children,
        disabledChildren,
        color,
        className,
        disabled,
        onClick = () => null,
        onDisabledClick = () => null,
        onLoadingClick = () => null,
        loading,
        ...props
    } : ButtonProps) => {

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
    const classList = multiClass(className,classes.button,disabled && classes.disabled, loading && classes.loading)
    const useColor = COLORS[color] ?? color ?? COLORS.blue

    return (
        <button
            {...props}
            className={classList}
            onClick={click}
            style={{color:useColor}}
        >
            <div className={classes.text}>
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
                            disabledChildren || children
                            :
                            children
                }
            </div>
        </button>
    );
};

export default Button;