import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    borderColor = "border-transparent",
    hoverBgColor = "hover:bg-blue-700",
    hoverTextColor = "hover:text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${borderColor} ${hoverBgColor} ${hoverTextColor} transition duration-300 ease-in-out ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
