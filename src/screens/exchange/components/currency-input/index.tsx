import { AccountContext } from 'contexts/accounts';
import { INPUT_TYPES } from 'contexts/accounts/enums';
import React, { useContext } from 'react';
import removeNonNumericCharacters from 'utils/removeNonNumericCharacters';
import { IExchanger } from '../exchanger/hooks/useExchanger';
import { Input, Wrapper, ErrorText } from './styled';

interface IProps {
    exchanger: IExchanger;
    type: INPUT_TYPES;
}

export default function CurrencyInput({ exchanger, type }: IProps) {
    const { state } = useContext(AccountContext);
    const inputSymbol = type === INPUT_TYPES.FROM ? "-" : "+";
    const input = type === "from" ? exchanger.fromInput : exchanger.toInput;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value;
        // remove all non-number characters (except .)
        const unparsedValue = removeNonNumericCharacters(event.target.value);
        // if there is . and it has more then 2 decimals after it, don't allow others decimals (and return to stop rerendering)
        if (unparsedValue.indexOf('.') > 0 && unparsedValue.length - 1 - unparsedValue.indexOf('.') >= 3) { 
            return;
        } else if (unparsedValue.indexOf('.') === unparsedValue.length - 1) {
            // if there is . but nothing after it, let it as it is
            value = unparsedValue;
        } else {
            // otherwise parse the number as float
            value = parseFloat(unparsedValue)
        }
        if (!value) {
            exchanger.onInputChange(type, '0');
            return;
        }
        exchanger.onInputChange(type, value.toString());
    };

    const isError = () => {
        return type === INPUT_TYPES.FROM && parseFloat(input.amount) > state[input.currency];
    };

    return (
        <Wrapper>
            <Input placeholder="0.00" onChange={onChange} value={`${input.amount !== "0" ? inputSymbol : ''}${input.amount}`} />
            { isError() && <ErrorText size={10}>Balance exceeded</ErrorText> }
        </Wrapper>
    );
}
