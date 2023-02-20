import React from 'react';
import styled, {css} from 'styled-components';
import { PALETTE, TYPOGRAPHY } from '../utils/Theme';
import { StyledScreenReaderOnly, useFocusMonitor } from '../utils/utils';
import {SelectWrapper, I_SelectWrapperProps, SelectOptionDataType, multiSelectionFunctions, multiSelectionProps} from './SelectWrapper';
import Tag, {TagColor, TagSize} from './Tag';
import { StyledLabel } from './InputContainer';
import useTagOverflowCheck, { overflowBarX } from '../utils/UseTagOverflowCheck';
import { useUpdatingRef } from '../utils/UseUpdatingRef';
import useOptionsList from '../utils/UseOptionsList';

const StyledCentreLabel = styled(StyledLabel)`
    top: calc(50% - (1.25rem / 2) - 0.125rem);
    pointer-events: none;
`;

const StyledInputLayout = styled.div`
    align-items: center;
    display: flex;
    gap: 0.2rem;
    grid-area: selection;
    max-width: 24.9rem;
    padding-left: 0.25rem;
    width: 100%;
`;

const StyledTagsContainer = styled.div<{readOnly : boolean, maxWidth : string, isOverflowing : boolean}>`
    align-items: center;
    display: flex;
    gap: 0.25rem;
    max-width: ${props => props.readOnly ? "100%" : props.maxWidth};

    ${ props => {
        if(!props.isOverflowing){
            return;
        }
        return css`
            position: relative;
            top: 0.25rem;
            min-width: ${props.readOnly ? "100%" : props.maxWidth};
            ${overflowBarX};   
        `;
    }}
`;

const StyledTagSelect = styled.div`
    ${TYPOGRAPHY.p2}
    background: transparent;
    color: ${PALETTE.black};
    height: 100%;
    outline: none;
    overflow: hidden;
    padding: 1.5rem 0 0.3rem 0.25rem;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
`;

type SelectTagsProps =  multiSelectionProps &
                        Pick<I_SelectWrapperProps, "disabled" | "options" > & {
                            id?: string,
                            label: string,
                            showOptions? : boolean,
};

export default function SelectTags({disabled, id, label, options, selectedOptions, addSelectedOption, removeSelectedOptions, showOptions : optionsVisibleOnInit} : SelectTagsProps){
    const selectionKit = multiSelectionFunctions({selectedOptions, addSelectedOption, removeSelectedOptions});
    const monitorFocusKit = useFocusMonitor();
    
    const containerRef = React.useRef(null);
    const optionsListKit = useOptionsList({
        id: id === undefined ? null : id, 
        options, 
        optionsVisibleOnInit: optionsVisibleOnInit ?? false,
        refCurrent: containerRef?.current, 
        selectedOptions, 
        onOptionPick : selectionKit.onOptionPick, 
    });
    
    function handleFocus(){
        optionsListKit.handleFocus();
        monitorFocusKit.handleFocus();
    }

    const optionsListInteractivity = {
        activeId: optionsListKit.activeId,
        optionIdPrefix: optionsListKit.optionIdPrefix,
        onOptionPick: selectionKit.onOptionPick,
        selectedOptions,
    }

    const hasSelection = selectedOptions && selectedOptions.length > 0;
    return  <SelectWrapper  ref={containerRef} 
                            disabled={disabled} 
                            hasSelection={hasSelection ?? false} 
                            inputHasFocus={monitorFocusKit.inputHasFocus} 
                            options={options} 
                            optionsListId={optionsListKit.optionsListId} 
                            optionsListInteractivity={optionsListInteractivity}
                            optionsVisible={optionsListKit.optionsVisible} 
                            clearInput={selectionKit.clearInput}
                            toggleOptionVisibility={optionsListKit.toggleOptionVisibility} 
                            >
                <StyledInputLayout>
                    <SelectedTagsContainer  disabled={disabled ?? false} 
                                            selectedOptions={selectedOptions} 
                                            onOptionDelete={selectionKit.onOptionDelete} 
                    />
                    <StyledTagSelect    id={optionsListKit.inputId}
                                        tabIndex={0}
                                        role={"listbox"}
                                        aria-activedescendant={optionsListKit.activeDescendantId}
                                        aria-expanded={optionsListKit.optionsVisible}
                                        aria-multiselectable={true}
                                        aria-owns={optionsListKit.optionsListId}
                                        
                                        onBlur={() => monitorFocusKit.handleBlur()}
                                        onFocus={() => handleFocus()}
                                        onKeyDown={(e : React.KeyboardEvent<HTMLDivElement>) => optionsListKit.onKeyDown(e)}
                                        onMouseDown={() => optionsListKit.toggleOptionVisibility()}
                    />
                </StyledInputLayout>
                
            {!optionsListKit.optionsVisible && (selectedOptions === null || selectedOptions.length === 0) ?
                <StyledCentreLabel htmlFor={optionsListKit.inputId} disabled={disabled ?? false}>
                    {label}
                </StyledCentreLabel>
                :
                <StyledScreenReaderOnly as="label" htmlFor={optionsListKit.inputId}>
                    {label}
                </StyledScreenReaderOnly>
            }

            </SelectWrapper>
}

type SelectedTagsContainerProps = Pick<SelectTagsProps, "selectedOptions"> & {
    disabled : boolean,
    onOptionDelete : (data : SelectOptionDataType) => void,
}
function SelectedTagsContainer({selectedOptions, disabled, onOptionDelete} : SelectedTagsContainerProps){
    const hasExistingTags = selectedOptions !== undefined && selectedOptions?.length !== 0;
    const {ref, refCurrent} = useUpdatingRef();
    const isOverflowing = useTagOverflowCheck({tags: selectedOptions, containerEle: refCurrent});
    const TAG_CONTAINER_MAX_WIDTH = `calc(100% - 1rem)`;

    return hasExistingTags ?
            <StyledTagsContainer    ref={ref}
                                    isOverflowing={isOverflowing}
                                    maxWidth={TAG_CONTAINER_MAX_WIDTH}
                                    readOnly={false} 
                                    >
            { selectedOptions ? 
                selectedOptions.map((text : SelectOptionDataType, index : number) => {
                    return <Tag key = {index}
                                colour = { TagColor.primary }
                                disabled = {disabled ?? false}
                                showIcon = {true}
                                size = {TagSize.medium}
                                text = {text}
                                handleClick = { !disabled ? () => onOptionDelete(text) : undefined }
                            />
                })
                : null
            }
            </StyledTagsContainer>
        : null;
}