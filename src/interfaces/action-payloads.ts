import { CURRENCY_SYMBOLS } from "contexts/accounts/enums";

export interface IChangeAmountCurrencyPayload {
    currency: CURRENCY_SYMBOLS;
    amount: number;
}
