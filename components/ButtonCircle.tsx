import React from 'react';
import {I_ButtonProps, Button} from './Button';

export default function ButtonCircle({colorMode, disabled, icon, loader, onClick, type} : I_ButtonProps){
    const loaderWidth = "auto";

    return <Button circle
                colorMode = {colorMode}
                disabled = {disabled === undefined ? false : disabled}
                icon = {icon}
                loader = {loader === undefined ? false : loader}
                onClick = {onClick}
                type = {type}
                width = {loaderWidth}
            />
}