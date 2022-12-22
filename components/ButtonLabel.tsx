import React from 'react';
import {ButtonLabelProps, Button, setLabel} from './Button';

// export default function ButtonLabel({disabled, label, loader, onClick, style} : ButtonLabelProps){
//     return <Button 
//                 disabled = {disabled}
//                 label = {setLabel(label)}
//                 loader = {loader}
//                 onClick = {onClick}
//                 style = {style}
//                 width = {"6rem"}
//             />
// }

export default function ButtonLabel({color, disabled, label, loader, onClick, type} : ButtonLabelProps){
    const loaderWidth = "6rem";

    return <Button 
                color = {color}
                disabled = {disabled}
                label = {setLabel(label)}
                loader = {loader}
                onClick = {onClick}
                type = {type}
                width = {loaderWidth}
            />
}