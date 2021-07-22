import React from 'react';
import { Text } from 'components/layout';
import { InputWrapper, SelectDropdown, Column, Input } from './styled';

export default function CurrencyInput() {
    const options = [
        { value: 'eur', label: "Euro" },
        { value: 'ron', label: "RON" },
        { value: 'usd', label: "USD" },
        { value: 'gbp', label: "GBP" },
    ];

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value;
        const unparsedValue = event.target.value.replace(/[^\d.]/g,'');
        if (unparsedValue.indexOf('.') > 0 && unparsedValue.length - 1 - unparsedValue.indexOf('.') >= 2) { 
            value = parseFloat(unparsedValue).toFixed(2);
        } else if (unparsedValue.indexOf('.') === unparsedValue.length - 1) {
            value = unparsedValue;
        } else {
            value = parseFloat(unparsedValue)
        }
        
        if (!value) {
            event.target.value = '';
            return;
        }
        event.target.value = `-${value}`;
    };

    return (
        <InputWrapper>
            <Column>
                <SelectDropdown options={options} />
                <Text size={12}>Balance: $ 20</Text>
            </Column>
            <Column>
                <Input placeholder="0.00" onChange={onChange} />
            </Column>
        </InputWrapper>
    );
} 
