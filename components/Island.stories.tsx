import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {SUBJECT} from '../utils/subjects';

import Island from './Island';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Island',
    component: Island,
    args: {
        subject: SUBJECT.mathematics,
        text: "Your text",
        heading: "Head",
        description: "Description",
        buttonLabel: "Button",
        studentReq: "Params",
        penReq: "Params"
    }
  } as ComponentMeta<typeof Island>;

const Template: ComponentStory<typeof Island> = args => <Island {...args} />;

export const Default = Template.bind({});

export const InProgress = Template.bind({});
InProgress.args = {
    progress: 33
}

export const LongDescription = Template.bind({});
LongDescription.args = {
    description: "Description that's long-winded. Loquacious. Rambling. Verbose. Garrulous. It just won't stop going on and on and on and on and on. It has an onion on its belt, as was the style at the time. It makes the island taller.",
}

export const Responsive = Template.bind({});
Responsive.parameters = {
    viewport: {
        defaultViewport: 'iphone5',
      },
}

