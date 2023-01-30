import React from 'react';
import ButtonLabelIcon from './ButtonLabelIcon';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ButtonColorMode, ButtonType } from './Button';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Buttons/LabelIcon',
    component: ButtonLabelIcon,
    args: {
      type: ButtonType.primary,
      colorMode: ButtonColorMode.color
    },
  } as ComponentMeta<typeof ButtonLabelIcon>;

const Template: ComponentStory<typeof ButtonLabelIcon> = args => <ButtonLabelIcon {...args} />;

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

export const PrimaryWhite = Template.bind({});
PrimaryWhite.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.primary
}

export const PrimaryWhiteHover = Template.bind({});
PrimaryWhiteHover.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.primary
}
PrimaryWhiteHover.parameters = {
  pseudo: { hover: true }
}

export const PrimaryWhiteActive = Template.bind({});
PrimaryWhiteActive.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.primary
}
PrimaryWhiteActive.parameters = {
  pseudo: { active: true }
}

export const PrimaryWhiteFocus = Template.bind({});
PrimaryWhiteFocus.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.primary
}
PrimaryWhiteFocus.parameters = {
  pseudo: { focus: true }
}

export const PrimaryWhiteDisabled = Template.bind({});
PrimaryWhiteDisabled.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.primary,
  disabled: true
};


export const Secondary = Template.bind({});
Secondary.args = {
  colorMode: ButtonColorMode.color,
  type: ButtonType.secondary
}

export const SecondaryHover = Template.bind({});
SecondaryHover.args = {
  colorMode: ButtonColorMode.color,
  type: ButtonType.secondary
}
SecondaryHover.parameters = {
  pseudo: { hover: true }
}

export const SecondaryActive = Template.bind({});
SecondaryActive.args = {
  colorMode: ButtonColorMode.color,
  type: ButtonType.secondary
}
SecondaryActive.parameters = {
  pseudo: { active: true }
}

export const SecondaryFocus = Template.bind({});
SecondaryFocus.args = {
  colorMode: ButtonColorMode.color,
  type: ButtonType.secondary
}
SecondaryFocus.parameters = {
  pseudo: { focus: true }
}

export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.args = {
  colorMode: ButtonColorMode.color,
  type: ButtonType.secondary,
  disabled: true
};


export const SecondaryWhite = Template.bind({});
SecondaryWhite.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.secondary
}

export const SecondaryWhiteHover = Template.bind({});
SecondaryWhiteHover.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.secondary
}
SecondaryWhiteHover.parameters = {
  pseudo: { hover: true }
}

export const SecondaryWhiteActive = Template.bind({});
SecondaryWhiteActive.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.secondary
}
SecondaryWhiteActive.parameters = {
  pseudo: { active: true }
}

export const SecondaryWhiteFocus = Template.bind({});
SecondaryWhiteFocus.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.secondary
}
SecondaryWhiteFocus.parameters = {
  pseudo: { focus: true }
}

export const SecondaryWhiteDisabled = Template.bind({});
SecondaryWhiteDisabled.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.secondary,
  disabled: true
};


export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
  colorMode: ButtonColorMode.dark,
  type: ButtonType.secondary
}

export const SecondaryDarkHover = Template.bind({});
SecondaryDarkHover.args = {
  colorMode: ButtonColorMode.dark,
  type: ButtonType.secondary
}
SecondaryDarkHover.parameters = {
  pseudo: { hover: true }
}

export const SecondaryDarkActive = Template.bind({});
SecondaryDarkActive.args = {
  colorMode: ButtonColorMode.dark,
  type: ButtonType.secondary
}
SecondaryDarkActive.parameters = {
  pseudo: { active: true }
}

export const SecondaryDarkFocus = Template.bind({});
SecondaryDarkFocus.args = {
  colorMode: ButtonColorMode.dark,
  type: ButtonType.secondary
}
SecondaryDarkFocus.parameters = {
  pseudo: { focus: true }
}

export const SecondaryDarkDisabled = Template.bind({});
SecondaryDarkDisabled.args = {
  colorMode: ButtonColorMode.dark,
  type: ButtonType.secondary,
  disabled: true
};



export const Flat = Template.bind({});
Flat.args = {
  colorMode: ButtonColorMode.color,
  type: ButtonType.flat
}

export const FlatHover = Template.bind({});
FlatHover.args = {
  colorMode: ButtonColorMode.color,
  type: ButtonType.flat
}
FlatHover.parameters = {
  pseudo: { hover: true }
}

export const FlatActive = Template.bind({});
FlatActive.args = {
  colorMode: ButtonColorMode.color,
  type: ButtonType.flat
}
FlatActive.parameters = {
  pseudo: { active: true }
}

export const FlatFocus = Template.bind({});
FlatFocus.args = {
  colorMode: ButtonColorMode.color,
  type: ButtonType.flat
}
FlatFocus.parameters = {
  pseudo: { focus: true }
}

export const FlatDisabled = Template.bind({});
FlatDisabled.args = {
  colorMode: ButtonColorMode.color,
  type: ButtonType.flat,
  disabled: true
};



export const FlatWhite = Template.bind({});
FlatWhite.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.flat
}

export const FlatWhiteHover = Template.bind({});
FlatWhiteHover.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.flat
}
FlatWhiteHover.parameters = {
  pseudo: { hover: true }
}

export const FlatWhiteActive = Template.bind({});
FlatWhiteActive.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.flat
}
FlatWhiteActive.parameters = {
  pseudo: { active: true }
}

export const FlatWhiteFocus = Template.bind({});
FlatWhiteFocus.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.flat
}
FlatWhiteFocus.parameters = {
  pseudo: { focus: true }
}

export const FlatWhiteDisabled = Template.bind({});
FlatWhiteDisabled.args = {
  colorMode: ButtonColorMode.white,
  type: ButtonType.flat,
  disabled: true
};