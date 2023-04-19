import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Search from './Search';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Form/Search',
    component: Search,
    args: {
        loading: false,
        handleSubmit: () => console.log("Form submitted"),
        updateOptions: (str : string) => console.log(`Update results for search term ${str}`),
    }
  } as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = args => <Search {...args} />;

const FunctioningTemplate: ComponentStory<typeof Search> = args => {
    const [options, setOptions] = React.useState<string[] | null>(null);

    function updateOptions(newInput : string | null){
        if(newInput === null || newInput === ""){
            setOptions(null);
        }
        else if(newInput === "R"){
            setOptions([]);
        }
        else if(newInput === "Rus"){
            setOptions([
                "Russia",
                "Rusk"
            ]);
        }
        else{
            setOptions([
                newInput + "-a-like",
                newInput + "-ish",
            ]);
        }
    }

    function onSubmit(finalInput? : string){
        if(finalInput){
            console.log(`Form submitted: searching for ${finalInput}`);
            return;
        }
        console.log(`Form submitted, but there's nothing to search for`);
    }

    return <Search  {...args}
                    updateOptions={updateOptions}
                    handleSubmit={onSubmit}
                    options={options}
                    />;
};


export const Default = FunctioningTemplate.bind({});

export const Hover = Template.bind({});
Hover.parameters = {
    pseudo: {hover: true}
}

export const Loading = Template.bind({});
Loading.args = {
    showOptions: true,
    initialValue: "Rus",
    loading: true
}

export const ActiveResults = Template.bind({});
ActiveResults.args = {
    showOptions: true,
    loading: false,
    initialValue: "Rus",
    options: [
        "Russia",
        "Rusk"
    ]
}

export const NoResults = Template.bind({});
NoResults.args = {
    showOptions: true,
    loading: false,
    initialValue: "R",
    options: []
}

export const Filled = Template.bind({});
Filled.args = {
    initialValue: "Russia",
    showOptions: false
}

