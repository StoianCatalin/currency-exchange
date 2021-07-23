import React, { MutableRefObject } from 'react';
import { IExchanger } from '../exchanger/hooks/useExchanger';
import { Input, Wrapper, ErrorText } from './styled';

interface IProps {
    exchanger: IExchanger;
    type: "from"|"to";
}

export default function CurrencyInput({ exchanger, type }: IProps) {
    const inputSymbol = type === "from" ? "-" : "+";
    const input = type === "from" ? exchanger.fromInput : exchanger.toInput;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value;
        // remove all non-number characters (except .)
        const unparsedValue = event.target.value.replace(/[^\d.]/g,'');
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
       
        exchanger.onInputChange(type, `${inputSymbol}${value}`);
        // event.target.value = `${inputSymbol}${value}`;
    };

    return (
        <Wrapper>
            <Input placeholder="0.00" onChange={onChange} value={input.amount} />
            <ErrorText size={10}>Balance exceeded</ErrorText>
        </Wrapper>
    );
}
