import React from 'react';
import {I_ButtonProps, Button, setLabel, getDefaultIcon} from './Button';

export default function ButtonLabelIcon({colorMode, disabled, icon, label, loader, onClick, type} : I_ButtonProps){
    const loaderWidth = "7.75rem";
    icon = icon ?? getDefaultIcon();

    return <Button
                colorMode = {colorMode}
                disabled = {disabled === undefined ? false : disabled}
                icon = {icon}
                label = {setLabel(label)}
                loader = {loader === undefined ? false : loader}
                onClick = {onClick}
                type = {type}
                width = {loaderWidth}
            />
}