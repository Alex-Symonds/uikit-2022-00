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
    blackStrong = "rgba(17, 17, 17, .48)",
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
    headingBold = "MontserratBold, Tahoma, sans-serif",
    headingBlack = "MontserratBlack, Tahoma, sans-serif"
}

export const enum SHADOW{
    default = "0 4px 4px 0 rgba(51, 51, 51, 0.04), 0 4px 16px 0 rgba(51, 51, 51, 0.08)",
    contextMenu = "0 4px 4px 0 rgba(51, 51, 51, 0.04), 0 14px 24px 0 rgba(51, 51, 51, 0.12)",
    hoverFile = "0 4px 4px 0 rgba(51, 51, 51, 0.04), 0 4px 24px 0 rgba(51, 51, 51, 0.24)",
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

export const enum CURSOR_PATH{
    hand = "/cursorHand.svg"
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

export const TYPOGRAPHY = {
    h1: css`
        font-family: ${FONT.headingBlack};
        font-size: 3.5rem;
        font-weight: 900;
        line-height: 4rem;
    `,
    h2: css`
        font-family: ${FONT.headingBold};
        font-size: 3rem;
        font-weight: bold;
        line-height: 3.5rem;
    `,
    h3: css`
        font-family: ${FONT.headingBold};
        font-size: 2.5rem;
        font-weight: bold;
        line-height: 3rem;
    `,
    h4: css`
        font-family: ${FONT.headingBold};
        font-size: 2rem;
        font-weight: bold;
        line-height: 2.5rem;
    `,
    h5: css`
        font-family: ${FONT.headingBold};
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 2rem;
    `,
    h6: css`
        font-family: ${FONT.headingBold};
        font-size: 1.25rem;
        font-weight: bold;
        line-height: 1.75rem;
    `,

    p1: css`
        font-family: ${ FONT.main };
        font-size: 1.25rem;
        line-height: 1.75rem;
    `,

    p2: css`
        font-family: ${ FONT.main };
        font-size: 1rem;
        line-height: 1.5rem;
    `,

    p3: css`
        font-family: ${ FONT.main };
        font-size: 0.8125rem;
        line-height: 1.25rem;
    `,
}