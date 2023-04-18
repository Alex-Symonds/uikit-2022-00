import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AvatarOptions } from '../Avatar';

import Files, { StyledFileUploader, DropZone } from './Files';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Form/Files',
    component: Files,
  } as ComponentMeta<typeof Files>;

const Template: ComponentStory<typeof Files> = args => <Files {...args} />;

const TemplateDrag: ComponentStory<typeof StyledFileUploader> = args => {
    function setDrag(isDragging : boolean){
        console.log(`Is user dragging over the dropzone? ${isDragging}`);
    }

    return (
        <StyledFileUploader>
            <DropZone   {...args}
                        handleDrop = {args.handleDrop}
                        setDrag = {setDrag} />
        </StyledFileUploader>
        );
}

export const Default = Template.bind({});
Default.args = {
    handleFiles: (files) => console.log("Files:", files)
}

export const Hover = Template.bind({});
Hover.args = {
    ...Default.args
}
Hover.parameters = {
    pseudo: {hover: true}
}

export const Drag = TemplateDrag.bind({});
Drag.args = {
    ...Default.args
}

export const Uploading = Template.bind({});
Uploading.args = {
    ...Default.args,
    progress: 66
}

export const Error = Template.bind({});
Error.args = {
    ...Default.args,
    errorMsg: "The file weight more than 10 MB"
}

export const ErrorUploading = Template.bind({});
ErrorUploading.args = {
    ...Default.args,
    progress: 66,
    errorMsg: "An error has occurred, upload the file again"
}

export const Uploaded = Template.bind({});
Uploaded.args = {
    ...Default.args,
    progress: 100,
    fileInfo: {
        name: "video_s_moim_luibimom_kotikom.mp4",
        size: "2 МБ",
        handleDelete: () => console.log("Deleting file...")
    }
}

export const CustomWithAvatar = Template.bind({});
CustomWithAvatar.args = {
    ...Default.args,
    avatar: AvatarOptions.lion
}