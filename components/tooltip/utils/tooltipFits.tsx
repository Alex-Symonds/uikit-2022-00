/*
    Helper functions for tooltips.
    Work out if the given tooltip would fit on screen without causing any additional renders.
*/

import {
    TOOLTIP_MODE,
    POINTS_TO,
    T_TooltipOptions,
    T_DOMElementSettings,
    T_TooltipOptionsWithWrapper,
    getXOffsetPx,
    getYOffsetPx,
    isAtSideOfTarget,
        } from '../TooltipPositioned';


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
    let aboveBelowPos : number = isAtSideOfTarget(modeSettings) ? 
                                    0 
                                    : getPredictedPosStaticSide({pointTo, modeSettings, offset, wrapperPos});
    
    let left : number = 0;
    let right : number = 0;

    if(modeSettings.fromLeft){
        left = isAtSideOfTarget(modeSettings) ? wrapperPos.right + offset : aboveBelowPos;
        right = left + preferredWidth;
    }
    else{
        right = isAtSideOfTarget(modeSettings) ? wrapperPos.left - offset : aboveBelowPos;
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
    if(!isAtSideOfTarget(modeSettings)){
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
