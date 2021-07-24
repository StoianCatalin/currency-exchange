import { CURRENCY_SYMBOLS } from "contexts/accounts/enums";

export default interface ICurrency {
    value: CURRENCY_SYMBOLS;
    label: string;
    symbol: string;
}
