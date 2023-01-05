import React from 'react';
import { ICON_SIZES } from './Theme';


interface IconMinusSvgProps{
    color: string
}

export default function IconMinus({color} : IconMinusSvgProps){

    return <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="7" width="12" height="2" rx="1" 
                fill={color}/>
            </svg>
}


