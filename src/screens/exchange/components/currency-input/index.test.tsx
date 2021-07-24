import { CURRENCY_SYMBOLS, INPUT_TYPES } from 'contexts/accounts/enums';
import renderer from 'react-test-renderer';
import React from 'react';
import CurrencyInput from '.';
import { IExchanger } from '../exchanger/hooks/useExchanger';
import { ErrorText, Input } from './styled';


describe("CurrencyInput", () => {
    let exchangerMock: IExchanger;
    const fromInput = { currency: CURRENCY_SYMBOLS.EUR, amount: 0 };

    beforeEach(() => {
        exchangerMock = ({
            onInputChange: jest.fn().mockImplementation((type, value) => {
                fromInput.amount = value;
            }),
            fromInput
        }) as any;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });


    it("should render correctly", () => {
        // When
        const component = renderer.create(
            <CurrencyInput
                exchanger={exchangerMock}
                type={INPUT_TYPES.FROM}
            />
        );
        // Then
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe("onChange", () => {
        it("should remove non-numeric characters", () => {
            const component = renderer.create(
                <CurrencyInput
                    exchanger={exchangerMock}
                    type={INPUT_TYPES.FROM}
                />
            );
            const input = component.root.findByType(Input);
            const event = { target: { value: '-20' } } as any;
            input.props.onChange(event);
    
            expect(exchangerMock.onInputChange).toBeCalledWith(INPUT_TYPES.FROM, "20");
        });

        it("should keep the dot (.) if it is the last character", () => {
            const component = renderer.create(
                <CurrencyInput
                    exchanger={exchangerMock}
                    type={INPUT_TYPES.FROM}
                />
            );
            const input = component.root.findByType(Input);
            const event = { target: { value: '-20.' } } as any;
            input.props.onChange(event);
    
            expect(exchangerMock.onInputChange).toBeCalledWith(INPUT_TYPES.FROM, "20.");
        });

        it("should don't allow for multiple dots", () => {
            const component = renderer.create(
                <CurrencyInput
                    exchanger={exchangerMock}
                    type={INPUT_TYPES.FROM}
                />
            );
            const input = component.root.findByType(Input);
            const event = { target: { value: '-20..' } } as any;
            input.props.onChange(event);
    
            expect(exchangerMock.onInputChange).toBeCalledWith(INPUT_TYPES.FROM, "20");
        });

        it("should return maximum 2 decimals after the .", () => {
            const component = renderer.create(
                <CurrencyInput
                    exchanger={exchangerMock}
                    type={INPUT_TYPES.FROM}
                />
            );
            const input = component.root.findByType(Input);
            const event = { target: { value: '-20.321' } } as any;
            input.props.onChange(event);
    
            expect(exchangerMock.onInputChange).not.toBeCalled();
        });
    });

    describe("isError", () => {
        it("should return false if amount is below the state value", () => {
            const component = renderer.create(
                <CurrencyInput
                    exchanger={exchangerMock}
                    type={INPUT_TYPES.FROM}
                />
            );
            expect(() => {
                component.root.findByType(ErrorText)
            }).toThrowError();
        });

        it("should return true if amount is above the state value", () => {
            exchangerMock.fromInput.amount = 210;
            const component = renderer.create(
                <CurrencyInput
                    exchanger={exchangerMock}
                    type={INPUT_TYPES.FROM}
                />
            );
            const element = component.root.findByType(ErrorText);
            expect(element).toBeTruthy();
        });
    });
});
