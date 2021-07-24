import { ExchangeRateResponse } from "services/exchange-rate/types";
import removeNonNumericCharacters from "utils/removeNonNumericCharacters";

export default function calculateValueBasedOnRate(
    rates: ExchangeRateResponse["conversion_rates"],
    value: string,
    currency: string,
    reverse = false
    ): string {
    const unparsedValue = removeNonNumericCharacters(value);
    const num = reverse ?
        parseFloat(unparsedValue) / rates[currency.toUpperCase()] :
        parseFloat(unparsedValue) * rates[currency.toUpperCase()];
    if (num === 0) {
        return "0";
    }
    return `${num.toFixed(2)}`;
}
