import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { cssVariables } from './Theme';

interface ParagraphProps{
    color?: string,
    size?: 1 | 2 | 3,
    bold?: boolean,
    children?: React.ReactNode;
}

const p1Theme = {
    fontSize: "1.5rem",
    lineHeight: "1.75rem",
    boldWeight: "700"
}

const p2Theme = {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    boldWeight: "500"
}

const p3Theme = {
    fontSize: "0.8125rem",
    lineHeight: "1.25rem",
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
    fontWeight: string
}

const StyledParagraph = styled.p.attrs((props : StyledParagraphProps) => ({
    color: props.color || 'var(--colorBlack)',
    fontWeight: props.fontWeight === "default" ? "400" : props.fontWeight
}))`
    ${ cssVariables };
    ${ resetP }
    color: ${ props => props.color  };
    font-family: var(--fontMain);
    font-size: ${ props => props.theme.fontSize };
    font-weight: ${ props => props.fontWeight };
    line-height: ${ props => props.theme.lineHeight };
    width: fit-content;
`;

export default function Paragraph({color, size, bold, children} : ParagraphProps){
    const theme = themePicker(size);
    return <ThemeProvider theme={theme}>
            <StyledParagraph    color = {color}
                                fontWeight = { bold ? theme.boldWeight : "default" } >
                {children}
            </StyledParagraph>
        </ThemeProvider>
}




