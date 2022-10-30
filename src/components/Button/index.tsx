import React, { ButtonHTMLAttributes } from 'react'
import './styles.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return <button {...rest}>{children}</button>;
};

export default Button
