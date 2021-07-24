import React, { useContext } from 'react';
import { Text } from 'components/layout';
import { InputWrapper, SelectDropdown, Column } from './styled';
import CurrencyInput from '../currency-input';
import ICurrency from 'interfaces/currency';
import { AccountContext } from 'contexts/accounts';
import { IExchanger } from '../exchanger/hooks/useExchanger';
import { INPUT_TYPES } from 'contexts/accounts/enums';

interface IProps {
    type: INPUT_TYPES;
    currencies: ICurrency[];
    exchanger: IExchanger;
}

export default function CurrencyField({ currencies, exchanger, type }: IProps) {
    const { state } = useContext(AccountContext);
    // Get current input from exchanger based on type;
    const currentInput = type === INPUT_TYPES.FROM ? exchanger.fromInput : exchanger.toInput;
    // Get associated currency of the input;
    const currentCurrency = currencies.find(currency => currency.value === currentInput.currency);
    if (!currentCurrency) {
        return null;
    }
    return (
        <InputWrapper>
            <Column>
                <SelectDropdown
                    options={currencies}
                    value={currentCurrency}
                    onChange={(value: ICurrency) => exchanger.onChangeCurrency(value, type)}
                />
                <Text size={12}>Balance: {currentCurrency.symbol}{state[currentCurrency.value].toFixed(2)}</Text>
            </Column>
            <Column>
                <CurrencyInput exchanger={exchanger} type={type} />
            </Column>
        </InputWrapper>
    );
} 
