import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';

import { Icon, ICON_ID, ICON_SIZES } from './icons/';

import Tab, { TAB_TYPE} from './Tab';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Tab',
    component: Tab,
  } as ComponentMeta<typeof Tab>;

const TemplateVertical: ComponentStory<typeof Tab> = args => {
    // Wrap with a ul to auto-remove bullets
    return  <ul>
                <Tab {...args}>
                    Name of Tab
                </Tab>
            </ul>
};

const StyledHUl = styled.ul`
  width: 347px
`;
const TemplateHorizontal: ComponentStory<typeof Tab> = args => {
    // Wrap with a ul to auto-remove bullets and set a width
    return  <StyledHUl>
                <Tab {...args}>
                    Name of Tab
                    <Icon id={ ICON_ID.progressCircle25 } size={ICON_SIZES.medium} />
                </Tab>
            </StyledHUl>
};


export const Large = TemplateVertical.bind({});
Large.args = {
    type: TAB_TYPE.vtLarge
}

export const LargeHover = TemplateVertical.bind({});
LargeHover.args = {
    ...Large.args
}
LargeHover.parameters = {
    pseudo: {hover: true}
}

export const LargeActive = TemplateVertical.bind({});
LargeActive.args = {
    ...Large.args
}
LargeActive.parameters = {
    pseudo: {active: true}
}

export const Medium = TemplateVertical.bind({});
Medium.args = {
    type: TAB_TYPE.vtMedium
}

export const MediumHover = TemplateVertical.bind({});
MediumHover.args = {
    ...Medium.args
}

MediumHover.parameters = {
    pseudo: {hover: true}
}

export const MediumActive = TemplateVertical.bind({});
MediumActive.args = {
    ...Medium.args
}
MediumActive.parameters = {
    pseudo: {active: true}
}

export const Small = TemplateVertical.bind({});
Small.args = {
    type: TAB_TYPE.vtSmall
}

export const SmallHover = TemplateVertical.bind({});
SmallHover.args = {
    ...Small.args
}
SmallHover.parameters = {
    pseudo: {hover: true}
}

export const SmallActive = TemplateVertical.bind({});
SmallActive.args = {
    ...Small.args
}
SmallActive.parameters = {
    pseudo: {active: true}
}

export const Horizontal = TemplateHorizontal.bind({});
Horizontal.args = {
    type: TAB_TYPE.hzLarge
}

export const HorizontalHover = TemplateHorizontal.bind({});
HorizontalHover.args = {
    ...Horizontal.args
}
HorizontalHover.parameters = {
    pseudo: {hover: true}
}

export const HorizontalActive = TemplateHorizontal.bind({});
HorizontalActive.args = {
    ...Horizontal.args
}
HorizontalActive.parameters = {
    pseudo: {active: true}
}


