import React from 'react';
import styled from 'styled-components';

const StyledH = styled.div<{level : number}>`
    ${
        (props) => {
            const key = `h${props.level}`;
            return props.theme.typography[key as keyof typeof props.theme.typography];
        }
    }
`;

interface I_Heading{
    level?: 1 | 2 | 3 | 4 | 5 | 6,
    children : React.ReactNode,
}

export default function Heading({level, children} : I_Heading){
    level = level ?? 1;
    return  <StyledH as={`h${level}`} level={level}>
                {children}
            </StyledH>
}