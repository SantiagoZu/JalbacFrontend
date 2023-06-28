import React from 'react';
import { Field } from 'formik'

export const CustomInput = ({ type, id, name, placeholder }) => {
    return (
        <Field
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className="block w-full pl-4 mt-1 mb-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
        />
    )
}
