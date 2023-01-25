import React from 'react';
import Input from './InputText';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Input/Text',
    component: Input,
    args: {
        label: "Your name",
        id: "id_name",
        name: "name"
    }
  } as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => {
    const [name, setName] = React.useState(args.value);

    function handleChange(e : React.ChangeEvent<HTMLInputElement>){
        setName(e.target.value);
    }

    return <Input   {...args}
                    value = {name}
                    handleChange = {handleChange} />
}

export const Default = Template.bind({});

export const HoverEmpty = Template.bind({});
HoverEmpty.parameters = {
    pseudo: {hover: true}
}

export const DefaultFilled = Template.bind({});
DefaultFilled.args = {
    value: "Michael Browk"
}

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true
}

export const DisabledFilled = Template.bind({});
DisabledFilled.args = {
    disabled: true,
    value: "Michael Browk"
}

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    readOnly: true,
    value: "Michael Browk"
}

export const ActiveEmpty = Template.bind({});
ActiveEmpty.parameters = {
    pseudo: {active: true, focus: true}
}

export const ActivePlaceholder = Template.bind({});
ActivePlaceholder.args = {
    placeholder: "Example, Michael"
}
ActivePlaceholder.parameters = {
    pseudo: {active: true, focus: true}
}

export const ActiveFilled = Template.bind({});
ActiveFilled.args = {
    value: "Michael Browk"
}
ActiveFilled.parameters = {
    pseudo: {active: true, focus: true}
}

export const ErrorEmpty = Template.bind({});
ErrorEmpty.args = {
    errorMsg: "Текст ошибки"
}

export const ErrorFilled = Template.bind({});
ErrorFilled.args = {
    errorMsg: "Текст ошибки",
    value: "Michael Browk"
}

export const ErrorActiveEmpty = Template.bind({});
ErrorActiveEmpty.args = {
    errorMsg: "Текст ошибки"
}
ErrorActiveEmpty.parameters = {
    pseudo: {active: true, focus: true}
}

export const Success = Template.bind({});
Success.args = {
    isSuccess: true,
    value: "Michael Browk"
}

export const Description = Template.bind({});
Description.args = {
    description: "Введите свое имя"
}
