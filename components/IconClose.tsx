import React from 'react';
import { ICON_SIZES } from './Theme';

interface IconCloseSvgProps{
    color: string,
    size?: ICON_SIZES.small | ICON_SIZES.medium | ICON_SIZES.large | ICON_SIZES.extraLarge
}

export default function IconClose({color, size} : IconCloseSvgProps){
    size = size ?? ICON_SIZES.medium;

    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path   fillRule="evenodd" clipRule="evenodd" 
                        d="M6.33496 16.0461C5.88802 16.4931 5.88802 17.2177 6.33496 17.6646C6.78189 18.1116 7.50652 18.1116 7.95346 17.6646L11.9998 13.6183L16.0463 17.6648C16.4932 18.1117 17.2179 18.1117 17.6648 17.6648C18.1117 17.2178 18.1117 16.4932 17.6648 16.0463L13.6183 11.9998L17.6645 7.95364C18.1114 7.5067 18.1114 6.78208 17.6645 6.33514C17.2175 5.88821 16.4929 5.8882 16.046 6.33514L11.9998 10.3813L7.95379 6.33529C7.50685 5.88836 6.78223 5.88836 6.33529 6.33529C5.88835 6.78223 5.88835 7.50686 6.33529 7.95379L10.3813 11.9998L6.33496 16.0461Z" 
                        fill={color}/>
            </svg>
    
}