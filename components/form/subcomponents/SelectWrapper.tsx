/*
    Contains shared components and functions relating to Select.

    Exports:
        > SelectOptionDataType
            >> If you need to extend it to an object with an ID field as well, here you go :)
        > I_SelectWrapperProps
        > SelectWrapper
            >> Rounded-corner rectangle / hover stuff
            >> The close button and up/down arrow open/close toggle button
            >> The options list
            >> Use {children} to fill in the input area
        > multiSelectionFunctions
        > multiSelectionProps
        > singleSelectionFunctions
        > singleSelectionProps
*/

import React, {forwardRef} from 'react';
import styled from 'styled-components';

import { PALETTE } from '../../../utils/Theme';
import customCursorImg from '../../../public/cursorHand.svg';

import { Icon, IconMediumId } from '../../icons/';

import Option from './Option';
import OptionsListWithScreenreader from './OptionsContainer';
import {   
        StyledInputAndOptionsContainer, 
        StyledInputContainerWithOutline as StyledInputContainer, 
        StyledCloseButton,
        } from './StyledInputWithOptions';

/*
    Assumptions: 
        > Each display name in the Select is unique and can therefore be used to identify the selected option
        > Individual "checked" status is unnecessary because only one option can be selected (instead, store the selectOption's display name and compare)
        > We're not using any <input> elements, so no particular need to consider correct use of name, value, etc.

    Conclusion:
    All we need is a string for the display name.
*/
export type SelectOptionDataType = string;

const StyledSelectBar = styled.div`
    display: grid;
    gap: 0 0.25rem;
    grid-template-areas: "selection closeIcon toggleIcon";
    grid-template-columns: 1fr 1.5rem 1.5rem;
    grid-template-rows: 1fr;
    height: 100%;
    padding: 0 0.75rem;
    width: 100%;
`;

const StyledToggleButton = styled.button<{isActive : boolean}>`
    background: transparent;
    grid-area: toggleIcon;

    svg {
        opacity: ${ props => props.isActive ? "100%" : "48%" };
        path{
            fill: ${ PALETTE.black };
        }
    }

    &:hover{
        cursor: url(${customCursorImg}), auto;
    }
`;


export interface I_SelectWrapperProps{
    disabled? : boolean,
    hasSelection : boolean,
    inputHasFocus? : boolean,
    options : SelectOptionDataType[],
    optionsListId : string,
    optionsListInteractivity : OptionsListInteractivity,
    optionsVisible? : boolean, 
    clearInput : () => void,   
    toggleOptionVisibility : () => void,
    children : React.ReactNode,
}

// This exists to reduce the number of props being passed into SelectWrapper.
type OptionsListInteractivity = {
    activeId : number | null,
    optionIdPrefix : string,
    onOptionPick: (newInput : string) => void,
    selectedOptions : SelectOptionDataType[] | null,
}

export const SelectWrapper = forwardRef<HTMLDivElement, I_SelectWrapperProps>(
    function SelectWrapper({disabled, hasSelection, inputHasFocus, options, optionsListId, optionsListInteractivity, optionsVisible, clearInput, toggleOptionVisibility, children} : I_SelectWrapperProps, containerRef){
        const toggleIconId = optionsVisible ? IconMediumId.arrowUp : IconMediumId.arrowDown;

        return  <StyledInputAndOptionsContainer ref={containerRef}>
                    <StyledInputContainer disabled={disabled ?? false} showOptions={optionsVisible ?? false} inputFocused={inputHasFocus ?? false}>
                        <StyledSelectBar>

                            {children}

                            { hasSelection &&
                                <StyledCloseButton onClick={ clearInput }>
                                    <Icon idMedium={IconMediumId.close} />
                                </StyledCloseButton>
                            }

                            <StyledToggleButton onClick = { toggleOptionVisibility } isActive={(optionsVisible ?? false) && hasSelection}>
                                <Icon idMedium = {toggleIconId} />
                            </StyledToggleButton>
                            
                        </StyledSelectBar>
                    </StyledInputContainer>

                {optionsVisible &&
                    <OptionsList id={optionsListId}  options={options}  optionsMenuActions={optionsListInteractivity} />
                }
                </StyledInputAndOptionsContainer>
    }
);

type OptionsListPropsType = Pick<I_SelectWrapperProps, "options"> & {
    id: string,
    optionsMenuActions: OptionsListInteractivity,
};

function OptionsList({id, options, optionsMenuActions} : OptionsListPropsType){
    let {activeId, optionIdPrefix, onOptionPick, selectedOptions} = optionsMenuActions;
    return  <OptionsListWithScreenreader id={id} options={options}>
                {
                    options?.map((data : SelectOptionDataType, index : number) => {
                        return  <Option key={index}
                                        enableCheck={true}
                                        isHighlighted={index === activeId}
                                        isSelected={selectedOptions === null || selectedOptions.length === 0 ? false : selectedOptions.includes(data)}
                                        optionId={optionIdPrefix + index}
                                        text={data}
                                        onClick={() => onOptionPick(data)}
                                        />
                    })
                }
            </OptionsListWithScreenreader>
}


export type multiSelectionProps = Pick<OptionsListInteractivity, "selectedOptions"> & {
    addSelectedOption: (data : SelectOptionDataType | null) => void,
    removeSelectedOptions: (data : SelectOptionDataType[] | null) => void,
}

export function multiSelectionFunctions({selectedOptions, removeSelectedOptions, addSelectedOption} : multiSelectionProps){
    function clearInput(){
        if(selectedOptions && selectedOptions.length === 0){
            return;
        }
        removeSelectedOptions(selectedOptions);
    }

    function onOptionPick(data : SelectOptionDataType){
        if(selectedOptions && selectedOptions.includes(data)){
            removeSelectedOptions([data]);
            return;
        }
        addSelectedOption(data);
    }

    function onOptionDelete(data : SelectOptionDataType){
        removeSelectedOptions([data]);
    }

    return {
        clearInput,
        onOptionPick,
        onOptionDelete,
    }
}


export type singleSelectionProps = {
    setSelectedOption : (data : SelectOptionDataType | null) => void,
}
type singleSelectionFunctionsProps = Pick<OptionsListInteractivity, "selectedOptions"> 
                                    & singleSelectionProps;
export function singleSelectionFunctions({selectedOptions, setSelectedOption} : singleSelectionFunctionsProps){
    function clearInput(){
        setSelectedOption(null);
    }

    function onOptionPick(data : SelectOptionDataType){
        if(selectedOptions && selectedOptions.includes(data)){
            setSelectedOption(null);
            return;
        }
        setSelectedOption(data);
    }

    return {
        clearInput,
        onOptionPick,
    }
}
