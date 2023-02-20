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

    function closeOptionsList(){
        setOptionsVisible(false);
    }

    function openOptionsList(){
        setActiveIdOnOpen();
        setOptionsVisible(true);
    }

    function setActiveIdOnOpen(){
        if(selectedOptions && selectedOptions.length > 0){
            const selectedIndex = options.findIndex((ele : SelectOptionDataType) => selectedOptions.includes(ele));
            if(selectedIndex !== -1){
                setActiveId(selectedIndex);
                return;
            }
        }
        return setActiveId(0);
    }

    function handleFocus(){
        openOptionsList();
    }

    function toggleOptionVisibility(){
        if(!optionsVisible){
            setActiveIdOnOpen();
        }

        setOptionsVisible(prevState => {
            return !prevState;
        });
    }

    function onKeyDown(e : React.KeyboardEvent<HTMLDivElement>){
        const props : selectMenuKeydownProps = {
            e,
            optionsVisible,
            closeOptionsList,
            options,
            activeId, 
            setActiveId,
            onOptionPick,
            openOptionsList,
        }
        selectMenuKeyDown(props);
    }

    let inputId = React.useId();
    inputId = id ?? inputId;
    const optionsListId = inputId + "_optionList";
    const optionIdPrefix = optionsListId + "-";

    return {
        activeDescendantId: activeId === null ? undefined : optionIdPrefix + activeId,
        activeId,
        inputId,
        optionIdPrefix,
        optionsListId,
        optionsVisible,
        onKeyDown,
        handleFocus,
        toggleOptionVisibility,
    }
}

type selectMenuKeydownProps = Pick<I_SelectWrapperProps, "options"> & {
    e : React.KeyboardEvent<HTMLDivElement>,
    activeId : number | null,
    optionsVisible : boolean,
    closeOptionsList : () => void,
    onOptionPick: (str : string) => void,
    openOptionsList : () => void,
    setActiveId : (value : React.SetStateAction<number | null>) => void,
}

function selectMenuKeyDown({e, options, optionsVisible, activeId, closeOptionsList, onOptionPick, openOptionsList, setActiveId} : selectMenuKeydownProps){
    if(e.key === 'ArrowDown' || e.key === 'ArrowUp'){
        e.preventDefault(); /* Prevent the cursor from moving to the start or end of the text when navigating the results */
        
        if(!optionsVisible){
            openOptionsList();
            return;
        }

        moveWithinMenu({e, options, activeId, setActiveId});
    }

    if(e.key === 'Enter' || e.key === 'Space'){
        if(activeId !== null && optionsVisible){
            if(options !== null && options !== undefined && options.length > 0){
                onOptionPick(options[activeId]);
            }
        }
    }

    if(e.key === 'Escape'){
        closeOptionsList();
    }
}