import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tag, { TagSize, TagColor } from './Tag';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Tag',
    component: Tag,
    args: {
        text: "Tag",
        removeTag: (e : React.MouseEvent<HTMLButtonElement>) => { console.log("clicked!") }
    }
  } as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = args => <Tag {...args} />;

export const SmallWhite = Template.bind({});
SmallWhite.args = {
    colour: TagColor.white,
    size: TagSize.small
}

export const SmallWhiteHover = Template.bind({});
SmallWhiteHover.args = {
    ...SmallWhite.args
}
SmallWhiteHover.parameters = {
    pseudo: {hover: true}
}

export const SmallPrimary = Template.bind({});
SmallPrimary.args = {
    colour: TagColor.primary,
    size: TagSize.small
}

export const SmallPrimaryHover = Template.bind({});
SmallPrimaryHover.args = {
    ...SmallPrimary.args
}
SmallPrimaryHover.parameters = {
    pseudo: {hover: true}
}

export const MediumWhite = Template.bind({});
MediumWhite.args = {
    colour: TagColor.white,
    size: TagSize.medium
}

export const MediumWhiteHover = Template.bind({});
MediumWhiteHover.args = {
    ...MediumWhite.args
}
MediumWhiteHover.parameters = {
    pseudo: {hover: true}
}

export const MediumPrimary = Template.bind({});
MediumPrimary.args = {
    size: TagSize.medium,
    colour: TagColor.primary
}

export const MediumPrimaryHover = Template.bind({});
MediumPrimaryHover.args = {
    ...MediumPrimary.args
}
MediumPrimaryHover.parameters = {
    pseudo: {hover: true}
}
