import React from 'react';
import styled, {css} from 'styled-components';

import useFocusMonitor from '../../utils/UseFocusMonitor';

import { StyledScreenReaderOnly } from '../visuallyHidden';
import Tag, { TagColor, TagSize, } from '../Tag';

import useTagOverflowCheck, { StyledTagsContainer as StyledTagsContainer_Base} from './utils/UseTagOverflowCheck';
import useOptionsList from './utils/UseOptionsList';

import { 
        SelectWrapper, I_SelectWrapperProps, SelectOptionDataType, getMultiSelectionFunctions, T_MultiSelectionProps,
        StyledLabel 
        } from './subcomponents/';

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

const StyledTagsContainer = styled(StyledTagsContainer_Base)`
    ${ props => {
        if(props.isOverflowing){
            return css`
                position: relative;
                top: 0.25rem;
            `;
        }
    }}
`;

const StyledTagSelect = styled.div`
    ${ ({theme}) => theme.typography.p2 }
    background: transparent;
    color: ${ ({theme}) => theme.color.mainText };
    height: 100%;
    outline: none;
    overflow: hidden;
    padding: 1.5rem 0 0.3rem 0.25rem;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
`;

type SelectTagsProps =  T_MultiSelectionProps &
                        Pick<I_SelectWrapperProps, "disabled" | "options" > & {
                            id?: string,
                            label: string,
                            showOptions? : boolean,
};

export default function SelectTags({disabled, id, label, options, selectedOptions, addSelectedOption, removeSelectedOptions, showOptions : optionsVisibleOnInit} : SelectTagsProps){
    const selectionKit = getMultiSelectionFunctions({selectedOptions, addSelectedOption, removeSelectedOptions});
    const monitorFocusKit = useFocusMonitor();
    
    const containerRef = React.useRef<HTMLDivElement>(null);
    const optionsListKit = useOptionsList({
        id: id === undefined ? null : id, 
        options, 
        optionsVisibleOnInit: optionsVisibleOnInit ?? false,
        ref: containerRef, 
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
                {hasSelection ?
                    <SelectedTagsContainer  disabled={disabled ?? false} 
                                            selectedOptions={selectedOptions} 
                                            onOptionDelete={selectionKit.onOptionDelete} 
                    />
                    : null
                }
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


type SelectedTagsContainerProps = 
    Required<Pick<SelectTagsProps, "disabled" | "selectedOptions">>
    & {
        onOptionDelete : (data : SelectOptionDataType) => void,
};
function SelectedTagsContainer({selectedOptions, disabled, onOptionDelete} : SelectedTagsContainerProps){
    const ref = React.useRef(null);
    const isOverflowing = useTagOverflowCheck({tags: selectedOptions, ref});
    const TAG_CONTAINER_MAX_WIDTH = `calc(100% - 0.75rem)`;

    if(selectedOptions === null){
        return null;
    }

    return  <StyledTagsContainer    ref={ref}
                                    isOverflowing={isOverflowing}
                                    maxWidth={TAG_CONTAINER_MAX_WIDTH}
                                    readOnly={false} 
                                    >
            { 
                selectedOptions.map((text : SelectOptionDataType, index : number) => {
                    return <Tag key = {index}
                                colour = { TagColor.primary }
                                disabled = { disabled }
                                size = {TagSize.medium}
                                text = {text}
                                removeTag = { () => onOptionDelete(text) }
                            />
                })
            }
            </StyledTagsContainer>
}