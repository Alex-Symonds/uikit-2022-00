import styled, {css} from 'styled-components';
import { PALETTE, LAYOUT, SHADOW, TYPOGRAPHY } from './Theme';

const StyledInputContainer = styled.div<{disabled : boolean, isError : boolean, isSuccess : boolean, readOnly : boolean}>`
    border-radius: ${LAYOUT.borderRadius};
    height: 3.5rem;
    overflow: hidden;
    position: relative;
    width: 30.125rem;
    max-width: 100%;

    ${ props => {
        if(props.isError){
            return css`
                background: ${PALETTE.redGirl};
                box-shadow: ${SHADOW.inputErrorSmall};

                &:active{
                    box-shadow: ${SHADOW.inputError};
                }
            `;
        }

        if(props.isSuccess){
            return css`
                background: ${PALETTE.greenPale};
                box-shadow: ${SHADOW.inputSuccess};
            `;
        }

        return css`
            background: ${PALETTE.white};
            box-shadow: ${SHADOW.default};
        `;
    }};

    ${ props => {
        if(props.disabled || props.readOnly) {
            return;
        }
        return css`        
            &:hover {
                box-shadow: ${SHADOW.hover};
            }
        `;
    }}
`;

const StyledDescription = styled.p`
    ${TYPOGRAPHY.p2}
    color: ${PALETTE.blackStrong};
    margin-top: 0.5rem;
`;

const StyledErrorMessage = styled(StyledDescription)`
    color: ${PALETTE.red};
`;

interface I_InputContainerProps{
    className? : string,
    description? : string,
    disabled : boolean,
    errorMsg? : string,
    isSuccess : boolean,
    readOnly : boolean,
    children : React.ReactNode
}

export const StyledLabel = styled.label<{disabled : boolean}>`
    ${TYPOGRAPHY.p2}
    color: ${ props => props.disabled ? PALETTE.blackMedium : PALETTE.blackStrong};
    height: 1.25rem;
    left: 1rem;
    pointer-events: none;
    position: absolute;
    text-align: center;
    top: calc(50% - (1.25rem / 2));
`;

export default function InputContainer({className, description, disabled, errorMsg, isSuccess, readOnly, children} : I_InputContainerProps){
    const isError = errorMsg !== undefined;
    return <div>
        <StyledInputContainer className={className} disabled={disabled} isError={isError} isSuccess={!isError && isSuccess} readOnly={readOnly}>
            {children}
        </StyledInputContainer>
        {
            description !== undefined &&
                <StyledDescription>
                    {description}
                </StyledDescription>
        }
        {
            isError &&
                <StyledErrorMessage>
                    {errorMsg}
                </StyledErrorMessage>
        }
    </div> 
}