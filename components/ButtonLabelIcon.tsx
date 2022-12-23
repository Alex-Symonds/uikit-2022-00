import React from 'react';
import {ButtonLabelProps, Button, setLabel} from './Button';

export default function ButtonLabelIcon({color, disabled, label, loader, onClick, type} : ButtonLabelProps){
    const loaderWidth = "7.75rem";

    return <Button icon 
                color = {color}
                disabled = {disabled}
                label = {setLabel(label)}
                loader = {loader}
                onClick = {onClick}
                type = {type}
                width = {loaderWidth}
            />
}