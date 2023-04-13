import React from 'react';
import styled from 'styled-components';

import { PALETTE, TYPOGRAPHY } from '../utils/Theme';

export const enum TAB_TYPE{
    vtSmall = "vtSmall",
    vtMedium = "vtMedium",
    vtLarge = "vtLarge",
    hzLarge = "hzLarge",
}

const StyledHorizontalLarge = styled.li`
    ${TYPOGRAPHY.p2}
    align-items: center;
    border-color: transparent;
    border-style: solid;
    border-width: 0 0 0 0.125rem;
    color: ${PALETTE.black_faded};
    display: flex;
    justify-content: space-between;
    padding: 0.375rem 0.5rem 0.25rem 1.375rem;

    &:active{
        border-color: ${PALETTE.primary};
        color: black;
    }

    &:hover{
        border-color: ${PALETTE.black_faded}; 
        color: ${PALETTE.grayK};
    }

    svg {
        position: relative;
        top: -0.0625rem;
    }
`;

const StyledVertical = styled.li`
    border-color: transparent;
    border-style: solid;
    border-width: 0 0 0.125rem 0;
    color: ${PALETTE.grayK};
    width: fit-content;

    &:active{
        border-color: ${PALETTE.primary};
        color: ${PALETTE.black};
    }

    &:hover{
        border-color: ${PALETTE.grayTabBorder};
        color: ${PALETTE.grayK};
    }
`;

const StyledVerticalLarge = styled(StyledVertical)`
    ${TYPOGRAPHY.p2}
    color: ${PALETTE.black_faded};
    padding: 1.3125rem 0.0625rem 1.4375rem 0;

    &:hover{
        border-color: ${PALETTE.black_faded};
    }
`;

const StyledVerticalMedium = styled(StyledVertical)`
    ${TYPOGRAPHY.p2}
    padding: 0.4375rem 0.0625rem 0.8125rem 0;
`;

const StyledVerticalSmall = styled(StyledVertical)`
    ${TYPOGRAPHY.p3}
    padding: 0.625rem 0.0625rem 0.3125rem 0;
`;

interface I_TabProps{
    type : TAB_TYPE,
    children : React.ReactNode
}

export default function Tab({type, children} : I_TabProps){
    const StyledTab = getStyledTab(type);
    return  <StyledTab>
                {children}
            </StyledTab>
}

function getStyledTab(type : TAB_TYPE){
    switch(type){
        case TAB_TYPE.vtLarge:
            return StyledVerticalLarge;
        
        case TAB_TYPE.vtMedium:
            return StyledVerticalMedium;
        
        case TAB_TYPE.vtSmall:
            return StyledVerticalSmall

        case TAB_TYPE.hzLarge:
            return StyledHorizontalLarge;

        default:
            return StyledVerticalMedium;
    }
}