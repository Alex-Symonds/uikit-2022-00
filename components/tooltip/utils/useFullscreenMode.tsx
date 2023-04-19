import React from 'react';

import {
    TOOLTIP_MODE,
    POINTS_TO,
    T_DOMElementSettings,
    getSettingsForMode
        } from '../TooltipPositioned';

import {
    tooltipFitsX,
    tooltipFitsY
        } from './tooltipFits';

export default function useFullscreenMode({wrapperPos, preferredWidth, preferredHeight} 
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