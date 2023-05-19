import React from 'react';
import styled, {ThemeProps, ThemeProvider} from 'styled-components';

import { theme as themeObj } from '../../styles/theme';

import Paragraph from '../Paragraph';

import { T_PositionObj } from './utils/usePosition';

export enum TOOLTIP_ARROW_POSITION{
    topLeft = "topLeft",
    topRight = "topRight",
    bottomLeft = "bottomLeft",
    bottomRight = "bottomRight",
    left = "left",
    right = "right",
}

/*
    Notes:
    The arrow poking out of the tooltip involves three elements, two pseudo and one actual.
        > :before handles the border (background = border colour, then an SVG mask of the slightly-obtuse triangle)
        > :after handles the fill (background = background colour, then an SVG mask of the slightly-obtuse triangle)
        > The extra DOM element handles the shadow (transparent square div rotated 45 deg; not obtuse, but close 
          enough for the shadow)

    The naive CSS for this was very repetitive.
    
    There's only two sets of X/Y coordinate values -- one for when the arrow points along the X-axis and one when it points 
    along the Y-axis -- but you can get the 6 different visual effects from those by altering whether the values are used 
    with top||bottom and left||right.

    Those things (along with the rotation for the arrow and the type of shadow needed) will be handled via Themes.
*/

interface I_ArrowPositionsByDirection{
    [key : string] : ArrowPositionProps;
}

type ArrowPositionProps = {
    x: ArrowElementsProps,
    y: ArrowElementsProps
}

type ArrowElementsProps = {
    fill: string,
    border: string,
    shadow: string,
}

const ARROW_POSITIONS_BY_DIRECTION : I_ArrowPositionsByDirection = {
    upOrDown:{
        x: {
            fill: "0.9375rem",
            border: "0.875rem",
            shadow: "1.1rem"
        },
        y: {
            fill: "-0.3125rem",
            border: "-0.375rem",
            shadow: "-0.23rem",
        },
    },
    leftOrRight:{
        x: {
            fill: "-0.5rem",
            border: "-0.625rem", 
            shadow: "-0.2rem",
        },
        y: {
            fill: "calc(50% - 0.125rem)",
            border: "calc(50% - 0.1875rem)",
            shadow: "calc(50% - 0.1875rem)"
        },
    }
}

/* 
    Arrows on the bottom edge (i.e. ones pointing downwards) need a slightly different shadow
    to look right.
*/
const ARROW_DOWN_SHADOW = "4px 4px 4px 0 rgb(51 51 51 / 4%), 0 4px 16px 0 rgb(51 51 51 / 8%)";

type TooltipArrowThemeProps = {
    pos : ArrowPositionProps,   /* Set of x,y positioning values for the elements needed to make the arrow effect */
    rotation : string,          /* rotation for the direction of the arrow. 0 = up */
    mainShadow : string,            /* Shadow for the arrow shadow element */
    xKey : string,              /* left||right key for X coords */
    yKey : string,              /* top||bottom key for Y coords */
}

const bottomLeftTheme : TooltipArrowThemeProps = {
    pos : ARROW_POSITIONS_BY_DIRECTION.upOrDown,
    rotation: "180",
    mainShadow : ARROW_DOWN_SHADOW,
    xKey: "left",
    yKey: "bottom",
}

const bottomRightTheme : TooltipArrowThemeProps = {
    pos : ARROW_POSITIONS_BY_DIRECTION.upOrDown,
    rotation: "180",
    mainShadow: ARROW_DOWN_SHADOW,
    xKey: "right",
    yKey: "bottom",
}

const leftTheme : TooltipArrowThemeProps = {
    pos : ARROW_POSITIONS_BY_DIRECTION.leftOrRight,
    rotation: "-90",
    mainShadow : themeObj.shadow.default,
    xKey: "left",
    yKey: "top",
}

const topLeftTheme : TooltipArrowThemeProps = {
    pos : ARROW_POSITIONS_BY_DIRECTION.upOrDown,
    rotation: "0",
    mainShadow : themeObj.shadow.default,
    xKey: "left",
    yKey: "top",
}

const topRightTheme : TooltipArrowThemeProps = {
    pos : ARROW_POSITIONS_BY_DIRECTION.upOrDown,
    rotation: "0",
    mainShadow : themeObj.shadow.default,
    xKey: "right",
    yKey: "top",
}

const rightTheme : TooltipArrowThemeProps = {
    pos : ARROW_POSITIONS_BY_DIRECTION.leftOrRight,
    rotation: "90",
    mainShadow : themeObj.shadow.default,
    xKey: "right",
    yKey: "top",
}

function getTooltipTheme(arrowPos? : TOOLTIP_ARROW_POSITION) : TooltipArrowThemeProps{
    switch(arrowPos){
        case TOOLTIP_ARROW_POSITION.bottomLeft:
            return bottomLeftTheme;

        case TOOLTIP_ARROW_POSITION.bottomRight:
            return bottomRightTheme;

        case TOOLTIP_ARROW_POSITION.left:
            return leftTheme;

        case TOOLTIP_ARROW_POSITION.topLeft:
            return topLeftTheme;

        case TOOLTIP_ARROW_POSITION.topRight:
            return topRightTheme;

        case TOOLTIP_ARROW_POSITION.right:
            return rightTheme;

        default:
            return bottomLeftTheme;
    }
}

// Used to ensure the background and border colours on the arrow match those on the rectangle
type TooltipAttrsProps = {
    backgroundColor : keyof typeof themeObj,
    borderColor : keyof typeof themeObj,
}

const StyledTooltipBase = styled.div.attrs<
    ThemeProps<TooltipArrowThemeProps>, 
    TooltipAttrsProps
    >(props => {
        return {
            backgroundColor: props.theme.color.mainBackground,
            borderColor: props.theme.color.mainBackgroundBorder,
        }
})`
    background: ${props => props.backgroundColor};
    border: 0.0625rem solid ${props => props.borderColor};
    border-radius: ${ ({theme}) => theme.borderRadius };
    box-shadow: ${ ({theme}) => theme.shadow.default };
    max-width: min(calc(100vw - 1rem), 100%);
    padding: 0.6875rem 1rem 0.6875rem 0.9375rem;
    width: fit-content;
`;

const StyledTooltipFullscreen = styled(StyledTooltipBase)<{topStr : string | undefined}>`
    left: 0.5rem;
    max-height: calc(100vh - 1rem);
    overflow-y: auto;
    position: fixed;
    top: ${props => props.topStr ? props.topStr : "0.5rem"};
    width: calc(100vw - 1.25rem);  
`;

const StyledTooltip = styled(StyledTooltipBase)`
    position: relative;

    &:before,
    &:after{
        aspect-ratio: 12/5;
        content: "";
        display: block;
        
        mask-image: url(    'data:image/svg+xml;utf8,
                            <svg width="12" height="5" viewBox="0 0 12 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0L12 5H0L6 0Z" fill="white"/>
                            </svg>'
                        );
        mask-repeat: no-repeat;
        mask-size: 100% 100%;

        position: absolute;
        transform: rotate(${props => props.theme.rotation}deg);
    }

    &:before{
        background: ${props => props.borderColor};
        width: 0.875rem;

        ${props => props.theme.xKey}: ${props => props.theme.pos.x.border};
        ${props => props.theme.yKey}: ${props => props.theme.pos.y.border};
    }

    &:after{
        background: ${props => props.backgroundColor};
        width: 0.75rem;
        
        ${props => props.theme.xKey}: ${ props => props.theme.pos.x.fill};
        ${props => props.theme.yKey}: ${ props => props.theme.pos.y.fill};
    }
`;

const StyledArrowShadow = styled.div`
    aspect-ratio: 1/1;
    background: transparent;
    box-shadow: ${props => props.theme.shadow};
    display: block;
    position: absolute;
    transform: rotate(45deg);
    width: 0.5rem;
    z-index: -1;

    ${props => props.theme.xKey}: ${props => props.theme.pos.x.shadow};
    ${props => props.theme.yKey}: ${props => props.theme.pos.y.shadow};
`;

const StyledTooltipParagraph = styled(Paragraph)`
    color: ${ ({theme}) => theme.color.mainText };
`;

function getCssForFullscreenTop({wrapperPos, height} : {wrapperPos : T_PositionObj | undefined, height : number | undefined}){
    if(wrapperPos && height){
        const padding = 8;
        let topNum : number;

        if(wrapperPos.top - height - padding > 0){
            topNum = wrapperPos.top - height - padding;
            return `${topNum}px`;
        }

        if(wrapperPos.bottom + height + padding < window.innerHeight){
            topNum = wrapperPos.bottom + padding;
            return `${topNum}px`;
        }
    }
    return undefined;
}

export interface I_TooltipBubbleProps{
    arrowPos? : TOOLTIP_ARROW_POSITION
    id : string,
    fullscreenMode? : boolean,
    text : string, 
    wrapperPos? : T_PositionObj,
}

export default function TooltipBubble({arrowPos, fullscreenMode, id, text, wrapperPos } : I_TooltipBubbleProps){
    const ref = React.useRef<HTMLDivElement>(null);
    
    if(fullscreenMode){
        let {height} = ref.current ? ref.current.getBoundingClientRect() : {height: undefined};
        let topStr : string | undefined = fullscreenMode ? getCssForFullscreenTop({wrapperPos, height}) : undefined;
        
        return  <StyledTooltipFullscreen role="tooltip" id={id} ref={ref} topStr={topStr}>
                    <TooltipContents text={text} />
                </StyledTooltipFullscreen>
    }

    const theme = getTooltipTheme(arrowPos);
    return  <ThemeProvider theme = {theme}>
                <StyledTooltip role="tooltip" id={id} ref={ref}>
                    <TooltipContents text={text} />
                    <StyledArrowShadow />
                </StyledTooltip>
            </ThemeProvider>      
}

function TooltipContents({text} : Pick<I_TooltipBubbleProps, "text">){
    return  <StyledTooltipParagraph size={3}>
                {text}
            </StyledTooltipParagraph>
}