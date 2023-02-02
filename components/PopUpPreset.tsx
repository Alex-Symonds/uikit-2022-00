import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import Icon from './Icons';
import {IconXLId} from './IconsExtraLarge';
import { PALETTE, TYPOGRAPHY } from './Theme';
import ButtonLabel from './ButtonLabel';
import { ButtonColorMode, ButtonType } from './Button';
import CircleAroundIcon from './CircleAroundIcon';

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
    background: PALETTE,
    colour: PALETTE,
    iconId: IconXLId,
}

const successTheme : PresetThemeType = {
    background: PALETTE.greenPale,
    colour: PALETTE.green,
    iconId: IconXLId.check,
}

const errorTheme : PresetThemeType = {
    background: PALETTE.redA12,
    colour: PALETTE.redSuper,
    iconId: IconXLId.false,
}

const attentionTheme : PresetThemeType = {
    background: PALETTE.starA12,
    colour: PALETTE.star,
    iconId: IconXLId.attention,
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

const StyledHeading = styled.h4`
    ${TYPOGRAPHY.h4}
    padding-top: .8rem;
`;

const StyledDescription = styled.p`
    ${TYPOGRAPHY.p2}
`;

const StyledButtonContainer = styled.div`
    display: flex;
    gap: 0.7rem;
    padding-top: 1rem;
`;

export default function PopUpPreset({description, heading, mode: type, buttonPrimary, buttonSecondary} : PopUpPresetProps){
    const theme = getTheme(type);

    return <ThemeProvider theme={theme}>
        <StyledLayout>
            <CircleAroundIcon colour={theme.background} size={"6rem"}>
                <Icon idXL={theme.iconId} />
            </CircleAroundIcon>
            <StyledHeading>
                {heading}
            </StyledHeading>
            <StyledDescription>
                {description}
            </StyledDescription>
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
            <ButtonLabel colorMode={ButtonColorMode.color} type={ButtonType.primary} label={buttonPrimary.label} onClick={buttonPrimary.onClick}/>
        }
        {
            buttonSecondary !== undefined &&
            <ButtonLabel colorMode={ButtonColorMode.color} type={ButtonType.secondary} label={buttonSecondary.label} onClick={buttonSecondary.onClick}/>
        }
    </StyledButtonContainer>
}