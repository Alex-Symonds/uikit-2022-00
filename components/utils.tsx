import {css} from 'styled-components';


export function isBlank(prop : any) : boolean{
    return prop === '' || prop === undefined || prop === null;
}


export const resetCss = css`
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-weight: inherit;
    font-style: inherit;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;
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