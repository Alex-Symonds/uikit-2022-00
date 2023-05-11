import React from 'react';
import styled, {css} from 'styled-components';

import { addOpacityToColor } from '../../utils/utils';

import { Icon, ICON_ID, ICON_SIZES } from '../icons/';

const StyledLabel = styled.label<Pick<CheckboxProps, "disabled" | "error">>`
    ${ ({theme}) => theme.typography.p2 }

    align-items: center;
    color: ${ props => props.error ? ({theme}) => theme.color.error : "inherit" };
    display: grid;
    gap: 0.75rem;
    grid-template-columns: 1.5rem auto;
    opacity: ${ props => props.disabled && !props.error ? props.theme.opacity.alphaStronger : "100%"};
    position: relative;

    & svg {
        position: absolute;
        top: calc(.75rem - 8px);
        left: calc(.75rem - 8px);

        & path,
        & rect {
            fill: ${ ({theme}) => theme.color.textOnPrimary };
        }
    }
`;

const StyledCheckbox = styled.input<Pick<CheckboxProps, "error">>`
    appearance: none;
    margin: 0;

    background: ${ props => props.error ? props.theme.color.errorBackground : props.theme.color.inputBackground };
    border-color: ${ props => props.error ? "transparent": props.theme.color.inputBorder };
    border-radius: ${ ({theme}) => theme.borderRadius };
    border-style: solid;
    border-width: 0.0625rem;
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
        transform: scale(0);
        transition: 30ms transform ease-in-out;
        background: ${ ({theme}) => theme.color.primary };
    }

    &:checked,
    &:indeterminate{
        border: none;

        &::before{
            transform: scale(1);
        }
    }

    &:active{
        background: ${ ({theme}) => theme.color.inputBackgroundActive };

        &:checked::before,
        &:indeterminate::before{
            background: ${ ({theme}) => theme.color.primaryActive };
        }
    }

    &:disabled{
        border-color: ${ ({theme}) => theme.color.inputBorder };
        cursor: not-allowed;
        opacity: 56%;

        &:checked::before,
        &:indeterminate::before{
            background: ${ ({theme}) => theme.color.primary };
        }
    }

    &:focus{
        border-color: ${ ({theme}) => addOpacityToColor(theme.color.inputBorder, theme.opacity.alphaStrong) };
        border-width: 0.125rem; 

        &:checked::before,
        &:indeterminate::before{
            background: ${ ({theme}) => theme.color.primary };
            box-shadow: inset 0px 0px 0px 0.125rem rgba(0, 0, 0, 0.48);
        }
    }

    ${ props => {
        if(!props.disabled){
            return css`
                &:hover{
                    background: ${ props.error ? props.theme.color.errorBackgroundHover : props.theme.color.inputBackgroundHoverLight };
            
                    &:checked::before,
                    &:indeterminate::before{
                        background: ${ props.theme.color.primaryHover };
                    }
                }
            `;
        }
    }}
`;


interface CheckboxProps{
    checked: boolean,
    disabled: boolean,
    error: boolean,
    id: string,
    indeterminate: boolean,
    name: string,
    text: string,
    value: string,
    onChange: () => void,
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


    const iconId = !indeterminate && checked ?
                    ICON_ID.check
                    : indeterminate ?
                        ICON_ID.minus
                        : null;

    return <StyledLabel disabled={disabled} error={error}>
            <StyledCheckbox checked={checked} ref={checkboxRef} type="checkbox" disabled={disabled} id={id} name={name} value={value} error={error} onChange={onChange}/>
            {text}
            {
                iconId ?
                <Icon id={iconId} size={ICON_SIZES.small} />
                : null
            }
        </StyledLabel>
}

