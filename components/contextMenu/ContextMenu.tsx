import React, {useState, useEffect, useLayoutEffect, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import useCloseOnOutsideClick from '../../utils/UseCloseOnOutsideClick';
import { convertRemToPixels, rgba } from '../../utils/utils';

import {Icon, ICON_ID, ICON_SIZES} from '../icons';
import { StyledScreenReaderOnly } from '../visuallyHidden';
import { moveWithinMenu } from '../form/utils/moveWithinMenu';

// Exported for use in ContextMenu-related Stories, so they can display the appearance
// of a context menu without the behaviour
export const StyledContextMenu = styled.div.attrs((props : {x : number, y: number}) => {
    // These positions update when the user resizes the screen. Styled-components would
    // respond by generating hundreds of CSS classes, so instead chuck this into the DOM
    // element's style parameter and let React handle it gracefully.
    return {
        style: {
            top: props.y + "px",
            left: props.x + "px",
        }
    }
})<{x : number, y: number}>`
    background: ${ ({theme}) => theme.color.mainBackground };
    border-radius: ${ ({theme}) => theme.borderRadius };
    box-shadow: ${ ({theme}) => theme.shadow.contextMenu };
    max-width: 100vw;
    overflow: hidden;
    padding: 0.25rem 0 0.35rem;
    position: fixed;
    width: 15.25rem;
`;


const StyledContextMenuButton = styled.button.attrs((props : { pos : null | {x: number, y: number} }) => {
    // These positions update when the user resizes the screen. Styled-components would
    // respond by generating hundreds of CSS classes, so instead chuck this into the DOM
    // element's style parameter and let React handle it gracefully.
    return {
        style: {
            top: props.pos ? props.pos.y + "px" : "0px",
            left: props.pos ? props.pos.x + "px" : "0px",
        }
    }
})<{ pos : null | {x: number, y: number} }>`
    background: ${ ({theme}) => theme.color.textOnPrimary };
    border-radius: 50%;
    min-width: ${ ICON_SIZES.small };
    padding: 0.0625rem 0.125rem 0.125rem 0.0625rem;
    position: fixed;

    svg path {
        fill: ${ ({theme}) => theme.color.primary };
    }

    &:focus {
        outline-color: ${ ({theme}) => rgba(theme.color.focusOutline, theme.opacity.focusOutline) };
    }

    &:hover{
        svg path {
            fill: ${ ({theme}) => rgba(theme.color.primary, theme.opacity.alphaStrong) };
        }
    }
`;


interface I_ContextMenuProps{
    targetRef: React.RefObject<HTMLElement>,
    children?: React.ReactNode
}

export default function ContextMenu({ targetRef, children } : I_ContextMenuProps){
    const contextMenuRef = useRef(null);
    const buttonRef = useRef(null);
    const {isVisible, posX, posY, btnPos, keyboardMode, openWithButton, handleKeyDown } = useContextMenu({targetRef, contextMenuRef, buttonRef});

    return isVisible ?  
                <StyledContextMenu ref={contextMenuRef} x={posX} y={posY} onKeyDown={(e) => handleKeyDown(e)}>
                    <ThemeProvider theme={ {keyboardMode} }>
                        {children}
                    </ThemeProvider>
                </StyledContextMenu>
                : 
                <StyledContextMenuButton ref={buttonRef} pos={btnPos} onClick={(e) => openWithButton(e)}>
                    <Icon id={ICON_ID.contextMenu} size={ICON_SIZES.small} />
                    <StyledScreenReaderOnly>
                        Open context menu
                    </StyledScreenReaderOnly>
                </StyledContextMenuButton>
}

type T_UseContextMenuProps = 
    Pick<I_ContextMenuProps, "targetRef"> 
    & {
        buttonRef : React.MutableRefObject<HTMLButtonElement | null>,
        contextMenuRef : React.MutableRefObject<HTMLDivElement | null>,
};
type T_Pos = { 
    x: number, 
    y: number 
};
type T_UseContextMenuOutput = {
    btnPos : T_Pos,
    isVisible : boolean,
    keyboardMode : boolean,
    posX: number,
    posY: number,
    handleKeyDown : (e : React.KeyboardEvent) => void,
    openWithButton : (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
};
function useContextMenu({buttonRef, contextMenuRef, targetRef} 
    : T_UseContextMenuProps)
    : T_UseContextMenuOutput {

    const btnPos : T_Pos = useButtonNearTarget({targetRef, buttonRef});

    const { x, y, setPosition } : ReturnType<typeof useContextMenuPositioning> 
        = useContextMenuPositioning({targetRef, contextMenuRef, btnPos});

    const { closeMenu, isVisible, openWithButton } : ReturnType<typeof useContextMenuVisibility>
        = useContextMenuVisibility({ contextMenuRef, targetRef, setPosition });

    const { keyboardMode, handleKeyDown, openWithButton : keyboardOpenWithButton } : ReturnType<typeof useKeyboardToOperate> 
        = useKeyboardToOperate({buttonRef, closeMenu, contextMenuRef, isVisible});


    function openWithButtonWithKeyboardSupport(e : React.MouseEvent<HTMLButtonElement, MouseEvent>){
        keyboardOpenWithButton(e);
        openWithButton(e);
    }

    return {
        btnPos,
        isVisible,
        keyboardMode,
        posX: x,
        posY: y,
        handleKeyDown,
        openWithButton: openWithButtonWithKeyboardSupport,
    }
}


type T_VisibilityProps = 
    Pick<T_UseContextMenuProps, "contextMenuRef" | "targetRef">
    & {
        setPosition : (e : MouseEvent | React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent, openedWithRightClick : boolean) => void,
};
type T_VisibilityOutput = 
    Pick<T_UseContextMenuOutput, "isVisible" | "openWithButton">
    & Pick<T_KeyboardOperationProps, "closeMenu">;
function useContextMenuVisibility({contextMenuRef, targetRef, setPosition}
    : T_VisibilityProps)
    : T_VisibilityOutput {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    useCloseOnOutsideClick({
        isOpen : isVisible,
        ref : contextMenuRef,
        setIsOpen : setIsVisible
    });


    useEffect(() => {
        if(!targetRef || !targetRef.current){
            return;
        }

        let target = targetRef.current;

        const showMenu = (e : MouseEvent) => {
            e.preventDefault();
            openMenu(e, true);
        }

        target.addEventListener('contextmenu', showMenu);

        return function cleanup(){
            target?.removeEventListener('contextmenu', showMenu);
        }
    });


    function openWithButton(e : React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        e.stopPropagation();
        openMenu(e);
    }


    function openMenu(e : MouseEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>, openedWithRightClick : boolean = false){
        setPosition(e, openedWithRightClick);
        setIsVisible(true);
    }


    function closeMenu(){
        setIsVisible(false);
    }

    return { 
        closeMenu, 
        isVisible, 
        openWithButton
    }
}


type T_MenuPositioningProps = 
    Pick<T_UseContextMenuProps, "contextMenuRef">
    & {
        btnPos : T_Pos,
};
type T_MenuPositioningOutput = 
    T_Pos 
    & Pick<T_VisibilityProps, "setPosition">;
function useContextMenuPositioning({targetRef, contextMenuRef, btnPos}
    : T_MenuPositioningProps & Pick<I_ContextMenuProps, "targetRef">)
    : T_MenuPositioningOutput {

    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);

    const expectedMenuWidth = React.useRef(convertRemToPixels(15.25));
    const spacer = 2;

    function setPosition(e : MouseEvent | React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent, openedWithRightClick : boolean){
        if(openedWithRightClick && "clientX" in e && "clientY" in e){
            setPosX(e.clientX);
            setPosY(e.clientY);
            return;
        }

        if(targetRef && targetRef.current){
            const rect = targetRef.current.getBoundingClientRect();
            setPosX(rect.right - expectedMenuWidth.current - spacer);
            setPosY(rect.top);
            return;
        }

        if(btnPos){
            setPosX(btnPos.x - expectedMenuWidth.current - spacer);
            setPosY(btnPos.y);
            return;
        }

        setPosX(0);
        setPosY(0);
    }

    usePositionWithinResizedWindow({
        ref: contextMenuRef,
        setPosX, 
        setPosY
    });

    return {
        x: posX, 
        y: posY, 
        setPosition
    }
}


function useButtonNearTarget({targetRef, buttonRef} 
    : Pick<I_ContextMenuProps, "targetRef"> & Pick<T_UseContextMenuProps, "buttonRef">)
    : T_Pos {

    const [posX, setPosX] = useState<number>(0);
    const [posY, setPosY] = useState<number>(0);


    function positionButton(){
        if(!targetRef || !targetRef.current){
            return;
        }

        let rect = targetRef.current.getBoundingClientRect();
        let x = rect.right;
        let y = rect.top;
        setPosX(x);
        setPosY(y);
    }

    function addXSpacer(position : number){
        const xSpacer = 1;

        let buttonWidth = 16;
        if(buttonRef?.current){
            buttonWidth = buttonRef.current.getBoundingClientRect().width;
        }

        return position + xSpacer;
    }

    useEffect(() => {
        window.addEventListener("resize", positionButton);
        return () => window.removeEventListener("resize", positionButton);
    }, []);

    useLayoutEffect(() => {
        positionButton();
    }, [targetRef]);

    usePositionWithinResizedWindow({
        ref: buttonRef,
        setPosX, 
        setPosY
    });

    return { 
        x: addXSpacer(posX), 
        y: posY 
    };
}


type T_ResponsivePositioningProps = {
    ref : React.MutableRefObject<any>,
    setPosX : React.Dispatch<React.SetStateAction<number>>,
    setPosY : React.Dispatch<React.SetStateAction<number>>,
}
function usePositionWithinResizedWindow({ref, setPosX, setPosY}
    : T_ResponsivePositioningProps)
    : void {

    function reposition(){
        if(!ref || !ref.current){
            return;
        }
        let pos = ref.current.getBoundingClientRect();

        if(pos.left < 0){
            setPosX(0);
        }
        else if(pos.left > 0 && pos.right > window.innerWidth){
            setPosX(window.innerWidth - (pos.right - pos.left));
        }

        if(pos.top < 0){
            setPosY(0);
        }
        else if(pos.top > 0 && pos.bottom > window.innerHeight){
            setPosY(window.innerHeight - (pos.bottom - pos.top));
        }
    }

    useEffect(() => {
        window.addEventListener("resize", reposition);
        return () => window.removeEventListener("resize", reposition);
    }, []);


    useLayoutEffect(() => {
        reposition();
    }, [ref, setPosX, setPosY]);
}


type T_KeyboardOperationProps = 
    Pick<T_UseContextMenuProps, "buttonRef" | "contextMenuRef"> 
    & Pick<T_UseContextMenuOutput, "isVisible">
    & {
        closeMenu : () => void,
};
type T_KeyboardOperationOutput = 
    Pick<T_UseContextMenuOutput, "keyboardMode" | "handleKeyDown">
    & {
        openWithButton : (e : MouseEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
};
function useKeyboardToOperate({buttonRef, closeMenu, contextMenuRef, isVisible}:
    T_KeyboardOperationProps)
    : T_KeyboardOperationOutput{

    const [keyboardMode, setKeyboardMode] = useState<boolean>(false);
    const [activeIdx, setActiveIdx] = useState<number | null>(null);


    function openWithButton(e : MouseEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>){
        if(e.detail === 0 && !(e instanceof PointerEvent)){
            setKeyboardMode(true);
        }
    }


    function handleKeyDown(e : React.KeyboardEvent){
        // Handle cases where the user opens the menu with mouse/touch, then switches
        // to keyboard operation
        const relevantKeys = ['ArrowUp', 'ArrowDown', 'Space', 'Escape', 'Tab'];
        if(relevantKeys.includes(e.key)){
            if(!keyboardMode){
                setKeyboardMode(true);
            }
        }

        if(e.key === "Escape" || e.key === "Tab"){
            closeMenu();
        }
        if(e.key === 'ArrowUp' || e.key === 'ArrowDown'){
            if(contextMenuRef?.current){
                moveWithinMenu({
                    e,
                    menuItems: contextMenuRef.current.getElementsByTagName("label"),
                    activeId : activeIdx,
                    setActiveId : setActiveIdx
                });
            }
        }
    }

    useContextMenuFocusManagement({
        keyboardMode, isVisible, contextMenuRef, activeIdx, setActiveIdx, buttonRef, setKeyboardMode});

    return {
        keyboardMode,
        handleKeyDown,
        openWithButton
    }
}

type T_FocusManagementProps = 
    Pick<T_UseContextMenuProps, "buttonRef" | "contextMenuRef">
    & Pick<T_UseContextMenuOutput, "keyboardMode" | "isVisible">
    & {
        activeIdx : number | null,
        setActiveIdx : React.Dispatch<React.SetStateAction<number | null>>, 
        setKeyboardMode : React.Dispatch<React.SetStateAction<boolean>>,
};
function useContextMenuFocusManagement({ activeIdx, buttonRef, contextMenuRef, isVisible, keyboardMode, setActiveIdx, setKeyboardMode}
    : T_FocusManagementProps)
    : void {

    useLayoutEffect(() => {

        if(isVisible){
            handleFocusWhenMenuOpens();
        }
        else {
            handleFocusWhenMenuCloses();
        }


        function handleFocusWhenMenuOpens(){
            if(!contextMenuRef || !contextMenuRef.current){
                return;
            }

            const firstCheckedIdx = getIndexOfFirstChecked();
            const focusIdx : number = activeIdx !== null ?
                                        activeIdx
                                        : firstCheckedIdx !== null ?
                                            firstCheckedIdx
                                            : 0;

            const optionToFocus = contextMenuRef.current.getElementsByTagName("label")[focusIdx];
            optionToFocus.focus();

            if(focusIdx !== activeIdx){
                setActiveIdx(focusIdx);
            }
        }


        function getIndexOfFirstChecked() : number | null {
            if(contextMenuRef?.current){
                const labels = contextMenuRef.current.getElementsByTagName("label");
                for(let i = 0; i < labels.length; i++){
                    const input = labels[i].getElementsByTagName("input")[0];
                    if(input.checked){
                        return i;
                    }
                }
            }
            return null;
        }


        function handleFocusWhenMenuCloses(){
            // activeIdx === null means the user has not yet used their keyboard to navigate the menu.
            // It prevents the button component from snatching focus on mounting
            if(!buttonRef || !buttonRef.current || activeIdx === null){
                return;
            }
            buttonRef.current.focus();
            setKeyboardMode(false);
        }

    }, [activeIdx, isVisible, keyboardMode, contextMenuRef, buttonRef, setKeyboardMode, setActiveIdx]);
}
