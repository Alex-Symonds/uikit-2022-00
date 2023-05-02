/*
    Button component and styles.
    Exports:
        > enum ButtonStyle (for picking the colour theme)
        > Button
*/

import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { PALETTE, LAYOUT, TYPOGRAPHY, } from '../utils/Theme';

import { Icon, ICON_ID, ICON_SIZES } from './icons/';
import { StyledScreenReaderOnly } from './visuallyHidden';

// Button colour Themes
export enum ButtonStyle{
    primary = "primary",
    secondary = "secondary",
    flat = "flat",
    primaryWhite = "primaryWhite",
    secondaryWhite = "secondaryWhite",
    flatWhite = "flatWhite",
    secondaryDark = "secondaryDark",
}


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


const SecondaryTheme : ButtonThemeProps = {
    mainColor: PALETTE.primary,
    mainBackground: 'transparent',
    mainBorder: PALETTE.primary,
    hoverBackground: PALETTE.primary_fadedHover,
    fadeOnDisabled: true,

    activeBackground: PALETTE.primary_fadedActive,
    disabledBorder: PALETTE.primary,
    disabledColor: PALETTE.primary  
}


const SecondaryWhiteTheme : ButtonThemeProps = {
    mainColor: PALETTE.white,
    mainBackground: 'transparent',
    mainBorder: PALETTE.white,
    hoverBackground: PALETTE.white_fadedHover,
    fadeOnDisabled: true,

    activeBackground: PALETTE.white_fadedActive,
    disabledColor: PALETTE.white
}


const FlatTheme : ButtonThemeProps = {
    ...SecondaryTheme,
    mainBorder: 'transparent',

    disabledBorder: undefined,
}


const FlatWhiteTheme : ButtonThemeProps = {
    ...SecondaryWhiteTheme,
    mainBorder: 'transparent',
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


const ButtonThemes = {
    [ButtonStyle.primary]: PrimaryTheme,
    [ButtonStyle.secondary]: SecondaryTheme,
    [ButtonStyle.flat]: FlatTheme,
    [ButtonStyle.primaryWhite]: PrimaryWhiteTheme,
    [ButtonStyle.secondaryWhite]: SecondaryWhiteTheme,
    [ButtonStyle.flatWhite]: FlatWhiteTheme,
    [ButtonStyle.secondaryDark]: SecondaryDarkTheme,
}

Button.defaultProps = {
    theme: PrimaryTheme
}

// Styled-Component
type StyledButtonProps = {
    circle?: boolean,
    paddingStr : string,
    widthOverride?: string,
}
const StyledButton = styled.button<StyledButtonProps>`
    ${TYPOGRAPHY.p2}
    align-items: center;
    background: ${ props => props.theme.mainBackground };
    border-radius: ${ props  => props.circle ? "9999px" :  LAYOUT.borderRadius };
    box-shadow: inset 0px 0px 0px 0.125rem ${ props => props.theme.mainBorder };
    color: ${ props => props.theme.mainColor };
    display: flex;
    gap: 0.28rem;
    justify-content: center;
    max-width: 100%;
    padding: ${ props  => props.paddingStr };
    width: ${ props => props.widthOverride ? props.widthOverride : "auto" };

    svg {
        height: 1.5rem;
        max-height: 1.5rem;
        max-width: 1.5rem;
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


// CSS Helpers
type ButtonModeBools = {
    withLabel : boolean,
    withIcon : boolean,
}

// Design says that Buttons visually displaying a label require extra padding at the sides
function getPaddingString({withLabel, withIcon} 
    : ButtonModeBools) 
    : string {

    if(withLabel && withIcon){
       return "0.625rem 1.25rem";
    }

    if(withLabel && !withIcon){
        return "0.625rem 1.3125rem 0.625rem 1.25rem";
    }

    return "0.625rem";
}


/*
    Button component covers four different modes (more, if "loader" is counted 
    separately), so some validation, overrides and mode-specific CSS are needed.
*/
interface I_ContentSettingsProps{
    argIcon? : keyof typeof ICON_ID | T_IconProps,
    argLabel : string,
    circle : boolean,
    loader : boolean,
    hideLabelVisually : boolean
}

interface I_ContentSettings{
    iconProps: T_IconProps | null
    label : string,
    labelIsVisible : boolean,
    paddingStr : string,
    widthOverride? : string,
}

function getValidContentSettings({argIcon, argLabel, circle, loader, hideLabelVisually} 
    : I_ContentSettingsProps) 
    : I_ContentSettings{
    
    const hasIconOnlyFlag : boolean = circle || hideLabelVisually;
    const iconIsDefined : boolean = argIcon !== undefined && argIcon !== null;
    const wantIcon : boolean = iconIsDefined || hasIconOnlyFlag;

    if(loader){
        return getLoaderContentSettings({ withLabel: !hasIconOnlyFlag, withIcon: wantIcon });
    }

    let settings : I_ContentSettings = {
        iconProps: getIconSettings({ argIcon, hasIconOnlyFlag }),
        label: argLabel,
        labelIsVisible: !hasIconOnlyFlag,
        paddingStr: getPaddingString({ withLabel: !hasIconOnlyFlag, withIcon: wantIcon }),
    }

    const errMsg = getContentErrorString({hasIconOnlyFlag, label : settings.label});
    if(errMsg !== ""){
        settings.labelIsVisible = true;
        settings.label = errMsg;
    }

    return settings;
}


function getLoaderContentSettings({withLabel, withIcon} 
    : ButtonModeBools) 
    : I_ContentSettings {

    // Loaders only display the loading icon and so will "naturally" display as an icon-only button.
    // This would be contrary to the design, where "label-y" loader buttons are wider.
    // Set a greater width for label-y buttons here.
    let width = withLabel && withIcon ?
                    "7.75rem" :
                    withLabel && !withIcon ?
                        "6rem" :
                        undefined;

    return {
        iconProps: {
            id: ICON_ID.loader,
            size: ICON_SIZES.medium,
        },
        label: "Loading...",
        labelIsVisible: false,
        widthOverride: width,
        paddingStr: getPaddingString({ withLabel, withIcon }),
    }
}

type T_WithIconOnlyFlag = {
    hasIconOnlyFlag : boolean
}

function getIconSettings({argIcon, hasIconOnlyFlag} 
    : Pick<I_ContentSettingsProps, "argIcon"> & T_WithIconOnlyFlag) 
    : T_IconProps | null {

    let validIconProps : T_IconProps | null = null;

    if(argIcon){
        if(typeof argIcon === 'object'){
            validIconProps = argIcon
        }
        else{
            validIconProps = {
                id: argIcon,
            }
        }
    }
    else if(hasIconOnlyFlag){
        validIconProps = {
            id: ICON_ID.default,
        }
    }

    return validIconProps;
}


function getContentErrorString({hasIconOnlyFlag, label} 
    : T_WithIconOnlyFlag & Pick<I_ContentSettings, "label">) 
    : string {

    let errMsg : string = "";

    if(label.trim() === ""){
        // Expectation: folks wanting an Icon or Circle button may attempt to achieve this via passing an empty or whitespace string
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

type T_IconId = keyof typeof ICON_ID;

type T_IconProps = {
    id: T_IconId,
    size?: typeof ICON_SIZES[keyof typeof ICON_SIZES],
}

interface I_ButtonProps{
    circle?: boolean,               /* true = Circle button (Note: automatically visually-hides the label. Circle-with-label is unavailable) */
    disabled?: boolean,
    hideLabelVisually? : boolean,   /* true = Icon button (Note: does nothing if circle === true. Circle-with-label is unavailable) */
    icon?: T_IconId | T_IconProps,
    label: string,                  /* Required because screenreaders need this even if the visual design doesn't */
    loader?: boolean,
    style?: ButtonStyle,
    onClick: () => void,
}

export default function Button({circle, disabled, hideLabelVisually, icon : argIcon, label : argLabel, loader, style, onClick} : I_ButtonProps){
    const {iconProps, label, labelIsVisible, widthOverride, paddingStr} : I_ContentSettings = getValidContentSettings({
        loader: loader ?? false,
        argIcon : argIcon,
        circle : circle ?? false,
        argLabel : argLabel,
        hideLabelVisually : hideLabelVisually ?? false,
    });

    style = style ?? ButtonStyle.primary;
    const theme : ButtonThemeProps = ButtonThemes[style];

    return  <ThemeProvider theme = { theme }>
                <StyledButton   disabled = { disabled }
                                circle = { circle ?? false }
                                paddingStr = {paddingStr}
                                widthOverride = { widthOverride }
                                onClick = { onClick } >
                    { iconProps ?
                        <Icon id={iconProps.id} size={iconProps.size ?? ICON_SIZES.medium} />
                        : null
                    }
                    { labelIsVisible ?
                        label
                        : <StyledScreenReaderOnly>{label}</StyledScreenReaderOnly>
                    }
                </StyledButton>
            </ThemeProvider>
}

