/*
    Button component and styles.
    Exports:
        > enum ButtonStyle (for picking the colour theme)
        > Button
*/

import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components'

import {Icon, IconProps, IconMediumId } from '.';
import { PALETTE, LAYOUT, TYPOGRAPHY } from '../utils/Theme';
import { StyledScreenReaderOnly } from '../utils/utils';

// Colour Themes
export enum ButtonStyle{
    primary = "primary",
    secondary = "secondary",
    flat = "flat",
    primaryWhite = "primaryWhite",
    secondaryWhite = "secondaryWhite",
    flatWhite = "flatWhite",
    secondaryDark = "secondaryDark",
}

function themePicker(style : ButtonStyle | undefined) : ButtonThemeProps{
    switch(style){
        case ButtonStyle.primary:
            return PrimaryTheme;

        case ButtonStyle.primaryWhite:
            return PrimaryWhiteTheme;

        case ButtonStyle.secondary:
            return SecondaryTheme;

        case ButtonStyle.secondaryWhite:
            return SecondaryWhiteTheme;

        case ButtonStyle.secondaryDark:
            return SecondaryDarkTheme;

        case ButtonStyle.flat:
            return FlatTheme;

        case ButtonStyle.flatWhite:
            return FlatWhiteTheme;

        default:
            return PrimaryTheme;
    }
};

interface ButtonThemeProps{
    mainColor: string,
    mainBackground: string,
    mainBorder: string,
    hoverBackground: string,
    fadeOnDisabled : boolean,

    activeBackground?: string,
    disabledColor?: string,
    disabledBackground?: string,
    disabledBorder?: string
}

const PrimaryTheme : ButtonThemeProps = {
    mainColor: PALETTE.white,
    mainBackground: PALETTE.primary,
    mainBorder: 'transparent',
    hoverBackground: PALETTE.hover,
    fadeOnDisabled: false,

    activeBackground: PALETTE.active,
    disabledBackground: PALETTE.disabled
};

const PrimaryWhiteTheme : ButtonThemeProps = {
    mainColor: PALETTE.primary,
    mainBackground: PALETTE.white,
    mainBorder: 'transparent',
    hoverBackground: PALETTE.white_faded,
    fadeOnDisabled: true,

    disabledBackground: PALETTE.white
}

const FlatTheme : ButtonThemeProps = {
    mainColor: PALETTE.primary,
    mainBackground: 'transparent',
    mainBorder: 'transparent',
    hoverBackground: PALETTE.primary_fadedHover,
    fadeOnDisabled: true,

    activeBackground: PALETTE.primary_fadedActive,
    disabledColor: PALETTE.primary
}

const FlatWhiteTheme : ButtonThemeProps = {
    mainColor: PALETTE.white,
    mainBackground: 'transparent',
    mainBorder: 'transparent',
    hoverBackground: PALETTE.white_fadedHover,
    fadeOnDisabled: true,

    activeBackground: PALETTE.white_fadedActive,
    disabledColor: PALETTE.white
}

const SecondaryTheme : ButtonThemeProps = {
    ...FlatTheme,
    mainBorder: PALETTE.primary,

    disabledBorder: PALETTE.primary,
}

const SecondaryWhiteTheme : ButtonThemeProps = {
    ...FlatWhiteTheme,
    mainBorder: PALETTE.white,

    disabledColor: PALETTE.white
}

const SecondaryDarkTheme : ButtonThemeProps = {
    mainColor: PALETTE.black,
    mainBackground: 'transparent',
    mainBorder: PALETTE.black,
    hoverBackground: PALETTE.black_fadedHover,
    fadeOnDisabled: true,

    activeBackground: PALETTE.black_fadedActive,
    disabledBorder: PALETTE.black,
    disabledColor: PALETTE.black
}

Button.defaultProps = {
    theme: PrimaryTheme
}


// Styled-Component
type StyledButtonProps = {
    circle?: boolean,
    widthOverride?: string,
    paddingStr : string,
}
const StyledButton = styled.button<StyledButtonProps>`
    ${TYPOGRAPHY.p2}
    align-items: center;
    background: ${ props => props.theme.mainBackground };
    border-radius: ${ props  => props.circle ? "9999px" :  LAYOUT.borderRadius };
    box-shadow: inset 0px 0px 0px 0.125rem ${ props => props.theme.mainBorder };
    color: ${ props => props.theme.mainColor };
    display: flex;
    justify-content: center;
    max-width: 100%;
    padding: ${ props  => props.paddingStr };
    width: ${ props => props.widthOverride ? props.widthOverride : "auto" };

    gap: 0.28rem;

    svg {
        height: 1.5rem;
        width: 1.5rem;

        path{
            fill: ${props => props.disabled && props.theme.disabledColor ? props.theme.disabledColor : props.theme.mainColor };
        }
    }

    &:active {
        background: ${ props => props.theme.activeBackground ? props.theme.activeBackground : props.theme.mainBackground };
    }

    &:disabled{
        background: ${ props => props.theme.disabledBackground ? props.theme.disabledBackground : props.theme.mainBackground };
        box-shadow: inset 0px 0px 0px 0.125rem ${ props => props.theme.disabledBorder ? props.theme.disabledBorder : props.theme.mainBorder };
        color: ${ props => props.theme.disabledColor ? props.theme.disabledColor : props.theme.mainColor };
        opacity: ${ props => props.theme.fadeOnDisabled ? "56%" : "100%" };
    }

    &:focus {
        box-shadow: inset 0px 0px 0px 0.125rem rgba(0, 0, 0, 0.48);
    }

    &:not(:disabled):hover {
        background: ${ props => props.theme.hoverBackground };
    }
`;


// Helpers
type ButtonModeBools = {
    withLabel : boolean,
    withIcon : boolean,
}

// Design says that Buttons visually displaying a label require extra padding at the sides
function getPadding({withLabel, withIcon} : ButtonModeBools) : string{
    if(withLabel && withIcon){
       return "0.625rem 1.25rem";
    }

    if(withLabel && !withIcon){
        return "0.625rem 1.3125rem 0.625rem 1.25rem";
    }

    return "0.625rem";
}

// Set a width when "loader === true" on a Label or Label+Icon Button, so it doesn't collapse down to an
// Icon-Only button.
function getWidthForLoaderButton({withLabel, withIcon} : ButtonModeBools) : string | undefined{
    if(withLabel && withIcon){
       return "7.75rem";
    }

    if(withLabel && !withIcon){
        return "6rem";
    }

    return undefined;
}

/*
    Button component covers four different modes (five, if count "loader"), so some validation, 
    overrides and mode-specific CSS are needed.
*/
interface I_ContentSettingsProps{
    argIcon? : IconProps,
    argLabel : string,
    circle : boolean,
    loader : boolean,
    hideLabelVisually : boolean
}

interface I_ContentSettings{
    icon? : IconProps,
    label : string,
    labelIsVisible : boolean,
    paddingStr : string,
    widthOverride? : string,
}

function getValidContentSettings({argIcon, argLabel, circle, loader, hideLabelVisually} : I_ContentSettingsProps) : I_ContentSettings{
    let settings : I_ContentSettings;
    
    const hasIconOnlyFlag : boolean = circle || hideLabelVisually;
    const iconIsDefined : boolean = argIcon !== undefined && argIcon !== null;
    const wantIcon : boolean = iconIsDefined || hasIconOnlyFlag;

    if(loader){
        settings = getLoaderContentSettings({withLabel: !hasIconOnlyFlag, withIcon: wantIcon});
    }
    else{
        settings = {
            icon: argIcon,
            label: argLabel,
            labelIsVisible: !hasIconOnlyFlag,
            paddingStr: getPadding({ withLabel: !hasIconOnlyFlag, withIcon: wantIcon }),
        }

        const errMsg = getContentErrorString({hasIconOnlyFlag, iconIsDefined, label : settings.label});
        if(errMsg !== ""){
            settings.labelIsVisible = true;
            settings.label = errMsg;
        }
    }

    return settings;
}

function getLoaderContentSettings({withLabel, withIcon} : ButtonModeBools) : I_ContentSettings {
    return {
        icon: { idMedium: IconMediumId.loader },
        label: "Loading...",
        labelIsVisible: false,
        widthOverride: getWidthForLoaderButton({ withLabel, withIcon }),
        paddingStr: getPadding({ withLabel, withIcon }),
    }
}

function buttonLabelIsValid(label : string) : boolean{
    return label.trim() !== "";
}

type ErrorStringProps = {
    hasIconOnlyFlag : boolean,
    iconIsDefined : boolean,
    label : string,
}
function getContentErrorString({hasIconOnlyFlag, iconIsDefined, label} : ErrorStringProps) : string {
    let errMsg : string = "";

    if(hasIconOnlyFlag && !iconIsDefined){
        errMsg += " #icon? ";
    }

    if(!buttonLabelIsValid(label)){
        // Expectation: folks wanting an Icon or Circle button may attempt to achieve this via passing an empty string
        // into "label", rather than applying the "circle" or "hideLabelVisually" flags (as intended).
        // If this happens, it might be helpful to give them a hint as to why label is a required argument in the first place.
        if(hasIconOnlyFlag){
            errMsg += " #label? (SR) ";
        }
        else{
            errMsg += " #label? ";
        }
    }

    return errMsg.trim();
}


interface I_ButtonProps{
    circle?: boolean,               /* true = Circle button (Note: automatically visually-hides the label. Circle-with-label is unavailable) */
    disabled?: boolean,
    hideLabelVisually? : boolean,   /* true = Icon button (Note: does nothing if circle === true. Circle-with-label is unavailable) */
    icon?: IconProps,
    label: string,                  /* Required because screenreaders need this even if the visual design doesn't */
    loader?: boolean,
    style?: ButtonStyle,
    onClick: () => void,
}

export default function Button({circle, disabled, hideLabelVisually, icon : argIcon, label : argLabel, loader, style, onClick} : I_ButtonProps){
    const {icon, label, labelIsVisible, widthOverride, paddingStr} : I_ContentSettings = getValidContentSettings({
        loader: loader ?? false,
        argIcon : argIcon,
        circle : circle ?? false,
        argLabel : argLabel,
        hideLabelVisually : hideLabelVisually ?? false,
    });
    const theme : ButtonThemeProps = themePicker(style);

    return  <ThemeProvider theme = { theme }>
                <StyledButton   circle = { circle ?? false }
                                paddingStr = {paddingStr}
                                widthOverride = { widthOverride }
                                disabled = { disabled }
                                onClick = { onClick } >
                    { icon ?
                        <Icon {...icon} />
                        : null
                    }
                    { labelIsVisible ?
                        label
                        : <StyledScreenReaderOnly>{label}</StyledScreenReaderOnly>
                    }
                </StyledButton>
            </ThemeProvider>
}

