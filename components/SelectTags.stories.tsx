import React from 'react';
import SelectTags from './SelectTags';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Input/SelectTags',
    component: SelectTags,
    args: {
        label: "Your country",
        options: ["Russia", "USA", "Germany"],
        selectedOptions: [],
    }
  } as ComponentMeta<typeof SelectTags>;

const Template: ComponentStory<typeof SelectTags> = args => <SelectTags {...args} />;

const ControlledTemplate: ComponentStory<typeof SelectTags> = args => {
    const [selecteds, setSelecteds] = React.useState<string[]>(args.selectedOptions ?? []);
  
    function removeTags(tagsToDelete : string[] | null){
        if(tagsToDelete === null){
            return;
        }
        setSelecteds(selecteds.filter(s => !tagsToDelete.includes(s)));
    }

    function addTag(data : string | null){
        if(data){
            if(selecteds.includes(data)){
                return;
            }
    
            if(selecteds.length === 0){
                setSelecteds([data]);
            }
            else{
                setSelecteds(prevState => [
                    ...prevState,
                    data
                ]);
            }
        }
    }

    return <SelectTags  {...args}
                        addSelectedOption={addTag}
                        removeSelectedOptions={removeTags}
                        selectedOptions={selecteds}
    />;
}

export const Default = ControlledTemplate.bind({});

export const Hover = Template.bind({});
Hover.parameters = {
    pseudo: {hover : true}
}

export const ActiveFocus = Template.bind({});
ActiveFocus.args = {
    showOptions : true,
}

export const FilledOpen = Template.bind({});
FilledOpen.args = {
    showOptions : true,
    selectedOptions : ["USA"],
}

export const Filled = ControlledTemplate.bind({});
Filled.args = {
    options: ["Russia", "USA", "Germany", "Belgium", "Sweden", "Mexico", "United Kingdom"],
    selectedOptions : ["USA", "Russia", "Belgium", "Sweden", "Mexico"],
}



