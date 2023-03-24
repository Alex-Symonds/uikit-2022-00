import React from 'react';
import TooltipWrapper from './TooltipWrapper';
import { TOOLTIP_POS } from './TooltipPositioned';
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
        text: TEXT,
        lockVisible: true,
    },
    decorators: [
            (Story) => (
              <div style={{ margin: '10rem 0 0 10rem' }}>
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

export const AboveLeft = Template.bind({});
AboveLeft.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.bottomLeft,
}

export const AboveRight = Template.bind({});
AboveRight.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.bottomRight,
}

export const BelowLeft = Template.bind({});
BelowLeft.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.topLeft,
}

export const BelowRight = Template.bind({});
BelowRight.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.topRight,
}

export const OnRight = Template.bind({});
OnRight.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.left,
}

export const OnLeft = Template.bind({});
OnLeft.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.right,
}

/* 
    Story with a full-width tooltip. Manually resizing the window allows you to check 
    exactly when it repositions. Not much use in automated testing though: it doesn't 
    force an overflow.
*/
// export const ManualOverflowTest = Template.bind({});
// ManualOverflowTest.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.left,
//     text: FULL_ROW,
// }

export const OverflowOnLeft = Template.bind({});
OverflowOnLeft.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.right,
    text: FULL_ROW,
}

export const OverflowOnRightPrefSideFits = Template.bind({});
OverflowOnRightPrefSideFits .args = {
    arrowPos: TOOLTIP_ARROW_POSITION.left,
    text: TEXT + TEXT,
}
OverflowOnRightPrefSideFits .parameters = {
    viewport: {
        defaultViewport: 'test_tooltipWrapper_onRight_prefSide',
    }
}

export const OverflowOnRight = Template.bind({});
OverflowOnRight.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.left,
    text: FULL_ROW,
}
OverflowOnRight.parameters = {
    viewport: {
        defaultViewport: 'test_tooltipWrapper_onRight',
    }
}

export const OverflowFullscreen = Template.bind({});
OverflowFullscreen.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.left,
    text: WALL,
}
OverflowFullscreen.parameters = {
    viewport: {
      defaultViewport: 'iphone5',
    },
};



// export const BottomLeftStart = Template.bind({});
// BottomLeftStart.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.bottomLeft,
//     pos: TOOLTIP_POS.start,
// }

export const BottomLeftCenter = Template.bind({});
BottomLeftCenter.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.bottomLeft,
    pos: TOOLTIP_POS.center,
}

export const BottomLeftEnd = Template.bind({});
BottomLeftEnd.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.bottomLeft,
    pos: TOOLTIP_POS.end,
}

export const BottomRightStart = Template.bind({});
BottomRightStart.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.bottomRight,
    pos: TOOLTIP_POS.start,
}

export const BottomRightCenter = Template.bind({});
BottomRightCenter.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.bottomRight,
    pos: TOOLTIP_POS.center,
}

// export const BottomRightEnd = Template.bind({});
// BottomRightEnd.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.bottomRight,
//     pos: TOOLTIP_POS.end,
// }

// export const TopLeftStart = Template.bind({});
// TopLeftStart.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.topLeft,
//     pos: TOOLTIP_POS.start,
// }

export const TopLeftCenter = Template.bind({});
TopLeftCenter.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.topLeft,
    pos: TOOLTIP_POS.center,
}

export const TopLeftEnd = Template.bind({});
TopLeftEnd.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.topLeft,
    pos: TOOLTIP_POS.end,
}

export const TopRightStart = Template.bind({});
TopRightStart.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.topRight,
    pos: TOOLTIP_POS.start,
}

export const TopRightCenter = Template.bind({});
TopRightCenter.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.topRight,
    pos: TOOLTIP_POS.center,
}

// export const TopRightEnd = Template.bind({});
// TopRightEnd.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.topRight,
//     pos: TOOLTIP_POS.end,
// }

// export const LeftStart = Template.bind({});
// LeftStart.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.left,
//     pos: TOOLTIP_POS.start,
// }

export const LeftCenter = Template.bind({});
LeftCenter.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.left,
    pos: TOOLTIP_POS.center,
}

export const LeftEnd = Template.bind({});
LeftEnd.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.left,
    pos: TOOLTIP_POS.end,
}

// export const RightStart = Template.bind({});
// RightStart.args = {
//     arrowPos: TOOLTIP_ARROW_POSITION.right,
//     pos: TOOLTIP_POS.start,
// }

export const RightCenter = Template.bind({});
RightCenter.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.right,
    pos: TOOLTIP_POS.center,
}

export const RightEnd = Template.bind({});
RightEnd.args = {
    arrowPos: TOOLTIP_ARROW_POSITION.right,
    pos: TOOLTIP_POS.end,
}