import React, { useRef, useEffect } from 'react';
import ReactSelect, { Props as SelectProps } from 'react-select';
import OptionTypeBase from 'react-select';
import { useField } from '@unform/core';
import { selectStyles, CustomOption } from './styles';
interface Props extends SelectProps<OptionTypeBase> {
    name: string;
}
export default function Select({ name, ...rest }: Props) {
    const selectRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    console.log(selectRef);
    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            getValue: (ref: any) => {
                console.log(ref.state.selectValue);

                if (ref.state.selectValue) {
                    if (!ref.state.selectValue) {
                        return [];
                    }
                    return ref.state.selectValue.map(
                        (option: OptionTypeBase) => {
                            console.log(option);
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
        <ReactSelect
            defaultValue={defaultValue}
            styles={selectStyles}
            closeMenuOnSelect={false}
            ref={selectRef}
            classNamePrefix="react-select"
            {...rest}
        />
    );
}
