/*
    Handle ArrowUp and ArrowDown incrementing/decrementing an activeIndex
*/

interface I_MenuMovementProps{
    e : React.KeyboardEvent<any>,
    menuItems : any[] | HTMLCollectionOf<any>,
    activeId : number | null,
    setActiveId : (value : React.SetStateAction<number | null>) => void,
}

export function moveWithinMenu({e, menuItems, activeId, setActiveId} 
    : I_MenuMovementProps)
    : void {

    if(menuItems === null || menuItems === undefined){
        return;
    }

    let newId = activeId;

    if(e.key === 'ArrowUp'){
        if(newId === null || newId <= 0 ){ /* Loop from top to bottom */
            newId = menuItems.length - 1;
        }
        else{
            newId--;
        }
    }
    
    if(e.key === 'ArrowDown'){
        if(newId === null || newId >= menuItems.length - 1 ){ /* Loop from bottom to top */
            newId = 0;
        }
        else{
            newId++;
        }
    }

    setActiveId(newId);
}