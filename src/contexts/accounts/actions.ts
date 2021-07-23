import { IChangeAmountCurrencyPayload } from "interfaces";

export enum ACTIONS {
    SUBTRACT_CURRENCY = "SUBTRACT_CURRENCY",
    ADD_CURRENCY = "ADD_CURRENCY"
    // ... add more actions
}

export interface ActionBase {
    readonly type: ACTIONS;
    payload: IChangeAmountCurrencyPayload;
}

export class SubtractCurrencyAction implements ActionBase {
    readonly type = ACTIONS.SUBTRACT_CURRENCY;
    payload: IChangeAmountCurrencyPayload;

    constructor(payload: IChangeAmountCurrencyPayload) {
        this.payload = payload;
    }
}

export class AddCurrencyAction implements ActionBase {
    readonly type = ACTIONS.ADD_CURRENCY;
    payload: IChangeAmountCurrencyPayload;

    constructor(payload: IChangeAmountCurrencyPayload) {
        this.payload = payload;
    }
}

// ... define more actions
