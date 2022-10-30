import React, { useRef, useEffect } from 'react';
import ReactSelect, { Props as SelectProps } from 'react-select';
import OptionTypeBase from 'react-select';
import { useField } from '@unform/core';
import { selectStyles, CustomOption } from './styles';
import ErrorToolTip from '../ErrorTooltip';
interface Props extends SelectProps<OptionTypeBase> {
    name: string;
    label: string;
}

interface OptionType {
    value: string;
    label: string;
}

export default function Select({ name, label, ...rest }: Props) {
    const selectRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            getValue: (ref: any) => {
                if (ref.state.selectValue) {
                    if (!ref.state.selectValue) {
                        return [];
                    }
                    return ref.state.selectValue.map((option: OptionType) => {
                        return { code: option.value, label: option.label };
                    });
                }
                if (!ref.state.selectValue) {
                    return '';
                }
                return ref.state.selectValue.value;
            },
        });
    }, [fieldName, registerField, rest.isMulti]);

    return (
        <>
            <label>{label}</label>
            {error && <div>{error}</div>}
            <ReactSelect
                defaultValue={defaultValue}
                styles={selectStyles}
                closeMenuOnSelect={false}
                ref={selectRef}
                classNamePrefix="react-select"
                {...rest}
            />
        </>
    );
}
