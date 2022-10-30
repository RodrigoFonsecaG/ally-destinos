interface ISelectOptions {
    value: string;
    label: string;
    code?: string;
}

interface IFormProps {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    countries: Array<ISelectOptions>;
    cities: Array<ISelectOptions>;
}

interface ICountriesProps {
    code: string;
    name: string;
    name_ptbr?: string;
    country_code: string;
}

interface ICitiesProps {
    id: number;
    code: string;
    name: string;
    country_code: string;
    created_at: Date;
    updated_at: Date;
    name_ptbr?: string;
    lat?: string;
    log?: string;
    url1?: string;
    url2?: string;
}

export type { ISelectOptions, IFormProps, ICitiesProps, ICountriesProps };
