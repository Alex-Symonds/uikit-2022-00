/*
    Helper function for Tooltip auto-positioning.

    To handle width-responsiveness, Tooltips do this:
        1) Tooltip is displayed with the settings the user specified.
        2) Doesn't fit width-wise? Tooltip is displayed, but the settings are 
           altered to make better use of screen space.
        3) Still doesn't fit? Fullscreen mode.

    This file contains a function to cover #2.
    
    It takes in the current settings and some information about screen space and 
    positioning, then works out if that will fit. If not, it returns settings
    altered so that it /will/ fit.

    If it has a choice, it will also pick the fitting settings that come closer
    to the user's original sections.

    Note: doesn't currently worry about fitting ot the height, since the user can 
    just scroll.
*/

import { TOOLTIP_ARROW_POSITION as ARROW_POS } from '../components/Tooltip';
import {    addSettingsToArrowPos, 
            getXOffsetPx, 
            TOOLTIP_POS, 
            T_DOMElementSettings,
            T_MaxSpaceToEachSide, 
            T_TooltipOptions,
                } from '../components/TooltipPositioned';


function tooltipFits({settings, perpPos, wrapperPos, preferredWidth} : TooltipOptionsAndDOMElementSettings) : boolean{
    let predictedPosition = getPreferredXPosition({settings, perpPos, wrapperPos, preferredWidth});
    return predictedPosition.left >= 0 && predictedPosition.right <= window.innerWidth;
}

// Work out where the tooltip /would/ appear along the X-axis if we applied the given tooltip options
type TooltipOptionsAndDOMElementSettings = T_TooltipOptions & T_DOMElementSettings;
function getPreferredXPosition({settings, perpPos, wrapperPos, preferredWidth} : TooltipOptionsAndDOMElementSettings){
    let offset = getXOffsetPx({settings, perpPos});
    let prefPos = settings.atSideOfTarget ? 
                    0 
                    : getPreferredPosStaticSide({perpPos, settings, offset, wrapperPos});
    
    let left = 0;
    let right = 0;

    if(settings.fromLeft){
        left = settings.atSideOfTarget ? wrapperPos.right + offset : prefPos;
        right = left + preferredWidth;
    }
    else{
        right = settings.atSideOfTarget ? wrapperPos.left - offset : prefPos;
        left = right - preferredWidth;
    }

    return {
        left,
        right,
    }
}


type T_PropsGetPreferredPosStaticSide = T_TooltipOptions & Pick<T_DOMElementSettings, "wrapperPos"> & {
    offset: number,
}
function getPreferredPosStaticSide({settings, wrapperPos, offset, perpPos} : T_PropsGetPreferredPosStaticSide) : number{
    let wrapperWidth = wrapperPos.right - wrapperPos.left;
    let wrapperMid = wrapperPos.left + wrapperWidth / 2;

    let directionalOffset = settings.fromLeft ? offset : -offset;

    switch(perpPos){
        case TOOLTIP_POS.start:
            return wrapperPos.left - directionalOffset;

        case TOOLTIP_POS.end:
            return wrapperPos.right - directionalOffset;

        case TOOLTIP_POS.center:
            return wrapperMid - offset;
            
        default:
            return 0;
    }
}


// Alter the tooltip options so the tooltip will fit on the screen
type PropsGetResponsiveOptions = TooltipOptionsAndDOMElementSettings & T_MaxSpaceToEachSide;
function getResponsiveOptions({settings, perpPos, maxSpaceGoingLeft, maxSpaceGoingRight, preferredWidth, wrapperPos} : PropsGetResponsiveOptions) : T_TooltipOptions{
    const useBottomX =  settings.fallbackTop === false 
                        || ( settings.fallbackTop === undefined 
                             && perpPos !== TOOLTIP_POS.end
                            );
    

    // When swapping from a side-y tooltip, it would make sense to prefer for the arrow to be pointing to
    // the same side as before (albeit now from above or below, instead of the side).
    // If there is enough space, make that happen.
    if(settings.atSideOfTarget){
        let prefSide = updateOptionsTryPreferredSide({settings, useBottomX, wrapperPos, preferredWidth});
        if(prefSide !== null){
            return prefSide;
        }
    }

    let result = updateOptionsUseMaxSpace({maxSpaceGoingLeft, maxSpaceGoingRight, useBottomX});
    return result;
}

type T_VerticalFallbackFlag = {
    useBottomX : boolean,
}


type T_PropsUpdateOptionsTryPreferredSide = T_DOMElementSettings & T_VerticalFallbackFlag & Pick<T_TooltipOptions, "settings">;
function updateOptionsTryPreferredSide({settings, useBottomX, wrapperPos, preferredWidth} : T_PropsUpdateOptionsTryPreferredSide) : T_TooltipOptions | null{
    if(!settings.atSideOfTarget){
        return null;
    }

    let newArrowDir : ARROW_POS;
    let newPerpPos : TOOLTIP_POS;

    if(settings.fallbackLeft){
        newArrowDir = useBottomX ? ARROW_POS.topLeft : ARROW_POS.bottomLeft;
        newPerpPos = TOOLTIP_POS.start;
    }
    else{
        newArrowDir = useBottomX ? ARROW_POS.topRight : ARROW_POS.bottomRight;
        newPerpPos = TOOLTIP_POS.end;
    }

    let newSettings = addSettingsToArrowPos(newArrowDir);
    let willFit = tooltipFits({settings: newSettings, perpPos: newPerpPos, wrapperPos, preferredWidth});

    if(!willFit){
        return null;
    }
    return {
        perpPos: newPerpPos,
        settings: newSettings,
    }
    
}

type T_PropsUpdateOptionsUseMaxSpace = T_MaxSpaceToEachSide & T_VerticalFallbackFlag;
function updateOptionsUseMaxSpace({maxSpaceGoingLeft, maxSpaceGoingRight, useBottomX} : T_PropsUpdateOptionsUseMaxSpace) : T_TooltipOptions {
    let newArrowDir : ARROW_POS;
    let newPerpPos : TOOLTIP_POS;

    if(maxSpaceGoingLeft > maxSpaceGoingRight){
        newPerpPos = TOOLTIP_POS.end;
        newArrowDir = useBottomX ? ARROW_POS.bottomRight : ARROW_POS.topRight;
    }
    else{
        newPerpPos = TOOLTIP_POS.start;
        newArrowDir = useBottomX ? ARROW_POS.bottomLeft : ARROW_POS.topLeft;
    }

    let newSettings = addSettingsToArrowPos(newArrowDir);
    return {
        perpPos: newPerpPos,
        settings: newSettings,
    }
}


type T_PropsUpdateTooltipOptionsToFit = T_TooltipOptions & T_DOMElementSettings & T_MaxSpaceToEachSide & {
    fullscreenMode : boolean,
};
export default function updateTooltipOptionsToFit({settings, perpPos, fullscreenMode, wrapperPos, preferredWidth, maxSpaceGoingLeft, maxSpaceGoingRight} : T_PropsUpdateTooltipOptionsToFit) : T_TooltipOptions{
    
    // Fullscreen mode is handling the question of "what if it *CAN'T* fit?".
    // If fullscreen mode is inactive, we can assume the tooltip could fit (maybe with a little help).
    if(!fullscreenMode){
        let wrapperPosIsEmpty = wrapperPos.left === 0 && wrapperPos.right === 0;
        let willFit = tooltipFits({settings, perpPos, wrapperPos, preferredWidth});
        if(!wrapperPosIsEmpty && !willFit){
            let responsive = getResponsiveOptions({wrapperPos, settings, perpPos, preferredWidth, maxSpaceGoingLeft, maxSpaceGoingRight});
            settings = responsive.settings;
            perpPos = responsive.perpPos;
        }
    }
    
    return {
        settings,
        perpPos
    }
}



