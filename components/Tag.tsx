import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';

import { Icon, IconSmallId } from '.';
import { PALETTE, SHADOW, ICON_SIZES, TYPOGRAPHY, LAYOUT } from '../utils/Theme';
import customCursorImg from '../public/cursorHand.svg';

const StyledTag = styled.div<{ size : TagSize, disabled : boolean, hasOnClick : Boolean }>`
    align-items: center;
    background: ${ props => props.disabled && props.theme.disabledBackground !== undefined ? props.theme.disabledBackground : props.theme.background };
    border: 1px solid ${ props => props.disabled && props.theme.disabledBackground !== undefined ? props.theme.disabledBackground : props.theme.border};
    border-radius: ${ LAYOUT.borderRadius };
    box-shadow: ${ props => props.theme.shadow === undefined ? "none" : props.theme.shadow };
    color: ${ props => props.theme.text };
    display: flex;
    gap: 0.275rem;
    padding: 0.0625rem 0.45rem;
    width: fit-content;

    svg path{
        fill: ${props => props.theme.close};
    }

    ${
        props => {
            if(props.size === TagSize.small){
                return TYPOGRAPHY.p3Bold
            }
            return TYPOGRAPHY.p2;
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

interface TagThemeProps{
    background : PALETTE,
    text : PALETTE,
    close : PALETTE,
    hoverBackground : PALETTE,
    hoverClose : PALETTE,
    shadow? : string,
    border : PALETTE,
    disabledBackground? : PALETTE
}

const PrimaryTheme : TagThemeProps = {
    background: PALETTE.primary,
    text: PALETTE.white_faded,
    close: PALETTE.white_faded,
    hoverBackground: PALETTE.hover,
    hoverClose: PALETTE.white_faded,
    border: PALETTE.primary,
    disabledBackground: PALETTE.disabled
}

const WhiteTheme : TagThemeProps = {
    background: PALETTE.white,
    text: PALETTE.primary,
    close: PALETTE.black_faded,
    hoverBackground: PALETTE.grayL,
    hoverClose: PALETTE.black,
    shadow: SHADOW.default,
    border: PALETTE.grayL
}

interface I_TagProps{
    colour : TagColor,
    disabled : boolean,
    showIcon : boolean,
    size : TagSize,
    text : string,
    handleClick? : (e : React.MouseEvent<HTMLButtonElement>) => void
}

export enum TagSize{
    medium = "M",
    small = "S"
}

export enum TagColor{
    primary = "primary",
    white = "white"
}

export default function Tag({colour, disabled, showIcon, size, text, handleClick} : I_TagProps){
    const theme = colour === TagColor.primary ? PrimaryTheme : WhiteTheme;
    showIcon = handleClick !== undefined ? true : showIcon;

    return  <ThemeProvider theme = { theme }>
                <StyledTag size={size} disabled={disabled} hasOnClick={handleClick !== undefined}>
                    {text}
                    {
                        showIcon === true && handleClick !== undefined &&
                            <StyledButton onClick={handleClick} >
                                <Icon idSmall={IconSmallId.close} />
                            </StyledButton>
                    }
                    {
                        showIcon === true && handleClick === undefined &&
                            <StyledButton as="div" >
                                <Icon idSmall={IconSmallId.close} />
                            </StyledButton>
                    }
                </StyledTag>
            </ThemeProvider>
}

