import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';

import Icon from './Icon';
import { ICON_ID, ICON_SIZES } from './IconRecords';

import {
        Heading, Paragraph, 
            } from '..';
import {
        TooltipWrapper, TOOLTIP_MODE, POINTS_TO
            } from '../tooltip';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/Icon',
    component: Icon,
  } as ComponentMeta<typeof Icon>;

const StyledIconsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 0.2rem 1rem;

    margin-top: 0.75rem;
    width: 47.5rem;
    max-width: calc(100% - 2rem);
`;

const StyledIconSection = styled.section`
    &:not(:first-child){
        margin-top: 2rem;
    }
`;

const AllIconsTemplate: ComponentStory<typeof Icon> = args => {
    return  <>
                <Heading level={2}>Icons</Heading>
                <Paragraph>(Hover over an icon to see its enum ID)</Paragraph>
                {
                    Object.entries(ICON_SIZES).map(([k, v], index) => {
                        return <IconSection iconSize={v} key={index} />
                    })
                }
            </>
}

type T_IconSizesValue = typeof ICON_SIZES[keyof typeof ICON_SIZES];
type IconSectionProps = {
    iconSize:  T_IconSizesValue,
}

function IconSection({iconSize} : IconSectionProps){
    let validIconData = IdsInFigmaOrder[iconSize];

    return  <StyledIconSection>
                <Heading level={4}>{iconSize} {getHeading(iconSize)}</Heading>
                <StyledIconsContainer>
                {
                    validIconData.map((name, index) => {
                        let content = <Icon id={name} size={iconSize} />;

                        if(!content){
                            return null;
                        }

                        return  <TooltipWrapper key={index} 
                                                text={`${name}`} 
                                                pointTo={POINTS_TO.center} 
                                                mode={TOOLTIP_MODE.aboveWithArrowLeft}
                                                >
                                    {content}
                                </TooltipWrapper>
                    })
                }
                </StyledIconsContainer>
            </StyledIconSection>
}

function getHeading(iconSize : T_IconSizesValue){
    let heading : string = "";

    switch(iconSize){
        case ICON_SIZES.medium:
            heading = "(Medium)";
            break;
        case ICON_SIZES.small:
            heading = "(Small)";
            break;
        case ICON_SIZES.large:
            heading = "(Large)";
            break;
        case ICON_SIZES.extraLarge:
            heading = "(Extra Large / XL)";
            break;
    }
    return heading;
}

export const All = AllIconsTemplate.bind({});


const IdsInFigmaOrder = {
    [ICON_SIZES.small]: [   
        ICON_ID.loader,
        ICON_ID.arrowDown,
        ICON_ID.arrowRight,
        ICON_ID.check,
        ICON_ID.minus,
        ICON_ID.arrowLeft,
        ICON_ID.musicOff,
        ICON_ID.musicOn,
        ICON_ID.eyeOpen,
        ICON_ID.eyeClosed,
        ICON_ID.plus,
        ICON_ID.filter,
        ICON_ID.phone,
        ICON_ID.copy,
        ICON_ID.volumeMute,
        ICON_ID.volumeOn,
        ICON_ID.starEmpty,
        ICON_ID.starFilled,
        ICON_ID.close,
        ICON_ID.contextMenu,
    ],
    [ICON_SIZES.medium]: [
        ICON_ID.copy,
        ICON_ID.lock,
        ICON_ID.pen,
        ICON_ID.video,
        ICON_ID.student,
        ICON_ID.progressCircle0,
        ICON_ID.progressCircle25,
        ICON_ID.progressCircle50,
        ICON_ID.progressCircle100,
        ICON_ID.info,
        ICON_ID.musicOn,
        ICON_ID.musicOff,
        ICON_ID.file,
        ICON_ID.plus,
        ICON_ID.volumeMute,
        ICON_ID.volumeOn,
        ICON_ID.starEmpty,
        ICON_ID.starFilled,
        ICON_ID.link,
        ICON_ID.check,
        ICON_ID.arrowDown,
        ICON_ID.arrowUp,
        ICON_ID.search,
        ICON_ID.close,
        ICON_ID.closeBig,
        ICON_ID.loader,
        ICON_ID.profile,
        ICON_ID.burger,
        ICON_ID.filter,
        ICON_ID.freeTest,
        ICON_ID.catalogueCourse,
        ICON_ID.help,
        ICON_ID.eyeOpen,
        ICON_ID.eyeClosed,
        ICON_ID.vk,
        ICON_ID.facebook,
        ICON_ID.google,
        ICON_ID.people,
        ICON_ID.subjectMathematics,
        ICON_ID.subjectEnglish,
        ICON_ID.subjectSociology,
        ICON_ID.subjectPhysics,
        ICON_ID.subjectBiology,
        ICON_ID.subjectHistory,
        ICON_ID.subjectChemistry,
        ICON_ID.subjectComputing,
        ICON_ID.subjectLiterature,
        ICON_ID.subjectGeography,
        ICON_ID.subjectLangEn,
        ICON_ID.subjectLangDe,
        ICON_ID.subjectLangFr,
        ICON_ID.subjectLangEs,
        ICON_ID.subjectEconomics,
        ICON_ID.subjectRobotics,
        ICON_ID.default,
    ],
    [ICON_SIZES.large]: [
        ICON_ID.vk,
        ICON_ID.facebook,
        ICON_ID.google,
        ICON_ID.close,
        ICON_ID.telegram,
        ICON_ID.whatsapp,
        ICON_ID.viber,
        ICON_ID.instagram,
        ICON_ID.phone,
        ICON_ID.web,
    ],
    [ICON_SIZES.extraLarge]: [
        ICON_ID.searchFalse,
        ICON_ID.check,
        ICON_ID.false,
        ICON_ID.play,
        ICON_ID.attention,
    ],
}

const Template: ComponentStory<typeof Icon> = args => <Icon {...args} />;
export const NonExistentSize = Template.bind({});
NonExistentSize.args = {
    id: ICON_ID.searchFalse,
    size: ICON_SIZES.medium,
}

export const NoSize = Template.bind({});
NoSize.args = {
    id: ICON_ID.searchFalse,
}

export const NoID = Template.bind({});
NoID.args = {
}