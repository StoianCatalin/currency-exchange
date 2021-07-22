
export type CURRENCY_SYMBOLS = "eur"|"usd"|"gbp"|"ron";

export interface ChangeAmountCurrencyPayload {
    currency: CURRENCY_SYMBOLS;
    amount: number;
}
