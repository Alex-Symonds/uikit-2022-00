import React from 'react';
import styled, {css} from 'styled-components';
import { LAYOUT } from '../utils/Theme';

const StyledGridWrapper = styled.div<{leftAlign : boolean}>`
    display: flex;
    justify-content: center;
    width: 100%;

    ${ props => {
        if(props.leftAlign){
            return css`
                @media screen and (min-width: ${LAYOUT.breakpointXL}){
                    justify-content: left;
                }
            `;
        }
    }}
`;

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(var(--num), var(--cw));
    gap: var(--g);
    max-width: calc(var(--num) * var(--cw) + (var(--num) - 1) * var(--g));

    --cw: 130px;
    --g: 32px;
    --num: 2;
    
    @media screen and (min-width: ${LAYOUT.breakpointM}){
        --num: 6;
        --cw: 88px;
    }

    @media screen and (min-width: ${LAYOUT.breakpointL}){
        --num: 12;
        --cw: 50px;
    }

    @media screen and (min-width: ${LAYOUT.breakpointXL}){
        --num: 12;
        --cw: 76px;
    }
`;

interface I_GridLayout{
    leftAlignOnWidest? : boolean,
    children: React.ReactNode,
}

export default function GridLayout({leftAlignOnWidest, children} : I_GridLayout){
    leftAlignOnWidest = leftAlignOnWidest ?? false;
    return  <StyledGridWrapper leftAlign={leftAlignOnWidest}>
                <StyledGrid>
                    {children}
                </StyledGrid>
            </StyledGridWrapper>
}