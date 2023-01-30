import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { PALETTE, TYPOGRAPHY } from './Theme';
import Badge, {BadgeType} from './Badge';
import ButtonLabel from './ButtonLabel';
import { ButtonColorMode, ButtonType } from './Button';
import SubjectIcon, {Subject} from './IconMediumSubject';
import Icon from './Icons';
import { IconMediumId } from './IconsMedium';

const StyledIsland = styled.div`
    background: ${PALETTE.primary};
    border-radius: 0.5rem;
    min-height: 12.5rem;
    overflow: hidden;
    position: relative;
    width: 25.125rem;

    &::before{
        aspect-ratio: 1/1;
        background: ${PALETTE.whiteA24};
        border-radius: 100%;
        content: '';
        display: block;
        position: absolute;
        top: -6.9375rem;
        right: -6.9375rem;
        width: 13.875rem;        
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
        background: ${PALETTE.green};
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

const StyledProgressText = styled.p`
    ${TYPOGRAPHY.p3};
    color: ${PALETTE.white};
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
            fill: ${PALETTE.white};
        }
    }
`;

const StyledLayout = styled.div`
    display: grid;
    gap: ${props => props.theme.layoutGap};
    grid-template-areas: 
        "badge badge badge"
        "heading heading heading"
        "desc desc desc"
        "button studentReq penReq";
    grid-template-columns: max-content max-content 1fr;
    grid-template-rows: auto auto 1fr auto;
    margin-top: ${props => props.theme.layoutMarginTop};
    min-height: ${props => props.theme.layoutHeight};
    padding: 0.75rem 1.25rem ${props => props.theme.layoutPaddingBottom} 1.25rem;
`;

const StyledHead = styled.h6`
    ${TYPOGRAPHY.h6}
    color: ${PALETTE.white};
    grid-area: heading;
`;

const StyledDescription = styled.p`
    ${TYPOGRAPHY.p2}
    color: ${PALETTE.whiteStrong};
    grid-area: desc;
    height: 100%;
    overflow: hidden;
`;

const StyledButtonContainer = styled.div`
    grid-area: button;
    padding-right: 0.75rem;
`;

const StyledReq = styled.div`
    ${TYPOGRAPHY.p2}
    align-items: center;
    color: ${PALETTE.whiteStrong};
    display: flex;
    height: 100%;
    svg path{
        fill: ${PALETTE.whiteStrong};
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
    subject : Subject,
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
                <SubjectIcon subject={subject}/>
            </StyledSubjectContainer>

            <StyledLayout>
                <Badge text={text} type={BadgeType.white} />
                <StyledHead>{heading}</StyledHead>
                <StyledDescription>{description}</StyledDescription>
                <StyledButtonContainer>
                    <ButtonLabel colorMode={ButtonColorMode.white}
                            disabled={false}
                            label={ buttonLabel}
                            onClick={onClick}
                            type={ButtonType.secondary}
                    />
                </StyledButtonContainer>
                <StyledReqStudent>
                    <Icon idMedium={IconMediumId.student} />
                    {studentReq}
                </StyledReqStudent>
                <StyledReqPen>
                    <Icon idMedium={IconMediumId.pen} />
                    {penReq}
                </StyledReqPen>
            </StyledLayout>

        </StyledIsland>
    </ThemeProvider>
}


function ProgressBar({progress} : Pick<I_IslandProps, "progress">){
    return  <StyledProgressBar progress={progress}>
                <StyledProgressText>
                    Progress {progress}%
                </StyledProgressText>
            </StyledProgressBar>
}