import React, { useEffect } from 'react';
import styled, {css} from 'styled-components';
import { PALETTE, TYPOGRAPHY } from './Theme';
import Tag, {TagColor, TagSize} from './Tag';
import InputContainer, {StyledLabel} from './InputContainer';
import { visuallyHidden, resetCss } from './utils';

const INPUT_MIN_WIDTH = "3rem";
const TAG_CONTAINER_GAP = "0.25rem";
const TAG_CONTAINER_MAX_WIDTH = `calc(100% - ${INPUT_MIN_WIDTH} - ${TAG_CONTAINER_GAP})`;

const StyledLayout = styled.div`
    box-sizing: border-box;
    display: flex;
    gap: 0.2rem;
    padding: 0.9rem;
    width: 100%;
`;

const StyledTagContainer = styled.div<{hasOverflow : boolean, readOnly : boolean}>`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    gap: ${TAG_CONTAINER_GAP};
    max-width: ${props => props.readOnly ? "100%" : TAG_CONTAINER_MAX_WIDTH};

    ${ props => {
        if(props.hasOverflow){
            return css`
                min-width: ${props.readOnly ? "100%" : TAG_CONTAINER_MAX_WIDTH};
                overflow-x: auto;
                overflow-y: hidden;

                // Firefox doesn't support the webkit prefixed properties, but does support these two
                scrollbar-color: ${PALETTE.blackStrong} ${PALETTE.blackMedium};
                scrollbar-width: thin;

                &::-webkit-scrollbar {
                    height: 0.5rem;
                }
                
                &::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px ${PALETTE.blackMedium};
                    border-radius: 10px;
                    border: 0.125rem solid transparent;
                }
                
                &::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px ${PALETTE.blackStrong};
                    border: 0.125rem solid transparent;
                }
            `;
        } 
    }}
`;



const StyledTagInput = styled.input.attrs({ type: "text" })`
    ${resetCss}
    ${TYPOGRAPHY.p2}

    background: transparent;
    box-sizing: border-box;
    height: 1.75rem;
    min-width: ${INPUT_MIN_WIDTH};
    width: 100%;

    &::placeholder{
        color: ${PALETTE.blackStrong};
    }

    &:disabled{
        background: transparent;
        color: ${PALETTE.blackA24};
    }
`;

const StyledTagLabel = styled(StyledLabel)<{hide : boolean}>`
    ${StyledTagInput}:focus ~ & ,
    ${StyledTagInput}:not(:placeholder-shown) ~ &{
        ${visuallyHidden}
    }

    ${
        props => {
        if(props.hide){
            return visuallyHidden;
        }
    }}
`;



interface I_InputTagsProps{
    description : string,
    disabled : boolean,
    errorMsg? : string,
    label? : string,
    readOnly: boolean,
    tags: string[],
    value: string,
    removeTag?: (tagText : string) => void,
    handleChange?: (value : string) => void
}

export default function InputTags({description, disabled, errorMsg, label, readOnly, tags, value, removeTag, handleChange} : I_InputTagsProps){
    const hasExistingTags = tags !== undefined && tags.length !== 0;

    return  <InputContainer description={description} disabled={disabled} errorMsg={errorMsg} isSuccess={false} readOnly={readOnly}> 
                <StyledLayout>
                    {   
                        hasExistingTags && 
                        <TagContainer disabled={disabled} readOnly={readOnly} tags={tags} removeTag={removeTag} />
                    }
                    {   !readOnly &&
                        <TagInput disabled={disabled} label={label} value={value} handleChange={handleChange} hasExistingTags={hasExistingTags}/>
                    }
                </StyledLayout>
            </InputContainer>
}


function TagContainer({disabled, readOnly, tags, removeTag} : Pick<I_InputTagsProps, "disabled" | "readOnly" | "tags" | "removeTag" >){
    const [overflowingTags, setOverflowingTags] = React.useState(false);
    const tagContainerRef = React.useRef<HTMLDivElement>(null);

    const tagsAreClickable = !readOnly && !disabled && removeTag !== undefined;

    useEffect(() => {
        /*
            Set the overflow-related CSS only when max-width is exceeded, so it doesn't interfere with the 
            "expand width to fit children" behaviour.
        */

        if( tags === undefined 
            || tagContainerRef === null 
            || tagContainerRef.current === null){
            return;
        }

        const width : number = tagContainerRef.current.clientWidth;
        const scrollWidth : number = tagContainerRef.current.scrollWidth;

        if(scrollWidth > width){
            setOverflowingTags(true);
            return;
        }
    
        setOverflowingTags(false);
    }, [tags]);

    return  <StyledTagContainer hasOverflow={overflowingTags} readOnly={readOnly} ref={tagContainerRef}>
                {
                    tags.map((text, index) => {
                    return <Tag key = {index}
                                color = { TagColor.primary }
                                disabled = {disabled}
                                text = {text}
                                showIcon = {!readOnly}
                                size = {TagSize.medium}
                                handleClick = { tagsAreClickable ? () => removeTag(text) : undefined }
                            />
                    })
                }
            </StyledTagContainer>
}


type TagInputProps = Pick<I_InputTagsProps, "disabled" | "label" | "value" | "handleChange"> & { 
    hasExistingTags: boolean 
};

function TagInput({disabled, label, value, handleChange, hasExistingTags} : TagInputProps){

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