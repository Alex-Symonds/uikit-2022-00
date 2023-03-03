import React from 'react';
import styled from 'styled-components';
import { PALETTE, TYPOGRAPHY } from '../utils/Theme';

interface StyledParagraphProps{
    colour?: string,
    bold: boolean,
    pSize: number,
}

const StyledParagraph = styled.p<StyledParagraphProps>`
    ${
        (props) => {
            switch(props.pSize){
                case 1:
                    return props.bold ? TYPOGRAPHY.p1Bold : TYPOGRAPHY.p1;
                case 2:
                    return props.bold ? TYPOGRAPHY.p2Bold : TYPOGRAPHY.p2;
                case 3:
                    return props.bold ? TYPOGRAPHY.p3Bold : TYPOGRAPHY.p3;
                default:
                    return TYPOGRAPHY.p2;
            }
        }
    }

    color: ${ props => props.colour || PALETTE.black };
    width: fit-content;
`;


interface ParagraphProps{
    colour?: string,
    size?: 1 | 2 | 3,
    bold?: boolean,
    className? : string,
    children?: React.ReactNode,
}

export default function Paragraph({colour, size, className, bold, children} : ParagraphProps){
    return  <StyledParagraph    colour = {colour}
                                bold = { bold || false } 
                                pSize = { size || 2 } 
                                className = {className}
                                >
                {children}
            </StyledParagraph>

}





