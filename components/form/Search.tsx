import React from 'react';
import styled from 'styled-components';

import { PALETTE, TYPOGRAPHY } from '../../utils/Theme';

import { Icon, IconMediumId, } from '../icons/';
import { StyledScreenReaderOnly } from '../visuallyHidden';

import { selectMenuKeyDown, selectMenuKeydownProps } from './utils/UseOptionsList';

import {    
        StyledInputAndOptionsContainer, StyledInputContainer, StyledCloseButton,
        OptionsContainer as OptionsListWithScreenReader,
        Option
        } from './subcomponents/';

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
        opacity: 48%;
    }
`;

const StyledSearchLabel = styled.label<{isEmpty : boolean}>`
    align-items: center;
    display: flex;
    grid-area: searchIcon;
    height: 100%;
    text-indent: -9999px;

    svg path{
        fill: ${ PALETTE.black };
        opacity: ${ props => props.isEmpty ? "48%" : "100%" };
    }

    ${StyledSearch}:focus ~ &,
    ${StyledSearch}:not(:placeholder-shown) ~ &{
        svg path{
            fill: ${ PALETTE.black };
        }
    }
`;


interface I_SearchProps{
    disabled? : boolean,
    showOptions? : boolean,                      /* Override results display to force it on/off on load */
    handleSubmit: (newInput? : string) => void,
    initialValue? : string,
    loading : boolean,
    options? : SearchResultData[] | null,
    updateOptions: (data : SearchResultData) => void,
}

type SearchResultData = string;

type UseResultsListProps = Pick<I_SearchProps, "showOptions" | "options" > & {
    onOptionPick: (data : SearchResultData) => void,
};
function useResultsList({options, showOptions : showOptionsOnLoad, onOptionPick : argOnOptionPick} : UseResultsListProps){
    const [showOptions, setShowOptions] = React.useState<boolean>(showOptionsOnLoad === undefined ? false : showOptionsOnLoad);
    const [activeId, setActiveId] = React.useState<number | null>(null);

    // If the results change, reset the keyboard position in the results
    React.useEffect(() => {
        setActiveId(null);
    }, [options]);

    function openResultsList(){
        setShowOptions(true);
    }

    function closeResultsList(){
        setShowOptions(false);
        setActiveId(null);
    }

    function onOptionPick(data : SearchResultData){
        closeResultsList();
        argOnOptionPick(data);
    }

    function onChange(e : React.ChangeEvent<HTMLInputElement>){
        if(e.target.value !== null && e.target.value !== ""){
            openResultsList();
        }
        else {
            closeResultsList();
        } 
    }

    function onKeyDown(e : React.KeyboardEvent<HTMLInputElement>){
        const props : selectMenuKeydownProps = {
            e,
            activeId: activeId,
            options: options !== null && options !== undefined ? options : [],
            optionsVisible: showOptions,
            closeOptionsList: closeResultsList,
            onOptionPick: onOptionPick,
            openOptionsList: openResultsList,
            setActiveId : setActiveId,
        }
        selectMenuKeyDown(props);
    }

    const inputId = React.useId();
    const optionListId = inputId + "_optionList";
    const optionIdPrefix = optionListId + "-";

    return {
        activeDescendantId: activeId === null ? undefined : optionIdPrefix + activeId,
        activeId,
        inputId,
        optionIdPrefix,
        optionListId,
        showOptions,
        closeResultsList,
        onChange,
        openResultsList,  
        setActiveId,
        onOptionPick,
        onKeyDown,
    }
}

type UseInputKitProps = Pick<I_SearchProps, "initialValue" | "handleSubmit" | "updateOptions">;
function useInputKit({initialValue, handleSubmit, updateOptions} : UseInputKitProps){
    const [input, setInput] = React.useState<string | null>(initialValue ?? null);

    function onChange(e : React.ChangeEvent<HTMLInputElement>){
        setInput(e.target.value);

        if(e.target.value !== null && e.target.value !== ""){
            updateOptions(e.target.value);
        }
    }

    function clearInput(){
        setInput(null);
    }

    function onSubmit(){
        let value = input === null ? undefined : input;
        handleSubmit(value);
    }

    function onOptionPick(data : SearchResultData){
        setInput(data);
    }

    return {
        input: input,
        hasInput: input !== null,
        onChange,
        clearInput,
        onSubmit,
        onOptionPick,
    }
}


export default function Search({initialValue, disabled, updateOptions, handleSubmit, loading, options, showOptions : showOptionsOnLoad} : I_SearchProps){
    const inputKit : ReturnType<typeof useInputKit> = useInputKit({
        initialValue,
        updateOptions, 
        handleSubmit,
    });

    const resultsListKit : ReturnType<typeof useResultsList> = useResultsList({
        showOptions: showOptionsOnLoad,
        options,
        onOptionPick: inputKit.onOptionPick
    });

    function onChange(e : React.ChangeEvent<HTMLInputElement>){
        inputKit.onChange(e);
        resultsListKit.onChange(e);
    }

    function cancel(){
        inputKit.clearInput(); 
        resultsListKit.closeResultsList()
    }

    const optionsMenuActions : OptionsMenuActions = {
        activeId: resultsListKit.activeId,
        optionIdPrefix: resultsListKit.optionIdPrefix,
        onOptionPick: resultsListKit.onOptionPick,
    }

    return  <StyledInputAndOptionsContainer>
                <StyledInputContainer disabled={false} showOptions={resultsListKit.showOptions}>
                    <StyledLayout>
                        <StyledForm onSubmit={(e) => { e.preventDefault(); inputKit.onSubmit()}}>
                            <StyledSearch   id={resultsListKit.inputId}
                                            placeholder={"Search"}
                                            role={"combobox"}
                                            autoComplete={"off"}
                                            aria-autocomplete={"both"}
                                            aria-owns={resultsListKit.optionListId}
                                            aria-activedescendant={resultsListKit.activeDescendantId}

                                            onChange={(e) => onChange(e)} 
                                            onKeyDown={(e) => resultsListKit.onKeyDown(e)}
                                            value={ inputKit.input ?? ""}
                                            />
                            <StyledSearchLabel htmlFor={resultsListKit.inputId} isEmpty={!inputKit.hasInput}>
                                Search
                                <Icon idMedium={IconMediumId.search} />
                            </StyledSearchLabel>
                            <StyledScreenReaderOnly as="input" type="submit" value="Submit" disabled={disabled} />
                        </StyledForm>
                        
                    { inputKit.hasInput &&
                        <StyledCloseButton onClick={ cancel } >
                            <Icon idMedium={IconMediumId.close} />
                        </StyledCloseButton>
                    }
                    </StyledLayout>
                </StyledInputContainer>

            { resultsListKit.showOptions &&
                <OptionsList    id={resultsListKit.optionListId} 
                                options={options} 
                                loading={loading} 
                                optionsMenuActions={optionsMenuActions}/>
            }
            </StyledInputAndOptionsContainer>
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
    const {activeId, optionIdPrefix, onOptionPick} = {...optionsMenuActions};
    return  <OptionsListWithScreenReader    id={id} 
                                            options={options}
                                            role={"listbox"} 
                                            loading={loading}
                                            >
            { options!== null && options !== undefined && options.length > 0 ?
                options.map((data, index) => {
                    return  <Option     key={index}
                                        isHighlighted={index === activeId}
                                        isSelected={false}
                                        optionId={optionIdPrefix + index}
                                        text={data}
                                        onClick={() => onOptionPick(data)}        
                            />
 
                })
                : 
                null
            }   
            </OptionsListWithScreenReader>
}
