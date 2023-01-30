import React from 'react';
import {I_ButtonProps, Button, setLabel} from './Button';

export default function ButtonLabel({colorMode, disabled, label, loader, onClick, type} : I_ButtonProps){
    const loaderWidth = "6rem";

    return <Button 
                colorMode = {colorMode}
                disabled = {disabled === undefined ? false : disabled}
                label = {setLabel(label)}
                loader = {loader === undefined ? false : loader}
                onClick = {onClick}
                type = {type}
                width = {loaderWidth}
            />
}