import React from 'react';
import Grid from './Grid';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Grid',
    component: Grid,
  } as ComponentMeta<typeof Grid>;

const StyledColouredBlock = styled.div`
  display: block;
  width: 100%;
  height: 50vh;
  min-width: 3rem;
  min-height: 3rem;
  background: red;
  opacity: 10%;
`;

const Template: ComponentStory<typeof Grid> = args => {

    let illustrativeBlocks : React.ReactNode[] = [];
    for(let i = 0; i < 12; i++){
        illustrativeBlocks.push(<StyledColouredBlock />);
    }

    return  <Grid {...args}>
                {illustrativeBlocks}
            </Grid>
};

export const Default = Template.bind({});

export const DesktopHDLeft = Template.bind({});
DesktopHDLeft.args={
    leftAlignOnWidest: true,
}
DesktopHDLeft.parameters = {
    viewport: {
      defaultViewport: 'desktopHD',
    },
};

export const DesktopHD = Template.bind({});
DesktopHD.parameters = {
    viewport: {
      defaultViewport: 'desktopHD',
    },
};

export const Desktop = Template.bind({});
Desktop.parameters = {
    viewport: {
      defaultViewport: 'desktop',
    },
};

export const Tablet = Template.bind({});
Tablet.parameters = {
    viewport: {
      defaultViewport: 'ipad',
    },
};

export const Mobile = Template.bind({});
Mobile.parameters = {
    viewport: {
      defaultViewport: 'iphone5',
    },
};