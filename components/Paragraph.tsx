import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { PALETTE, TYPOGRAPHY } from './Theme';

interface ParagraphProps{
    color?: string,
    size?: 1 | 2 | 3,
    bold?: boolean,
    children?: React.ReactNode;
}

const p1Theme = {
    boldWeight: "700"
}

const p2Theme = {
    boldWeight: "500"
}

const p3Theme = {
    boldWeight: "700"
}

const themePicker = (size : number | undefined) : any => {
    switch(size){
        case 1:
            return p1Theme;
        case 2:
            return p2Theme;
        case 3:
            return p3Theme;
        default:
            return p2Theme;
    }
}

const resetP = css`
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
`;

interface StyledParagraphProps{
    color?: string,
    bold: boolean,
    pSize: number
}

const StyledParagraph = styled.p`
    ${ resetP }

    ${
        (props : StyledParagraphProps) => {
            switch(props.pSize){
                case 1:
                    return TYPOGRAPHY.p1;
                case 3:
                    return TYPOGRAPHY.p3;
                default:
                    return TYPOGRAPHY.p2;
            }
        }
    }

    color: ${ props => props.color || PALETTE.black };
    font-weight: ${ (props : any) => props.bold ? props.theme.fontWeight : "400" };
    width: fit-content;
`;


export default function Paragraph({color, size, bold, children} : ParagraphProps){
    const theme = themePicker(size);
    return <ThemeProvider theme={theme}>
            <StyledParagraph    color = {color}
                                bold = { bold || false } 
                                pSize = { size || 2 }>
                {children}
            </StyledParagraph>
        </ThemeProvider>
}





