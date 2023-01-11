import React from 'react';
import ContextMenuLi from './ContextMenuLi';
import { ComponentStory, ComponentMeta } from '@storybook/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/ContextMenu/Li',
    component: ContextMenuLi,
  } as ComponentMeta<typeof ContextMenuLi>;

const Template: ComponentStory<typeof ContextMenuLi> = args => {
    const [isSelected, setSelected] = React.useState(args.selected);

    const handleClick = () => {
        setSelected(prevState => {
            return !prevState
        });
    }

    return (
        <div style={{width: "244px"}}>
            <ContextMenuLi  {...args}
                            display={args.display}
                            selected={isSelected}
                            handleClick = {handleClick}/>
            <p><small>(Note: the width comes from a wrapper added to this story)</small></p>        
        </div>
    );
}

export const Default = Template.bind({});
Default.args = {
    display: "MenuLi Option"
}

export const Selected = Template.bind({});
Selected.args = {
    display: "Selected Option",
    selected: true
}

export const Hover = Template.bind({});
Hover.args = {
    display: "Hovering!"
}
Hover.parameters = {
    pseudo: {hover: true}
}