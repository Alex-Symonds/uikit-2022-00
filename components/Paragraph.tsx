import React from 'react';
import styled from 'styled-components';

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
                    return props.bold ? props.theme.typography.p1Bold : props.theme.typography.p1;
                case 2:
                    return props.bold ? props.theme.typography.p2Bold : props.theme.typography.p2;
                case 3:
                    return props.bold ? props.theme.typography.p3Bold : props.theme.typography.p3;
                default:
                    return props.theme.typography.p2;
            }
        }
    }

    color: ${ ({theme}) => theme.color.mainText };
    width: fit-content;
`;


interface ParagraphProps{
    size?: 1 | 2 | 3,
    bold?: boolean,
    className? : string,
    children?: React.ReactNode,
}

export default function Paragraph({size, className, bold, children} : ParagraphProps){
    return  <StyledParagraph    bold = { bold || false } 
                                pSize = { size || 2 } 
                                className = {className}
                                >
                {children}
            </StyledParagraph>

}





