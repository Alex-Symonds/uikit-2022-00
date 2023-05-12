import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';

import { InputText as TextInput } from './form/';

import PopUp from './PopUp';
import Button, { ButtonStyle } from './Button';

import SelectText from './form/SelectText';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Kit/PopUp',
    component: PopUp,
  } as ComponentMeta<typeof PopUp>;

/*
  TODO: switch the country to a select once that component is completed
*/

//                <TextInput label="Your country" id="id_country" name="country" handleChange={(e) => setCountry(e.target.value)} value={country} />


const Template: ComponentStory<typeof PopUp> = args => {
    const [name, setName] = React.useState<string | null>(null);
    const [phone, setPhone] = React.useState<string | null>(null);
    const [country, setCountry] = React.useState<string | null>(null);

    function selectOption(data : string | null){
        setCountry(data);
      }


    return <PopUp {...args} >
        <StyledExampleLayout>
            <h4>Leave your contact</h4>
            <p>We want to know all about you</p>
            <StyledFormContainer>
                <TextInput label="Your name" id="id_name" name="name" handleChange={(e) => setName(e.target.value)} value={name} />
                <TextInput label="Your phone" id="id_phone" name="phone" handleChange={(e) => setPhone(e.target.value)} value={phone} />
                <SelectText label="Your country" id="id_country" options={["Russia", "USA", "Germany"]} selectedOption={country} setSelectedOption={selectOption} placeholder=""/>
                <Button label="Send" style={ButtonStyle.primary} onClick={() => console.log("Send clicked")}/>
            </StyledFormContainer>
        </StyledExampleLayout>
    </PopUp>
}

export const Example = Template.bind({});

const StyledExampleLayout = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    padding: 0 0.55rem;
    gap: 0.5rem;

    h4{
        ${ ({theme}) => theme.typography.h4 }
    }

    p{
        ${ ({theme}) => theme.typography.p2 }
    }
`;

const StyledFormContainer = styled.div`
    padding-top: 0.9rem;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    gap: 1.375rem;
    max-width: 100%;

    // This is here because some bloody thing is inserting a style-less div around the TextInputs, 
    // which causes the inputs to burst out of the container
    div{
        max-width: 100%;
    }
`;

export const ExampleMobile = Template.bind({});
ExampleMobile.parameters = {
    viewport: {
        defaultViewport: 'iphone5',
      },
}
