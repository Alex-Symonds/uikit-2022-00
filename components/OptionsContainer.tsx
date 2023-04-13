/*
    Exports:
        > OptionsListContainer
            >> White BG, rounded corners, shadow
            >> A screen-reader announcement of the number of options inside
*/

import React from 'react';
import styled from 'styled-components';

import { StyledOptionLoading, StyledOptionNone } from './';
import { PALETTE, LAYOUT, SHADOW } from '../utils/Theme';
import { StyledScreenReaderOnly, getArrayLengthOrZero } from '../utils/utils';

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