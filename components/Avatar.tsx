import React from 'react';
import styled from 'styled-components';
import { PALETTE } from './Theme';

export const enum AvatarOptions{
    sunglasses = "sunglasses",
    cat = "cat",
    ghost = "ghost",
    alien = "alien",
    lion = "lion",
    lightbulb = "lightbulb",
    football = "football",
    popcorn = "popcorn"
}

const emojis = {
    sunglasses: {
        unicode: 0x1F60E, //"&#128526;",
        label: "Smirking Face with Sunglasses"
    },
    cat: {
        unicode: 0x1F63C, //"&#128572;",
        label: "Smirking Cat"
    },
    ghost: {
        unicode: 0x1F47B, //"&#128123;",
        label: "Ghost"
    },
    alien: {
        unicode: 0x1F47D, //"&#128125;",
        label: "Alien"
    }, 
    lion: {
        unicode: 0x1F981, //"&#128125;",
        label: "Lion"
    },
    lightbulb: {
        unicode: 0x1F4A1, //"&#128125;",
        label: "Lightbulb"
    },
    football: {
        unicode: 0x26BD, //"&#128125;",
        label: "Football"
    },
    popcorn: {
        unicode: 0x1F37F, //"&#128125;",
        label: "Popcorn"
    }
}

function getUnicodeAndLabel(emoji : AvatarOptions | undefined){
    switch(emoji){
        case AvatarOptions.sunglasses:
            return emojis.sunglasses;
        
        case AvatarOptions.cat:
            return emojis.cat;

        case AvatarOptions.ghost:
            return emojis.ghost;

        case AvatarOptions.alien:
            return emojis.alien;

        case AvatarOptions.lion:
            return emojis.lion;

        case AvatarOptions.lightbulb:
            return emojis.lightbulb;

        case AvatarOptions.football:
            return emojis.football;

        case AvatarOptions.popcorn:
            return emojis.popcorn;

        default:
            return emojis.sunglasses;
    }
}

const StyledDiv = styled.div`
    border-radius: 50%;
    background: ${ PALETTE.grayL };
    height: 3.25rem;
    width: 3.25rem;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledAvatarEmoji = styled.span`
    line-height: 1.875rem;
    font-size: 1.875rem;

    // The emoji hovers a little above the text baseline, pushing it off-centre. Mitigate this.
    transform: translateY(0.06rem);
`;

interface AvatarProps{
    emoji?: AvatarOptions
}

export default function Avatar({ emoji } : AvatarProps){
    const data = getUnicodeAndLabel(emoji);
    return  <StyledDiv>
                <StyledAvatarEmoji role="img" aria-label={data.label} >
                    {String.fromCodePoint(data.unicode)}
                </StyledAvatarEmoji>
            </StyledDiv>
}