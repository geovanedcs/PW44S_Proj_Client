import {ChangeEvent} from 'react';

interface IInputProps {
    id: string;
    name: string;
    className: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    hasError: boolean;
    error: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
                          id,
                          name,
                          className,
                          label,
                          type,
                          placeholder,
                          value,
                          hasError,
                          error,
                          onChange,
                      }: IInputProps) {
    let inputClassName = className;
    if (hasError) {
        inputClassName += hasError ? " is-invalid" : " is-valid";
    }

    return (
        <>
            <input
                id={id}
                type={type}
                className={inputClassName}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                name={name}
            />
            {label && <label htmlFor={name}>{label}</label>}
            {hasError && <div className="invalid-feedback">{error}</div>}
        </>
    );
}