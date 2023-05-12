/*
    StyledComponents shared by Input-and-Options-Lists (e.g. Search, Select, SelectTags)

    Exports:
        > StyledInputAndOptionsContainer
            >> Wrapper to add a shared width to the the input box and the options list
            >> Also provides a single DOM element to use for "closeOnOutsideClick" ref purposes

        > StyledInputContainer
            >> The reactangle with rounded corners, a shadow, hover, etc.

        > StyledInputContainerWithOutline extends StyledInputContainer
            >> For adding an "outline"-like effect when options are closed but the input is focussed

        > StyledCloseButton
            >> For the little X to clear the input
            >> Use "grid-area: closeIcon;" to place

*/

import styled, {css} from 'styled-components';

import customCursorImg from '../../../public/cursorHand.svg';

export const StyledInputAndOptionsContainer = styled.div`
    width: 30.125rem;
    max-width: 100%;
    position: relative;
`;

export const StyledInputContainer = styled.div<{disabled : boolean, showOptions : boolean}>`
    background: ${ ({theme}) => theme.color.inputBackground};
    box-shadow: ${props => props.showOptions && !props.disabled ? props.theme.shadow.hoverFile : props.theme.shadow.default};
    border-radius: ${ ({theme}) => theme.borderRadius };
    height: 3.5rem;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    
    ${ props => {
        if(props.disabled){
            return;
        }
        return css`   
            &:hover {
                box-shadow: ${ props.theme.shadow.hover};
            }
        `;
    }}
`;

/*  Explanation of this ::before element
    ----------------------------------------------------------------------------------------------------
    A design exists for "Focus Active" (= options displayed; no outline around container), but 
    there's nothing for "Focus Inactive".
    With no outline around the container, closing the optionsList means there's absolutely no 
    indication of the focussed element, which isn't great for keyboard users.
    So I'm going to make my own design for Focus Inactive: add an outline.

    Notes:
        >   overflow: hidden (purpose = enforce the rounded corners on children) has disabled the normal outline, 
            so make a fake one using a pseudo element.
        >   The <input> can get pretty tiny on SelectTag, so let's maintain the pretence that the entire
            container is an input by applying the focus outline to the entire container.
*/
export const StyledInputContainerWithOutline = styled(StyledInputContainer)<{inputFocused : boolean}>`
    ${ props => {
        if(!props.inputFocused || props.showOptions) {
            return;
        }

        return css`
            &:before{
                border: 0.125rem solid ${({theme}) => theme.color.focusOutline};
                border-radius: ${({theme}) => theme.borderRadius};
                content: '';
                display: block;
                height: 100%;
                left: 0;
                opacity: ${({theme}) => theme.opacity.focusOutline};
                position: absolute;
                top: 0;
                width: 100%;
                z-index: 2;  
            }
        `;
    }}
`;

export const StyledClearButton = styled.button`
    background: transparent;
    grid-area: clearIcon;
    
    svg{ 
        opacity: ${({theme}) => theme.opacity.subtleMainText};
        path{
            fill: ${ ({theme}) => theme.color.mainText };
        }
    }

    &:hover{
        cursor: url(${customCursorImg}), auto;

        svg path{
            fill: ${ ({theme}) => theme.color.mainText };
        }
    }
`;