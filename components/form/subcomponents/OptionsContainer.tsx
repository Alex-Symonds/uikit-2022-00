/*
    Exports:
        > OptionsListContainer
            >> White BG, rounded corners, shadow
            >> A screen-reader announcement of the number of options inside
*/

import React from 'react';
import styled from 'styled-components';

import { StyledScreenReaderOnly } from '../../visuallyHidden';

import { StyledOptionLoading, StyledOptionNone } from './Option';

const StyledOptionsContainer = styled.div`
    align-items: stretch;
    background: ${ ({theme}) => theme.color.mainBackground };
    border-radius: ${ ({theme}) => theme.borderRadius };
    box-shadow: ${ ({theme}) => theme.shadow.contextMenu };
    display: flex;
    flex-direction: column;
    margin: 0.25rem 0 0 0;
    overflow: hidden;
    padding: 0.5rem 0 0.4375rem 0;
    position: absolute;
    width: 100%;  
    z-index: 3;
`;


type T_SRMessage = {
    screenReaderMsg: string,
}
function ScreenReaderWrapper({id, role, screenReaderMsg, children} 
    : T_SRMessage & Omit<I_OptionList, "loading" | "options">)
    {

    return  <StyledOptionsContainer id={id} role={role}>
                <StyledScreenReaderOnly id={"searchAnnouncement"} aria-live="assertive">
                    {screenReaderMsg}
                </StyledScreenReaderOnly>
                {children}
            </StyledOptionsContainer>
}


function OptionsListNoLoading({id, options, role, children} 
    : Omit<I_OptionList, "loading"> )
    {

    const numOptions = getNumOptions(options);
    let screenReaderMsg : string = `${numOptions} options found. Use up and down arrows to review.`;

    return  <ScreenReaderWrapper id={id} role={role} screenReaderMsg={screenReaderMsg}>
                {children}
            </ScreenReaderWrapper>
}


function OptionsListWithLoading({id, options, loading, role, children} 
    : I_OptionList & Required<Pick<I_OptionList, "loading">> )
    {

    let autoChildren : JSX.Element | null;
    let screenReaderMsg : string;
    const numOptions = getNumOptions(options);

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

    return  <ScreenReaderWrapper id={id} role={role} screenReaderMsg={screenReaderMsg}>
                {autoChildren}
                {autoChildren === null ?
                    children
                    : null
                }
            </ScreenReaderWrapper>
}

function getNumOptions(options 
    : any[] | null | undefined )
    : number {

    return options ? options.length : 0;
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


interface I_OptionList{
    id: string,
    loading?: boolean,
    options : any[] | null | undefined,
    role?: string,
    children: React.ReactNode,  
}


export default function OptionsList({id, options, loading, role, children} 
    : I_OptionList ) 
    : JSX.Element {

    if(loading !== undefined){
        return  <OptionsListWithLoading id={id} role={role} options={options} loading={loading}>
                    {children}
                </OptionsListWithLoading>
    }
    return <OptionsListNoLoading id={id} role={role} options={options}>
                {children}
            </OptionsListNoLoading>
}