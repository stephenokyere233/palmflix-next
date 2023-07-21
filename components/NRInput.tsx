import { NRInputProps } from "@/interfaces";
import React from "react";

const NRInput: React.FC<NRInputProps> = ({
  title,
  type,
  autoComplete,
  onChange,
  value,
  name,
  maxLength,
  placeholder,
  min,
  max,
  className,
  styles,
  isRequired,
  isDisabled,
}) => {
  return (
    <fieldset
      className={`
       border border-gray-500
        rounded-md 
        p-2 ${className ?? ""}`}
    >
      <legend className={`text-gray-400`}>{title}</legend>
      <input
        type={type}
        aria-hidden="true"
        placeholder={placeholder}
        name={name}
        value={value}
        autoComplete={autoComplete}
        spellCheck="false"
        tabIndex={0}
        min={min}
        max={max}
        disabled={isDisabled}
        maxLength={maxLength}
        autoCapitalize="none"
        onChange={onChange}
        required={isRequired}
        className={`w-full bg-transparent pb-2 indent-2 outline-none ${
          styles ?? ""
        }`}
      />
    </fieldset>
  );
};

export default NRInput;
