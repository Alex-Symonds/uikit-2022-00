import React from 'react';
import styled, {css} from 'styled-components';
import { PALETTE, TYPOGRAPHY, LAYOUT, SHADOW } from './Theme';
import Icon from './Icons';
import { IconMediumId } from './IconsMedium';
import customCursorImg from '../public/cursorHand.svg';
import { visuallyHidden } from './utils';

const resultIdPrefix = "idSearchResult-";

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

const StyledResultsContainer = styled.div`
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


const StyledLoadingResult = styled.div`
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

const StyledEmptyResult = styled.div`
    ${TYPOGRAPHY.p2}
    color: ${PALETTE.blackStrong};
    padding: 0.5rem 1rem 0.5rem 1rem;
`;

const StyledResult = styled.div`
    ${TYPOGRAPHY.p2}
    align-text: left;
    background: transparent;
    color: ${PALETTE.black};
    padding: 0.5rem 1rem 0.5rem 1rem;

    &:hover{
        background: ${PALETTE.grayL};
    }

    &:focus, 
    &:focus-within{
        outline-color: ${PALETTE.blackStrong};
    }
`;

const StyledScreenReaderOnly = styled.div`
    ${visuallyHidden}
`;

interface I_SearchProps{
    disabled? : boolean,
    displayResults? : boolean,                      /* Override results display to force it on/off on load */
    handleSubmit: (newInput? : string) => void,
    initialValue? : string,
    loading?: boolean,
    results? : SearchResultData[] | null,
    updateResults: (data : SearchResultData) => void,
}

type SearchResultData = string;

export default function Search({initialValue, disabled, updateResults, handleSubmit, loading, results, displayResults} : I_SearchProps){
    const [input, setInput] = React.useState<string | null>(initialValue ?? null);
    const [showResults, setShowResults] = React.useState<boolean>(displayResults === undefined ? false : displayResults);
    const [activeId, setActiveId] = React.useState<number | null>(null);
    const searchTextInput = React.useRef<HTMLInputElement>(null);
    
    // If the results change, reset the position in the results
    React.useEffect(() => {
        setActiveId(null);
    }, [results]);

    // Functions for the controlled input and form
    function onChange(e : React.ChangeEvent<HTMLInputElement>){
        setInput(e.target.value);

        if(e.target.value !== null || e.target.value !== ""){
            setShowResults(true);
            updateResults(e.target.value);
        }
        else {
            setShowResults(false);
        } 
    }

    function clearInput(){
        setShowResults(false);
        setInput(null);
        searchTextInput?.current?.focus();
    }

    function onSubmit(){
        let value = input === null ? undefined : input;
        handleSubmit(value);
    }

    // Functions for picking a suggestion from the Results list
    function onKeyDown(e : React.KeyboardEvent<HTMLInputElement>){
        // Enter the list of results/suggestions
        if(e.key === 'ArrowDown'){
            setActiveId(0);
        }
    }

    function onOptionPick(data : SearchResultData){
        setInput(data);
        setShowResults(false);
        setActiveId(null);
        searchTextInput?.current?.focus();
    }

    function onEscape(){
        setShowResults(false);
        setActiveId(null);
        searchTextInput?.current?.focus();
    }

    const resultsMenuActions = {
        activeId: activeId,
        setActiveId: setActiveId,
        onOptionPick: onOptionPick,
        onEscape: onEscape,
    }

    const hasInput = input !== null;
    const searchEleId = "id_search";
    const searchResultsId = "id_searchResults";

    return  <StyledSearchAndResultsContainer>
                <StyledSearchContainer disabled={false} showResults={showResults}>
                    <StyledLayout>
                        <StyledForm onSubmit={(e) => { e.preventDefault(); onSubmit()}}>
                            <StyledSearch   id={searchEleId}
                                            placeholder={"Search"}
                                            role={"combobox"}
                                            autoComplete={"off"}
                                            aria-autocomplete={"both"}
                                            aria-owns={searchResultsId}
                                            aria-activedescendant={resultIdPrefix + activeId}

                                            ref={searchTextInput}

                                            onChange={(e) => onChange(e)} 
                                            onKeyDown={(e) => onKeyDown(e)}
                                            value={ input ?? ""}
                                            />
                            <StyledSearchLabel htmlFor={searchEleId} isEmpty={!hasInput}>
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

            { showResults &&
                <SearchResults  id={searchResultsId} 
                                results={results} 
                                loading={loading} 
                                resultsMenuActions={resultsMenuActions}/>
            }
            </StyledSearchAndResultsContainer>
}

type ResultsMenuActions = {
    activeId : number | null,
    setActiveId: React.Dispatch<React.SetStateAction<number | null>>,
    onOptionPick: (newInput : string) => void,
    onEscape: () => void,
}

type SearchResultsType = Pick<I_SearchProps, "results" | "loading"> & {
    id: string,
    resultsMenuActions: ResultsMenuActions
};

function SearchResults({id, results, loading, resultsMenuActions} : SearchResultsType){
    let content : JSX.Element;
    let screenReaderMsg : string;

    if(loading){
        content = <ResultsLoading />
        screenReaderMsg = "Loading results...";
    }
    else if(results!== null && results !== undefined && results.length > 0){
        content = <ResultsFull results={results} {...resultsMenuActions} />
        screenReaderMsg = `${results.length} results found. Use up and down arrows to review.`;
    }
    else {
        content = <ResultsEmpty />
        screenReaderMsg = `No results found`;
    }
    
    return  <StyledResultsContainer id={id} role={"listbox"}>
                <StyledScreenReaderOnly id={"searchAnnouncement"} aria-live="assertive">
                    {screenReaderMsg}
                </StyledScreenReaderOnly>
                {content}
            </StyledResultsContainer>
}

function ResultsLoading(){
    return  <>
                <StyledLoadingResult />
                <StyledLoadingResult />
                <StyledLoadingResult />
            </>
}

function ResultsEmpty(){
    return  <StyledEmptyResult>
                No results
            </StyledEmptyResult>
}


type ResultsFullProps = ResultsMenuActions & Pick<SearchResultsType, "results">;

function ResultsFull({activeId, setActiveId, results, onOptionPick, onEscape} : ResultsFullProps){

    React.useEffect(() => {
        const activeSuggestion = document.getElementById(resultIdPrefix + activeId);
        if(activeSuggestion === null){
            return;
        }
        activeSuggestion.focus();
    }, [activeId]);

    function handleKeyDown(e : React.KeyboardEvent<HTMLDivElement>, data : SearchResultData){
        if(e.key === 'ArrowUp' || e.key === 'ArrowDown'){
            moveWithinMenu(e);
        }

        if(e.key === 'Enter'){
            e.preventDefault(); // Prevent auto-submission of the form (we want "submit" to be a separate action)
            onOptionPick(data); // Populate the search bar with the selected option
        }

        if(e.key === 'Escape'){
            onEscape();
        }
    }

    function moveWithinMenu(e: React.KeyboardEvent<HTMLDivElement>){
        if(results === null || results === undefined){
            return;
        }

        let newId = activeId;

        if(e.key === 'ArrowUp'){
            if(newId === null || newId <= 0 ){
                newId = results.length - 1;
            }
            else{
                newId = newId - 1;
            }
        }
        
        if(e.key === 'ArrowDown'){
            if(newId === null || newId >= results.length - 1 ){
                newId = 0;
            }
            else{
                newId = newId + 1;
            }
        }

        setActiveId(newId);
    }

    return  <>
            {
                results?.map((data, index) => {
                    return  <StyledResult   key={index}
                                            tabIndex={0}
                                            id={resultIdPrefix + index}
                                            role={"option"}
                                            onClick={() => onOptionPick(data)}
                                            onKeyDown={(e) => handleKeyDown(e, data)}
                                            >
                                {data}
                            </StyledResult>
                })
            }
            </>
}