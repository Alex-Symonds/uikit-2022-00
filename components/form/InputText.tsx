import React from 'react';
import styled from 'styled-components';

import { rgba } from '../../utils/utils';

import { Icon, ICON_ID, ICON_SIZES } from '../icons/';

import { StyledLabel, InputContainer, I_InputContainerProps } from './subcomponents';


const StyledTextInput = styled.input.attrs({ type: "text" })`
    ${ ({theme}) => theme.typography.p2 }

    background: transparent;
    height: 100%;
    outline: none;
    padding: 1.5rem 1rem 0.3rem 1rem;
    width: 100%;
    
    &::placeholder{
        opacity: 48%;
    }

    &:disabled{
        background: transparent;
        opacity: 24%;
    }
    
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: ${ ({theme}) => theme.color.mainText };
      -webkit-box-shadow: 0 0 0px 40rem ${ ({theme}) => theme.color.autofill } inset;
    } 
`;

const StyledFloatingLabel = styled(StyledLabel)`
    transition: 0.2s ease all;

    ${StyledTextInput}:focus ~ & ,
    ${StyledTextInput}:not(:placeholder-shown) ~ &{
        ${ ({theme}) => theme.typography.p3 }
        left: 1rem;
        top: 0.375rem;
    }
`;

const StyledPlaceholder = styled.span`
    ${ ({theme}) => theme.typography.p2 }
    bottom: 0.35rem;
    color: transparent;
    display: block;
    left: 1.2rem;
    pointer-events: none;
    position: absolute;

    ${StyledTextInput}:focus:placeholder-shown ~ &{
        color: ${ ({theme}) => rgba(theme.color.mainText, theme.opacity.placeholderText) };
    }
`;

const StyledIconContainer = styled.div`
    pointer-events: none;
    position: absolute;
    top: calc(50% - (24px / 2) + 1px);
    right: 0.8rem;

    svg path {
        fill: ${ ({theme}) => theme.color.success };
    }
`;



interface I_InputProps extends Partial<I_InputContainerProps>{
    id? : string,
    label : string,
    name : string,
    placeholder?: string,
    value : string | null,
    handleChange: (e : React.ChangeEvent<HTMLInputElement>) => void
}
export default function InputText({description, disabled, errorMsg, isSuccess, name, placeholder, readOnly, value, id, label, handleChange} : I_InputProps){
    const autoidInput = React.useId();
    const autoidPlaceholder = React.useId();

    const inputId = id ?? autoidInput;
    const placeholder_id = placeholder === undefined ? undefined : autoidPlaceholder;
    const isError = errorMsg !== undefined;

    return  <InputContainer     description={description} 
                                disabled={disabled ?? false} 
                                errorMsg={errorMsg} 
                                isSuccess={!isError && (isSuccess ?? false) } 
                                readOnly={readOnly ?? false}
                                >
                <StyledTextInput    aria-describedby={placeholder_id}
                                    disabled={disabled ?? false} 
                                    id={inputId} 
                                    name={name} 
                                    placeholder={" "} 
                                    readOnly={readOnly ?? false}
                                    value={value === null ? undefined : value} 
                                    onChange={(e) => handleChange(e)} 
                />
                
                <StyledFloatingLabel htmlFor={inputId} disabled={disabled ?? false}>
                    {label}
                </StyledFloatingLabel>

            {placeholder !== undefined ?
                <StyledPlaceholder id={placeholder_id}>
                    {placeholder}
                </StyledPlaceholder>
                : null
            }
            {
                isSuccess ?
                <StyledIconContainer>
                    <Icon id={ICON_ID.check} size={ICON_SIZES.medium} />
                </StyledIconContainer>
                : null
            }
            </InputContainer>
}