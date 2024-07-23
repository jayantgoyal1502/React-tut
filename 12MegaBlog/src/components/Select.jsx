import React, { useId } from 'react';

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label 
                    htmlFor={id} 
                    className='block mb-1 text-gray-700 text-sm font-medium'
                >
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-gray-900 outline-none focus:bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 border border-gray-300 w-full transition duration-200 ease-in-out ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);
