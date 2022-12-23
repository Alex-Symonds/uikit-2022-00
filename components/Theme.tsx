import {css} from 'styled-components';

export const cssVariables = css`
    --colorPrimary: #6E41E2;
    --colorPrimaryFaint: rgba(110, 65, 226, .04);
    --colorPrimaryMedium: rgba(110, 65, 226, .16);
    --colorPrimaryStrong: rgba(110, 65, 226, .56);

    --colorDisabled: #E3DAF9;
    --colorHover: #5835B0;
    --colorActive: #472C8A;

    --colorWhite: #FFFFFF;
    --colorWhiteExtraFaint: rgba(255, 255, 255, .12);
    --colorWhiteFaint: rgba(255, 255, 255, .16);
    --colorWhiteMedium: rgba(255, 255, 255, .56);
    --colorWhiteStrong: rgba(255, 255, 255, .88);

    --colorGrayM: #FAFAFA;
    --colorGrayL: #F1F1F1;
    --colorGrayS: #D4D4D4;
    --colorGrayK: #6B6B6B;
    --colorGraySMedium: rgba(212, 212, 212, .48);

    --colorBlack: #111;
    --colorBlackFaint: rgba(17, 17, 17, .04);
    --colorBlackMedium: rgba(17, 17, 17, .12);
    --colorBlackHeavy: rgba(17, 17, 17, .56);

    --colorRedGirl: #F9E3E3;
    --colorRedBoy: #F9E3E3;
    --colorRed: #DB524E;
    --colorRedSuper: #C7302B;
    --colorGreen: #27AE60;

    --colorCode: #428BF9;

    --fontHeading: Montserrat, Tahoma, sans-serif;
    --fontMain: Roboto, Arial, Helvetica, sans-serif;

    --shadow: 0 4px 4px 0 rgba(51, 51, 51, 0.04), 0 4px 16px 0 rgba(51, 51, 51, 0.08);
`;

/*
    COLOURS
    ---------------------------
    Purples
        Primary / #6E41E2
        disabled / #E3DAF9
        Hover / #5835B0
        Active / #472C8A

    Tones
        White / #FFFFFF 
        White S / #FFFFFF with opacity 88%
        GrayM / #FAFAFA
        GrayL / #F1F1F1
        GrayS / #D4D4D4
        Gray / #D4D4D4 48%  / rgba(212, 212, 212, .48)
        GrayK / #6B6B6B
        Black / #111

    Colours
        Red Girl / #F9E3E3
        Red Boy / #F9E3E3
        Red / #DB524E
        Super Red / #C7302B
        Green / #27AE60
        Blue for code in tests / #428BF9

*/

