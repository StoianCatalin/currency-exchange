import renderer from 'react-test-renderer';
import CURRENCIES from 'constants/currencies';
import { CURRENCY_SYMBOLS, INPUT_TYPES } from 'contexts/accounts/enums';
import React from 'react';
import CurrencyField from '.';
import { IExchanger } from '../exchanger/hooks/useExchanger';
import { SelectDropdown } from './styled';

describe("CurrencyField", () => {
    let exchangerMock: IExchanger;

    beforeEach(() => {
        exchangerMock = ({
            onChangeCurrency: jest.fn(),
            fromInput: { currency: CURRENCY_SYMBOLS.EUR, amount: 0 }
        }) as any;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", () => {
        // When
        const component = renderer.create(
            <CurrencyField
                currencies={CURRENCIES}
                type={INPUT_TYPES.FROM}
                exchanger={exchangerMock}
            />
        );
        // Then
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should change the curreny on selection", () => {
        // Given
        const component = renderer.create(
            <CurrencyField
                currencies={CURRENCIES}
                type={INPUT_TYPES.FROM}
                exchanger={exchangerMock}
            />
        );
        const instance = component.root;
        const selectDropdown = instance.findByType(SelectDropdown);
        // When
        expect(selectDropdown.props.value).toEqual(CURRENCIES[0]); // EUR
        selectDropdown.props.onChange(CURRENCIES[1]); // RON
        // Then
        expect(exchangerMock.onChangeCurrency).toBeCalledWith(CURRENCIES[1], INPUT_TYPES.FROM);
    });

    it("should return null if the currency is not found", () => {
        // Given
        exchangerMock.fromInput.currency = "UNKNOWN" as any;
        // When
        const component = renderer.create(
            <CurrencyField
                currencies={CURRENCIES}
                type={INPUT_TYPES.FROM}
                exchanger={exchangerMock}
            />
        );
        // Then
        expect(component.getInstance()).toBe(null);
    });
});
