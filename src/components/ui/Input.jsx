import React, { useEffect, useRef } from "react";

const Input = React.forwardRef(({ className = "", value, onChange, ...props }, ref) => {
  const inputRef = ref || useRef();

  // Auto-resize height based on content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={inputRef}
      value={value}
      onChange={onChange}
      rows={1}
      className={`resize-none px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full overflow-hidden ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
