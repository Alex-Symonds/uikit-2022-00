import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Radio from './Radio';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Form/Radio',
    component: Radio,
    args: {
        label: "Text",
        onClick: () => console.log("Clicked!"),
    }
  } as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = args => <Radio {...args} />;

const ControlledTemplate: ComponentStory<typeof Radio> = args => {
    const [checked, setChecked] = React.useState(false);

    function onClick(isChecked : boolean){
        setChecked(isChecked);
    }

    return <Radio   {...args}
                    onClick={onClick}
                    checked={checked}/>
}

export const Default = ControlledTemplate.bind({});

export const Unselected = Template.bind({});

export const UnselectedHover = Template.bind({});
UnselectedHover.parameters = {
    pseudo: {hover : true}
}

export const Selected = Template.bind({});
Selected.args = {
    checked: true,
}

export const SelectedHover = Template.bind({});
SelectedHover.args = {
    ...Selected.args
}
SelectedHover.parameters = {
    pseudo: {hover : true}
}

export const SelectedFocus = Template.bind({});
SelectedFocus.args = {
    ...Selected.args
}
SelectedFocus.parameters = {
    pseudo: {focus : true}
}

export const SelectedDisabled = Template.bind({});
SelectedDisabled.args = {
    checked: true,
    disabled: true,
}



