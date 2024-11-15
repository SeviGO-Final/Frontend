import React from "react";

interface TextInputProps {
  name: string;
  placeholder: string;
  value: string;
  disable?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  placeholder,
  value,
  onChange,
  disable,
}) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input w-full max-w-xs"
      disabled={disable}
    />
  );
};

export default TextInput;
