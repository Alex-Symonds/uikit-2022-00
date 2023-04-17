import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputTags from './InputTags';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Input/Tags',
    component: InputTags,
    args: {
      label: "Your name"
    }
  } as ComponentMeta<typeof InputTags>;

const BasicTemplate: ComponentStory<typeof InputTags> = args => <InputTags {...args} />;

const ControlledTemplate: ComponentStory<typeof InputTags> = args => {
  const [tagInput, setTagInput] = React.useState("");
  const [tagList, setTagList] = React.useState<string[]>(args.tags);

  function removeTag(tagText : string){
    const idx = tagList.findIndex(ele => ele === tagText);
    if(idx === -1){
      return;
    }

    setTagList(prevState => [
      ...prevState.slice(0, idx),
      ...prevState.slice(idx + 1)
    ]);
  }

  function handleChange(value : string){
    if(value.includes(" ")){
      const newValue = value.replace(" ", "");

      setTagList(prevState => {
        if(prevState === undefined){
          return [newValue];
        }

        return [
          ...prevState,
          newValue
        ]
    });

      setTagInput("");
      return;
    }
    setTagInput(value);
  }

  return <InputTags {...args}
                    tags = {tagList}
                    value = {tagInput}
                    removeTag = {removeTag}
                    handleChange = {handleChange} />;
}

const TAGS_FOR_FILLED = ["Tag", "Tag", "Tag", "Tag", "Tag", "Tag"];
const TAGS_FOR_OVERFLOW = [
  ...TAGS_FOR_FILLED,
  "Taggity",
  "Tag",
  "Tag",
  "Tag"
]

export const Default = ControlledTemplate.bind({});

export const Hover = ControlledTemplate.bind({});
Hover.parameters = {
  pseudo: {hover: true}
}

export const Filled = ControlledTemplate.bind({});
Filled.args = {
  tags: TAGS_FOR_FILLED
}

export const Overflow = ControlledTemplate.bind({});
Overflow.args = {
  tags: TAGS_FOR_OVERFLOW
}

export const Disabled = BasicTemplate.bind({});
Disabled.args = {
  disabled: true
}

export const DisabledFilled = BasicTemplate.bind({});
DisabledFilled.args = {
  ...Disabled.args,
  tags: TAGS_FOR_FILLED
}

export const DisabledOverflow = BasicTemplate.bind({});
DisabledOverflow.args = {
  ...Disabled.args,
  tags: TAGS_FOR_OVERFLOW
}

export const ReadOnly = BasicTemplate.bind({});
ReadOnly.args = {
  readOnly: true,
  tags: TAGS_FOR_FILLED
}

export const ReadOnlyOverflow = BasicTemplate.bind({});
ReadOnlyOverflow.args = {
  readOnly: true,
  tags: TAGS_FOR_OVERFLOW
}

// export const ActiveEmpty = ControlledTemplate.bind({});
// ActiveEmpty.parameters = {
//   pseudo: {active: true}
// }

// export const ActiveFilled = ControlledTemplate.bind({});
// ActiveFilled.args = {
//   ...Filled.args
// }
// ActiveFilled.parameters = {
//   pseudo: {active: true}
// }

export const ErrorEmpty = ControlledTemplate.bind({});
ErrorEmpty.args = {
  errorMsg: "Текст ошибки"
}

export const ErrorFilled = ControlledTemplate.bind({});
ErrorFilled.args = {
  ...Filled.args,
  ...ErrorEmpty.args
}

export const ErrorFilledActive = ControlledTemplate.bind({});
ErrorFilledActive.args = {
  ...ErrorFilled.args
}
ErrorFilledActive.parameters = {
  pseudo: {active: true}
}

export const Description = ControlledTemplate.bind({});
Description.args = {
  description: "Введите свое имя"
}



