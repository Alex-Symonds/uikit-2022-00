/*
    For use with TooltipWrapper.
    Automatically positions the Tooltip relative to the wrapper, based on the 
    Tooltip's arrowPos (it will point to the target DOM element) and the TOOLTIP_POS,
    (which is used to pick one of three locations along the target).
*/
import React from 'react';
import styled from 'styled-components';
import Tooltip, {I_TooltipProps, TOOLTIP_ARROW_POSITION as ARROW_POS} from './Tooltip';
import { convertRemToPixels } from '../utils/utils';
import { PositionsObj } from './TooltipWrapper';
import updateToFit from '../utils/tooltipPosUpdateToFit';

export enum TOOLTIP_POS{
    start = "start",
    center = "center",
    end = "end"
}

// For topX and bottomX arrows only: the distance between the edge of the tooltip and the static arrow point.
// This can be used to adjust tooltip positioning to make it relative to the arrow point.
const OFFSET_ARROW_PERP = "1.375rem"; 
const OFFSET_ARROW_PERP_PX = convertRemStrToPx(OFFSET_ARROW_PERP);

// For all arrow types. Arbitrary/subjective offset. "Start" and "end" don't look right if they point to 
// the very first pixel of the target element, so move them inwards a bit, so they look nicer.
const OFFSET_EDGE = "0.6875rem";
const OFFSET_EDGE_PX = convertRemStrToPx(OFFSET_EDGE);

// For all arrow types. Offset to leave space between the tooltip and the target: for the arrow plus a
// little artistic-extra.
const OFFSET_ARROW_OUTWARDS = "0.4375rem";
const OFFSET_ARROW_OUTWARDS_PX = convertRemStrToPx(OFFSET_ARROW_OUTWARDS);
const NEXT_TO_TARGET = `calc(100% + ${OFFSET_ARROW_OUTWARDS})`;

function convertRemStrToPx(str : string) : number{
    /* Guide for if you haven't used regex in a while:
       ---------------------------------------------------------------------------------------------------
        ^               Beginning of string
        -?              Optional "-" to support negative rem strings
        (               Begin a group. This group will define what's considered "a valid number".
        \d*[1-9]\d*         A number of any size, but with at least one non-zero digit.
        (\.\d+)?            Optional: Decimal point with at least one number after it.
        |               OR
        0*                  Any number of 0s, including none at all.
        \.                  A decimal point.
        \d*[1-9]\d*         A number of any size, but with at least one non-zero digit.
        )               End of the "a valid number" group.
        (?=rem$)        Look ahead to make sure the valid number is followed by "rem" and then the string ends.

        Matches -5rem, 12rem, 1.2rem and .25rem. Does not match _1rem, 5rems, 0rem, 0.0rem, 0.rem, rem.
    */
    const regex = /^-?(\d*[1-9]\d*(\.\d+)?|0*\.\d*[1-9]\d*)(?=rem$)/;
    const result = str.trim().match(regex);
    if(result !== null && result.length > 0){
        return convertRemToPixels(parseFloat(result[0]));
    }
    return 0;
}


// Take the ArrowPos chosen for the tooltip and set its implications for TooltipResponsive.
export type T_ArrowPosWithSettings = {
    arrow : ARROW_POS,
    defaultPerpPos : TOOLTIP_POS,
    fromTop : boolean,
    fromLeft : boolean,
    atSideOfTarget : boolean,
    fallbackTop : boolean | undefined,
    fallbackLeft : boolean | null,
}
export function addSettingsToArrowPos(arrowPos: ARROW_POS | undefined) : T_ArrowPosWithSettings{
    let fromTop : boolean;
    let fromLeft : boolean;
    let atSideOfTarget : boolean;
    let fallbackTop : boolean | undefined; // undefined = depends on start/center/end
    let fallbackLeft : boolean | null; // null = not relevant for this arrowPos

    let defaultPerpPos : TOOLTIP_POS = TOOLTIP_POS.start;
    let arrow = arrowPos ?? ARROW_POS.bottomLeft; // undefined arrowPos is covered here

    switch(arrow){
        case ARROW_POS.bottomLeft:
            fromTop = false;
            fromLeft = true;
            atSideOfTarget = false;
            fallbackTop = false;
            fallbackLeft = null;
            break;

        case ARROW_POS.bottomRight:
            defaultPerpPos = TOOLTIP_POS.end;
            fromTop = false;
            fromLeft = false;
            atSideOfTarget = false;
            fallbackTop = false;
            fallbackLeft = null;
            break;

        case ARROW_POS.left:
            fromTop = true;
            fromLeft = true;
            atSideOfTarget = true;
            fallbackTop = undefined;
            fallbackLeft = false;
            break;

        case ARROW_POS.topLeft:
            fromTop = true;
            fromLeft = true;
            atSideOfTarget = false;
            fallbackTop = true;
            fallbackLeft = null;
            break;

        case ARROW_POS.topRight:
            defaultPerpPos = TOOLTIP_POS.end;
            fromTop = true;
            fromLeft = false;
            atSideOfTarget = false;
            fallbackTop = true;
            fallbackLeft = null;
            break;

        case ARROW_POS.right:
            fromTop = true;
            fromLeft = false;
            atSideOfTarget = true;
            fallbackTop = undefined;
            fallbackLeft = true;
            break;

        // no default case: the line above the switch covers "undefined"; all enum options must be covered
    }

    return {
        arrow,
        defaultPerpPos,
        fromTop,
        fromLeft,
        atSideOfTarget,
        fallbackTop,
        fallbackLeft,
    }
}



// Styled-Component
type T_Positioning = {
    top: string,
    right: string,
    bottom: string,
    left : string,
}
type T_PropsTooltipWrapper = {
    pos: T_Positioning
}
type T_OutputTypeTooltipWrapperAttrs = {
    style : T_Positioning
}
// Position is in the "style" attr because otherwise screen resizing generates hundreds of CSS classes.
const StyledTooltipContainer = styled.div.attrs<
    T_PropsTooltipWrapper,
    T_OutputTypeTooltipWrapperAttrs
    >((props : T_PropsTooltipWrapper) => {
        return {
            style: {
                    top: props.pos ? props.pos.top : "0",
                    right: props.pos ? props.pos.right : "0",
                    bottom: props.pos ? props.pos.bottom : "0",
                    left: props.pos ? props.pos.left : "0",
                },
        }
    })<T_PropsTooltipWrapper>`

    display: block;
    position: absolute;
    z-index: 5;
    width: max-content;
    max-width: 25rem;
`;


// Prepare the settings to be used in the style attribute
export type T_TooltipOptions = {
    settings : T_ArrowPosWithSettings,
    perpPos : TOOLTIP_POS,
}
type T_TooltipOptionsWithHeight = T_TooltipOptions & { 
    heightInPx : number,
}
function getPositioningSettings({perpPos, settings, heightInPx} : T_TooltipOptionsWithHeight) : T_Positioning{
    let posSettings = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto",
    }

    const strX = getCssForXAxis({perpPos, settings});
    if(settings.fromLeft){
        posSettings.left = strX;
    }
    else{
        posSettings.right = strX;
    }

    const strY = getCssForYAxis({perpPos, settings, heightInPx});
    if(settings.fromTop){
        posSettings.top = strY;
    }
    else{
        posSettings.bottom = strY;
    }

    return posSettings;
}


function getCssForXAxis({perpPos, settings} : T_TooltipOptions) : string{
    if(settings.atSideOfTarget){
        return NEXT_TO_TARGET;
    }

    const offset = `${getXOffsetPx({perpPos, settings})}px`;
    const offsetCloseSide = `-${offset}`;
    const offsetFarSide = `calc(100% - ${offset})`;

    switch(perpPos){
        case TOOLTIP_POS.start:
            return settings.fromLeft ? offsetCloseSide : offsetFarSide;

        case TOOLTIP_POS.end:
            return settings.fromLeft ? offsetFarSide : offsetCloseSide;

        case TOOLTIP_POS.center:
            return `calc(50% - ${offset})`;

        default:
            return "0";
    } 
}


function getCssForYAxis({perpPos, settings, heightInPx} : T_TooltipOptionsWithHeight) : string{
    if(!settings.atSideOfTarget){
        return NEXT_TO_TARGET;
    }

    const heightOffset = `${heightInPx / 2}px`;
    switch(perpPos){
        case TOOLTIP_POS.start:
            return `calc(${OFFSET_EDGE} - ${heightOffset})`;

        case TOOLTIP_POS.end:
            return `calc(100% - ${OFFSET_EDGE} - ${heightOffset})`;

        case TOOLTIP_POS.center:
            return `calc(50% - ${heightOffset})`;
            
        default:
            return "0";
    }
}



// Get X-axis offsets in pixels (converted from rem, so responsive)
export function getXOffsetPx({settings, perpPos} : T_TooltipOptions) : number{
    if(settings.atSideOfTarget){
        return OFFSET_ARROW_OUTWARDS_PX;
    }

    const farSideOffset : number = OFFSET_EDGE_PX + OFFSET_ARROW_PERP_PX;
    switch(perpPos){
        case TOOLTIP_POS.start:
            return settings.fromLeft ? OFFSET_EDGE_PX : farSideOffset;

        case TOOLTIP_POS.end:
            return settings.fromLeft ? farSideOffset : OFFSET_EDGE_PX;

        case TOOLTIP_POS.center:
            return OFFSET_ARROW_PERP_PX;
        
        default:
            return 0;
    }
}


// Responsiveness Helper types
export type T_DOMElementSettings = {
    wrapperPos: PositionsObj,
    preferredWidth : number,
}

export type T_MaxSpaceToEachSide = {
    maxSpaceGoingLeft : number,
    maxSpaceGoingRight : number,
}


// Hooks
type useFullscreenModeProps = T_MaxSpaceToEachSide & Pick<T_DOMElementSettings, "preferredWidth">;
function useFullscreenMode({maxSpaceGoingLeft, maxSpaceGoingRight, preferredWidth} : useFullscreenModeProps) : boolean{
    const [fullscreenMode, setFullscreenMode] = React.useState<boolean>(false);

    React.useEffect(() => {
        window.addEventListener("resize", updateFullscreenMode);
        return () => window.removeEventListener("resize", updateFullscreenMode);
    }, []);

    function updateFullscreenMode(){
        const needFullscreen =  preferredWidth > maxSpaceGoingLeft
                                && preferredWidth > maxSpaceGoingRight;

        if(fullscreenMode && !needFullscreen){
            setFullscreenMode(false);
        }
        else if(!fullscreenMode && needFullscreen){
            setFullscreenMode(true);
        }
    }

    updateFullscreenMode();

    return fullscreenMode;
}

type T_UseDimensionsProps = {
    ref : React.MutableRefObject<HTMLDivElement | HTMLElement | null>,
    text? : string,
}
type T_Dimensions = {
    height : number,
    width: number,
}
function useOriginalDimensions({ref, text} : T_UseDimensionsProps) : T_Dimensions{
    const [measurements, setMeasurements] = React.useState<T_Dimensions>(getDimensions);

    function getDimensions(){
        return {
            height: ref.current ? ref.current.offsetHeight : 0,
            width: ref.current ? ref.current.offsetWidth : 0,
        }
    }

    function updateDimensions(){
        if(ref.current){
            setMeasurements(getDimensions());
        }
    }

    React.useLayoutEffect(() => {
        updateDimensions();
    }, []);

    React.useEffect(() => {
        updateDimensions();
    }, [text]);

    return measurements;
}


type T_TooltipPositionedProps =   Pick<I_TooltipProps, "arrowPos" | "id" | "text"> 
                                & Pick<T_DOMElementSettings, "wrapperPos"> 
                                & {
                                    pos? : TOOLTIP_POS,
                                };
export default function TooltipPositioned({arrowPos, pos, text, id, wrapperPos} : T_TooltipPositionedProps){
    const ref = React.useRef<HTMLDivElement | null>(null);
    const {height: preferredHeight, width: preferredWidth} = useOriginalDimensions({ref, text});

    let settings = addSettingsToArrowPos(arrowPos);
    let perpPos = pos ?? settings.defaultPerpPos;

    let maxSpaceGoingLeft = wrapperPos.right + OFFSET_EDGE_PX;
    let maxSpaceGoingRight = window.innerWidth - wrapperPos.left + OFFSET_EDGE_PX;  

    const fullscreenMode = useFullscreenMode({maxSpaceGoingLeft, maxSpaceGoingRight, preferredWidth});
    if(!fullscreenMode){
        let responsive = updateToFit({settings, perpPos, fullscreenMode, wrapperPos, preferredWidth, maxSpaceGoingLeft, maxSpaceGoingRight});
        settings = responsive.settings;
        perpPos = responsive.perpPos;
    }

    return  <StyledTooltipContainer ref={ref} 
                                    pos={getPositioningSettings({perpPos, settings, heightInPx: preferredHeight})}
                                    >
                <Tooltip    arrowPos={settings.arrow}
                            fullscreenMode={fullscreenMode}
                            id={id} 
                            text={text}
                            wrapperPos={wrapperPos}
                />
            </StyledTooltipContainer>
}



