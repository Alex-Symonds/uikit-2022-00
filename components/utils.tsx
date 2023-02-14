import styled, {css} from 'styled-components';


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
            newId = newId - 1;
        }
    }
    
    if(e.key === 'ArrowDown'){
        if(newId === null || newId >= options.length - 1 ){ /* Loop from bottom to top */
            newId = 0;
        }
        else{
            newId = newId + 1;
        }
    }

    setActiveId(newId);
}


export function convertRemToPixels(rem : number){
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
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