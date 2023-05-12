import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { theme as themeObj } from '../styles/theme';

import Paragraph from './Paragraph';

export enum BadgeType{
    primary = "primary",
    secondary = "secondary",
    white = "white"
}

interface BadgeTheme{
    background: string,
    borderColor: string,
    colour: string,
    shadow: string,
    filter?: string
}

const PrimaryTheme : BadgeTheme = {
    background: themeObj.color.primary,
    borderColor: themeObj.color.primary,
    colour: themeObj.color.textOnPrimary,
    shadow: 'none' 
}

const SecondaryTheme : BadgeTheme = {
    background: 'transparent',
    borderColor: themeObj.color.primary,
    colour: themeObj.color.primary,
    shadow: 'none',
    filter: 'drop-shadow(0 4px 4px rgba(51,51,51,0.04)) drop-shadow(0 4px 16px rgba(51,51,51,0.08))'
}

const WhiteTheme : BadgeTheme = {
    background: themeObj.color.white,
    borderColor: themeObj.color.grayL,
    colour: themeObj.color.primaryTextOnWhite,
    shadow: themeObj.shadow.default
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
    color: ${props => props.theme.colour};
    filter: ${props => props.filter };
    max-width: 15rem;
    overflow: hidden;
    padding: 0.0625rem calc(0.5rem - 1px) 0.0625rem;
    white-space: nowrap;
    width: fit-content;
`;

const StyledBadgeText = styled(Paragraph)`
    color: ${props => props.theme.colour};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 14rem;
`;

interface BadgeProps{
    text?: string,
    type?: BadgeType
}
export default function Badge({text, type} : BadgeProps){
    if(!text || text === ''){
        text = "Your text";
    }
    const theme = getTheme(type);
    return <ThemeProvider theme = {theme}>
                <StyledBadge>
                    <StyledBadgeText size={3} bold={true}>
                        {text}
                    </StyledBadgeText>
                </StyledBadge>
            </ThemeProvider>
}