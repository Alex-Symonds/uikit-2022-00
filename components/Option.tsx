/*
    Exports:
        > (default) Option
            >> enableCheck property determines if it uses StyledOption or StyledOptionWithCheck for the wrapper
            >> Returns div with onClick, aria/tabindex etc. plus the label and (optionally) the check.

        > StyledOption
            >> One formatted option in a list
            >> Long displayStr overflow handled with ellipsis
            >> "isHighlighted" for when keyboard users are "hovering" over this item

        > StyledOptionWithCheck extends StyledOption
            >> Adds CSS for positioning a checkmark and adjusts width of the <span> to leave space for it

        > StyledOptionLoading
            >> Displays a grey bar with padding around it

        > StyledOptionNone
            >> Padding and formatting for a single plain-text option (to say "No results" or something)
*/

import React from 'react';
import styled from 'styled-components';
import { PALETTE, TYPOGRAPHY } from '../utils/Theme';

import { Icon, IconMediumId } from './';
import customCursorImg from '../public/cursorHand.svg';

export const StyledOption = styled.div<{isHighlighted : boolean}>`
    ${TYPOGRAPHY.p2}
    align-text: left;
    background: ${props => props.isHighlighted ? PALETTE.grayL : "transparent"};
    color: ${PALETTE.black};
    padding: 0.5rem 0.75rem 0.5rem 1rem;
    
    span{
        display: block;
        max-width: calc(100% - 0.4rem);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &:hover{
        background: ${PALETTE.grayL};
        cursor: url(${customCursorImg}), auto;
    }
`;

export const StyledOptionWithCheck = styled(StyledOption)`
    position: relative;

    span{
        max-width: calc(100% - 1.5rem - 0.4rem);
    }

    svg{
        position: absolute;
        top: calc(50% - (1.5rem / 2));
        right: 12px;

        path{
            fill: ${PALETTE.black};
        }
    }
`;

export const StyledOptionLoading = styled.div`
    padding: 0.5rem 1rem 0.25rem 1rem;
    
    &:before{
        display: block;
        content: '';
        background: ${PALETTE.grayL};
        height: 1.625rem;
        width: 100%;
    }

    &:last-child{
        padding-bottom: 0.5625rem;
    }
`;

export const StyledOptionNone = styled.div`
    ${TYPOGRAPHY.p2}
    color: ${PALETTE.black};
    opacity: 48%;
    padding: 0.5rem 1rem 0.5rem 1rem;
`;


type OptionPropsType = {
    text : string,
    isHighlighted : boolean,
    isSelected : boolean,
    onClick : () => void,
    optionId : string,
    enableCheck? : boolean,
}

export default function Option({enableCheck, isHighlighted, isSelected, optionId, text, onClick} : OptionPropsType){
    enableCheck = enableCheck === undefined ? false : enableCheck;
    const Styled = enableCheck ? StyledOptionWithCheck : StyledOption;
    return  <Styled aria-selected={isSelected}
                    isHighlighted={isHighlighted}
                    id={optionId}
                    role={"option"}
                    tabIndex={-1}
                    onClick={() => onClick()}
                    >

                <span>{text}</span>

            {enableCheck && isSelected && 
                <Icon idMedium={IconMediumId.check} />
            }
            </Styled>
}

