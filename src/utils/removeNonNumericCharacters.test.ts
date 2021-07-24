import removeNonNumericCharacters from "./removeNonNumericCharacters";

describe("removeNonNumericCharacters", () => {
    it("should return the value without non-numeric characters (except .)", () => {
        // Given
        const value = "+4.32a";
        // When
        const newValue = removeNonNumericCharacters(value);
        // Then
        expect(newValue).toBe('4.32');
    });
});
