import React from 'react';
import styled from 'styled-components';

// import { PALETTE } from '../utils/Theme';

const StyledCircleContainer = styled.div<Pick<CircleAroundIconProps, "size">>`
    border-radius: 50%;
    background: ${ ({theme}) => theme.color.avatarBackground };
    height: ${ ({size}) => size ?? "3.25rem" };
    width: ${ ({size}) => size ?? "3.25rem" };

    display: flex;
    align-items: center;
    justify-content: center;
`;

interface CircleAroundIconProps{
    className?: string,
    size?: string,
    children: React.ReactNode
}

export default function CircleAroundIcon({className, size, children} : CircleAroundIconProps){
    return  <StyledCircleContainer className = {className} size={size} >
                {children}
            </StyledCircleContainer>
}

