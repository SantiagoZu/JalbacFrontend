import React from 'react';
import { Field } from 'formik';
import { minDate, returnDate } from '../helpers/parseDate';

export const CustomInput = ({ type, id, name, placeholder, options}) => {
    if (type === 'select') {
        return (
            <Field
                as="select"
                id={id}
                name={name}
                className="block w-full pl-4 mt-1 mb-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-select"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.disabled ? true : false}>
                        {option.label}
                    </option>
                ))}
            </Field>
        );
    }
    if (type === 'date') {
        return (
            <Field
                type={type}
                id={id}
                name={name}
                className="block w-full pl-4 mt-1 mb-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-select"           
                min={minDate}
                
            />                            
        );
    }
    return (
        <Field
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className="block w-full pl-4 mt-1 mb-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
        />
    );
};
