import React from 'react'
import './styles.css';

interface ButtonProps {
    children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return <button {...rest}>{children}</button>;
};

export default Button
