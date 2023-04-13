import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Paragraph } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Paragraph',
    component: Paragraph,
  } as ComponentMeta<typeof Paragraph>;

const Template: ComponentStory<typeof Paragraph> = args => <Paragraph {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: <span>Lorem ipsum dolor and such.</span>
}

export const Size1 = Template.bind({});
Size1.args = {
    size: 1,
    children: <span>20/28 P1 Regular Roboto</span>
}

export const Size1Bold = Template.bind({});
Size1Bold.args = {
    bold: true,
    size: 1,
    children: <span>20/28 P1 Regular Roboto Bold</span>
}

export const Size2 = Template.bind({});
Size2.args = {
    size: 2,
    children: <span>16/24 P2 Regular Roboto</span>
}

export const Size2Bold = Template.bind({});
Size2Bold.args = {
    bold: true,
    size: 2,
    children: <span>16/24 P2 Regular Medium</span>
}

export const Size3 = Template.bind({});
Size3.args = {
    size: 3,
    children: <span>13/20 P3 Regular Roboto</span>
}

export const Size3Bold = Template.bind({});
Size3Bold.args = {
    bold: true,
    size: 3,
    children: <span>13/20 P3 Regular Roboto</span>
}


