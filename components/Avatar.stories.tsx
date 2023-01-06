import React from 'react';
import Avatar, { AvatarOptions } from './Avatar';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Avatar',
    component: Avatar,
  } as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = args => <Avatar {...args} />;

export const Default = Template.bind({});

export const Sunglasses = Template.bind({});
Sunglasses.args = {
    emoji: AvatarOptions.sunglasses
}

export const Cat = Template.bind({});
Cat.args = {
    emoji: AvatarOptions.cat
}

export const Ghost = Template.bind({});
Ghost.args = {
    emoji: AvatarOptions.ghost
}

export const Lion = Template.bind({});
Lion.args = {
    emoji: AvatarOptions.lion
}

export const Lightbulb = Template.bind({});
Lightbulb.args = {
    emoji: AvatarOptions.lightbulb
}

export const Football = Template.bind({});
Football.args = {
    emoji: AvatarOptions.football
}

export const Popcorn = Template.bind({});
Popcorn.args = {
    emoji: AvatarOptions.popcorn
}