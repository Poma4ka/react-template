import React, {forwardRef} from 'react';
import Input, {InputProps} from "../input/input";
import {Field as FormikField} from "formik";

interface Props extends InputProps {
    name: string
}

const InputField = forwardRef(({children,name,...props}: Props, ref) => {
    return (
        <FormikField
            innerRef={ref}
            name={name}
        >
            {
                ({field, form: { errors, touched }}) => (
                    <Input
                        {...field}
                        {...props}
                        error={touched[name] && errors[name] as string}
                    >
                        {children}
                    </Input>
                )
            }
        </FormikField>
    );
});

export default InputField;