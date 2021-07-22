import styled from 'styled-components';
import Select from 'react-select';
import { borderLargeRadiusSize, lightColor, paddingSize, titleSize } from 'styles';

export const InputWrapper = styled.div`
    width: 100%;
    border-radius: ${borderLargeRadiusSize};
    min-height: 100px;
    background-color: ${lightColor};
    margin: 10px 0;
    padding: ${paddingSize};
    box-sizing: border-box;
    display: flex;
`;

export const Column = styled.div`
    width: 50%;
`;

export const SelectDropdown = styled(Select)`
    width: 90%;
`;

export const Input = styled.input`
    width: 90%;
    height: 30px;
    border: 0;
    background-color: transparent;
    font-size: ${titleSize};
    font-weight: bold;
    text-align: right;

    &:focus {
        border: none;
        outline: none;
    }
`;