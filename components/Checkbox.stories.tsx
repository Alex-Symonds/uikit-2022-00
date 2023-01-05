import React from 'react';
import Checkbox from './Checkbox';
import { ComponentStory, ComponentMeta } from '@storybook/react';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Input/Checkbox',
    component: Checkbox,
    args: {
        id: "testID",
        name: "testName",
        text: "Text",
        value: "testValue",
    }
  } as ComponentMeta<typeof Checkbox>;


const Template : ComponentStory<typeof Checkbox> = args => {
    const [checked, setChecked] = React.useState(args.checked ?? false);
    const [indeterminate, setIndeterminate] = React.useState(args.indeterminate ?? false);

    function onChange(){
        if(indeterminate){
            setChecked(true);
            setIndeterminate(false);
            return;
        }

        setChecked(prevCheck => {
            return !prevCheck;
        });
    }

    return (
        <Checkbox 
            {...args}
            checked={checked}
            indeterminate={indeterminate}
            onChange={(...params) => {
                args.onChange(...params);
                onChange();
            }}
        />
    );
};

export const Default = Template.bind({});

export const Unselected = Template.bind({});
Unselected.args = {
    checked: false
}

export const UnselectedHover = Template.bind({});
UnselectedHover.args = {
    checked: false
}
UnselectedHover.parameters = {
    pseudo: { hover: true }
}

export const UnselectedActive = Template.bind({});
UnselectedActive.args = {
    checked: false
}
UnselectedActive.parameters = {
    pseudo: { active: true }
}

export const UnselectedFocus = Template.bind({});
UnselectedFocus.args = {
    checked: false
}
UnselectedFocus.parameters = {
    pseudo: { focus: true }
}

export const UnselectedDisabled = Template.bind({});
UnselectedDisabled.args = {
    checked: false,
    disabled: true
}

export const UnselectedError = Template.bind({});
UnselectedError.args = {
    checked: false,
    error: true
}

export const Selected = Template.bind({});
Selected.args = {
    checked: true
}

export const SelectedHover = Template.bind({});
SelectedHover.args = {
    checked: true
}
SelectedHover.parameters = {
    pseudo: { hover: true }
}

export const SelectedActive = Template.bind({});
SelectedActive.args = {
    checked: true
}
SelectedActive.parameters = {
    pseudo: { active: true }
}

export const SelectedFocus = Template.bind({});
SelectedFocus.args = {
    checked: true
}
SelectedFocus.parameters = {
    pseudo: { focus: true }
}

export const SelectedDisabled = Template.bind({});
SelectedDisabled.args = {
    checked: true,
    disabled: true
}

export const IndeterminateFocus = Template.bind({});
IndeterminateFocus.args = {
    indeterminate: true
}
IndeterminateFocus.parameters = {
    pseudo: { focus: true }
}

export const IndeterminateDisabled = Template.bind({});
IndeterminateDisabled.args = {
    indeterminate: true,
    disabled: true
}


