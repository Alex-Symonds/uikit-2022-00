import React from 'react';
import styled from 'styled-components';
import { PALETTE, FONT, LAYOUT, ICON_SIZES } from './Theme';
import CheckIcon from './IconCheck';
import MinusIcon from './IconMinus';


const StyledLabel = styled.label<Pick<CheckboxProps, "disabled" | "error">>`
    font-family: ${ FONT.main };
    font-size: 1rem;
    line-height: 1.5rem;

    align-items: center;

    display: grid;
    grid-template-columns: 1.5rem auto;
    gap: 0.75rem;

    position: relative;

    color: ${ props => {
        if(props.disabled && !props.error){
            return PALETTE.blackHeavy
        }
        else if(props.error){
            return PALETTE.red;
        }
        return "inherit"
    }};

    & svg {
        position: absolute;
        top: calc(.75rem - 8px);
        left: calc(.75rem - 8px);
    }
`;

const StyledCheckbox = styled.input<Pick<CheckboxProps, "error">>`
    appearance: none;
    background-color: #fff;
    margin: 0;

    background: ${ props => props.error ? PALETTE.redGirl : PALETTE.white };
    border-color: ${ props => props.error ? "transparent": PALETTE.grayS };
    border-radius: ${ LAYOUT.borderRadius };
    border-style: solid;
    border-width: 0.0625rem;
    box-sizing: border-box;
    height: 1.5rem;
    font: inherit;
    overflow: hidden;
    width: 1.5rem;

    display: grid;
    place-content: center;

    & + & {
        margin-top: 1rem;
    }

    &::before{
        content: "";
        width: 1.5rem;
        height: 1.5rem;
        box-sizing: border-box;
        transform: scale(0);
        transition: 30ms transform ease-in-out;
        background: ${ PALETTE.primary };
    }

    &:checked,
    &:indeterminate{
        border: none;

        &::before{
            transform: scale(1);
        }
    }

    &:active{
        background: ${ PALETTE.grayL };

        &:checked::before{
            background: ${ PALETTE.active };
        }
    }

    &:disabled{
        border-color: ${ PALETTE.graySHeavier };
        cursor: not-allowed;

        &:checked::before,
        &:indeterminate::before{
            background: ${ PALETTE.primaryStrong };
        }
    }

    &:focus{
        border-color: ${ PALETTE.graySMedium };
        border-width: 0.125rem; 

        &:checked::before,
        &:indeterminate::before{
            background: ${ PALETTE.primary };
            box-shadow: inset 0px 0px 0px 0.125rem rgba(0, 0, 0, 0.48);
        }
    }

    &:hover{
        background: ${ PALETTE.grayM };

        &:checked::before{
            background: ${ PALETTE.hover };
        }
    }

`;


interface CheckboxProps{
    checked: boolean,
    disabled: boolean,
    error: boolean,
    onChange: () => void,
    id: string,
    indeterminate: boolean,
    name: string,
    text: string,
    value: string 
}

export default function Checkbox({checked, disabled, error, onChange, id, indeterminate, name, text, value} : CheckboxProps){

    // styled-components doesn't appear to understand "indeterminate={indeterminate}", so adjust it this way instead
    const checkboxRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if(checkboxRef.current === null){
            return;
        }
        checkboxRef.current.indeterminate = indeterminate;
    }, [indeterminate]);


    return <StyledLabel disabled={disabled} error={error}>
            <StyledCheckbox checked={checked} ref={checkboxRef} type="checkbox" disabled={disabled} id={id} name={name} value={value} error={error} onChange={onChange}/>
            {text}
            {
                !indeterminate && checked
                && <CheckIcon color={ PALETTE.white } size={ ICON_SIZES.small } />
            }
            {
                indeterminate && <MinusIcon color={ PALETTE.white } />
            }
        </StyledLabel>
}

