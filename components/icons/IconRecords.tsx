/*
    IconRecords contains:
        > ICON_SIZES const, which defines valid icon sizes
        > ICON_ID const, which defiens valid icon IDs
        > IconRecords, which maps combinations of ID & Size to 
          functional components
        > All the various SVG-returning components. They all accept
          one argument, "size", which is injected into the height 
          and width parameters of the SVG tag
*/
export const ICON_SIZES = {
    small: "16px",
    medium: "24px",
    large: "32px",
    extraLarge: "56px"
} as const;

export const ICON_ID = {
    arrowDown: "arrowDown",
    arrowLeft: "arrowLeft",
    arrowRight: "arrowRight",
    arrowUp: "arrowUp",
    attention: "attention",
    burger: "burger",
    catalogueCourse: "catalogueCourse",
    check: "check",
    close: "close",
    closeBig: "closeBig",
    copy: "copy",
    default: "default",
    eyeClosed: "eyeClosed",
    eyeOpen: "eyeOpen",
    facebook: "facebook",
    false: "false",
    file: "file",
    filter: "filter",
    freeTest: "freeTest",
    google: "google",
    help: "help",
    info: "info",
    instagram: "instagram",
    link: "link",
    loader: "loader",
    lock: "lock",
    minus: "minus",
    musicOff: "musicOff",
    musicOn: "musicOn",
    pen: "pen",
    people: "people",
    phone: "phone",
    play: "play",
    plus: "plus",
    profile: "profile",
    progressCircle0: "progressCircle0",
    progressCircle100: "progressCircle100",
    progressCircle25: "progressCircle25",
    progressCircle50: "progressCircle50",
    search: "search",
    searchFalse: "searchFalse",
    starEmpty: "starEmpty",
    starFilled: "starFilled",
    student: "student",
    subjectBiology: "subjectBiology",
    subjectChemistry: "subjectChemistry",
    subjectComputing: "subjectComputing",
    subjectEconomics: "subjectEconomics",
    subjectEnglish: "subjectEnglish",
    subjectGeography: "subjectGeography",
    subjectHistory: "subjectHistory",
    subjectLangDe: "subjectLangDe",
    subjectLangEn: "subjectLangEn",
    subjectLangEs: "subjectLangEs",
    subjectLangFr: "subjectLangFr",
    subjectLiterature: "subjectLiterature",
    subjectMathematics: "subjectMathematics",
    subjectPhysics: "subjectPhysics",
    subjectRobotics: "subjectRobotics",
    subjectSociology: "subjectSociology",
    telegram: "telegram",
    viber: "viber",
    video: "video",
    vk: "vk",
    volumeMute: "volumeMute",
    volumeOn: "volumeOn",
    web: "web",
    whatsapp: "whatsapp",
} as const;
    

export type T_IconSVGComponent = (size : string) => JSX.Element;

type T_AnyIconSizeCombo = {
    [ICON_SIZES.small]?: T_IconSVGComponent,
    [ICON_SIZES.medium]?: T_IconSVGComponent,
    [ICON_SIZES.large]?: T_IconSVGComponent,
    [ICON_SIZES.extraLarge]?: T_IconSVGComponent,
}

type T_IconHasSmall = T_AnyIconSizeCombo & {
    [ICON_SIZES.small]: T_IconSVGComponent,
}

type T_IconHasMedium = T_AnyIconSizeCombo & {
    [ICON_SIZES.medium]: T_IconSVGComponent,
}

type T_IconHasLarge = T_AnyIconSizeCombo & {
    [ICON_SIZES.large]: T_IconSVGComponent,
}

type T_IconHasExtraLarge = T_AnyIconSizeCombo & {
    [ICON_SIZES.extraLarge]: T_IconSVGComponent,
}

type T_AnyIconSizeComboButNotEmpty = 
    T_IconHasSmall | T_IconHasMedium | T_IconHasLarge | T_IconHasExtraLarge;

export const IconRecords : Record<keyof typeof ICON_ID, T_AnyIconSizeComboButNotEmpty> = {
    [ICON_ID.arrowDown]: {
        [ICON_SIZES.small]: ArrowDownS,
        [ICON_SIZES.medium]: ArrowDownM,
    },
    [ICON_ID.arrowLeft]: {
        [ICON_SIZES.small]: ArrowLeftS,
    },
    [ICON_ID.arrowRight]: {
        [ICON_SIZES.small]: ArrowRightS,
    },
    [ICON_ID.arrowUp]: {
        [ICON_SIZES.medium]: ArrowUpM,
    },
    [ICON_ID.attention]: {
        [ICON_SIZES.extraLarge]: AttentionXL,
    },
    [ICON_ID.burger]: {
        [ICON_SIZES.medium]: BurgerM,
    },
    [ICON_ID.catalogueCourse]: {
        [ICON_SIZES.medium]: CatalogueCourseM,
    },
    [ICON_ID.check]: {
        [ICON_SIZES.small]: CheckS,
        [ICON_SIZES.medium]: CheckM,
        [ICON_SIZES.extraLarge]: CheckXL,
    },
    [ICON_ID.close]: {
        [ICON_SIZES.small]: CloseS,
        [ICON_SIZES.medium]: CloseM,
        [ICON_SIZES.large]: CloseL,
    },
    [ICON_ID.closeBig]: {
        [ICON_SIZES.medium]: CloseBigM,
    },
    [ICON_ID.copy]: {
        [ICON_SIZES.small]: CopyS,
        [ICON_SIZES.medium]: CopyM,
    },
    [ICON_ID.default]: {
        [ICON_SIZES.medium]: DefaultM,
    },
    [ICON_ID.eyeClosed]: {
        [ICON_SIZES.small]: EyeClosedS,
        [ICON_SIZES.medium]: EyeClosedM,
    },
    [ICON_ID.eyeOpen]: {
        [ICON_SIZES.small]: EyeOpenS,
        [ICON_SIZES.medium]: EyeOpenM,
    },
    [ICON_ID.facebook]: {
        [ICON_SIZES.medium]: FacebookM,
        [ICON_SIZES.large]: FacebookL,
    },
    [ICON_ID.false]: {
        [ICON_SIZES.extraLarge]: FalseXL,
    },
    [ICON_ID.file]: {
        [ICON_SIZES.medium]: FileM,
    },
    [ICON_ID.filter]: {
        [ICON_SIZES.small]: FilterS,
        [ICON_SIZES.medium]: FilterM,
    },
    [ICON_ID.freeTest]: {
        [ICON_SIZES.medium]: FreeTestM,
    },
    [ICON_ID.google]: {
        [ICON_SIZES.medium]: GoogleM,
        [ICON_SIZES.large]: GoogleL,
    },
    [ICON_ID.help]: {
        [ICON_SIZES.medium]: HelpM,
    },
    [ICON_ID.info]: {
        [ICON_SIZES.medium]: InfoM,
    },
    [ICON_ID.instagram]: {
        [ICON_SIZES.large]: InstagramL,
    },
    [ICON_ID.link]: {
        [ICON_SIZES.medium]: LinkM,
    },
    [ICON_ID.loader]: {
        [ICON_SIZES.small]: LoaderS,
        [ICON_SIZES.medium]: LoaderM,
    },
    [ICON_ID.lock]: {
        [ICON_SIZES.medium]: LockM,
    },
    [ICON_ID.minus]: {
        [ICON_SIZES.small]: MinusS,
    },
    [ICON_ID.musicOff]: {
        [ICON_SIZES.small]: MusicOffS,
        [ICON_SIZES.medium]: MusicOffM,
    },
    [ICON_ID.musicOn]: {
        [ICON_SIZES.small]: MusicOnS,
        [ICON_SIZES.medium]: MusicOnM,
    },
    [ICON_ID.pen]: {
        [ICON_SIZES.medium]: PenM,
    },
    [ICON_ID.people]: {
        [ICON_SIZES.medium]: PeopleM,
    },
    [ICON_ID.phone]: {
        [ICON_SIZES.small]: PhoneS,
        [ICON_SIZES.large]: PhoneL,
    },
    [ICON_ID.play]: {
        [ICON_SIZES.extraLarge]: PlayXL,
    },
    [ICON_ID.plus]: {
        [ICON_SIZES.small]: PlusS,
        [ICON_SIZES.medium]: PlusM,
    },
    [ICON_ID.profile]: {
        [ICON_SIZES.medium]: ProfileM,
    },
    [ICON_ID.progressCircle0]: {
        [ICON_SIZES.medium]: ProgressCircle0M,
    },
    [ICON_ID.progressCircle25]: {
        [ICON_SIZES.medium]: ProgressCircle25M,
    },
    [ICON_ID.progressCircle50]: {
        [ICON_SIZES.medium]: ProgressCircle50M,
    },
    [ICON_ID.progressCircle100]: {
        [ICON_SIZES.medium]: ProgressCircle100M,
    },
    [ICON_ID.search]: {
        [ICON_SIZES.medium]: SearchM,
    },
    [ICON_ID.searchFalse]: {
        [ICON_SIZES.extraLarge]: SearchFalseXL,
    },
    [ICON_ID.starEmpty]: {
        [ICON_SIZES.small]: StarEmptyS,
        [ICON_SIZES.medium]: StarEmptyM,
    },
    [ICON_ID.starFilled]: {
        [ICON_SIZES.small]: StarFilledS,
        [ICON_SIZES.medium]: StarFilledM,
    },
    [ICON_ID.student]: {
        [ICON_SIZES.medium]: StudentM,
    },
    [ICON_ID.subjectBiology]: {
        [ICON_SIZES.medium]: SubjectBiologyM,
    },
    [ICON_ID.subjectEconomics]: {
        [ICON_SIZES.medium]: SubjectEconomicsM,
    },
    [ICON_ID.subjectEnglish]: {
        [ICON_SIZES.medium]: SubjectEnglishM,
    },
    [ICON_ID.subjectChemistry]: {
        [ICON_SIZES.medium]: SubjectChemistryM,
    },
    [ICON_ID.subjectComputing]: {
        [ICON_SIZES.medium]: SubjectComputingM,
    },
    [ICON_ID.subjectGeography]: {
        [ICON_SIZES.medium]: SubjectGeographyM,
    },
    [ICON_ID.subjectHistory]: {
        [ICON_SIZES.medium]: SubjectHistoryM,
    },
    [ICON_ID.subjectLangDe]: {
        [ICON_SIZES.medium]: SubjectLangDeM,
    },
    [ICON_ID.subjectLangEn]: {
        [ICON_SIZES.medium]: SubjectLangEnM,
    },
    [ICON_ID.subjectLangEs]: {
        [ICON_SIZES.medium]: SubjectLangEsM,
    },
    [ICON_ID.subjectLangFr]: {
        [ICON_SIZES.medium]: SubjectLangFrM,
    },
    [ICON_ID.subjectLiterature]: {
        [ICON_SIZES.medium]: SubjectLiteratureM,
    },
    [ICON_ID.subjectMathematics]: {
        [ICON_SIZES.medium]: SubjectMathsM,
    },
    [ICON_ID.subjectPhysics]: {
        [ICON_SIZES.medium]: SubjectPhysicsM,
    },
    [ICON_ID.subjectRobotics]: {
        [ICON_SIZES.medium]: SubjectRoboticsM,
    },
    [ICON_ID.subjectSociology]: {
        [ICON_SIZES.medium]: SubjectSociologyM,
    },
    [ICON_ID.telegram]: {
        [ICON_SIZES.large]: TelegramL,
    },
    [ICON_ID.viber]: {
        [ICON_SIZES.large]: ViberL,
    },
    [ICON_ID.video]: {
        [ICON_SIZES.medium]: VideoM,
    },
    [ICON_ID.vk]: {
        [ICON_SIZES.medium]: VkM,
        [ICON_SIZES.large]: VkL,
    },
    [ICON_ID.volumeMute]: {
        [ICON_SIZES.small]: VolumeMuteS,
        [ICON_SIZES.medium]: VolumeMuteM,
    },
    [ICON_ID.volumeOn]: {
        [ICON_SIZES.small]: VolumeOnS,
        [ICON_SIZES.medium]: VolumeOnM,
    },
    [ICON_ID.web]: {
        [ICON_SIZES.large]: WebL,
    },
    [ICON_ID.whatsapp]: {
        [ICON_SIZES.large]: WhatsappL,
    },
    
} as const;


function ArrowDownS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7.98037 11.0041C7.84938 11.0049 7.71954 10.9796 7.59828 10.9299C7.47702 10.8801 7.36673 10.8068 7.27373 10.7141L3.2927 6.71409C3.1999 6.62085 3.12629 6.51016 3.07607 6.38834C3.02585 6.26652 3 6.13595 3 6.00409C3 5.87223 3.02585 5.74166 3.07607 5.61984C3.12629 5.49802 3.1999 5.38733 3.2927 5.29409C3.38549 5.20085 3.49566 5.12689 3.6169 5.07643C3.73815 5.02597 3.8681 5 3.99933 5C4.13057 5 4.26051 5.02597 4.38176 5.07643C4.503 5.12689 4.61317 5.20085 4.70597 5.29409L7.98037 8.60409L11.2647 5.42409C11.3563 5.3218 11.4679 5.23959 11.5925 5.18261C11.7171 5.12562 11.8521 5.09508 11.989 5.0929C12.1259 5.09072 12.2618 5.11695 12.3881 5.16994C12.5145 5.22293 12.6286 5.30155 12.7233 5.40087C12.818 5.5002 12.8914 5.61809 12.9387 5.74719C12.986 5.87628 13.0063 6.0138 12.9983 6.15113C12.9903 6.28847 12.9542 6.42267 12.8922 6.54535C12.8303 6.66802 12.7438 6.77653 12.6382 6.86409L8.65714 10.7241C8.47514 10.9004 8.23317 11.0005 7.98037 11.0041Z" fill="black"/>
            </svg>
}
function ArrowDownM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11.9706 16.5061C11.7741 16.5073 11.5793 16.4694 11.3974 16.3948C11.2155 16.3201 11.0501 16.2102 10.9106 16.0711L4.93905 10.0711C4.79985 9.93128 4.68944 9.76524 4.6141 9.58251C4.53877 9.39978 4.5 9.20393 4.5 9.00614C4.5 8.80835 4.53877 8.6125 4.6141 8.42976C4.68944 8.24703 4.79985 8.08099 4.93905 7.94114C5.07824 7.80128 5.24349 7.69034 5.42536 7.61465C5.60722 7.53896 5.80215 7.5 5.999 7.5C6.19585 7.5 6.39077 7.53896 6.57264 7.61465C6.75451 7.69034 6.91975 7.80128 7.05895 7.94114L11.9706 12.9061L16.8971 8.13614C17.0344 7.9827 17.2018 7.85939 17.3887 7.77391C17.5756 7.68843 17.7781 7.64263 17.9835 7.63936C18.1888 7.63609 18.3926 7.67542 18.5822 7.75491C18.7717 7.8344 18.9429 7.95232 19.085 8.10131C19.2271 8.2503 19.337 8.42714 19.408 8.62078C19.479 8.81442 19.5094 9.0207 19.4975 9.2267C19.4855 9.4327 19.4313 9.63401 19.3384 9.81802C19.2454 10.002 19.1157 10.1648 18.9573 10.2961L12.9857 16.0861C12.7127 16.3506 12.3497 16.5008 11.9706 16.5061Z" fill="#111111"/>
            </svg>
}
function ArrowLeftS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.52851 8.47138C1.4646 8.40746 1.41637 8.33379 1.38384 8.25516C1.35124 8.17656 1.33325 8.09037 1.33325 7.99998C1.33325 7.90958 1.35124 7.82339 1.38384 7.74479C1.41637 7.66616 1.4646 7.59249 1.52851 7.52857L5.29975 3.75733C5.5601 3.49699 5.98221 3.49699 6.24256 3.75734C6.50291 4.01768 6.50291 4.43979 6.24256 4.70014L3.60939 7.33331H13.9999C14.3681 7.33331 14.6666 7.63179 14.6666 7.99998C14.6666 8.36817 14.3681 8.66664 13.9999 8.66664H3.60939L6.24256 11.2998C6.50291 11.5602 6.50291 11.9823 6.24256 12.2426C5.98221 12.503 5.5601 12.503 5.29975 12.2426L1.52851 8.47138Z" fill="#111111"/>
            </svg>
}
function ArrowRightS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11.0021 8.02171C11.0029 8.15269 10.9777 8.28253 10.9279 8.40379C10.8781 8.52505 10.8048 8.63535 10.7121 8.72834L6.71214 12.7094C6.6189 12.8022 6.50821 12.8758 6.38639 12.926C6.26457 12.9762 6.134 13.0021 6.00214 13.0021C5.87028 13.0021 5.73971 12.9762 5.61789 12.926C5.49607 12.8758 5.38538 12.8022 5.29214 12.7094C5.1989 12.6166 5.12494 12.5064 5.07448 12.3852C5.02402 12.2639 4.99805 12.134 4.99805 12.0027C4.99805 11.8715 5.02402 11.7416 5.07448 11.6203C5.12494 11.4991 5.1989 11.3889 5.29214 11.2961L8.60214 8.02171L5.42214 4.73735C5.31985 4.6458 5.23764 4.53422 5.18065 4.4096C5.12367 4.28498 5.09313 4.15 5.09095 4.0131C5.08877 3.8762 5.115 3.74032 5.16799 3.61397C5.22098 3.48762 5.2996 3.3735 5.39892 3.27877C5.49824 3.18404 5.61614 3.11072 5.74523 3.0634C5.87433 3.01608 6.01184 2.99578 6.14918 3.00377C6.28652 3.01176 6.42072 3.04787 6.5434 3.10983C6.66607 3.1718 6.77458 3.25829 6.86214 3.3639L10.7221 7.34493C10.8985 7.52694 10.9986 7.76891 11.0021 8.02171Z" fill="black"/>
            </svg>
}
function ArrowUpM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11.9706 7.50003C11.7741 7.49889 11.5793 7.53673 11.3974 7.61137C11.2155 7.68602 11.0501 7.79601 10.9106 7.93503L4.93905 13.935C4.79985 14.0749 4.68944 14.2409 4.6141 14.4237C4.53877 14.6064 4.5 14.8022 4.5 15C4.5 15.1978 4.53877 15.3937 4.6141 15.5764C4.68944 15.7591 4.79985 15.9252 4.93905 16.065C5.07824 16.2049 5.24349 16.3158 5.42536 16.3915C5.60722 16.4672 5.80215 16.5062 5.999 16.5062C6.19585 16.5062 6.39077 16.4672 6.57264 16.3915C6.75451 16.3158 6.91975 16.2049 7.05895 16.065L11.9706 11.1L16.8971 15.87C17.0344 16.0235 17.2018 16.1468 17.3887 16.2323C17.5756 16.3177 17.7781 16.3635 17.9835 16.3668C18.1888 16.3701 18.3926 16.3307 18.5822 16.2513C18.7717 16.1718 18.9429 16.0538 19.085 15.9049C19.2271 15.7559 19.337 15.579 19.408 15.3854C19.479 15.1917 19.5094 14.9855 19.4975 14.7795C19.4855 14.5735 19.4313 14.3722 19.3384 14.1881C19.2454 14.0041 19.1157 13.8414 18.9573 13.71L12.9857 7.92003C12.7127 7.65555 12.3497 7.50539 11.9706 7.50003Z" fill="#111111"/>
            </svg>
}
function AttentionXL(size: string) : JSX.Element {  
    // viewbox was "0 0 57 56", changed it for consistency
    return  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M28.5 10.0001C26.8431 10.0001 25.5 11.3432 25.5 13.0001V35.0001C25.5 36.657 26.8431 38.0001 28.5 38.0001C30.1569 38.0001 31.5 36.657 31.5 35.0001V13.0001C31.5 11.3432 30.1569 10.0001 28.5 10.0001ZM28.5 46.0001C26.8431 46.0001 25.5 44.657 25.5 43.0001C25.5 41.3432 26.8431 40.0001 28.5 40.0001C30.1569 40.0001 31.5 41.3432 31.5 43.0001C31.5 44.657 30.1569 46.0001 28.5 46.0001Z" fill="#FFD912"/>
            </svg>
}
function SubjectBiologyM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11 21V16.74C10.53 16.91 10.03 17 9.5 17C7 17 5 15 5 12.5C5 11.23 5.5 10.09 6.36 9.27C6.13 8.73 6 8.13 6 7.5C6 5 8 3 10.5 3C12.06 3 13.44 3.8 14.25 5C14.33 5 14.41 5 14.5 5C15.2223 5 15.9375 5.14226 16.6048 5.41866C17.272 5.69506 17.8784 6.10019 18.3891 6.61091C18.8998 7.12163 19.3049 7.72795 19.5813 8.39524C19.8577 9.06253 20 9.77773 20 10.5C20 11.2223 19.8577 11.9375 19.5813 12.6048C19.3049 13.272 18.8998 13.8784 18.3891 14.3891C17.8784 14.8998 17.272 15.3049 16.6048 15.5813C15.9375 15.8577 15.2223 16 14.5 16C14 16 13.5 15.93 13 15.79V21H11Z" fill="#111111"/>
            </svg>
}
function BurgerM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 17C3 16.4477 3.44772 16 4 16H20C20.5523 16 21 16.4477 21 17C21 17.5523 20.5523 18 20 18H4C3.44772 18 3 17.5523 3 17Z" fill="black"/>
            </svg>
}
function CatalogueCourseM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3.9502 1.8811H13.9502V3.8811H3.9502V13.8811H1.9502V3.8811C1.9502 2.7711 2.8402 1.8811 3.9502 1.8811ZM7.9502 5.8811H17.9502V7.8811H7.9502V17.8811H5.9502V7.8811C5.9502 6.7711 6.8402 5.8811 7.9502 5.8811ZM11.9502 9.8811H19.9502C21.0602 9.8811 21.9502 10.7711 21.9502 11.8811V19.8811C21.9502 20.9911 21.0602 21.8811 19.9502 21.8811H11.9502C10.8402 21.8811 9.9502 20.9911 9.9502 19.8811V11.8811C9.9502 10.7711 10.8402 9.8811 11.9502 9.8811ZM13.9502 11.8811V19.8811L19.9502 15.8811L13.9502 11.8811Z" fill="black"/>
            </svg>
}
function CheckS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4.71996 8.00006C4.5323 7.8313 4.28778 7.73973 4.03543 7.74373C3.78308 7.74773 3.54158 7.84699 3.35936 8.02162C3.17715 8.19624 3.0677 8.4333 3.05297 8.68525C3.03825 8.9372 3.11933 9.1854 3.27996 9.38006L5.49996 11.7101C5.5929 11.8076 5.70459 11.8853 5.82832 11.9386C5.95204 11.9918 6.08525 12.0195 6.21996 12.0201C6.35395 12.0208 6.48673 11.9947 6.61041 11.9432C6.7341 11.8916 6.84616 11.8158 6.93996 11.7201L13.72 4.72006C13.8119 4.62551 13.8843 4.51378 13.933 4.39124C13.9818 4.26871 14.0059 4.13778 14.004 4.00592C14.0022 3.87406 13.9744 3.74386 13.9222 3.62275C13.87 3.50163 13.7945 3.39199 13.7 3.30006C13.6054 3.20814 13.4937 3.13573 13.3711 3.08699C13.2486 3.03824 13.1177 3.01411 12.9858 3.01597C12.854 3.01783 12.7238 3.04564 12.6026 3.09781C12.4815 3.14999 12.3719 3.22551 12.28 3.32006L6.22996 9.58006L4.71996 8.00006Z" fill="black"/>
            </svg>
}
function CheckM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6.43762 12.6425C6.1635 12.4176 5.80629 12.2955 5.43766 12.3009C5.06903 12.3062 4.71625 12.4385 4.45007 12.6712C4.18389 12.9039 4.02401 13.2199 4.00249 13.5556C3.98098 13.8914 4.09942 14.2222 4.33407 14.4816L7.57705 17.5868C7.71283 17.7168 7.87598 17.8204 8.05672 17.8913C8.23745 17.9623 8.43205 17.9993 8.62883 18C8.82456 18.001 9.01853 17.9662 9.19921 17.8975C9.37989 17.8288 9.54359 17.7277 9.68061 17.6002L19.5849 8.27119C19.7191 8.14518 19.8249 7.99628 19.8961 7.83298C19.9673 7.66968 20.0026 7.49518 19.9999 7.31945C19.9971 7.14372 19.9565 6.9702 19.8803 6.80879C19.8041 6.64738 19.6938 6.50125 19.5556 6.37874C19.4175 6.25624 19.2543 6.15974 19.0753 6.09478C18.8963 6.02982 18.705 5.99766 18.5124 6.00013C18.3198 6.00261 18.1296 6.03967 17.9527 6.10921C17.7758 6.17874 17.6156 6.27939 17.4813 6.4054L8.64344 14.7482L6.43762 12.6425Z" fill="#111111"/>
            </svg>
}
function CheckXL(size: string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M16.4847 29.0671C15.8679 28.5569 15.0642 28.2801 14.2347 28.2922C13.4053 28.3043 12.6116 28.6044 12.0126 29.1323C11.4137 29.6601 11.054 30.3768 11.0056 31.1384C10.9572 31.9 11.2237 32.6503 11.7517 33.2388L19.0484 40.2823C19.3539 40.5771 19.721 40.812 20.1276 40.9731C20.5343 41.1341 20.9721 41.2179 21.4149 41.2195C21.8553 41.2218 22.2917 41.1428 22.6982 40.987C23.1047 40.8312 23.4731 40.6018 23.7814 40.3126L46.0659 19.1517C46.3681 18.8659 46.606 18.5281 46.7662 18.1577C46.9265 17.7873 47.0058 17.3915 46.9997 16.9929C46.9936 16.5943 46.9022 16.2007 46.7307 15.8346C46.5592 15.4685 46.311 15.137 46.0002 14.8591C45.6894 14.5812 45.3222 14.3623 44.9194 14.215C44.5167 14.0676 44.0863 13.9947 43.6529 14.0003C43.2195 14.0059 42.7916 14.09 42.3935 14.2477C41.9955 14.4054 41.6351 14.6337 41.3329 14.9196L21.4477 33.8434L16.4847 29.0671Z" fill="#111111"/>
            </svg>
}
function CloseS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.27933 11.3718C2.90689 11.7442 2.90689 12.3481 3.27933 12.7205C3.65177 13.093 4.25561 13.093 4.62805 12.7205L7.99994 9.34861L11.3719 12.7207C11.7444 13.0931 12.3482 13.0931 12.7207 12.7207C13.0931 12.3482 13.0931 11.7444 12.7207 11.3719L9.34866 7.99986L12.7204 4.62808C13.0928 4.25563 13.0928 3.65178 12.7204 3.27933C12.348 2.90689 11.7441 2.90689 11.3717 3.27933L7.99994 6.65112L4.62833 3.27946C4.25589 2.90702 3.65205 2.90702 3.27961 3.27946C2.90717 3.65191 2.90717 4.25576 3.27961 4.62821L6.65121 7.99986L3.27933 11.3718Z" fill="#111111"/>
            </svg>
}
function CloseM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.33496 16.0461C5.88802 16.4931 5.88802 17.2177 6.33496 17.6646C6.78189 18.1116 7.50652 18.1116 7.95346 17.6646L11.9998 13.6183L16.0463 17.6648C16.4932 18.1117 17.2179 18.1117 17.6648 17.6648C18.1117 17.2178 18.1117 16.4932 17.6648 16.0463L13.6183 11.9998L17.6645 7.95364C18.1114 7.5067 18.1114 6.78208 17.6645 6.33514C17.2175 5.88821 16.4929 5.8882 16.046 6.33514L11.9998 10.3813L7.95379 6.33529C7.50685 5.88836 6.78223 5.88836 6.33529 6.33529C5.88835 6.78223 5.88835 7.50686 6.33529 7.95379L10.3813 11.9998L6.33496 16.0461Z" fill="#111111"/>
            </svg>
}
function CloseL(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.39131 20.7205C8.86989 21.2419 8.86989 22.0873 9.39131 22.6087C9.91273 23.1301 10.7581 23.1301 11.2795 22.6087L16.0002 17.888L20.7211 22.6089C21.2425 23.1303 22.0879 23.1303 22.6093 22.6089C23.1308 22.0874 23.1308 21.2421 22.6093 20.7206L17.8885 15.9998L22.6089 11.2793C23.1304 10.7579 23.1304 9.91249 22.6089 9.39107C22.0875 8.86964 21.2421 8.86964 20.7207 9.39107L16.0002 14.1115L11.2799 9.39124C10.7585 8.86982 9.91312 8.86982 9.3917 9.39124C8.87027 9.91267 8.87027 10.7581 9.3917 11.2795L14.112 15.9998L9.39131 20.7205Z" fill="#111111"/>
            </svg>
}
function CloseBigM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.50256 18.0692C2.83215 18.7396 2.83215 19.8265 3.50256 20.4969C4.17296 21.1673 5.2599 21.1673 5.93031 20.4969L11.9999 14.4273L18.0699 20.4972C18.7403 21.1676 19.8272 21.1676 20.4976 20.4972C21.168 19.8268 21.168 18.7399 20.4976 18.0695L14.4277 11.9995L20.4968 5.93043C21.1672 5.26002 21.1672 4.17309 20.4968 3.50268C19.8264 2.83228 18.7395 2.83228 18.0691 3.50268L11.9999 9.57179L5.93113 3.50299C5.26072 2.83258 4.17378 2.83258 3.50338 3.50299C2.83297 4.17339 2.83297 5.26033 3.50338 5.93074L9.57219 11.9995L3.50256 18.0692Z" fill="#111111"/>
            </svg>
}
function CopyS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12.7368 12.7273H5.78947V5.81818H12.7368V12.7273ZM12.7368 4.54545H5.78947C5.45446 4.54545 5.13317 4.67954 4.89629 4.91823C4.6594 5.15691 4.52632 5.48063 4.52632 5.81818V12.7273C4.52632 13.0648 4.6594 13.3885 4.89629 13.6272C5.13317 13.8659 5.45446 14 5.78947 14H12.7368C13.0719 14 13.3931 13.8659 13.63 13.6272C13.8669 13.3885 14 13.0648 14 12.7273V5.81818C14 5.48063 13.8669 5.15691 13.63 4.91823C13.3931 4.67954 13.0719 4.54545 12.7368 4.54545ZM10.8421 2H3.26316C2.92815 2 2.60686 2.13409 2.36997 2.37277C2.13308 2.61146 2 2.93518 2 3.27273V12.1818H3.26316V3.27273H10.8421V2Z" fill="black"/>
            </svg>
}
function CopyM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 13V12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9H13V5.67C13 5.4923 12.9294 5.32189 12.8038 5.19624C12.6781 5.07059 12.5077 5 12.33 5H5.67C5.4923 5 5.32189 5.07059 5.19624 5.19624C5.07059 5.32189 5 5.4923 5 5.67V12.33C5 12.5077 5.07059 12.6781 5.19624 12.8038C5.32189 12.9294 5.4923 13 5.67 13H9ZM9 15H5.67C4.96268 14.9974 4.28509 14.7152 3.78494 14.2151C3.28478 13.7149 3.00263 13.0373 3 12.33V5.67C3.00263 4.96268 3.28478 4.28509 3.78494 3.78494C4.28509 3.28478 4.96268 3.00263 5.67 3H12.33C13.0373 3.00263 13.7149 3.28478 14.2151 3.78494C14.7152 4.28509 14.9974 4.96268 15 5.67V9H18C18.7957 9 19.5587 9.31607 20.1213 9.87868C20.6839 10.4413 21 11.2044 21 12V18C21 18.7957 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7957 21 18 21H12C11.2044 21 10.4413 20.6839 9.87868 20.1213C9.31607 19.5587 9 18.7957 9 18V15ZM11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11H18C18.2652 11 18.5196 11.1054 18.7071 11.2929C18.8946 11.4804 19 11.7348 19 12V18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19H12C11.7348 19 11.4804 18.8946 11.2929 18.7071C11.1054 18.5196 11 18.2652 11 18V12C11 11.7348 11.1054 11.4804 11.2929 11.2929Z" fill="black"/>
            </svg>
}
function DefaultM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V6C22 3.79086 20.2091 2 18 2H6ZM6 4C4.89543 4 4 4.89543 4 6V15.9987L8.93868 8.99996L16.7009 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM15.5 11C16.8807 11 18 9.88071 18 8.5C18 7.11929 16.8807 6 15.5 6C14.1193 6 13 7.11929 13 8.5C13 9.88071 14.1193 11 15.5 11Z" fill="#111111"/>
            </svg>
}
function EyeClosedS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M1.33341 2.84667L2.18675 2L13.3334 13.1467L12.4867 14L10.4334 11.9467C9.66675 12.2 8.85341 12.3333 8.00008 12.3333C4.66675 12.3333 1.82008 10.26 0.666748 7.33333C1.12675 6.16 1.86008 5.12667 2.79341 4.30667L1.33341 2.84667ZM8.00008 5.33333C8.53051 5.33333 9.03922 5.54405 9.4143 5.91912C9.78937 6.29419 10.0001 6.8029 10.0001 7.33333C10.0001 7.56667 9.96008 7.79333 9.88675 8L7.33342 5.44667C7.54008 5.37333 7.76675 5.33333 8.00008 5.33333ZM8.00008 2.33333C11.3334 2.33333 14.1801 4.40667 15.3334 7.33333C14.7867 8.72 13.8601 9.92 12.6667 10.7933L11.7201 9.84C12.6267 9.21333 13.3734 8.36 13.8801 7.33333C12.7801 5.09333 10.5067 3.66667 8.00008 3.66667C7.27342 3.66667 6.56008 3.78667 5.89341 4L4.86675 2.98C5.82675 2.56667 6.88675 2.33333 8.00008 2.33333ZM2.12008 7.33333C3.22008 9.57333 5.49341 11 8.00008 11C8.46008 11 8.91341 10.9533 9.33342 10.86L7.81342 9.33333C6.86008 9.23333 6.10008 8.47333 6.00008 7.52L3.73341 5.24667C3.07341 5.81333 2.52008 6.52 2.12008 7.33333Z" fill="black"/>
            </svg>
}
function EyeClosedM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2 4.27L3.28 3L20 19.72L18.73 21L15.65 17.92C14.5 18.3 13.28 18.5 12 18.5C7 18.5 2.73 15.39 1 11C1.69 9.24 2.79 7.69 4.19 6.46L2 4.27ZM12 8C12.7956 8 13.5587 8.31607 14.1213 8.87868C14.6839 9.44129 15 10.2044 15 11C15 11.35 14.94 11.69 14.83 12L11 8.17C11.31 8.06 11.65 8 12 8ZM12 3.5C17 3.5 21.27 6.61 23 11C22.18 13.08 20.79 14.88 19 16.19L17.58 14.76C18.94 13.82 20.06 12.54 20.82 11C19.17 7.64 15.76 5.5 12 5.5C10.91 5.5 9.84 5.68 8.84 6L7.3 4.47C8.74 3.85 10.33 3.5 12 3.5ZM3.18 11C4.83 14.36 8.24 16.5 12 16.5C12.69 16.5 13.37 16.43 14 16.29L11.72 14C10.29 13.85 9.15 12.71 9 11.28L5.6 7.87C4.61 8.72 3.78 9.78 3.18 11Z" fill="black"/>
            </svg>
}
function EyeOpenS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M8.00008 6C8.53051 6 9.03922 6.21071 9.4143 6.58579C9.78937 6.96086 10.0001 7.46957 10.0001 8C10.0001 8.53043 9.78937 9.03914 9.4143 9.41421C9.03922 9.78929 8.53051 10 8.00008 10C7.46965 10 6.96094 9.78929 6.58587 9.41421C6.21079 9.03914 6.00008 8.53043 6.00008 8C6.00008 7.46957 6.21079 6.96086 6.58587 6.58579C6.96094 6.21071 7.46965 6 8.00008 6ZM8.00008 3C11.3334 3 14.1801 5.07333 15.3334 8C14.1801 10.9267 11.3334 13 8.00008 13C4.66675 13 1.82008 10.9267 0.666748 8C1.82008 5.07333 4.66675 3 8.00008 3ZM2.12008 8C3.22008 10.24 5.49341 11.6667 8.00008 11.6667C10.5067 11.6667 12.7801 10.24 13.8801 8C12.7801 5.76 10.5067 4.33333 8.00008 4.33333C5.49341 4.33333 3.22008 5.76 2.12008 8Z" fill="black"/>
            </svg>
}
function EyeOpenM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9ZM12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5C7 19.5 2.73 16.39 1 12C2.73 7.61 7 4.5 12 4.5ZM3.18 12C4.83 15.36 8.24 17.5 12 17.5C15.76 17.5 19.17 15.36 20.82 12C19.17 8.64 15.76 6.5 12 6.5C8.24 6.5 4.83 8.64 3.18 12Z" fill="black"/>
            </svg>
}
function FacebookM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M16 4V7.2H14.4C13.848 7.2 13.6 7.848 13.6 8.4V10.4H16V13.6H13.6V20H10.4V13.6H8V10.4H10.4V7.2C10.4 6.35131 10.7371 5.53737 11.3373 4.93726C11.9374 4.33714 12.7513 4 13.6 4H16Z" fill="#4B629E"/>
            </svg>
}
function FacebookL(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M21 6V10H19C18.31 10 18 10.81 18 11.5V14H21V18H18V26H14V18H11V14H14V10C14 8.93913 14.4214 7.92172 15.1716 7.17157C15.9217 6.42143 16.9391 6 18 6H21Z" fill="#4B629E"/>
            </svg>  
}
function FalseXL(size: string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.0054 40.1386C9.66455 41.4794 9.66455 43.6533 11.0054 44.9941C12.3462 46.3349 14.5201 46.3349 15.8609 44.9941L27.9995 32.8554L40.1386 44.9945C41.4794 46.3353 43.6533 46.3353 44.9941 44.9945C46.3349 43.6537 46.3349 41.4799 44.9941 40.139L32.855 27.9999L44.9939 15.8611C46.3347 14.5203 46.3347 12.3464 44.9939 11.0056C43.6531 9.6648 41.4792 9.6648 40.1384 11.0056L27.9995 23.1444L15.8611 11.0061C14.5203 9.66526 12.3464 9.66526 11.0056 11.0061C9.66482 12.3469 9.66481 14.5208 11.0056 15.8616L23.144 27.9999L11.0054 40.1386Z" fill="#111111"/>
            </svg>
}
function FileM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M13.1167 9.10107V3.60107L18.6167 9.10107H13.1167ZM6.1167 2.10107C5.0067 2.10107 4.1167 2.99107 4.1167 4.10107V20.1011C4.1167 20.6315 4.32741 21.1402 4.70249 21.5153C5.07756 21.8904 5.58627 22.1011 6.1167 22.1011H18.1167C18.6471 22.1011 19.1558 21.8904 19.5309 21.5153C19.906 21.1402 20.1167 20.6315 20.1167 20.1011V8.10107L14.1167 2.10107H6.1167Z" fill="black"/>
            </svg>
}
function FilterS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M9.49975 8V13.2533C9.52975 13.4533 9.45476 13.6667 9.28229 13.8067C8.98984 14.0667 8.51741 14.0667 8.22496 13.8067L6.71771 12.4667C6.54524 12.3133 6.47025 12.1067 6.50025 11.9133V8H6.47775L2.15847 3.08C1.90351 2.79333 1.9635 2.37333 2.28594 2.14667C2.42842 2.05333 2.5859 2 2.75087 2H13.2491C13.4141 2 13.5716 2.05333 13.7141 2.14667C14.0365 2.37333 14.0965 2.79333 13.8415 3.08L9.52225 8H9.49975Z" fill="black"/>
            </svg>
}
function FilterM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M14.0001 12V19.88C14.0401 20.18 13.9401 20.5 13.7101 20.71C13.3201 21.1 12.6901 21.1 12.3001 20.71L10.2901 18.7C10.0601 18.47 9.9601 18.16 10.0001 17.87V12H9.9701L4.2101 4.62C3.8701 4.19 3.9501 3.56 4.3801 3.22C4.5701 3.08 4.7801 3 5.0001 3H19.0001C19.2201 3 19.4301 3.08 19.6201 3.22C20.0501 3.56 20.1301 4.19 19.7901 4.62L14.0301 12H14.0001Z" fill="black"/>
            </svg>
}
function FreeTestM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M19 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V8.94L1.23 5.64C1.09 5.47 1 5.24 1 5C1 4.73478 1.10536 4.48043 1.29289 4.29289C1.48043 4.10536 1.73478 4 2 4H19C19.5304 4 20.0391 4.21071 20.4142 4.58579C20.7893 4.96086 21 5.46957 21 6V18C21 18.5304 20.7893 19.0391 20.4142 19.4142C20.0391 19.7893 19.5304 20 19 20ZM7.5 7C7.36739 7 7.24021 7.05268 7.14645 7.14645C7.05268 7.24021 7 7.36739 7 7.5V8.5C7 8.63261 7.05268 8.75979 7.14645 8.85355C7.24021 8.94732 7.36739 9 7.5 9H17.5C17.6326 9 17.7598 8.94732 17.8536 8.85355C17.9473 8.75979 18 8.63261 18 8.5V7.5C18 7.36739 17.9473 7.24021 17.8536 7.14645C17.7598 7.05268 17.6326 7 17.5 7H7.5ZM7.5 11C7.36739 11 7.24021 11.0527 7.14645 11.1464C7.05268 11.2402 7 11.3674 7 11.5V12.5C7 12.6326 7.05268 12.7598 7.14645 12.8536C7.24021 12.9473 7.36739 13 7.5 13H17.5C17.6326 13 17.7598 12.9473 17.8536 12.8536C17.9473 12.7598 18 12.6326 18 12.5V11.5C18 11.3674 17.9473 11.2402 17.8536 11.1464C17.7598 11.0527 17.6326 11 17.5 11H7.5ZM7.5 15C7.36739 15 7.24021 15.0527 7.14645 15.1464C7.05268 15.2402 7 15.3674 7 15.5V16.5C7 16.6326 7.05268 16.7598 7.14645 16.8536C7.24021 16.9473 7.36739 17 7.5 17H12.5C12.6326 17 12.7598 16.9473 12.8536 16.8536C12.9473 16.7598 13 16.6326 13 16.5V15.5C13 15.3674 12.9473 15.2402 12.8536 15.1464C12.7598 15.0527 12.6326 15 12.5 15H7.5Z" fill="black"/>
            </svg>
}
function GoogleM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="4" y="4" width="15.9995" height="15.9998" fill="white" fillOpacity="0.01"/>
                <path d="M7.54632 13.6683L6.9894 15.7474L4.95387 15.7905C4.34554 14.6621 4.00049 13.3712 4.00049 11.9993C4.00049 10.6727 4.3231 9.42177 4.89496 8.32025H4.8954L6.70759 8.6525L7.50144 10.4538C7.33529 10.9382 7.24473 11.4582 7.24473 11.9993C7.2448 12.5866 7.35117 13.1492 7.54632 13.6683Z" fill="#FBBB00"/>
                <path d="M19.8604 10.5052C19.9523 10.9891 20.0002 11.4889 20.0002 11.9997C20.0002 12.5724 19.9399 13.1311 19.8252 13.67C19.4358 15.5038 18.4182 17.1051 17.0086 18.2383L17.0082 18.2378L14.7256 18.1214L14.4026 16.1047C15.3379 15.5561 16.0689 14.6977 16.454 13.67H12.1763V10.5052H16.5164H19.8604Z" fill="#518EF8"/>
                <path d="M17.0077 18.2383L17.0082 18.2388C15.6373 19.3407 13.8957 20.0001 12 20.0001C8.95349 20.0001 6.30479 18.2972 4.95361 15.7913L7.54607 13.6692C8.22164 15.4722 9.96093 16.7557 12 16.7557C12.8764 16.7557 13.6975 16.5188 14.4021 16.1052L17.0077 18.2383Z" fill="#28B446"/>
                <path d="M17.1068 5.84172L14.5152 7.96344C13.786 7.50763 12.924 7.24433 12.0005 7.24433C9.91533 7.24433 8.14351 8.58671 7.50178 10.4544L4.8957 8.32081H4.89526C6.22666 5.75382 8.90877 4 12.0005 4C13.9416 4 15.7213 4.69143 17.1068 5.84172Z" fill="#F14336"/>
            </svg>
}
function GoogleL(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="5.3335" y="5.33337" width="21" height="21" fill="white" fillOpacity="0.01"/>
                <path d="M10.4325 18.0853L9.73631 20.6842L7.19178 20.738C6.43133 19.3276 6 17.7139 6 15.9991C6 14.3409 6.40329 12.7772 7.11814 11.4003H7.11869L9.38403 11.8156L10.3764 14.0672C10.1687 14.6727 10.0555 15.3227 10.0555 15.9991C10.0556 16.7331 10.1885 17.4364 10.4325 18.0853Z" fill="#FBBB00"/>
                <path d="M25.8253 14.1313C25.9401 14.7362 26 15.3609 26 15.9994C26 16.7153 25.9248 17.4136 25.7814 18.0873C25.2945 20.3795 24.0225 22.3811 22.2604 23.7976L22.2599 23.797L19.4066 23.6515L19.0027 21.1306C20.172 20.4449 21.0857 19.3719 21.5671 18.0873H16.2197V14.1313H21.6451H25.8253Z" fill="#518EF8"/>
                <path d="M22.2598 23.7978L22.2603 23.7984C20.5466 25.1758 18.3696 26 15.9998 26C12.1915 26 8.88045 23.8715 7.19141 20.7391L10.4321 18.0864C11.2766 20.3402 13.4508 21.9446 15.9998 21.9446C17.0954 21.9446 18.1218 21.6484 19.0026 21.1314L22.2598 23.7978Z" fill="#28B446"/>
                <path d="M22.3835 8.30214L19.1439 10.9543C18.2323 10.3845 17.1548 10.0554 16.0004 10.0554C13.3938 10.0554 11.1789 11.7334 10.3767 14.068L7.11896 11.401H7.11841C8.78273 8.19226 12.1355 6 16.0004 6C18.4268 6 20.6516 6.86428 22.3835 8.30214Z" fill="#F14336"/>
            </svg>
}
function HelpM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M15.07 11.25L14.17 12.17C13.45 12.89 13 13.5 13 15H11V14.5C11 13.39 11.45 12.39 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.89 13.1 7 12 7C11.4696 7 10.9609 7.21071 10.5858 7.58579C10.2107 7.96086 10 8.46957 10 9H8C8 7.93913 8.42143 6.92172 9.17157 6.17157C9.92172 5.42143 10.9391 5 12 5C13.0609 5 14.0783 5.42143 14.8284 6.17157C15.5786 6.92172 16 7.93913 16 9C16 9.88 15.64 10.67 15.07 11.25ZM13 19H11V17H13V19ZM12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 6.47 17.5 2 12 2Z" fill="black"/>
            </svg>
}
function InfoM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11 9H13V7H11V9ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM11 17H13V11H11V17Z" fill="black"/>
            </svg>
}
function InstagramL(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11.8 6H20.2C23.4 6 26 8.6 26 11.8V20.2C26 21.7383 25.3889 23.2135 24.3012 24.3012C23.2135 25.3889 21.7383 26 20.2 26H11.8C8.6 26 6 23.4 6 20.2V11.8C6 10.2617 6.61107 8.78649 7.69878 7.69878C8.78649 6.61107 10.2617 6 11.8 6ZM11.6 8C10.6452 8 9.72955 8.37928 9.05442 9.05442C8.37928 9.72955 8 10.6452 8 11.6V20.4C8 22.39 9.61 24 11.6 24H20.4C21.3548 24 22.2705 23.6207 22.9456 22.9456C23.6207 22.2705 24 21.3548 24 20.4V11.6C24 9.61 22.39 8 20.4 8H11.6ZM21.25 9.5C21.5815 9.5 21.8995 9.6317 22.1339 9.86612C22.3683 10.1005 22.5 10.4185 22.5 10.75C22.5 11.0815 22.3683 11.3995 22.1339 11.6339C21.8995 11.8683 21.5815 12 21.25 12C20.9185 12 20.6005 11.8683 20.3661 11.6339C20.1317 11.3995 20 11.0815 20 10.75C20 10.4185 20.1317 10.1005 20.3661 9.86612C20.6005 9.6317 20.9185 9.5 21.25 9.5ZM16 11C17.3261 11 18.5979 11.5268 19.5355 12.4645C20.4732 13.4021 21 14.6739 21 16C21 17.3261 20.4732 18.5979 19.5355 19.5355C18.5979 20.4732 17.3261 21 16 21C14.6739 21 13.4021 20.4732 12.4645 19.5355C11.5268 18.5979 11 17.3261 11 16C11 14.6739 11.5268 13.4021 12.4645 12.4645C13.4021 11.5268 14.6739 11 16 11ZM16 13C15.2044 13 14.4413 13.3161 13.8787 13.8787C13.3161 14.4413 13 15.2044 13 16C13 16.7956 13.3161 17.5587 13.8787 18.1213C14.4413 18.6839 15.2044 19 16 19C16.7956 19 17.5587 18.6839 18.1213 18.1213C18.6839 17.5587 19 16.7956 19 16C19 15.2044 18.6839 14.4413 18.1213 13.8787C17.5587 13.3161 16.7956 13 16 13Z" fill="url(#paint0_linear_2323_13646)"/>
                <defs>
                <linearGradient id="paint0_linear_2323_13646" x1="8" y1="25" x2="24.5" y2="7.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFC400"/>
                <stop offset="1" stopColor="#DA00AE"/>
                </linearGradient>
                </defs>
            </svg>
}
function LinkM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10.7796 13.2204C11.1344 13.558 11.1344 14.112 10.7796 14.4496C10.442 14.7871 9.88802 14.7871 9.55045 14.4496C7.86259 12.7617 7.86259 10.0179 9.55045 8.33L12.6146 5.26589C14.3024 3.57804 17.0463 3.57804 18.7341 5.26589C20.422 6.95375 20.422 9.69759 18.7341 11.3854L17.4444 12.6751C17.4531 11.9654 17.3405 11.2556 17.0982 10.5805L17.505 10.165C18.5264 9.15229 18.5264 7.50771 17.505 6.495C16.4923 5.47363 14.8477 5.47363 13.835 6.495L10.7796 9.55045C9.75818 10.5632 9.75818 12.2077 10.7796 13.2204ZM13.2204 9.55045C13.558 9.21288 14.112 9.21288 14.4496 9.55045C16.1374 11.2383 16.1374 13.9821 14.4496 15.67L11.3854 18.7341C9.69759 20.422 6.95375 20.422 5.26589 18.7341C3.57804 17.0463 3.57804 14.3024 5.26589 12.6146L6.55559 11.3249C6.54693 12.0346 6.65945 12.7444 6.90181 13.4282L6.495 13.835C5.47363 14.8477 5.47363 16.4923 6.495 17.505C7.50771 18.5264 9.15229 18.5264 10.165 17.505L13.2204 14.4496C14.2418 13.4368 14.2418 11.7923 13.2204 10.7796C12.8656 10.442 12.8656 9.88802 13.2204 9.55045Z" fill="black"/>
            </svg>
}
function LoaderS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <g clipPath="url(#clip0_2323_13559)">
                <path d="M15.737 7.51842C15.7277 7.31936 15.6397 7.13213 15.4924 6.99793C15.3451 6.86373 15.1505 6.79355 14.9514 6.80282C14.7524 6.8121 14.5651 6.90007 14.4309 7.04739C14.2967 7.19471 14.2266 7.3893 14.2358 7.58837C14.299 8.93184 13.909 10.2576 13.1284 11.3528C12.3477 12.4481 11.2218 13.2492 9.93117 13.6278C8.64058 14.0063 7.26022 13.9403 6.01168 13.4402C4.76313 12.9401 3.7188 12.0351 3.04632 10.8703C2.37384 9.70555 2.11221 8.34861 2.30342 7.01731C2.49463 5.68601 3.1276 4.45756 4.10072 3.52914C5.07384 2.60073 6.33068 2.02619 7.6695 1.89775C9.00831 1.76931 10.3515 2.09442 11.4833 2.8209C11.5664 2.87416 11.6591 2.91054 11.7563 2.92796C11.8534 2.94538 11.953 2.94349 12.0494 2.92242C12.1458 2.90134 12.2371 2.86149 12.3181 2.80513C12.3991 2.74877 12.4682 2.67701 12.5214 2.59394C12.5747 2.51088 12.6111 2.41814 12.6285 2.32101C12.6459 2.22389 12.644 2.12429 12.623 2.02789C12.6019 1.93149 12.562 1.84019 12.5057 1.7592C12.4493 1.6782 12.3775 1.6091 12.2945 1.55584C10.8795 0.648245 9.20068 0.242317 7.52738 0.4032C5.85407 0.564083 4.28333 1.28245 3.06722 2.44302C1.85112 3.60358 1.06016 5.13906 0.821287 6.80302C0.582414 8.46698 0.909478 10.163 1.74999 11.6188C2.5905 13.0746 3.89572 14.2058 5.45619 14.8309C7.01666 15.456 8.7419 15.5388 10.355 15.0659C11.9682 14.593 13.3757 13.5919 14.3516 12.2232C15.3276 10.8545 15.8155 9.19761 15.737 7.51842Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_2323_13559">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
            </svg>
}
function LoaderM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <g clipPath="url(#clip0_2323_13614)">
                <path d="M22.1036 11.3811C22.0914 11.1207 21.9764 10.8759 21.7837 10.7004C21.591 10.5248 21.3365 10.4331 21.0762 10.4452C20.8158 10.4573 20.571 10.5724 20.3955 10.765C20.2199 10.9577 20.1281 11.2122 20.1403 11.4726C20.2229 13.2296 19.7129 14.9635 18.6919 16.3959C17.6709 17.8283 16.1983 18.8762 14.5104 19.3712C12.8225 19.8663 11.0172 19.7799 9.38427 19.1259C7.75136 18.4719 6.38553 17.2882 5.50602 15.7649C4.62651 14.2415 4.28434 12.4669 4.53441 10.7257C4.78449 8.98456 5.61232 7.37792 6.88502 6.16369C8.15772 4.94946 9.80148 4.19805 11.5525 4.03007C13.3034 3.86209 15.0601 4.28729 16.5404 5.23741C16.649 5.30707 16.7703 5.35464 16.8974 5.37743C17.0244 5.40021 17.1547 5.39775 17.2807 5.37018C17.4068 5.34262 17.5262 5.29049 17.6321 5.21678C17.7381 5.14307 17.8284 5.04922 17.8981 4.94058C17.9678 4.83195 18.0153 4.71065 18.0381 4.58363C18.0609 4.45661 18.0584 4.32634 18.0309 4.20027C18.0033 4.07419 17.9512 3.95479 17.8775 3.84886C17.8038 3.74293 17.7099 3.65256 17.6013 3.5829C15.7507 2.39589 13.555 1.865 11.3666 2.07541C9.17815 2.28582 7.12385 3.22534 5.53335 4.74319C3.94286 6.26105 2.9084 8.26922 2.596 10.4454C2.28358 12.6217 2.71134 14.8398 3.8106 16.7437C4.90987 18.6477 6.61691 20.1272 8.65778 20.9448C10.6986 21.7623 12.955 21.8705 15.0648 21.2521C17.1745 20.6336 19.0153 19.3243 20.2917 17.5342C21.5682 15.7442 22.2063 13.5772 22.1036 11.3811Z" fill="#111111"/>
                </g>
                <defs>
                <clipPath id="clip0_2323_13614">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
        </svg>
}
function LockM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6.33334 10H7.33334V8.66666C7.33334 6.09344 9.42675 4 12 4C14.5733 4 16.6667 6.09344 16.6667 8.66666V10H17.6667C17.8509 10 18 10.1491 18 10.3333V18.6667C18 19.402 17.402 20 16.6667 20H7.33331C6.59797 20 6 19.402 6 18.6667V10.3333C6 10.1491 6.14909 10 6.33334 10ZM11.0019 16.9632C10.9915 17.0573 11.0218 17.1517 11.0849 17.2223C11.1481 17.293 11.2386 17.3333 11.3333 17.3333H12.6667C12.7614 17.3333 12.8519 17.293 12.915 17.2223C12.9782 17.1517 13.0085 17.0573 12.998 16.9632L12.7877 15.0723C13.1292 14.8239 13.3333 14.431 13.3333 14C13.3333 13.2647 12.7353 12.6667 12 12.6667C11.2646 12.6667 10.6666 13.2646 10.6666 14C10.6666 14.431 10.8707 14.8239 11.2122 15.0723L11.0019 16.9632ZM9.33334 10H14.6667V8.66666C14.6667 7.19628 13.4704 6 12 6C10.5296 6 9.33334 7.19628 9.33334 8.66666V10Z" fill="black"/>
            </svg>
}
function MinusS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="2" y="7" width="12" height="2" rx="1" fill="#111111"/>
            </svg>
}
function MusicOffS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2 3.51333L2.85333 2.66667L14 13.8133L13.1533 14.6667L6.66667 8.18V11.6667C6.66667 12.2855 6.42083 12.879 5.98325 13.3166C5.54566 13.7542 4.95217 14 4.33333 14C3.71449 14 3.121 13.7542 2.68342 13.3166C2.24583 12.879 2 12.2855 2 11.6667C2 11.0478 2.24583 10.4543 2.68342 10.0168C3.121 9.57917 3.71449 9.33333 4.33333 9.33333C4.69333 9.33333 5.03333 9.41333 5.33333 9.56V6.84667L2 3.51333ZM14.6667 2V10.3333C14.6667 11 14.38 11.6133 13.92 12.04L10.6267 8.74667C11.0533 8.28667 11.6667 8 12.3333 8C12.6933 8 13.0333 8.08 13.3333 8.22667V4.31333L7.44667 5.56667L5.77333 3.89333L14.6667 2Z" fill="black"/>
            </svg>
}
function MusicOffM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M22 3V15.5C22 16.4283 21.6313 17.3185 20.9749 17.9749C20.3185 18.6313 19.4283 19 18.5 19C17.5717 19 16.6815 18.6313 16.0251 17.9749C15.3687 17.3185 15 16.4283 15 15.5C15 14.5717 15.3687 13.6815 16.0251 13.0251C16.6815 12.3687 17.5717 12 18.5 12C19.04 12 19.55 12.12 20 12.34V6.47L10 8.6V17.5C10 18.4283 9.63125 19.3185 8.97487 19.9749C8.3185 20.6313 7.42826 21 6.5 21C5.57174 21 4.6815 20.6313 4.02513 19.9749C3.36875 19.3185 3 18.4283 3 17.5C3 16.5717 3.36875 15.6815 4.02513 15.0251C4.6815 14.3687 5.57174 14 6.5 14C7.04 14 7.55 14.12 8 14.34V6L22 3Z" fill="black"/>
            </svg>
}
function MusicOnS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M14.6667 2V10.3333C14.6667 10.9522 14.4208 11.5457 13.9832 11.9832C13.5457 12.4208 12.9522 12.6667 12.3333 12.6667C11.7145 12.6667 11.121 12.4208 10.6834 11.9832C10.2458 11.5457 10 10.9522 10 10.3333C10 9.7145 10.2458 9.121 10.6834 8.68342C11.121 8.24583 11.7145 8 12.3333 8C12.6933 8 13.0333 8.08 13.3333 8.22667V4.31333L6.66667 5.73333V11.6667C6.66667 12.2855 6.42083 12.879 5.98325 13.3166C5.54566 13.7542 4.95217 14 4.33333 14C3.71449 14 3.121 13.7542 2.68342 13.3166C2.24583 12.879 2 12.2855 2 11.6667C2 11.0478 2.24583 10.4543 2.68342 10.0168C3.121 9.57917 3.71449 9.33333 4.33333 9.33333C4.69333 9.33333 5.03333 9.41333 5.33333 9.56V4L14.6667 2Z" fill="black"/>
            </svg>
}
function MusicOnM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 5.27L4.28 4L21 20.72L19.73 22L10 12.27V17.5C10 18.4283 9.63125 19.3185 8.97487 19.9749C8.3185 20.6313 7.42826 21 6.5 21C5.57174 21 4.6815 20.6313 4.02513 19.9749C3.36875 19.3185 3 18.4283 3 17.5C3 16.5717 3.36875 15.6815 4.02513 15.0251C4.6815 14.3687 5.57174 14 6.5 14C7.04 14 7.55 14.12 8 14.34V10.27L3 5.27ZM22 3V15.5C22 16.5 21.57 17.42 20.88 18.06L15.94 13.12C16.58 12.43 17.5 12 18.5 12C19.04 12 19.55 12.12 20 12.34V6.47L11.17 8.35L8.66 5.84L22 3Z" fill="black"/>
            </svg>
}
function PenM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.3599 4.94072C19.0338 4.61604 18.6134 4.40274 18.1588 4.33129C17.7042 4.25984 17.2386 4.33391 16.8286 4.5429C16.8054 4.5098 16.5885 4.2704 16.5033 4.1845C16.0973 3.77943 15.5472 3.55194 14.9736 3.55194C14.4001 3.55194 13.85 3.77943 13.444 4.1845L9.59248 8.03599C9.46048 8.16803 9.38632 8.3471 9.38632 8.5338C9.38632 8.72051 9.46048 8.89957 9.59248 9.03161C9.72559 9.16158 9.90425 9.23433 10.0903 9.23433C10.2763 9.23433 10.455 9.16158 10.5881 9.03161L14.4396 5.18012C14.5813 5.03853 14.7734 4.95899 14.9736 4.95899C15.1739 4.95899 15.366 5.03853 15.5077 5.18012L15.7654 5.43853L14.1988 7.00447C14.1304 7.07309 14.092 7.16601 14.092 7.26288C14.092 7.35975 14.1304 7.45266 14.1988 7.52129L16.78 10.099C16.8484 10.1673 16.9411 10.2057 17.0378 10.2057C17.1344 10.2057 17.2271 10.1673 17.2955 10.099L19.3599 8.03459C19.7698 7.62413 20.0001 7.06775 20.0001 6.48765C20.0001 5.90755 19.7698 5.35117 19.3599 4.94072ZM13.4243 8.29504C13.3558 8.22672 13.263 8.18835 13.1663 8.18835C13.0695 8.18835 12.9767 8.22672 12.9082 8.29504L7.11547 14.0892C7.01362 14.1908 6.93282 14.3115 6.87768 14.4444C6.82255 14.5773 6.79417 14.7198 6.79417 14.8637C6.79417 15.0076 6.82255 15.1501 6.87768 15.283C6.93282 15.4159 7.01362 15.5366 7.11547 15.6382L8.66451 17.1873C8.76615 17.2891 8.88687 17.3699 9.01978 17.4251C9.15268 17.4802 9.29515 17.5086 9.43904 17.5086C9.58292 17.5086 9.72539 17.4802 9.8583 17.4251C9.9912 17.3699 10.1119 17.2891 10.2136 17.1873L16.007 11.3938C16.0753 11.3253 16.1137 11.2325 16.1137 11.1358C16.1137 11.039 16.0753 10.9462 16.007 10.8777L13.4243 8.29504ZM5.81773 15.9673C5.87463 15.9839 5.92642 16.0146 5.9683 16.0566L8.39114 18.4801C8.43309 18.522 8.46379 18.5738 8.48039 18.6307C8.49699 18.6876 8.49896 18.7478 8.48611 18.8056C8.47326 18.8635 8.44601 18.9172 8.40688 18.9617C8.36776 19.0062 8.31802 19.0402 8.26229 19.0603L4.46995 20.4291C4.4068 20.4509 4.33883 20.4546 4.27367 20.44C4.20851 20.4253 4.14872 20.3928 4.10099 20.346C4.05373 20.2988 4.02088 20.2391 4.00629 20.1739C3.99171 20.1087 3.99598 20.0407 4.01861 19.9778L5.38811 16.1854C5.40829 16.1297 5.44221 16.08 5.48674 16.0409C5.53126 16.0017 5.58494 15.9745 5.6428 15.9616C5.70066 15.9488 5.76083 15.9507 5.81773 15.9673Z" fill="black"/>
            </svg>
}
function PeopleM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M16.4 17.8667V20H1V17.8667C1 17.8667 1 13.6 8.7 13.6C16.4 13.6 16.4 17.8667 16.4 17.8667ZM12.55 7.73338C12.55 6.995 12.3242 6.2732 11.9012 5.65925C11.4781 5.04531 10.8768 4.5668 10.1733 4.28424C9.46984 4.00167 8.69573 3.92774 7.9489 4.07179C7.20208 4.21584 6.51607 4.57141 5.97764 5.09352C5.43921 5.61563 5.07253 6.28085 4.92398 7.00504C4.77542 7.72923 4.85167 8.47988 5.14306 9.16206C5.43446 9.84423 5.92793 10.4273 6.56105 10.8375C7.19418 11.2477 7.93854 11.4667 8.7 11.4667C9.72108 11.4667 10.7003 11.0734 11.4224 10.3732C12.1444 9.6731 12.55 8.72351 12.55 7.73338ZM16.334 13.6C17.0102 14.1075 17.5635 14.7525 17.955 15.4896C18.3465 16.2268 18.5667 17.0381 18.6 17.8667V20H23V17.8667C23 17.8667 23 13.9947 16.334 13.6ZM15.3 4.00006C14.5429 3.99597 13.8024 4.21547 13.177 4.62939C13.8452 5.5347 14.2045 6.62009 14.2045 7.73338C14.2045 8.84667 13.8452 9.93205 13.177 10.8374C13.8024 11.2513 14.5429 11.4708 15.3 11.4667C16.3211 11.4667 17.3003 11.0734 18.0224 10.3732C18.7444 9.6731 19.15 8.72351 19.15 7.73338C19.15 6.74324 18.7444 5.79365 18.0224 5.09352C17.3003 4.39339 16.3211 4.00006 15.3 4.00006Z" fill="black"/>
            </svg>
}
function PhoneS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3.81556 7.05889C4.93556 9.26 6.74 11.0644 8.94111 12.1844L10.6522 10.4733C10.87 10.2556 11.1733 10.1933 11.4456 10.2789C12.3167 10.5667 13.25 10.7222 14.2222 10.7222C14.4285 10.7222 14.6263 10.8042 14.7722 10.95C14.9181 11.0959 15 11.2937 15 11.5V14.2222C15 14.4285 14.9181 14.6263 14.7722 14.7722C14.6263 14.9181 14.4285 15 14.2222 15C10.7155 15 7.35235 13.6069 4.8727 11.1273C2.39305 8.64765 1 5.28453 1 1.77778C1 1.5715 1.08194 1.37367 1.22781 1.22781C1.37367 1.08194 1.5715 1 1.77778 1H4.5C4.70628 1 4.90411 1.08194 5.04997 1.22781C5.19583 1.37367 5.27778 1.5715 5.27778 1.77778C5.27778 2.75 5.43333 3.68333 5.72111 4.55444C5.80667 4.82667 5.74444 5.13 5.52667 5.34778L3.81556 7.05889Z" fill="black"/>
            </svg>
}
function PhoneL(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11.2178 14.9244C12.4978 17.44 14.56 19.5022 17.0756 20.7822L19.0311 18.8267C19.28 18.5778 19.6267 18.5067 19.9378 18.6044C20.9333 18.9333 22 19.1111 23.1111 19.1111C23.3469 19.1111 23.573 19.2048 23.7397 19.3715C23.9064 19.5382 24 19.7643 24 20V23.1111C24 23.3469 23.9064 23.573 23.7397 23.7397C23.573 23.9064 23.3469 24 23.1111 24C19.1034 24 15.2598 22.4079 12.4259 19.5741C9.59206 16.7402 8 12.8966 8 8.88889C8 8.65314 8.09365 8.42705 8.26035 8.26035C8.42705 8.09365 8.65314 8 8.88889 8H12C12.2357 8 12.4618 8.09365 12.6285 8.26035C12.7952 8.42705 12.8889 8.65314 12.8889 8.88889C12.8889 10 13.0667 11.0667 13.3956 12.0622C13.4933 12.3733 13.4222 12.72 13.1733 12.9689L11.2178 14.9244Z" fill="black"/>
            </svg>
}
function PlayXL(size: string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M22.1536 8.93144C19.491 7.23035 16 9.14263 16 12.3022V43.6978C16 46.8574 19.491 48.7697 22.1536 47.0686L46.724 31.3708C49.1859 29.7979 49.1859 26.2021 46.724 24.6292L22.1536 8.93144Z" fill="black"/>
            </svg>
}
function PlusS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M7 13C7 13.5523 7.44772 14 8 14C8.55228 14 9 13.5523 9 13V9H13C13.5523 9 14 8.55228 14 8C14 7.44772 13.5523 7 13 7H9V3C9 2.44772 8.55228 2 8 2C7.44771 2 7 2.44772 7 3V7H3C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9H7V13Z" fill="#111111"/>
            </svg>
}
function PlusM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.13332 10.8555C4.50125 10.8555 3.98887 11.3679 3.98887 11.9999C3.98887 12.632 4.50126 13.1444 5.13332 13.1444L10.8554 13.1444L10.8554 18.8667C10.8554 19.4988 11.3678 20.0112 11.9999 20.0112C12.632 20.0112 13.1444 19.4988 13.1444 18.8667L13.1443 13.1444L18.8667 13.1444C19.4988 13.1444 20.0112 12.632 20.0112 12C20.0112 11.3679 19.4988 10.8555 18.8667 10.8555L13.1443 10.8555L13.1443 5.13332C13.1443 4.50125 12.632 3.98887 11.9999 3.98887C11.3678 3.98887 10.8554 4.50125 10.8554 5.13332L10.8554 10.8555L5.13332 10.8555Z" fill="#111111"/>
            </svg>
}
function ProfileM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z" fill="black"/>
            </svg>
}
function ProgressCircle0M(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12Z" fill="#F1F1F1"/>
            </svg>
}
function ProgressCircle25M(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12Z" fill="#F1F1F1"/>
                <path d="M22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2V5C13.8565 5 15.637 5.7375 16.9497 7.05025C18.2625 8.36301 19 10.1435 19 12H22Z" fill="#27AE60"/>
            </svg>
}
function ProgressCircle50M(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12Z" fill="#F1F1F1"/>
                <path d="M12 22C13.3132 22 14.6136 21.7413 15.8268 21.2388C17.0401 20.7362 18.1425 19.9997 19.0711 19.0711C19.9997 18.1425 20.7362 17.0401 21.2388 15.8268C21.7413 14.6136 22 13.3132 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V5C12.9193 5 13.8295 5.18106 14.6788 5.53284C15.5281 5.88463 16.2997 6.40024 16.9497 7.05025C17.5998 7.70026 18.1154 8.47194 18.4672 9.32122C18.8189 10.1705 19 11.0807 19 12C19 12.9193 18.8189 13.8295 18.4672 14.6788C18.1154 15.5281 17.5998 16.2997 16.9497 16.9497C16.2997 17.5998 15.5281 18.1154 14.6788 18.4672C13.8295 18.8189 12.9193 19 12 19V22Z" fill="#27AE60"/>
            </svg>
}
function ProgressCircle100M(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12Z" fill="#27AE60"/>
            </svg>
}
function SearchM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.206 16.617L18.296 19.703C18.686 20.099 19.316 20.099 19.706 19.703C20.098 19.308 20.098 18.669 19.706 18.273L16.626 15.193C17.496 14.025 18.013 12.577 18.013 11.007C18.013 7.137 14.876 4 11.007 4C7.137 4 4 7.137 4 11.007C4 14.877 7.137 18.014 11.007 18.014C12.582 18.014 14.036 17.494 15.206 16.617ZM11.006 16.012C8.243 16.012 6.002 13.772 6.002 11.007C6.002 8.243 8.242 6.002 11.007 6.002C13.771 6.002 16.011 8.242 16.011 11.007C16.011 13.771 13.771 16.012 11.008 16.012H11.006Z" fill="#111111"/>
            </svg>
}
function SearchFalseXL(size: string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M42.166 44.3317L35.2135 37.3882C32.581 39.3615 29.3095 40.5315 25.7657 40.5315C17.0583 40.5315 10 33.4732 10 24.7657C10 16.0583 17.0583 9 25.7657 9C34.471 9 41.5292 16.0583 41.5292 24.7657C41.5292 28.2983 40.366 31.5562 38.4085 34.1842L45.3385 41.1143C46.2205 42.0052 46.2205 43.443 45.3385 44.3317C44.461 45.2228 43.0435 45.2228 42.166 44.3317ZM14.5045 24.7657C14.5045 30.987 19.5468 36.027 25.7635 36.027H25.768C31.9847 36.027 37.0247 30.9847 37.0247 24.7657C37.0247 18.5445 31.9847 13.5045 25.7657 13.5045C19.5445 13.5045 14.5045 18.5468 14.5045 24.7657ZM31.1244 30.1256C30.4543 30.7957 29.3678 30.7957 28.6977 30.1256L25.7488 27.1767L22.7997 30.1257C22.1296 30.7958 21.0432 30.7958 20.373 30.1257C19.7029 29.4556 19.7029 28.3691 20.373 27.699L23.3221 24.75L20.3727 21.8006C19.7026 21.1305 19.7026 20.044 20.3727 19.3739C21.0428 18.7038 22.1293 18.7038 22.7994 19.3739L25.7488 22.3233L28.698 19.3741C29.3681 18.7039 30.4546 18.7039 31.1247 19.3741C31.7948 20.0442 31.7948 21.1306 31.1247 21.8007L28.1755 24.75L31.1244 27.6989C31.7945 28.369 31.7945 29.4555 31.1244 30.1256Z" fill="#111111"/>
            </svg>
}
function StarEmptyS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M8 2.19375L9.4037 5.23698C9.54937 5.55279 9.84866 5.77023 10.194 5.81118L13.5221 6.20577L11.0616 8.48118C10.8062 8.71731 10.6919 9.06914 10.7597 9.41025L11.4128 12.6974L8.48844 11.0604C8.18497 10.8905 7.81503 10.8905 7.51156 11.0604L4.58717 12.6974L5.24032 9.41025C5.3081 9.06914 5.19378 8.71731 4.93844 8.48118L2.47793 6.20577L5.80598 5.81118C6.15134 5.77023 6.45063 5.55279 6.5963 5.23698L8 2.19375Z" stroke="black"/>
            </svg>
}
function StarEmptyM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11.6368 3.36129L11.637 3.36177C11.6369 3.36161 11.6368 3.36145 11.6368 3.36129L12 3.19375L11.6368 3.36129ZM12 4.14876L13.8869 8.23953C14.0908 8.68166 14.5098 8.98608 14.9933 9.04341L19.467 9.57383L16.1595 12.6325C15.802 12.9631 15.642 13.4556 15.7369 13.9332L16.6148 18.3518L12.6838 16.1514C12.259 15.9135 11.741 15.9135 11.3162 16.1514L7.38516 18.3518L8.26313 13.9332C8.35802 13.4556 8.19797 12.9631 7.8405 12.6325L7.22945 13.2933L7.8405 12.6325L4.53303 9.57383L9.00667 9.04341C9.49018 8.98608 9.90917 8.68166 10.1131 8.23953L12 4.14876Z" stroke="black" strokeWidth="1.8"/>
            </svg>
}
function StarFilledS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7.54597 1.98433C7.72468 1.5969 8.27532 1.5969 8.45403 1.98433L9.85773 5.02756C9.93057 5.18546 10.0802 5.29418 10.2529 5.31466L13.5809 5.70925C14.0046 5.75949 14.1748 6.28318 13.8615 6.57286L11.401 8.84827C11.2734 8.96634 11.2162 9.14225 11.2501 9.31281L11.9032 12.5999C11.9864 13.0184 11.5409 13.342 11.1686 13.1336L8.24422 11.4967C8.09248 11.4118 7.90752 11.4118 7.75578 11.4967L4.8314 13.1336C4.45909 13.342 4.01361 13.0184 4.09676 12.5999L4.74991 9.31281C4.78379 9.14225 4.72664 8.96634 4.59897 8.84827L2.13846 6.57286C1.82521 6.28318 1.99537 5.75949 2.41906 5.70925L5.74711 5.31466C5.91979 5.29418 6.06943 5.18546 6.14227 5.02756L7.54597 1.98433Z" fill="#FFD912"/>
            </svg>
}
function StarFilledM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11.546 2.98433C11.7247 2.5969 12.2753 2.5969 12.454 2.98433L14.7041 7.86257C14.777 8.02048 14.9266 8.1292 15.0993 8.14967L20.4341 8.7822C20.8578 8.83243 21.028 9.35613 20.7147 9.64581L16.7706 13.2933C16.6429 13.4113 16.5857 13.5872 16.6196 13.7578L17.6666 19.027C17.7497 19.4454 17.3043 19.7691 16.932 19.5607L12.2442 16.9367C12.0925 16.8518 11.9075 16.8518 11.7558 16.9367L7.06804 19.5607C6.69573 19.7691 6.25025 19.4454 6.33341 19.027L7.38038 13.7578C7.41427 13.5872 7.35711 13.4113 7.22945 13.2933L3.28529 9.64581C2.97204 9.35613 3.1422 8.83243 3.56589 8.7822L8.9007 8.14967C9.07338 8.1292 9.22302 8.02048 9.29586 7.86257L11.546 2.98433Z" fill="#FFD912"/>
            </svg>
}
function StudentM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.2471 3.90706L21.5824 7.54709H21.5784C21.7049 7.59622 21.8131 7.68216 21.8884 7.79339C21.9637 7.90463 22.0026 8.03583 21.9999 8.16939C21.9971 8.30296 21.9528 8.4325 21.873 8.54064C21.7931 8.64878 21.6815 8.73035 21.5531 8.7744L12.2177 12.0097C12.1467 12.0348 12.0718 12.0476 11.9963 12.0477C11.9209 12.0474 11.846 12.0346 11.775 12.0097L3.99861 9.31275V13.2815C3.99861 13.5421 3.89323 13.792 3.70566 13.9762C3.51808 14.1604 3.26367 14.2639 2.9984 14.2639C2.73312 14.2639 2.47871 14.1604 2.29114 13.9762C2.10356 13.792 1.99818 13.5421 1.99818 13.2815V8.48362C2.00448 8.41682 2.01835 8.35092 2.03952 8.28714C2.03565 8.2703 2.02788 8.25458 2.0201 8.23886C2.00914 8.2167 1.99818 8.19455 1.99818 8.16926C1.99545 8.03572 2.03435 7.90455 2.10968 7.79335C2.185 7.68214 2.29315 7.59621 2.41961 7.54709L11.755 3.90706C11.913 3.84543 12.089 3.84543 12.2471 3.90706ZM12.0003 13.4781L17.1094 11.7033H17.1081C17.2087 11.6685 17.3163 11.6579 17.4219 11.6724C17.5275 11.687 17.628 11.7261 17.715 11.7867C17.802 11.8473 17.873 11.9274 17.9219 12.0205C17.9709 12.1135 17.9964 12.2168 17.9963 12.3215V15.5961C17.9961 15.7315 17.9532 15.8636 17.8734 15.9741C17.7936 16.0846 17.6809 16.1681 17.5508 16.213L13.55 17.6015C12.545 17.9473 11.4503 17.9473 10.4453 17.6015L6.44445 16.213C6.31437 16.1681 6.20168 16.0846 6.1219 15.9741C6.04213 15.8636 5.9992 15.7315 5.99902 15.5961V12.3215C5.99895 12.2168 6.02445 12.1135 6.07338 12.0205C6.12232 11.9274 6.19327 11.8473 6.28027 11.7867C6.36727 11.7261 6.4678 11.687 6.5734 11.6724C6.67901 11.6579 6.78663 11.6685 6.88722 11.7033L12.0003 13.4781Z" fill="black"/>
            </svg>
}
function SubjectChemistryM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 21C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18C3 17.4 3.18 16.84 3.5 16.37L9 6.81V5C8.73478 5 8.48043 4.89464 8.29289 4.70711C8.10536 4.51957 8 4.26522 8 4V3C8 2.46957 8.21071 1.96086 8.58579 1.58579C8.96086 1.21071 9.46957 1 10 1H14C14.5304 1 15.0391 1.21071 15.4142 1.58579C15.7893 1.96086 16 2.46957 16 3V4C16 4.26522 15.8946 4.51957 15.7071 4.70711C15.5196 4.89464 15.2652 5 15 5V6.81L20.5 16.37C20.82 16.84 21 17.4 21 18C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21H6ZM5 18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8946 5.73478 19 6 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18C19 17.79 18.93 17.59 18.82 17.43L16.53 13.47L14 16L8.93 10.93L5.18 17.43C5.07 17.59 5 17.79 5 18ZM13 9C12.7348 9 12.4804 9.10536 12.2929 9.29289C12.1054 9.48043 12 9.73478 12 10C12 10.2652 12.1054 10.5196 12.2929 10.7071C12.4804 10.8946 12.7348 11 13 11C13.2652 11 13.5196 10.8946 13.7071 10.7071C13.8946 10.5196 14 10.2652 14 10C14 9.73478 13.8946 9.48043 13.7071 9.29289C13.5196 9.10536 13.2652 9 13 9Z" fill="#111111"/>
            </svg>
}
function SubjectComputingM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12.8901 3L14.8501 3.4L11.1101 21L9.15008 20.6L12.8901 3ZM19.5901 12L16.0001 8.41V5.58L22.4201 12L16.0001 18.41V15.58L19.5901 12ZM1.58008 12L8.00008 5.58V8.41L4.41008 12L8.00008 15.58V18.41L1.58008 12Z" fill="#111111"/>
            </svg>
}
function SubjectEconomicsM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M18.5 3.5L3.5 18.5L5.5 20.5L20.5 5.5L18.5 3.5ZM7 4C6.20435 4 5.44129 4.31607 4.87868 4.87868C4.31607 5.44129 4 6.20435 4 7C4 7.79565 4.31607 8.55871 4.87868 9.12132C5.44129 9.68393 6.20435 10 7 10C7.79565 10 8.55871 9.68393 9.12132 9.12132C9.68393 8.55871 10 7.79565 10 7C10 6.20435 9.68393 5.44129 9.12132 4.87868C8.55871 4.31607 7.79565 4 7 4ZM17 14C16.2044 14 15.4413 14.3161 14.8787 14.8787C14.3161 15.4413 14 16.2044 14 17C14 17.7956 14.3161 18.5587 14.8787 19.1213C15.4413 19.6839 16.2044 20 17 20C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17C20 16.2044 19.6839 15.4413 19.1213 14.8787C18.5587 14.3161 17.7956 14 17 14Z" fill="#111111"/>
            </svg>
}
function SubjectEnglishM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M20.7555 2.85949C20.5974 2.7834 20.4085 2.81343 20.2819 2.93499C19.3164 3.86156 17.6528 5.23138 15.2102 6.49528C15.1034 6.55059 15.0253 6.64895 14.9958 6.76556C14.7965 7.55262 14.4054 8.41166 13.8335 9.31883L13.6007 9.68802L14.0347 7.79782C14.0701 7.6437 14.016 7.48276 13.8948 7.38123C13.7736 7.27971 13.6056 7.25478 13.4601 7.31677L13.4099 7.33794C8.48159 9.41249 7.02514 12.6259 6.59559 14.3565C6.44652 14.9572 6.37216 15.552 6.37468 16.1247C6.37567 16.3456 6.38814 16.5562 6.41179 16.7532L3.12713 20.1029C2.96826 20.2648 2.96653 20.5237 3.12327 20.6878C3.20574 20.7741 3.31642 20.8178 3.42749 20.8178C3.52743 20.8178 3.62762 20.7824 3.70772 20.7108L12.7334 12.6042C12.7777 12.6071 7.5942 18.0369 7.64115 18.0369C8.34469 18.0369 9.31653 17.7126 10.4515 17.0993C11.9821 16.2722 13.6926 15.0031 15.398 13.429C15.5382 13.2998 15.5737 13.0923 15.4848 12.9237C15.3958 12.7551 15.2046 12.6674 15.0187 12.7102L13.9618 12.9528L14.3311 12.72C15.3619 12.0701 16.3256 11.6558 17.1953 11.4882C17.2893 11.4701 17.3745 11.4203 17.4365 11.3473C19.4822 8.93535 20.3482 6.55218 20.7145 4.97768C20.8476 4.40539 20.9411 3.83311 20.9919 3.27671C21.0078 3.10197 20.9137 2.93558 20.7555 2.85949Z" fill="#111111"/>
            </svg>
}
function SubjectGeographyM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M15.1548 19.1956L9.15479 17.0856V5.19556L15.1548 7.30556V19.1956ZM20.6548 3.19556C20.5948 3.19556 20.5448 3.19556 20.4948 3.19556L15.1548 5.29556L9.15479 3.19556L3.51479 5.09556C3.30479 5.16556 3.15479 5.34556 3.15479 5.57556V20.6956C3.15479 20.8282 3.20746 20.9553 3.30123 21.0491C3.395 21.1429 3.52218 21.1956 3.65479 21.1956C3.70479 21.1956 3.76479 21.1956 3.81479 21.1656L9.15479 19.0956L15.1548 21.1956L20.7948 19.2956C21.0048 19.1956 21.1548 19.0456 21.1548 18.8156V3.69556C21.1548 3.56295 21.1021 3.43577 21.0083 3.342C20.9146 3.24824 20.7874 3.19556 20.6548 3.19556Z" fill="#111111"/>
            </svg>
}
function SubjectHistoryM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 5H18C18.2652 5 18.5196 5.10536 18.7071 5.29289C18.8946 5.48043 19 5.73478 19 6C19 6.26522 18.8946 6.51957 18.7071 6.70711C18.5196 6.89464 18.2652 7 18 7H6C5.73478 7 5.48043 6.89464 5.29289 6.70711C5.10536 6.51957 5 6.26522 5 6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5ZM21 2V4H3V2H21ZM15 8H17V22H15V8ZM7 8H9V22H7V8ZM11 8H13V22H11V8Z" fill="#111111"/>
            </svg>
}
function SubjectLangDeM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M1 8.36464C1 7.81031 1.09419 7.32044 1.28256 6.89503C1.47093 6.46961 1.72209 6.1151 2.03605 5.83149C2.33745 5.56077 2.67652 5.35451 3.05326 5.21271C3.44256 5.0709 3.83187 5 4.22117 5C4.61047 5 4.9935 5.0709 5.37024 5.21271C5.75955 5.35451 6.11118 5.56077 6.42513 5.83149C6.72653 6.1151 6.97141 6.46961 7.15978 6.89503C7.34815 7.32044 7.44234 7.81031 7.44234 8.36464V9.06077H5.52094V8.36464C5.52094 7.88766 5.38908 7.5396 5.12536 7.32044C4.8742 7.0884 4.5728 6.97238 4.22117 6.97238C3.86954 6.97238 3.56187 7.0884 3.29815 7.32044C3.04698 7.5396 2.9214 7.88766 2.9214 8.36464V15.6354C2.9214 16.1123 3.04698 16.4669 3.29815 16.6989C3.56187 16.918 3.86954 17.0276 4.22117 17.0276C4.5728 17.0276 4.8742 16.918 5.12536 16.6989C5.38908 16.4669 5.52094 16.1123 5.52094 15.6354V13.0442H3.99512V11.3039H7.44234V15.6354C7.44234 16.2155 7.34815 16.7118 7.15978 17.1243C6.97141 17.5368 6.72653 17.8785 6.42513 18.1492C6.11118 18.4328 5.75955 18.6455 5.37024 18.7873C4.9935 18.9291 4.61047 19 4.22117 19C3.83187 19 3.44256 18.9291 3.05326 18.7873C2.67652 18.6455 2.33745 18.4328 2.03605 18.1492C1.72209 17.8785 1.47093 17.5368 1.28256 17.1243C1.09419 16.7118 1 16.2155 1 15.6354V8.36464Z" fill="#111111"/>
                <path d="M9.13357 18.884V5.11602H14.8601V6.97238H11.055V11.0138H14.3703V12.8702H11.055V16.9116H14.8601V18.884H9.13357Z" fill="#111111"/>
                <path d="M18.027 6.97238V11.2652H19.1195C19.4586 11.2652 19.7286 11.2201 19.9295 11.1298C20.1305 11.0267 20.2874 10.8849 20.4005 10.7044C20.5009 10.5239 20.57 10.3048 20.6077 10.047C20.6453 9.77624 20.6642 9.46685 20.6642 9.11878C20.6642 8.77072 20.6453 8.46777 20.6077 8.20994C20.57 7.93923 20.4946 7.70718 20.3816 7.51381C20.143 7.15285 19.6909 6.97238 19.0253 6.97238H18.027ZM16.1056 18.884V5.11602H19.1949C21.4553 5.11602 22.5856 6.46317 22.5856 9.15746C22.5856 9.96961 22.46 10.6593 22.2088 11.2265C21.9702 11.7937 21.5433 12.2514 20.9279 12.5994L23 18.884H20.9656L19.176 13.0055H18.027V18.884H16.1056Z" fill="#111111"/>
            </svg>
}
function SubjectLangEnM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M1 18.884V5.11602H6.81336V6.97238H2.95054V11.0138H6.31617V12.8702H2.95054V16.9116H6.81336V18.884H1Z" fill="#111111"/>
                <path d="M8.00122 18.884V5.11602H9.87527L12.8202 13.4116H12.8584V5.11602H14.809V18.884H12.9732L9.99 10.6077H9.95176V18.884H8.00122Z" fill="#111111"/>
                <path d="M16.46 8.36464C16.46 7.81031 16.5556 7.32044 16.7468 6.89503C16.938 6.46961 17.193 6.1151 17.5117 5.83149C17.8177 5.56077 18.1619 5.35451 18.5444 5.21271C18.9396 5.0709 19.3348 5 19.73 5C20.1252 5 20.514 5.0709 20.8965 5.21271C21.2917 5.35451 21.6486 5.56077 21.9674 5.83149C22.2733 6.1151 22.5219 6.46961 22.7132 6.89503C22.9044 7.32044 23 7.81031 23 8.36464V9.06077H21.0495V8.36464C21.0495 7.88766 20.9156 7.5396 20.6479 7.32044C20.3929 7.0884 20.0869 6.97238 19.73 6.97238C19.373 6.97238 19.0607 7.0884 18.793 7.32044C18.538 7.5396 18.4105 7.88766 18.4105 8.36464V15.6354C18.4105 16.1123 18.538 16.4669 18.793 16.6989C19.0607 16.918 19.373 17.0276 19.73 17.0276C20.0869 17.0276 20.3929 16.918 20.6479 16.6989C20.9156 16.4669 21.0495 16.1123 21.0495 15.6354V13.0442H19.5005V11.3039H23V15.6354C23 16.2155 22.9044 16.7118 22.7132 17.1243C22.5219 17.5368 22.2733 17.8785 21.9674 18.1492C21.6486 18.4328 21.2917 18.6455 20.8965 18.7873C20.514 18.9291 20.1252 19 19.73 19C19.3348 19 18.9396 18.9291 18.5444 18.7873C18.1619 18.6455 17.8177 18.4328 17.5117 18.1492C17.193 17.8785 16.938 17.5368 16.7468 17.1243C16.5556 16.7118 16.46 16.2155 16.46 15.6354V8.36464Z" fill="#111111"/>
            </svg>
}
function SubjectLangEsM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7.6761 9.08011H5.7305V8.63536C5.7305 8.18416 5.62241 7.79742 5.40623 7.47514C5.20277 7.13996 4.85307 6.97238 4.35713 6.97238C4.09008 6.97238 3.8739 7.02394 3.70859 7.12707C3.54328 7.2302 3.40976 7.35912 3.30802 7.51381C3.20629 7.6814 3.13635 7.87477 3.0982 8.09392C3.06006 8.30018 3.04098 8.51934 3.04098 8.75138C3.04098 9.0221 3.04734 9.2477 3.06006 9.42818C3.08549 9.60866 3.13635 9.7698 3.21265 9.9116C3.28895 10.0534 3.39704 10.1759 3.53692 10.279C3.68952 10.3821 3.89298 10.4853 4.14731 10.5884L5.63512 11.1878C6.06748 11.3554 6.41718 11.5552 6.68423 11.7873C6.95127 12.0064 7.16109 12.2643 7.31369 12.5608C7.45357 12.8702 7.54894 13.2247 7.59981 13.6243C7.65067 14.0111 7.6761 14.4558 7.6761 14.9586C7.6761 15.5387 7.61888 16.0801 7.50443 16.5829C7.38999 17.0727 7.2056 17.4917 6.95127 17.8398C6.68423 18.2007 6.33453 18.4843 5.90217 18.6906C5.46981 18.8969 4.94208 19 4.31898 19C3.84847 19 3.40976 18.9162 3.00283 18.7486C2.59591 18.581 2.24621 18.349 1.95373 18.0525C1.66125 17.756 1.426 17.4144 1.24797 17.0276C1.08266 16.628 1 16.1961 1 15.732V14.9972H2.94561V15.616C2.94561 15.977 3.04734 16.3057 3.2508 16.6022C3.46698 16.8858 3.82304 17.0276 4.31898 17.0276C4.6496 17.0276 4.90393 16.9825 5.08196 16.8923C5.27271 16.7891 5.41895 16.6473 5.52068 16.4669C5.62241 16.2864 5.67963 16.0737 5.69235 15.8287C5.71778 15.5709 5.7305 15.2873 5.7305 14.9779C5.7305 14.6169 5.71778 14.3204 5.69235 14.0884C5.66691 13.8564 5.61605 13.6694 5.53975 13.5276C5.45074 13.3858 5.32993 13.2698 5.17733 13.1796C5.03745 13.0893 4.84671 12.9926 4.6051 12.8895L3.21265 12.3094C2.37337 11.9613 1.80749 11.5037 1.51501 10.9365C1.23525 10.3564 1.09537 9.63444 1.09537 8.77072C1.09537 8.25506 1.16531 7.76519 1.30519 7.30111C1.44507 6.83702 1.65489 6.43739 1.93465 6.10221C2.2017 5.76704 2.53868 5.50276 2.94561 5.30939C3.36525 5.10313 3.86119 5 4.43343 5C4.91665 5 5.35536 5.09024 5.74957 5.27072C6.1565 5.4512 6.5062 5.68969 6.79867 5.98619C7.38363 6.60497 7.6761 7.314 7.6761 8.11326V9.08011Z" fill="#111111"/>
                <path d="M9.13054 18.884V5.11602H12.049C12.583 5.11602 13.0535 5.18693 13.4605 5.32873C13.8674 5.47053 14.2362 5.72192 14.5668 6.08287C14.8974 6.44383 15.1263 6.86925 15.2535 7.35912C15.3806 7.8361 15.4442 8.48711 15.4442 9.31215C15.4442 9.93094 15.4061 10.453 15.3298 10.8785C15.2662 11.3039 15.12 11.7035 14.8911 12.0773C14.624 12.5285 14.268 12.8831 13.8229 13.1409C13.3778 13.3858 12.7929 13.5083 12.068 13.5083H11.0761V18.884H9.13054ZM11.0761 6.97238V11.6519H12.0108C12.405 11.6519 12.7102 11.5939 12.9264 11.4779C13.1426 11.3619 13.3015 11.2007 13.4032 10.9945C13.505 10.8011 13.5622 10.5626 13.5749 10.279C13.6004 9.9954 13.6131 9.67956 13.6131 9.33149C13.6131 9.00921 13.6067 8.70626 13.594 8.42265C13.5813 8.12615 13.5241 7.86832 13.4223 7.64917C13.3206 7.43002 13.168 7.26243 12.9645 7.14641C12.7611 7.03039 12.4686 6.97238 12.0871 6.97238H11.0761Z" fill="#111111"/>
                <path d="M20.1197 14.0691L19.166 9.08011H19.1279L18.1741 14.0691H20.1197ZM15.3129 18.884L18.3458 5.11602H19.9671L23 18.884H21.0544L20.4822 15.9254H17.8308L17.2585 18.884H15.3129Z" fill="#111111"/>
            </svg>
}
function SubjectLangFrM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M1 19V5H6.80103V6.88764H2.9464V11.1348H6.30489V13.0225H2.9464V19H1Z" fill="#111111"/>
                <path d="M10.0091 6.88764V11.2528H11.1159C11.4594 11.2528 11.7329 11.2069 11.9364 11.1152C12.14 11.0103 12.299 10.8661 12.4135 10.6826C12.5152 10.4991 12.5852 10.2762 12.6234 10.014C12.6615 9.73876 12.6806 9.42416 12.6806 9.07023C12.6806 8.71629 12.6615 8.40824 12.6234 8.14607C12.5852 7.87079 12.5089 7.63483 12.3944 7.4382C12.1527 7.07116 11.6947 6.88764 11.0205 6.88764H10.0091ZM8.0627 19V5H11.1922C13.4821 5 14.627 6.36985 14.627 9.10955C14.627 9.93539 14.4998 10.6367 14.2454 11.2135C14.0037 11.7903 13.5711 12.2556 12.9478 12.6096L15.0468 19H12.9859L11.1731 13.0225H10.0091V19H8.0627Z" fill="#111111"/>
                <path d="M20.1186 14.1039L19.1644 9.0309H19.1263L18.1722 14.1039H20.1186ZM15.3098 19L18.3439 5H19.9659L23 19H21.0536L20.4811 15.9916H17.8287L17.2562 19H15.3098Z" fill="#111111"/>
            </svg>
}
function SubjectLiteratureM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M18.2275 21.6006C18.758 21.6006 19.2667 21.3899 19.6418 21.0148C20.0168 20.6397 20.2275 20.131 20.2275 19.6006V3.60059C20.2275 2.49059 19.3275 1.60059 18.2275 1.60059H12.2275V8.60059L9.72754 7.10059L7.22754 8.60059V1.60059H6.22754C5.69711 1.60059 5.1884 1.8113 4.81333 2.18637C4.43825 2.56144 4.22754 3.07015 4.22754 3.60059V19.6006C4.22754 20.131 4.43825 20.6397 4.81333 21.0148C5.1884 21.3899 5.69711 21.6006 6.22754 21.6006H18.2275Z" fill="#111111"/>
            </svg>
}
function SubjectMathsM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M6 2C3.79086 2 2 3.79086 2 6V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V6C22 3.79086 20.2091 2 18 2H6ZM12 9C12.8284 9 13.5 8.32843 13.5 7.5C13.5 6.67157 12.8284 6 12 6C11.1716 6 10.5 6.67157 10.5 7.5C10.5 8.32843 11.1716 9 12 9ZM12 18C12.8284 18 13.5 17.3284 13.5 16.5C13.5 15.6716 12.8284 15 12 15C11.1716 15 10.5 15.6716 10.5 16.5C10.5 17.3284 11.1716 18 12 18ZM7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z" fill="#111111"/>
            </svg>
}
function SubjectPhysicsM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12.0001 11C12.2653 11 12.5197 11.1053 12.7072 11.2929C12.8947 11.4804 13.0001 11.7348 13.0001 12C13.0001 12.2652 12.8947 12.5196 12.7072 12.7071C12.5197 12.8946 12.2653 13 12.0001 13C11.7349 13 11.4805 12.8946 11.293 12.7071C11.1055 12.5196 11.0001 12.2652 11.0001 12C11.0001 11.7348 11.1055 11.4804 11.293 11.2929C11.4805 11.1053 11.7349 11 12.0001 11ZM4.2201 4.21998C5.6501 2.78998 8.7501 3.42998 12.0001 5.55998C15.2501 3.42998 18.3501 2.78998 19.7801 4.21998C21.2101 5.64998 20.5701 8.74998 18.4401 12C20.5701 15.25 21.2101 18.35 19.7801 19.78C18.3501 21.21 15.2501 20.57 12.0001 18.44C8.7501 20.57 5.6501 21.21 4.2201 19.78C2.7901 18.35 3.4301 15.25 5.5601 12C3.4301 8.74998 2.7901 5.64998 4.2201 4.21998ZM15.5401 8.45998C16.1501 9.07998 16.7101 9.70998 17.2301 10.34C18.6101 8.20998 19.1101 6.37998 18.3601 5.63998C17.6201 4.88998 15.7901 5.38998 13.6601 6.76998C14.2901 7.28998 14.9201 7.84998 15.5401 8.45998ZM8.4601 15.54C7.8501 14.92 7.2901 14.29 6.7701 13.66C5.3901 15.79 4.8901 17.62 5.6401 18.36C6.3801 19.11 8.2101 18.61 10.3401 17.23C9.7101 16.71 9.0801 16.15 8.4601 15.54ZM5.6401 5.63998C4.8901 6.37998 5.3901 8.20998 6.7701 10.34C7.2901 9.70998 7.8501 9.07998 8.4601 8.45998C9.0801 7.84998 9.7101 7.28998 10.3401 6.76998C8.2101 5.38998 6.3801 4.88998 5.6401 5.63998ZM9.8801 14.12C10.5801 14.82 11.3001 15.46 12.0001 16.03C12.7001 15.46 13.4201 14.82 14.1201 14.12C14.8201 13.42 15.4601 12.7 16.0301 12C15.4601 11.3 14.8201 10.58 14.1201 9.87998C13.4201 9.17998 12.7001 8.53998 12.0001 7.96998C11.3001 8.53998 10.5801 9.17998 9.8801 9.87998C9.1801 10.58 8.5401 11.3 7.9701 12C8.5401 12.7 9.1801 13.42 9.8801 14.12ZM18.3601 18.36C19.1101 17.62 18.6101 15.79 17.2301 13.66C16.7101 14.29 16.1501 14.92 15.5401 15.54C14.9201 16.15 14.2901 16.71 13.6601 17.23C15.7901 18.61 17.6201 19.11 18.3601 18.36Z" fill="#111111"/>
            </svg>
}
function SubjectRoboticsM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11.8574 1.70483C12.3879 1.70483 12.8966 1.91555 13.2716 2.29062C13.6467 2.66569 13.8574 3.1744 13.8574 3.70483C13.8574 4.44483 13.4574 5.09483 12.8574 5.43483V6.70483H13.8574C15.7139 6.70483 17.4944 7.44233 18.8072 8.75509C20.1199 10.0678 20.8574 11.8483 20.8574 13.7048H21.8574C22.1226 13.7048 22.377 13.8102 22.5645 13.9977C22.7521 14.1853 22.8574 14.4396 22.8574 14.7048V17.7048C22.8574 17.9701 22.7521 18.2244 22.5645 18.4119C22.377 18.5995 22.1226 18.7048 21.8574 18.7048H20.8574V19.7048C20.8574 20.2353 20.6467 20.744 20.2716 21.119C19.8966 21.4941 19.3879 21.7048 18.8574 21.7048H4.85742C4.32699 21.7048 3.81828 21.4941 3.44321 21.119C3.06814 20.744 2.85742 20.2353 2.85742 19.7048V18.7048H1.85742C1.59221 18.7048 1.33785 18.5995 1.15032 18.4119C0.962779 18.2244 0.857422 17.9701 0.857422 17.7048V14.7048C0.857422 14.4396 0.962779 14.1853 1.15032 13.9977C1.33785 13.8102 1.59221 13.7048 1.85742 13.7048H2.85742C2.85742 11.8483 3.59492 10.0678 4.90767 8.75509C6.22043 7.44233 8.00091 6.70483 9.85742 6.70483H10.8574V5.43483C10.2574 5.09483 9.85742 4.44483 9.85742 3.70483C9.85742 3.1744 10.0681 2.66569 10.4432 2.29062C10.8183 1.91555 11.327 1.70483 11.8574 1.70483ZM7.35742 12.7048C6.69438 12.7048 6.0585 12.9682 5.58965 13.4371C5.12081 13.9059 4.85742 14.5418 4.85742 15.2048C4.85742 15.8679 5.12081 16.5038 5.58965 16.9726C6.0585 17.4414 6.69438 17.7048 7.35742 17.7048C8.02046 17.7048 8.65635 17.4414 9.12519 16.9726C9.59403 16.5038 9.85742 15.8679 9.85742 15.2048C9.85742 14.5418 9.59403 13.9059 9.12519 13.4371C8.65635 12.9682 8.02046 12.7048 7.35742 12.7048ZM16.3574 12.7048C15.6944 12.7048 15.0585 12.9682 14.5897 13.4371C14.1208 13.9059 13.8574 14.5418 13.8574 15.2048C13.8574 15.8679 14.1208 16.5038 14.5897 16.9726C15.0585 17.4414 15.6944 17.7048 16.3574 17.7048C17.0205 17.7048 17.6563 17.4414 18.1252 16.9726C18.594 16.5038 18.8574 15.8679 18.8574 15.2048C18.8574 14.5418 18.594 13.9059 18.1252 13.4371C17.6563 12.9682 17.0205 12.7048 16.3574 12.7048Z" fill="#111111"/>
            </svg>
}
function SubjectSociologyM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12.6 3.10264C15.27 4.34264 18 5.63264 20.66 6.87264C20.81 6.94264 21 6.99264 21 7.19264C21 7.39264 20.81 7.43264 20.66 7.50264C18 8.74264 15.3 10.0126 12.62 11.2426C12.21 11.4526 11.79 11.4526 11.38 11.2426C8.69 10.0026 6 8.74264 3.32 7.49264C3.18 7.43264 3 7.38264 3 7.18264C3 7.00264 3.18 6.95264 3.31 6.89264C6 5.63264 8.74 4.34264 11.44 3.09264C11.73 2.96264 12.3 2.97264 12.6 3.10264ZM12 21.3926C11.8 21.3926 11.66 21.3126 11.38 21.2126C8.69 19.9726 6 18.7126 3.33 17.4626C3.19 17.3926 3 17.3526 3 17.1426C3 16.9426 3.19 16.9026 3.34 16.8326C3.78 16.6226 4.23 16.4126 4.67 16.2026C5.12 16.0026 5.56 16.0026 6 16.2126C7.79 17.0426 9.57 17.8726 11.35 18.7026C11.79 18.9126 12.23 18.9026 12.67 18.7026C14.45 17.8626 16.23 17.0326 18 16.2026C18.44 16.0026 18.87 15.9926 19.29 16.1926C19.77 16.4026 20.24 16.6326 20.71 16.8526C20.78 16.8826 20.85 16.9226 20.91 16.9726C21.04 17.0726 21.04 17.2426 20.91 17.3226C20.83 17.3826 20.74 17.4326 20.65 17.4726C18 18.7426 15.33 19.9626 12.66 21.1926C12.46 21.2926 12.19 21.3926 12 21.3926ZM12 16.4126C11.9 16.4126 11.55 16.3126 11.36 16.2426C8.68 14.9826 6 13.7426 3.34 12.4826C3.2 12.4226 3 12.3726 3 12.1726C3 11.9626 3.2 11.9226 3.35 11.8526C3.8 11.6326 4.25 11.4226 4.7 11.2126C5.13 11.0226 5.56 11.0226 6 11.2426C7.78 12.0626 9.58 12.9026 11.38 13.7426C11.79 13.9326 12.21 13.9326 12.63 13.7426C14.43 12.8926 16.23 12.0526 18.04 11.2126C18.45 11.0226 18.87 11.0226 19.29 11.2126C19.76 11.4326 20.24 11.6526 20.71 11.8726C20.77 11.9026 20.84 11.9326 20.9 11.9826C21.04 12.0926 21.04 12.2426 20.89 12.3626C20.84 12.4026 20.77 12.4326 20.71 12.4626C18 13.7426 15.31 14.9926 12.61 16.2426C12.42 16.3326 12.08 16.4126 12 16.4126Z" fill="#111111"/>
            </svg>
}
function TelegramL(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12.524 23.9715L12.8347 19.2168L21.3569 11.4385C21.7342 11.09 21.2792 10.9214 20.7799 11.2249L10.2603 17.9579L5.7107 16.4967C4.73421 16.2157 4.72311 15.53 5.93264 15.0354L23.6539 8.11134C24.4639 7.7404 25.2407 8.31366 24.93 9.57259L21.9117 23.9715C21.7009 24.9944 21.0906 25.2417 20.2472 24.7696L15.6532 21.33L13.445 23.4994C13.1898 23.758 12.979 23.9715 12.524 23.9715Z" fill="#479AD6"/>
            </svg>
}
function ViberL(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M16.1859 9.58087C15.8651 9.58087 15.8651 10.0809 16.1859 10.085C18.6751 10.1042 20.7251 11.8392 20.7476 15.0217C20.7476 15.3575 21.2393 15.3534 21.2351 15.0175C21.2084 11.5884 18.9693 9.60004 16.1859 9.58087Z" fill="#7C529E"/>
                <path d="M19.4575 14.4942C19.45 14.8259 19.9408 14.8417 19.945 14.5059C19.9858 12.615 18.82 11.0575 16.6292 10.8934C16.3083 10.87 16.275 11.3742 16.595 11.3975C18.495 11.5417 19.4958 12.8384 19.4575 14.4942Z" fill="#7C529E"/>
                <path d="M17.9303 16.7892C18.1037 16.555 18.5228 16.4067 18.9345 16.645C19.4895 16.9692 20.1962 17.4734 20.6645 17.93C20.9287 18.1525 20.9887 18.4925 20.8078 18.8517V18.8575C20.4003 19.6 19.637 20.42 18.852 20.1584L18.8445 20.1467C18.0478 19.9159 16.1712 18.9159 14.9853 17.94C12.8996 16.2345 11.997 14.0729 11.5033 12.8906C11.3998 12.6426 11.3142 12.4377 11.2395 12.2892C10.987 11.4767 11.7762 10.6875 12.497 10.2659H12.5045C12.8512 10.0784 13.1845 10.1409 13.4062 10.4184C13.458 10.4909 13.5222 10.5689 13.5986 10.6618C13.833 10.9465 14.1829 11.3716 14.6478 12.2117C14.8787 12.6375 14.7353 13.0709 14.5087 13.2509L14.0553 13.6259C13.8253 13.8167 13.8562 14.1725 13.8562 14.1725C13.8562 14.1725 14.5278 16.8009 17.0395 17.465C17.0395 17.465 17.3837 17.4967 17.5678 17.2584L17.9303 16.7892Z" fill="#7C529E"/>
                <path d="M16.9751 12.7534C17.7759 12.8 18.1643 13.2184 18.2059 14.0775C18.2209 14.4134 18.7084 14.39 18.6934 14.0542C18.6401 12.9325 18.0551 12.3075 17.0018 12.2492C16.6809 12.23 16.6509 12.7342 16.9751 12.7534Z" fill="#7C529E"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M23.4144 7.95002C25.0078 9.38419 25.8911 12.555 25.2944 17.5775C24.7723 22.0088 21.7849 22.7936 20.7822 23.0571C20.6838 23.0829 20.6046 23.1038 20.5486 23.1225C20.2778 23.2125 17.8944 23.8292 14.7911 23.56C14.6829 23.6893 14.5801 23.8122 14.4823 23.9292C12.9027 25.819 12.6305 26.1446 12.0686 25.9625C11.5469 25.7984 11.5778 24.9817 11.5778 24.9817L11.5819 22.9659H11.5778C7.0436 21.6459 7.10693 16.78 7.16027 14.1825C7.2136 11.5859 7.70027 9.48835 9.08193 8.05919C12.1586 5.13752 20.8436 5.50002 23.4153 7.94919L23.4144 7.95002ZM12.5219 25.2267C13.1328 24.5909 15.0969 22.1417 15.0969 22.1417C17.7286 22.3175 19.8244 21.7784 20.0503 21.7034C20.1029 21.6858 20.1788 21.6675 20.2733 21.6447C21.1273 21.4385 23.5005 20.8655 23.9394 17.2084C23.939 17.1902 23.9454 17.1258 23.9557 17.022C24.0601 15.9703 24.5657 10.8771 22.4069 8.96335C20.4669 7.14002 12.8528 6.57419 10.1536 9.10502C8.9836 10.3009 8.58693 12.0767 8.54527 14.245C8.54384 14.3195 8.54219 14.3963 8.54049 14.4753C8.49283 16.6937 8.40904 20.5937 12.1211 21.6575C12.1211 21.6575 12.1061 24.735 12.1061 25.0042C12.1028 25.4142 12.3219 25.4334 12.5219 25.2267Z" fill="#7C529E"/>
            </svg>
}
function VideoM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M20.8422 6.49256C20.7992 6.24418 20.6779 6.01606 20.4959 5.84156C20.314 5.66706 20.0811 5.55532 19.8311 5.52267C14.6324 4.82578 9.36386 4.82578 4.16512 5.52267C3.91522 5.55516 3.68228 5.66675 3.50035 5.84112C3.31842 6.01549 3.19706 6.24349 3.15401 6.49178C2.49912 10.1345 2.49912 13.8648 3.15401 17.5074C3.19702 17.7558 3.31836 17.9839 3.50028 18.1584C3.68219 18.3329 3.91516 18.4447 4.16512 18.4773C6.76211 18.8255 9.37943 19.0001 11.9997 19C14.6194 19 17.2362 18.8254 19.8327 18.4773C20.0827 18.4448 20.3157 18.3331 20.4976 18.1586C20.6796 17.984 20.8009 17.7559 20.8438 17.5074C21.4977 13.8649 21.4972 10.1349 20.8422 6.49256ZM8.88856 14.3489V9.65189C8.89533 9.51533 8.9366 9.38271 9.00853 9.26643C9.08045 9.15015 9.18068 9.054 9.29984 8.98696C9.41901 8.91992 9.55322 8.88418 9.68994 8.88308C9.82667 8.88198 9.96144 8.91556 10.0817 8.98067L14.6861 11.3288C14.8127 11.3894 14.9195 11.4846 14.9943 11.6034C15.0691 11.7222 15.1087 11.8597 15.1087 12C15.1087 12.1403 15.0691 12.2778 14.9943 12.3966C14.9195 12.5154 14.8127 12.6106 14.6861 12.6712L10.0817 15.0193C9.96149 15.0844 9.82679 15.118 9.69013 15.1169C9.55346 15.1159 9.4193 15.0802 9.30015 15.0133C9.18101 14.9463 9.08077 14.8503 9.00879 14.7341C8.93682 14.6179 8.89545 14.4854 8.88856 14.3489Z" fill="black"/>
            </svg>
}
function VkM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M20.8002 7.74C20.9302 7.32 20.8002 7 20.1802 7H18.1602C17.6402 7 17.4102 7.27 17.2802 7.57C17.2802 7.57 16.2502 10.08 14.7902 11.72C14.3102 12.19 14.1002 12.34 13.8402 12.34C13.7102 12.34 13.5002 12.19 13.5002 11.76V7.74C13.5002 7.23 13.3802 7 12.9502 7H9.7602C9.4402 7 9.2502 7.24 9.2502 7.47C9.2502 7.95 10.0002 8.07 10.0502 9.44V12.42C10.0502 13.08 9.9302 13.2 9.6802 13.2C9.0002 13.2 7.3202 10.67 6.3302 7.79C6.1302 7.23 5.9402 7 5.4202 7H3.3902C2.8202 7 2.7002 7.27 2.7002 7.57C2.7002 8.11 3.3902 10.77 5.9002 14.29C7.5702 16.7 9.9302 18 12.0802 18C13.3702 18 13.5302 17.71 13.5302 17.21V15.39C13.5302 14.82 13.6502 14.7 14.0602 14.7C14.3602 14.7 14.8702 14.85 16.0702 16C17.4502 17.38 17.6702 18 18.4502 18H20.4702C21.0502 18 21.3402 17.71 21.1802 17.14C21.0002 16.57 20.3402 15.74 19.4702 14.76C19.0002 14.21 18.2902 13.61 18.0702 13.3C17.7702 12.92 17.8602 12.75 18.0702 12.4C18.0702 12.4 20.5402 8.93 20.8002 7.74Z" fill="#627DA1"/>
            </svg>
}
function VkL(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M27.4511 9.94182C27.6196 9.40727 27.4512 9 26.6479 9H24.0307C23.3569 9 23.0589 9.34364 22.8905 9.72545C22.8905 9.72545 21.556 12.92 19.6643 15.0073C19.0424 15.6055 18.7703 15.7964 18.4335 15.7964C18.265 15.7964 17.993 15.6055 17.993 15.0582V9.94182C17.993 9.29273 17.8375 9 17.2803 9H13.1472C12.7326 9 12.4865 9.30545 12.4865 9.59818C12.4865 10.2091 13.4582 10.3618 13.523 12.1055V15.8982C13.523 16.7382 13.3675 16.8909 13.0436 16.8909C12.1626 16.8909 9.98587 13.6709 8.70319 10.0055C8.44406 9.29273 8.19789 9 7.52415 9H4.89399C4.15548 9 4 9.34364 4 9.72545C4 10.4127 4.89399 13.7982 8.14606 18.2782C10.3098 21.3455 13.3675 23 16.1531 23C17.8245 23 18.0318 22.6309 18.0318 21.9945V19.6782C18.0318 18.9527 18.1873 18.8 18.7185 18.8C19.1072 18.8 19.768 18.9909 21.3228 20.4545C23.1107 22.2109 23.3958 23 24.4064 23H27.0236C27.7751 23 28.1508 22.6309 27.9435 21.9055C27.7103 21.18 26.8552 20.1236 25.7279 18.8764C25.119 18.1764 24.1991 17.4127 23.914 17.0182C23.5254 16.5345 23.642 16.3182 23.914 15.8727C23.914 15.8727 27.1143 11.4564 27.4511 9.94182Z" fill="#627DA1"/>
            </svg>
}
function VolumeMuteS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M8 1.77778L6.37444 3.40333L8 5.02889V1.77778ZM1.98778 1L1 1.98778L4.67889 5.66667H1V10.3333H4.11111L8 14.2222V8.98778L11.3056 12.3011C10.7844 12.6978 10.2011 13.0244 9.55556 13.2111V14.8211C10.6289 14.5722 11.6011 14.0822 12.4178 13.4133L14.0122 15L15 14.0122L8 7.01222L1.98778 1ZM13.4444 8C13.4444 8.73111 13.2889 9.41556 13.0244 10.0533L14.1989 11.2278C14.7044 10.2633 15 9.16667 15 8C15 4.67111 12.6667 1.88667 9.55556 1.17889V2.78111C11.8033 3.45 13.4444 5.53444 13.4444 8ZM11.5 8C11.5 6.62333 10.7222 5.44111 9.55556 4.86556V6.58444L11.4611 8.49C11.5 8.33444 11.5 8.16333 11.5 8Z" fill="black"/>
            </svg>
}
function VolumeMuteM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 4.88889L10.1422 6.74667L12 8.60444V4.88889ZM5.12889 4L4 5.12889L8.20444 9.33333H4V14.6667H7.55556L12 19.1111V13.1289L15.7778 16.9156C15.1822 17.3689 14.5156 17.7422 13.7778 17.9556V19.7956C15.0044 19.5111 16.1156 18.9511 17.0489 18.1867L18.8711 20L20 18.8711L12 10.8711L5.12889 4ZM18.2222 12C18.2222 12.8356 18.0444 13.6178 17.7422 14.3467L19.0844 15.6889C19.6622 14.5867 20 13.3333 20 12C20 8.19556 17.3333 5.01333 13.7778 4.20444V6.03556C16.3467 6.8 18.2222 9.18222 18.2222 12ZM16 12C16 10.4267 15.1111 9.07556 13.7778 8.41778V10.3822L15.9556 12.56C16 12.3822 16 12.1867 16 12Z" fill="black"/>
            </svg>
}
function VolumeOnS(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M9.55556 1V2.64424C11.8033 3.33067 13.4444 5.46978 13.4444 8C13.4444 10.5302 11.8033 12.6613 9.55556 13.3478V15C12.6667 14.2737 15 11.4162 15 8C15 4.58381 12.6667 1.72634 9.55556 1ZM11.5 8C11.5 6.58723 10.7222 5.374 9.55556 4.78335V11.1927C10.7222 10.626 11.5 9.40479 11.5 8ZM1 5.60547V10.3945H4.11111L8 14.3854V1.6146L4.11111 5.60547H1Z" fill="black"/>
            </svg>
}
function VolumeOnM(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M13.7778 4V5.87913C16.3467 6.66363 18.2222 9.10832 18.2222 12C18.2222 14.8917 16.3467 17.3273 13.7778 18.1117V20C17.3333 19.1699 20 15.9042 20 12C20 8.09578 17.3333 4.8301 13.7778 4ZM16 12C16 10.3854 15.1111 8.99886 13.7778 8.32383V15.6488C15.1111 15.0011 16 13.6055 16 12ZM4 9.2634V14.7366H7.55556L12 19.2976V4.70239L7.55556 9.2634H4Z" fill="black"/>
            </svg>
}
function WebL(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M20.36 18C20.44 17.34 20.5 16.68 20.5 16C20.5 15.32 20.44 14.66 20.36 14H23.74C23.9 14.64 24 15.31 24 16C24 16.69 23.9 17.36 23.74 18H20.36ZM18.59 23.56C19.19 22.45 19.65 21.25 19.97 20H22.92C21.96 21.65 20.43 22.93 18.59 23.56ZM18.34 18H13.66C13.56 17.34 13.5 16.68 13.5 16C13.5 15.32 13.56 14.65 13.66 14H18.34C18.43 14.65 18.5 15.32 18.5 16C18.5 16.68 18.43 17.34 18.34 18ZM16 23.96C15.17 22.76 14.5 21.43 14.09 20H17.91C17.5 21.43 16.83 22.76 16 23.96ZM12 12H9.08C10.03 10.34 11.57 9.06 13.4 8.44C12.8 9.55 12.35 10.75 12 12ZM9.08 20H12C12.35 21.25 12.8 22.45 13.4 23.56C11.57 22.93 10.03 21.65 9.08 20ZM8.26 18C8.1 17.36 8 16.69 8 16C8 15.31 8.1 14.64 8.26 14H11.64C11.56 14.66 11.5 15.32 11.5 16C11.5 16.68 11.56 17.34 11.64 18H8.26ZM16 8.03C16.83 9.23 17.5 10.57 17.91 12H14.09C14.5 10.57 15.17 9.23 16 8.03ZM22.92 12H19.97C19.65 10.75 19.19 9.55 18.59 8.44C20.43 9.07 21.96 10.34 22.92 12ZM16 6C10.47 6 6 10.5 6 16C6 18.6522 7.05357 21.1957 8.92893 23.0711C9.85752 23.9997 10.9599 24.7362 12.1732 25.2388C13.3864 25.7413 14.6868 26 16 26C18.6522 26 21.1957 24.9464 23.0711 23.0711C24.9464 21.1957 26 18.6522 26 16C26 14.6868 25.7413 13.3864 25.2388 12.1732C24.7362 10.9599 23.9997 9.85752 23.0711 8.92893C22.1425 8.00035 21.0401 7.26375 19.8268 6.7612C18.6136 6.25866 17.3132 6 16 6Z" fill="#428BF9"/>
            </svg>
}
function WhatsappL(size : string) : JSX.Element {
    return  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M20.75 17.96C21 18.09 21.16 18.16 21.21 18.26C21.27 18.37 21.25 18.87 21 19.44C20.8 20 19.76 20.54 19.3 20.56C18.84 20.58 18.83 20.92 16.34 19.83C13.85 18.74 12.35 16.08 12.23 15.91C12.11 15.74 11.27 14.53 11.31 13.3C11.36 12.08 12 11.5 12.26 11.26C12.5 11 12.77 10.97 12.94 11H13.41C13.56 11 13.77 10.94 13.96 11.45L14.65 13.32C14.71 13.45 14.75 13.6 14.66 13.76L14.39 14.17L14 14.59C13.88 14.71 13.74 14.84 13.88 15.09C14 15.35 14.5 16.18 15.2 16.87C16.11 17.75 16.91 18.04 17.15 18.17C17.39 18.31 17.54 18.29 17.69 18.13L18.5 17.19C18.69 16.94 18.85 17 19.08 17.08L20.75 17.96ZM16 6C17.3132 6 18.6136 6.25866 19.8268 6.7612C21.0401 7.26375 22.1425 8.00035 23.0711 8.92893C23.9997 9.85752 24.7362 10.9599 25.2388 12.1732C25.7413 13.3864 26 14.6868 26 16C26 18.6522 24.9464 21.1957 23.0711 23.0711C21.1957 24.9464 18.6522 26 16 26C14.03 26 12.2 25.43 10.65 24.45L6 26L7.55 21.35C6.57 19.8 6 17.97 6 16C6 13.3478 7.05357 10.8043 8.92893 8.92893C10.8043 7.05357 13.3478 6 16 6ZM16 8C13.8783 8 11.8434 8.84285 10.3431 10.3431C8.84285 11.8434 8 13.8783 8 16C8 17.72 8.54 19.31 9.46 20.61L8.5 23.5L11.39 22.54C12.69 23.46 14.28 24 16 24C18.1217 24 20.1566 23.1571 21.6569 21.6569C23.1571 20.1566 24 18.1217 24 16C24 13.8783 23.1571 11.8434 21.6569 10.3431C20.1566 8.84285 18.1217 8 16 8Z" fill="#3ABA27"/>
            </svg>
}


