import styled from 'styled-components';
import { primaryColor, textSize, titleSize } from 'styles';


export const Title = styled.h2`
    font-size: ${titleSize};
    margin: 0;
`;

export const Subtitle = styled.span`
    color: ${primaryColor};
    font-size: ${textSize};
    display: flex;
    gap: 6px;
    align-items: center;
`;
