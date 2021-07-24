import { AccountContext } from "contexts/accounts";
import { AddCurrencyAction, SubtractCurrencyAction } from "contexts/accounts/actions";
import { CURRENCY_SYMBOLS, INPUT_TYPES } from "contexts/accounts/enums";
import ICurrency from "interfaces/currency";
import React, { useContext, useState } from "react";
import { ExchangeRateResponse } from "services/exchange-rate/types";
import calculateValueBasedOnRate from "../utils/calculateValueBasedOnRate";
import useRates from "./useRates";

interface IInputState {
    currency: CURRENCY_SYMBOLS;
    amount: string;
}

export interface IExchanger {
    fromInput: IInputState;
    toInput: IInputState;
    rates: ExchangeRateResponse["conversion_rates"];
    onChangeCurrency: (newCurrency: ICurrency, type: INPUT_TYPES) => void;
    switchCurrencies: () => void;
    makeTransaction: () => void;
    onInputChange: (type: INPUT_TYPES, value: string) => void;
}

export default function useExchanger(): IExchanger {
    const { state, dispatch } = useContext(AccountContext);
    const [fromInput, setFromInput] = useState({ currency: CURRENCY_SYMBOLS.EUR, amount: "0" });
    const [toInput, setToInput] = useState({ currency: CURRENCY_SYMBOLS.USD, amount: "0" });
    const { rates, setCurrency } = useRates(fromInput.currency);

    /*
    Function used to change the currency for a input in exchanger.
    * @param {ICurrency} newCurrency
    * @param {"from"|"to"} type
    */
    function onChangeCurrency(newCurrency: ICurrency, type: INPUT_TYPES) {
        switch(type) {
            case INPUT_TYPES.FROM:
                if (newCurrency.value === toInput.currency) {
                    setToInput({ ...toInput, currency: fromInput.currency });
                }
                setFromInput({ ...fromInput, currency: newCurrency.value});
                setCurrency(newCurrency.value);
                break;
            case INPUT_TYPES.TO:
                if (newCurrency.value === fromInput.currency) {
                    setFromInput({ ...toInput, currency: toInput.currency });
                }
                setToInput({ amount: calculateValueBasedOnRate(rates, fromInput.amount, newCurrency.value), currency: newCurrency.value});
                break;
            default:
                break;
        }
    };

    /*
    Function used to interchange the currencies between inputs.
    */
    function switchCurrencies() {
        setCurrency(toInput.currency);
        setFromInput({ ...toInput });
        setToInput({ ...fromInput });
    };

    /* 
    Function that will handle when one of the inputs are changed (From or To input)
    */
    function onInputChange(type: INPUT_TYPES, value: string) {
        switch(type) {
            case INPUT_TYPES.FROM:
                setFromInput({ ...fromInput, amount: value});
                setToInput({ ...toInput, amount: calculateValueBasedOnRate(rates, value, toInput.currency) });
                break;
            case INPUT_TYPES.TO:
                setFromInput({ ...fromInput, amount: calculateValueBasedOnRate(rates, value, toInput.currency, true) })
                setToInput({ ...toInput, amount: value});
                break;
            default:
                break;
        }
    }

    /* 
    Function used to validate and execute the transaction.
    */
    function makeTransaction() {
        if (parseFloat(fromInput.amount) > state[fromInput.currency]) {
            return;
        }
        if (fromInput.amount === "0" || toInput.amount === "0") {
            return;
        }
        dispatch(new SubtractCurrencyAction({
            currency: fromInput.currency,
            amount: parseFloat(fromInput.amount)
        }));
        dispatch(new AddCurrencyAction({
            currency: toInput.currency,
            amount: parseFloat(toInput.amount)
        }));
        resetInputs();
    }

    function resetInputs() {
        setFromInput({ ...fromInput, amount: "0" });
        setToInput({ ...toInput, amount: "0" });
    }

    return {
        fromInput,
        toInput,
        rates,
        onChangeCurrency,
        switchCurrencies,
        onInputChange,
        makeTransaction
    };
}
