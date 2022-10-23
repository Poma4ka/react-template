import React, {forwardRef} from 'react';
import Range, {RangeProps} from "../range/range";
import {Field as FormikField} from "formik";

interface Props extends RangeProps {
    name: string
}

const RangeField = forwardRef(({name,...props}: Props,ref) => {
    return (
        <FormikField
            innerRef={ref}
            name={name}

        >
            {
                ({field, form: { errors, touched }}) => (
                    <Range
                        {...field}
                        {...props}
                        error={touched[name] && errors[name] as string}
                    />
                )
            }
        </FormikField>
    );
});

export default RangeField;