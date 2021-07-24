import { useEffect, useRef, useState } from "react";
import ExchangeRateService from "services/exchange-rate";
import { ExchangeRateResponse } from "services/exchange-rate/types";

interface IRates {
    rates: ExchangeRateResponse["conversion_rates"];
    isLoading: boolean;
    setCurrency: (currency: string) => void;
}
const TIME_TO_REFRESH = 10000; // 10 seconds;

export default function useRates(token: string, refreshTime = TIME_TO_REFRESH): IRates {
    const [rates, setRates] = useState<ExchangeRateResponse["conversion_rates"]>({});
    const [currency, setCurrency] = useState<string>(token);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const timer = useRef<ReturnType<typeof setTimeout>|null>(null);
    const exchangeRateService = new ExchangeRateService();

    const fetchRates = async () => {
        setIsLoading(true);
        const { conversion_rates } = await exchangeRateService.getRate(currency);
        setRates(conversion_rates);
        setIsLoading(false);
    };

    // This will be executed each time rates is changed and will trigger a new timer for the next TIME_TO_REFRESH seconds.
    useEffect(() => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(async () => {
            const { conversion_rates } = await exchangeRateService.getRate(currency);
            setRates(conversion_rates);
        }, refreshTime);

        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        }
    }, [rates]);

    // This will be executed to updated the rates according with new from currency
    useEffect(() => {
        (async () => {
            await fetchRates();
        })();
    }, [currency]);

    return {
        rates,
        setCurrency,
        isLoading
    };
};
