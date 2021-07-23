
export type CURRENCY_SYMBOLS = "eur"|"usd"|"gbp"|"ron";

export interface IChangeAmountCurrencyPayload {
    currency: CURRENCY_SYMBOLS;
    amount: number;
}
