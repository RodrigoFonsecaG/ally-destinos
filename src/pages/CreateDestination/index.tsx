import React, { useRef, useState } from 'react';

import './styles.css';
import SideContent from '../../components/SideContent';
import Button from '../../components/Button';
import allyLogo from '../../assets/ally-logo.png';
import Input from '../../components/Input';
import { FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { MdOutlineBadge } from 'react-icons/md';

import { useFetch } from '../../hooks/useFetch';
import { CustomOption } from '../../components/Select/styles';

import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationError';
import { Form } from '@unform/web';
import ReactSelect from '../../components/Select/ReactSelect';
import { FormHandles } from '@unform/core';
import schemaForm from '../../schemas/schemaForm';


import {
    ISelectOptions,
    IFormProps,
    ICitiesProps,
    ICountriesProps,
} from '../../dtos/IFormDTO';

const CreateDestination: React.FC = () => {
    const { data: countries, isFetching, error } = useFetch('/country');
    const { data: cities } = useFetch('/city');

    const formRef = useRef<FormHandles>(null);
    const [filteredCities, setFilteresCities] = useState<ICitiesProps[] | []>(
        [],
    );

    // A partir da API cria as opções para o select de paises ou cidades
    function getSelectOptions(data: ICountriesProps[] | ICitiesProps[]) {
        const options: ISelectOptions[] = [];

        data.map((data: ICountriesProps | ICitiesProps) => {
            options.push({
                value: data.code,
                label: data.name_ptbr || data.name,
            });
        });

        return options;
    }

    //Quando o select de cidades é aperta, a função filtra somente as cidades do pais selecionado
    function onCitiesSelectFocus() {
        let countryCode: Array<string> = [];
        let countries = formRef?.current?.getFieldRef('countries').props.value;

        countries.map((country: ISelectOptions) => {
            countryCode.push(country.value);
        });

        const filteredCities = cities.filter((city: ICitiesProps) => {
            return countryCode.includes(city.country_code);
        });

        setFilteresCities(filteredCities);
    }

    // No submit do botão, verifica se há erros no campo, se não cria um json no localStorage com os dados
    async function onSubmit(data: IFormProps) {
        try {
            if (formRef.current) {
                // Remove all previous errors
                formRef.current.setErrors({});

                await schemaForm.validate(data, {
                    abortEarly: false,
                });
            }
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }
        }
    }

    return (
        <div className="container">
            <div className="book-destination-container">
                <Form ref={formRef} onSubmit={onSubmit}>
                    <img src={allyLogo} alt="Ally Hub" />
                    <div className="form-fields">
                        <Input
                            name="name"
                            label="Nome"
                            placeholder="Digite seu nome"
                            icon={FiUser}
                        />

                        <Input
                            name="email"
                            label="E-mail"
                            type="email"
                            placeholder="exemplo@email.com"
                            icon={FiMail}
                        />

                        <div className="input-group">
                            <Input
                                name="phone"
                                label="Telefone"
                                placeholder="(XX) XXXXX-XXXX"
                                icon={FiPhone}
                                mask="(99) 99999-9999"
                            />

                            <Input
                                name="cpf"
                                label="CPF"
                                placeholder="XXX.XXX.XXX-XX"
                                icon={MdOutlineBadge}
                                iconSize={23}
                                mask="999.999.999-99"
                            />
                        </div>

                        <div>
                            <ReactSelect
                                name="countries"
                                placeholder="Selecione o país"
                                label="Países"
                                isMulti
                                options={getSelectOptions(countries)}
                                components={{ Option: CustomOption }}
                                noOptionsMessage={() =>
                                    'Sem países disponíveis!'
                                }
                            />
                        </div>
                        <div>
                            <ReactSelect
                                name="cities"
                                placeholder="Selecione a cidade"
                                label="Cidades"
                                isMulti
                                options={getSelectOptions(filteredCities)}
                                noOptionsMessage={() =>
                                    'Sem cidades disponíveis!'
                                }
                                onFocus={onCitiesSelectFocus}
                            />
                        </div>
                    </div>

                    <Button type="submit">Marcar destino</Button>
                </Form>
            </div>

            <SideContent
                title={'Marque seus destinos de interesse!'}
                subtitle={
                    '“Uma jornada de mil milhas deve começar com um único passo.”'
                }
            />
        </div>
    );
};

export default CreateDestination;
