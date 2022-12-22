import React from 'react';
import {ButtonIconProps, Button} from './Button';

// export default function ButtonIcon({disabled, loader, onClick, style} : ButtonIconProps){
//     return <Button icon
//                 disabled = {disabled}
//                 loader = {loader}
//                 onClick = {onClick}
//                 style = {style}
//                 width = {"auto"}
//             />
// }

export default function ButtonIcon({color, disabled, loader, onClick, type} : ButtonIconProps){
    const loaderWidth = "auto";
    
    return <Button icon
                color = {color}
                disabled = {disabled}
                loader = {loader}
                onClick = {onClick}
                type = {type}
                width = {loaderWidth}
            />
}