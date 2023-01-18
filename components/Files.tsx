import React, { useEffect } from 'react';
import styled from 'styled-components';
import {LAYOUT, PALETTE, SHADOW, TYPOGRAPHY} from './Theme';
import {resetCss} from './utils';
import CircleAroundIcon from './CircleAroundIcon';
import FileIcon from './IconFile';
import Avatar, {AvatarOptions} from './Avatar';


// TODO: get the user to pass in props for file types and sizes, then use for validation and
// constructing this display sentence.
const DEFAULT_MESSAGE = "PNG, jpg, gif files up to 10 MB in size are available for download";

/*
    If the size of the dragEnter element is > the size of the dragLeave element it creates 
    a zone of contention where a dragged file is considered inside the drop zone by the element 
    that fires dragEnter and outside the drop zone by the element that fires dragLeave.

    Result = while the dragged file is over the contested zone, there will be a cycle 
    of each element deactivating itself and activating the other, which means flickering
    and sometimes getting stuck in the wrong display mode.

    To prevent this issue, this const is used to set "max-height" on the dragEnter element and 
    "height" on the dragLeave element.
    Widths are the same anyway at the tme of writing, so no need to worry about that.
*/
const DROP_ZONE_HEIGHT_TO_PREVENT_FLICKERING_BUG = "5.25rem";


const StyledDeleteButton = styled.button`
    ${resetCss}
    ${TYPOGRAPHY.p3}
    background: transparent;
    color: ${PALETTE.primary};
    grid-area: message;
    position: relative;
    top: -0.2rem;
    width: fit-content;
`;

// Export for Storybook (so it can display drag mode without having to actually drag in a file)
export const StyledFileUploader = styled.div`
    background: ${PALETTE.white};
    border-radius: ${LAYOUT.borderRadius};
    box-shadow: ${SHADOW.default};
    max-width: 42.1875rem;
    overflow: hidden;
    padding: 0;
    
    &:hover{
        box-shadow: ${SHADOW.hoverFile};
    }
`;

const StyledIconContainer = styled.div`
    align-items: center;
    display: flex;
    grid-area: icon;
    height: 100%;
    justify-content: center;
    pointer-events: none;
    width: 100%;
`;

const StyledIconOffsetWrapper = styled.div`
    left: 0.25rem;
    pointer-events: none;
    position: relative;
    top: -0.125rem;
`;

const StyledLabelFile = styled.label`
    color: ${PALETTE.primary};
    padding: 0 0.23rem 0 0;

    input{
        display: none;
    }
`;

const StyledLayout = styled.div`
    box-sizing: border-box;
    display: grid;
    gap: 0.5rem;
    grid-template-areas: "heading icon" "message icon";
    grid-template-columns: 34.8125rem 1fr;
    grid-template-rows: auto auto;
    max-height: ${DROP_ZONE_HEIGHT_TO_PREVENT_FLICKERING_BUG};
    padding: 1.25rem 1.35rem 1rem 1.25rem;
`;

const StyledLayoutActiveDrag = styled.div`
    align-items: center;
    background: ${PALETTE.primary};
    display: flex;
    height: ${DROP_ZONE_HEIGHT_TO_PREVENT_FLICKERING_BUG};
    justify-content: center;
    width: 100%;

    svg{
        pointer-events: none;
    }
`;

const StyledPHeading = styled.p`
    ${resetCss}
    ${TYPOGRAPHY.p2}
    grid-area: heading;
`;

const StyledPMessage = styled.p<{isError : boolean}>`
    ${resetCss}
    ${TYPOGRAPHY.p3}
    color: ${props => props.isError ? PALETTE.red : PALETTE.blackStrong};
    grid-area: message;
    pointer-events: none;
`;

const StyledProgressBar = styled.div<Pick<I_FileUploaderProps, "progress">>`
    background: ${PALETTE.primary};
    height: 0.25rem;
    margin: 0.25rem 0 0 0;
    pointer-events: none;
    width: ${props => props.progress}%;
`;

const StyledProgressPerc = styled.div`
    ${TYPOGRAPHY.h5}
    color: ${PALETTE.disabled};
`;

const StyledSpanFileSize = styled.span`
    color: ${PALETTE.blackStrong};
    padding: 0 0 0 0.5rem;
    pointer-events: none;
`;


type FileInfo = {
    name: string,
    size: string, 
    handleDelete: () => void
}

type Droppable = {
    handleDrop: (e : React.DragEvent) => void
}

type DragStateUpdater = {
    setDrag: (b : boolean) => void
}

type EnableFilePicker = {
    handleFilePicker: (e : React.ChangeEvent<HTMLInputElement>) => void
}

interface I_FileUploaderProps{
    avatar?: AvatarOptions,
    errorMsg?: string,
    fileInfo?: FileInfo,
    handleFiles: (files : FileList) => void,
    progress?: number
}

const enum DisplayState{
    default = "default",
    dragging = "dragging",
    inProgress = "inProgress",
    finished = "finished"
}

export default function Files({avatar, errorMsg, fileInfo, progress, handleFiles} : I_FileUploaderProps){
    // Manage displayState
    const [displayState, setDisplayState] = React.useState(DisplayState.default);

    useEffect(() => {
        if(errorMsg !== undefined){
            setDisplayState(DisplayState.default);
            return;
        }
        
        if(progress === 100){
            setDisplayState(DisplayState.finished);
            return;
        }
        
        if(progress !== undefined && progress >= 0 && progress < 100){
            setDisplayState(DisplayState.inProgress);
            return;
        }

    }, [progress, errorMsg])


    function setDrag(isDragging : boolean) : void{
        const newState = isDragging ? DisplayState.dragging : DisplayState.default;
        setDisplayState(newState);
    }

    // File stuff
    function onDrop(e : React.DragEvent) : void{
        const dataTransfer = e.dataTransfer;
        const files = dataTransfer.files;
        handleFileList(files);
    }

    function onFilePick(e : React.ChangeEvent<HTMLInputElement>) {
        const files = e.currentTarget.files;
        handleFileList(files);
    }

    function handleFileList(files : FileList | null){
        if(files === null){
            return;
        }
        setDisplayState(DisplayState.inProgress);
        handleFiles(files);
    }


    // Use displayState
    function getContent() : React.ReactNode {
        switch (displayState){

            case DisplayState.dragging:
                return <DropZone setDrag = {setDrag} handleDrop = {onDrop} />

            case DisplayState.finished:
                return <Finished fileInfo = {fileInfo} />

            case DisplayState.inProgress:
                return <InProgress progress = {progress} />

            default:
                return <DefaultContent errorMsg = {errorMsg} progress = {progress} avatar = {avatar} setDrag = {setDrag} handleFilePicker = {onFilePick}/>
        }
    };

    return  <StyledFileUploader>{ getContent() }</StyledFileUploader>
}


type DefaultContentProps = DragStateUpdater & EnableFilePicker & Pick<I_FileUploaderProps, "avatar" | "errorMsg" | "progress">;

function DefaultContent({avatar, errorMsg, progress, handleFilePicker, setDrag} : DefaultContentProps){
    const isError = errorMsg !== undefined;
    const showPercentage = isError && progress !== undefined;

    const dragBegins = (e : React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setDrag(true);
    };

    return(
        <>
            <StyledLayout onDragEnter={ e => dragBegins(e) }>

                <StyledPHeading >
                    <StyledLabelFile>
                        Select a file
                        <input  type="file" 
                                multiple 
                                accept="image/png, image/jpeg, image/gif"
                                onChange={(e) => handleFilePicker(e)} />
                    </StyledLabelFile>
                    or drag in form
                </StyledPHeading>
                <StyledPMessage isError = {isError}>
                    { isError ? errorMsg : DEFAULT_MESSAGE }
                </StyledPMessage>

                <StyledIconContainer>
                    {
                        showPercentage &&
                        <ProgressPercentage progress={ progress }/>
                    }
                    {
                        !showPercentage && avatar !== undefined &&
                        <Avatar emoji={avatar}/>
                    }
                </StyledIconContainer>

            </StyledLayout>

            <StyledProgressBar progress={ progress === undefined ? 0 : progress} />
        </>
    )
}


// Export for Storybook (so it can display drag mode without the viewer having to actually drag in a file)
type DropZoneProps = Droppable & DragStateUpdater;

export function DropZone({setDrag, handleDrop} : DropZoneProps){
    // No onDragEnter because this component is only displayed when the user has already begun dragging
    // over the default component.

    const enableDropping = (e : React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const dragEnds = (e : React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(false);
    };

    const dropped = (e : React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleDrop(e);
    }

    return  <StyledLayoutActiveDrag   onDrop={ dropped } 
                                onDragOver={e => enableDropping(e)} 
                                onDragLeave={e => dragEnds(e)} >
                <FileIcon color={PALETTE.white} />
            </StyledLayoutActiveDrag>
}


function InProgress({progress} : Pick<I_FileUploaderProps, "progress">){
    const progressDisplay = progress === undefined ? 0 : progress;
    return (
        <>
            <StyledLayout>

                <StyledPHeading>
                    Downloading
                </StyledPHeading>
                <StyledPMessage isError = {false}>
                    {DEFAULT_MESSAGE}
                </StyledPMessage>

                <StyledIconContainer>
                    <ProgressPercentage progress={ progressDisplay }/>
                </StyledIconContainer>

            </StyledLayout>

            <StyledProgressBar progress={ progressDisplay } />
        </>
    )
}

function ProgressPercentage({progress} : Pick<I_FileUploaderProps, "progress">){
    return  <StyledProgressPerc>
                <span>{progress + "%"}</span>
            </StyledProgressPerc>
}

function Finished({fileInfo} : Pick<I_FileUploaderProps, "fileInfo">){
    return(
        <>
            <StyledLayout>

                <StyledPHeading>
                    { fileInfo !== undefined ? fileInfo.name : "File uploaded successfully" } 
                    { fileInfo !== undefined && fileInfo?.size !== "" &&
                            <StyledSpanFileSize>{fileInfo.size}</StyledSpanFileSize>
                    }
                </StyledPHeading>

                { fileInfo !== undefined &&
                    <StyledDeleteButton onClick = {fileInfo.handleDelete}>
                        Delete file
                    </StyledDeleteButton>
                }

                <StyledIconContainer>
                    <StyledIconOffsetWrapper>
                        <CircleAroundIcon color={PALETTE.grayL} size={"3.5rem"}>
                            <FileIcon color={PALETTE.primary}/>
                        </CircleAroundIcon>
                    </StyledIconOffsetWrapper>
                </StyledIconContainer>

            </StyledLayout>

            {/* All the other modes using StyledLayout also have a ProgressBar. 
                Include an empty one here to ensure consistent heights. */}
            <StyledProgressBar progress={ 0 } />
        </>
    )
}





