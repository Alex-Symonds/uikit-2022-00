import React from 'react';
import Notification, {NotificationType} from './Notification';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';



// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Notification',
    component: Notification,
    parameters: {
        viewport: {
          viewports: INITIAL_VIEWPORTS,
        },
      },
  } as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = args => <Notification {...args} />;

export const Default = Template.bind({});
Default.args = {
    type: NotificationType.success,
    heading: "Head",
    description: "Description",
    buttonActions: {
        clickClose: () => console.log("Close has been clicked"),
        clickHelp: () => console.log("User has requested help")
    }
}

export const SuccessHeadingAndDesc = Template.bind({});
SuccessHeadingAndDesc.args = {
    ...Default.args,
    buttonActions: undefined
}

export const SuccessDescOnly= Template.bind({});
SuccessDescOnly.args = {
    ...Default.args,
    buttonActions: undefined,
    heading: undefined
}

export const Error = Template.bind({});
Error.args = {
    ...Default.args,
    type: NotificationType.error
}

export const ErrorHeadingAndButtons = Template.bind({});
ErrorHeadingAndButtons.args = {
    ...Error.args,
    description: undefined
}

export const Information = Template.bind({});
Information.args = {
    ...Default.args,
    type: NotificationType.info
}

export const Mobile = Template.bind({});
Mobile.args = {
    ...SuccessDescOnly.args,
    description: "We sent the password on your email"
}
Mobile.parameters = {
    viewport: {
      defaultViewport: 'iphone5',
    },
};