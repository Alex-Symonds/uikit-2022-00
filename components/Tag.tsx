import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';

import { rgba } from '../utils/utils';
import { theme as themeObj } from '../styles/theme';

import { Icon, ICON_ID, ICON_SIZES } from './icons/';
import customCursorImg from '../public/cursorHand.svg';

const StyledTag = styled.div<{ size : TagSize, disabled : boolean, hasOnClick : Boolean }>`
    align-items: center;
    background: ${ props => props.disabled && props.theme.disabledBackground !== undefined ? props.theme.disabledBackground : props.theme.background };
    border: 1px solid ${ props => props.disabled && props.theme.disabledBackground !== undefined ? props.theme.disabledBackground : props.theme.border};
    border-radius: ${ ({theme}) => theme.borderRadius };
    box-shadow: ${ props => props.theme.shadow === undefined ? "none" : props.theme.shadow };
    color: ${ props => props.theme.text };
    display: flex;
    gap: 0.275rem;
    max-width: 100%;
    padding: 0.0625rem 0.45rem;
    width: fit-content;

    svg path{
        fill: ${props => props.theme.close};
    }

    ${
        props => {
            if(props.size === TagSize.small){
                return props.theme.typography.p3Bold
            }
            return props.theme.typography.p2;
        }
    };

    ${
        props => {
            if(props.hasOnClick && !props.disabled){
                return css`
                    &:hover{
                        background: ${ props => props.theme.hoverBackground };

                        svg {
                            cursor: url(${customCursorImg}), auto;

                            path{
                                fill: ${ props => props.theme.hoverClose };
                            }
                        }
                    }
                `;
            }
        }
    }
`;

const StyledButton = styled.button`
    background: transparent;
    height: ${ICON_SIZES.small};
    position: relative;
    top: 0rem;
    width: ${ICON_SIZES.small};
`;

const StyledTextSpan = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - ${ICON_SIZES.small});
`;

interface TagThemeProps{
    background : string,
    text : string,
    close : string,
    hoverBackground : string,
    hoverClose : string,
    shadow? : string,
    border : string,
    disabledBackground? : string
}

const PrimaryTheme : TagThemeProps = {
    background: themeObj.color.primary,
    text: rgba(themeObj.color.textOnPrimary, themeObj.opacity.subtleTextOnPrimary),
    close: rgba(themeObj.color.textOnPrimary, themeObj.opacity.subtleTextOnPrimary),
    hoverBackground: themeObj.color.primaryHover,
    hoverClose: rgba(themeObj.color.textOnPrimary, themeObj.opacity.subtleTextOnPrimary),
    border: themeObj.color.primary,
    disabledBackground: themeObj.color.primaryDisabled
}

const WhiteTheme : TagThemeProps = {
    background: themeObj.color.white,
    text: themeObj.color.primaryTextOnWhite,
    close: rgba(themeObj.color.black, themeObj.opacity.alphaStrong),
    hoverBackground: themeObj.color.grayL,
    hoverClose: themeObj.color.black,
    shadow: themeObj.shadow.default,
    border: themeObj.color.grayL
}

interface I_TagProps{
    colour? : TagColor,
    disabled? : boolean,
    screenreaderLabel? : string,
    size? : TagSize,
    text : string,
    removeTag? : (e : React.MouseEvent<HTMLButtonElement>) => void
}

export enum TagSize{
    medium = "M",
    small = "S"
}

export enum TagColor{
    primary = "primary",
    white = "white"
}

export default function Tag({colour, disabled, screenreaderLabel, size, text, removeTag} : I_TagProps){
    colour = colour ?? TagColor.primary;
    disabled = disabled ?? false;
    screenreaderLabel = screenreaderLabel ?? "remove tag";
    size = size ?? TagSize.small;

    const theme = colour === TagColor.primary ? PrimaryTheme : WhiteTheme;
    const showRemoveButton = disabled || removeTag !== undefined;

    return  <ThemeProvider theme = { theme }>
                <StyledTag size={size} disabled={disabled} hasOnClick={showRemoveButton}>
                    <StyledTextSpan>
                        {text}
                    </StyledTextSpan>
                    {
                        showRemoveButton ?
                            <StyledButton aria-label={screenreaderLabel} onClick={removeTag} disabled={disabled}>
                                <Icon id={ICON_ID.close} size={ICON_SIZES.small} />
                            </StyledButton>
                            : null
                    }
                </StyledTag>
            </ThemeProvider>
}

