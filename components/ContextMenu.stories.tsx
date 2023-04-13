import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';

import {    ContextMenu, StyledContextMenu,
            ContextMenuRadio as ContextRadioGroup, RadioOptionDataType,
            ContextMenuCheckbox as ContextCheckboxGroup, CheckboxOptionDataType,
            } from './';
import { changeRadio, changeCheckbox } from '../utils/utils';
import { TYPOGRAPHY } from '../utils/Theme';
import { COUNTRY_RADIO_DATA, COUNTRY_CHECKBOX_DATA, TIMEUNIT_CHECKBOX_DATA, TIMEUNIT_RADIO_DATA } from '../utils/storyData';

export default {
    title: 'UI Kit/ContextMenu',
    component: ContextMenu,
  } as ComponentMeta<typeof ContextMenu>;

// Wrapper for the "RightClickToView" story
const PARENT_COLOUR = "yellow"; // This is also inserted in the middle of a human-readable sentence, so maybe avoid hex/RGB etc.
const StyledContainer = styled.div`
    ${TYPOGRAPHY.p2}
    width: 50vw;
    height: 10vh;
    background: ${PARENT_COLOUR};
    padding: 1rem;
    box-sizing: border-box;
`;

// Positioning for the "I just want to see it, don't make me right click things!" stories
const POS_X = 16;
const POS_Y = 16;

export const RightClickRadio: ComponentStory<typeof ContextMenu> = args =>{
    const containerRef = React.useRef<HTMLDivElement>(null);

    const [countries, setCountries] = React.useState<RadioOptionDataType[]>(COUNTRY_RADIO_DATA);

    function changeCountries(id : string, checked : boolean){
        changeRadio(id, checked, countries, setCountries);
    }

    const id_countries = React.useId();

    return <StyledContainer ref={containerRef}>
                <p>Right click in the {PARENT_COLOUR} area to open context menu</p>
                <ContextMenu    parentRef = {containerRef}>
                    <ContextRadioGroup  id={id_countries}
                                        options = {countries}
                                        onChange = {changeCountries}
                                        name={"countries"}
                                        legend={"Countries"}
                                        hideLegendVisually={true}
                    />
                </ContextMenu>
            </StyledContainer>
}


export const MultipleRadio: ComponentStory<typeof ContextMenu> = args => {
    const [countries, setCountries] = React.useState<RadioOptionDataType[]>(COUNTRY_RADIO_DATA.slice(0,2));
    const [timeUnits, setTimeUnits] = React.useState<RadioOptionDataType[]>(TIMEUNIT_RADIO_DATA);

    function changeCountries(id : string, checked : boolean){
        changeRadio(id, checked, countries, setCountries);
    }

    function changeTimeUnits(id : string, checked : boolean){
        changeRadio(id, checked, timeUnits, setTimeUnits);
    }

    const id_countries = React.useId();
    const id_timeUnits = React.useId();

    return <StyledContextMenu x={POS_X} y={POS_Y}>
                    <ContextRadioGroup  id={id_timeUnits}
                                        options = {timeUnits}
                                        onChange = {changeTimeUnits}
                                        name={"timeUnits"}
                                        legend={"Time"}
                    />
                    <ContextRadioGroup  id={id_countries}
                                        options = {countries}
                                        onChange = {changeCountries}
                                        name={"countries"}
                                        legend={"Countries"}
                    />
            </StyledContextMenu>
};


export const MultipleCheckbox: ComponentStory<typeof ContextMenu> = args => {
    const [countries, setCountries] = React.useState<CheckboxOptionDataType[]>(COUNTRY_CHECKBOX_DATA.slice(0,2));
    const [timeUnits, setTimeUnits] = React.useState<CheckboxOptionDataType[]>(TIMEUNIT_CHECKBOX_DATA);

    function changeCountries(id : string, checked : boolean){
        changeCheckbox(id, checked, countries, setCountries);
    }

    function changeTimeUnits(id : string, checked : boolean){
        changeCheckbox(id, checked, timeUnits, setTimeUnits);
    }

    const id_countries = React.useId();
    const id_timeUnits = React.useId();

    return  <StyledContextMenu x={POS_X} y={POS_Y}>
                    <ContextCheckboxGroup   id={id_timeUnits}
                                            options = {timeUnits}
                                            onChange = {changeTimeUnits}
                                            legend={"Time"}
                    />
                    <ContextCheckboxGroup   id={id_countries}
                                            options = {countries}
                                            onChange = {changeCountries}
                                            legend={"Countries"}
                    />
            </StyledContextMenu>
};
