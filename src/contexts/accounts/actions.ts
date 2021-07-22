import { ChangeAmountCurrencyPayload } from "interfaces";

export enum ACTIONS {
    SUBTRACT_CURRENCY = "SUBTRACT_CURRENCY",
    ADD_CURRENCY = "ADD_CURRENCY"
    // ... add more actions
}

export interface ActionBase {
    readonly type: ACTIONS;
    payload: ChangeAmountCurrencyPayload;
}

export class SubtractCurrencyAction implements ActionBase {
    readonly type = ACTIONS.SUBTRACT_CURRENCY;
    payload: ChangeAmountCurrencyPayload;

    constructor(payload: ChangeAmountCurrencyPayload) {
        this.payload = payload;
    }
}

export class AddCurrencyAction implements ActionBase {
    readonly type = ACTIONS.ADD_CURRENCY;
    payload: ChangeAmountCurrencyPayload;

    constructor(payload: ChangeAmountCurrencyPayload) {
        this.payload = payload;
    }
}

// ... define more actions
