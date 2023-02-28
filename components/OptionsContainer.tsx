/*
    Exports:
        > OptionsListContainer
            >> White BG, rounded corners, shadow
            >> A screen-reader announcement of the number of options inside
*/

import React from 'react';
import styled, {css} from 'styled-components';
import { PALETTE, LAYOUT, SHADOW } from '../utils/Theme';
import { StyledScreenReaderOnly, getArrayLengthOrZero } from '../utils/utils';

import {StyledOptionLoading, StyledOptionNone} from './Options';
import customCursorImg from '../public/cursorHand.svg';

export const StyledInputAndOptionsContainer = styled.div`
    width: 30.125rem;
    max-width: 100%;
`;

export const StyledInputContainer = styled.div<{disabled : boolean, showOptions : boolean, inputFocused : boolean}>`
    background: ${PALETTE.white};
    box-shadow: ${props => props.showOptions && !props.disabled ? SHADOW.hoverFile : SHADOW.default};
    border-radius: ${LAYOUT.borderRadius};
    height: 3.5rem;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    
    ${ props => {
        if(props.disabled){
            return;
        }
        return css`   
            &:hover {
                box-shadow: ${SHADOW.hover};
            }
        `;
    }}

    /*  Explanation of this ::before element
        ----------------------------------------------------------------------------------------------------
        A design exists for "Focus Active" (= options displayed; no outline around container), but 
        there's nothing for "Focus Inactive".
        With no outline around the container, closing the optionsList means there's absolutely no 
        indication of the focussed element, which isn't great for keyboard users.
        So I'm going to make my own design for Focus Inactive: add an outline.

        Notes:
            >   overflow: hidden (purpose = enforce the rounded corners on children) has disabled the normal outline, 
                so make a fake one using a pseudo element.
            >   The <input> can get pretty tiny on SelectTag, so let's maintain the pretence that the entire
                container is an input by applying the focus outline to the entire container.
    */
    ${ props => {
        if(!props.inputFocused || props.showOptions) {
            return;
        }

        return css`
            &:before{
                border: 0.125rem solid ${PALETTE.blackStrong};
                border-radius: ${LAYOUT.borderRadius};
                content: '';
                display: block;
                height: 100%;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
                z-index: 2;  
            }
        `;
    }}
`;

export const StyledCloseButton = styled.button`
    background: transparent;
    grid-area: closeIcon;
    
    svg path{
        fill: ${ PALETTE.blackStrong };
    }

    &:hover{
        cursor: url(${customCursorImg}), auto;

        svg path{
            fill: ${ PALETTE.black };
        }
    }
`;

const StyledOptionsContainer = styled.div`
    align-items: stretch;
    background: ${PALETTE.white};
    border-radius: ${LAYOUT.borderRadius};
    box-shadow: ${SHADOW.contextMenu};
    display: flex;
    flex-direction: column;
    margin: 0.25rem 0 0 0;
    overflow: hidden;
    padding: 0.5rem 0 0.4375rem 0;
    position: relative;
    width: 100%;  
    z-index: 3;
`;


interface I_OptionsList{
    id: string,
    role?: string,
    children: React.ReactNode,  
}

interface I_OptionsListWrapper extends I_OptionsList{
    screenReaderMsg: string,
}

function OptionsListWrapper({id, role, screenReaderMsg, children} : I_OptionsListWrapper){
    return  <StyledOptionsContainer id={id} role={role}>
                <StyledScreenReaderOnly id={"searchAnnouncement"} aria-live="assertive">
                    {screenReaderMsg}
                </StyledScreenReaderOnly>
                {children}
            </StyledOptionsContainer>
}


type OptionsListNoLoadingProps = I_OptionsList & {
    options : any[] | null | undefined,
};
function OptionsListNoLoading({id, options, role, children} : OptionsListNoLoadingProps){
    const numOptions = getArrayLengthOrZero(options);
    let screenReaderMsg : string = `${numOptions} options found. Use up and down arrows to review.`;

    return  <OptionsListWrapper id={id} role={role} screenReaderMsg={screenReaderMsg}>
                {children}
            </OptionsListWrapper>
}

type OptionsListWithLoadingProps = OptionsListNoLoadingProps & {
    loading: boolean
};
function OptionsListWithLoading({id, options, loading, role, children} : OptionsListWithLoadingProps){
    let autoChildren : JSX.Element | null;
    let screenReaderMsg : string;
    const numOptions = getArrayLengthOrZero(options);

    if(loading === true){
        autoChildren = <LoadingOptions />
        screenReaderMsg = "Loading results...";
    }
    else if(numOptions === 0){
        autoChildren = <NoOptions />
        screenReaderMsg = "No results found"; 
    }
    else{
        autoChildren=null;
        screenReaderMsg = `${numOptions} results found. Use up and down arrows to review.`;
    }

    return  <OptionsListWrapper id={id} role={role} screenReaderMsg={screenReaderMsg}>
                {autoChildren}
                {autoChildren === null ?
                    children
                    : null
                }
            </OptionsListWrapper>
}

function LoadingOptions(): JSX.Element{
    return  <>
                <StyledOptionLoading />
                <StyledOptionLoading />
                <StyledOptionLoading />
            </>
}

function NoOptions() : JSX.Element{
    return  <StyledOptionNone>
                No results
            </StyledOptionNone>
}


interface I_OptionsListDefault extends OptionsListNoLoadingProps{
    loading? : boolean,
}

export default function OptionsList({id, options, loading, role, children} : I_OptionsListDefault) : JSX.Element{
    if(loading !== undefined){
        return  <OptionsListWithLoading id={id} role={role} options={options} loading={loading}>
                    {children}
                </OptionsListWithLoading>
    }
    return <OptionsListNoLoading id={id} role={role} options={options}>
                {children}
            </OptionsListNoLoading>
}