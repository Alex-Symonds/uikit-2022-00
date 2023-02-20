import React from 'react';
import styled, {css} from 'styled-components';
import { PALETTE, TYPOGRAPHY, LAYOUT, SHADOW } from '../utils/Theme';
import Icon from './Icons';
import { IconMediumId } from './IconsMedium';
import customCursorImg from '../public/cursorHand.svg';
import { StyledScreenReaderOnly } from '../utils/utils';
import { moveWithinMenu } from '../utils/utils';

const StyledSearchAndResultsContainer = styled.div`
    position: relative;
`;

const StyledSearchContainer = styled.div<{disabled : boolean, showResults : boolean}>`
    background: ${PALETTE.white};
    box-shadow: ${props => props.showResults ? SHADOW.hoverFile : SHADOW.default};
    border-radius: ${LAYOUT.borderRadius};
    height: 3.5rem;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    width: 30.125rem;
    
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
`;

const StyledLayout = styled.div`
    display: grid;
    gap: 0 0.5rem;
    grid-template-areas: "searchForm closeIcon";
    grid-template-columns: 1fr 1.5rem;
    grid-template-rows: 1fr;
    height: 100%;
    padding: 0 0.75rem;
    width: 100%;
`;

const StyledForm = styled.form`
    display: grid;
    gap: 0 0.5rem;
    grid-area: searchForm;
    grid-template-areas: "searchIcon searchBar";
    grid-template-columns: 1.5rem 1fr;
    grid-template-rows: 1fr;
    height: 100%;
    width: 100%;
`;

const StyledSearch = styled.input.attrs({ type: "text" })`
    ${TYPOGRAPHY.p2}

    background: transparent;
    grid-area: searchBar;
    outline: none;
    padding: 0;
    width: 100%;

    &:focus::placeholder{
        color: transparent;
    }

    &::placeholder{
        color: ${PALETTE.blackStrong};
    }
`;

const StyledSearchLabel = styled.label<{isEmpty : boolean}>`
    align-items: center;
    display: flex;
    grid-area: searchIcon;
    height: 100%;
    text-indent: -9999px;

    svg path{
        fill: ${ props => props.isEmpty ? PALETTE.blackStrong : PALETTE.black };
    }

    ${StyledSearch}:focus ~ &,
    ${StyledSearch}:not(:placeholder-shown) ~ &{
        svg path{
            fill: ${ PALETTE.black };
        }
    }
`;

const StyledCloseButton = styled.button`
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
    max-width: 100%;
    overflow: hidden;
    padding: 0.5rem 0 0.5rem 0;
    position: relative;
    width: 30.125rem;  
`;


const StyledLoadingOption = styled.div`
    padding: 0.5rem 1rem 0.25rem 1rem;
    
    &:before{
        display: block;
        content: '';
        background: ${PALETTE.grayL};
        height: 1.625rem;
        width: 100%;
    }

    &:last-child{
        padding-bottom: 0.5625rem;
    }
`;

const StyledOptionNone = styled.div`
    ${TYPOGRAPHY.p2}
    color: ${PALETTE.blackStrong};
    padding: 0.5rem 1rem 0.5rem 1rem;
`;

const StyledResult = styled.div<{isHighlighted : boolean}>`
    ${TYPOGRAPHY.p2}
    align-text: left;
    background: ${props => props.isHighlighted ? PALETTE.grayL : "transparent"};
    color: ${PALETTE.black};
    padding: 0.5rem 1rem 0.5rem 1rem;

    &:hover{
        background: ${PALETTE.grayL};
    }
`;

interface I_SearchProps{
    disabled? : boolean,
    showOptions? : boolean,                      /* Override results display to force it on/off on load */
    handleSubmit: (newInput? : string) => void,
    initialValue? : string,
    loading?: boolean,
    options? : SearchResultData[] | null,
    updateOptions: (data : SearchResultData) => void,
}

type SearchResultData = string;

export default function Search({initialValue, disabled, updateOptions, handleSubmit, loading, options, showOptions : showOptionsOnLoad} : I_SearchProps){
    const [input, setInput] = React.useState<string | null>(initialValue ?? null);
    const [showOptions, setShowOptions] = React.useState<boolean>(showOptionsOnLoad === undefined ? false : showOptionsOnLoad);
    const [activeId, setActiveId] = React.useState<number | null>(null);
    
    // If the results change, reset the keyboard position in the results
    React.useEffect(() => {
        setActiveId(null);
    }, [options]);

    // Functions for the controlled text input and form
    function onChange(e : React.ChangeEvent<HTMLInputElement>){
        setInput(e.target.value);

        if(e.target.value !== null || e.target.value !== ""){
            setShowOptions(true);
            updateOptions(e.target.value);
        }
        else {
            setShowOptions(false);
        } 
    }

    function clearInput(){
        setShowOptions(false);
        setInput(null);
    }

    function onSubmit(){
        let value = input === null ? undefined : input;
        handleSubmit(value);
    }

    // Functions for picking a suggestion from the Results list
    function onOptionPick(data : SearchResultData){
        setInput(data);
        setShowOptions(false);
        setActiveId(null);
    }

    function onKeyDown(e : React.KeyboardEvent<HTMLInputElement>){
        if(e.key === 'ArrowDown' && !showOptions){
            e.preventDefault();
            setShowOptions(true);
            return;
        }

        if(e.key === 'ArrowDown' || e.key === 'ArrowUp'){
            e.preventDefault(); /* Prevent the cursor from moving to the start or end of the text when navigating the results */
            moveWithinMenu({e, options, activeId, setActiveId});
        }

        if(e.key === 'Enter'){
            if(activeId !== null){
                e.preventDefault(); // Prevent auto-submission of the form (we want "submit" to be a separate action)
                if(options !== null && options !== undefined && options.length > 0){
                    onOptionPick(options[activeId]); // Populate the search bar with the selected option
                }
            }
        }

        if(e.key === 'Escape'){
            setShowOptions(false);
            setActiveId(null);
        }
    }

    const hasInput = input !== null;
    const inputId = React.useId();
    const optionListId = inputId + "_optionList";
    const optionIdPrefix = optionListId + "-";

    const optionsMenuActions = {
        activeId,
        optionIdPrefix,
        onOptionPick,
    }

    return  <StyledSearchAndResultsContainer>
                <StyledSearchContainer disabled={false} showResults={showOptions}>
                    <StyledLayout>
                        <StyledForm onSubmit={(e) => { e.preventDefault(); onSubmit()}}>
                            <StyledSearch   id={inputId}
                                            placeholder={"Search"}
                                            role={"combobox"}
                                            autoComplete={"off"}
                                            aria-autocomplete={"both"}
                                            aria-owns={optionListId}
                                            aria-activedescendant={activeId === null ? undefined : optionIdPrefix + activeId}

                                            onChange={(e) => onChange(e)} 
                                            onKeyDown={(e) => onKeyDown(e)}
                                            value={ input ?? ""}
                                            />
                            <StyledSearchLabel htmlFor={inputId} isEmpty={!hasInput}>
                                Search
                                <Icon idMedium={IconMediumId.search} />
                            </StyledSearchLabel>
                            <StyledScreenReaderOnly as="input" type="submit" value="Submit" disabled={disabled} />
                        </StyledForm>
                        
                    { hasInput &&
                        <StyledCloseButton onClick={ clearInput }>
                            <Icon idMedium={IconMediumId.close} />
                        </StyledCloseButton>
                    }
                    </StyledLayout>
                </StyledSearchContainer>

            { showOptions &&
                <OptionsList    id={optionListId} 
                                options={options} 
                                loading={loading} 
                                optionsMenuActions={optionsMenuActions}/>
            }
            </StyledSearchAndResultsContainer>
}

type OptionsMenuActions = {
    activeId : number | null,
    optionIdPrefix : string,
    onOptionPick: (newInput : string) => void,
}

type SearchOptionsType = Pick<I_SearchProps, "options" | "loading"> & {
    id: string,
    optionsMenuActions: OptionsMenuActions
};

function OptionsList({id, options, loading, optionsMenuActions} : SearchOptionsType){
    let content : JSX.Element;
    let screenReaderMsg : string;

    if(loading){
        content = <LoadingOptions />
        screenReaderMsg = "Loading results...";
    }
    else if(options!== null && options !== undefined && options.length > 0){
        content = <Options options={options} {...optionsMenuActions} />
        screenReaderMsg = `${options.length} results found. Use up and down arrows to review.`;
    }
    else {
        content = <NoOptions />
        screenReaderMsg = `No results found`;
    }
    
    return  <StyledOptionsContainer id={id} role={"listbox"}>
                <StyledScreenReaderOnly id={"searchAnnouncement"} aria-live="assertive">
                    {screenReaderMsg}
                </StyledScreenReaderOnly>
                {content}
            </StyledOptionsContainer>
}

function LoadingOptions(){
    return  <>
                <StyledLoadingOption />
                <StyledLoadingOption />
                <StyledLoadingOption />
            </>
}

function NoOptions(){
    return  <StyledOptionNone>
                No results
            </StyledOptionNone>
}


type OptionsProps = OptionsMenuActions & Pick<SearchOptionsType, "options">;

function Options({activeId, options, optionIdPrefix, onOptionPick} : OptionsProps){
    return  <>
            {
                options?.map((data, index) => {
                    return  <StyledResult   key={index}
                                            tabIndex={-1}
                                            id={optionIdPrefix + index}
                                            role={"option"}
                                            onClick={() => onOptionPick(data)}
                                            isHighlighted={index === activeId}
                                            >
                                {data}
                            </StyledResult>
                })
            }
            </>
}