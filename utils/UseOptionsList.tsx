import React from 'react';
import { useCloseOnOutsideClick, moveWithinMenu } from './utils';
import { SelectOptionDataType, I_SelectWrapperProps } from '../components/SelectWrapper';

interface I_useOptionsList{
    onOptionPick : (option: SelectOptionDataType) => void, 
    refCurrent : HTMLElement | null, 
    id : string | null, 
    options: SelectOptionDataType[],  
    selectedOptions : SelectOptionDataType[] | null, 
    optionsVisibleOnInit : boolean,
}

export default function useOptionsList({onOptionPick, refCurrent, id, options, selectedOptions, optionsVisibleOnInit} : I_useOptionsList){
    const [optionsVisible, setOptionsVisible] = React.useState<boolean>(optionsVisibleOnInit ?? false);
    const [activeId, setActiveId] = React.useState<number | null>(null);

    useCloseOnOutsideClick({
        isOpen : optionsVisible, 
        containerEle : refCurrent,
        setIsOpen : setOptionsVisible
    });

    // If any options are selected before the listbox receives focus, focus is set on the first selected option.
    React.useEffect(() => {
        if(!selectedOptions){
            return;
        }

        const index = options.findIndex((ele : SelectOptionDataType) => selectedOptions.includes(ele));
        if(index === -1){
            return;
        }

        setActiveId(index);
    }, [selectedOptions, options])

    function handleFocus(){
        setOptionsVisible(true);
        if(activeId === null && selectedOptions && selectedOptions.length > 1){
            setActiveId(0);
        }
    }

    function toggleOptionVisibility(){
        // If it's about to toggle open and none of the variables have any better ideas, highlight the first option for keyboard users
        if(!optionsVisible && activeId === null && !selectedOptions){
            setActiveId(0);
        }

        setOptionsVisible(prevState => {
            return !prevState;
        });
    }

    function onKeyDown(e : React.KeyboardEvent<HTMLDivElement>){
        const props : selectMenuKeydownProps = {
            e,
            optionsVisible,
            setOptionsVisible,
            options,
            activeId, 
            setActiveId,
            onOptionPick,
        }
        selectMenuKeyDown(props);
    }

    let inputId = React.useId();
    inputId = id ?? inputId;
    const optionsListId = inputId + "_optionList";
    const optionIdPrefix = optionsListId + "-";

    return {
        inputId,
        optionsListId,
        optionIdPrefix,
        activeDescendantId: activeId === null ? undefined : optionIdPrefix + activeId,
        activeId,
        optionsVisible,
        onKeyDown,
        handleFocus,
        toggleOptionVisibility,
    }
}

type selectMenuKeydownProps = Pick<I_SelectWrapperProps, "options"> & {
    e : React.KeyboardEvent<HTMLDivElement>,
    optionsVisible : boolean,
    setOptionsVisible : (value : React.SetStateAction<boolean>) => void,
    activeId : number | null,
    setActiveId : (value : React.SetStateAction<number | null>) => void,
    onOptionPick: (str : string) => void,
}

function selectMenuKeyDown({e, options, optionsVisible, setOptionsVisible, activeId, setActiveId, onOptionPick} : selectMenuKeydownProps){
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