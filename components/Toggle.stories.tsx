import React from 'react';
import Toggle from './Toggle';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Input/Toggle',
    component: Toggle,
    args: {
        onScreenReader: "toggle"
    }
  } as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = args => {
    let [isPressed, setIsPressed] = React.useState(args.isOn ?? false);

    const onClick = () => {
        setIsPressed(prevState => {
            return !prevState
        });
    };

    return <Toggle  {...args}
                    isOn = {isPressed}
                    parentOnClick={onClick} />}
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
const LABEL = {
    heading: "Заголовок",
    description: "Описание в несколько строк",
    onScreenReader : "toggle",
}

export const OffWithLabel = Template.bind({});
OffWithLabel.args = {
    ...Off.args,
    label: LABEL
}

export const OnWithLabel = Template.bind({});
OnWithLabel.args = {
    ...On.args,
    label: LABEL
}