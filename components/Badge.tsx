import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { PALETTE, SHADOW, TYPOGRAPHY } from './Theme';
import { isBlank } from './utils';

export enum BadgeType{
    primary = "primary",
    secondary = "secondary",
    white = "white"
}

interface BadgeProps{
    text?: string,
    type?: BadgeType
}

interface BadgeTheme{
    background: string,
    borderColor: string,
    color: string,
    shadow: string,
    filter?: string
}

const PrimaryTheme : BadgeTheme = {
    background: PALETTE.primary,
    borderColor: PALETTE.primary,
    color: PALETTE.white,
    shadow: 'none' 
}

const SecondaryTheme : BadgeTheme = {
    background: 'transparent',
    borderColor: PALETTE.primary,
    color: PALETTE.primary,
    shadow: 'none',
    filter: 'drop-shadow(0 4px 4px rgba(51,51,51,0.04)) drop-shadow(0 4px 16px rgba(51,51,51,0.08))'
}

const WhiteTheme : BadgeTheme = {
    background: PALETTE.white,
    borderColor: PALETTE.grayL,
    color: PALETTE.primary,
    shadow: SHADOW.default
}

function getTheme(type : BadgeType | undefined){
    switch(type){
        case BadgeType.primary:
            return PrimaryTheme;
        case BadgeType.secondary:
            return SecondaryTheme;
        case BadgeType.white:
            return WhiteTheme;
        default:
            return PrimaryTheme;
    }
}


const StyledBadge = styled.div.attrs(props => ({
    filter: props.theme.filter || "none"
}))`
    background: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.borderColor};
    border-radius: 6.25rem;
    box-shadow: ${props => props.theme.shadow};
    color: ${props => props.theme.color};
    filter: ${props => props.filter };
    font-family: var(--fontMain);
    max-width: 15rem;
    overflow: hidden;
    padding: 0.0625rem calc(0.5rem - 1px) 0.0625rem;
    white-space: nowrap;
    width: fit-content;
`;

const StyledBadgeText = styled.p`
    ${TYPOGRAPHY.p3Bold}
    color: ${props => props.theme.color};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 14rem;
`;

export default function Badge({text, type} : BadgeProps){
    if(isBlank(text)){
        text = "Your text";
    }
    const theme = getTheme(type);
    return <ThemeProvider theme = {theme}>
                <StyledBadge>
                    <StyledBadgeText color={theme.color}>
                        {text}
                    </StyledBadgeText>
                </StyledBadge>
    </ThemeProvider>
}