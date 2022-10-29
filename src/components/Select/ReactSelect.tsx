import React, { useRef, useEffect } from 'react';
import ReactSelect, { Props as SelectProps } from 'react-select';
import OptionTypeBase from 'react-select';
import { useField } from '@unform/core';
import { selectStyles, CustomOption } from './styles';
import ErrorToolTip from '../ErrorTooltip';
interface Props extends SelectProps<OptionTypeBase> {
    name: string;
}
export default function Select({ name, ...rest }: Props) {
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
                    return ref.state.selectValue.map(
                        (option: OptionTypeBase) => {
                            return { code: option.value, label: option.label };
                        },
                    );
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
