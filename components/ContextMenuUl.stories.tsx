import React from 'react';
import ContextMenuUl from './ContextMenuUl';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MenuItemProps } from './ContextMenuLi';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/ContextMenu/Ul',
    component: ContextMenuUl,
  } as ComponentMeta<typeof ContextMenuUl>;


const Template: ComponentStory<typeof ContextMenuUl> = args => {
    const [isRussia, setIsRussia] = React.useState(false);
    const [isUSA, setIsUSA] = React.useState(true);
    const [isGermany, setIsGermany] = React.useState(false);

    const clickRussia = () => {
        onClick(setIsRussia);
    }

    const clickUSA = () => {
        onClick(setIsUSA);
    }

    const clickGermany = () => {
        onClick(setIsGermany);
    }

    const onClick = (setter : React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(prevState => {return !prevState})
    }

    const getStoryStateAsListItems = () => {
        let result = new Array<MenuItemProps>;

        result.push({ display: "Russia", selected: isRussia, handleClick: clickRussia});
        result.push({ display: "USA", selected: isUSA, handleClick: clickUSA});
        result.push({ display: "Germany", selected: isGermany, handleClick: clickGermany});

        return result;
    }

    return (
        <div style={{width: "244px"}}>
            <ContextMenuUl {...args}
                            listItems = {getStoryStateAsListItems()} />
            <p><small>(Note: the width comes from a wrapper added to this story)</small></p>
        </div>
        )
};

export const Default = Template.bind({});

export const Headed = Template.bind({});
Headed.args = {
    heading: "Country"
}