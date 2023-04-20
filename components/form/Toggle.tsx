import React from 'react';
import styled from 'styled-components';
import { PALETTE, TYPOGRAPHY } from '../../utils/Theme';

import { getClassName } from '../../utils/utils';

import { StyledScreenReaderOnly } from '../visuallyHidden';
import { Icon, IconSmallId } from '../icons';
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
        fill: ${PALETTE.white};
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
        border-color: ${PALETTE.black_faded};
    }

    input:checked + & {
        background: ${PALETTE.primary};
        border-color: ${PALETTE.primary};
    
        &:after{
            background: ${PALETTE.white};
            height: 1rem;
        }
    }

    input:checked:not(:disabled) + &:hover{
        background: ${PALETTE.hover};
        border-color: ${PALETTE.hover};
    }

    input:not(:checked) + & {
        background: ${PALETTE.white};
        border-color: ${PALETTE.disabled};
    
        &:before{
            aspect-ratio: 1/1;
            background: ${PALETTE.primary};
            border-radius: 100%;
            content: '';
            display: block;
            height: 1rem;
        }
    
        &:after{
            background: transparent;
            border: 0.125rem solid ${PALETTE.disabled};
            height: 0.75rem;
            margin-right: 0.25rem;
            opacity: 56%;
        }
    }

    input:not(:checked):not(:disabled) + &:hover {
        &:before{
            background: ${PALETTE.hover};
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
    ${TYPOGRAPHY.p2}
    font-weight: normal;
    grid-area: heading;
`;


const StyledParagraph = styled(Paragraph)`
    grid-area: description;
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
                <StyledParagraph className={getClassName(StyledParagraph)} colour={PALETTE.black_faded} size={3} >
                    {description}
                </StyledParagraph>
            </StyledLabel>
}


export function Toggle({ disabled, idForInput, isOn, parentOnChange}
    : T_ToggleSharedProps & T_ID){

    return  <label>
                <ToggleInsides disabled={disabled} idForInput={idForInput} isOn={isOn} hasDesc={false} parentOnChange={parentOnChange} />
            </label>
}


function ToggleInsides({ disabled, idForInput, isOn, hasDesc, parentOnChange} 
    : { hasDesc : boolean } & T_ID & T_ToggleSharedProps)
    {

    return  <>
                <StyledScreenReaderOnly as="input" type="checkbox" checked={isOn} disabled={disabled} id={idForInput} onChange={parentOnChange} />
                <StyledToggleSpan hasLabel={hasDesc}>
                { isOn &&
                    <Icon idSmall={IconSmallId.check} aria-hidden={true} />
                }
                </StyledToggleSpan>
            </>
}
