import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { MdOutlineAirplaneTicket, MdOutlineFlight } from 'react-icons/md';
import './styles.css';

interface CardProps {
    country: string;
    user: string;
    cpf: string;
    phone: string;
    city: string;
    countryCode: string;
}

const Card: React.FC<CardProps> = ({
    country,
    user,
    cpf,
    phone,
    city,
    countryCode,
}) => {
    return (
        <div className="card">
            <div className="card-header">
                <MdOutlineAirplaneTicket size={35} />
                <h4>TICKET DE DESTINO</h4>
            </div>
            <div className="card-title">
                <ReactCountryFlag
                    countryCode={countryCode}
                    svg
                    style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem'
                    }}
                />
                <h2>{country}</h2>
            </div>

            <div className="card-infos">
                <div className="info">
                    <span>PASSAGEIRO</span>
                    <p>{user}</p>
                </div>

                <div className="info">
                    <span>CPF</span>
                    <p>{cpf}</p>
                </div>

                <div className="info">
                    <span>TELEFONE</span>
                    <p>{phone}</p>
                </div>

                <div className="info">
                    <span>DESTINO</span>
                    <p>{city}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
