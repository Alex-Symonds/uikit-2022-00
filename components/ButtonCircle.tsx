import React from 'react';
import {ButtonIconProps, Button} from './Button';

export default function ButtonCircle({color, disabled, loader, onClick, type} : ButtonIconProps){
    const loaderWidth = "auto";

    return <Button circle icon
                color = {color}
                disabled = {disabled}
                loader = {loader}
                onClick = {onClick}
                type = {type}
                width = {loaderWidth}
            />
}