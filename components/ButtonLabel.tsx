import React from 'react';
import {ButtonLabelProps, Button, setLabel} from './Button';

export default function ButtonLabel({color, disabled, label, loader, onClick, type} : ButtonLabelProps){
    const loaderWidth = "6rem";

    return <Button 
                color = {color}
                disabled = {disabled === undefined ? false : disabled}
                label = {setLabel(label)}
                loader = {loader === undefined ? false : loader}
                onClick = {onClick}
                type = {type}
                width = {loaderWidth}
            />
}