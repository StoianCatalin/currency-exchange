import styled from 'styled-components';
import {
    paddingSize, white, baseBorders, marginSize, grayColor,
    device, size, primaryColor, borderRadiusSize, primaryColorOnHover, darkColor
} from 'styles';

export const Layout = styled.div`
    width: 100%;
    margin: auto;
`;

export const Card = styled.div`
    box-sizing: border-box;
    background-color: ${white};
    padding: ${paddingSize};
    height: 100vh;

    @media ${device.tablet} {
        ${baseBorders}
        max-width: ${size.tablet};
        margin: ${marginSize} auto;
        height: auto;
    }
`;

export const Divider = styled.div`
    margin: 15px 0;
    width: 100%;
    height: 1px;
    background-color: ${grayColor};
`;

export const Button = styled.button`
    width: 100%;
    background-color: ${primaryColor};
    color: ${white};
    border: 0;
    height: 40px;
    border-radius: ${borderRadiusSize};
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: ${primaryColorOnHover};
    }
`;

export const Text = styled.span`
    font-size: ${(props: { size: number }) => `${props.size}px`};
    color: ${darkColor};
`;
