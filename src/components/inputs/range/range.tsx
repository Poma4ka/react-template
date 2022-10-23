import React, {useState, useTransition} from 'react';
import classes from "./index.module.css"
import {multiClass} from "../../../helpers/multi-class";

export interface RangeProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const Range = ({className,onChange,value,...props} : RangeProps) => {
    const [v,setV] = useState(value)

    const [,startTransition] = useTransition()

    const change = (e) => {
        setV(e.target.value);
        startTransition(() => onChange(e));
    }

    return (
        <input
            {...props}
            type="range"
            className={multiClass(classes.range,className)}
            value={v}
            onChange={change}
        />
    );
};

export default Range;