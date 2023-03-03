import React from 'react';
import styled from 'styled-components';
import Heading from './Heading';
import Paragraph from './Paragraph';
import Icon from './Icons';
import {IconSmallId} from './IconsSmall';
import {IconMediumId} from './IconsMedium';
import {IconLargeId} from './IconsLarge';
import {IconXLId} from './IconsExtraLarge';
import {ICON_SIZES} from '../utils/Theme';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tooltip, {TOOLTIP_ARROW_POSITION} from './Tooltip';
import { visuallyHidden, visuallyUnhidden } from '../utils/utils';

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

const StyledTooltipContainer = styled.div`
  ${visuallyHidden}
`;

const StyledIconWrapper = styled.div<{iconSize : string}>`
  max-width: ${props => props.iconSize};
  min-width: ${props => props.iconSize};

  position: relative;
  &:hover ${StyledTooltipContainer}{
        ${visuallyUnhidden}
        display: block;
        position: absolute;
        top: -3.1rem;
        left: calc(-1.375rem + (${props => props.iconSize}/2));
  }
`;

const StyledIconSection = styled.section`
    &:not(:first-child){
        margin-top: 2rem;
    }
`;

const Template: ComponentStory<typeof Icon> = args => {
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

type IconSectionProps = {
    iconSize: string,
}
function IconSection({iconSize} : IconSectionProps){
    let {enumToConvert, idS, idM, idL, idXL} = getIconSettings(iconSize);

    return  <StyledIconSection>
                <Heading level={4}>{iconSize}</Heading>
                <StyledIconsContainer>
                {
                    enumToArray(enumToConvert).map((name, index) => {
                        return  <StyledIconWrapper key={index} iconSize={iconSize}>
                                    <Icon   idSmall={idS ? index : undefined}
                                            idMedium={idM ? index : undefined}
                                            idLarge={idL ? index : undefined}
                                            idXL={idXL ? index : undefined} 
                                            />
                                    <StyledTooltipContainer>
                                        <Tooltip text={`${name}`} arrowPos={TOOLTIP_ARROW_POSITION.bottomLeft} />
                                    </StyledTooltipContainer>
                                </StyledIconWrapper>
                    })
                }
                </StyledIconsContainer>
            </StyledIconSection>
}

function getIconSettings(iconSize : string){
    let enumToConvert : any;
    let idS = false;
    let idM = false;
    let idL = false;
    let idXL = false;

    switch(iconSize){
        case ICON_SIZES.medium:
            enumToConvert = IconMediumId;
            idM = true;
            break;
        case ICON_SIZES.small:
            enumToConvert = IconSmallId;
            idS = true;
            break;
        case ICON_SIZES.large:
            enumToConvert = IconLargeId;
            idL = true;
            break;
        case ICON_SIZES.extraLarge:
            enumToConvert = IconXLId;
            idXL = true;
            break;
        default:
            enumToConvert = IconMediumId;
            idM = true;
    }
    return {enumToConvert, idS, idM, idL, idXL};
}

function enumToArray(enumToConvert : any){
    let result =  Object.keys(enumToConvert).filter((key : string | number) => !isNaN(Number(enumToConvert[key])));
    return result;
}

export const All = Template.bind({});