
export interface ExchangeRateResponse {
    result: string;
    base_code: string;
    conversion_rates: {
        [key: string]: number;
    }
}
