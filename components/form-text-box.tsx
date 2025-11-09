import React from "react";

interface FormTextBoxProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const FormTextBox = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  className = "",
}: FormTextBoxProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-black mb-1">
        {label} {required && "*"}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-purple focus:border-transparent ${className}`}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormTextBox;

