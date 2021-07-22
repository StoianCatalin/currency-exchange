import React from 'react';
import { Text } from 'components/layout';
import { InputWrapper, SelectDropdown, Column } from './styled';
import CurrencyInput from '../currency-input';
import Currency from 'interfaces/currency';

interface Props {
    currencies: Currency[];
}

export default function CurrencyField({ currencies }: Props) {

    return (
        <InputWrapper>
            <Column>
                <SelectDropdown options={currencies} />
                <Text size={12}>Balance: $ 20</Text>
            </Column>
            <Column>
                <CurrencyInput />
            </Column>
        </InputWrapper>
    );
} 
