import React, { useEffect, useRef, useState } from 'react';

import SideContent from '../../components/SideContent';
import './styles.css';
import allyLogo from '../../assets/ally-logo.png';
import Input from '../../components/Input';
import { FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { MdOutlineBadge } from 'react-icons/md';
import { useFetch } from '../../hooks/useFetch';
import { selectStyles, CustomOption } from '../../components/Select/styles';
import AsyncSelect from 'react-select';
import Button from '../../components/Button';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationError';

interface selectOptionsProps {
    value: string;
    label: string;
}

interface FormProps {
    name: string;
    email: string;
    phone: number;
    cpf: number;
    country: any;
    city: any;
}

const CreateDestination: React.FC = () => {
    const { data: countries, isFetching, error } = useFetch('/country');
    const { data: cities } = useFetch('/city');

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        cpf: '',
        country: [],
        city: [],
    });

    const [filteredCities, setFilteresCities] = useState([]);

    function handleChange({ target }) {
        const { id, value } = target;
        setForm({ ...form, [id]: value });
    }

    function getSelectOptions(data) {
        const options: selectOptionsProps[] = [];


        data.map((data) => {
            options.push({
                value: data.code,
                label: data.name,
            });
        });

        return options
    }




    const [formError, setFormError] = useState<FormProps>({});

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório'),
                phone: Yup.string().required('Telefone obrigatório'),
                cpf: Yup.string().required('CPF obrigatório'),
                country: Yup.array().min(1, 'Selecione pelo menos 1 país'),
                city: Yup.array().min(1, 'Selecione pelo menos uma cidade'),
            });

            await schema.validate(form, {
                abortEarly: false,
            });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                setFormError(errors);
                return;
            }
        }
    }

    function handleSelect(value, field) {
        setForm({ ...form, [field]: value });
    }




    useEffect(() => {
        let countryCode = [];

        form.country.map((country) => {
            countryCode.push(country.value);
        });

        const filteredCities = cities.filter((city) => {
            return countryCode.includes(city.country_code);
        });

        setFilteresCities(filteredCities);
    }, [form.country]);

    console.log(form)

    return (
        <div className="container">
            <div className="book-destination-container">
                <form action="" onSubmit={handleSubmit}>
                    <img src={allyLogo} alt="Ally Hub" />
                    <div className="form-fields">
                        <Input
                            name="name"
                            label="Nome"
                            icon={FiUser}
                            placeholder="Digite seu nome"
                            value={form.name}
                            onChange={handleChange}
                            error={formError.name}
                        />

                        <Input
                            name="email"
                            label="E-mail"
                            icon={FiMail}
                            placeholder="exemplo@email.com"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            error={formError.email}
                        />

                        <div className="input-group">
                            <Input
                                name="phone"
                                label="Telefone"
                                icon={FiPhone}
                                placeholder="(XX) XXXXX-XXXX"
                                mask="(99) 99999-9999"
                                value={form.phone}
                                onChange={handleChange}
                                error={formError.phone}
                            />

                            <Input
                                name="cpf"
                                label="CPF"
                                icon={MdOutlineBadge}
                                iconSize={23}
                                placeholder="XXX.XXX.XXX-XX"
                                mask="999.999.999-99"
                                value={form.cpf}
                                onChange={handleChange}
                                error={formError.cpf}
                            />
                        </div>

                        <div>
                            <label>País</label>
                            {formError.country}
                            <AsyncSelect
                                placeholder="Selecione o país"
                                isMulti={true}
                                options={getSelectOptions(countries)}
                                styles={selectStyles}
                                closeMenuOnSelect={false}
                                components={{ Option: CustomOption }}
                                onChange={(value) =>
                                    handleSelect(value, 'country')
                                }
                                noOptionsMessage={() =>
                                    'Sem países disponíveis!'
                                }
                            />
                        </div>
                        <div>
                            <label>Cidade</label>
                            {formError.city}
                            <AsyncSelect
                                placeholder="Selecione o país"
                                isMulti={true}
                                options={getSelectOptions(filteredCities)}
                                styles={selectStyles}
                                onChange={(value) =>
                                    handleSelect(value, 'city')
                                }
                                closeMenuOnSelect={false}
                                noOptionsMessage={() =>
                                    'Sem cidades disponíveis!'
                                }
                            />
                        </div>
                    </div>

                    <Button type="submit">Marcar destino</Button>
                </form>
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
