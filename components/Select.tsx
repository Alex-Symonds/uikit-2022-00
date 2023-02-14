import React from 'react';
import styled, {css} from 'styled-components';
import { PALETTE, TYPOGRAPHY, LAYOUT, SHADOW } from './Theme';
import { StyledLabel } from './InputContainer';
import Icon from './Icons';
import { IconMediumId } from './IconsMedium';
import customCursorImg from '../public/cursorHand.svg';
import { StyledScreenReaderOnly } from './utils';
import { moveWithinMenu } from './utils';

const StyledInputAndOptionsContainer = styled.div`
    width: fit-content;
`;

const StyledInputContainer = styled.div<{disabled : boolean, showOptions : boolean, inputFocused : boolean}>`
    background: ${PALETTE.white};
    box-shadow: ${props => props.showOptions && !props.disabled ? SHADOW.hoverFile : SHADOW.default};
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

    /*  
        Design exists for "Focus Active" (no outline around container, options displayed), but 
        not "Focus Inactive".
        For accessibility, add an outline for Focus Inactive. overflow: hidden has disabled the
        normal outline, so make a fake one using a pseudo element.
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

const StyledInputBarLayout = styled.div`
    display: grid;
    gap: 0 0.25rem;
    grid-template-areas: "selection closeIcon toggleIcon";
    grid-template-columns: 1fr 1.5rem 1.5rem;
    grid-template-rows: 1fr;
    height: 100%;
    padding: 0 0.75rem;
    width: 100%;
`;

const StyledSelectedInput = styled.div`
    ${TYPOGRAPHY.p2}
    background: transparent;
    color: ${PALETTE.black};
    grid-area: selection;
    outline: none;
    overflow: hidden;
    padding: 1.5rem 0 0.3rem 0.25rem;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
`;

const StyledPlaceholderSpan = styled.span`
    color: ${PALETTE.blackStrong};
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

const StyledToggleButton = styled.button<{isActive : boolean}>`
    background: transparent;
    grid-area: toggleIcon;

    svg path{
        fill: ${ props => props.isActive ? PALETTE.black : PALETTE.blackStrong };
    }

    &:hover{
        cursor: url(${customCursorImg}), auto;
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
    padding: 0.5rem 0 0.4375rem 0;
    position: relative;
    width: 30.125rem;  
    z-index: 3;
`;

const StyledOption = styled.div<{isHighlighted : boolean}>`
    ${TYPOGRAPHY.p2}
    align-text: left;
    background: ${props => props.isHighlighted ? PALETTE.grayL : "transparent"};
    color: ${PALETTE.black};
    padding: 0.5rem 0.75rem 0.5rem 1rem;
    position: relative;

    &:hover{
        background: ${PALETTE.grayL};
        cursor: url(${customCursorImg}), auto;
    }

    span{
        display: block;
        max-width: calc(100% - 1.5rem - 0.4rem);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    svg{
        position: absolute;
        top: calc(50% - (1.5rem / 2));
        right: 12px;
    }
`;

const StyledFloatingLabel = styled(StyledLabel)<{floatUp : boolean}>`
    top: calc(50% - (1.25rem / 2) - 0.125rem);
    transition: 0.2s ease all;

    ${props => {
        if(props.floatUp){
            return css`
                ${TYPOGRAPHY.p3}
                left: 1rem;
                opacity: 1;
                top: 0.375rem;
            `;
        }
    }}
`;

interface I_SelectProps{
    disabled? : boolean,
    id?: string,
    label: string,
    options: OptionData[],
    placeholder: string,
    selectedOption: OptionData | null,
    setSelectedOption: (data : OptionData | null) => void,
    showOptions? : boolean,
}
type OptionData = string;

export default function Select({disabled, id, label, options, placeholder, selectedOption, setSelectedOption, showOptions : optionsVisibleOnInit} : I_SelectProps){
    const [optionsVisible, setOptionsVisible] = React.useState<boolean>(optionsVisibleOnInit ?? false);
    const [activeId, setActiveId] = React.useState<number | null>(null);
    const [selectedDisplayStr, setSelectedDisplayStr] = React.useState<string | null>(null);
    const [inputHasFocus, setInputHasFocus] = React.useState(false);

    // If an option is selected before the listbox receives focus, focus is set on the selected option.
    React.useEffect(() => {
        if(selectedOption === null){
            return;
        }
        const index = options.findIndex((ele) => ele === selectedOption);
        if(index === -1){
            return;
        }

        setActiveId(index);
    }, [selectedOption, options])

    // Enable "click outside to close options list"
    const containerRef = React.useRef(null);
    React.useEffect(() => {
        if(optionsVisible){
            window.addEventListener('click', clickOutsideToClose);
        }
        else{
            window.removeEventListener('click', clickOutsideToClose);
        }

        return function cleanup(){
            window.removeEventListener('click', clickOutsideToClose);
        }

        function clickOutsideToClose(e : MouseEvent){
            // Prevent the menu from closing prematurely when the user toggles an option
            if(clickedInside(e, containerRef)){
                return;
            }
            setOptionsVisible(false);
        }

        function clickedInside(e : MouseEvent, ref : React.MutableRefObject<null>){
            return ref.current && e.composedPath().includes(ref.current);
        }

    }, [optionsVisible]);


    // Manage text displayed in the "selected" area
    React.useEffect(() => {
        // Empty and closed = label only
        if(!optionsVisible && selectedOption === null){
            setSelectedDisplayStr(null);
        }
        // Empty and open = placeholder-like text. Use the displayStr for the black line at the start,
        // remaining placeholder-like text to be in a separate element
        else if(optionsVisible && selectedOption === null){
            setSelectedDisplayStr("|");
        }
        // Filled = show the selection
        else{
            setSelectedDisplayStr(selectedOption);
        }
    }, [selectedOption, optionsVisible]);


    // Buttons in the "input" area
    function handleFocus(){
        setInputHasFocus(true);
        setOptionsVisible(true);
        if(activeId === null && selectedOption === null){
            setActiveId(0);
        }
    }

    function handleBlur(){
        setInputHasFocus(false);
    }

    function toggleOptionVisibility(){
        // If none of the variables have any better ideas, highlight the first option for keyboard users
        if(activeId === null && selectedOption === null && !optionsVisible){
            setActiveId(0);
        }

        setOptionsVisible(prevState => {
            return !prevState;
        });
    }

    function clearInput(){
        setSelectedOption(null);
    }

    // Support for picking a suggestion from the options list
    function onOptionPick(data : OptionData){
        setSelectedOption(data);
    }

    function onKeyDown(e : React.KeyboardEvent<HTMLDivElement>){
        if(e.key === 'ArrowDown' || e.key === 'ArrowUp'){
            e.preventDefault(); /* Prevent the cursor from moving to the start or end of the text when navigating the results */
            if(!optionsVisible){
                setOptionsVisible(true);
            }
            moveWithinMenu({e, options, activeId, setActiveId});
        }

        if(e.key === 'Enter' || e.key === 'Space'){
            if(activeId !== null){
                if(options !== null && options !== undefined && options.length > 0){
                    onOptionPick(options[activeId]);
                }
            }
        }

        if(e.key === 'Escape'){
            setOptionsVisible(false);
        }
    }

    let inputId = React.useId();
    inputId = id ?? inputId;
    const optionsListId = inputId + "_optionList";
    const optionIdPrefix = optionsListId + "-";
    const hasSelection = selectedOption !== null;

    const optionsListInteractivity = {
        activeId,
        optionIdPrefix,
        onOptionPick,
        selectedOption,
    }

    const selectInputProps = {
        activeDescendantId: activeId === null ? undefined : optionIdPrefix + activeId,
        inputId,
        optionsListId,
        optionsVisible,
        onKeyDown,
        handleFocus,
        handleBlur,
        toggleOptionVisibility,
    }

    return  <StyledInputAndOptionsContainer ref={containerRef}>

                <StyledInputContainer disabled={disabled ?? false} showOptions={optionsVisible ?? false} inputFocused={inputHasFocus}>
                    <SelectInputBar     disabled={disabled ?? false}
                                        hasSelection={hasSelection}
                                        label={label}
                                        placeholder={placeholder}
                                        selectInputProps={selectInputProps}
                                        selectedDisplayStr={selectedDisplayStr}
                                        selectedOption={selectedOption}
                                        clearInput={clearInput}
                                    />
                </StyledInputContainer>

                {optionsVisible &&
                    <OptionsList id={optionsListId}  options={options}  optionsMenuActions={optionsListInteractivity} />
                }

            </StyledInputAndOptionsContainer>
}

type SelectInputBarProps = Pick<I_SelectProps, "selectedOption" | "placeholder" | "disabled" | "label"> & {
    hasSelection : boolean, 
    selectInputProps : SelectInputProps, 
    selectedDisplayStr : string | null, 
    clearInput : () => void,
}

type SelectInputProps = {
    activeDescendantId : string | undefined,
    inputId : string,
    optionsListId : string,
    optionsVisible : boolean,
    onKeyDown : (e : React.KeyboardEvent<HTMLDivElement>) => void, 
    toggleOptionVisibility : () => void,
    handleFocus : () => void,
    handleBlur : () => void,
}

function SelectInputBar({disabled, label,hasSelection, placeholder, selectedDisplayStr, selectedOption, selectInputProps, clearInput} : SelectInputBarProps){
    const {activeDescendantId, inputId, optionsListId, optionsVisible, handleFocus, handleBlur, onKeyDown, toggleOptionVisibility} = selectInputProps;
    const toggleIconId = optionsVisible ? IconMediumId.arrowUp : IconMediumId.arrowDown;

    return  <StyledInputBarLayout>
                <StyledSelectedInput id={inputId}

                                tabIndex={0}

                                role={"combobox"}
                                aria-activedescendant={activeDescendantId}
                                aria-expanded={optionsVisible}
                                aria-owns={optionsListId}

                                onBlur={() => handleBlur()}
                                onFocus={() => handleFocus()}
                                onKeyDown={(e) => onKeyDown(e)}
                                onMouseDown={() => toggleOptionVisibility()}
                                >
                    {selectedDisplayStr}
                    {selectedOption === null && optionsVisible &&
                        <StyledPlaceholderSpan>{placeholder}</StyledPlaceholderSpan>
                    }
                </StyledSelectedInput>

                <StyledFloatingLabel htmlFor={inputId} disabled={disabled ?? false} floatUp={optionsVisible || hasSelection}>
                    {label}
                </StyledFloatingLabel>

                { hasSelection &&
                    <StyledCloseButton onClick={ clearInput }>
                        <Icon idMedium={IconMediumId.close} />
                    </StyledCloseButton>
                }

                <StyledToggleButton onClick = { toggleOptionVisibility } isActive={optionsVisible && hasSelection}>
                    <Icon idMedium = {toggleIconId} />
                </StyledToggleButton>
                
        </StyledInputBarLayout>
}

type OptionsListPropsType = Pick<I_SelectProps, "options"> & {
    id: string,
    optionsMenuActions: OptionsListInteractivity
};

type OptionsListInteractivity = {
    activeId : number | null,
    optionIdPrefix : string,
    onOptionPick: (newInput : string) => void,
    selectedOption : string | null,
}

function OptionsList({id, options, optionsMenuActions} : OptionsListPropsType){
    let {activeId, optionIdPrefix, selectedOption, onOptionPick} = optionsMenuActions;
    let screenReaderMsg : string = `${options.length} options found. Use up and down arrows to review.`;

    return  <StyledOptionsContainer id={id}>
                <StyledScreenReaderOnly id={"searchAnnouncement"} aria-live="assertive">
                    {screenReaderMsg}
                </StyledScreenReaderOnly>
                {
                    options?.map((data : OptionData, index : number) => {
                        return  <Option key={index}
                                        optionId={optionIdPrefix + index}
                                        data={data}
                                        onClick={() => onOptionPick(data)}
                                        isHighlighted={index === activeId}
                                        isSelected={selectedOption === data}
                                        />
                    })
                }
            </StyledOptionsContainer>
}


type OptionPropsType = {
    data : OptionData,
    isHighlighted : boolean,
    isSelected : boolean,
    onClick : () => void,
    optionId : string,
}

function Option({optionId, onClick, isHighlighted, data, isSelected} : OptionPropsType){
    return  <StyledOption   tabIndex={-1}
                            id={optionId}
                            role={"option"}
                            onClick={() => onClick()}
                            isHighlighted={isHighlighted}
                            aria-selected={isSelected}
                            >

                <span>{data}</span>

            {isSelected &&
                <Icon idMedium={IconMediumId.check} />
            }
            </StyledOption>
}
