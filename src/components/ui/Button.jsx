import React from "react";

const Button = ({ children, className = "", variant = "default", ...props }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant] || ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
