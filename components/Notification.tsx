import React from 'react';
import styled from 'styled-components';
import { PALETTE, TYPOGRAPHY, SHADOW } from '../utils/Theme';
import CircleContainer from './CircleAroundIcon';
import Button, {ButtonStyle} from './Button';
import Icon from './Icons';
import { IconMediumId } from './IconsMedium';

const BREAKPOINT_MOBILE = "425px";

const StyledLayout = styled.div<{hasAll : boolean}>`
    display: grid;
    grid-template-columns: auto 3.5rem;
    grid-template-rows: auto auto;
    grid-template-areas: 
        "text icon"
        "buttons buttons";
    gap: ${props => props.hasAll ? "1.25rem" : "0"};

    @media (max-width: ${BREAKPOINT_MOBILE}) {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 3.5rem auto auto;
        grid-template-areas: 
            "icon"
            "text"
            "buttons";
        gap: 0.75rem;
    }
`;

const StyledButtonsContainer = styled.div`
    display: flex;
    gap: 0.55rem;
    grid-area: buttons;
`;

const StyledDescription = styled.p`
    ${TYPOGRAPHY.p2}
    align-items: center;
    display: flex;
`;

const StyledHeading = styled.h3`
    ${TYPOGRAPHY.p1}
    font-weight: bold;
`;

const StyledIconContainer = styled.div<{fillColor : PALETTE}>`
    grid-area: icon;

    svg path{
        fill: ${props => props.fillColor}
    }
`;

const StyledNotification = styled.div`
    background: white;
    border-radius: 0.5rem;
    box-shadow: ${SHADOW.default};
    left: 0.4375rem;
    max-width: calc(100vw - (0.4375rem * 2));
    padding: 1.25rem;
    position: fixed;
    top: 0.4375rem;
    width: 24.625rem;
    z-index: 999;

    @media (max-width: ${BREAKPOINT_MOBILE}){
        padding: 0.8rem 4rem 0.05rem 0.8rem;
    }
`;

const StyledTextContent = styled.div<{hasHeading : boolean}>`
    display: flex;
    flex-direction: column;
    grid-area: text;
    justify-content: ${props => props.hasHeading ? "flex-start" : "center"};
    row-gap: 0.5rem;
`;

export const enum NotificationType{
    success = "success",
    error = "error",
    info = "info"
};

interface I_NotificationProps{
    type: NotificationType,
    heading?: string,
    description?: string,
    buttonActions?: ButtonActionsType
}

type ButtonActionsType = {
    clickClose: () => void,
    clickHelp: () => void
}


export default function Notification({type, heading, description, buttonActions} : I_NotificationProps){
    const hasHeading = heading !== undefined && heading !== "";
    let hasDescription = description !== undefined && description !== "";

    if(!hasHeading && !hasDescription){
        description = "Notification!";
        hasDescription = true;
    }
    
    return  <StyledNotification>
                <StyledLayout hasAll={hasHeading && hasDescription && buttonActions !== undefined}>
                    <NotificationIcon type={type} />
                    <StyledTextContent hasHeading={hasHeading}>
                    {
                        hasHeading &&
                        <StyledHeading>
                            {heading}
                        </StyledHeading>
                    }
                    {
                        (hasDescription || !hasHeading) && 
                        <StyledDescription>
                            {description}
                        </StyledDescription>
                    }
                    </StyledTextContent>
                    {
                        buttonActions !== undefined &&
                        <Buttons clickClose={buttonActions.clickClose} clickHelp={buttonActions.clickHelp} />
                    }
                </StyledLayout>
            </StyledNotification>
}


function Buttons({clickClose, clickHelp} : ButtonActionsType){
    return  <StyledButtonsContainer>
                <Button     style={ButtonStyle.secondary}
                            label={"Close"}
                            onClick={clickClose}
                />
                <Button     style={ButtonStyle.flat}
                            label={"Help"}
                            onClick={clickHelp}
                />
            </StyledButtonsContainer>
}

function NotificationIcon({type} : Pick<I_NotificationProps, "type">){
    const settings = getIconSettings(type);
    return  <StyledIconContainer fillColor = {settings.fillColor} >
                <CircleContainer colour={ settings.background } size="3.5rem">
                    <Icon idMedium={settings.iconId} />
                </CircleContainer>
            </StyledIconContainer>
}

function getIconSettings(type : NotificationType) : { background : PALETTE, fillColor: PALETTE, iconId: IconMediumId }{
    switch(type){
        case NotificationType.success:
            return {
                background: PALETTE.green_fadedBackground,
                fillColor: PALETTE.green,
                iconId: IconMediumId.check,
            }
        
        case NotificationType.error:
            return {
                background: PALETTE.redGirl,
                fillColor: PALETTE.red,
                iconId: IconMediumId.close,
            }
        
        case NotificationType.info:
            return {
                background: PALETTE.disabled,
                fillColor: PALETTE.primary,
                iconId: IconMediumId.info,
            }
        
        default:
            return {
                background: PALETTE.disabled,
                fillColor: PALETTE.primary,
                iconId: IconMediumId.info,
            }
    }
}

