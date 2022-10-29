import React, { useState } from 'react';
import * as Yup from 'yup';
import getValidationErrors from '../utils/getValidationError';

interface FormProps {
    name: string;
    email: string;
    phone: number;
    cpf: number;
    country: any;
    city: any;
}


const useForm = () => {

        const [formError, setFormError] = useState<FormProps>({});

        async function handleSubmit(event, form) {
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

                   console.log(form);

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


    return {
        handleSubmit,
        formError
    };
};

export default useForm;
