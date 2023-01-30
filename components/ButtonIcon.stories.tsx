import React from 'react';
import ButtonIcon from './ButtonIcon';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ButtonColorMode, ButtonType } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Buttons/Icon',
    component: ButtonIcon,
    args: {
      type: ButtonType.primary,
      colorMode: ButtonColorMode.color
    },
  } as ComponentMeta<typeof ButtonIcon>;

const Template: ComponentStory<typeof ButtonIcon> = args => <ButtonIcon {...args} />;

export const Default = Template.bind({});

export const Hover = Template.bind({});
Hover.parameters = {
  pseudo: { hover: true }
}

export const Active = Template.bind({});
Active.parameters = {
  pseudo: { active: true }
}

export const Focus = Template.bind({});
Focus.parameters = {
  pseudo: { focus: true }
}

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
};

export const Loading = Template.bind({});
Loading.args = {
  loader: true
}

// export const PrimaryWhite = Template.bind({});
// PrimaryWhite.args = {
//   style: ButtonStyles.primaryWhite
// }

// export const Secondary = Template.bind({});
// Secondary.args = {
//   style: ButtonStyles.secondary
// }

// export const SecondaryWhite = Template.bind({});
// SecondaryWhite.args = {
//   style: ButtonStyles.secondaryWhite
// }

// export const SecondaryDark = Template.bind({});
// SecondaryDark.args = {
//   style: ButtonStyles.secondaryDark
// }

// export const Flat = Template.bind({});
// Flat.args = {
//   style: ButtonStyles.flat
// }

// export const FlatWhite = Template.bind({});
// FlatWhite.args = {
//   style: ButtonStyles.flatWhite
// }
