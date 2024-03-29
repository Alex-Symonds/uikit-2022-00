import React from 'react';
import styled, {ThemeProvider} from 'styled-components';

import { rgba } from '../utils/utils';
import { theme as themeObj } from '../styles/theme';
import { Icon, ICON_ID, ICON_SIZES } from './icons/';

import Button, { ButtonStyle } from './Button';
import CircleAroundIcon from './CircleAroundIcon';
import Heading from './Heading';
import Paragraph from './Paragraph';

export const enum PopUpPresetMode{
    success = "success",
    error = "error",
    attention = "attention"
}

export type PopUpPresetProps = {
    mode : PopUpPresetMode,
    heading : string,
    description : string
    buttonPrimary? : ButtonProps,
    buttonSecondary? : ButtonProps,
}

type ButtonProps = {
    label : string,
    onClick: () => void,
}

type PresetThemeType = {
    background: string,
    colour: string,
    iconId: keyof typeof ICON_ID,
}

const successTheme : PresetThemeType = {
    background: themeObj.color.successBackground,
    colour: themeObj.color.success,
    iconId: ICON_ID.check,
}

const errorTheme : PresetThemeType = {
    background: rgba(themeObj.color.error, themeObj.opacity.translucentBackground),
    colour: themeObj.color.errorEmphasis,
    iconId: ICON_ID.false,
}

const attentionTheme : PresetThemeType = {
    background: rgba(themeObj.color.attention, themeObj.opacity.translucentBackground),
    colour: themeObj.color.attention,
    iconId: ICON_ID.attention,
}

function getTheme(type : PopUpPresetMode){
    switch(type){
        case PopUpPresetMode.success:
            return successTheme;
        case PopUpPresetMode.error:
            return errorTheme;
        case PopUpPresetMode.attention:
            return attentionTheme;
        default:
            return attentionTheme;
    }
}

const StyledLayout = styled.div`
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    gap: 0.5rem;

    svg {
        height: 3.5rem;
        width: 3.5rem;

        path{
            fill: ${props => props.theme.colour};
        }
    }
`;  

const StyledHeading = styled(Heading)`
    padding-top: .8rem;
    text-align: center;
`;

const StyledButtonContainer = styled.div`
    display: flex;
    gap: 0.7rem;
    padding-top: 1rem;
`;

const StyledCircleAroundIcon = styled(CircleAroundIcon)<{bg : string}>`
    background: ${ props => props.bg }
`;

export default function PopUpPreset({description, heading, mode: type, buttonPrimary, buttonSecondary} : PopUpPresetProps){
    const theme = getTheme(type);

    return <ThemeProvider theme={theme}>
        <StyledLayout>
            <StyledCircleAroundIcon bg={theme.background} size={"6rem"}>
                <Icon id={theme.iconId} size={ICON_SIZES.extraLarge} />
            </StyledCircleAroundIcon>
            <StyledHeading level={4}>
                {heading}
            </StyledHeading>
            <Paragraph size={2}>
                {description}
            </Paragraph>
            {(buttonPrimary !== undefined || buttonSecondary !== undefined) &&
                <ButtonContainer buttonPrimary={buttonPrimary} buttonSecondary={buttonSecondary} />
            }
        </StyledLayout>
    </ThemeProvider>

}

function ButtonContainer({buttonPrimary, buttonSecondary} : Pick<PopUpPresetProps, "buttonPrimary" | "buttonSecondary">){
    return <StyledButtonContainer>
        {
            buttonPrimary !== undefined &&
            <Button style={ButtonStyle.primary} label={buttonPrimary.label} onClick={buttonPrimary.onClick}/>
        }
        {
            buttonSecondary !== undefined &&
            <Button style={ButtonStyle.secondary} label={buttonSecondary.label} onClick={buttonSecondary.onClick}/>
        }
    </StyledButtonContainer>
}