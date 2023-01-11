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