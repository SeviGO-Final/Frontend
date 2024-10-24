import React, { ChangeEvent } from "react";

interface InputFieldProps {
    name: string;
    value: string;
    type: string;
    placeholder: string;
    icon: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ name, value, type, placeholder, icon, onChange, required = true }) => {
    return (
        <div className="relative group">
            <i className={`bx ${icon} absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl gruop-hover:text-orange-500 transition-colors duration-300 `} />
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                placeholder={placeholder}
                required={required}
            />

        </div>

    );
};

export default InputField;