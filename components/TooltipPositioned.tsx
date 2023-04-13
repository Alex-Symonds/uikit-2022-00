/*
    For use with TooltipWrapper.
    Automatically positions the Tooltip relative to the wrapper,
    based on the user's TOOLTIP_MODE and POINTS_TO selections.
*/
import React from 'react';
import styled from 'styled-components';
import Tooltip, {I_TooltipProps, TOOLTIP_ARROW_POSITION as ARROW_POS} from './Tooltip';
import { convertRemToPixels } from '../utils/utils';
import { PositionsObj } from './TooltipWrapper';
import getTooltipOptionsThatFit from '../utils/tooltipPosUpdateToFit';


export enum TOOLTIP_MODE{
    aboveWithArrowLeft = "aboveWithArrowLeft",
    aboveWithArrowRight = "aboveWithArrowRight",
    belowWithArrowLeft = "belowWithArrowLeft",
    belowWithArrowRight = "belowWithArrowRight",
    leftWithArrowMid = "leftWithArrowMid",
    rightWithArrowMid = "rightWithArrowMid"
}

export enum POINTS_TO{
    start = "start",
    center = "center",
    end = "end"
}


// || Consts for responsive offsets
// Space between the target and the tooltip bubble (space for the arrow, plus a little extra)
const OFFSET_ARROW_OUTWARDS = "0.4375rem"; 

// aboveX|belowX only. Distance from arrow point to closest side of the tooltip bubble.
const OFFSET_ARROW_PERP = "1.375rem"; 

/* 
    Move the arrow "in a bit" from start|end, so the arrow doesn't point at the very first px.
    Defined as both rem and a percentage multiplier: the smaller is chosen.
*/
const OFFSET_EDGE_REM = "0.6875rem"; // <-- Sane option for enormous targets
const OFFSET_EDGE_MULT = 0.15; // <-- Sane option for teeny targets

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


// Take the mode chosen for the tooltip and set its implications.
export type T_ModeWithSettings = {
    mode : TOOLTIP_MODE,
/* 
    The associated arrow position needed for displaying the correct tooltip "speech bubble".

    A tooltip positioned to the right of the target needs an arrow pointing left; a tooltip
    positioned above the target needs an arrow pointing downwards, from its bottom. This can
    be a bit counterintuitive when your mind is on the overall positioning, so let's squirrel
    that confusing implementation detail away in these settings and never worry about it again.
*/
    arrow : ARROW_POS,

/* pointTo is an optional argument, so pick a subjectively "nice" default for this mode */
    defaultPointTo : POINTS_TO,
    
/* Toggle the CSS keys used with the X- and Y-axis positioning values. */
    fromTop : boolean,
    fromLeft : boolean,

/* 
    Settings used to describe the mode's positioning, used for both setting the CSS and 
    responsive mode-switching.
*/
    side: SIDE,
    arrowFrom: ARROW_FROM,
} ;


export enum SIDE{
    above = "above",
    below = "below",
    left = "left",
    right = "right",
}

export enum ARROW_FROM{
    left = "left",
    right = "right",
    mid = "mid",
}


export function atSideOfTarget(modeSettings 
    : T_ModeWithSettings) 
    : boolean {

    return modeSettings.side === SIDE.left || modeSettings.side === SIDE.right;
}


export function getSettingsForMode(mode
    : TOOLTIP_MODE | undefined) 
    : T_ModeWithSettings {

    let arrow : ARROW_POS;
    let fromTop : boolean;                  
    let fromLeft : boolean;
    let side : SIDE;
    let arrowFrom : ARROW_FROM;

    // This is the same for 4/6 of the modes, so assign it here and let the 2/6 adjust it
    let defaultPointTo : POINTS_TO = POINTS_TO.start;

    // Mode is an optional argument, so handle undefined here
    mode = mode ?? TOOLTIP_MODE.aboveWithArrowLeft;

    switch(mode){
        case TOOLTIP_MODE.aboveWithArrowLeft:
            arrow = ARROW_POS.bottomLeft,
            fromTop = false;
            fromLeft = true;
            side = SIDE.above;
            arrowFrom = ARROW_FROM.left;
            break;

        case TOOLTIP_MODE.aboveWithArrowRight:
            arrow = ARROW_POS.bottomRight;
            fromTop = false;
            fromLeft = false;
            side = SIDE.above;
            arrowFrom = ARROW_FROM.right;

            defaultPointTo = POINTS_TO.end;
            break;

        case TOOLTIP_MODE.belowWithArrowLeft:
            arrow = ARROW_POS.topLeft;
            fromTop = true;
            fromLeft = true;
            side = SIDE.below;
            arrowFrom = ARROW_FROM.left;
            break;

        case TOOLTIP_MODE.belowWithArrowRight:
            arrow = ARROW_POS.topRight;
            fromTop = true;
            fromLeft = false;
            side = SIDE.below;
            arrowFrom = ARROW_FROM.right;

            defaultPointTo = POINTS_TO.end;
            break;

        case TOOLTIP_MODE.leftWithArrowMid:
            arrow = ARROW_POS.right;
            fromTop = true;
            fromLeft = false;
            side = SIDE.left;
            arrowFrom = ARROW_FROM.mid;
            break;

        case TOOLTIP_MODE.rightWithArrowMid:
            arrow = ARROW_POS.left;
            fromTop = true;
            fromLeft = true;
            side = SIDE.right;
            arrowFrom = ARROW_FROM.mid;
            break;

        // no default case: the line above the switch covers "undefined"; all enum options must be covered
    }

    return {
        mode,
        arrow,
        defaultPointTo,
        fromTop,
        fromLeft,
        side,
        arrowFrom,
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
    max-width: 31rem;
`;


// Prepare the modeSettings to be used in the style attribute
export type T_TooltipOptions = {
    modeSettings : T_ModeWithSettings,
    pointTo : POINTS_TO,
}

export type T_DOMElementSettings = {
    wrapperPos: PositionsObj,
    preferredWidth : number,
    preferredHeight : number,
}

type T_TooltipOptionsWithWrapper = 
    T_TooltipOptions 
    & Pick<T_DOMElementSettings, "wrapperPos">;

type T_TooltipOptionsWithHeightAndWrapper = 
    & T_TooltipOptionsWithWrapper
    & { 
        heightInPx : number,
    };

function getPositioningSettings({pointTo, modeSettings, heightInPx, wrapperPos} 
    : T_TooltipOptionsWithHeightAndWrapper) 
    : T_Positioning {

    let posSettings : T_Positioning = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto",
    }

    const strX : string = getCssForXAxis({pointTo, modeSettings, wrapperPos});
    if(modeSettings.fromLeft){
        posSettings.left = strX;
    }
    else{
        posSettings.right = strX;
    }

    const strY : string = getCssForYAxis({pointTo, modeSettings, heightInPx, wrapperPos});
    if(modeSettings.fromTop){
        posSettings.top = strY;
    }
    else{
        posSettings.bottom = strY;
    }

    return posSettings;
}


function getCssForXAxis({pointTo, modeSettings, wrapperPos} 
    : T_TooltipOptionsWithWrapper) 
    : string {

    if(atSideOfTarget(modeSettings)){
        return getCssNextToTarget();
    }

    const offset : number = getXOffsetPx({pointTo, modeSettings, wrapperPos});
    const offsetCloseSide : string = `-${offset}px`;
    const offsetFarSide : string = `calc(100% - ${offset}px)`;

    switch(pointTo){
        case POINTS_TO.start:
            return modeSettings.fromLeft ? offsetCloseSide : offsetFarSide;

        case POINTS_TO.end:
            return modeSettings.fromLeft ? offsetFarSide : offsetCloseSide;

        case POINTS_TO.center:
            return `calc(50% - ${offset}px)`;

        default:
            return "0";
    } 
}


function getCssForYAxis({pointTo, modeSettings, heightInPx, wrapperPos} 
    : T_TooltipOptionsWithHeightAndWrapper) 
    : string {

    if(!atSideOfTarget(modeSettings)){
        return getCssNextToTarget();
    }

    const offset : number = getYOffsetPx({pointTo, modeSettings, heightInPx, wrapperPos});
    switch(pointTo){
        case POINTS_TO.start:
            return `${offset}px`;

        case POINTS_TO.end:
            return `calc(100% - ${offset}px)`;

        case POINTS_TO.center:
            return `calc(50% - ${offset}px)`;
            
        default:
            return "0";
    }
}

function getCssNextToTarget() : string {
    return `calc(100% + ${OFFSET_ARROW_OUTWARDS})`;
}


// Get offsets in pixels (converted from rem, so responsive)
export function getXOffsetPx({pointTo, modeSettings, wrapperPos} 
    : T_TooltipOptionsWithWrapper) 
    : number {

    if(atSideOfTarget(modeSettings)){
        return convertRemStrToPx(OFFSET_ARROW_OUTWARDS);
    }

    const OFFSET_ARROW_PERP_PX : number = convertRemStrToPx(OFFSET_ARROW_PERP);
    const farSideOffset : number = getEdgeOffsetOffsetPx({wrapperPos}) + OFFSET_ARROW_PERP_PX;
    switch(pointTo){
        case POINTS_TO.start:
            return modeSettings.fromLeft ? 0 : farSideOffset;

        case POINTS_TO.end:
            return modeSettings.fromLeft ? farSideOffset : 0;

        case POINTS_TO.center:
            return OFFSET_ARROW_PERP_PX;
        
        default:
            return 0;
    }
}


export function getYOffsetPx({pointTo, modeSettings, heightInPx, wrapperPos} 
    : T_TooltipOptionsWithHeightAndWrapper) 
    : number {

    if(!atSideOfTarget(modeSettings)){
        return convertRemStrToPx(OFFSET_ARROW_OUTWARDS);
    }

    const heightOffset : number = heightInPx / 2;
    const offset : number = getEdgeOffsetOffsetPx({wrapperPos});

    switch(pointTo){
        case POINTS_TO.start:
            return offset - heightOffset;

        case POINTS_TO.end:
            return offset + heightOffset;

        case POINTS_TO.center:
            return heightOffset;
            
        default:
            return 0;
    }
}


function getEdgeOffsetOffsetPx({wrapperPos} 
    : Pick<T_DOMElementSettings, "wrapperPos">) 
    : number {

    const wrapperHeight : number = wrapperPos.bottom - wrapperPos.top;
    const offsetMultiplier : number = wrapperHeight * OFFSET_EDGE_MULT;

    const offsetRemToPx : number = convertRemStrToPx(OFFSET_EDGE_REM);

    return offsetMultiplier < offsetRemToPx ? offsetMultiplier : offsetRemToPx;
}


// Responsive support: check if the tooltip fits on the screen
export function tooltipFitsX({modeSettings, pointTo, wrapperPos, preferredWidth} 
    : T_TooltipOptions & Pick<T_DOMElementSettings, "wrapperPos" | "preferredWidth">)
    : boolean {

    let predictedXPosition = getPredictedXPosition({modeSettings, pointTo, wrapperPos, preferredWidth});
    return  predictedXPosition.left >= 0 
            && predictedXPosition.right <= window.innerWidth;
}


export function tooltipFitsY({modeSettings, pointTo, wrapperPos, preferredHeight} 
    : T_TooltipOptions & Pick<T_DOMElementSettings, "wrapperPos" | "preferredHeight">) 
    : boolean {

    let predictedYPosition = getPredictedYPosition({modeSettings, pointTo, wrapperPos, preferredHeight});
    return  predictedYPosition.top >= 0
            && predictedYPosition.bottom <= window.innerHeight;
}


// Work out where the tooltip /would/ appear if we applied the given tooltip options
function getPredictedXPosition({modeSettings, pointTo, wrapperPos, preferredWidth} 
    : T_TooltipOptions & Pick<T_DOMElementSettings, "wrapperPos" | "preferredWidth">)
    : { left: number, right: number } {

    let offset : number = getXOffsetPx({modeSettings, pointTo, wrapperPos});
    let aboveBelowPos : number = atSideOfTarget(modeSettings) ? 
                                    0 
                                    : getPredictedPosStaticSide({pointTo, modeSettings, offset, wrapperPos});
    
    let left : number = 0;
    let right : number = 0;

    if(modeSettings.fromLeft){
        left = atSideOfTarget(modeSettings) ? wrapperPos.right + offset : aboveBelowPos;
        right = left + preferredWidth;
    }
    else{
        right = atSideOfTarget(modeSettings) ? wrapperPos.left - offset : aboveBelowPos;
        left = right - preferredWidth;
    }

    return {
        left,
        right,
    }
}


type T_PropsGetPreferredPosStaticSide = 
    T_TooltipOptionsWithWrapper
    & {
        offset: number,
    };
function getPredictedPosStaticSide({modeSettings, pointTo, wrapperPos, offset} 
    : T_PropsGetPreferredPosStaticSide) 
    : number {

    let wrapperWidth : number = wrapperPos.right - wrapperPos.left;
    let wrapperMid : number = wrapperPos.left + wrapperWidth / 2;

    let directionalOffset : number = modeSettings.fromLeft ? offset : -offset;

    switch(pointTo){
        case POINTS_TO.start:
            return wrapperPos.left - directionalOffset;

        case POINTS_TO.end:
            return wrapperPos.right - directionalOffset;

        case POINTS_TO.center:
            return wrapperMid - offset;
            
        // No default because all enum options should be covered   
    }
    return 0;
}


function getPredictedYPosition({modeSettings, pointTo, wrapperPos, preferredHeight} 
    : T_TooltipOptions & Pick<T_DOMElementSettings, "wrapperPos" | "preferredHeight">) 
    : { top : number, bottom : number } {   
        
    let top : number = 0;
    let offset : number = getYOffsetPx({modeSettings, pointTo, wrapperPos, heightInPx: preferredHeight});
    if(!atSideOfTarget(modeSettings)){
        if(modeSettings.mode === TOOLTIP_MODE.belowWithArrowLeft || modeSettings.mode === TOOLTIP_MODE.belowWithArrowRight){
            top = wrapperPos.bottom + offset;
        }
        else{
            top = wrapperPos.top - offset - preferredHeight;
        }
    }
    else{
        let midPoint : number;
        switch(pointTo){
            case POINTS_TO.start:
                top = wrapperPos.top + offset;
                break;
            
            case POINTS_TO.end:
                top = wrapperPos.bottom - offset;
                break;
            
            case POINTS_TO.center:
                midPoint = (wrapperPos.bottom - wrapperPos.top) / 2;
                top = midPoint - offset;
                break;
    
            // No default because all enum options should be covered
        }
    }

    return {
        top,
        bottom: top + preferredHeight
    };
}


// Hooks
function useFullscreenMode({wrapperPos, preferredWidth, preferredHeight} 
    : T_DOMElementSettings) 
    : boolean {

    const [fullscreenMode, setFullscreenMode] = React.useState<boolean>(false);

    React.useEffect(() => {
        window.addEventListener("resize", updateFullscreenMode);
        return () => window.removeEventListener("resize", updateFullscreenMode);
    }, []);

    function updateFullscreenMode(){
        const needFullscreen = fullscreenModeIsRequired();

        if(fullscreenMode && !needFullscreen){
            setFullscreenMode(false);
        }
        else if(!fullscreenMode && needFullscreen){
            setFullscreenMode(true);
        }
    }

    function fullscreenModeIsRequired() 
        : boolean {

        const modeArr = Object.values(TOOLTIP_MODE);
        const pointPosArr = Object.values(POINTS_TO);
    
        for(let idxMode : number = 0; idxMode < modeArr.length; idxMode++){
            let loopSettings = getSettingsForMode(modeArr[idxMode]);
    
            for(let idxPoint : number = 0; idxPoint < pointPosArr.length; idxPoint++){
                let sharedProps = { modeSettings: loopSettings, pointTo: pointPosArr[idxPoint], wrapperPos };
    
                if(tooltipFitsX({...sharedProps, preferredWidth }) && tooltipFitsY({...sharedProps, preferredHeight})){
                    return false;
                }
            }
        }
    
        return true;
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
function useOriginalDimensions({ref, text} 
    : T_UseDimensionsProps) 
    : T_Dimensions {

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


export type T_TooltipPositionedProps = 
    Pick<I_TooltipProps, "id" | "text"> 
    & Pick<T_DOMElementSettings, "wrapperPos"> 
    & {
        mode? : TOOLTIP_MODE,
        pointTo? : POINTS_TO,
    };
export default function TooltipPositioned({mode, pointTo : argPointTo, text, id, wrapperPos} 
    : T_TooltipPositionedProps)
    {

    const ref = React.useRef<HTMLDivElement | null>(null);
    const {height: preferredHeight, width: preferredWidth} = useOriginalDimensions({ref, text});

    let prioritiseMode : boolean = mode !== undefined && argPointTo === undefined;
    let modeSettings : T_ModeWithSettings = getSettingsForMode(mode);
    let pointTo : POINTS_TO = argPointTo ?? modeSettings.defaultPointTo;

    const fullscreenMode : boolean = useFullscreenMode({wrapperPos, preferredWidth, preferredHeight});
    if(!fullscreenMode){
        let responsive : T_TooltipOptions = getTooltipOptionsThatFit({modeSettings, pointTo, wrapperPos, preferredWidth, preferredHeight, prioritiseMode});
        modeSettings = responsive.modeSettings;
        pointTo = responsive.pointTo;
    }

    return  <StyledTooltipContainer ref={ref} 
                                    pos={getPositioningSettings({pointTo, modeSettings, wrapperPos, heightInPx: preferredHeight})}
                                    >
                <Tooltip    arrowPos={modeSettings.arrow}
                            fullscreenMode={fullscreenMode}
                            id={id} 
                            text={text}
                            wrapperPos={wrapperPos}
                />
            </StyledTooltipContainer>
}



