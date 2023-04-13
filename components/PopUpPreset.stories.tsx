import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PopUp, PopUpPreset, PopUpPresetMode } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/PopUp/Presets',
    component: PopUpPreset,
    args: {
        heading: "Heading",
        description: "Description"
    }
  } as ComponentMeta<typeof PopUpPreset>;

const Template: ComponentStory<typeof PopUpPreset> = args => {
    return  <PopUp close={() => console.log("Clicked close")}>
                <PopUpPreset {...args} />
            </PopUp>
};

export const Attention = Template.bind({});
Attention.args = {
    mode: PopUpPresetMode.attention,
    heading: "Do you want delete?",
    description: "You can't restore this file",
    buttonPrimary: {
        label: "Delete",
        onClick: () => console.log("Clicked Delete button")
    },
    buttonSecondary: {
        label: "Cancel",
        onClick: () => console.log("Clicked Cancel button")
    }
}

export const Success = Template.bind({});
Success.args = {
    mode: PopUpPresetMode.success,
    heading: "File deleted",
    description: "That's all :)",
    buttonPrimary: {
        label: "Okay, thank you",
        onClick: () => console.log("Clicked the ok button")
    }
}

export const Error = Template.bind({});
Error.args = {
    mode: PopUpPresetMode.error,
    heading: "Error",
    description: "Sorry",
}

