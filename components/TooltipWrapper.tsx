import React from 'react';
import styled, {css} from 'styled-components';
import { visuallyHidden, visuallyUnhidden } from '../utils/utils';
import Tooltip, {I_TooltipProps, TOOLTIP_ARROW_POSITION} from './Tooltip';

export enum TOOLTIP_POSITION{
    start = "start",
    center = "center",
    end = "end"
}

// For topX and bottomX arrows: the distance between the edge of the tooltip and the arrow point.
// Use this offset to adjust tooltip positioning so it relates to the arrow point (rather than the edge).
const ARROW_OFFSET = "1.375rem"; 

// Start and end settings don't look right if they point to the very first pixel of the target element.
// Move them "in a bit" instead.
const EDGE_OFFSET = "0.6875rem";

// Move the tooltip so it's exactly next to the edge of the target element: then move it just a little 
// bit more, to leave space for the arrow and a tiny gap.
const NEXT_TO_TARGET = "calc(100% + 0.4375rem)";



type TooltipWrapperProps = {
    arrowPos? : TOOLTIP_ARROW_POSITION,
    availableWidth : number,
    perpPos? : TOOLTIP_POSITION,  
    tooltipIsVisible : boolean
    dimensions: { width : number, height : number },
}

type TooltipWrapperAttrsOutput = {
    style : {
        top: string,
        right: string,
        bottom: string,
        left : string,
        maxWidth : string,
    },
}

const StyledTooltipContainer = styled.div.attrs<
        TooltipWrapperProps,
        TooltipWrapperAttrsOutput
    >((props : TooltipWrapperProps) => {
        const pos = getPositioningSettings({perpPos: props.perpPos, arrowPos: props.arrowPos, dimensions : props.dimensions});
        return {
            style: {
                    top: pos ? pos.top : "0",
                    right: pos ? pos.right : "0",
                    bottom: pos ? pos.bottom : "0",
                    left: pos ? pos.left : "0",
                    maxWidth: `min(25rem, ${props.availableWidth}px)`,
                },
        }
    })<TooltipWrapperProps>`

    display: block;
    position: absolute;
    z-index: 5;
    width: max-content;

    ${props => {
        if(!props.tooltipIsVisible){
            return visuallyHidden;
        }
    }}
`;

const StyledWrapper = styled.div`
    width: fit-content;
    height: fit-content;

    position: relative;
`;

// This works, but also apparently generates a gazillion classes (if the window is resized a lot)
// const StyledWrapper = styled.div<TooltipWrapperProps>`
//     width: fit-content;
//     height: fit-content;

//     position: relative;
//     ${props => {
//         if(!props.tooltipIsVisible){
//             return;
//         }
//         return css`${StyledTooltipContainer}{
//             ${visuallyUnhidden}
//             display: block;
//             position: absolute;
//             z-index: 5;
    
//             width: max-content;
//             max-width: ${props.availableWidth >= props.dimensions.width ? "25rem" : `${props.availableWidth}px`};
            
//             ${getPositioningCss({perpPos: props.perpPos, arrowPos: props.arrowPos, dimensions : props.dimensions})};
//         }`
//     }}

// `;


// function getPositioningCss({perpPos, arrowPos, dimensions} : Pick<TooltipWrapperProps, "arrowPos" | "dimensions" | "perpPos">){
//     let offsetSize : string;

//     switch(arrowPos){

//         case TOOLTIP_ARROW_POSITION.bottomLeft:
//             perpPos = perpPos ?? TOOLTIP_POSITION.start;
//             offsetSize = getPerpendicularX(perpPos, false);
//             return css`
//                 bottom: ${NEXT_TO_TARGET};
//                 left: ${offsetSize};
//             `;

//         case TOOLTIP_ARROW_POSITION.bottomRight:
//             perpPos = perpPos ?? TOOLTIP_POSITION.end;
//             offsetSize = getPerpendicularX(perpPos, true);
//             return css`
//                 bottom: ${NEXT_TO_TARGET};
//                 right: ${offsetSize};
//             `;

//         case TOOLTIP_ARROW_POSITION.left:
//             perpPos = perpPos ?? TOOLTIP_POSITION.start;
//             offsetSize = getPerpendicularY(perpPos, dimensions.height);
//             return css`
//                 top: ${offsetSize};
//                 left: ${NEXT_TO_TARGET};
//             `;

//         case TOOLTIP_ARROW_POSITION.topLeft:
//             perpPos = perpPos ?? TOOLTIP_POSITION.start;
//             offsetSize = getPerpendicularX(perpPos, false);
//             return css`
//                 top: ${NEXT_TO_TARGET};
//                 left: ${offsetSize};
//             `;

//         case TOOLTIP_ARROW_POSITION.topRight:
//             perpPos = perpPos ?? TOOLTIP_POSITION.end;
//             offsetSize = getPerpendicularX(perpPos, true);
//             return css`
//                 top: ${NEXT_TO_TARGET};
//                 right: ${offsetSize};
//             `;

//         case TOOLTIP_ARROW_POSITION.right:
//             perpPos = perpPos ?? TOOLTIP_POSITION.start;
//             offsetSize = getPerpendicularY(perpPos, dimensions.height);
//             return css`
//                 top: ${offsetSize};
//                 right: ${NEXT_TO_TARGET};
//             `;

//         default:
//             return null;
//     }
// }

function getPositioningSettings({perpPos, arrowPos, dimensions} : Pick<TooltipWrapperProps, "arrowPos" | "dimensions" | "perpPos">){
    switch(arrowPos){

        case TOOLTIP_ARROW_POSITION.bottomLeft:
            perpPos = perpPos ?? TOOLTIP_POSITION.start;
            return {
                top: "auto",
                right: "auto",
                bottom: NEXT_TO_TARGET,
                left: getPerpendicularX(perpPos, false),
            }

        case TOOLTIP_ARROW_POSITION.bottomRight:
            perpPos = perpPos ?? TOOLTIP_POSITION.end;
            return {
                top: "auto",
                right: getPerpendicularX(perpPos, true),
                bottom: NEXT_TO_TARGET,
                left: "auto",
            }

        case TOOLTIP_ARROW_POSITION.left:
            perpPos = perpPos ?? TOOLTIP_POSITION.start;
            return {
                top: getPerpendicularY(perpPos, dimensions.height),
                right: "auto",
                bottom: "auto",
                left: NEXT_TO_TARGET,
            }

        case TOOLTIP_ARROW_POSITION.topLeft:
            perpPos = perpPos ?? TOOLTIP_POSITION.start;
            return {
                top: NEXT_TO_TARGET,
                right: "auto",
                bottom: "auto",
                left: getPerpendicularX(perpPos, false),
            }

        case TOOLTIP_ARROW_POSITION.topRight:
            perpPos = perpPos ?? TOOLTIP_POSITION.end;
            return {
                top: NEXT_TO_TARGET,
                right: getPerpendicularX(perpPos, true),
                bottom: "auto",
                left: "auto",
            }

        case TOOLTIP_ARROW_POSITION.right:
            perpPos = perpPos ?? TOOLTIP_POSITION.start;
            return {
                top: getPerpendicularY(perpPos, dimensions.height),
                right: NEXT_TO_TARGET,
                bottom: "auto",
                left: "auto",
            }

        default:
            return null;
    }
}

function getPerpendicularX(pos : TOOLTIP_POSITION, fromRight : boolean){
    /*  As more tooltip content is added, tooltips with arrows in topX and bottomX 
        positions should keep the arrow locked in position and "grow" in width on 
        the side lacking the arrow.
        If the wrapper is positioned relative to the arrow-side, there's no need to 
        take the width of the tooltip into account: simply reverse the start and 
        end values when "right: ...;" is used.
    */

    const NEGATIVE_EDGE_OFFSET = `-${EDGE_OFFSET}`;
    const EDGE_OFFSET_FROM_OPPOSITE = `calc(100% - ${ARROW_OFFSET} - ${EDGE_OFFSET})`;

    switch(pos){
        case TOOLTIP_POSITION.start:
            return fromRight ? EDGE_OFFSET_FROM_OPPOSITE : NEGATIVE_EDGE_OFFSET;
        case TOOLTIP_POSITION.end:
            return fromRight ? NEGATIVE_EDGE_OFFSET : EDGE_OFFSET_FROM_OPPOSITE;
        case TOOLTIP_POSITION.center:
            return `calc(50% - ${ARROW_OFFSET})`;
        default:
            return NEGATIVE_EDGE_OFFSET;
    }
}

function getPerpendicularY(pos : TOOLTIP_POSITION, heightInPx : number){
    /*  As more tooltip content is added, tooltips with arrows in left and right
        positions should keep the arrow locked in position and "grow" in height
        equally on both sides of the arrow.
        This means taking the height into account.
    */

    const HEIGHT_OFFSET = `${heightInPx / 2}px`;

    switch(pos){
        case TOOLTIP_POSITION.start:
            return `calc(${EDGE_OFFSET} - ${HEIGHT_OFFSET})`;
        case TOOLTIP_POSITION.end:
            return `calc(100% - ${EDGE_OFFSET} - ${HEIGHT_OFFSET})`;
        case TOOLTIP_POSITION.center:
            return `calc(50% - ${HEIGHT_OFFSET})`;
        default:
            return `calc(${EDGE_OFFSET} - ${HEIGHT_OFFSET})`;
    }
}

interface I_TooltipWrapper extends I_TooltipProps{
    className?: string,
    pos? : TOOLTIP_POSITION,
    lockVisible? : boolean,
    children: React.ReactNode,
}
import useCloseOnOutsideClick from '../utils/UseCloseOnOutsideClick';
export default function TooltipWrapper({lockVisible, className, pos, text, arrowPos, children} : I_TooltipWrapper){
    const [isVisible, setIsVisible] = React.useState(false);

    const refWrapper = React.useRef<HTMLDivElement | null>(null);
    const refTooltip = React.useRef<HTMLDivElement | null>(null);
    const tooltipSize = useDimensions(refTooltip);

    // Set a default arrowPos if one has not been provided. This will set a default pos
    const arrowDir = arrowPos ?? TOOLTIP_ARROW_POSITION.bottomLeft;

    function availableWidth() : number{
        const paddingPx = 8;
        let screenWidth = window.innerWidth;

        if(refTooltip && refTooltip.current){ 
            let rectTooltip = refTooltip.current.getBoundingClientRect();

            // Arrow on the right = determine available space to the left
            if(    arrowDir === TOOLTIP_ARROW_POSITION.bottomRight
                || arrowDir === TOOLTIP_ARROW_POSITION.topRight
                || arrowDir === TOOLTIP_ARROW_POSITION.right
              )
            {
                return rectTooltip.right - paddingPx;
            }
            // Arrow on the left = determine available space to the right
            else{
                return screenWidth - rectTooltip.left - paddingPx;
            }
        }

        return screenWidth - (paddingPx * 2);
    }

    // For touchscreen users
    useCloseOnOutsideClick({
        isOpen : isVisible, 
        containerEle : refWrapper.current,
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
    return  <StyledWrapper  ref={refWrapper}
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
                <StyledTooltipContainer     ref={refTooltip} 
                                            arrowPos={arrowDir} 
                                            availableWidth={availableWidth()}
                                            dimensions={tooltipSize}  
                                            perpPos={pos} 
                                            tooltipIsVisible={lockVisible || isVisible} 
                                            >
                    <Tooltip id={id} text={text} arrowPos={arrowPos} />
                </StyledTooltipContainer>
            </StyledWrapper>
}

// type TooltipWrapperProps = {
//     arrowPos? : TOOLTIP_ARROW_POSITION,
//     availableWidth : number,
//     perpPos? : TOOLTIP_POSITION,  
//     tooltipIsVisible : boolean
//     dimensions: { width : number, height : number },
// }

function useDimensions(targetRef : React.MutableRefObject<HTMLDivElement | null>) {
    function getDimensions(){
        return {
            width: targetRef.current ? targetRef.current.offsetWidth : 0,
            height: targetRef.current ? targetRef.current.offsetHeight : 0
        };
    };

    const [dimensions, setDimensions] = React.useState(getDimensions);

    function handleResize(){
        setDimensions(getDimensions());
    };

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    React.useLayoutEffect(() => {
        handleResize();
    }, []);

    return dimensions;
  }


