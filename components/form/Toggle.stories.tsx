import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Toggle, ToggleWithHeadingAndDesc} from './Toggle';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Form/Toggle',
    component: Toggle,
  } as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = args => {
    let [isPressed, setIsPressed] = React.useState<boolean>(args.isOn ?? false);

    const onClick = () => {
        setIsPressed(prevState => {
            return !prevState
        });
    };

    return <Toggle  {...args}
                    isOn = {isPressed}
                    parentOnChange={onClick} />}
;

export const Off = Template.bind({});

export const OffHover = Template.bind({});
OffHover.parameters = {
    pseudo: {hover: true}
}

export const OffDisabled = Template.bind({});
OffDisabled.args = {
    disabled: true
}

export const OffFocus = Template.bind({});
OffFocus.parameters = {
    pseudo: {focus: true}
}

export const On = Template.bind({});
On.args = {
    isOn: true
}

export const OnHover = Template.bind({});
OnHover.args = {
    ...On.args
}
OnHover.parameters = {
    pseudo: {hover: true}
}

export const OnDisabled = Template.bind({});
OnDisabled.args = {
    ...On.args,
    disabled: true
}

export const OnFocus = Template.bind({});
OnFocus.args = {
    ...On.args
}
OnFocus.parameters = {
    pseudo: {focus: true}
}

// ----------------------------------
const TemplateWithHeadingAndDesc: ComponentStory<typeof ToggleWithHeadingAndDesc> = args => {
    let [isPressed, setIsPressed] = React.useState<boolean>(args.isOn ?? false);

    const onClick = () => {
        setIsPressed(prevState => {
            return !prevState
        });
    };

    return <ToggleWithHeadingAndDesc    {...args}
                                        isOn = {isPressed}
                                        parentOnChange={onClick} />}
;

const LABEL = {
    heading: "Заголовок",
    description: "Описание в несколько строк",
}

export const OffWithLabel = TemplateWithHeadingAndDesc.bind({});
OffWithLabel.args = {
    ...Off.args,
    ...LABEL,
}

export const OnWithLabel = TemplateWithHeadingAndDesc.bind({});
OnWithLabel.args = {
    ...On.args,
    ...LABEL,
}