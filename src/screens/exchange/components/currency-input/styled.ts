import styled from 'styled-components';
import { Text } from 'components/layout';
import { titleSize, errorColor } from 'styles';

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    width: 100%;
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

export const ErrorText = styled(Text)`
    color: ${errorColor};
    text-align: right;
`;
