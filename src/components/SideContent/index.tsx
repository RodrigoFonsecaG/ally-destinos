import React from 'react';
import travelIllustration from '../../assets/travel.png';
import './styles.css';

interface SideContentProps{
    title: string;
    subtitle: string;
}

const SideContent: React.FC<SideContentProps> = ({title, subtitle}) => {
    return (
        <div className="side-content-container">
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <img src={travelIllustration} alt="Casal planejando viagem" />
        </div>
    );
};

export default SideContent;
