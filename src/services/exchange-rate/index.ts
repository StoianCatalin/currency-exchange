import { environment } from "config/environment.local";
import { ExchangeRateResponse } from "./types";

export default class ExchangeRateService {

    private baseUrl = environment.exchangeRate.host;
    private apiKey = environment.exchangeRate.apiKey;

    async getRate(currency: string): Promise<ExchangeRateResponse> {
        const response = await fetch(`${this.baseUrl}/${this.apiKey}/latest/${currency.toUpperCase()}`);
        return response.json();
    }
}
