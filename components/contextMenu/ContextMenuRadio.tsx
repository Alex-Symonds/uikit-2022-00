import React from 'react';

import { Icon, ICON_ID, ICON_SIZES } from '../icons/';
import { StyledScreenReaderOnly } from '../visuallyHidden';

import ContextMenuGroup, { I_ContextMenuFieldset, StyledContextOption } from './ContextMenuFieldset';
import { RadioOptionDataType } from '../form/';

interface I_RadioProps extends I_ContextMenuFieldset{
    name : string,                                          /* Used for "name" (typing together these radio options) */
    onChange : (id : string, checked : boolean) => void,    /* ID to find the element; checked to update based on what the user can see */
    options : RadioOptionDataType[],                        /* Array of options, with individual selection status */
}

export default function ContextRadioGroup({hideLegendVisually, id, legend, name, onChange, options} : I_RadioProps){
    const optionPrefix = id + "-opt";
    return  <ContextMenuGroup    hideLegendVisually={hideLegendVisually}
                                    id={id}
                                    legend={legend}
                                    >
                {
                    options.map((opt : RadioOptionDataType) => {
                        return <ContextRadio    key={opt.id}
                                                checked={opt.checked}
                                                displayText={opt.displayText}
                                                htmlId={optionPrefix + opt.id}
                                                id={opt.id}
                                                name={name}
                                                onChange={() => onChange(opt.id, opt.checked)}
                                            />
                    })
                }
            </ContextMenuGroup>
}


type RadioOptionType = RadioOptionDataType & Pick<I_RadioProps, "name"> & {
    htmlId : string,
    onChange : () => void,
}

function ContextRadio({checked, id, displayText, onChange, name : groupName, htmlId}: RadioOptionType){
    return  <StyledContextOption as={"label"} isHighlighted={false}>
                {displayText}
                {checked ?
                    <Icon id={ICON_ID.check} size={ICON_SIZES.medium} />
                    : null
                }
                <StyledScreenReaderOnly     as="input"
                                            type="radio"
                                            onChange={() => onChange()} 
                                            checked={checked} 
                                            id={htmlId}

                                            name={groupName} 
                                            value={id}
                />
            </StyledContextOption>
}