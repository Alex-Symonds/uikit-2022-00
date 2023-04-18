import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled, {ThemeProvider} from 'styled-components';

import { TYPOGRAPHY, PALETTE } from '../utils/Theme';

import { IconSmallId, IconMediumId } from './icons';

import Button, { ButtonStyle } from './Button';
import Paragraph from './Paragraph';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const LABEL = "Кнопка";
const ICON = { idMedium: IconMediumId.plus };
const LONG_LABEL : string = "Very very very long label text which goes on and on and on, probably exceeding the space available. Blah blah blah, see how this button label waffles. ";

export default {
    title: 'UI Kit/Button',
    component: Button,
    args: {
        label: LABEL,
        onClick: () => console.log("Click!")
    }
  } as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;
export const Default = Template.bind({});

export const Responsive = Template.bind({});
Responsive.args = {
    label: "A button is allowed to fill the width of its container, but then the label will line-wrap, because why not have a verbose button if you are so inclined? Perhaps it's explaining what it does in excruciating detail. " + LONG_LABEL + LONG_LABEL + LONG_LABEL + LONG_LABEL
}

const ButtonStoryHeading = styled.h1`
    ${TYPOGRAPHY.h5}
    color: ${props => props.theme.darkMode ? PALETTE.white : PALETTE.black };
`;

const StyledStoryTable = styled.table`
  margin-top: 1rem;

  th{
    ${TYPOGRAPHY.h6}
    font-size: 0.75rem;
    font-weight: 400;
    color: ${props => props.theme.darkMode ? PALETTE.white_faded : PALETTE.black_faded };
    text-align: left;
    padding: 0.375rem;
  }

  td{
    padding: 0.375rem;
  }

  tr td:nth-of-type(3){
    padding: 0.375rem 0.375rem 0.375rem 0.1rem;
  }
`;

const StyledSideLabel = styled.td`
    ${TYPOGRAPHY.h6}
    font-size: 0.75rem;
    color: ${props => props.theme.darkMode ? PALETTE.white_faded : PALETTE.black_faded };
`;

const TableTemplate: ComponentStory<typeof Button> = args => {
    const darkMode = args.style === ButtonStyle.flatWhite || args.style === ButtonStyle.primaryWhite || args.style === ButtonStyle.secondaryWhite;

    return  <ThemeProvider theme={{darkMode: darkMode}}>
                <ButtonStoryHeading>
                    {args.style}
                </ButtonStoryHeading>
                <StyledStoryTable>
                    <thead>
                        <tr><th>Label</th><th>Label + Icon</th><th>Icon</th><th>Icon Circle</th><th></th></tr>
                    </thead>
                    <tbody>
                        <RowOfButtons rowLabel={"Default"}  args={args}  />
                        <RowOfButtons rowLabel={"Hover"}    args={args}  id={"hover"} />
                        <RowOfButtons rowLabel={"Active"}   args={args}  id={"active"} />
                        <RowOfButtons rowLabel={"Focus"}    args={args}  id={"focus"} />
                        <RowOfButtons rowLabel={"Disabled"} args={ { ...args, disabled: true } }  />
                        <RowOfButtons rowLabel={"Loader"}   args={ { ...args, loader: true }  } />
                    </tbody>
                </StyledStoryTable>
            </ThemeProvider>

};

function RowOfButtons({args, id, rowLabel} : any){
    return  <tr id={id}>
                <td>
                    <Button {...args} label={LABEL} />
                </td>
                <td>
                    <Button {...args} label={LABEL} icon={ICON}/>
                </td>
                <td>
                    <Button {...args} label={"Add"} icon={ICON} hideLabelVisually />
                </td>
                <td>
                    <Button {...args} label={"Add"} icon={ICON} circle />
                </td>
                <StyledSideLabel>
                    {rowLabel}
                </StyledSideLabel>
            </tr>
}

export const Primary = TableTemplate.bind({});
Primary.args = {
    style: ButtonStyle.primary,
}
Primary.parameters = {
    pseudo: {
        hover: ["#hover"],
        active: ["#active"],
        focus: ["#focus"],
    }
}

export const PrimaryWhite = TableTemplate.bind({});
PrimaryWhite.args = {
    style: ButtonStyle.primaryWhite
}
PrimaryWhite.parameters = {
    ...Primary.parameters,
    backgrounds: { default: 'dark', },
}

export const Secondary = TableTemplate.bind({});
Secondary.args = {
    style: ButtonStyle.secondary
}
Secondary.parameters = {
    ...Primary.parameters
}

export const SecondaryWhite = TableTemplate.bind({});
SecondaryWhite.args = {
    style: ButtonStyle.secondaryWhite
}
SecondaryWhite.parameters = {
    ...PrimaryWhite.parameters
}

export const Flat = TableTemplate.bind({});
Flat.args = {
    style: ButtonStyle.flat
}
Flat.parameters = {
    ...Primary.parameters
}

export const FlatWhite = TableTemplate.bind({});
FlatWhite.args = {
    style: ButtonStyle.flatWhite
}
FlatWhite.parameters = {
    ...PrimaryWhite.parameters
}

export const SecondaryDark = TableTemplate.bind({});
SecondaryDark.args = {
    style: ButtonStyle.secondaryDark
}
SecondaryDark.parameters = {
    ...Primary.parameters
}



const StyledStoryTableFallbacks = styled(StyledStoryTable)`
    th, td{
        border: 2px solid ${PALETTE.black_faded};
        padding: 0.375rem 0.5rem;
    }

    td{
        ${TYPOGRAPHY.p3}
    }

    tr td:nth-of-type(3){
        padding: 0.375rem 0.5rem;
    }

`;

const StyledBullets = styled.ul`
    ${TYPOGRAPHY.p3}
    list-style-type: disc;

    margin-left: 1rem;
`;

const FallbackTemplate: ComponentStory<typeof Button> = args => {

    return <>
            <ButtonStoryHeading>
                Fallbacks for Invalid Content Settings
            </ButtonStoryHeading>
            <Paragraph size={3}>
                <b>Note:</b> All buttons require a valid label for screenreaders, even if it&apos;s not visually displayed.
            </Paragraph>
            <StyledStoryTableFallbacks>
                    <thead>
                        <tr><th>Button</th><th>Label</th><th>Icon</th><th>Flag</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr><td><Button {...args} label={""} /></td>
                            <td>invalid</td>
                            <td>missing</td>
                            <td></td>
                        </tr>
                        <tr><td><Button {...args} hideLabelVisually label={""} /></td>
                            <td>invalid</td>
                            <td>missing</td>
                            <td>hideLabelVisually</td>
                        </tr>
                        <tr><td><Button {...args} circle label={""} /></td>
                            <td>invalid</td>
                            <td>missing</td>
                            <td>circle</td>
                        </tr>
                        <tr><td><Button {...args} label={""} icon={{idSmall: IconSmallId.arrowLeft}}/></td>
                            <td>invalid</td>
                            <td>ok</td>
                            <td></td>
                        </tr>
                        <tr><td><Button {...args} hideLabelVisually label={""} icon={{idSmall: IconSmallId.arrowLeft}}/></td>
                            <td>invalid</td>
                            <td>ok</td>
                            <td>hideLabelVisually</td>
                        </tr>
                        <tr><td><Button {...args} circle label={""} icon={{idSmall: IconSmallId.arrowLeft}}/></td>
                            <td>invalid</td>
                            <td>ok</td>
                            <td>circle</td>
                        </tr>
                        <tr><td><Button {...args} hideLabelVisually label={"Valid"} /></td>
                            <td>ok</td>
                            <td>missing</td>
                            <td>hideLabelVisually</td>
                        </tr>
                        <tr><td><Button {...args} circle label={"Valid"} /></td>
                            <td>ok</td>
                            <td>missing</td>
                            <td>circle</td>
                        </tr>
                    </tbody>
                </StyledStoryTableFallbacks>

            </>
}
export const Fallbacks = FallbackTemplate.bind({});