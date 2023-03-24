/*
    Wrapper component to place around the element which wants a tooltip.
*/
import React from 'react';
import styled from 'styled-components';
import {I_TooltipProps} from './Tooltip';
import useCloseOnOutsideClick from '../utils/UseCloseOnOutsideClick';
import TooltipPositioned, { TOOLTIP_POS } from './TooltipPositioned';

const StyledWrapper = styled.div`
    height: fit-content;
    position: relative;
    width: fit-content;
`;

type TooltipWrapperProps = Pick<I_TooltipProps, "arrowPos" | "text"> & {
    className?: string,
    pos? : TOOLTIP_POS,
    lockVisible? : boolean,
    children: React.ReactNode,
}

export default function TooltipWrapper({lockVisible, className, pos, text, arrowPos, children} : TooltipWrapperProps){
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);
    const wrapperPos = useXPosition(ref);
    
    // For touchscreen users
    useCloseOnOutsideClick({
        isOpen : isVisible, 
        containerEle : ref.current ? ref.current : null,
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
                <TooltipPositioned  arrowPos={arrowPos} 
                                    id={id}
                                    pos={pos} 
                                    text={text} 
                                    wrapperPos={wrapperPos}
                />
                : null
            }
            </StyledWrapper>
}

export type PositionsObj = {
    left : number,
    right : number,
    top : number,
    bottom : number,
}
 function useXPosition(ref : React.MutableRefObject<HTMLDivElement | null>) : PositionsObj{
    const [positions, setPositions] = React.useState(getPositions);

    function getPositions(){
        const tarRect = ref.current ? ref.current.getBoundingClientRect() : null;
        return {
                left: tarRect ? tarRect.left : 0,
                right: tarRect ? tarRect.right : 0,
                top: tarRect ? tarRect.top : 0,
                bottom: tarRect ? tarRect.bottom : 0,
            };
    };

    function handleResize(){
        setPositions(getPositions());
    };

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    React.useLayoutEffect(() => {
        handleResize();
    }, []);

    return positions;
}

