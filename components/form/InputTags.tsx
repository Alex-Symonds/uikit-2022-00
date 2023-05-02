import React from 'react';
import styled from 'styled-components';

import { TYPOGRAPHY } from '../../utils/Theme';

import { visuallyHidden } from '../visuallyHidden';
import Tag, { TagColor, TagSize } from '../Tag';

import { StyledLabel, InputContainer, I_InputContainerProps } from './subcomponents/';
import useTagOverflowCheck, { StyledTagsContainer } from './utils/UseTagOverflowCheck';

const INPUT_MIN_WIDTH = "3rem";
const TAG_CONTAINER_GAP = "0.25rem";
const TAG_CONTAINER_MAX_WIDTH = `calc(100% - ${INPUT_MIN_WIDTH} - ${TAG_CONTAINER_GAP})`;

const StyledLayout = styled.div`
    display: flex;
    gap: 0.2rem;
    padding: 0.9rem;
    width: 100%;
`;

const StyledTagContainer = styled(StyledTagsContainer)`
    gap: ${TAG_CONTAINER_GAP};
`;

const StyledTagInput = styled.input.attrs({ type: "text" })`
    ${TYPOGRAPHY.p2}

    background: transparent;
    height: 1.75rem;
    min-width: ${INPUT_MIN_WIDTH};
    outline: none;
    width: 100%;

    &::placeholder{
        opacity: 48%;
    }

    &:disabled{
        background: transparent;
        opacity: 24%;
    }
`;

const StyledTagLabel = styled(StyledLabel)<{hide : boolean}>`
    ${StyledTagInput}:focus ~ & ,
    ${StyledTagInput}:not(:placeholder-shown) ~ &{
        ${visuallyHidden}
    }

    ${props => {
        if(props.hide){
            return visuallyHidden;
        }
    }}
`;


type T_InputTagsProps = 
    Omit<I_InputContainerProps, "children">
    & Required<Pick<I_InputContainerProps, "description">>
    & {
        label? : string,
        tags: string[],
        value: string,
        handleChange?: (value : string) => void,
        removeTag?: (tagText : string) => void,
};
export default function InputTags({description, disabled, errorMsg, label, readOnly, tags, value, removeTag, handleChange} 
    : T_InputTagsProps )
    {

    const hasExistingTags = tags !== undefined && tags.length !== 0;

    return  <InputContainer description={description} disabled={disabled} errorMsg={errorMsg} readOnly={readOnly}> 
                <StyledLayout>
                    {   
                    hasExistingTags ? 
                        <TagContainer disabled={disabled} readOnly={readOnly} tags={tags} removeTag={removeTag} />
                        : null
                    }
                    {   
                        <TagInput disabled={disabled} readOnly={readOnly} label={label} value={value} handleChange={handleChange} hasExistingTags={hasExistingTags}/>
                    }
                </StyledLayout>
            </InputContainer>
}


type TagContainerProps = 
    Pick<T_InputTagsProps, "disabled" | "readOnly" | "tags" | "removeTag" > 
    & {
        className? : string,
        maxWidth? : string,
};
function TagContainer({className, disabled, readOnly, tags, removeTag, maxWidth} : TagContainerProps){
    const ref = React.useRef(null);
    const isOverflowing = useTagOverflowCheck({tags, ref});
    const tagsAreClickable = !readOnly && !disabled && removeTag !== undefined;

    return  <StyledTagContainer ref={ref} 
                                className={className} 
                                isOverflowing={isOverflowing}
                                maxWidth={maxWidth ?? TAG_CONTAINER_MAX_WIDTH} 
                                readOnly={readOnly}  
                            >
                {
                    tags.map((text, index) => {
                    return <Tag key = { index }
                                colour = { TagColor.primary }
                                disabled = { disabled }
                                size = { TagSize.medium }
                                text = { text }
                                removeTag = { tagsAreClickable ? () => removeTag(text) : undefined }
                            />
                    })
                }
            </StyledTagContainer>
}


type TagInputProps = 
    Pick<T_InputTagsProps, "disabled" | "label" | "readOnly" | "value" | "handleChange"> 
    & { 
        hasExistingTags: boolean 
};
function TagInput({disabled, label, value, readOnly, handleChange, hasExistingTags} : TagInputProps){
    const labelText = label ?? "Enter tags";

    function handleTagInput(newTag : string){
        if(handleChange === undefined){
            return;
        }
        handleChange(newTag);
    }

    function handleKeyDown(e : React.KeyboardEvent){
        if (e.key === 'Enter') {
            handleTagInput(value + " ");
        }
    }

    function handleInputChange(e : React.ChangeEvent<HTMLInputElement>){
        handleTagInput(e.target.value);
    }

    return <>
        {/* The placeholder on this input helps the label identify when the input is in use, which is relevant for label formatting */}
        <StyledTagInput     disabled={disabled}
                            readOnly={readOnly}
                            placeholder={" "} 
                            type={"text"} 
                            value={value} 
                            name={"tagInput"} 
                            id={"tagInput"} 
                            onKeyDown={handleKeyDown} 
                            onChange={handleChange === undefined ? undefined : (e) => handleInputChange(e)}
                            />
        <StyledTagLabel htmlFor="tagInput" disabled={disabled} hide={ hasExistingTags }>
            {labelText}
        </StyledTagLabel>
    </>
}