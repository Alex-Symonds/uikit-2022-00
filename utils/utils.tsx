import styled, {css} from 'styled-components';

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

export function isBlank(prop : any) : boolean{
    return prop === '' || prop === undefined || prop === null;
}

export function convertRemToPixels(rem : number){
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function getArrayLengthOrZero(anyArray : any[] | null | undefined) : number{
    return anyArray == null || anyArray === undefined || anyArray.length <= 0 ? 0 : anyArray.length;
}

export function getClassName(styledComponent : any){
    const className = String(styledComponent).replace(".", "");
    return className;
}
