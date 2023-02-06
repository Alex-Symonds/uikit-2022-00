import React from 'react';
import Search from './Search';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Search',
    component: Search,
    args: {
        handleSubmit: () => console.log("Form submitted"),
        updateResults: (str : string) => console.log(`Update results for search term ${str}`),
    }
  } as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = args => <Search {...args} />;

const ControlledTemplate: ComponentStory<typeof Search> = args => {
    const [results, setResults] = React.useState<string[] | null>(null);

    function updateResults(newInput : string | null){
        if(newInput === null || newInput === ""){
            setResults(null);
        }
        else if(newInput === "R"){
            setResults([]);
        }
        else if(newInput === "Rus"){
            setResults([
                "Russia",
                "Rusk"
            ]);
        }
        else{
            setResults([
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
                    updateResults={updateResults}
                    handleSubmit={onSubmit}
                    results={results}
                    />;
};


export const Default = ControlledTemplate.bind({});

export const Hover = Template.bind({});
Hover.parameters = {
    pseudo: {hover: true}
}

export const Loading = Template.bind({});
Loading.args = {
    displayResults: true,
    initialValue: "Rus",
    loading: true
}

export const ActiveResults = Template.bind({});
ActiveResults.args = {
    displayResults: true,
    loading: false,
    initialValue: "Rus",
    results: [
        "Russia",
        "Rusk"
    ]
}

export const NoResults = Template.bind({});
NoResults.args = {
    displayResults: true,
    loading: false,
    initialValue: "R",
    results: []
}

export const Filled = Template.bind({});
Filled.args = {
    initialValue: "Russia",
    displayResults: false
}

