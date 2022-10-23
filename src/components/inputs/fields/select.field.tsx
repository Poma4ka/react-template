import React, {forwardRef} from 'react';
import {Field as FormikField} from "formik";
import Select, {SelectProps} from "../select/select";

interface Props extends SelectProps {
    name: string
}

const SelectField = forwardRef(({name,...props}: Props,ref) => {
    return (
        <FormikField
            innerRef={ref}
            name={name}

        >
            {
                ({field, form: { errors, touched }}) => (
                    <Select
                        {...field}
                        {...props}
                        error={touched[name] && errors[name] as string}
                    />
                )
            }
        </FormikField>
    );
});

export default SelectField;