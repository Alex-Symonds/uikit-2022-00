import React from 'react';

import { Icon, ICON_ID, ICON_SIZES } from '../icons/';
import { StyledScreenReaderOnly } from '../visuallyHidden';
import { CheckboxOptionDataType } from '../form/';

import ContextMenuGroup, { I_ContextMenuFieldset, StyledContextOption } from './ContextMenuFieldset';

interface I_CheckboxProps extends I_ContextMenuFieldset{
    onChange : (id : string, checked : boolean) => void, /* ID to find the element; checked to update based on what the user can see */
    options : CheckboxOptionDataType[], /* Array of options, with individual selection status */
}

export default function ContextCheckboxGroup({hideLegendVisually, id, legend, onChange, options} : I_CheckboxProps){
    const optionPrefix = id + "-opt";
    return  <ContextMenuGroup    hideLegendVisually={hideLegendVisually}
                                    id={id}
                                    legend={legend}
                                    >
                {
                    options.map((opt : CheckboxOptionDataType) => {
                        return <ContextCheckbox key={opt.id}
                                                checked={opt.checked}
                                                displayText={opt.displayText}
                                                htmlId={optionPrefix + opt.id}
                                                id={opt.id}
                                                name={opt.name}
                                                onChange={() => onChange(opt.id, opt.checked)}
                                            />
                    })
                }
            </ContextMenuGroup>
}

type CheckboxOptionType = CheckboxOptionDataType & {
    htmlId : string,
    onChange : () => void,
}
function ContextCheckbox({checked, id, name, displayText, onChange, htmlId} : CheckboxOptionType){
    // isHighlighted is used when custom keyboard operation is applied. This is using native HTML, so no need.

    return  <StyledContextOption as={"label"} isHighlighted={false}>
                {displayText}

                {checked ?
                    <Icon id={ICON_ID.check} size={ICON_SIZES.medium}/>
                    : null
                }
                <StyledScreenReaderOnly as="input"
                                        type="checkbox" 
                                        onChange={() => onChange()} 
                                        checked={checked}
                                        id={htmlId} 
                                        
                                        name={name}
                                        value={id}
                />
            </StyledContextOption>
}

