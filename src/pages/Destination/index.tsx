import React from 'react';
import SideContent from '../../components/SideContent';
import './styles.css';
import allyLogo from '../../assets/ally-logo.png';
import Card from '../../components/Card';
import { IFormProps } from '../../dtos/IFormDTO';

interface IDestinations{
    city: string;
    country: string;
    countryCode: string;
}

const Destination = () => {

    const { cities, countries, cpf, name, phone }: IFormProps = JSON.parse(
        localStorage.getItem('data') || '{}',
    ); ;

    const destinations: IDestinations[] = []




    if (cities) {
            cities.map((city) => {
                return countries.filter((country) => {
                    if (
                        country.code ===
                        city.code!.substring(city.code!.length - 2)
                    ) {
                        destinations.push({
                            city: city.label,
                            country: country.label,
                            countryCode: country.code,
                        });
                    }
                });
            });
    }








    return (
        <div className="container" id="destinations">
            <SideContent
                title="Esses são seus próximos destinos!"
                subtitle="Já preparamos seus tickets de viagens, agora é só embarcar!"
            />
            <div className="container-wrapper">
                <img src={allyLogo} alt="Ally Hub" />

                <div className="cards">
                    {destinations.length !== 0 ?
                        destinations.map((destination) => (
                            <Card
                                country={destination.country.toUpperCase()}
                                cpf={cpf}
                                phone={phone}
                                user={name}
                                city={destination.city}
                                countryCode={destination.countryCode}
                            />
                        )) : <h1>Você ainda não adicionou nenhum destino :(</h1>}
                </div>
            </div>
        </div>
    );
};

export default Destination;
