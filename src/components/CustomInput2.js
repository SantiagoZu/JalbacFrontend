import React from 'react';
import {Field} from 'formik'

export const CustomInput2 = ({ type, id, name, value}) => {
    return (
        <Field
            type={type}
            id={id}
            name={name}
            value={value}
            className="ml-3"
        />
    )
}
