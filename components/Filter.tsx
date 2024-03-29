import React from 'react';
import styled, {css} from 'styled-components';

const StyledFilter = styled.div<{numOptions : number}>`
    display: inline-grid;
    grid-template-columns: repeat(${props => props.numOptions}, 1fr);
`;

const StyledFilterOption = styled.div<{isSelected : boolean}>`
    ${ ({theme}) => theme.typography.p2}
    background: ${ ({theme}) => theme.color.mainBackground };
    border-color: ${ props => props.isSelected ? props.theme.color.primary : props.theme.color.grayS };
    border-style: solid;
    border-width: 0.125rem;
    display: flex;
    grid-row: 1;
    justify-content: center;
    margin-left: -0.125rem;
    padding: 0.875rem 1.375rem;

    ${
        props => {
            if(props.isSelected){
                return css`
                    position: relative;
                    z-index: 2;
                `;
            }
        }
    }

    &:first-child{
        border-top-left-radius: ${ ({theme}) => theme.borderRadius };
        border-bottom-left-radius: ${ ({theme}) => theme.borderRadius };
    }

    &:hover{
        border-color: ${props => props.isSelected ? props.theme.color.primaryHover : props.theme.color.grayK };
        position: relative;
        z-index: 2;
    }

    &:last-child{
        border-top-right-radius: ${ ({theme}) => theme.borderRadius };
        border-bottom-right-radius: ${ ({theme}) => theme.borderRadius };
    }
`;


interface I_FilterProps{
    options: FilterOptionType[],
    handleClick: (str : string) => void
}

type FilterOptionType = {
    id: string,
    isSelected: boolean,
    label: string
}

export default function Filter({options, handleClick} : I_FilterProps){
    return  <StyledFilter numOptions={options.length} >
                {
                    options.map((data) => {
                        return <FilterOption    key={data.id} 
                                                id={data.id} 
                                                isSelected={data.isSelected} 
                                                label={data.label} 
                                                handleClick={handleClick}/>
                    })
                }
            </StyledFilter>
}

type FilterOptionProps = FilterOptionType & Pick<I_FilterProps, "handleClick">;

function FilterOption({id, isSelected, label, handleClick} : FilterOptionProps){
    return <StyledFilterOption isSelected={isSelected} onClick={() => handleClick(id)}>
        {label}
    </StyledFilterOption>
}
