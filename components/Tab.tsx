import React from 'react';
import styled from 'styled-components';

// import { PALETTE, TYPOGRAPHY } from '../utils/Theme';

import { rgba } from '../utils/utils';

export const enum TAB_TYPE{
    vtSmall = "vtSmall",
    vtMedium = "vtMedium",
    vtLarge = "vtLarge",
    hzLarge = "hzLarge",
}

const StyledHorizontalLarge = styled.li.attrs(({theme}) => ({
    subtleMainText: rgba(theme.color.mainText, theme.opacity.subtleMainText) 
}))`
    ${ ({theme}) => theme.typography.p2 }
    align-items: center;
    border-color: transparent;
    border-style: solid;
    border-width: 0 0 0 0.125rem;
    color: ${ props => props.subtleMainText };
    display: flex;
    justify-content: space-between;
    padding: 0.375rem 0.5rem 0.25rem 1.375rem;

    &:active{
        border-color: ${ ({theme}) => theme.color.primary };
        color: black;
    }

    &:hover{
        border-color: ${ props => props.subtleMainText }; 
        color: ${ ({theme}) => theme.color.mainTextPaleDark };
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
    color: ${ ({theme}) => theme.color.mainTextPaleDark };
    width: fit-content;

    &:active{
        border-color: ${ ({theme}) => theme.color.primary };
        color: ${ ({theme}) => theme.color.mainText };
    }

    &:hover{
        border-color: ${ ({theme}) => rgba(theme.color.mainText, theme.opacity.subtleMainText) };
        color: ${ ({theme}) => theme.color.mainTextPaleDark };
    }
`;

const StyledVerticalLarge = styled(StyledVertical)`
    ${ ({theme}) => theme.typography.p2 }
    color: ${ ({theme}) => rgba(theme.color.mainText, theme.opacity.subtleMainText) };
    padding: 1.3125rem 0.0625rem 1.4375rem 0;

    &:hover{
        border-color: ${ ({theme}) => rgba(theme.color.mainText, theme.opacity.subtleMainText) };
    }
`;

const StyledVerticalMedium = styled(StyledVertical)`
    ${ ({theme}) => theme.typography.p2 }
    padding: 0.4375rem 0.0625rem 0.8125rem 0;
`;

const StyledVerticalSmall = styled(StyledVertical)`
    ${ ({theme}) => theme.typography.p3 }
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