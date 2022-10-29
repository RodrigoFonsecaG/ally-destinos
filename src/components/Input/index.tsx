import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import './styles.css';
import InputMask from 'react-input-mask';
import ErrorToolTip from '../ErrorTooltip';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon: React.ComponentType<IconBaseProps>;
    mask?: string;
    iconSize?: number;
    label: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({
    icon: Icon,
    name,
    label,
    mask,
    error,
    iconSize,
    ...rest
}) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <div className="input-container">
                <Icon size={iconSize ? iconSize : 20} />
                <InputMask name={name} id={name} mask={mask} {...rest} />
                {error && <ErrorToolTip title={error}/>}
            </div>
        </div>
    );
};

export default Input;
