import React, { useEffect } from 'react';
import styled from 'styled-components';

import { addOpacityToColor } from '../../utils/utils';
import { theme as themeObj } from '../../styles/theme';

import { Icon, ICON_ID, ICON_SIZES } from '../icons/';
import Avatar, { AvatarOptions } from '../Avatar';
import CircleAroundIcon from '../CircleAroundIcon';
import { convertRemToPixels } from '../../utils/utils';
import { StyledScreenReaderOnly } from '../visuallyHidden';

// TODO: get the user to pass in props for file types and sizes, then use for validation and
// constructing this display sentence.
function getDefaultMessage(){
    return "PNG, jpg, gif files up to 10 MB in size are available for download";
} 

const StyledDeleteButton = styled.button`
    ${ ({theme}) => theme.typography.p3 }
    background: transparent;
    color: ${ ({theme}) => theme.color.primary };
    grid-area: message;
    position: relative;
    top: -0.2rem;
    width: fit-content;
`;

// Export for Storybook (so it can display drag mode without having to actually drag in a file)
export const StyledFileUploader = styled.div`
    background: ${ ({theme}) => theme.color.mainBackground };
    border-radius: ${ ({theme}) => theme.borderRadius };
    box-shadow: ${ ({theme}) => theme.shadow.default };
    max-width: 42.1875rem;
    overflow: hidden;
    padding: 0;
    
    &:hover{
        box-shadow: ${ ({theme}) => theme.shadow.hoverFile };
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

const StyledCircleAroundIcon = styled(CircleAroundIcon)`
    background: ${ ({theme}) => theme.color.grayL };
    left: 0.25rem;
    pointer-events: none;
    position: relative;
    top: -0.125rem;

    svg path{
        fill: ${ ({theme}) => theme.color.primary };
    }
`;

const StyledLabelFile = styled.label<{isFocused : boolean}>`
    color: ${ ({theme}) => theme.color.primary };
    padding: 0 0.23rem 0 0;

    ${props => {
        if(props.isFocused){
            return `border-bottom: 2px solid ${ props.theme.color.primary }`;
        }
    }}
`;

const StyledLayout = styled.div`
    display: grid;
    gap: 0.5rem;
    grid-template-areas: "heading icon" "message icon";
    grid-template-columns: min(34.8125rem, 1fr) 4rem;
    grid-template-rows: auto auto;
    padding: 1.25rem 1.35rem 1rem 1.25rem;
`;

const StyledLayoutActiveDrag = styled.div<{dropzoneHeightInPx : number}>`
    align-items: center;
    background: ${ ({theme}) => theme.color.primary };
    display: flex;
    height: ${props => props.dropzoneHeightInPx}px;
    justify-content: center;
    max-height: ${props => props.dropzoneHeightInPx}px;
    min-height: ${props => props.dropzoneHeightInPx}px;
    width: 100%;

    svg{
        pointer-events: none;

        path{
            fill: ${ ({theme}) => theme.color.textOnPrimary };
        }
    }
`;

const StyledDivHeading = styled.div`
    ${ ({theme}) => theme.typography.p2 }
    grid-area: heading;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledPMessage = styled.p<{isError : boolean}>`
    ${ ({theme}) => theme.typography.p3 }
    color: ${props => props.isError ? props.theme.color.error : addOpacityToColor(props.theme.color.mainText, props.theme.opacity.subtleMainText) };
    grid-area: message;
    pointer-events: none;
`;

const StyledProgressBar = styled.div<Pick<I_FileUploaderProps, "progress">>`
    background: ${ ({theme}) => theme.color.primary };
    height: 0.25rem;
    margin: 0.25rem 0 0 0;
    pointer-events: none;
    width: ${props => props.progress}%;
`;

const StyledProgressPerc = styled.div`
    ${ ({theme}) => theme.typography.h5}
    color: ${ ({theme}) => theme.color.primaryPale };
`;

const StyledSpanFileSize = styled.span`
    color: ${ ({theme}) => addOpacityToColor(theme.color.mainText, theme.opacity.subtleMainText) };
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

export default function Files({avatar, errorMsg, fileInfo, progress, handleFiles} 
    : I_FileUploaderProps)
    {

    /*
        The drag-and-drop functionality involves DefaultContent having the "detect drag start" function,
        while DropZone has the "detect drag end" functions.

        If DefaultContent is larger than the DropZone, this creates a "no man's land" where DefaultContent 
        thinks the dragged content is inside (and so activates DropZone) and DropZone thinks the dragged
        content is outside (and so actives DefaultContent). This creates a flickering effect, as the two
        modes both activate one another in an endless loop.

        Solution: when the drag begins, DefaultContent sets its current height in a state, which is 
        then passed to DropZone. They are now always the same height. \o/
    */
    const [displayState, setDisplayState] = React.useState(DisplayState.default);
    const [dropzoneHeightInPx, setDropzoneHeightInPx] = React.useState<number>(0);

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
                return <DropZone setDrag = {setDrag} handleDrop = {onDrop} dropzoneHeightInPx = {dropzoneHeightInPx} />

            case DisplayState.finished:
                return <Finished fileInfo = {fileInfo} />

            case DisplayState.inProgress:
                return <InProgress progress = {progress} />

            default:
                return <DefaultContent errorMsg = {errorMsg} progress = {progress} avatar = {avatar} setDrag = {setDrag} handleFilePicker = {onFilePick} setDropzoneHeightInPx = {setDropzoneHeightInPx}/>
        }
    };

    return  <StyledFileUploader>{ getContent() }</StyledFileUploader>
}


type DefaultContentProps = DragStateUpdater & EnableFilePicker & Pick<I_FileUploaderProps, "avatar" | "errorMsg" | "progress"> & {
    setDropzoneHeightInPx : React.Dispatch<React.SetStateAction<number>>;
};

function DefaultContent({avatar, errorMsg, progress, handleFilePicker, setDrag, setDropzoneHeightInPx} : DefaultContentProps){
    const [fileInputIsFocused, setFileInputIsFocused] = React.useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);

    const isError = errorMsg !== undefined;
    const showPercentage = isError && progress !== undefined;

    const dragBegins = (e : React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(true);
        updateDropzoneHeight();
    };

    const updateDropzoneHeight = () => {
        let refRectHeightInPx = 0;
        if(ref.current){
            const refRect = ref.current.getBoundingClientRect();
            refRectHeightInPx = refRect.bottom - refRect.top;
        }
        else {
            const FALLBACK_DROPZONE_HEIGHT_IN_REM = 5.25;
            refRectHeightInPx = convertRemToPixels(FALLBACK_DROPZONE_HEIGHT_IN_REM);
        }
        setDropzoneHeightInPx(refRectHeightInPx);
    }

    function onInputFocus(){
        setFileInputIsFocused(true);
    }
    function onInputBlur(){
        setFileInputIsFocused(false);
    }

    return(
        <>
            <StyledLayout onDragEnter={ e => dragBegins(e) } ref={ref}>

                <StyledDivHeading>
                    <StyledLabelFile isFocused={fileInputIsFocused} onFocus={ onInputFocus } onBlur={ onInputBlur }>
                        <StyledScreenReaderOnly>
                            <input  type="file" 
                                    multiple 
                                    accept="image/png, image/jpeg, image/gif"
                                    onChange={(e) => handleFilePicker(e)} />
                        </StyledScreenReaderOnly>
                        Select a file
                    </StyledLabelFile>
                    or drag in form
                </StyledDivHeading>
                <StyledPMessage isError = {isError}>
                    { isError ? errorMsg : getDefaultMessage() }
                </StyledPMessage>

                <StyledIconContainer>
                    {
                    showPercentage ?
                        <ProgressPercentage progress={ progress }/>
                        : null
                    }
                    {
                    !showPercentage && avatar !== undefined ?
                        <Avatar emoji={avatar}/>
                        : null
                    }
                </StyledIconContainer>

            </StyledLayout>

            <StyledProgressBar progress={ progress === undefined ? 0 : progress} />
        </>
    )
}


// Export for Storybook (so it can display drag mode without the viewer having to actually drag in a file)
type DropZoneProps = Droppable & DragStateUpdater & {
    dropzoneHeightInPx : number
};

export function DropZone({dropzoneHeightInPx, setDrag, handleDrop} : DropZoneProps){
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

    return  <StyledLayoutActiveDrag     dropzoneHeightInPx={dropzoneHeightInPx}
                                        onDrop={ e => dropped(e) } 
                                        onDragOver={e => enableDropping(e)} 
                                        onDragLeave={e => dragEnds(e)} >
                <Icon id={ICON_ID.file} size={ICON_SIZES.medium} />
            </StyledLayoutActiveDrag>
}


function InProgress({progress} : Pick<I_FileUploaderProps, "progress">){
    const progressDisplay = progress === undefined ? 0 : progress;
    return (
        <>
            <StyledLayout>

                <StyledDivHeading>
                    Downloading
                </StyledDivHeading>
                <StyledPMessage isError = {false}>
                    {getDefaultMessage()}
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

                <StyledDivHeading>
                    { fileInfo !== undefined ? fileInfo.name : "File uploaded successfully" } 
                    { fileInfo !== undefined && fileInfo?.size !== "" ?
                            <StyledSpanFileSize>{fileInfo.size}</StyledSpanFileSize>
                            : null
                    }
                </StyledDivHeading>

                { fileInfo !== undefined ?
                    <StyledDeleteButton onClick = {fileInfo.handleDelete}>
                        Delete file
                    </StyledDeleteButton>
                    : null
                }

                <StyledIconContainer>

                        <StyledCircleAroundIcon size={"3.5rem"}>
                            <Icon id={ICON_ID.file} size={ICON_SIZES.medium} />
                        </StyledCircleAroundIcon>

                </StyledIconContainer>

            </StyledLayout>

            {/* All the other modes using StyledLayout also have a ProgressBar. 
                Include an empty one here to ensure consistent heights. */}
            <StyledProgressBar progress={ 0 } />
        </>
    )
}





