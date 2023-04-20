/*
    Wrapper component to place around the element which wants a tooltip.
*/
import React from 'react';
import styled from 'styled-components';

import useCloseOnOutsideClick from '../../utils/UseCloseOnOutsideClick';

import { I_TooltipBubbleProps } from './TooltipBubble';
import TooltipPositioned, { T_TooltipPositionedProps } from './TooltipPositioned';
import usePosition from './utils/usePosition';

const StyledWrapper = styled.div`
    height: fit-content;
    position: relative;
    width: fit-content;
`;

type TooltipWrapperProps = 
    Pick<I_TooltipBubbleProps, "text"> 
    & Pick<T_TooltipPositionedProps, "mode" | "pointTo"> 
    &{
        className?: string,
        lockVisible? : boolean,         /* true = tooltip is permanently visible */
        children: React.ReactNode,
}


export default function TooltipWrapper({mode, lockVisible, pointTo, text, className, children} 
    : TooltipWrapperProps)
    {

    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);
    const wrapperPos = usePosition(ref); /* Used to prevent the tooltip from going off screen */
    
    // For touchscreen users
    useCloseOnOutsideClick({
        isOpen : isVisible, 
        ref : ref,
        setIsOpen : setIsVisible
    });

    function handleClick(){
        setIsVisible(prevState =>{
            return !prevState
        });
    }

    // For keyboard users
    function handleKeydown(e : React.KeyboardEvent){
        if(e.key === "Escape"){
            setIsVisible(false);
        }
    }

    const id = React.useId();
    return  <StyledWrapper  ref={ref}
                            aria-describedby={id}
                            className={className} 
                            tabIndex={0} 
                            onClick={() => handleClick()} 
                            onBlur={() => setIsVisible(false)}
                            onFocus={() => setIsVisible(true)}
                            onKeyDown={(e) => handleKeydown(e)}
                            onMouseOut={() => setIsVisible(false)}
                            onMouseOver={() => setIsVisible(true)} 
                            >
                {children}
            {lockVisible || isVisible ? 
                <TooltipPositioned  mode={mode} 
                                    id={id}
                                    pointTo={pointTo} 
                                    text={text} 
                                    wrapperPos={wrapperPos}
                />
                : null
            }
            </StyledWrapper>
}


