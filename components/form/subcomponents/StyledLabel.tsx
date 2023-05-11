import styled from 'styled-components';

export const StyledLabel = styled.label<{disabled : boolean}>`
    ${({theme}) => theme.typography.p2}
    color: ${ ({theme}) => theme.color.mainText };
    font-weight: normal;
    height: 1.25rem;
    left: 1rem;
    opacity: ${ props => props.disabled ? props.theme.opacity.alphaMid : props.theme.opacity.alphaStrong };
    pointer-events: none;
    position: absolute;
    text-align: center;
    top: calc(50% - (1.25rem / 2));
`;