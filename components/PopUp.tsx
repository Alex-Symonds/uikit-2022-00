import React from 'react';
import styled from 'styled-components';

import { IconMediumId, Button, ButtonStyle } from './';
import { PALETTE, SHADOW } from '../utils/Theme';

const StyledPopUp = styled.section<{height : string}>`
    background: ${PALETTE.white};
    border-radius: 0.5rem;
    box-shadow: ${SHADOW.default};
    left: calc(50% - (30.0625rem / 2));
    padding: 1.8125rem 1rem;
    position: fixed;
    top: calc(50% - (${props => props.height} / 2));
    width: 30.0625rem;
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

    return <StyledPopUp ref={popUpRef} height={popUpRef !== null && popUpRef.current !== null ? popUpRef.current.clientHeight + "px" : "20rem"}>
        
        <StyledCloseButtonContainer>
            <Button circle label={"Close"} style={ButtonStyle.primary} onClick={close} icon = { {idMedium: IconMediumId.close} } />
        </StyledCloseButtonContainer>

        {children}
    </StyledPopUp>
}
