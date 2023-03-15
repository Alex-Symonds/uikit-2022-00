import React from 'react';
import TooltipWrapper, { TOOLTIP_POSITION } from './TooltipWrapper';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TOOLTIP_ARROW_POSITION } from './Tooltip';
import styled from 'styled-components';
import { PALETTE, TYPOGRAPHY } from '../utils/Theme';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const TEXT = "Your Text in Tooltip ";
const FULL_ROW = TEXT + TEXT + TEXT;
const THREE_ROWS = FULL_ROW + FULL_ROW + FULL_ROW;
const WALL = THREE_ROWS + THREE_ROWS + THREE_ROWS;

export default {
    title: 'UI Kit/TooltipWrapper',
    component: TooltipWrapper,
    args: {
        text: WALL,
        lockVisible: true,
    },
    decorators: [
            (Story) => (
              <div style={{ margin: '10em' }}>
                <Story />
              </div>
            ),
    ],
  } as ComponentMeta<typeof TooltipWrapper>;

const StyledBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10rem;
    height: 4rem;
    background: ${PALETTE.primary};
    padding: 1rem;
  
    span{
        ${TYPOGRAPHY.p2}
        color: ${PALETTE.white};
        text-align: center;
    }
`;

const FunctioningTemplate: ComponentStory<typeof TooltipWrapper> = args => {
    return  <TooltipWrapper {...args}>
                <StyledBox>
                    <span>Hover, focus or tap me :)</span>
                </StyledBox>
            </TooltipWrapper>
}

const Template: ComponentStory<typeof TooltipWrapper> = args => {
    return  <TooltipWrapper {...args}>
                <StyledBox>
                    <span>Tooltip target</span>
                </StyledBox>
            </TooltipWrapper>
}

export const DefaultFunctional = FunctioningTemplate.bind({});
DefaultFunctional.args = {
    lockVisible: false
}

export const TopLeft = Template.bind({});
TopLeft.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.topLeft,
}

export const TopRight = Template.bind({});
TopRight.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.topRight,
}

export const BottomLeft = Template.bind({});
BottomLeft.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.bottomLeft,
}

export const BottomRight = Template.bind({});
BottomRight.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.bottomRight,
}

export const Left = Template.bind({});
Left.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.left,
}

export const Right = Template.bind({});
Right.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.right,
}

// export const TopLeftStart = Template.bind({});
// TopLeftStart.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.topLeft,
//     pos: TOOLTIP_POSITION.start,
// }

// export const TopLeftCenter = Template.bind({});
// TopLeftCenter.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.topLeft,
//     pos: TOOLTIP_POSITION.center,
// }

// export const TopLeftEnd = Template.bind({});
// TopLeftEnd.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.topLeft,
//     pos: TOOLTIP_POSITION.end,
// }

// export const TopRightStart = Template.bind({});
// TopRightStart.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.topRight,
//     pos: TOOLTIP_POSITION.start,
// }

// export const TopRightCenter = Template.bind({});
// TopRightCenter.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.topRight,
//     pos: TOOLTIP_POSITION.center,
// }

// export const TopRightEnd = Template.bind({});
// TopRightEnd.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.topRight,
//     pos: TOOLTIP_POSITION.end,
// }

// export const BottomLeftStart = Template.bind({});
// BottomLeftStart.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.bottomLeft,
//     pos: TOOLTIP_POSITION.start,
// }

// export const BottomLeftCenter = Template.bind({});
// BottomLeftCenter.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.bottomLeft,
//     pos: TOOLTIP_POSITION.center,
// }

// export const BottomLeftEnd = Template.bind({});
// BottomLeftEnd.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.bottomLeft,
//     pos: TOOLTIP_POSITION.end,
// }

// export const BottomRightStart = Template.bind({});
// BottomRightStart.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.bottomRight,
//     pos: TOOLTIP_POSITION.start,
// }

// export const BottomRightCenter = Template.bind({});
// BottomRightCenter.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.bottomRight,
//     pos: TOOLTIP_POSITION.center,
// }

// export const BottomRightEnd = Template.bind({});
// BottomRightEnd.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.bottomRight,
//     pos: TOOLTIP_POSITION.end,
// }

// export const LeftStart = Template.bind({});
// LeftStart.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.left,
//     pos: TOOLTIP_POSITION.start,
// }

// export const LeftCenter = Template.bind({});
// LeftCenter.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.left,
//     pos: TOOLTIP_POSITION.center,
// }

// export const LeftEnd = Template.bind({});
// LeftEnd.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.left,
//     pos: TOOLTIP_POSITION.end,
// }

// export const RightStart = Template.bind({});
// RightStart.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.right,
//     pos: TOOLTIP_POSITION.start,
// }

// export const RightCenter = Template.bind({});
// RightCenter.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.right,
//     pos: TOOLTIP_POSITION.center,
// }

// export const RightEnd = Template.bind({});
// RightEnd.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.right,
//     pos: TOOLTIP_POSITION.end,
// }