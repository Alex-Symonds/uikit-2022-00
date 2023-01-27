import React from 'react';
import styled from 'styled-components';
import {PALETTE, TYPOGRAPHY} from './Theme';
import customCursorImg from '../public/cursorHand.svg';
import Icon from './Icons';
import { IconMediumId } from './IconsMedium';

const StyledMenuLi = styled.li`
    ${ TYPOGRAPHY.p2 }

    background: ${PALETTE.white};
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.75rem 0.5rem 1rem;

    svg path{
        fill: ${PALETTE.black};
    }

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
                <Icon idMedium={IconMediumId.check} />
            }
        </StyledMenuLi>
    )
}

