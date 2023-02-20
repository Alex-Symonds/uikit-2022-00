import React, {useEffect} from 'react';
import {css} from 'styled-components';
import { PALETTE } from './Theme';

export const overflowBarX = css`    
    overflow-x: auto;
    overflow-y: hidden;

    // Firefox doesn't support the webkit prefixed properties, but does support these two
    scrollbar-color: ${PALETTE.blackStrong} ${PALETTE.blackMedium};
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        height: 0.5rem;
    }

    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px ${PALETTE.blackMedium};
        border-radius: 10px;
        border: 0.125rem solid transparent;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px ${PALETTE.blackStrong};
        border: 0.125rem solid transparent;
    }
`;

interface I_useTagOverflowCheck{
    tags : string[] | null,
    containerEle : HTMLElement | null,
}

export default function useTagOverflowCheck({tags, containerEle} : I_useTagOverflowCheck){
    const [isOverflowing, setIsOverflowing] = React.useState(false);

    useEffect(() => {
        if( !(tags && containerEle)){
            return;
        }

        const width : number = containerEle.clientWidth;
        const scrollWidth : number = containerEle.scrollWidth;

        //console.log(`Overflow checker: ${width} vs. ${scrollWidth}`);

        if(scrollWidth > width){
            setIsOverflowing(true);
            return;
        }
        setIsOverflowing(false);

    }, [tags, containerEle]);

    return isOverflowing;
}