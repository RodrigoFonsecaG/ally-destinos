import * as Yup from 'yup';

const schemaForm = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório'),
    email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),
    phone: Yup.string()
        .required('Telefone obrigatório')
        .matches(
            /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
            'Digite um telefone válido',
        ),
    cpf: Yup.string()
        .required('CPF obrigatório')
        .matches(
            /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/,
            'Digite um CPF válido',
        ),
    countries: Yup.array()
        .min(1, 'Selecione pelo menos 1 país')
        .required('Selecione pelo menos 1 país'),
    cities: Yup.array()
        .min(1, 'Selecione pelo menos uma cidade')
        .required('Selecione pelo menos uma cidade'),
});

export default schemaForm;
