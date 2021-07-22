import React, { Dispatch, useMemo, useReducer } from 'react';
import { ActionBase } from './actions';
import { accountsReducer, AccountsState, initialState } from './reducer';

export const AccountContext = React.createContext<{state: AccountsState, dispatch: Dispatch<ActionBase>}>({
    state: initialState, dispatch: () => {}
});

export default function useAccountContext() {
    const [state, dispatch] = useReducer(accountsReducer, initialState);
    const contextValue = useMemo(() => {
        return { state, dispatch };
      }, [state, dispatch]);
    return {
        contextValue,
    };
}
