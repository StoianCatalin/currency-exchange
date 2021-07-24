import CURRENCIES from 'constants/currencies';
import { INPUT_TYPES } from 'contexts/accounts/enums';
import CurrencyInput from '../currency-field';
import CurrencySwitchButton from '../currency-switch-button';
import { IExchanger } from './hooks/useExchanger';

interface IProps {
    exchanger: IExchanger;
}

export default function Exchanger({ exchanger }: IProps) {
    return (
        <>
            <CurrencyInput
                type={INPUT_TYPES.FROM}
                currencies={CURRENCIES}
                exchanger={exchanger}
            />
            <CurrencySwitchButton onClick={exchanger.switchCurrencies} />
            <CurrencyInput
                type={INPUT_TYPES.TO}
                currencies={CURRENCIES}
                exchanger={exchanger}
            />
        </>
    );
}
