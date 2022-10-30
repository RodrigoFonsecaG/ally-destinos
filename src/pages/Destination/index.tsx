import React from 'react';
import SideContent from '../../components/SideContent';
import './styles.css';
import allyLogo from '../../assets/ally-logo.png';
import Card from '../../components/Card';

const Destination = () => {
    return (
        <div className="container" id="destinations">
            <SideContent
                title="Esses são seus próximos destinos!"
                subtitle="Já preparamos seus tickets de viagens, agora é só embarcar!"
            />
            <div className="container-wrapper">
                <img src={allyLogo} alt="Ally Hub" />

                <div className="cards">

                    <Card country='Brasil' cpf='703.543.426-73' phone='(38) 99999-9999' user='Rodrigo Fonseca' city='Montes Claros, Minas Gerais, Brasil'/>

                </div>
            </div>
        </div>
    );
};

export default Destination;
