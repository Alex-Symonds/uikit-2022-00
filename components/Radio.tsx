import React from 'react';
import styled, {css} from 'styled-components';
import { PALETTE, TYPOGRAPHY } from '../utils/Theme';
import { visuallyHidden } from '../utils/utils';

const VisuallyHiddenRadio = styled.input.attrs({type: "radio"})`
    ${visuallyHidden}
`;

const StyledRadio = styled.span<Pick<I_Radio, "checked" | "disabled">>`
    --radioWidth: 1.5rem;

    align-items: center;
    aspect-ratio: 1/1;
    background: ${props => props.checked ? PALETTE.primary : PALETTE.disabled};
    border: none;
    border-radius: var(--radioWidth);
    display: flex;
    justify-content: center;
    opacity: ${props => props.disabled ? "56%" : "100%"};
    width: var(--radioWidth);

    ${props => {
        if(props.disabled){
            return;
        }
        return css`
            &:hover{
                background: ${props.checked ? PALETTE.hover : PALETTE.primary};
                opacity: ${props.checked ? "100%" : "50%"};
            }
        `;
    }}

    ${props => {
        if(props.checked && !props.disabled){
            return css`
                --fillerWidth: 0.625rem;

                &::before{
                    aspect-ratio: 1/1;
                    background: ${PALETTE.white};
                    border: none;
                    border-radius: var(--fillerWidth);
                    content: '';
                    display: block;
                    pointer-events: none;
                    width: var(--fillerWidth);
                }
            `;
        }
    }}
`;

const StyledLabel = styled.label<Pick<I_Radio, "disabled">>`
    ${TYPOGRAPHY.p2}

    color: ${ props => props.disabled ? PALETTE.blackStrong : PALETTE.black };

    display: flex;
    gap: 0.75rem;

    &:focus{
        ${StyledRadio}::after{
            aspect-ratio: 1/1;
            border: 2px solid ${PALETTE.blackStrong};
            border-radius: var(--radioWidth);
            content: '';
            display: block;
            position: absolute;
            pointer-events: none;
            width: var(--radioWidth);
        }
    }
`;

interface I_Radio{
    checked: boolean,
    disabled? : boolean,
    label: string,
    onClick : (checked : boolean) => void,
}

export default function Radio({checked, disabled, label, onClick} : any){
    disabled = disabled ?? false;

    return  <StyledLabel disabled={disabled}>
                <VisuallyHiddenRadio checked={checked} disabled={disabled} onChange={() => onClick(!checked)} onClick={() => onClick(!checked)} />
                <StyledRadio checked={checked} disabled={disabled} />
                {label} 
            </StyledLabel>
}