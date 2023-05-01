import React, { ChangeEvent } from 'react'

type NRInputProps = {
    title: string
    type: string
    autoComplete?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    value?: string | number | readonly string[] | undefined
    name: string
    maxLength?: number
    placeholder?: string
    width?: string
    min?: number
    max?: number
    className?: string
    styles?: string
}

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
}) => {
    return (
        <fieldset 
            className={`
       border border-gray-500
        rounded-md 
        p-2 ${className ?? ''}`}
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
                maxLength={maxLength}
                autoCapitalize="none"
                onChange={onChange}
                className={`w-full bg-transparent pb-2 indent-2 outline-none ${styles ?? ''}`}
            />
        </fieldset>
    )
}

export default NRInput
