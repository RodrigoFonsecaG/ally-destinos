// @ts-nocheck
import React from 'react';

import ReactCountryFlag from 'react-country-flag';
import { components } from 'react-select';

export const selectStyles = {
    container: (styles) => {
        return {
            ...styles,
            margin: '0.8rem 0 2rem 0',
        };
    },

    control: (styles, { isFocused }) => {
        return {
            ...styles,
            border: isFocused
                ? '1px solid var(--light-red) !important'
                : '1px solid var(--dark-gray) !important',
            boxShadow: 0,
            padding: '0.8rem',
        };
    },
    option: (styles, { isFocused }) => {
        return {
            ...styles,
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            backgroundColor: isFocused ? 'var(--red)' : 'var(--white)',
            color: isFocused ? 'var(--white)' : 'var(--black)',
            ':hover': {
                backgroundColor: 'var(--red)',
                color: 'var(--white)',
            },

            ':active': {
                backgroundColor: 'var(--red)',
                color: 'var(--white)',
            },
        };
    },

    multiValue: (styles) => {
        return {
            ...styles,
            backgroundColor: 'var(--red)',
            color: 'var(--white)',
        };
    },

    multiValueLabel: (styles) => {
        return {
            ...styles,
            color: 'var(--white)',
        };
    },
};

const { Option } = components;

export const CustomOption = (props) => (
    <Option {...props}>
        <ReactCountryFlag countryCode={props.data.value} svg />
        {props.data.label}
    </Option>
);
