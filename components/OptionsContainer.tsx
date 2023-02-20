import React from 'react';
import styled from 'styled-components';
import { PALETTE, LAYOUT, SHADOW } from '../utils/Theme';
import { StyledScreenReaderOnly } from '../utils/utils';

const StyledOptionsContainer = styled.div`
    align-items: stretch;
    background: ${PALETTE.white};
    border-radius: ${LAYOUT.borderRadius};
    box-shadow: ${SHADOW.contextMenu};
    display: flex;
    flex-direction: column;
    margin: 0.25rem 0 0 0;
    max-width: 100%;
    overflow: hidden;
    padding: 0.5rem 0 0.4375rem 0;
    position: relative;
    width: 30.125rem;  
    z-index: 3;
`;

type OptionsListPropsType = {
    options : string[],
    id: string,
    children: React.ReactNode,
};

export default function OptionsListContainer({id, options, children} : OptionsListPropsType){
    let screenReaderMsg : string = `${options.length} options found. Use up and down arrows to review.`;

    return  <StyledOptionsContainer id={id}>
                <StyledScreenReaderOnly id={"searchAnnouncement"} aria-live="assertive">
                    {screenReaderMsg}
                </StyledScreenReaderOnly>
                {children}
            </StyledOptionsContainer>
}