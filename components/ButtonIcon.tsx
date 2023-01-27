import React from 'react';
import {I_ButtonProps, Button} from './Button';

export default function ButtonIcon({colorMode, disabled, icon, loader, onClick, type} : I_ButtonProps){
    const loaderWidth = "auto";

    return <Button
                colorMode = {colorMode}
                disabled = {disabled === undefined ? false : disabled}
                icon = {icon}
                loader = {loader === undefined ? false : loader}
                onClick = {onClick}
                type = {type}
                width = {loaderWidth}
            />
}