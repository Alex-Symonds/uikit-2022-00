import styled, {css} from 'styled-components';

import { rgba } from '../../../utils/utils';

import Paragraph from '../../Paragraph';

const StyledInputContainer = styled.div<{disabled : boolean, isError : boolean, isSuccess : boolean, readOnly : boolean}>`
    border-radius: ${ ({theme}) => theme.borderRadius };
    height: 3.5rem;
    overflow: hidden;
    position: relative;
    width: 30.125rem;
    max-width: 100%;

    ${ props => {
        if(props.isError){
            return css`
                background: ${ props.theme.color.errorBackground };
                box-shadow: ${ props.theme.shadow.inputErrorSmall };

                &:active{
                    box-shadow: ${ props.theme.shadow.inputError };
                }
            `;
        }

        if(props.isSuccess){
            return css`
                background: ${ props.theme.color.successBackground };
                box-shadow: ${ props.theme.shadow.inputSuccess };
            `;
        }

        return css`
            background: ${ props.theme.color.inputBackground };
            box-shadow: ${ props.theme.shadow.default };
        `;
    }};

    ${ props => {
        if(props.disabled || props.readOnly) {
            return;
        }
        return css`        
            &:hover {
                box-shadow: ${ props.theme.shadow.hover };
            }
        `;
    }}
`;

const StyledDescription = styled(Paragraph)`
    color: ${ ({theme}) => rgba(theme.color.mainText, theme.opacity.subtleMainText) };
    margin-top: 0.5rem;
`;

const StyledErrorMessage = styled(StyledDescription)`
    color: ${ ({theme}) => theme.color.error };
`;

export interface I_InputContainerProps{
    description? : string,
    disabled : boolean,
    errorMsg? : string,
    isSuccess? : boolean,
    readOnly : boolean,
    children : React.ReactNode
}

export default function InputContainer({description, disabled, errorMsg, isSuccess, readOnly, children} 
    : I_InputContainerProps )
    {

    isSuccess = isSuccess ?? false;
    const isError = errorMsg !== undefined;
    return <div>
        <StyledInputContainer disabled={disabled} isError={isError} isSuccess={!isError && isSuccess} readOnly={readOnly}>
            {children}
        </StyledInputContainer>
        {
            description !== undefined ?
                <StyledDescription size={2}>
                    {description}
                </StyledDescription>
                : null
        }
        {
            isError ?
                <StyledErrorMessage>
                    {errorMsg}
                </StyledErrorMessage>
                : null
        }
    </div> 
}