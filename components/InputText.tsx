import React from 'react';
import styled, {css} from 'styled-components';
import { PALETTE, LAYOUT, SHADOW, TYPOGRAPHY } from './Theme';
import {resetCss} from './utils';
import CheckIcon from './IconCheck';

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


const StyledInputContainer = styled.div<{disabled : boolean, isError : boolean, isSuccess : boolean}>`
    border-radius: ${LAYOUT.borderRadius};
    height: 3.5rem;
    overflow: hidden;
    position: relative;
    width: 30.125rem;

    ${ props => {
        if(props.isError){
            return css`
                background: ${PALETTE.redGirl};
                box-shadow: ${SHADOW.inputErrorSmall};

                &:active{
                    box-shadow: ${SHADOW.inputError};
                }
            `;
        }

        if(props.isSuccess){
            return css`
                background: ${PALETTE.greenPale};
                box-shadow: ${SHADOW.inputSuccess};
            `;
        }

        return css`
            background: ${PALETTE.white};
            box-shadow: ${SHADOW.default};
        `;
    }};

    &:hover {
        box-shadow: ${props => props.disabled ? SHADOW.default : SHADOW.hover}
    }

`;

const StyledFloatingLabel = styled.label<{disabled : boolean}>`
    ${resetCss}
    ${TYPOGRAPHY.p2}
    color: ${ props => props.disabled ? PALETTE.blackMedium : PALETTE.blackStrong};
    height: 1.25rem;
    left: 1rem;
	pointer-events: none;
    position: absolute;
    text-align: center;
    top: calc(50% - (1.25rem / 2));
    transition: 0.2s ease all;

    ${StyledTextInput}:focus ~ & ,
    ${StyledTextInput}:not(:placeholder-shown) ~ &{
        ${TYPOGRAPHY.p3}
        left: 1rem;
        opacity: 1;
        top: 0.375rem;
    }
`;

const StyledDescription = styled.p`
    ${resetCss}
    ${TYPOGRAPHY.p2}
    color: ${PALETTE.blackStrong};
    margin-top: 0.5rem;
`;

const StyledErrorMessage = styled(StyledDescription)`
    color: ${PALETTE.red};
`;

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

    return  <div>
                <StyledInputContainer disabled={disabled} isError={isError} isSuccess={!isError && isSuccess}>
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
                </StyledInputContainer>
                {
                    description !== undefined &&
                        <StyledDescription>
                            {description}
                        </StyledDescription>
                }
                {
                    isError &&
                        <StyledErrorMessage>
                            {errorMsg}
                        </StyledErrorMessage>
                }
            </div>
}

function ReadOnly({label, value} : Pick<I_InputProps, "label" | "value">){
    return  <StyledInputContainer disabled={false} isError={false} isSuccess={false}>
                <StyledTextInput as="p">
                    {value}
                </StyledTextInput>
                <StyledFloatingLabel as="h6" disabled={false}>
                    {label}
                </StyledFloatingLabel>
            </StyledInputContainer>
}