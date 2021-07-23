import CURRENCIES from 'constants/currencies';
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
                type="from"
                currencies={CURRENCIES}
                exchanger={exchanger}
            />
            <CurrencySwitchButton onClick={exchanger.switchCurrencies} />
            <CurrencyInput
                type="to"
                currencies={CURRENCIES}
                exchanger={exchanger}
            />
        </>
    );
}
