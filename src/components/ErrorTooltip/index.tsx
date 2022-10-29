import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import './styles.css'

interface TooltipProps {
    title: string;
}

const ErrorToolTip: React.FC<TooltipProps> = ({ title }) => {
    return (
        <div className='error-container'>
            <div className='error'>
                <FiAlertCircle color="#c53030" size={20} />
            </div >
            <span>{title}</span>
        </div>
    );
};

export default ErrorToolTip;
