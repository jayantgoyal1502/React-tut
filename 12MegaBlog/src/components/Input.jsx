import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label 
                    className='inline-block mb-1 pl-1 text-gray-700'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-gray-100 text-gray-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 duration-200 border border-gray-300 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});

export default Input;
