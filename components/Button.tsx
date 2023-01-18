/*
    Button component and styles.
    Contains:
        > || Non-Default Exports
        > || Interfaces
        > || styled-components: themes, selector, components
        > || export default Button
*/

import React from 'react';
import styled from 'styled-components';
import IconPlusSvg from './IconPlus';
import IconReloadSvg from './IconReload';
import { css, ThemeProvider } from 'styled-components'
import { PALETTE, FONT, LAYOUT, ICON_SIZES } from './Theme';
import { isBlank } from './utils';


// || Non-Default Exports
export enum ButtonType{
    primary = "primary",
    secondary = "secondary",
    flat = "flat"
}

export enum ButtonColor{
    color = "color",
    white = "white",
    dark = "dark"
}

export interface ButtonIconProps{
    color: ButtonColor,
    disabled?: boolean,
    loader?: boolean,
    type: ButtonType,
    onClick?: () => void;
}

export interface ButtonLabelProps{
    color: ButtonColor,
    disabled?: boolean,
    loader?: boolean,
    type: ButtonType,
    label: string,
    onClick?: () => void;
}

export function setLabel(label : any) : string{
    if(typeof label === "number"){
        label = label.toString();
    }

    let labelExists : boolean = typeof label === "string" && label !== '';
    return labelExists ? label : 'Кнопка';
}


// || Interfaces
interface ButtonPropsInternal{
    circle?: boolean,
    color: ButtonColor,
    disabled: boolean,
    icon?: boolean,
    label?: string,
    loader: boolean,
    type: ButtonType,
    width: string,
    onClick?: () => void;
}

interface StyledButtonProps{
    circle?: boolean,
    labelExists?: boolean,
    width?: string
}

interface ButtonThemeProps{
    mainColor: string,
    mainBackground: string,
    mainBorder: string,
    hoverBackground: string,
    activeBackground?: string,
    disabledColor?: string,
    disabledBackground?: string,
    disabledBorder?: string
}


// || styled-components: themes, selector, components
enum ButtonTheme{
    primary = "primary",
    primaryWhite = "primaryWhite",
    secondary = "secondary",
    secondaryWhite = "secondaryWhite",
    secondaryDark = "secondaryDark",
    flat = "flat",
    flatWhite = "flatWhite",
}

Button.defaultProps = {
    theme: {
        mainColor: PALETTE.white,
        mainBackground: PALETTE.primary,
        mainBorder: 'transparent',
    
        hoverBackground: PALETTE.hover,
        activeBackground: PALETTE.active,

        disabledBackground: PALETTE.disabled
    }
}

const PrimaryTheme : ButtonThemeProps = {
    mainColor: PALETTE.white,
    mainBackground: PALETTE.primary,
    mainBorder: 'transparent',

    hoverBackground: PALETTE.hover,
    activeBackground: PALETTE.active,

    disabledBackground: PALETTE.disabled
};

const PrimaryWhiteTheme : ButtonThemeProps = {
    mainColor: PALETTE.primary,
    mainBackground: PALETTE.white,
    mainBorder: 'transparent',

    hoverBackground: PALETTE.whiteStrong,

    disabledBackground: PALETTE.whiteMedium
}

const SecondaryTheme : ButtonThemeProps = {
    mainColor: PALETTE.primary,
    mainBackground: 'transparent',
    mainBorder: PALETTE.primary,

    hoverBackground: PALETTE.primaryFaint,
    activeBackground: PALETTE.primaryMedium,

    disabledBorder: PALETTE.primaryStrong,
    disabledColor: PALETTE.primaryStrong
}

const SecondaryWhiteTheme : ButtonThemeProps = {
    mainColor: PALETTE.white,
    mainBackground: 'transparent',
    mainBorder: PALETTE.white,

    hoverBackground: PALETTE.whiteExtraFaint,
    activeBackground: PALETTE.whiteFaint,

    disabledBorder: PALETTE.whiteMedium,
    disabledColor: PALETTE.whiteMedium
}

const SecondaryDarkTheme : ButtonThemeProps = {
    mainColor: PALETTE.black,
    mainBackground: 'transparent',
    mainBorder: PALETTE.black,

    hoverBackground: PALETTE.blackFaint,
    activeBackground: PALETTE.blackMedium,

    disabledBorder: PALETTE.blackHeavy,
    disabledColor: PALETTE.blackHeavy
}

const FlatTheme : ButtonThemeProps = {
    mainColor: PALETTE.primary,
    mainBackground: 'transparent',
    mainBorder: 'transparent',

    hoverBackground: PALETTE.primaryFaint,
    activeBackground: PALETTE.primaryMedium,

    disabledColor: PALETTE.primaryStrong
}

const FlatWhiteTheme : ButtonThemeProps = {
    mainColor: PALETTE.white,
    mainBackground: 'transparent',
    mainBorder: 'transparent',

    hoverBackground: PALETTE.whiteExtraFaint,
    activeBackground: PALETTE.whiteFaint,

    disabledColor: PALETTE.whiteMedium
}


function getTheme(color : ButtonColor, type : ButtonType) : ButtonThemeProps{
    const themeEnum = getThemeEnum(color, type);
    return themePicker(themeEnum);
}


function getThemeEnum(color : ButtonColor, type : ButtonType) : ButtonTheme{

    // In the absence of a "true" dark theme, return the darkest of the available themes.
    if(color === ButtonColor.dark){
        switch(type){
            case ButtonType.primary:
                return ButtonTheme.primary;

            case ButtonType.flat:
                return ButtonTheme.flat;

            default:
                return ButtonTheme.secondaryDark;
        }
    }

    if(color === ButtonColor.white){
        switch(type){
            case ButtonType.primary:
                return ButtonTheme.primaryWhite;

            case ButtonType.flat:
                return ButtonTheme.flatWhite;

            default:
                return ButtonTheme.secondaryWhite;
        }
    }

    switch(type){
        case ButtonType.primary:
            return ButtonTheme.primary;
           
        case ButtonType.flat:
            return ButtonTheme.flat;

        default:
            return ButtonTheme.secondary;
    }
}

const themePicker = (style : ButtonTheme) : ButtonThemeProps => {
    switch(style){
        case ButtonTheme.primary:
            return PrimaryTheme;

        case ButtonTheme.primaryWhite:
            return PrimaryWhiteTheme;

        case ButtonTheme.secondary:
            return SecondaryTheme;

        case ButtonTheme.secondaryWhite:
            return SecondaryWhiteTheme;

        case ButtonTheme.secondaryDark:
            return SecondaryDarkTheme;

        case ButtonTheme.flat:
            return FlatTheme;    

        case ButtonTheme.flatWhite:
            return FlatWhiteTheme;

        default:
            return PrimaryTheme;
    }
};


const buttonResetCss = css`
    font-size: 1rem;
    line-height: 1.5rem;
    margin: 0;
    overflow: visible;
    text-transform: none;
    -webkit-appearance: button;
    border: none;
`;


const StyledButton = styled.button`
    ${ buttonResetCss }

    align-items: center;
    background: ${ props => props.theme.mainBackground }; 
    border-radius: ${ (props : StyledButtonProps) => props.circle ? "9999px" :  LAYOUT.borderRadius };
    box-shadow: inset 0px 0px 0px 0.125rem ${ props => props.theme.mainBorder };
    box-sizing: border-box;
    color: ${ props => props.theme.mainColor };
    display: flex;
    font-family: ${ FONT.main };
    justify-content: center;
    padding: ${ (props : StyledButtonProps) => props.labelExists ? "0.625rem 1.25rem" : "0.625rem" };
    width: ${ (props : StyledButtonProps) => props.width ? props.width : "auto" };

    &:active {
        background: ${ props => props.theme.activeBackground ? props.theme.activeBackground : props.theme.mainBackground };
    }

    &:disabled{
        background: ${ props => props.theme.disabledBackground ? props.theme.disabledBackground : props.theme.mainBackground };
        box-shadow: inset 0px 0px 0px 0.125rem ${ props => props.theme.disabledBorder ? props.theme.disabledBorder : props.theme.mainBorder };
        color: ${ props => props.theme.disabledColor ? props.theme.disabledColor : props.theme.mainColor };
    }

    &:focus {
        box-shadow: inset 0px 0px 0px 0.125rem rgba(0, 0, 0, 0.48);
    }

    &:hover {
        background: ${ props => props.theme.hoverBackground };
    }
`;


const StyledSpan = styled.span<Pick<ButtonPropsInternal, "icon">>`
    padding-left: ${ props => props.icon ? "0.28rem" : "0"};
`;


// || export default Button
export function Button({circle, color, disabled, icon, label, loader, onClick, type, width} : ButtonPropsInternal){

    const labelExists : boolean = !isBlank(label);
    const theme = getTheme(color, type);
    const iconColor : string = disabled && ("disabledColor" in theme) && typeof theme.disabledColor === "string" ? theme.disabledColor : theme.mainColor;

    if(loader){
        return  <ThemeProvider theme = { theme }>
                    <StyledButton   circle = { circle } labelExists = { labelExists } width = { width }
                                    disabled = { disabled } onClick = { onClick }>
                        <IconReloadSvg 
                            color = { iconColor }
                            size = { ICON_SIZES.medium }
                        />
                    </StyledButton>
                </ThemeProvider>
    }

    return  <ThemeProvider theme = { theme }>
                <StyledButton   circle = { circle } labelExists = { labelExists }
                                disabled = { disabled } onClick = { onClick }>
                    {icon &&
                        <IconPlusSvg color = { iconColor } size = {ICON_SIZES.medium} />
                    }
                    {labelExists &&
                        <StyledSpan icon={icon}>
                            {label}
                        </StyledSpan>                      
                    }
                </StyledButton>
            </ThemeProvider>
}

