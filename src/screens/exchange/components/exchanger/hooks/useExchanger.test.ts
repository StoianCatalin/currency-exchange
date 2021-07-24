import React from 'react';
import { CURRENCY_SYMBOLS, INPUT_TYPES } from "contexts/accounts/enums";
import { renderHook, act } from '@testing-library/react-hooks'
import mock_ratesResponse from "mock_data/rates_mock";
import useExchanger from "./useExchanger";
import CURRENCIES from "constants/currencies";
import { initialState } from 'contexts/accounts/reducer';

jest.mock('./useRates.ts', () => {
    const rates = { ...mock_ratesResponse.conversion_rates };
    return () => ({
        rates,
        setCurrency: jest.fn()
    });
});

describe("useExchanger", () => {
    let useContextMock: any;
    let dispatchMock: any;
    beforeEach(() => {
        dispatchMock = jest.fn();
        useContextMock = React.useContext = jest.fn();
        useContextMock.mockReturnValue({
            state: initialState,
            dispatch: dispatchMock
        });
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it("should have default currencies eur and usd", async () => {
        // When
        const { result } = renderHook(() => useExchanger());
        // Then
        expect(result.current.fromInput.currency).toBe(CURRENCY_SYMBOLS.EUR);
        expect(result.current.toInput.currency).toBe(CURRENCY_SYMBOLS.USD);
    });
    
    describe("switchCurrencies", () => {
        it("should switch currencies", async () => {
            // When
            const { result, rerender } = renderHook(() => useExchanger());
            act(() => {
                result.current.switchCurrencies();
                rerender();
            });
            // Then
            expect(result.current.fromInput.currency).toBe(CURRENCY_SYMBOLS.USD);
            expect(result.current.toInput.currency).toBe(CURRENCY_SYMBOLS.EUR);
        });
    });

    describe("onChangeCurrency", () => {
        it("should should update the currency", async () => {
            // When
            const { result, rerender } = renderHook(() => useExchanger());
            act(() => {
                result.current.onChangeCurrency(CURRENCIES[1], INPUT_TYPES.FROM);
                rerender();
            });
            // Then
            expect(result.current.fromInput.currency).toBe(CURRENCY_SYMBOLS.RON);
        });

        it("should interchange the currency if the currency FROM is the same with TO", async () => {
            // When
            const { result, rerender } = renderHook(() => useExchanger());
            act(() => {
                result.current.onChangeCurrency(CURRENCIES[2], INPUT_TYPES.FROM);
                rerender();
            });
            // Then
            expect(result.current.fromInput.currency).toBe(CURRENCY_SYMBOLS.USD);
            expect(result.current.toInput.currency).toBe(CURRENCY_SYMBOLS.EUR);
        });
    });

    describe("onInputChange", () => {
        it("should update the value of fromInput and toInput according to the rates", async () => {
            // Given
            const value = "100";
            const expectedResult = parseFloat(value) * mock_ratesResponse.conversion_rates["USD"];
            // When
            const { result, rerender } = renderHook(() => useExchanger());
            act(() => {
                result.current.onInputChange(INPUT_TYPES.FROM, value);
                rerender();
            });
            // Then
            expect(result.current.fromInput.amount).toBe(value);
            expect(result.current.toInput.amount).toBe(expectedResult.toFixed(2));
        });

        it("should update the value of toInput and fromInput according to the rates", async () => {
            // Given
            const value = "100";
            const expectedResult = parseFloat(value) / mock_ratesResponse.conversion_rates["USD"];
            // When
            const { result, rerender } = renderHook(() => useExchanger());
            act(() => {
                result.current.onInputChange(INPUT_TYPES.TO, value);
                rerender();
            });
            // Then
            expect(result.current.toInput.amount).toBe(value);
            expect(result.current.fromInput.amount).toBe(expectedResult.toFixed(2));
        });
    });

    describe("makeTransaction", () => {
        it("should reset inputs after transaction", async () => {
            // Given
            const value = "100";
            // When
            const { result, rerender } = renderHook(() => useExchanger());
            act(() => {
                result.current.onInputChange(INPUT_TYPES.FROM, value);
                rerender();
            });
            act(() => {
                result.current.makeTransaction();
                rerender();
            })
            // Then
            expect(dispatchMock).toBeCalled();
            expect(result.current.toInput.amount).toBe("0");
            expect(result.current.fromInput.amount).toBe("0");
        });

        it("should not allow transaction if value exceed the budget", async () => {
            // Given
            const value = "250";
            // When
            const { result, rerender } = renderHook(() => useExchanger());
            act(() => {
                result.current.onInputChange(INPUT_TYPES.FROM, value);
                rerender();
            });
            act(() => {
                result.current.makeTransaction();
                rerender();
            })
            // Then
            expect(dispatchMock).not.toBeCalled();
        });

        it("should not allow transaction one of the inputs are 0", async () => {
            // When
            const { result, rerender } = renderHook(() => useExchanger());
            act(() => {
                result.current.makeTransaction();
                rerender();
            })
            // Then
            expect(dispatchMock).not.toBeCalled();
        });
    });

});
