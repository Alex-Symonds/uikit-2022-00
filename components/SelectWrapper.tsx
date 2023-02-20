/*
    Contains shared components and functions relating to Select.

    Exports:
        > I_SelectWithOptionsProps
        > SelectWrapper
            >> Rounded-corner rectangle / hover stuff
            >> The close button and up/down arrow open/close toggle button
            >> The options list
            >> Use {children} to fill in the input area
        > multipleInputFunctions
*/


import React, {forwardRef} from 'react';
import styled, {css} from 'styled-components';
import { PALETTE, LAYOUT, SHADOW } from '../utils/Theme';
import Icon from './Icons';
import { IconMediumId } from './IconsMedium';
import customCursorImg from '../public/cursorHand.svg';

import OptionsListContainer from './OptionsContainer';
import {Option} from './Select';

export type SelectOptionDataType = string;

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
        Design exists for "Focus Active" (options displayed; no outline around container), but 
        not "Focus Inactive".
        With the options closed, there is nothing to indicate the focussed element. For accessibility, 
        add an outline for Focus Inactive. 
        Note: overflow: hidden has disabled the normal outline, so make a fake one using a pseudo element.
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


export interface I_SelectWrapperProps{
    className? : string,
    disabled? : boolean,
    optionsVisible? : boolean, 
    hasSelection : boolean,
    inputHasFocus? : boolean,
    optionsListId : string,
    options : SelectOptionDataType[],
    optionsListInteractivity : OptionsListInteractivity,
    clearInput : () => void,   
    toggleOptionVisibility : () => void,
    children : React.ReactNode,
}



export const SelectWrapper = forwardRef<HTMLDivElement, I_SelectWrapperProps>(
    function SelectWithOptions({className, disabled, optionsVisible, hasSelection, inputHasFocus, optionsListId, options, optionsListInteractivity, clearInput, toggleOptionVisibility, children} : I_SelectWrapperProps, containerRef){
        const toggleIconId = optionsVisible ? IconMediumId.arrowUp : IconMediumId.arrowDown;

        return  <StyledInputAndOptionsContainer ref={containerRef}>
                    <StyledInputContainer   disabled={disabled ?? false} showOptions={optionsVisible ?? false} inputFocused={inputHasFocus ?? false}>

                    <StyledSelectBar className={className}>
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

type OptionsListInteractivity = {
    activeId : number | null,
    optionIdPrefix : string,
    onOptionPick: (newInput : string) => void,
    selectedOptions : SelectOptionDataType[] | null,
}

function OptionsList({id, options, optionsMenuActions} : OptionsListPropsType){
    let {activeId, optionIdPrefix, onOptionPick, selectedOptions} = optionsMenuActions;
    return  <OptionsListContainer id={id} options={options}>
                {
                    options?.map((data : SelectOptionDataType, index : number) => {
                        return  <Option key={index}
                                        optionId={optionIdPrefix + index}
                                        data={data}
                                        onClick={() => onOptionPick(data)}
                                        isHighlighted={index === activeId}
                                        isSelected={selectedOptions === null || selectedOptions.length === 0 ? false : selectedOptions.includes(data)}
                                        />
                    })
                }
            </OptionsListContainer>
}

export function multipleInputFunctions({selectedOptions, removeSelectedOptions, addSelectedOption} : any){
    function clearInput(){
        if(selectedOptions.length === 0){
            return;
        }
        removeSelectedOptions(selectedOptions);
    }

    function onOptionPick(data : SelectOptionDataType){
        if(selectedOptions.includes(data)){
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

