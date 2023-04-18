import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Filter from './Filter';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Filter',
    component: Filter,
  } as ComponentMeta<typeof Filter>;

const Template: ComponentStory<typeof Filter> = args => {
    const [optionState, setOptionState] = React.useState(args.options);

    function handleClick(id : string){
        const idx = optionState.findIndex(ele => ele.id === id);
        if(idx === -1){
            return;
        }

        let newAttributes = {
            isSelected: !(optionState[idx].isSelected)
        }

        setOptionState(
            [
                ...optionState.slice(0, idx),
                Object.assign(optionState[idx], newAttributes),
                ...optionState.slice(idx + 1)
            ]
        );
    }

    return <Filter {...args} options={optionState} handleClick={handleClick} />
}

export const Default = Template.bind({});
Default.args = {
    options: [
        {id: "1", isSelected: false, label: "Label" },
    ]
}

export const Hover = Template.bind({});
Hover.args = {
    ...Default.args
}
Hover.parameters = {
    pseudo: {hover: true}
}

export const Selected = Template.bind({});
Selected.args = {
    options: [
        {id: "1", isSelected: true, label: "Label" },
    ]
}

export const SelectedHover = Template.bind({});
SelectedHover.args = {
    ...Selected.args
}
SelectedHover.parameters = {
    pseudo: { hover: true }
}

export const MultipleExample = Template.bind({});
MultipleExample.args = {
    options: [
        {id: "1", isSelected: false, label: "Tea" },
        {id: "2", isSelected: true, label: "Coffee" },
        {id: "3", isSelected: false, label: "Water" }
    ]
}
