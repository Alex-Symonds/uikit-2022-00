import React from 'react';
import styled from 'styled-components';

import {PALETTE} from '../utils/Theme';

const StyledCircleContainer = styled.div<Pick<CircleAroundIconProps, "colour" | "size">>`
    border-radius: 50%;
    background: ${ props => props.colour };
    height: ${ props => props.size };
    width: ${ props => props.size };

    display: flex;
    align-items: center;
    justify-content: center;
`;

interface CircleAroundIconProps{
    colour?: string,
    size?: string,
    children: React.ReactNode
}

export default function CircleAroundIcon({colour, size, children} : CircleAroundIconProps){
    colour = colour === undefined ? PALETTE.grayL : colour;
    size = size === undefined ? "3.25rem" : size;

    return (
        <StyledCircleContainer size={size} colour={colour}>
            {children}
        </StyledCircleContainer>
    )
}

