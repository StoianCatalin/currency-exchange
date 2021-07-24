import { ActionBase, ACTIONS } from "./actions";

export interface AccountsState {
    eur: number;
    ron: number;
    usd: number;
    gbp: number;
}

export const initialState: AccountsState = {
    eur: 200,
    ron: 0,
    usd: 0,
    gbp: 0
}

export function accountsReducer(state: AccountsState, action: ActionBase) {
    const { currency, amount } = action?.payload;
    switch(action.type) {
        case ACTIONS.SUBTRACT_CURRENCY:
            return {...state, [currency]: state[currency] - amount};
        case ACTIONS.ADD_CURRENCY:
            return {...state, [currency]: state[currency] + amount};
        default:
            return state;
    }
}

