import React from "react";

interface TextInputProps {
  name: string;
  placeholder: string;
  value: string;
  disble: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  placeholder,
  value,
  onChange,
  disble,
}) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input w-full max-w-xs"
      disabled={disble}
    />
  );
};

export default TextInput;
