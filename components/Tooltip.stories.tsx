import React from 'react';
import Tooltip, {TOOLTIP_ARROW_POSITION} from './Tooltip';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Tooltip',
    component: Tooltip,
    args: {
        text: "Your Text in Tooltip"
    }
  } as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = args => <Tooltip {...args} />;

export const TopLeft = Template.bind({});
TopLeft.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.topLeft
}

export const TopRight = Template.bind({});
TopRight.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.topRight
}

export const BottomLeft = Template.bind({});
BottomLeft.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.bottomLeft
}

export const BottomRight = Template.bind({});
BottomRight.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.bottomRight
}

export const Left = Template.bind({});
Left.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.left
}

export const Right = Template.bind({});
Right.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.right
}
