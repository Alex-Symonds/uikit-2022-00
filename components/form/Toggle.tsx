import React from 'react';
import styled from 'styled-components';

import { getClassName, addOpacityToColor } from '../../utils/utils';

import { StyledScreenReaderOnly } from '../visuallyHidden';
import { Icon, ICON_ID, ICON_SIZES } from '../icons';
import Paragraph from '../Paragraph';


const StyledToggleSpan = styled.span<{hasLabel : boolean }>`
    align-items: center;
    border-width: 0.125rem;
    border-style: solid;
    border-radius: 1.5rem;
    display: flex;
    ${props => props.hasLabel ? "grid-area: toggle;" : "" }
    height: 1.5rem;
    justify-content: space-between;
    padding: 0.125rem;
    width: 3rem;
    
    svg path{
        fill: ${ ({theme}) => theme.color.textOnPrimary };
    }

    &:after{
        aspect-ratio: 1/1;
        border-radius: 100%;
        content: '';
        display: block;  
    }

    input:disabled + & {
        opacity: 56%;
    }

    input:not(:disabled) + &:focus {
        border-color: ${ ({theme}) => addOpacityToColor(theme.color.focusOutline, theme.opacity.focusOutline) };
    }

    input:checked + & {
        background: ${ ({theme}) => theme.color.primary };
        border-color: ${ ({theme}) => theme.color.primary };
    
        &:after{
            background: ${ ({theme}) => theme.color.textOnPrimary };
            height: 1rem;
        }
    }

    input:checked:not(:disabled) + &:hover{
        background: ${ ({theme}) => theme.color.primaryHover };
        border-color: ${ ({theme}) => theme.color.primaryHover };
    }

    input:not(:checked) + & {
        background: ${ ({theme}) => theme.color.mainBackground };
        border-color: ${ ({theme}) => theme.color.primaryPale };
    
        &:before{
            aspect-ratio: 1/1;
            background: ${ ({theme}) => theme.color.primary };
            border-radius: 100%;
            content: '';
            display: block;
            height: 1rem;
        }
    
        &:after{
            background: transparent;
            border: 0.125rem solid ${ ({theme}) => theme.color.primaryPale };
            height: 0.75rem;
            margin-right: 0.25rem;
            opacity: 56%;
        }
    }

    input:not(:checked):not(:disabled) + &:hover {
        &:before{
            background: ${ ({theme}) => theme.color.primaryHover };
        }
        &:after{
            border-color: #BBACE2;
        }
    }
`;


const StyledLabel = styled.label`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: 
        "toggle heading"
        "toggle description"
    ;
    gap: 0.125rem 0.75rem;
`;


const StyledHeading = styled.h3`
    ${ ({theme}) => theme.typography.p2 }
    font-weight: normal;
    grid-area: heading;
`;


const StyledParagraph = styled(Paragraph)`
    grid-area: description;
    color: ${ ({theme}) => addOpacityToColor(theme.color.mainText, theme.opacity.subtleMainText) };
`;


type T_ToggleSharedProps = {
    disabled : boolean,
    isOn : boolean,
    parentOnChange: () => void,
}

type T_HeadingWithDesc = {
    heading : string,
    description : string,
}

type T_ID = {
    idForInput : string
}

export function ToggleWithHeadingAndDesc({ description, disabled, heading, isOn, parentOnChange} 
    : T_ToggleSharedProps & T_HeadingWithDesc)
    {

    const uid = React.useId();
    const idForInput = `toggle-${uid}`;

    return  <StyledLabel htmlFor={idForInput}>
                <ToggleInsides disabled={disabled} hasDesc={true} idForInput={idForInput} isOn={isOn} parentOnChange={parentOnChange} />
                <StyledHeading>
                    {heading}
                </StyledHeading>
                <StyledParagraph className={getClassName(StyledParagraph)} size={3} >
                    {description}
                </StyledParagraph>
            </StyledLabel>
}


export function Toggle({ disabled, idForInput, isOn, parentOnChange}
    : T_ToggleSharedProps & T_ID )
    : JSX.Element {

    return  <label>
                <ToggleInsides disabled={disabled} idForInput={idForInput} isOn={isOn} hasDesc={false} parentOnChange={parentOnChange} />
            </label>
}


function ToggleInsides({ disabled, idForInput, isOn, hasDesc, parentOnChange} 
    : { hasDesc : boolean } & T_ID & T_ToggleSharedProps)
    : JSX.Element {

    return  <>
                <StyledScreenReaderOnly as="input" type="checkbox" checked={isOn} disabled={disabled} id={idForInput} onChange={parentOnChange} />
                <StyledToggleSpan hasLabel={hasDesc}>
                { isOn ?
                    <Icon id={ICON_ID.check} size={ICON_SIZES.small} aria-hidden={true} />
                    : null
                }
                </StyledToggleSpan>
            </>
}
