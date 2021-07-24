import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import CurrencySwitchButton from '.';

describe("CurrencySwitchButton", () => {

    it("should render correctly", () => {
        // Given
        const onClick = jest.fn();
        // When
        const component = renderer.create(
            <CurrencySwitchButton
            onClick={onClick}
        />
        );
        // Then
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("should call on click", () => {
        // Given
        const onClick = jest.fn();
        // When
        const { getByTestId } = render(
            <CurrencySwitchButton
                onClick={onClick}
            />
        );
        // Then
        fireEvent.click(getByTestId('switch-button'))
        expect(onClick).toBeCalled();
    });

});