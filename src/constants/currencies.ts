import { CURRENCY_SYMBOLS } from "contexts/accounts/enums";
import Currency from "interfaces/currency";

const CURRENCIES: Currency[] = [
    { value: CURRENCY_SYMBOLS.EUR, label: "Euro", symbol: '€' },
    { value: CURRENCY_SYMBOLS.RON, label: "RON", symbol: 'RON' },
    { value: CURRENCY_SYMBOLS.USD, label: "USD", symbol: '$' },
    { value: CURRENCY_SYMBOLS.GBP, label: "GBP", symbol: '£' },
];

export default CURRENCIES;
