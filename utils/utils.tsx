import styled, {css} from 'styled-components';
import React from 'react';
import {CheckboxOptionDataType} from '../components/ContextMenuCheckbox';
import {RadioOptionDataType} from '../components/ContextMenuRadio';

export function isBlank(prop : any) : boolean{
    return prop === '' || prop === undefined || prop === null;
}


export const StyledScreenReaderOnly = styled.div`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;


export const visuallyHidden = css`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;




type MoveWithMenuPropsType = {
    e: React.KeyboardEvent, 
    options : any[] | null | undefined, 
    activeId : number | null, 
    setActiveId : (value: React.SetStateAction<number | null>) => void
}
export function moveWithinMenu({e, options, activeId, setActiveId} : MoveWithMenuPropsType){
    if(options === null || options === undefined){
        return;
    }

    let newId = activeId;

    if(e.key === 'ArrowUp'){
        if(newId === null || newId <= 0 ){ /* Loop from top to bottom */
            newId = options.length - 1;
        }
        else{
            newId--;
        }
    }
    
    if(e.key === 'ArrowDown'){
        if(newId === null || newId >= options.length - 1 ){ /* Loop from bottom to top */
            newId = 0;
        }
        else{
            newId++;
        }
    }

    setActiveId(newId);
}


export function convertRemToPixels(rem : number){
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function getArrayLengthOrZero(anyArray : any[] | null | undefined) : number{
    return anyArray == null || anyArray === undefined || anyArray.length <= 0 ? 0 : anyArray.length;
}

type CallbackFunctionVariadicAnyReturn = (...args: any[]) => any;

export function debounce(func : CallbackFunctionVariadicAnyReturn, timeout = 300){
    let timer : ReturnType<typeof setTimeout>;
    return function(this : any, ...args : any[]){
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export function getClassName(styledComponent : any){
    const className = String(styledComponent).replace(".", "");
    return className;
}

export function useFocusMonitor(){
    const [inputHasFocus, setInputHasFocus] = React.useState(false);

    function handleFocus(){
        setInputHasFocus(true);
    }

    function handleBlur(){
        setInputHasFocus(false);
    }

    return {
        inputHasFocus,
        handleFocus,
        handleBlur,
    }
}

interface I_useCloseOnOutsideClick{
    isOpen: boolean,
    containerEle : HTMLElement | null,
    setIsOpen : (value: React.SetStateAction<boolean>) => void,
}
export function useCloseOnOutsideClick({isOpen, containerEle, setIsOpen} : I_useCloseOnOutsideClick){
    React.useEffect(() => {
        if(isOpen){
            window.addEventListener('click', clickOutsideToClose);
        }
        else{
            window.removeEventListener('click', clickOutsideToClose);
        }

        return function cleanup(){
            window.removeEventListener('click', clickOutsideToClose);
        }

        function clickOutsideToClose(e : MouseEvent){
            // Prevent the menu from closing prematurely when the user toggles an option
            if(containerEle && e.composedPath().includes(containerEle)){
                return;
            }
            setIsOpen(false);
        }

    }, [isOpen, containerEle, setIsOpen]);
}

export function changeCheckbox(id : string, checked : boolean, options : CheckboxOptionDataType[], setOptions : React.Dispatch<React.SetStateAction<CheckboxOptionDataType[]>>){
    const newOptions = options.map((c, i) => {
        if(c.id === id){
            return {
                ...c,
                checked: !checked
            }
        }
        else{
            return c;
        }
    });
    setOptions(newOptions);
}

export function changeRadio(id : string, checked : boolean, options : RadioOptionDataType[], setOptions : React.Dispatch<React.SetStateAction<RadioOptionDataType[]>>){
    const newOptions = options.map((c, i) => {
        if(c.id === id){
            return {
                ...c,
                checked: !checked
            }
        }
        else{
            if(checked){
                return c;
            }
            else{
                return {
                    ...c,
                    checked: false
                }
            }
        }
    });
    setOptions(newOptions);
}
