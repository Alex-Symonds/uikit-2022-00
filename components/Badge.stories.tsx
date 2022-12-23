import React from 'react';
import Badge, { BadgeType } from './Badge';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Badge',
    component: Badge,
  } as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

export const Default = Template.bind({});

export const Primary = Template.bind({});
Primary.args = {
    type: BadgeType.primary
}

export const Secondary = Template.bind({});
Secondary.args = {
    type: BadgeType.secondary
}

export const White = Template.bind({});
White.args = {
    type: BadgeType.white
}

export const MyText = Template.bind({});
MyText.args = {
    text: "My Text"
}

export const LongText = Template.bind({});
LongText.args = {
    text: "Text that's too long for a badge, so it'll need to be cut off at some point."
}