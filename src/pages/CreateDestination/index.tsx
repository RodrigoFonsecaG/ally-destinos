import React, { useCallback, useEffect, useRef, useState } from 'react';

import SideContent from '../../components/SideContent';
import './styles.css';
import allyLogo from '../../assets/ally-logo.png';
import Input from '../../components/Input';
import { FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { MdOutlineBadge } from 'react-icons/md';
import { useFetch } from '../../hooks/useFetch';
import { selectStyles, CustomOption } from '../../components/Select/styles';
import Select from 'react-select';
import Button from '../../components/Button';

import useForm from '../../hooks/useForm';
import { Form } from '@unform/web';
import ReactSelect from '../../components/Select/ReactSelect';

import schemaForm from '../../schemas/schemaForm';

import * as Yup from 'yup';

interface selectOptionsProps {
    value: string;
    label: string;
}

interface FormProps {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    country: any;
    city: any;
}

const CreateDestination: React.FC = () => {
    const { data: countries, isFetching, error } = useFetch('/country');
    const { data: cities } = useFetch('/city');
    const formRef = useRef(null);

    console.log(countries);
    console.log(cities);

    const { formError, handleSubmit } = useForm();

    function getSelectOptions(data) {
        const options: selectOptionsProps[] = [];

        data.map((data) => {
            options.push({
                value: data.code,
                label: data.name,
            });
        });

        return options;
    }

    const [filteredCities, setFilteresCities] = useState([]);

    async function onSubmit(data) {
        try {
            // Remove all previous errors
            formRef?.current?.setErrors({});
            
            await schemaForm.validate(data, {
                abortEarly: false,
            });
            // Validation passed
            console.log(data);
        } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                formRef?.current?.setErrors(validationErrors);
            }
        }
    }

    function onSelectFocus() {
        let countryCode = [];
        let countries = formRef?.current?.getFieldRef('countries').props.value;

        countries.map((country) => {
            countryCode.push(country.value);
        });

        const filteredCities = cities.filter((city) => {
            return countryCode.includes(city.country_code);
        });

        setFilteresCities(filteredCities);
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
                            icon={FiUser}
                            placeholder="Digite seu nome"
                            mask={null}
                            error={formError.name}
                        />

                        <Input
                            name="email"
                            label="E-mail"
                            icon={FiMail}
                            placeholder="exemplo@email.com"
                            type="email"
                            error={formError.email}
                        />

                        <div className="input-group">
                            <Input
                                name="phone"
                                label="Telefone"
                                icon={FiPhone}
                                placeholder="(XX) XXXXX-XXXX"
                                mask="(99) 99999-9999"
                                error={formError.phone}
                            />

                            <Input
                                name="cpf"
                                label="CPF"
                                icon={MdOutlineBadge}
                                iconSize={23}
                                placeholder="XXX.XXX.XXX-XX"
                                mask="999.999.999-99"
                                error={formError.cpf}
                            />
                        </div>

                        <div>
                            <label>País</label>
                            {formError.country}
                            <ReactSelect
                                name="countries"
                                placeholder="Selecione o país"
                                isMulti
                                options={getSelectOptions(countries)}
                                components={{ Option: CustomOption }}
                                noOptionsMessage={() =>
                                    'Sem países disponíveis!'
                                }
                            />
                        </div>
                        <div>
                            <label>Cidade</label>
                            {formError.city}
                            <ReactSelect
                                name="cities"
                                placeholder="Selecione a cidade"
                                isMulti
                                options={getSelectOptions(filteredCities)}
                                noOptionsMessage={() =>
                                    'Sem cidades disponíveis!'
                                }
                                onFocus={onSelectFocus}
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
