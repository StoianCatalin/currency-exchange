import { CURRENCY_SYMBOLS } from "contexts/accounts/enums";
import useRates from "./useRates";
import { renderHook, act } from '@testing-library/react-hooks'
import { waitFor } from "@testing-library/react";
import ExchangeRateService from 'services/exchange-rate';
import ratesResponse from "mock_data/rates_mock";

describe("useRates", () => {
    const getRateMock = jest.fn();

    beforeAll(() => {
        ExchangeRateService.prototype.getRate = getRateMock;
    });

    beforeEach(() => {
        getRateMock.mockReturnValue(ratesResponse);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it("should return rates", async () => {
        // Given
        const currency = CURRENCY_SYMBOLS.EUR;
        // When
        const { result, rerender } = renderHook(() => useRates(currency));
        // Then
        await waitFor(() =>
            expect(result.current.rates).toEqual(ratesResponse.conversion_rates)
        );
    });

    it("should trigger another call when the currency is changed", async () => {
        // Given
        const currency = CURRENCY_SYMBOLS.EUR;
        // When
        const { result, rerender } = renderHook(() => useRates(currency));
        
        act(() => { result.current.setCurrency(CURRENCY_SYMBOLS.USD) });
        // Then
        await waitFor(() =>
            expect(getRateMock).toBeCalledTimes(2)
        );
    });

    it("should refresh rates each X seconds", async () => {
        // Given
        const XSeconds = 1000; // one second for the timing reasons.
        const currency = CURRENCY_SYMBOLS.EUR;
        // When
        const { result } = renderHook(() => useRates(currency, XSeconds));
        // Then
        setTimeout(() => {
            expect(getRateMock).toBeCalledTimes(6); // One time from the initialization time, 5 times after 5 seconds.
        }, 5000);
    });
});
