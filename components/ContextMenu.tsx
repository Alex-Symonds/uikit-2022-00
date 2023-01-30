import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {SHADOW, PALETTE, LAYOUT} from './Theme';


interface Coords{
    x: number,
    y: number
}
const StyledContextMenu = styled.div<Coords>`
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
    const [isVisible, setIsVisible] = useState(false);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);

    const contextMenuRef = React.useRef(null);

    useEffect(() => {
        if(parentRef === null){
            return;
        }
        let parent = parentRef.current;
        if(!parent){
            return;
        }

        const showMenu = (e : MouseEvent) => {
            e.preventDefault();
            setIsVisible(true);
            setPosX(e.clientX);
            setPosY(e.clientY);
        }

        const closeMenu = (e : MouseEvent) => {
            // Prevent the menu from closing prematurely when the user toggles an option
            if(contextMenuRef.current !== null && e.composedPath().includes(contextMenuRef.current)){
                return;
            }
            setIsVisible(false);
        }

        parent.addEventListener('contextmenu', showMenu);
        window.addEventListener('click', closeMenu);

        return function cleanup(){
            parent?.removeEventListener('contextmenu', showMenu);
            window.removeEventListener('click', closeMenu);
        }

    });

    return isVisible ?  <StyledContextMenu x={posX} y={posY} ref={contextMenuRef}>
                            {children}
                        </StyledContextMenu>
                    : null;
}