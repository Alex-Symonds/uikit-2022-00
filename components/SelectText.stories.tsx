import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SelectText } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Input/SelectText',
    component: SelectText,
    args: {
      id: "id_countrySelect",
      label: "Your country",
      options: ["Russia", "USA", "Germany"],
      placeholder: "Example, Russia",
      selectedOption: null,
  }

  } as ComponentMeta<typeof SelectText>;

const Template: ComponentStory<typeof SelectText> = args => <SelectText {...args} />;

const ControlledTemplate : ComponentStory<typeof SelectText> = args => {
  const [selected, setSelected] = React.useState<string | null>(args.selectedOption ?? null);

  function selectOption(data : string | null){
    setSelected(data);
  }

  return <SelectText {...args} 
            selectedOption = {selected}
            setSelectedOption = {selectOption}
          />;
};
export const Default = ControlledTemplate.bind({});

export const Hover = Template.bind({});
Hover.parameters = {
  pseudo: {hover: true}
}

export const ActiveFocus = Template.bind({});
ActiveFocus.args = {
  showOptions: true
}

export const FilledOpen = Template.bind({});
FilledOpen.args = {
  showOptions: true,
  selectedOption: "USA",
}

export const FilledClosed = Template.bind({});
FilledClosed.args = {
  showOptions: false,
  selectedOption: "USA",
}

const Longistan = "Democratic Amazing Joy Republic of North-West VeryVeryLongLongLongBlahBlahBlahistan";
export const LongOption = Template.bind({});
LongOption.args = {
  showOptions: true,
  selectedOption: Longistan,
  options: ["Russia", "USA", "Germany", Longistan]
}



