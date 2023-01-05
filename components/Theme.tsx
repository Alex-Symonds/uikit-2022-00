
import { css } from 'styled-components';




export const enum PALETTE{
    primary = "#6E41E2",
    primaryFaint = "rgba(110, 65, 226, .04)",
    primaryMedium = "rgba(110, 65, 226, .16)",
    primaryStrong = "rgba(110, 65, 226, .56)",

    disabled = "#E3DAF9",
    hover = "#5835B0",
    active = "#472C8A",

    white = "#FFFFFF",
    whiteExtraFaint = "rgba(255, 255, 255, .12)",
    whiteFaint = "rgba(255, 255, 255, .16)",
    whiteMedium = "rgba(255, 255, 255, .56)",
    whiteStrong = "rgba(255, 255, 255, .88)",

    grayM = "#FAFAFA",
    grayL = "#F1F1F1",
    grayS = "#D4D4D4",
    grayK = "#6B6B6B",
    graySMedium = "rgba(212, 212, 212, .48)",
    graySHeavier = "rgba(212, 212, 212, .56)",

    black = "#111",
    blackFaint = "rgba(17, 17, 17, .04)",
    blackMedium = "rgba(17, 17, 17, .12)",
    blackHeavy = "rgba(17, 17, 17, .56)",

    redGirl = "#F9E3E3",
    redBoy = "#F9E3E3",
    red = "#DB524E",
    redSuper = "#C7302B",
    green = "#27AE60",

    code = "#428BF9",
}

export const enum FONT{
    main = "Roboto, Arial, Helvetica, sans-serif",
    heading = "Montserrat, Tahoma, sans-serif"
}

export const enum EFFECT{
    shadow = "0 4px 4px 0 rgba(51, 51, 51, 0.04), 0 4px 16px 0 rgba(51, 51, 51, 0.08)"
}

export const enum LAYOUT{
    borderRadius = "0.25rem"
}

export const enum ICON_SIZES{
    small = "16px",
    medium = "24px",
    large = "32px",
    extraLarge = "56px"
}



export const p1 = css`
    font-family: ${ FONT.main };
    font-size: 1.25rem;
    line-height: 1.75rem;
`;

export const p2 = css`
    font-family: ${ FONT.main };
    font-size: 1rem;
    line-height: 1.5rem;
`;

export const p3 = css`
    font-family: ${ FONT.main };
    font-size: 0.8125rem;
    line-height: 1.25rem;
`;