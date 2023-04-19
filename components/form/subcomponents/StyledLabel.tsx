import styled from 'styled-components';

import { PALETTE, TYPOGRAPHY } from '../../../utils/Theme';

export const StyledLabel = styled.label<{disabled : boolean}>`
    ${TYPOGRAPHY.p2}
    color: ${ PALETTE.black };
    font-weight: normal;
    height: 1.25rem;
    left: 1rem;
    opacity: ${props => props.disabled ? "24%": "48%"};
    pointer-events: none;
    position: absolute;
    text-align: center;
    top: calc(50% - (1.25rem / 2));
`;