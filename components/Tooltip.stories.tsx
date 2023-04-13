import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tooltip, TOOLTIP_ARROW_POSITION } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Tooltip',
    component: Tooltip,
    args: {
        text: "Your Text in Tooltip",
    }
  } as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = args => {
    const id = React.useId();
    return <Tooltip {...args} id={id} />
};

export const TopLeft = Template.bind({});
TopLeft.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.topLeft,
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

export const Fullscreen = Template.bind({});
Fullscreen.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.right,
    fullscreenMode: true,
}
