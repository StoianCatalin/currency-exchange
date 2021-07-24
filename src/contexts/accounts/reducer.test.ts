import React from 'react';
import { AddCurrencyAction, SubtractCurrencyAction } from './actions';
import { CURRENCY_SYMBOLS } from './enums';
import { accountsReducer, initialState } from './reducer';

describe("Accounts Reducer", () => {
    it('should add currency when ADD_CURRENCY action is dispatch', () => {
        // Given
        const payload = {
            currency: CURRENCY_SYMBOLS.RON,
            amount: 20
        };
        // When
        const state = accountsReducer(initialState, new AddCurrencyAction(payload));
        // Then
        expect(state.ron).toBe(20);
    });

    it('should subtract currency when SUBTRACT_CURRENCY action is dispatch', () => {
        // Given
        const payload = {
            currency: CURRENCY_SYMBOLS.EUR,
            amount: 30
        };
        // When
        const state = accountsReducer(initialState, new SubtractCurrencyAction(payload));
        // Then
        expect(state.eur).toBe(170);
    });

    it('should return state without modification if unknown action is triggered', () => {
        // Given
        const unknownAction = { type: "unknown", payload: {} } as any;
        // When
        const state = accountsReducer(initialState, unknownAction);
        // Then
        expect(state).toEqual(initialState);
    });
});
