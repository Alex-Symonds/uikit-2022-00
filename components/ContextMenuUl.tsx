import React from 'react';
import styled, {css} from 'styled-components';
import {PALETTE, TYPOGRAPHY} from './Theme';
import ContextMenuLi, {MenuItemProps} from './ContextMenuLi';

const resetUl = css`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const StyledMenuUl = styled.ul`
    ${resetUl}
`;

const StyledMenuHeading = styled.h1`
    ${ TYPOGRAPHY.p3 }
    background: ${PALETTE.grayM};
    padding: 0.6rem 0.75rem 0.65rem 1rem;
`;

export interface MenuListProps{
    heading?: string,
    listItems: Array<MenuItemProps>
}

export default function MenuList({ heading, listItems } : MenuListProps ){
    return  <>
                {
                    heading !== undefined && 
                    <StyledMenuHeading>
                        {heading}
                    </StyledMenuHeading>
                }
                {
                    listItems.length > 0 &&
                    <StyledMenuUl>
                        {
                            listItems.map((data, index) => {
                                return <ContextMenuLi   key = {index}
                                                        display = {data.display}
                                                        selected = {data.selected}
                                                        handleClick = {data.handleClick}
                                        />
                            })
                        }
                    </StyledMenuUl>
                }
            </>
}