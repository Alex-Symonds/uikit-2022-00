import type { Meta, StoryObj } from '@storybook/react';
import TooltipWrapper from './TooltipWrapper';
import { TOOLTIP_MODE, POINTS_TO } from './TooltipPositioned';

import styled from 'styled-components';
import { PALETTE, TYPOGRAPHY } from '../utils/Theme';

const TEXT = "Your Text in Tooltip ";
const FULL_ROW = TEXT + TEXT + TEXT + TEXT;
const THREE_ROWS = FULL_ROW + FULL_ROW + FULL_ROW;

const meta: Meta<typeof TooltipWrapper> = {
    title: 'UI Kit/TooltipWrapper',
    component: TooltipWrapper,
    args: {
        text: TEXT,
        lockVisible: true,
    },
  };
  
export default meta;
type Story = StoryObj<typeof TooltipWrapper>;

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

export const DefaultFunctional: Story = {
    args: {
        lockVisible: false,
    },
    // @ts-ignore : maybe YOU can't find the arguments, TS, but everyone else can, so HUSH
    render: ({mode, lockVisible, pointTo, text, className}) =>
    <TooltipWrapper mode={mode} lockVisible={lockVisible} pointTo={pointTo} text={text} className={className}>
            <StyledBox>
                <span>Hover, focus or tap me :)</span>
            </StyledBox>
        </TooltipWrapper>,
    decorators: [
            (Story) => (
              <div style={{ margin: '10rem  0 0 10rem' }}>
                <Story />
              </div>
            ),
    ],
};

export const AboveLeft: Story = {
    args: {
        mode: TOOLTIP_MODE.aboveWithArrowLeft,
    },
    // @ts-ignore : maybe YOU can't find the "text" argument, TS, but everyone else can, so HUSH
    render: ({mode, pointTo, text, lockVisible}) =>
        <TooltipWrapper text={text} pointTo={pointTo} mode={mode} lockVisible={lockVisible}>
            <StyledBox>
                <span>Tooltip target</span>
            </StyledBox>
        </TooltipWrapper>,
    decorators: [
        (Story) => (
            <div style={{ margin: '10rem  0 0 10rem' }}>
            <Story />
            </div>
        ),
    ],
};

export const AboveRight: Story = {
    ...AboveLeft,
    args: {
        mode: TOOLTIP_MODE.aboveWithArrowRight,
    }
}

export const BelowRight: Story = {
    ...AboveLeft,
    args: {
        mode: TOOLTIP_MODE.belowWithArrowRight,
    }
}

export const BelowLeft: Story = {
    ...AboveLeft,
    args: {
        mode: TOOLTIP_MODE.belowWithArrowLeft,
    }
}

export const LeftMid: Story = {
    ...AboveLeft,
    args: {
        mode: TOOLTIP_MODE.leftWithArrowMid,
    }
}

export const RightMid: Story = {
    ...AboveLeft,
    args: {
        mode: TOOLTIP_MODE.rightWithArrowMid,
    }
}


// || Stories testing how the tooltip behaves when there isn't enough space for it
/* 
    In order to create the "not enough space" error, the plan is:

    1) The target element "naturally" won't have space to the top or left. Create
       space there by adding a margin to the decorator (or not, as the case may be).
       Note: don't add the margin to the target element, because that messes up
       the tooltip positioning.
    2) The target element "naturally" would have space below and to the right. Get rid
       of that by increasing the dimensions of the target element, so it fills the screen.

    This means both the decorator and the render function need information about which/how
    many sides need space. Solution: a "T_Space" variable. Set four bools for top, right,
    bottom and left before the story and pass it in. The decorator will convert that into 
    margins and the styled-component will convert that into dimensions.
*/
type T_Space = {
    top : boolean,
    right : boolean,
    bottom : boolean,
    left : boolean,
}

const REM_TO_FIT_TOOLTIP = 10;
const MIN_MARGIN = 0.5;
const STORYBOOK_PADDING = "1rem";

const StyledFillerBox = styled.div.attrs<
    {space : T_Space},
    {tooltipSpaceX : number, tooltipSpaceY : number}
    >((props) => {
            return {
                tooltipSpaceX: getSpaceForTooltips(props.space.left, props.space.right),
                tooltipSpaceY: getSpaceForTooltips(props.space.top, props.space.bottom),
            }
        }
    )
    <{space : T_Space}>`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: calc(100vw - ${STORYBOOK_PADDING} - ${props => props.tooltipSpaceX ? `${props.tooltipSpaceX}rem` : "0px"});
    min-height: calc(100vh - ${STORYBOOK_PADDING} - ${props => props.tooltipSpaceY ? `${props.tooltipSpaceY}rem` : "0px"});
    background: ${PALETTE.primary};
    padding: 1rem;
  
    span{
        ${TYPOGRAPHY.p2}
        color: ${PALETTE.white};
        text-align: center;
    }
`;

function getSpaceForTooltips(wantSpaceA : boolean, wantSpaceB : boolean){
    if(wantSpaceA && wantSpaceB){
        return REM_TO_FIT_TOOLTIP * 2;
    }
    if(wantSpaceA || wantSpaceB){
        return REM_TO_FIT_TOOLTIP + MIN_MARGIN;
    }
    return MIN_MARGIN * 2;
}

function getMargin(sideFits : boolean){
    const fits = `${REM_TO_FIT_TOOLTIP}rem`;
    const noFit = `${MIN_MARGIN}rem`;
    return sideFits ? fits : noFit;
}

const getDecorator = (space : T_Space) => {
    const marginStr = `${getMargin(space.top)} ${getMargin(space.right)} ${getMargin(space.bottom)} ${getMargin(space.left)}`;
    // @ts-ignore : It's working just fine with "implicit any" on Story, so kindly HUSH
    return [(Story) => (<div style={{ margin: marginStr }}><Story /></div>)];
}

const SPACE_ALL = {
    top: true,
    right: true,
    bottom: true,
    left: true,
};
const NO_SPACE = {
    top: false,
    right: false,
    bottom: false,
    left: false,
}
let space : T_Space;


space = {...SPACE_ALL, top: false};
export const OverflowNoSpaceAbove: Story = {
    args: {
        mode: TOOLTIP_MODE.aboveWithArrowLeft,
        pointTo: POINTS_TO.start,
        space: space
    },
    // @ts-ignore : TS says it can't find these variables in args, but it's working as-is, so meh
    render: ({mode, lockVisible, pointTo, text, className, space}) => 
        <TooltipWrapper mode={mode} lockVisible={lockVisible} pointTo={pointTo} text={text} className={className}>
            <StyledFillerBox space={space} >
                <span>{mode} & {pointTo}</span>
                <span>Target that fills a lot of space, so we can test the responsive overflow handling.</span>
            </StyledFillerBox>
        </TooltipWrapper>
    ,
    decorators: getDecorator(space),
};


space = {...SPACE_ALL, left: false};
export const OverflowNoSpaceLeft: Story = {
    args: {
        mode: TOOLTIP_MODE.leftWithArrowMid,
        pointTo: POINTS_TO.start,
        space: space,
    },
    render: OverflowNoSpaceAbove.render,
    decorators: getDecorator(space),
};

space = {...SPACE_ALL, right: false};
export const OverflowNoSpaceRight: Story = {
    args: {
        mode: TOOLTIP_MODE.rightWithArrowMid,
        pointTo: POINTS_TO.start,
        space: space,
    },
    render: OverflowNoSpaceAbove.render,
    decorators: getDecorator(space),
};

space = {...SPACE_ALL, bottom: false};
export const OverflowNoSpaceBelow: Story = {
    args: {
        mode: TOOLTIP_MODE.belowWithArrowLeft,
        pointTo: POINTS_TO.start,
        space: space,
    },
    render: OverflowNoSpaceAbove.render,
    decorators: getDecorator(space),
};

space = {...SPACE_ALL, top: false, left: false};
export const OverflowNoSpaceAboveOrLeft: Story = {
    args: {
        mode: TOOLTIP_MODE.aboveWithArrowRight,
        pointTo: POINTS_TO.start,
        space: space,
    },
    render: OverflowNoSpaceAbove.render,
    decorators: getDecorator(space),
};

space = {...SPACE_ALL, top: false, right: false};
export const OverflowNoSpaceAboveOrRight: Story = {
    args: {
        mode: TOOLTIP_MODE.aboveWithArrowLeft,
        pointTo: POINTS_TO.end,
        space: space,
    },
    render: OverflowNoSpaceAbove.render,
    decorators: getDecorator(space),
};

space = {...SPACE_ALL, top: false, bottom: false};
export const OverflowNoSpaceAboveOrBelow: Story = {
    args: {
        mode: TOOLTIP_MODE.belowWithArrowRight,
        pointTo: POINTS_TO.end,
        space: space,
    },
    render: OverflowNoSpaceAbove.render,
    decorators: getDecorator(space),
};

space = {...SPACE_ALL, bottom: false, left: false};
export const OverflowNoSpaceBelowOrLeft: Story = {
    args: {
        mode: TOOLTIP_MODE.belowWithArrowLeft,
        pointTo: POINTS_TO.end,
        space: space,
    },
    render: OverflowNoSpaceAbove.render,
    decorators: getDecorator(space),
};

space = {...SPACE_ALL, bottom: false, right: false};
export const OverflowNoSpaceBelowOrRight: Story = {
    args: {
        mode: TOOLTIP_MODE.rightWithArrowMid,
        pointTo: POINTS_TO.center,
        space: space,
    },
    render: OverflowNoSpaceAbove.render,
    decorators: getDecorator(space),
};

space = {...SPACE_ALL, left: false, right: false};
export const OverflowNoSpaceLeftOrRight: Story = {
    args: {
        mode: TOOLTIP_MODE.leftWithArrowMid,
        pointTo: POINTS_TO.center,
        space: space,
    },
    render: OverflowNoSpaceAbove.render,
    decorators: getDecorator(space),
};

space = {...NO_SPACE, top: true};
export const OverflowOnlySpaceAbove: Story = {
    args: {
        mode: TOOLTIP_MODE.belowWithArrowLeft,
        pointTo: POINTS_TO.center,
        space: space,
    },
    render: OverflowNoSpaceAbove.render,
    decorators: getDecorator(space),
};

space = {...NO_SPACE, bottom: true};
export const OverflowOnlySpaceBelow: Story = {
    args: {
        mode: TOOLTIP_MODE.rightWithArrowMid,
        pointTo: POINTS_TO.start,
        space: space,
    },
    render: OverflowNoSpaceAbove.render,
    decorators: getDecorator(space),
};

space = {...NO_SPACE, left: true};
export const OverflowOnlySpaceLeft: Story = {
    args: {
        mode: TOOLTIP_MODE.aboveWithArrowRight,
        pointTo: POINTS_TO.end,
        space: space,
    },
    render: OverflowNoSpaceAbove.render,
    decorators: getDecorator(space),
};

space = {...NO_SPACE, right: true};
export const OverflowOnlySpaceRight: Story = {
    args: {
        mode: TOOLTIP_MODE.leftWithArrowMid,
        pointTo: POINTS_TO.center,
        space: space,
    },
    render: OverflowNoSpaceAbove.render,
    decorators: getDecorator(space),
};

space = NO_SPACE;
export const OverflowNoSpace: Story = {
    args: {
        mode: TOOLTIP_MODE.aboveWithArrowLeft,
        pointTo: POINTS_TO.start,
        space: space,
    },
    render: OverflowNoSpaceAbove.render,
    decorators: getDecorator(space),
};
