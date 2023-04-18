import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Heading from './Heading';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Heading',
    component: Heading,
  } as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = args => <Heading {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Heading"
}

export const H1 = Template.bind({});
H1.args = {
  level: 1,
  children: "56/64 Black Heading 1"
}

export const H2 = Template.bind({});
H2.args = {
  level: 2,
  children: "48/56 H2 Bold Montserrat"
}

export const H3 = Template.bind({});
H3.args = {
  level: 3,
  children: "40/48 H3 Bold Montserrat"
}

export const H4 = Template.bind({});
H4.args = {
  level: 4,
  children: "32/40 H4 Bold Montserrat"
}

export const H5 = Template.bind({});
H5.args = {
  level: 5,
  children: "24/32 H5 Bold Montserrat"
}

export const H6 = Template.bind({});
H6.args = {
  level: 6,
  children: "20/28 H6 Bold Montserrat"
}



