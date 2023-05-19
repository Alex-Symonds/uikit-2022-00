import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';

import { COUNTRY_RADIO_DATA, COUNTRY_CHECKBOX_DATA, TIMEUNIT_CHECKBOX_DATA, TIMEUNIT_RADIO_DATA } from '../../utils/storyData';

import { onChangeRadio, RadioOptionDataType, onChangeCheckbox, CheckboxOptionDataType } from '../form/';

import ContextMenu, { StyledContextMenu } from './ContextMenu';
import ContextRadioGroup from './ContextMenuRadio';
import ContextCheckboxGroup from './ContextMenuCheckbox';


export default {
    title: 'UI Kit/ContextMenu',
    component: ContextMenu,
  } as ComponentMeta<typeof ContextMenu>;

// Wrapper for the "RightClickToView" story
const StyledTarget = styled.div`
    ${({theme}) => theme.typography.p2}
    width: 50vw;
    height: 15vh;
    background: ${ ({theme}) => theme.color.primary };
    padding: 1rem;
    box-sizing: border-box;
    color: ${ ({theme}) => theme.color.textOnPrimary };
`;


// Positioning for the "I just want to see it, don't make me right click things!" stories
const POS_X = 16;
const POS_Y = 16;

export const RightClickRadio: ComponentStory<typeof ContextMenu> = args =>{
    const targetRef = React.useRef<HTMLDivElement>(null);

    const [countries, setCountries] = React.useState<RadioOptionDataType[]>(COUNTRY_RADIO_DATA);

    function changeCountries(id : string, checked : boolean){
        onChangeRadio(id, checked, countries, setCountries);
    }

    const id_countries = React.useId();

    return <>
                <StyledTarget ref={targetRef}>
                    <p>Right click in this square or click the button to open radio context menu</p>
                </StyledTarget>

                <ContextMenu    targetRef = {targetRef}>
                    <ContextRadioGroup  id={id_countries}
                                        options = {countries}
                                        onChange = {changeCountries}
                                        name={"countries"}
                                        legend={"Countries"}
                                        hideLegendVisually={true}
                    />
                </ContextMenu>
            </>
}


export const RightClickCheckbox: ComponentStory<typeof ContextMenu> = args =>{
    const targetRef = React.useRef<HTMLDivElement>(null);

    const [countries, setCountries] = React.useState<CheckboxOptionDataType[]>(COUNTRY_CHECKBOX_DATA.slice(0,2));

    function changeCountries(id : string, checked : boolean){
        onChangeCheckbox(id, checked, countries, setCountries);
    }

    const id_countries = React.useId();

    return <>
                <StyledTarget ref={targetRef}>
                    <p>Right click in this square or click the button to open radio context menu</p>
                </StyledTarget>
    
                <ContextMenu    targetRef = {targetRef}>
                    <ContextCheckboxGroup   id={id_countries}
                                            options = {countries}
                                            onChange = {changeCountries}
                                            legend={"Countries"}
                                            hideLegendVisually={true}
                    />
                </ContextMenu>
            </>
}


export const MultipleRadio: ComponentStory<typeof ContextMenu> = args => {
    const [countries, setCountries] = React.useState<RadioOptionDataType[]>(COUNTRY_RADIO_DATA.slice(0,2));
    const [timeUnits, setTimeUnits] = React.useState<RadioOptionDataType[]>(TIMEUNIT_RADIO_DATA);

    function changeCountries(id : string, checked : boolean){
        onChangeRadio(id, checked, countries, setCountries);
    }

    function changeTimeUnits(id : string, checked : boolean){
        onChangeRadio(id, checked, timeUnits, setTimeUnits);
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
        onChangeCheckbox(id, checked, countries, setCountries);
    }

    function changeTimeUnits(id : string, checked : boolean){
        onChangeCheckbox(id, checked, timeUnits, setTimeUnits);
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
