export enum IconSmallId{
    loader,
    arrowDown,
    arrowRight,
    check,
    minus,
    arrowLeft,
    musicOff,
    musicOn,
    eyeOpen,
    eyeClose,
    plus,
    filter,
    phone,
    copy,
    volumeMute,
    volumeOn,
    starEmpty,
    starFilled,
    close
}   

interface I_IconSmall{
    id : IconSmallId
}

export default function IconSmall({id} : I_IconSmall){
    switch(id){
        case IconSmallId.loader:
            return <IconLoader />
        case IconSmallId.arrowDown:
            return <IconArrowDown />
        case IconSmallId.arrowRight:
            return <IconArrowRight />
        case IconSmallId.check:
            return <IconCheck />
        case IconSmallId.minus:
            return <IconMinus />
        case IconSmallId.arrowLeft:
            return <IconArrowLeft />
        case IconSmallId.musicOff:
            return <IconMusicOff />
        case IconSmallId.musicOn:
            return <IconMusicOn />
        case IconSmallId.eyeOpen:
            return <IconEyeOpen />
        case IconSmallId.eyeClose:
            return <IconEyeClose />
        case IconSmallId.plus:
            return <IconPlus />
        case IconSmallId.filter:
            return <IconFilter />
        case IconSmallId.phone:
            return <IconPhone />
        case IconSmallId.copy:
            return <IconCopy />
        case IconSmallId.volumeMute:
            return <IconVolumeMute />
        case IconSmallId.volumeOn:
            return <IconVolumeOn />
        case IconSmallId.starEmpty:
            return <IconStarEmpty />
        case IconSmallId.starFilled:
            return <IconStarFilled />
        case IconSmallId.close:
            return <IconClose />
        default:
            return <IconCheck />
    }
}

function IconLoader(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2323_13559)">
                <path d="M15.737 7.51842C15.7277 7.31936 15.6397 7.13213 15.4924 6.99793C15.3451 6.86373 15.1505 6.79355 14.9514 6.80282C14.7524 6.8121 14.5651 6.90007 14.4309 7.04739C14.2967 7.19471 14.2266 7.3893 14.2358 7.58837C14.299 8.93184 13.909 10.2576 13.1284 11.3528C12.3477 12.4481 11.2218 13.2492 9.93117 13.6278C8.64058 14.0063 7.26022 13.9403 6.01168 13.4402C4.76313 12.9401 3.7188 12.0351 3.04632 10.8703C2.37384 9.70555 2.11221 8.34861 2.30342 7.01731C2.49463 5.68601 3.1276 4.45756 4.10072 3.52914C5.07384 2.60073 6.33068 2.02619 7.6695 1.89775C9.00831 1.76931 10.3515 2.09442 11.4833 2.8209C11.5664 2.87416 11.6591 2.91054 11.7563 2.92796C11.8534 2.94538 11.953 2.94349 12.0494 2.92242C12.1458 2.90134 12.2371 2.86149 12.3181 2.80513C12.3991 2.74877 12.4682 2.67701 12.5214 2.59394C12.5747 2.51088 12.6111 2.41814 12.6285 2.32101C12.6459 2.22389 12.644 2.12429 12.623 2.02789C12.6019 1.93149 12.562 1.84019 12.5057 1.7592C12.4493 1.6782 12.3775 1.6091 12.2945 1.55584C10.8795 0.648245 9.20068 0.242317 7.52738 0.4032C5.85407 0.564083 4.28333 1.28245 3.06722 2.44302C1.85112 3.60358 1.06016 5.13906 0.821287 6.80302C0.582414 8.46698 0.909478 10.163 1.74999 11.6188C2.5905 13.0746 3.89572 14.2058 5.45619 14.8309C7.01666 15.456 8.7419 15.5388 10.355 15.0659C11.9682 14.593 13.3757 13.5919 14.3516 12.2232C15.3276 10.8545 15.8155 9.19761 15.737 7.51842Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_2323_13559">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
            </svg>
}
function IconArrowDown(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.98037 11.0041C7.84938 11.0049 7.71954 10.9796 7.59828 10.9299C7.47702 10.8801 7.36673 10.8068 7.27373 10.7141L3.2927 6.71409C3.1999 6.62085 3.12629 6.51016 3.07607 6.38834C3.02585 6.26652 3 6.13595 3 6.00409C3 5.87223 3.02585 5.74166 3.07607 5.61984C3.12629 5.49802 3.1999 5.38733 3.2927 5.29409C3.38549 5.20085 3.49566 5.12689 3.6169 5.07643C3.73815 5.02597 3.8681 5 3.99933 5C4.13057 5 4.26051 5.02597 4.38176 5.07643C4.503 5.12689 4.61317 5.20085 4.70597 5.29409L7.98037 8.60409L11.2647 5.42409C11.3563 5.3218 11.4679 5.23959 11.5925 5.18261C11.7171 5.12562 11.8521 5.09508 11.989 5.0929C12.1259 5.09072 12.2618 5.11695 12.3881 5.16994C12.5145 5.22293 12.6286 5.30155 12.7233 5.40087C12.818 5.5002 12.8914 5.61809 12.9387 5.74719C12.986 5.87628 13.0063 6.0138 12.9983 6.15113C12.9903 6.28847 12.9542 6.42267 12.8922 6.54535C12.8303 6.66802 12.7438 6.77653 12.6382 6.86409L8.65714 10.7241C8.47514 10.9004 8.23317 11.0005 7.98037 11.0041Z" fill="black"/>
            </svg>
}
function IconArrowRight(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0021 8.02171C11.0029 8.15269 10.9777 8.28253 10.9279 8.40379C10.8781 8.52505 10.8048 8.63535 10.7121 8.72834L6.71214 12.7094C6.6189 12.8022 6.50821 12.8758 6.38639 12.926C6.26457 12.9762 6.134 13.0021 6.00214 13.0021C5.87028 13.0021 5.73971 12.9762 5.61789 12.926C5.49607 12.8758 5.38538 12.8022 5.29214 12.7094C5.1989 12.6166 5.12494 12.5064 5.07448 12.3852C5.02402 12.2639 4.99805 12.134 4.99805 12.0027C4.99805 11.8715 5.02402 11.7416 5.07448 11.6203C5.12494 11.4991 5.1989 11.3889 5.29214 11.2961L8.60214 8.02171L5.42214 4.73735C5.31985 4.6458 5.23764 4.53422 5.18065 4.4096C5.12367 4.28498 5.09313 4.15 5.09095 4.0131C5.08877 3.8762 5.115 3.74032 5.16799 3.61397C5.22098 3.48762 5.2996 3.3735 5.39892 3.27877C5.49824 3.18404 5.61614 3.11072 5.74523 3.0634C5.87433 3.01608 6.01184 2.99578 6.14918 3.00377C6.28652 3.01176 6.42072 3.04787 6.5434 3.10983C6.66607 3.1718 6.77458 3.25829 6.86214 3.3639L10.7221 7.34493C10.8985 7.52694 10.9986 7.76891 11.0021 8.02171Z" fill="black"/>
            </svg>
}
function IconCheck(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.71996 8.00006C4.5323 7.8313 4.28778 7.73973 4.03543 7.74373C3.78308 7.74773 3.54158 7.84699 3.35936 8.02162C3.17715 8.19624 3.0677 8.4333 3.05297 8.68525C3.03825 8.9372 3.11933 9.1854 3.27996 9.38006L5.49996 11.7101C5.5929 11.8076 5.70459 11.8853 5.82832 11.9386C5.95204 11.9918 6.08525 12.0195 6.21996 12.0201C6.35395 12.0208 6.48673 11.9947 6.61041 11.9432C6.7341 11.8916 6.84616 11.8158 6.93996 11.7201L13.72 4.72006C13.8119 4.62551 13.8843 4.51378 13.933 4.39124C13.9818 4.26871 14.0059 4.13778 14.004 4.00592C14.0022 3.87406 13.9744 3.74386 13.9222 3.62275C13.87 3.50163 13.7945 3.39199 13.7 3.30006C13.6054 3.20814 13.4937 3.13573 13.3711 3.08699C13.2486 3.03824 13.1177 3.01411 12.9858 3.01597C12.854 3.01783 12.7238 3.04564 12.6026 3.09781C12.4815 3.14999 12.3719 3.22551 12.28 3.32006L6.22996 9.58006L4.71996 8.00006Z" fill="black"/>
            </svg>
}
function IconMinus(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="7" width="12" height="2" rx="1" fill="#111111"/>
            </svg>
}
function IconArrowLeft(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.52851 8.47138C1.4646 8.40746 1.41637 8.33379 1.38384 8.25516C1.35124 8.17656 1.33325 8.09037 1.33325 7.99998C1.33325 7.90958 1.35124 7.82339 1.38384 7.74479C1.41637 7.66616 1.4646 7.59249 1.52851 7.52857L5.29975 3.75733C5.5601 3.49699 5.98221 3.49699 6.24256 3.75734C6.50291 4.01768 6.50291 4.43979 6.24256 4.70014L3.60939 7.33331H13.9999C14.3681 7.33331 14.6666 7.63179 14.6666 7.99998C14.6666 8.36817 14.3681 8.66664 13.9999 8.66664H3.60939L6.24256 11.2998C6.50291 11.5602 6.50291 11.9823 6.24256 12.2426C5.98221 12.503 5.5601 12.503 5.29975 12.2426L1.52851 8.47138Z" fill="#111111"/>
            </svg>
}
function IconMusicOff(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3.51333L2.85333 2.66667L14 13.8133L13.1533 14.6667L6.66667 8.18V11.6667C6.66667 12.2855 6.42083 12.879 5.98325 13.3166C5.54566 13.7542 4.95217 14 4.33333 14C3.71449 14 3.121 13.7542 2.68342 13.3166C2.24583 12.879 2 12.2855 2 11.6667C2 11.0478 2.24583 10.4543 2.68342 10.0168C3.121 9.57917 3.71449 9.33333 4.33333 9.33333C4.69333 9.33333 5.03333 9.41333 5.33333 9.56V6.84667L2 3.51333ZM14.6667 2V10.3333C14.6667 11 14.38 11.6133 13.92 12.04L10.6267 8.74667C11.0533 8.28667 11.6667 8 12.3333 8C12.6933 8 13.0333 8.08 13.3333 8.22667V4.31333L7.44667 5.56667L5.77333 3.89333L14.6667 2Z" fill="black"/>
            </svg>
}
function IconMusicOn(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6667 2V10.3333C14.6667 10.9522 14.4208 11.5457 13.9832 11.9832C13.5457 12.4208 12.9522 12.6667 12.3333 12.6667C11.7145 12.6667 11.121 12.4208 10.6834 11.9832C10.2458 11.5457 10 10.9522 10 10.3333C10 9.7145 10.2458 9.121 10.6834 8.68342C11.121 8.24583 11.7145 8 12.3333 8C12.6933 8 13.0333 8.08 13.3333 8.22667V4.31333L6.66667 5.73333V11.6667C6.66667 12.2855 6.42083 12.879 5.98325 13.3166C5.54566 13.7542 4.95217 14 4.33333 14C3.71449 14 3.121 13.7542 2.68342 13.3166C2.24583 12.879 2 12.2855 2 11.6667C2 11.0478 2.24583 10.4543 2.68342 10.0168C3.121 9.57917 3.71449 9.33333 4.33333 9.33333C4.69333 9.33333 5.03333 9.41333 5.33333 9.56V4L14.6667 2Z" fill="black"/>
            </svg>
}
function IconEyeOpen(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00008 6C8.53051 6 9.03922 6.21071 9.4143 6.58579C9.78937 6.96086 10.0001 7.46957 10.0001 8C10.0001 8.53043 9.78937 9.03914 9.4143 9.41421C9.03922 9.78929 8.53051 10 8.00008 10C7.46965 10 6.96094 9.78929 6.58587 9.41421C6.21079 9.03914 6.00008 8.53043 6.00008 8C6.00008 7.46957 6.21079 6.96086 6.58587 6.58579C6.96094 6.21071 7.46965 6 8.00008 6ZM8.00008 3C11.3334 3 14.1801 5.07333 15.3334 8C14.1801 10.9267 11.3334 13 8.00008 13C4.66675 13 1.82008 10.9267 0.666748 8C1.82008 5.07333 4.66675 3 8.00008 3ZM2.12008 8C3.22008 10.24 5.49341 11.6667 8.00008 11.6667C10.5067 11.6667 12.7801 10.24 13.8801 8C12.7801 5.76 10.5067 4.33333 8.00008 4.33333C5.49341 4.33333 3.22008 5.76 2.12008 8Z" fill="black"/>
            </svg>
}
function IconEyeClose(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.33341 2.84667L2.18675 2L13.3334 13.1467L12.4867 14L10.4334 11.9467C9.66675 12.2 8.85341 12.3333 8.00008 12.3333C4.66675 12.3333 1.82008 10.26 0.666748 7.33333C1.12675 6.16 1.86008 5.12667 2.79341 4.30667L1.33341 2.84667ZM8.00008 5.33333C8.53051 5.33333 9.03922 5.54405 9.4143 5.91912C9.78937 6.29419 10.0001 6.8029 10.0001 7.33333C10.0001 7.56667 9.96008 7.79333 9.88675 8L7.33342 5.44667C7.54008 5.37333 7.76675 5.33333 8.00008 5.33333ZM8.00008 2.33333C11.3334 2.33333 14.1801 4.40667 15.3334 7.33333C14.7867 8.72 13.8601 9.92 12.6667 10.7933L11.7201 9.84C12.6267 9.21333 13.3734 8.36 13.8801 7.33333C12.7801 5.09333 10.5067 3.66667 8.00008 3.66667C7.27342 3.66667 6.56008 3.78667 5.89341 4L4.86675 2.98C5.82675 2.56667 6.88675 2.33333 8.00008 2.33333ZM2.12008 7.33333C3.22008 9.57333 5.49341 11 8.00008 11C8.46008 11 8.91341 10.9533 9.33342 10.86L7.81342 9.33333C6.86008 9.23333 6.10008 8.47333 6.00008 7.52L3.73341 5.24667C3.07341 5.81333 2.52008 6.52 2.12008 7.33333Z" fill="black"/>
            </svg>
}
function IconPlus(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7 13C7 13.5523 7.44772 14 8 14C8.55228 14 9 13.5523 9 13V9H13C13.5523 9 14 8.55228 14 8C14 7.44772 13.5523 7 13 7H9V3C9 2.44772 8.55228 2 8 2C7.44771 2 7 2.44772 7 3V7H3C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9H7V13Z" fill="#111111"/>
            </svg>
}
function IconFilter(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.49975 8V13.2533C9.52975 13.4533 9.45476 13.6667 9.28229 13.8067C8.98984 14.0667 8.51741 14.0667 8.22496 13.8067L6.71771 12.4667C6.54524 12.3133 6.47025 12.1067 6.50025 11.9133V8H6.47775L2.15847 3.08C1.90351 2.79333 1.9635 2.37333 2.28594 2.14667C2.42842 2.05333 2.5859 2 2.75087 2H13.2491C13.4141 2 13.5716 2.05333 13.7141 2.14667C14.0365 2.37333 14.0965 2.79333 13.8415 3.08L9.52225 8H9.49975Z" fill="black"/>
            </svg>
}
function IconPhone(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.81556 7.05889C4.93556 9.26 6.74 11.0644 8.94111 12.1844L10.6522 10.4733C10.87 10.2556 11.1733 10.1933 11.4456 10.2789C12.3167 10.5667 13.25 10.7222 14.2222 10.7222C14.4285 10.7222 14.6263 10.8042 14.7722 10.95C14.9181 11.0959 15 11.2937 15 11.5V14.2222C15 14.4285 14.9181 14.6263 14.7722 14.7722C14.6263 14.9181 14.4285 15 14.2222 15C10.7155 15 7.35235 13.6069 4.8727 11.1273C2.39305 8.64765 1 5.28453 1 1.77778C1 1.5715 1.08194 1.37367 1.22781 1.22781C1.37367 1.08194 1.5715 1 1.77778 1H4.5C4.70628 1 4.90411 1.08194 5.04997 1.22781C5.19583 1.37367 5.27778 1.5715 5.27778 1.77778C5.27778 2.75 5.43333 3.68333 5.72111 4.55444C5.80667 4.82667 5.74444 5.13 5.52667 5.34778L3.81556 7.05889Z" fill="black"/>
            </svg>
}
function IconCopy(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.7368 12.7273H5.78947V5.81818H12.7368V12.7273ZM12.7368 4.54545H5.78947C5.45446 4.54545 5.13317 4.67954 4.89629 4.91823C4.6594 5.15691 4.52632 5.48063 4.52632 5.81818V12.7273C4.52632 13.0648 4.6594 13.3885 4.89629 13.6272C5.13317 13.8659 5.45446 14 5.78947 14H12.7368C13.0719 14 13.3931 13.8659 13.63 13.6272C13.8669 13.3885 14 13.0648 14 12.7273V5.81818C14 5.48063 13.8669 5.15691 13.63 4.91823C13.3931 4.67954 13.0719 4.54545 12.7368 4.54545ZM10.8421 2H3.26316C2.92815 2 2.60686 2.13409 2.36997 2.37277C2.13308 2.61146 2 2.93518 2 3.27273V12.1818H3.26316V3.27273H10.8421V2Z" fill="black"/>
            </svg>
}
function IconVolumeMute(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1.77778L6.37444 3.40333L8 5.02889V1.77778ZM1.98778 1L1 1.98778L4.67889 5.66667H1V10.3333H4.11111L8 14.2222V8.98778L11.3056 12.3011C10.7844 12.6978 10.2011 13.0244 9.55556 13.2111V14.8211C10.6289 14.5722 11.6011 14.0822 12.4178 13.4133L14.0122 15L15 14.0122L8 7.01222L1.98778 1ZM13.4444 8C13.4444 8.73111 13.2889 9.41556 13.0244 10.0533L14.1989 11.2278C14.7044 10.2633 15 9.16667 15 8C15 4.67111 12.6667 1.88667 9.55556 1.17889V2.78111C11.8033 3.45 13.4444 5.53444 13.4444 8ZM11.5 8C11.5 6.62333 10.7222 5.44111 9.55556 4.86556V6.58444L11.4611 8.49C11.5 8.33444 11.5 8.16333 11.5 8Z" fill="black"/>
            </svg>
}
function IconVolumeOn(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.55556 1V2.64424C11.8033 3.33067 13.4444 5.46978 13.4444 8C13.4444 10.5302 11.8033 12.6613 9.55556 13.3478V15C12.6667 14.2737 15 11.4162 15 8C15 4.58381 12.6667 1.72634 9.55556 1ZM11.5 8C11.5 6.58723 10.7222 5.374 9.55556 4.78335V11.1927C10.7222 10.626 11.5 9.40479 11.5 8ZM1 5.60547V10.3945H4.11111L8 14.3854V1.6146L4.11111 5.60547H1Z" fill="black"/>
            </svg>
}
function IconStarEmpty(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2.19375L9.4037 5.23698C9.54937 5.55279 9.84866 5.77023 10.194 5.81118L13.5221 6.20577L11.0616 8.48118C10.8062 8.71731 10.6919 9.06914 10.7597 9.41025L11.4128 12.6974L8.48844 11.0604C8.18497 10.8905 7.81503 10.8905 7.51156 11.0604L4.58717 12.6974L5.24032 9.41025C5.3081 9.06914 5.19378 8.71731 4.93844 8.48118L2.47793 6.20577L5.80598 5.81118C6.15134 5.77023 6.45063 5.55279 6.5963 5.23698L8 2.19375Z" stroke="black"/>
            </svg>
}
function IconStarFilled(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.54597 1.98433C7.72468 1.5969 8.27532 1.5969 8.45403 1.98433L9.85773 5.02756C9.93057 5.18546 10.0802 5.29418 10.2529 5.31466L13.5809 5.70925C14.0046 5.75949 14.1748 6.28318 13.8615 6.57286L11.401 8.84827C11.2734 8.96634 11.2162 9.14225 11.2501 9.31281L11.9032 12.5999C11.9864 13.0184 11.5409 13.342 11.1686 13.1336L8.24422 11.4967C8.09248 11.4118 7.90752 11.4118 7.75578 11.4967L4.8314 13.1336C4.45909 13.342 4.01361 13.0184 4.09676 12.5999L4.74991 9.31281C4.78379 9.14225 4.72664 8.96634 4.59897 8.84827L2.13846 6.57286C1.82521 6.28318 1.99537 5.75949 2.41906 5.70925L5.74711 5.31466C5.91979 5.29418 6.06943 5.18546 6.14227 5.02756L7.54597 1.98433Z" fill="#FFD912"/>
            </svg>
}
function IconClose(){
    return  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.27933 11.3718C2.90689 11.7442 2.90689 12.3481 3.27933 12.7205C3.65177 13.093 4.25561 13.093 4.62805 12.7205L7.99994 9.34861L11.3719 12.7207C11.7444 13.0931 12.3482 13.0931 12.7207 12.7207C13.0931 12.3482 13.0931 11.7444 12.7207 11.3719L9.34866 7.99986L12.7204 4.62808C13.0928 4.25563 13.0928 3.65178 12.7204 3.27933C12.348 2.90689 11.7441 2.90689 11.3717 3.27933L7.99994 6.65112L4.62833 3.27946C4.25589 2.90702 3.65205 2.90702 3.27961 3.27946C2.90717 3.65191 2.90717 4.25576 3.27961 4.62821L6.65121 7.99986L3.27933 11.3718Z" fill="#111111"/>
            </svg>
}