import React from 'react';
import styled from 'styled-components';

import { TYPOGRAPHY } from '../utils/Theme';

const StyledH = styled.div<{level : number}>`
    ${
        (props) => {
            switch(props.level){
                case 1:
                    return TYPOGRAPHY.h1;
                case 2:
                    return TYPOGRAPHY.h2;
                case 3:
                    return TYPOGRAPHY.h3;
                case 4:
                    return TYPOGRAPHY.h4;
                case 5:
                    return TYPOGRAPHY.h5;
                case 6:
                    return TYPOGRAPHY.h6;
                default:
                    return TYPOGRAPHY.h2;
            }
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