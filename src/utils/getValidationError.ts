import { ValidationError } from 'yup';

interface Errors {
    [key: string]: string;
}


export default function getValidationErrors(err: ValidationError): Errors {
    const validationErrors: Record<string, string> = {};

    err.inner.forEach((error) => {
        if (error.path === undefined) return;
        validationErrors[error.path] = error.message;
    });

    return validationErrors;
}
