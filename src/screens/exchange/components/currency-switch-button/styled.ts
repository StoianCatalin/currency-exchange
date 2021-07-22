import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { darkColor, primaryColor, secondaryColor, white } from 'styles';

export const SwitchButton = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: auto;
    cursor: pointer;
    background-color: ${primaryColor};
    color: ${white};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ease .2s background-color;

    &:hover {
        color: ${darkColor};
        background-color: ${secondaryColor}
    }
`;

export const StyledIcon = styled(FontAwesomeIcon)`
    transform: rotate(-90deg);
`;