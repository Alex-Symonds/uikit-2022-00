import React from 'react';
import styled from 'styled-components';
import {PALETTE} from './Theme';

const StyledCircleContainer = styled.div<Pick<CircleAroundIconProps, "color" | "size">>`
    border-radius: 50%;
    background: ${ props => props.color };
    height: ${ props => props.size };
    width: ${ props => props.size };

    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;
`;

interface CircleAroundIconProps{
    color?: string,
    size?: string,
    children: React.ReactNode
}

export default function CircleAroundIcon({color, size, children} : CircleAroundIconProps){
    color = color === undefined ? PALETTE.grayL : color;
    size = size === undefined ? "3.25rem" : size;

    return (
        <StyledCircleContainer size={size} color={color}>
            {children}
        </StyledCircleContainer>
    )
}

