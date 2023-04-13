/*
    Helper function for Tooltip auto-positioning.
    
    Checks if the user's selection of mode and pointTo will fit on screen.
    If not, it works out which alternative would fit and returns that.
    If it has a choice, it will pick the alternative that comes closest to the 
    user's original selection.
*/

import {    getSettingsForMode, 
            tooltipFitsX, 
            tooltipFitsY,
            atSideOfTarget,
            TOOLTIP_MODE as MODE,
            POINTS_TO,
            SIDE,
            ARROW_FROM,
            T_DOMElementSettings,
            T_TooltipOptions,
            T_ModeWithSettings,
                } from '../components/';


type T_PriorityFlag = {
    prioritiseMode : boolean
};

type T_PropsUpdateTooltipOptionsToFit = 
    T_TooltipOptions 
    & T_DOMElementSettings
    & T_PriorityFlag;

type T_FittingOptionsOrNull = T_TooltipOptions | null;

export default function getTooltipOptionsThatFit({modeSettings, pointTo, wrapperPos, preferredWidth, preferredHeight, prioritiseMode} 
    : T_PropsUpdateTooltipOptionsToFit) 
    : T_TooltipOptions {
    
    let wrapperPosIsEmpty : boolean = wrapperPos.left === 0 && wrapperPos.right === 0;
    let willFitX : boolean = tooltipFitsX({modeSettings, pointTo, wrapperPos, preferredWidth});
    let willFitY : boolean = tooltipFitsY({modeSettings, pointTo, wrapperPos, preferredHeight});

    if(!wrapperPosIsEmpty && (!willFitX || !willFitY)){
        let optionsThatFit : T_FittingOptionsOrNull = getClosestOptionsThatFit({ modeSettings, pointTo, wrapperPos, preferredWidth, preferredHeight, prioritiseMode });
        if(optionsThatFit !== null){
            return optionsThatFit;
        }
    }

    return {
        modeSettings,
        pointTo
    }
}


type T_SidesFit = {
    [SIDE.above] : boolean | undefined,
    [SIDE.below]: boolean | undefined,
    [SIDE.left]: boolean | undefined,
    [SIDE.right]: boolean | undefined,
}

function getClosestOptionsThatFit({modeSettings, pointTo, wrapperPos, preferredWidth, preferredHeight, prioritiseMode} 
    : T_TooltipOptions & T_DOMElementSettings & T_PriorityFlag) 
    : T_FittingOptionsOrNull {

    let optionsOrderedByCloseness : T_TooltipOptions[] = getOptionsInOrder({modeSettings, pointTo, prioritiseMode});
    let sharedProps : T_DOMElementSettings = { wrapperPos, preferredWidth, preferredHeight};

    // Map to avoid repeating checks. We've already checked the user's selection, so add that to the map.
    let optionsMemo : Map<string, boolean> = new Map<string, boolean>();
    let key : string = getKeyStr({modeSettings, pointTo});
    optionsMemo.set(key, true);

    let sideFits : T_SidesFit = {
        [SIDE.above]: undefined,
        [SIDE.below]: undefined,
        [SIDE.left]: undefined,
        [SIDE.right]: undefined,
    };

    for(let idx = 0; idx < optionsOrderedByCloseness.length; idx++){
        let loopSettings : T_ModeWithSettings = optionsOrderedByCloseness[idx].modeSettings;
        let loopOptions : T_TooltipOptions = {  modeSettings: loopSettings, 
                                                pointTo: optionsOrderedByCloseness[idx].pointTo};

        let memoStr : string = getKeyStr({...loopOptions});
        if(!optionsMemo.has(memoStr)){
            optionsMemo.set(memoStr, true);

            let sideFitsOutwards : boolean | undefined = sideFits[loopSettings.side];
            if(sideFitsOutwards === undefined){
                sideFitsOutwards = tooltipFitsOutwards({...sharedProps, ...loopOptions});
                sideFits[loopSettings.side] = sideFitsOutwards;
            }
            if(sideFitsOutwards){
                let loopOptionsFit = tooltipFitsPerpendicularly({...sharedProps, ...loopOptions});
                if(loopOptionsFit){
                    return {...loopOptions};
                }
            }
        }
    }
    return null;
}


function getKeyStr({modeSettings, pointTo} 
    : T_TooltipOptions)
    : string {
    
    return `${modeSettings.mode}@${pointTo}`;
}


function tooltipFitsOutwards({modeSettings, pointTo, wrapperPos, preferredWidth, preferredHeight} 
    : T_TooltipOptions & T_DOMElementSettings)
    : boolean {

    return atSideOfTarget(modeSettings) ?
                tooltipFitsX({modeSettings, pointTo, wrapperPos, preferredWidth})
                : tooltipFitsY({modeSettings, pointTo, wrapperPos, preferredHeight});
}


function tooltipFitsPerpendicularly({modeSettings, pointTo, wrapperPos, preferredWidth, preferredHeight}
    : T_TooltipOptions & T_DOMElementSettings)
    : boolean {
    
    return atSideOfTarget(modeSettings) ?
                tooltipFitsY({modeSettings, pointTo, wrapperPos, preferredHeight})
                : tooltipFitsX({modeSettings, pointTo, wrapperPos, preferredWidth});
}


// || Everything below here is connected to putting the options in order
function getOptionsInOrder({modeSettings, pointTo, prioritiseMode} 
    : T_TooltipOptions & T_PriorityFlag)
    : T_TooltipOptions[] {
    
    // Get relative definitions
    let relDef : T_RelativeModeSettings = getRelativeSettings({modeSettings, pointTo});
    let {opposite, nearPerp, farPerp, perpPointTo} : T_RelativeModeSettings = relDef;

    if(atSideOfTarget(modeSettings)){
        return getOptionsInOrderLeftRight({modeSettings, pointTo, opposite, nearPerp, farPerp, perpPointTo});
    }
    else{
        return getOptionsInOrderAboveBelow({modeSettings, pointTo, opposite, nearPerp, farPerp, perpPointTo, prioritiseMode});
    }
}


function getOptionsInOrderLeftRight({modeSettings, pointTo, opposite, nearPerp, farPerp, perpPointTo}
    : T_TooltipOptions & T_RelativeModeSettings)
    : T_TooltipOptions[] {

    // 1) Get other pointTo options on the same side. left|right don't have any settingsToWeave, so ignore that.
    let orderedArr : T_TooltipOptions[] = getOptionCombos({modeSettings, pointTo, settingsToWeave: null, excludeFirst: true});

    // 2) The two "xPerp @ perpPointTo" combos have so much in common with a side-y tooltip -- they're almost "pre-start"
    // and "post-end" -- that we're going to pretend they're on the same side as the user's selection and prioritise 
    // them accordingly. We will use excludeFirst later to avoid duplication.
    orderedArr.push({modeSettings: nearPerp, pointTo: perpPointTo});
    orderedArr.push({modeSettings: farPerp, pointTo: perpPointTo});

    // 3) and 4) varies depending on pointTo. Prepare some props objects to keep things DRY when setting up different orders
    let propsOpp =  {modeSettings: opposite,    pointTo,                settingsToWeave: null };
    let propsNear = {modeSettings: nearPerp,    pointTo: perpPointTo,   settingsToWeave: getSettingsSameSide(nearPerp),  excludeFirst: true};

    if(pointTo === POINTS_TO.center){
        /*  o  The tooltip content is also centered around the arrow, so both perp sides are equally "near" and "far"
               and it makes no sense to prioritise one over the other. They should be grouped together, similar prio.
            o  The opposite side preserves the distinctive "poking out the side" look, so let's prioritise that over
               shuffling the tooltip across above|below.
        */
        orderedArr = orderedArr.concat(getOptionCombos(propsOpp));
        orderedArr = orderedArr.concat(getOptionCombos(propsNear));
    }
    else{
        // It's pointing near a corner, so it makes sense to "pop around the corner" before jumping to the opposite side
        orderedArr = orderedArr.concat(getOptionCombos(propsNear));
        orderedArr = orderedArr.concat(getOptionCombos(propsOpp)); 
    }

    // 5) All that remains is the remainder of "far"
    orderedArr = orderedArr.concat( getOptionCombos({   modeSettings: farPerp, 
                                                        pointTo: perpPointTo, 
                                                        settingsToWeave: getSettingsSameSide(farPerp), 
                                                        excludeFirst: true 
                                                }));
    return orderedArr;
}


function getOptionsInOrderAboveBelow({modeSettings, pointTo, prioritiseMode, opposite, nearPerp, farPerp, perpPointTo} 
    : T_TooltipOptions & T_PriorityFlag & T_RelativeModeSettings)
    : T_TooltipOptions[] {

    let orderedArr : T_TooltipOptions[] = [];

    // Begin with options on the same side as the user's selection. Use excludeFirst to avoid duplicating the 
    // user's exact selection (if that would fit on the screen, we wouldn't be here).

    // All above|below modes have a "sideSharer" mode (i.e. same side, opposite arrowFrom), so there's a question
    // of prioritisation: do we try both modes before changing the pointTo or do we try all pointTos before changing
    // the mode?

    // To prioritise preservation of the mode, run the function twice: no weaving
    let sideSharer : T_ModeWithSettings | null = getSettingsSameSide(modeSettings);
    if(prioritiseMode){
        orderedArr = orderedArr.concat(getOptionCombos({modeSettings, pointTo, settingsToWeave: null, excludeFirst: true}));
        if(sideSharer){
            orderedArr = orderedArr.concat(getOptionCombos({modeSettings: sideSharer, pointTo, settingsToWeave: null}));
        }
    }
    // To prioritise preservation of the pointTo, weave away.
    else{
        orderedArr = orderedArr.concat(getOptionCombos({modeSettings, pointTo, settingsToWeave: sideSharer, excludeFirst: true}));
    }

    // above|below are always closer to one corner or the other -- either they're pointing to it with the arrow
    // or the content is looming over it (or, at least, sticking out towards it) -- so pop around the nearest corner.
    orderedArr = orderedArr.concat(getOptionCombos({ modeSettings: nearPerp, pointTo: perpPointTo, settingsToWeave: null }));

    // The opposite side comes closer to the look of the user's selected options.
    orderedArr = orderedArr.concat(getOptionCombos({modeSettings: opposite, pointTo, settingsToWeave: getSettingsSameSide(opposite) }));

    // Far perpendicular side is all that's left.
    orderedArr = orderedArr.concat(getOptionCombos({ modeSettings: farPerp, pointTo: perpPointTo, settingsToWeave: null }));

    return orderedArr;
}


type T_GetAllPointToProps = {
    settingsToWeave : T_ModeWithSettings | null,
    excludeFirst? : boolean,
};
function getOptionCombos({modeSettings, pointTo, settingsToWeave, excludeFirst = false}
    : T_TooltipOptions & T_GetAllPointToProps)
    : T_TooltipOptions[] {

    let optionsArr : T_TooltipOptions[] = [];

    const pointToArr : POINTS_TO[] = Object.values(POINTS_TO);
    let idxOfSelected : number = pointToArr.findIndex((ele) => ele === pointTo);
    let direction : number = pointTo === POINTS_TO.end ? -1 : 1;

    for(let counter : number = 0; counter < pointToArr.length; counter++){
        let loopIdx : number = idxOfSelected + counter * direction % pointToArr.length;
        let loopPointTo : POINTS_TO = pointToArr[loopIdx];
        
        if(!excludeFirst || counter > 0){
            optionsArr.push({modeSettings, pointTo: loopPointTo});
        }
        
        if(settingsToWeave){
            optionsArr.push({modeSettings: settingsToWeave, pointTo: loopPointTo});
        }
    }
    return optionsArr;
}


// || Relative modeSettings
type T_RelativeModeSettings = {
    opposite: T_ModeWithSettings,
    nearPerp: T_ModeWithSettings,
    farPerp: T_ModeWithSettings,
    perpPointTo: POINTS_TO,
};
function getRelativeSettings({modeSettings, pointTo} 
    : T_TooltipOptions)
    : T_RelativeModeSettings{

    let { near, far } : T_PerpendicularSideModes = getModesPerpendicularSides({modeSettings, pointTo});

    return {
        opposite: getSettingsOpposite(modeSettings),
        nearPerp: getSettingsForMode(near),
        farPerp: getSettingsForMode(far),
        perpPointTo: getClosestPerpPointTo(modeSettings),
    }
}


function getClosestPerpPointTo(modeSettings 
    : T_ModeWithSettings)
    : POINTS_TO {

    return modeSettings.side === SIDE.above || modeSettings.side === SIDE.left ?
                POINTS_TO.start
                : POINTS_TO.end;
}


type T_PerpendicularSideModes = {
    near : MODE,
    far : MODE,
};
function getModesPerpendicularSides({modeSettings, pointTo} 
    : T_TooltipOptions)
    : T_PerpendicularSideModes{

    let near : MODE;
    let {startMode, endMode} : T_StartEndModes = getModesPerpStartEnd(modeSettings);

    // Center and not-side-y means the arrow is centered but the content is skewed to one side. 
    // Return the perp side closest to the content.
    if(pointTo === POINTS_TO.center && !atSideOfTarget(modeSettings)){
        let contentGrowsTowards : POINTS_TO | null = getContentGrowthDirection(modeSettings);
        near = contentGrowsTowards === POINTS_TO.start ?
            startMode
            : endMode;
    }
    // Not-center means we return the side closest to where the arrow is pointing to. 
    // Center & side-y means neither perp. side is closer to anything, but we need to pick ONE of 
    // them to try first, so let's arbitrarily pick the startMode.
    else{
        near = pointTo === POINTS_TO.end ? endMode : startMode;
    }

    return {
        near,
        far: near === startMode ? endMode : startMode,
    }
}


function getContentGrowthDirection(modeSettings 
    : T_ModeWithSettings)
    : POINTS_TO | null {  

    // Side-y tooltips grow evenly in both directions, so return null
    if(atSideOfTarget(modeSettings)){
        return null;
    }

    // Otherwise, the design is such that the content grows away from the arrow
    return modeSettings.arrowFrom === ARROW_FROM.left ?
                POINTS_TO.end
                : POINTS_TO.start;
}


type T_StartEndModes = {
    startMode : MODE,
    endMode : MODE,
};
function getModesPerpStartEnd(modeSettings 
    : T_ModeWithSettings)
    : T_StartEndModes {

    let startMode : MODE;
    let endMode : MODE;
    
    // Straightforward when selection was above|below, because left|right each only have one mode
    if(modeSettings.side === SIDE.above || modeSettings.side === SIDE.below){
        startMode = MODE.leftWithArrowMid;
        endMode = MODE.rightWithArrowMid;
    }
/* 
    In the case of a left|right selection, there's an extra decision to make. above|below each have 
    two modes, so we need to pick which arrowFrom position we want as well.

    The reasoning behind the choice is best illustrated with this stab at ASCII "art".
    
    rightWithArrowMid @ start:
                                                    
                                _______________________
            ------------------ <___tooltip blah blah___|
            | TARGET ELEMENT | 
            ------------------


    Looks a lot closer to aboveWithArrowLeft @ end:

                            _______________________
                           |_ _tooltip blah blah___|
                             V                      
            ------------------
            | TARGET ELEMENT |
            ------------------


    Than aboveWithArrowRight @ end:
        _______________________
       |___tooltip blah blah_ _|
                             V
            ------------------
            | TARGET ELEMENT |
            ------------------

    So we prioritise the opposite arrowFrom to the original side, so the tooltip "sticks out".

    Of course, aboveWithArrowLeft @ end is /so/ close to rightWithArrowMid @ start that if one
    doesn't fit then it's pretty likely the other won't either, but meh: that's another 
    function's problem.
*/
    else{
        startMode = modeSettings.side === SIDE.left ?
                        MODE.aboveWithArrowRight 
                        : MODE.aboveWithArrowLeft;
        endMode = modeSettings.side === SIDE.left ?
                        MODE.belowWithArrowRight
                        : MODE.belowWithArrowLeft;
    }

    return {
        startMode,
        endMode,
    }
}


function getSettingsSameSide(modeSettings 
    : T_ModeWithSettings) 
    : T_ModeWithSettings | null {

    let modeArr : MODE[] = Object.values(MODE);
    for(let modeIdx = 0; modeIdx < modeArr.length; modeIdx++){
        let loopSettings : T_ModeWithSettings = getSettingsForMode(modeArr[modeIdx]);
        if( loopSettings.side === modeSettings.side
            && loopSettings.arrowFrom !== modeSettings.arrowFrom)
        {
            return loopSettings;
        }
    }
    return null;
}


function getSettingsOpposite(modeSettings
    : T_ModeWithSettings)
    : T_ModeWithSettings {

    // getSideOpposite shouldn't return null, since ALL sides should be covered.
    // If it does then eh, return the original modeSettings. The memo will prevent
    // repeating the same tests twice, so it won't cause much harm.
    let oppSide = getSideOpposite(modeSettings.side);
    if(!oppSide){
        return modeSettings;
    }

    let modeArr = Object.values(MODE);
    for(let modeIdx = 0; modeIdx < modeArr.length; modeIdx++){
        let loopSettings = getSettingsForMode(modeArr[modeIdx]);
        if( loopSettings.side === oppSide
            && loopSettings.arrowFrom === modeSettings.arrowFrom)
        {
            return loopSettings;
        }
    }

    // The loop above should always return some loopSettings. If it doesn't,
    // something weird has happened so, again, let's fallback to returning 
    // the original modeSettings.
    return modeSettings;
}


function getSideOpposite(side 
    : SIDE )
    : SIDE | null {

    const opposites = [
        [SIDE.above, SIDE.below],
        [SIDE.left, SIDE.right],
    ];

    for(let idx = 0; idx < opposites.length; idx++){
        let side1 = opposites[idx][0];
        let side2 = opposites[idx][1];

        if(side === side1){
            return side2;
        }
        if(side === side2){
            return side1;
        }
    }
    return null;
}


