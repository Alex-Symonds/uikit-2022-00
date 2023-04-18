import React from 'react';
import styled, {css} from 'styled-components';

import { PALETTE, TYPOGRAPHY } from '../../utils/Theme';
import useFocusMonitor from '../../utils/UseFocusMonitor';

import useOptionsList from './utils/UseOptionsList';
import { 
        SelectWrapper, I_SelectWrapperProps, SelectOptionDataType, singleSelectionFunctions, singleSelectionProps,
        StyledLabel
        } from './subcomponents';

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
    opacity: 48%;
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


type SelectTextProps =  singleSelectionProps &
                        Pick<I_SelectWrapperProps, "disabled" | "options"> &{
                        id?: string,
                        label: string,
                        placeholder: string,
                        selectedOption: SelectOptionDataType | null,
                        showOptions? : boolean,
}

export default function SelectText({disabled, id, label, options, showOptions : optionsVisibleOnInit, placeholder, selectedOption, setSelectedOption} : SelectTextProps){
    const selectedOptions = selectedOption === null ? [] : [selectedOption];
    const selectionKit = singleSelectionFunctions({selectedOptions, setSelectedOption});
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

    const selectedDisplayStr = useUpdatingDescription({
        optionsVisible: optionsListKit.optionsVisible, 
        selectedOptionText: selectedOption
    });

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

                <StyledSelectedInput    id={optionsListKit.inputId}
                                        tabIndex={0}
                                        role={"combobox"}
                                        aria-activedescendant={optionsListKit.activeDescendantId}
                                        aria-expanded={optionsListKit.optionsVisible}
                                        aria-owns={optionsListKit.optionsListId}

                                        onBlur={() => monitorFocusKit.handleBlur()}
                                        onFocus={() => handleFocus()}
                                        onKeyDown={(e) => optionsListKit.onKeyDown(e)}
                                        onMouseDown={() => optionsListKit.toggleOptionVisibility()}
                                        >
                    {selectedDisplayStr}
                {selectedOption === null && optionsListKit.optionsVisible &&
                    <StyledPlaceholderSpan>{placeholder}</StyledPlaceholderSpan>
                }
                </StyledSelectedInput>

                <StyledFloatingLabel htmlFor={optionsListKit.inputId} disabled={disabled ?? false} floatUp={optionsListKit.optionsVisible || hasSelection}>
                    {label}
                </StyledFloatingLabel>

            </SelectWrapper>
}


type useUpdatingDescriptionProps = {
    optionsVisible : boolean,
    selectedOptionText : string | null,
}
function useUpdatingDescription({optionsVisible, selectedOptionText} : useUpdatingDescriptionProps){
    const [selectedDisplayStr, setSelectedDisplayStr] = React.useState<string | null>(null);

    React.useEffect(() => {
        // Empty and closed = label only
        if(!optionsVisible && selectedOptionText === null){
            setSelectedDisplayStr(null);
        }
        // Empty and open = placeholder-like text. Use this to create the black line at the start,
        // remaining placeholder-like text to be in a separate element
        else if(optionsVisible && selectedOptionText === null){
            setSelectedDisplayStr("|");
        }
        // Filled = whether closed or open, show the selection
        else{
            setSelectedDisplayStr(selectedOptionText);
        }
    }, [selectedOptionText, optionsVisible]);

    return selectedDisplayStr;
}