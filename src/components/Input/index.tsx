import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import './styles.css';
import InputMask from 'react-input-mask';
import ErrorToolTip from '../ErrorTooltip';
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon: React.ComponentType<IconBaseProps>;
    mask?: string;
    iconSize?: number;
    label: string;
}

const Input: React.FC<InputProps> = ({
    icon: Icon,
    name,
    label,
    mask,
    iconSize,
    ...rest
}) => {
    const inputRef = useRef(null);
    const { fieldName, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <div className="input-container">
                <Icon size={iconSize ? iconSize : 20} />
                {mask ? (
                    <InputMask
                        ref={inputRef}
                        name={name}
                        id={name}
                        mask={mask}
                        {...rest}
                    />
                ) : (
                    <input
                        ref={inputRef}
                        name={name}
                        id={name}
                        {...rest}
                    />
                )}

                {error && <ErrorToolTip title={error} />}
            </div>
        </div>
    );
};

export default Input;
