import React from 'react';

interface I_useCloseOnOutsideClick{
    isOpen: boolean,
    containerEle : HTMLElement | null,
    setIsOpen : (value: React.SetStateAction<boolean>) => void,
}
export default function useCloseOnOutsideClick({isOpen, containerEle, setIsOpen} : I_useCloseOnOutsideClick){
    React.useEffect(() => {
        if(isOpen){
            window.addEventListener('click', clickOutsideToClose);
        }
        else{
            window.removeEventListener('click', clickOutsideToClose);
        }

        return function cleanup(){
            window.removeEventListener('click', clickOutsideToClose);
        }

        function clickOutsideToClose(e : MouseEvent){
            // Prevent the menu from closing prematurely when the user toggles an option
            if(containerEle && e.composedPath().includes(containerEle)){
                return;
            }
            setIsOpen(false);
        }

    }, [isOpen, containerEle, setIsOpen]);
}
