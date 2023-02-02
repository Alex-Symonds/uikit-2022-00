import React from 'react';
import styled from 'styled-components';
import { PALETTE, FONT } from './Theme';
import Icon from './Icons';
import { IconSmallId } from './IconsSmall';
import Paragraph from './Paragraph';
import { visuallyHidden, getClassName } from './utils';

const StyledToggleBase = styled.button<{hasLabel : boolean}>`
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
    
    &:disabled{
        opacity: 56%;
    }

    &:focus:not([disabled]){
        border-color: ${PALETTE.blackStrong};
    }

    svg path{
        fill: ${PALETTE.white};
    }

    &:after{
        aspect-ratio: 1/1;
        border-radius: 100%;
        content: '';
        display: block;  
    }
`;

const StyledToggleOn = styled(StyledToggleBase)`
    background: ${PALETTE.primary};
    border-color: ${PALETTE.primary};

    &:after{
        background: ${PALETTE.white};
        height: 1rem;
    }

    &:hover:not([disabled]){
        background: ${PALETTE.hover};
        border-color: ${PALETTE.hover};
    }
`;

const StyledToggleOff = styled(StyledToggleBase)`
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

    &:hover:not([disabled]){
        &:before{
            background: ${PALETTE.hover};
        }
        &:after{
            border-color: #BBACE2;
        }
    }
`;


const StyledLayout = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: 
        "toggle heading"
        "toggle description"
    ;
    gap: 0.125rem 0.75rem;
`;

// Non-standard heading style
const StyledHeading = styled.h3`
    font-family: ${FONT.main};
    font-size: 1rem;
    font-weight: normal;
    grid-area: heading;
    line-height: 1.5rem; 
`;

const StyledParagraph = styled(Paragraph)`
    grid-area: description;
`;

const StyledScreenReaderName = styled.span`
    ${visuallyHidden}
`;

interface I_ToggleProps{
    disabled : boolean,
    isOn : boolean,
    label? : LabelProps,
    onScreenReader : string,
    parentOnClick: () => void,
}

type LabelProps = {
    heading : string,
    description : string,
}

export default function Toggle({ disabled, isOn, label, onScreenReader, parentOnClick} : I_ToggleProps){  
    const toggleButton = <ToggleButton  disabled={disabled} 
                                        label={label}
                                        isOn={isOn}
                                        onScreenReader={onScreenReader}
                                        parentOnClick={parentOnClick}
                                        />

    if(label === undefined){
        return toggleButton;
    }
    return  <LabelWrapper label={label}>
                {toggleButton}
            </LabelWrapper>
}

function ToggleButton({disabled, isOn, label, onScreenReader, parentOnClick} : I_ToggleProps) {

    const StyledToggleCurrent = isOn ? StyledToggleOn : StyledToggleOff;

    return  <StyledToggleCurrent    aria-pressed={isOn}
                                    onClick={parentOnClick}
                                    disabled={disabled}
                                    hasLabel={label === undefined}
                                    >
                <StyledScreenReaderName>
                    {onScreenReader}
                </StyledScreenReaderName>
                { isOn &&
                    <Icon idSmall={IconSmallId.check} />
                }
            </StyledToggleCurrent>
}

type LabelWrapperProps = {
    label : LabelProps,
    children : React.ReactNode,
}

function LabelWrapper({label, children} : LabelWrapperProps){
    return <StyledLayout>
                {children}
                <StyledHeading>
                    {label.heading}
                </StyledHeading>
                <StyledParagraph size={3} colour={PALETTE.blackStrong} className={getClassName(StyledParagraph)}>
                    {label.description}
                </StyledParagraph>
            </StyledLayout>
}