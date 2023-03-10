import React from 'react';
import ContextRadioGroup, {RadioOptionDataType} from './ContextMenuRadio';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { changeRadio } from '../utils/utils';
import { StyledContextMenu } from './ContextMenu';
import { COUNTRY_RADIO_DATA as COUNTRY_DATA } from '../utils/storyData';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/ContextMenu/Radio',
    component: ContextRadioGroup,
    decorators: [
        (Story) => (
            <StyledContextMenu x={16} y={16}>
                <Story />
            </StyledContextMenu>
        ),
      ],
  } as ComponentMeta<typeof ContextRadioGroup>;


const ControlledTemplate: ComponentStory<typeof ContextRadioGroup> = args => {
    const [options, setOptions] = React.useState<RadioOptionDataType[]>(args.options);

    function onChange(id : string, checked : boolean){
        changeRadio(id, checked, options, setOptions);
    }

    const id = React.useId();
    return <ContextRadioGroup  {...args}
                                id={id}
                                options = {options}
                                onChange = {onChange}
            />

};

export const NoHeading = ControlledTemplate.bind({});
NoHeading.args = {
    name: "countries",
    legend: "Country",
    options: COUNTRY_DATA,
    hideLegendVisually : true,
}

export const WithHeading = ControlledTemplate.bind({});
WithHeading.args = {
    name: "countries",
    legend: "Country",
    options: COUNTRY_DATA,
}
