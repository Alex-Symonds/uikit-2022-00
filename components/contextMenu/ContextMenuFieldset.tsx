/*
    Exports:
        > ContextMenuFieldset
            >> A wrapper <fieldset> with a visually-optional <legend>.
        > I_ContextMenuFieldset
            >> So components using the wrapper can extend it
        > StyledContextOption for consistently formatting the options inside
*/

import React from 'react';
import styled from 'styled-components';

import { StyledOptionWithCheck } from '../form/';
import { StyledScreenReaderOnly } from '../visuallyHidden';

const StyledFieldSet = styled.fieldset`
    display: flex;
    flex-direction: column;
`;

const StyledLegend = styled.legend`
    ${ ({theme}) => theme.typography.p3Bold }
    background: ${({theme}) => theme.color.grayM};
    padding: 0.6rem 0.75rem 0.65rem 1rem;
    width: 100%;
`;

export const StyledContextOption = styled(StyledOptionWithCheck)`
    &:focus-within {
        background: ${ ({theme}) => theme.keyboardMode ? theme.color.inputBackgroundHoverLight : "auto" };
    }

    svg{
        right: 0.5rem;
    }
`;

export interface I_ContextMenuFieldset{
    hideLegendVisually? : boolean,      /* Legend kept for screenreaders */
    id : string,                        /* HTML ID for the formset element */
    legend : string,                    /* Legend text describing the purpose of the formset group */
}

interface I_ContextMenuFieldsetWithKids extends I_ContextMenuFieldset{
    children? : React.ReactNode,
}

export default function ContextMenuFieldset({hideLegendVisually, id, legend, children} : I_ContextMenuFieldsetWithKids){
    hideLegendVisually = hideLegendVisually ?? false;

    return  <StyledFieldSet id={id}>
    
                { hideLegendVisually ?
                    <StyledScreenReaderOnly as="legend">
                        {legend}
                    </StyledScreenReaderOnly>
                :
                    <StyledLegend>
                        {legend}
                    </StyledLegend>
                }

                {children}

            </StyledFieldSet>
}


