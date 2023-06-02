import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { SUBJECT } from '../utils/subjects';
import { rgba } from '../utils/utils';

import { Icon, ICON_ID, ICON_SIZES, getIconIdFromSubject } from './icons/';

import Button, { ButtonStyle } from './Button';
import Badge, { BadgeType } from './Badge';
import Heading from './Heading';
import Paragraph from './Paragraph';


const StyledIsland = styled.div.attrs({
    decorativeCircleDia: 13.875,
})`
    background: ${ ({theme}) => theme.color.primary };
    border-radius: 0.5rem;
    min-height: 12.5rem;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    width: ${getDefaultIslandWidth()};

    &::before{
        aspect-ratio: 1/1;
        background: ${ ({theme}) => theme.color.white };
        border-radius: 100%;
        content: '';
        display: block;
        opacity: 24%;
        position: absolute;
        top: -${({decorativeCircleDia}) => decorativeCircleDia / 2}rem;
        right: -${({decorativeCircleDia}) => decorativeCircleDia / 2}rem;
        width: ${({decorativeCircleDia}) => decorativeCircleDia}rem;        
    }
`;

const StyledProgressBar = styled.div<Pick<I_IslandProps, "progress">>`
    align-items: center;
    display: flex;
    height: 1.5rem;
    padding-left: 1.25rem;
    position: relative;
    z-index: 2;
    
    &::before{
        background: ${ ({theme}) => theme.color.progressOnPrimary };
        content: '';
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: ${props => props.progress}%;
        z-index: -1;
    }
`;

const StyledProgressText = styled(Paragraph)`
    color: ${ ({theme}) => theme.color.textOnPrimary };
`;

const StyledSubjectContainer = styled.div`
    position: absolute;
    right: 1.5rem;
    top: 2rem;

    svg{
        display: block;
        height: 36px;
        width: 36px;
        
        path{
            fill: ${ ({theme}) => theme.color.textOnPrimary };
        }
    }
`;

const StyledLayout = styled.div`
    display: grid;
    gap: ${props => props.theme.layoutGap};
    grid-template-areas: 
        "badge badge"
        "heading heading"
        "desc desc"
        "button studentReq"
        "button penReq";
    grid-template-columns: max-content 1fr;
    grid-template-rows: auto auto 1fr auto auto;
    margin-top: ${props => props.theme.layoutMarginTop};
    max-width: 100%;
    min-height: ${props => props.theme.layoutHeight};
    padding: 0.75rem 1.25rem ${props => props.theme.layoutPaddingBottom} 1.25rem;


    @media screen and (min-width: ${getDefaultIslandWidth()}){
        grid-template-areas: 
            "badge badge badge"
            "heading heading heading"
            "desc desc desc"
            "button studentReq penReq";
        grid-template-columns: max-content max-content 1fr;
        grid-template-rows: auto auto 1fr auto;
    }
`;

const StyledHead = styled(Heading)`
    color: ${ ({theme}) => theme.color.textOnPrimary };
    grid-area: heading;
`;

const StyledDescription = styled(Paragraph)`
    color: ${ ({theme}) => rgba(theme.color.textOnPrimary, theme.opacity.subtleTextOnPrimary) };
    grid-area: desc;
    height: 100%;
    overflow: hidden;
`;

const StyledButtonContainer = styled.div`
    grid-area: button;
    padding-right: 0.75rem;
`;

const StyledReq = styled.div.attrs( props => ({
    textColor: rgba(props.theme.color.textOnPrimary, props.theme.opacity.subtleTextOnPrimary),
}))`
    ${ ({theme}) => theme.typography.p2 }
    align-items: center;
    color: ${ props => props.textColor };
    display: flex;
    height: 100%;
    svg path{
        fill: ${ props => props.textColor };
    }
`;

const StyledReqStudent = styled(StyledReq)`
    gap: 0.25rem;
    grid-area: studentReq;
`;

const StyledReqPen = styled(StyledReq)`
    gap: 0.2rem;
    grid-area: penReq;
`;

function getDefaultIslandWidth() : string{
    return "25.125rem"
}

type ThemeProps = {
    layoutHeight : string,
    layoutPaddingBottom : string,
    layoutMarginTop : string,
    layoutGap : string
};

const DefaultTheme : ThemeProps = {
    layoutHeight : "12rem",
    layoutPaddingBottom : "1.2rem",
    layoutMarginTop : "0.5rem",
    layoutGap: "0.3rem 0.8rem",
}

const InProgressTheme : ThemeProps = {
    layoutHeight : "13rem",
    layoutPaddingBottom : "1.25rem",
    layoutMarginTop : "0",
    layoutGap: "0.25rem 0.8rem"
}

interface I_IslandProps{
    progress? : number,
    subject : SUBJECT,
    text : string,
    heading : string,
    description : string,
    buttonLabel? : string,
    studentReq : string,
    penReq : string,
    onClick : () => void
}

export default function Island({progress, subject, text, heading, description, buttonLabel, studentReq, penReq, onClick} : I_IslandProps){
    const isInProgress = progress !== undefined;
    const theme = isInProgress ? InProgressTheme : DefaultTheme;

    if(buttonLabel === undefined){
        buttonLabel = isInProgress ? "Continue" : "Begin";
    }

    return  <ThemeProvider theme={theme}>
        <StyledIsland>
            {
                isInProgress &&
                <ProgressBar progress={progress} />
            }

            <StyledSubjectContainer>
                <Icon id={getIconIdFromSubject(subject)} size={ICON_SIZES.medium}/>
            </StyledSubjectContainer>

            <StyledLayout>
                <Badge text={text} type={BadgeType.white} />
                <StyledHead level={6}>{heading}</StyledHead>
                <StyledDescription size={2}>{description}</StyledDescription>
                <StyledButtonContainer>
                    <Button style={ButtonStyle.secondaryWhite}
                            disabled={false}
                            label={ buttonLabel}
                            onClick={onClick}
                    />
                </StyledButtonContainer>
                <StyledReqStudent>
                    <Icon id={ICON_ID.student} size={ICON_SIZES.medium} />
                    {studentReq}
                </StyledReqStudent>
                <StyledReqPen>
                    <Icon id={ICON_ID.pen} size={ICON_SIZES.medium} />
                    {penReq}
                </StyledReqPen>
            </StyledLayout>

        </StyledIsland>
    </ThemeProvider>
}


function ProgressBar({progress} : Pick<I_IslandProps, "progress">){
    return  <StyledProgressBar progress={progress}>
                <StyledProgressText size={3}>
                    Progress {progress}%
                </StyledProgressText>
            </StyledProgressBar>
}