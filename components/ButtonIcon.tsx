import React from 'react';
import {ButtonIconProps, Button} from './Button';

export default function ButtonIcon({color, disabled, loader, onClick, type} : ButtonIconProps){
    const loaderWidth = "auto";

    return <Button icon
                color = {color}
                disabled = {disabled === undefined ? false : disabled}
                loader = {loader === undefined ? false : loader}
                onClick = {onClick}
                type = {type}
                width = {loaderWidth}
            />
}