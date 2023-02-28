import React from 'react';
import ContextCheckboxGroup, {CheckboxOptionDataType} from './ContextMenuCheckbox';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { changeCheckbox } from '../utils/utils';
import {StyledContextMenu} from './ContextMenu';
import {COUNTRY_CHECKBOX_DATA as COUNTRY_DATA} from '../utils/storyData';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/ContextMenu/Checkbox',
    component: ContextCheckboxGroup,
    decorators: [
        (Story) => (
          <StyledContextMenu x={16} y={16}>
            <Story />
          </StyledContextMenu>
        ),
      ],
  } as ComponentMeta<typeof ContextCheckboxGroup>;

const ControlledTemplate: ComponentStory<typeof ContextCheckboxGroup> = args => {
    const [options, setOptions] = React.useState<CheckboxOptionDataType[]>(args.options);

    function onChange(id : string, checked : boolean){
        changeCheckbox(id, checked, options, setOptions);
    }

    const id = React.useId();
    return <ContextCheckboxGroup  {...args}
                                id={id}
                                options = {options}
                                onChange = {onChange}
            />

};

export const NoHeading = ControlledTemplate.bind({});
NoHeading.args = {
    legend: "Country",
    options: COUNTRY_DATA,
    hideLegendVisually: true,
}

export const WithHeading = ControlledTemplate.bind({});
WithHeading.args = {
    legend: "Country",
    options: COUNTRY_DATA,
}
