import calculateValueBasedOnRate from "./calculateValueBasedOnRate";

describe("calculateValueBasedOnRate", () => {
    it("should calculate EUR from RON at the given rate", () => {
        // Given
        const rates = { "EUR": 1, "RON": "4.92" } as any;
        const value = "100";
        const currency = "ron";
        // When
        const newValue = calculateValueBasedOnRate(rates, value, currency);
        // Then
        expect(newValue).toBe("492.00");
    });

    it("should calculate RON from EUR in reverse mode", () => {
        // Given
        const rates = { "EUR": 1, "RON": "4.92" } as any;
        const value = "100";
        const currency = "ron";
        // When
        const newValue = calculateValueBasedOnRate(rates, value, currency, true);
        // Then
        expect(newValue).toBe("20.33");
    });
});
