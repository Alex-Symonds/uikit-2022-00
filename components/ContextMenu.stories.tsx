import React from 'react';
import ContextMenu from './ContextMenu';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContextUl from './ContextMenuUl';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/ContextMenu',
    component: ContextMenu,
  } as ComponentMeta<typeof ContextMenu>;


// Custom context menu requires an event listener on its parent to listen for right click.
// 
import styled from 'styled-components';
const StyledContainer = styled.div`
    width: 100vw;
    height: 100vh;
`;

const Template: ComponentStory<typeof ContextMenu> = args => {
    const containerRef = React.useRef<HTMLDivElement>(null);

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

    return <StyledContainer ref={containerRef}>
                <p>Right click to open context menu.</p>
                <ContextMenu    parentRef = {containerRef}>
                    <ContextUl 
                        listItems = {[
                            { display: "Russia", handleClick: clickRussia, selected: isRussia },
                            { display: "USA", handleClick: clickUSA, selected: isUSA },
                            { display: "Germany", handleClick: clickGermany, selected: isGermany }
                        ]}
                    />
                </ContextMenu>
            </StyledContainer>
};

export const Default = Template.bind({});



const TemplateMultiply: ComponentStory<typeof ContextMenu> = args => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const [isRussia, setIsRussia] = React.useState(false);
    const [isUSA, setIsUSA] = React.useState(true);

    const [isDays, setIsDays] = React.useState(false);
    const [isWeeks, setIsWeeks] = React.useState(true);
    const [isYears, setIsYears] = React.useState(false);

    const clickRussia = () => {
        onClick(setIsRussia);
    }

    const clickUSA = () => {
        onClick(setIsUSA);
    }

    const clickDays = () => {
        onClick(setIsDays);
    }

    const clickWeeks = () => {
        onClick(setIsWeeks);
    }

    const clickYears = () => {
        onClick(setIsYears);
    }

    const onClick = (setter : React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(prevState => {return !prevState})
    }

    return <StyledContainer ref={containerRef}>
                <p>Right click to open context menu</p>
                <ContextMenu    parentRef = {containerRef}>
                    <ContextUl
                        heading = "Time"
                        listItems = {[
                            { display: "Days", handleClick: clickDays, selected: isDays },
                            { display: "Weeks", handleClick: clickWeeks, selected: isWeeks },
                            { display: "Years", handleClick: clickYears, selected: isYears }
                        ]}
                    />
                    <ContextUl
                        heading = "Country"
                        listItems = {[
                            { display: "Russia", handleClick: clickRussia, selected: isRussia },
                            { display: "USA", handleClick: clickUSA, selected: isUSA }
                        ]}
                    />
                </ContextMenu>
            </StyledContainer>
};

export const Multiply = TemplateMultiply.bind({});