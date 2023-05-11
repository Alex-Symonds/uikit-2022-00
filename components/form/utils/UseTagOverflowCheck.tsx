import React, {useLayoutEffect} from 'react';
import styled, {css} from 'styled-components';

import { addOpacityToColor } from '../../../utils/utils';

export const StyledTagsContainer = styled.div.attrs(props => ({
    thumbColor: addOpacityToColor(props.theme.color.mainText, props.theme.opacity.alphaStrong),
    trackColor: addOpacityToColor(props.theme.color.mainText, props.theme.opacity.alphaFainter),
}))<{readOnly : boolean, maxWidth : string, isOverflowing : boolean}>`
    align-items: center;
    display: flex;
    gap: 0.25rem;
    max-width: ${props => props.readOnly ? "100%" : props.maxWidth};

    ${ props => {
        if(props.isOverflowing){
            return css`
                min-width: ${props.readOnly ? "100%" : props.maxWidth};
                overflow-x: auto;
                overflow-y: hidden;
            
                // Firefox doesn't support the webkit prefixed properties, but does support these two
                scrollbar-color: ${ props.thumbColor } ${ props.trackColor};
                scrollbar-width: thin;
            
                &::-webkit-scrollbar {
                    height: 0.5rem;
                }
            
                &::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px ${ props.trackColor};
                    border-radius: 10px;
                    border: 0.125rem solid transparent;
                }
            
                &::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px ${ props.thumbColor };
                    border: 0.125rem solid transparent;
                }  
            `;
        }
    }}
`;


interface I_useTagOverflowCheck{
    tags : string[] | null,
    ref : React.MutableRefObject<any>,
}

export default function useTagOverflowCheck({tags, ref} : I_useTagOverflowCheck){
    const [isOverflowing, setIsOverflowing] = React.useState(false);

    useLayoutEffect(() => {
        if( !(tags && ref.current)){
            return;
        }

        const width : number = ref.current.clientWidth;
        const scrollWidth : number = ref.current.scrollWidth;

        //console.log(`Overflow checker: ${width} vs. ${scrollWidth}`);

        if(scrollWidth > width){
            setIsOverflowing(true);
            return;
        }
        setIsOverflowing(false);
    }, [tags, ref]);

    return isOverflowing;
}