import React from 'react';
import styled from 'styled-components';
import { PALETTE, TYPOGRAPHY } from './Theme';
import {resetCss} from './utils';
import CheckIcon from './IconCheck';
import InputContainer, {StyledLabel} from './InputContainer';

const StyledTextInput = styled.input.attrs({ type: "text" })`
    ${resetCss}
    ${TYPOGRAPHY.p2}

    background: transparent;
    box-sizing: border-box;
    height: 100%;
    padding: 1.5rem 1rem 0.3rem 1rem;
    width: 100%;
    
    &::placeholder{
        color: ${PALETTE.blackStrong};
    }

    &:disabled{
        background: transparent;
        color: ${PALETTE.blackA24};
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: ${PALETTE.black};
      -webkit-box-shadow: 0 0 0px 40rem ${PALETTE.autofill} inset;
    } 
`;

const StyledFloatingLabel = styled(StyledLabel)`
    transition: 0.2s ease all;

    ${StyledTextInput}:focus ~ & ,
    ${StyledTextInput}:not(:placeholder-shown) ~ &{
        ${TYPOGRAPHY.p3}
        left: 1rem;
        opacity: 1;
        top: 0.375rem;
    }
`;

// const StyledFloatingLabel = styled.label<{disabled : boolean}>`
//     ${resetCss}
//     ${TYPOGRAPHY.p2}
//     color: ${ props => props.disabled ? PALETTE.blackMedium : PALETTE.blackStrong};
//     height: 1.25rem;
//     left: 1rem;
// 	pointer-events: none;
//     position: absolute;
//     text-align: center;
//     top: calc(50% - (1.25rem / 2));
//     transition: 0.2s ease all;

//     ${StyledTextInput}:focus ~ & ,
//     ${StyledTextInput}:not(:placeholder-shown) ~ &{
//         ${TYPOGRAPHY.p3}
//         left: 1rem;
//         opacity: 1;
//         top: 0.375rem;
//     }
// `;

const StyledIconContainer = styled.div`
    pointer-events: none;
    position: absolute;
    top: calc(50% - (24px / 2) + 1px);
    right: 0.8rem;
`;

interface I_InputProps{
    description? : string,
    disabled : boolean,
    errorMsg? : string,
    id : string,
    isSuccess : boolean,
    label : string,
    name : string,
    placeholder?: string,
    readOnly : boolean,
    value? : string,
    handleChange: (e : React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputText({description, disabled, errorMsg, isSuccess, name, placeholder, readOnly, value, id, label, handleChange} : I_InputProps){
    const isError = errorMsg !== undefined;
    placeholder = placeholder === undefined ? " " : placeholder;

    if(readOnly === true){
        return <ReadOnly label={label} value={value}/>
    }

    return  <InputContainer description={description} disabled={disabled} errorMsg={errorMsg} isSuccess={!isError && isSuccess} readOnly={false}>
                <StyledTextInput id={id} name={name} onChange={(e) => handleChange(e)} value={value} placeholder={placeholder} disabled={disabled}/>
                <StyledFloatingLabel htmlFor={id} disabled={disabled}>
                    {label}
                </StyledFloatingLabel>
                {
                    isSuccess &&
                    <StyledIconContainer>
                        <CheckIcon color={PALETTE.green}/>
                    </StyledIconContainer>
                }
            </InputContainer>
}

function ReadOnly({label, value, description} : Pick<I_InputProps, "label" | "value" | "description">){
    return  <InputContainer description={description} disabled={false} isSuccess={false} readOnly={true}>
                <StyledTextInput as="p">
                    {value}
                </StyledTextInput>
                <StyledFloatingLabel as="h6" disabled={false}>
                    {label}
                </StyledFloatingLabel>
            </InputContainer>
}