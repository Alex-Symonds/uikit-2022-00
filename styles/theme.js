const PALETTE = {
    primary: "#6E41E2",
    primaryPale: "#E3DAF9",
    primaryDarker: "#5835B0",
    primaryDarkest: "#472C8A",

    white: "#FFFFFF",
    grayM: "#FAFAFA",
    grayL: "#F1F1F1",
    grayS: "#D4D4D4",
    grayK: "#6B6B6B",
    black: "#111111",

    redPalest: "#F9E3E3",
    redPale: "#F2CACA",
    red: "#DB524E",
    redSuper: "#C7302B",

    green: "#27AE60",
    greenPale: "#CBECD9",

    yellow: "#FFD912",
    yellowPale: "#FFF5C0",

    blue: "#428BF9",
}

const SHADOWS = {
    inner: "0 4px 4px 0 rgba(51, 51, 51, 0.04)",
    innerError: "0 4px 4px 0 rgba(255, 195, 195, 0.04)",
}

const FONT = {
    headingBlack: "MontserratBlack, Tahoma, sans-serif",
    headingBold: "MontserratBold, Tahoma, sans-serif",
    main: "Roboto, Arial, Helvetica, sans-serif",
    mainMedium: "RobotoMedium, Arial, Helvetica, sans-serif",
}

const OPACITY = {
    alphaFaintest: 0.04,
    alphaFainter: 0.12,
    alphaFaint: 0.16,
    alphaMid: 0.24,
    alphaStrong: 0.48,
    alphaStronger: 0.56,
    alphaStrongest: 0.88,
}

export const theme = {
    borderRadius: "0.25rem",
    breakpoint: {
        S: "320px",
        M: "768px",
        L: "1024px",
        XL: "1366px",
    },
    color:{
        ...PALETTE,
        attention: PALETTE.yellow,
        autofill: PALETTE.yellowPale,
        avatarBackground: PALETTE.grayL,

        code: PALETTE.blue,

        contextMenuBackground: PALETTE.white,
        contextMenuBackgroundHover: PALETTE.grayL,
        contextMenuHeadingBackground: PALETTE.grayM,

        error: PALETTE.red,
        errorBackground: PALETTE.redPalest,
        errorBackgroundHover: PALETTE.redPale,
        errorEmphasis: PALETTE.redSuper,

        focusOutline: PALETTE.black,

        inputBackground: PALETTE.white,
        inputBackgroundActive: PALETTE.grayL,
        inputBackgroundHoverDark: PALETTE.grayL,
        inputBackgroundHoverLight: PALETTE.grayM,
        inputBorder: PALETTE.grayS,

        mainBackground: PALETTE.white,
        mainBackgroundBorder: PALETTE.grayL,

        mainText: PALETTE.black,
        mainTextPaleDark: PALETTE.grayK,
        mainTextPaleLight: PALETTE.grayL,

        primaryActive: PALETTE.primaryDarkest,
        primaryDisabled: PALETTE.primaryPale,
        primaryHover: PALETTE.primaryDarker,
        
        progressOnPrimary: PALETTE.green,
        primaryTextOnWhite: PALETTE.primary,
        textOnPrimary: PALETTE.white,
        
        success: PALETTE.green,
        successBackground: PALETTE.greenPale,
    },
    opacity: {
        ...OPACITY,
        focusOutline: OPACITY.alphaStrong,
        placeholderText: OPACITY.alphaStrong,
        subtleMainText: OPACITY.alphaStrong,
        subtleTextOnPrimary: OPACITY.alphaStrongest,
        translucentBackground: OPACITY.alphaFainter,  
    },
    shadow: {
        contextMenu: `${SHADOWS.inner}, 0 14px 24px 0 rgba(51, 51, 51, 0.12)`,
        default: `${SHADOWS.inner}, 0 4px 16px 0 rgba(51, 51, 51, 0.08)`,
        hover: `${SHADOWS.inner}, 0 4px 56px 0 rgba(51, 51, 51, 0.16)`,
        hoverFile: `${SHADOWS.inner}, 0 4px 24px 0 rgba(51, 51, 51, 0.24)`,
        inputError: `${SHADOWS.innerError}, 0 4px 40px 0 rgba(255, 195, 195, 0.24)`,
        inputErrorSmall: `${SHADOWS.innerError}, 0 4px 12px 0 rgba(255, 195, 195, 0.24)`,
        inputSuccess: "0 4px 4px 0 rgba(39, 174, 96, 0.04), 0 4px 40px 0 rgba(39, 174, 96, 0.24)",
    },
    typography: {
        h1: `
            font-family: ${FONT.headingBlack};
            font-size: 3.5rem;
            font-weight: 900;
            line-height: 4rem;
        `,
        h2: `
            font-family: ${FONT.headingBold};
            font-size: 3rem;
            font-weight: bold;
            line-height: 3.5rem;
        `,
        h3: `
            font-family: ${FONT.headingBold};
            font-size: 2.5rem;
            font-weight: bold;
            line-height: 3rem;
        `,
        h4: `
            font-family: ${FONT.headingBold};
            font-size: 2rem;
            font-weight: bold;
            line-height: 2.5rem;
        `,
        h5: `
            font-family: ${FONT.headingBold};
            font-size: 1.5rem;
            font-weight: bold;
            line-height: 2rem;
        `,
        h6: `
            font-family: ${FONT.headingBold};
            font-size: 1.25rem;
            font-weight: bold;
            line-height: 1.75rem;
        `,
    
        p1: `
            font-family: ${ FONT.main };
            font-size: 1.25rem;
            line-height: 1.75rem;
        `,
    
        p2: `
            font-family: ${ FONT.main };
            font-size: 1rem;
            line-height: 1.5rem;
        `,
    
        p3: `
            font-family: ${ FONT.main };
            font-size: 0.8125rem;
            line-height: 1.25rem;
        `,
    
        p1Bold: `
            font-family: ${ FONT.main };
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 700;
        `,
    
        p2Bold: `
            font-family: ${ FONT.mainMedium };
            font-size: 1rem;
            line-height: 1.5rem;
            font-weight: 500;
        `,
    
        p3Bold: `
            font-family: ${ FONT.main };
            font-size: 0.8125rem;
            line-height: 1.25rem;
            font-weight: 700;
        `,
    }
}

