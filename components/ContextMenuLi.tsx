import React from 'react';
import styled from 'styled-components';
import {PALETTE, ICON_SIZES, p2} from './Theme';
import CheckIcon from './IconCheck';
import customCursorImg from '../public/cursorHand.svg';

const StyledMenuLi = styled.li`
    ${ p2 }

    background: ${PALETTE.white};
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.75rem 0.5rem 1rem;

    &:hover{
        cursor: url(${customCursorImg}), auto;
        background: ${PALETTE.grayL};
    }
`;
export interface MenuItemProps{
    display: string,
    handleClick : () => void,
    selected? : boolean  
}

export default function MenuLi({ display, selected, handleClick } : MenuItemProps){
    return (
        <StyledMenuLi onClick={ () => handleClick() }>
            {display}
            {selected &&
                <CheckIcon color={PALETTE.black} size={ICON_SIZES.medium}/>
            }
        </StyledMenuLi>
    )
}

