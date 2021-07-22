import React from 'react';
import { Input, Wrapper, ErrorText } from './styled';

export default function CurrencyInput() {

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value;
        // remove all non-number characters (except .)
        const unparsedValue = event.target.value.replace(/[^\d.]/g,'');
        // if there is . and it has more then 2 decimals after it, don't allow others decimals
        if (unparsedValue.indexOf('.') > 0 && unparsedValue.length - 1 - unparsedValue.indexOf('.') >= 2) { 
            value = parseFloat(unparsedValue).toFixed(2);
        } else if (unparsedValue.indexOf('.') === unparsedValue.length - 1) {
            // if there is . but nothing after it, let it as it is
            value = unparsedValue;
        } else {
            // otherwise parse the number as float
            value = parseFloat(unparsedValue)
        }
        
        if (!value) {
            event.target.value = '';
            return;
        }
        event.target.value = `-${value}`;
    };

    return (
        <Wrapper>
            <Input placeholder="0.00" onChange={onChange} />
            <ErrorText size={10}>Balance exceeded</ErrorText>
        </Wrapper>
    );
}
