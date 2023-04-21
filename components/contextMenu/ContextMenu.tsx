import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import {SHADOW, PALETTE, LAYOUT} from '../../utils/Theme';
import useCloseOnOutsideClick from '../../utils/UseCloseOnOutsideClick';

// Exported for use in ContextMenu-related Stories so those stories can display the appearance
// of the context menu without messing about with the right-clicking behaviour
export const StyledContextMenu = styled.div<{x : number, y: number}>`
    background: ${PALETTE.white};
    border-radius: ${LAYOUT.borderRadius};
    box-shadow: ${ SHADOW.contextMenu };
    left: ${props => props.x}px;
    overflow: hidden;
    padding: 0.25rem 0 0.35rem;
    position: fixed;
    top: ${props => props.y}px;
    width: 15.25rem;
`;

interface ContextMenuProps{
    parentRef: React.RefObject<HTMLElement>,
    children?: React.ReactNode
}

export default function ContextMenu({ parentRef, children } : ContextMenuProps){
    const contextMenuRef = React.useRef(null);
    const {isVisible, posX, posY} = useContextMenu({parentRef, contextMenuRef});

    return isVisible ?  <StyledContextMenu x={posX} y={posY} ref={contextMenuRef}>
                            {children}
                        </StyledContextMenu>
                    : null;
}

function useContextMenu({parentRef, contextMenuRef} : any){
    const [isVisible, setIsVisible] = useState(false);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);

    useCloseOnOutsideClick({
        isOpen : isVisible,
        ref : contextMenuRef,
        setIsOpen : setIsVisible
    });

    useEffect(() => {
        if(!parentRef || !parentRef.current){
            return;
        }

        let parent = parentRef.current;

        const showMenu = (e : MouseEvent) => {
            e.preventDefault();
            setIsVisible(true);
            setPosX(e.clientX);
            setPosY(e.clientY);
        }

        parent.addEventListener('contextmenu', showMenu);

        return function cleanup(){
            parent?.removeEventListener('contextmenu', showMenu);
        }

    });

    React.useLayoutEffect(() => {
        if(!contextMenuRef || !contextMenuRef.current){
            return;
        }
        let pos = contextMenuRef.current.getBoundingClientRect();

        if(pos.left < 0){
            setPosX(0);
        }
        else if(pos.left > 0 && pos.right > window.innerWidth){
            setPosX(window.innerWidth - (pos.right - pos.left));
        }

        if(pos.top < 0){
            setPosY(0);
        }
        else if(pos.top > 0 && pos.bottom > window.innerHeight){
            setPosY(window.innerHeight - (pos.bottom - pos.top));
        }
    });

    return {
        isVisible,
        posX,
        posY
    }
}
