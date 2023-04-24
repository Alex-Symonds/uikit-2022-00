import React from 'react';
import styled from 'styled-components';

import { PALETTE, SHADOW } from '../utils/Theme';

import { IconMediumId } from './icons/';

import Button, { ButtonStyle } from './Button';


const StyledPopUp = styled.section.attrs(() => ({
    defaultWidth: "30.0625rem",
    marginSpace: "0.25rem",
}))<{height : string}>`

    background: ${PALETTE.white};
    border-radius: 0.5rem;
    box-shadow: ${SHADOW.default};
    left: ${props => props.marginSpace};
    max-width: calc(100% - 2 * ${props => props.marginSpace});
    padding: 1.8125rem 1rem;
    position: fixed;
    top: calc(50% - (${props => props.height} / 2));
    width: ${props => props.defaultWidth};

    @media screen and (min-width: ${props => props.defaultWidth}){
        left: calc(50% - (${props => props.defaultWidth} / 2));
    }
`;

const StyledCloseButtonContainer = styled.div`
    position: absolute;
    right: 0.75rem;
    top: 0.75rem;
    
    svg path{
        fill: ${PALETTE.white};
    }
`;

interface I_PopUpProps{
    children: React.ReactNode,
    close : () => void,
}

export default function PopUp({close, children} : I_PopUpProps){
    const popUpRef = React.useRef<HTMLDivElement>(null);
    const [height, setHeight] = React.useState<string>("20rem");

    React.useLayoutEffect(() => {
        if(popUpRef !== null && popUpRef.current !== null){
            setHeight(`${popUpRef.current.clientHeight}px`);
        }
    }, [popUpRef]);

    return <StyledPopUp ref={popUpRef} height={height}>
        
        <StyledCloseButtonContainer>
            <Button circle label={"Close"} style={ButtonStyle.primary} onClick={close} icon = { {idMedium: IconMediumId.close} } />
        </StyledCloseButtonContainer>

        {children}
    </StyledPopUp>
}
