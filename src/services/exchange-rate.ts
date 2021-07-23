import { environment } from "config/environment.local";

export default class ExchangeRate {

    private baseUrl = environment.exchangeRate.host;
    private apiKey = environment.exchangeRate.apiKey;

    async getRate(currency: string) {
        const response = await fetch(`${this.baseUrl}/${this.apiKey}/latest/${currency.toUpperCase()}`);
        return response.json();
    }
}
