import { AccountContext } from "contexts/accounts";
import ICurrency from "interfaces/currency";
import React, { MutableRefObject, useContext, useRef, useState } from "react";

interface IInputState {
    currency: string;
     amount: string;
}

export interface IExchanger {
    fromInput: IInputState;
    toInput: IInputState;
    onChangeCurrency: (newCurrency: ICurrency, type: "from"|"to") => void;
    switchCurrencies: () => void;
    onInputChange: (type: "from"|"to", value: string) => void;
}

export default function useExchanger(): IExchanger {
    const { state } = useContext(AccountContext);
    const [fromInput, setFromInput] = useState({ currency: 'eur', amount: "0" });
    const [toInput, setToInput] = useState({ currency: 'usd', amount: "0" });

    /*
    Function used to change the currency for a input in exchanger.
    * @param {ICurrency} newCurrency
    * @param {"from"|"to"} type
    */
    function onChangeCurrency(newCurrency: ICurrency, type: "from"|"to") {
        switch(type) {
            case "from":
                if (newCurrency.value === toInput.currency) {
                    setToInput({ ...toInput, currency: fromInput.currency });
                }
                setFromInput({ ...fromInput, currency: newCurrency.value});
                break;
            case "to":
                if (newCurrency.value === fromInput.currency) {
                    setFromInput({ ...toInput, currency: toInput.currency });
                }
                setToInput({ ...toInput, currency: newCurrency.value});
                break;
            default:
                break;
        }
    };

    /*
    Function used to interchange the currencies between inputs.
    */
    function switchCurrencies() {
        const fromValue = fromInput.currency;
        setFromInput({ ...fromInput, currency: toInput.currency });
        setToInput({ ...toInput, currency: fromValue });
    };

    function onInputChange(type: "from"|"to", value: string) {
        switch(type) {
            case "from":
                setFromInput({ ...fromInput, amount: value});
                break;
            case "to":
                setToInput({ ...toInput, amount: value});
                break;
            default:
                break;
        }
    }

    return {
        fromInput,
        toInput,
        onChangeCurrency,
        switchCurrencies,
        onInputChange
    };
}
