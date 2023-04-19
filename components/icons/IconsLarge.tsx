export enum IconLargeId{
    vk,
    facebook,
    google,
    close,
    telegram,
    whatsapp,
    viber,
    instagram,
    phone,
    web,    
}

interface I_IconLargeProps{
    id: IconLargeId
}

export default function IconLarge({id} : I_IconLargeProps){
    switch(id){
        case IconLargeId.vk:
            return <IconVk />

        case IconLargeId.facebook:
            return <IconFacebook />

        case IconLargeId.google:
            return <IconGoogle />

        case IconLargeId.close:
            return <IconClose />

        case IconLargeId.telegram:
            return <IconTelegram />

        case IconLargeId.whatsapp:
            return <IconWhatsapp />

        case IconLargeId.viber:
            return <IconViber />

        case IconLargeId.instagram:
            return <IconInstagram />

        case IconLargeId.phone:
            return <IconPhone />
            
        case IconLargeId.web:
            return <IconWeb />

        default:
            return null;
    }
}

function IconVk(){
    return  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.4511 9.94182C27.6196 9.40727 27.4512 9 26.6479 9H24.0307C23.3569 9 23.0589 9.34364 22.8905 9.72545C22.8905 9.72545 21.556 12.92 19.6643 15.0073C19.0424 15.6055 18.7703 15.7964 18.4335 15.7964C18.265 15.7964 17.993 15.6055 17.993 15.0582V9.94182C17.993 9.29273 17.8375 9 17.2803 9H13.1472C12.7326 9 12.4865 9.30545 12.4865 9.59818C12.4865 10.2091 13.4582 10.3618 13.523 12.1055V15.8982C13.523 16.7382 13.3675 16.8909 13.0436 16.8909C12.1626 16.8909 9.98587 13.6709 8.70319 10.0055C8.44406 9.29273 8.19789 9 7.52415 9H4.89399C4.15548 9 4 9.34364 4 9.72545C4 10.4127 4.89399 13.7982 8.14606 18.2782C10.3098 21.3455 13.3675 23 16.1531 23C17.8245 23 18.0318 22.6309 18.0318 21.9945V19.6782C18.0318 18.9527 18.1873 18.8 18.7185 18.8C19.1072 18.8 19.768 18.9909 21.3228 20.4545C23.1107 22.2109 23.3958 23 24.4064 23H27.0236C27.7751 23 28.1508 22.6309 27.9435 21.9055C27.7103 21.18 26.8552 20.1236 25.7279 18.8764C25.119 18.1764 24.1991 17.4127 23.914 17.0182C23.5254 16.5345 23.642 16.3182 23.914 15.8727C23.914 15.8727 27.1143 11.4564 27.4511 9.94182Z" fill="#627DA1"/>
            </svg>
}
function IconFacebook(){
    return  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 6V10H19C18.31 10 18 10.81 18 11.5V14H21V18H18V26H14V18H11V14H14V10C14 8.93913 14.4214 7.92172 15.1716 7.17157C15.9217 6.42143 16.9391 6 18 6H21Z" fill="#4B629E"/>
            </svg>  
}
function IconGoogle(){
    return  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5.3335" y="5.33337" width="21" height="21" fill="white" fillOpacity="0.01"/>
                <path d="M10.4325 18.0853L9.73631 20.6842L7.19178 20.738C6.43133 19.3276 6 17.7139 6 15.9991C6 14.3409 6.40329 12.7772 7.11814 11.4003H7.11869L9.38403 11.8156L10.3764 14.0672C10.1687 14.6727 10.0555 15.3227 10.0555 15.9991C10.0556 16.7331 10.1885 17.4364 10.4325 18.0853Z" fill="#FBBB00"/>
                <path d="M25.8253 14.1313C25.9401 14.7362 26 15.3609 26 15.9994C26 16.7153 25.9248 17.4136 25.7814 18.0873C25.2945 20.3795 24.0225 22.3811 22.2604 23.7976L22.2599 23.797L19.4066 23.6515L19.0027 21.1306C20.172 20.4449 21.0857 19.3719 21.5671 18.0873H16.2197V14.1313H21.6451H25.8253Z" fill="#518EF8"/>
                <path d="M22.2598 23.7978L22.2603 23.7984C20.5466 25.1758 18.3696 26 15.9998 26C12.1915 26 8.88045 23.8715 7.19141 20.7391L10.4321 18.0864C11.2766 20.3402 13.4508 21.9446 15.9998 21.9446C17.0954 21.9446 18.1218 21.6484 19.0026 21.1314L22.2598 23.7978Z" fill="#28B446"/>
                <path d="M22.3835 8.30214L19.1439 10.9543C18.2323 10.3845 17.1548 10.0554 16.0004 10.0554C13.3938 10.0554 11.1789 11.7334 10.3767 14.068L7.11896 11.401H7.11841C8.78273 8.19226 12.1355 6 16.0004 6C18.4268 6 20.6516 6.86428 22.3835 8.30214Z" fill="#F14336"/>
            </svg>
}
function IconClose(){
    return  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.39131 20.7205C8.86989 21.2419 8.86989 22.0873 9.39131 22.6087C9.91273 23.1301 10.7581 23.1301 11.2795 22.6087L16.0002 17.888L20.7211 22.6089C21.2425 23.1303 22.0879 23.1303 22.6093 22.6089C23.1308 22.0874 23.1308 21.2421 22.6093 20.7206L17.8885 15.9998L22.6089 11.2793C23.1304 10.7579 23.1304 9.91249 22.6089 9.39107C22.0875 8.86964 21.2421 8.86964 20.7207 9.39107L16.0002 14.1115L11.2799 9.39124C10.7585 8.86982 9.91312 8.86982 9.3917 9.39124C8.87027 9.91267 8.87027 10.7581 9.3917 11.2795L14.112 15.9998L9.39131 20.7205Z" fill="#111111"/>
            </svg>
}
function IconTelegram(){
    return  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.524 23.9715L12.8347 19.2168L21.3569 11.4385C21.7342 11.09 21.2792 10.9214 20.7799 11.2249L10.2603 17.9579L5.7107 16.4967C4.73421 16.2157 4.72311 15.53 5.93264 15.0354L23.6539 8.11134C24.4639 7.7404 25.2407 8.31366 24.93 9.57259L21.9117 23.9715C21.7009 24.9944 21.0906 25.2417 20.2472 24.7696L15.6532 21.33L13.445 23.4994C13.1898 23.758 12.979 23.9715 12.524 23.9715Z" fill="#479AD6"/>
            </svg>
}
function IconWhatsapp(){
    return  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.75 17.96C21 18.09 21.16 18.16 21.21 18.26C21.27 18.37 21.25 18.87 21 19.44C20.8 20 19.76 20.54 19.3 20.56C18.84 20.58 18.83 20.92 16.34 19.83C13.85 18.74 12.35 16.08 12.23 15.91C12.11 15.74 11.27 14.53 11.31 13.3C11.36 12.08 12 11.5 12.26 11.26C12.5 11 12.77 10.97 12.94 11H13.41C13.56 11 13.77 10.94 13.96 11.45L14.65 13.32C14.71 13.45 14.75 13.6 14.66 13.76L14.39 14.17L14 14.59C13.88 14.71 13.74 14.84 13.88 15.09C14 15.35 14.5 16.18 15.2 16.87C16.11 17.75 16.91 18.04 17.15 18.17C17.39 18.31 17.54 18.29 17.69 18.13L18.5 17.19C18.69 16.94 18.85 17 19.08 17.08L20.75 17.96ZM16 6C17.3132 6 18.6136 6.25866 19.8268 6.7612C21.0401 7.26375 22.1425 8.00035 23.0711 8.92893C23.9997 9.85752 24.7362 10.9599 25.2388 12.1732C25.7413 13.3864 26 14.6868 26 16C26 18.6522 24.9464 21.1957 23.0711 23.0711C21.1957 24.9464 18.6522 26 16 26C14.03 26 12.2 25.43 10.65 24.45L6 26L7.55 21.35C6.57 19.8 6 17.97 6 16C6 13.3478 7.05357 10.8043 8.92893 8.92893C10.8043 7.05357 13.3478 6 16 6ZM16 8C13.8783 8 11.8434 8.84285 10.3431 10.3431C8.84285 11.8434 8 13.8783 8 16C8 17.72 8.54 19.31 9.46 20.61L8.5 23.5L11.39 22.54C12.69 23.46 14.28 24 16 24C18.1217 24 20.1566 23.1571 21.6569 21.6569C23.1571 20.1566 24 18.1217 24 16C24 13.8783 23.1571 11.8434 21.6569 10.3431C20.1566 8.84285 18.1217 8 16 8Z" fill="#3ABA27"/>
            </svg>
}
function IconViber(){
    return  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1859 9.58087C15.8651 9.58087 15.8651 10.0809 16.1859 10.085C18.6751 10.1042 20.7251 11.8392 20.7476 15.0217C20.7476 15.3575 21.2393 15.3534 21.2351 15.0175C21.2084 11.5884 18.9693 9.60004 16.1859 9.58087Z" fill="#7C529E"/>
                <path d="M19.4575 14.4942C19.45 14.8259 19.9408 14.8417 19.945 14.5059C19.9858 12.615 18.82 11.0575 16.6292 10.8934C16.3083 10.87 16.275 11.3742 16.595 11.3975C18.495 11.5417 19.4958 12.8384 19.4575 14.4942Z" fill="#7C529E"/>
                <path d="M17.9303 16.7892C18.1037 16.555 18.5228 16.4067 18.9345 16.645C19.4895 16.9692 20.1962 17.4734 20.6645 17.93C20.9287 18.1525 20.9887 18.4925 20.8078 18.8517V18.8575C20.4003 19.6 19.637 20.42 18.852 20.1584L18.8445 20.1467C18.0478 19.9159 16.1712 18.9159 14.9853 17.94C12.8996 16.2345 11.997 14.0729 11.5033 12.8906C11.3998 12.6426 11.3142 12.4377 11.2395 12.2892C10.987 11.4767 11.7762 10.6875 12.497 10.2659H12.5045C12.8512 10.0784 13.1845 10.1409 13.4062 10.4184C13.458 10.4909 13.5222 10.5689 13.5986 10.6618C13.833 10.9465 14.1829 11.3716 14.6478 12.2117C14.8787 12.6375 14.7353 13.0709 14.5087 13.2509L14.0553 13.6259C13.8253 13.8167 13.8562 14.1725 13.8562 14.1725C13.8562 14.1725 14.5278 16.8009 17.0395 17.465C17.0395 17.465 17.3837 17.4967 17.5678 17.2584L17.9303 16.7892Z" fill="#7C529E"/>
                <path d="M16.9751 12.7534C17.7759 12.8 18.1643 13.2184 18.2059 14.0775C18.2209 14.4134 18.7084 14.39 18.6934 14.0542C18.6401 12.9325 18.0551 12.3075 17.0018 12.2492C16.6809 12.23 16.6509 12.7342 16.9751 12.7534Z" fill="#7C529E"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M23.4144 7.95002C25.0078 9.38419 25.8911 12.555 25.2944 17.5775C24.7723 22.0088 21.7849 22.7936 20.7822 23.0571C20.6838 23.0829 20.6046 23.1038 20.5486 23.1225C20.2778 23.2125 17.8944 23.8292 14.7911 23.56C14.6829 23.6893 14.5801 23.8122 14.4823 23.9292C12.9027 25.819 12.6305 26.1446 12.0686 25.9625C11.5469 25.7984 11.5778 24.9817 11.5778 24.9817L11.5819 22.9659H11.5778C7.0436 21.6459 7.10693 16.78 7.16027 14.1825C7.2136 11.5859 7.70027 9.48835 9.08193 8.05919C12.1586 5.13752 20.8436 5.50002 23.4153 7.94919L23.4144 7.95002ZM12.5219 25.2267C13.1328 24.5909 15.0969 22.1417 15.0969 22.1417C17.7286 22.3175 19.8244 21.7784 20.0503 21.7034C20.1029 21.6858 20.1788 21.6675 20.2733 21.6447C21.1273 21.4385 23.5005 20.8655 23.9394 17.2084C23.939 17.1902 23.9454 17.1258 23.9557 17.022C24.0601 15.9703 24.5657 10.8771 22.4069 8.96335C20.4669 7.14002 12.8528 6.57419 10.1536 9.10502C8.9836 10.3009 8.58693 12.0767 8.54527 14.245C8.54384 14.3195 8.54219 14.3963 8.54049 14.4753C8.49283 16.6937 8.40904 20.5937 12.1211 21.6575C12.1211 21.6575 12.1061 24.735 12.1061 25.0042C12.1028 25.4142 12.3219 25.4334 12.5219 25.2267Z" fill="#7C529E"/>
            </svg>
}
function IconInstagram(){
    return  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.8 6H20.2C23.4 6 26 8.6 26 11.8V20.2C26 21.7383 25.3889 23.2135 24.3012 24.3012C23.2135 25.3889 21.7383 26 20.2 26H11.8C8.6 26 6 23.4 6 20.2V11.8C6 10.2617 6.61107 8.78649 7.69878 7.69878C8.78649 6.61107 10.2617 6 11.8 6ZM11.6 8C10.6452 8 9.72955 8.37928 9.05442 9.05442C8.37928 9.72955 8 10.6452 8 11.6V20.4C8 22.39 9.61 24 11.6 24H20.4C21.3548 24 22.2705 23.6207 22.9456 22.9456C23.6207 22.2705 24 21.3548 24 20.4V11.6C24 9.61 22.39 8 20.4 8H11.6ZM21.25 9.5C21.5815 9.5 21.8995 9.6317 22.1339 9.86612C22.3683 10.1005 22.5 10.4185 22.5 10.75C22.5 11.0815 22.3683 11.3995 22.1339 11.6339C21.8995 11.8683 21.5815 12 21.25 12C20.9185 12 20.6005 11.8683 20.3661 11.6339C20.1317 11.3995 20 11.0815 20 10.75C20 10.4185 20.1317 10.1005 20.3661 9.86612C20.6005 9.6317 20.9185 9.5 21.25 9.5ZM16 11C17.3261 11 18.5979 11.5268 19.5355 12.4645C20.4732 13.4021 21 14.6739 21 16C21 17.3261 20.4732 18.5979 19.5355 19.5355C18.5979 20.4732 17.3261 21 16 21C14.6739 21 13.4021 20.4732 12.4645 19.5355C11.5268 18.5979 11 17.3261 11 16C11 14.6739 11.5268 13.4021 12.4645 12.4645C13.4021 11.5268 14.6739 11 16 11ZM16 13C15.2044 13 14.4413 13.3161 13.8787 13.8787C13.3161 14.4413 13 15.2044 13 16C13 16.7956 13.3161 17.5587 13.8787 18.1213C14.4413 18.6839 15.2044 19 16 19C16.7956 19 17.5587 18.6839 18.1213 18.1213C18.6839 17.5587 19 16.7956 19 16C19 15.2044 18.6839 14.4413 18.1213 13.8787C17.5587 13.3161 16.7956 13 16 13Z" fill="url(#paint0_linear_2323_13646)"/>
                <defs>
                <linearGradient id="paint0_linear_2323_13646" x1="8" y1="25" x2="24.5" y2="7.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFC400"/>
                <stop offset="1" stopColor="#DA00AE"/>
                </linearGradient>
                </defs>
            </svg>
}
function IconPhone(){
    return  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2178 14.9244C12.4978 17.44 14.56 19.5022 17.0756 20.7822L19.0311 18.8267C19.28 18.5778 19.6267 18.5067 19.9378 18.6044C20.9333 18.9333 22 19.1111 23.1111 19.1111C23.3469 19.1111 23.573 19.2048 23.7397 19.3715C23.9064 19.5382 24 19.7643 24 20V23.1111C24 23.3469 23.9064 23.573 23.7397 23.7397C23.573 23.9064 23.3469 24 23.1111 24C19.1034 24 15.2598 22.4079 12.4259 19.5741C9.59206 16.7402 8 12.8966 8 8.88889C8 8.65314 8.09365 8.42705 8.26035 8.26035C8.42705 8.09365 8.65314 8 8.88889 8H12C12.2357 8 12.4618 8.09365 12.6285 8.26035C12.7952 8.42705 12.8889 8.65314 12.8889 8.88889C12.8889 10 13.0667 11.0667 13.3956 12.0622C13.4933 12.3733 13.4222 12.72 13.1733 12.9689L11.2178 14.9244Z" fill="black"/>
            </svg>
}
function IconWeb(){
    return  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.36 18C20.44 17.34 20.5 16.68 20.5 16C20.5 15.32 20.44 14.66 20.36 14H23.74C23.9 14.64 24 15.31 24 16C24 16.69 23.9 17.36 23.74 18H20.36ZM18.59 23.56C19.19 22.45 19.65 21.25 19.97 20H22.92C21.96 21.65 20.43 22.93 18.59 23.56ZM18.34 18H13.66C13.56 17.34 13.5 16.68 13.5 16C13.5 15.32 13.56 14.65 13.66 14H18.34C18.43 14.65 18.5 15.32 18.5 16C18.5 16.68 18.43 17.34 18.34 18ZM16 23.96C15.17 22.76 14.5 21.43 14.09 20H17.91C17.5 21.43 16.83 22.76 16 23.96ZM12 12H9.08C10.03 10.34 11.57 9.06 13.4 8.44C12.8 9.55 12.35 10.75 12 12ZM9.08 20H12C12.35 21.25 12.8 22.45 13.4 23.56C11.57 22.93 10.03 21.65 9.08 20ZM8.26 18C8.1 17.36 8 16.69 8 16C8 15.31 8.1 14.64 8.26 14H11.64C11.56 14.66 11.5 15.32 11.5 16C11.5 16.68 11.56 17.34 11.64 18H8.26ZM16 8.03C16.83 9.23 17.5 10.57 17.91 12H14.09C14.5 10.57 15.17 9.23 16 8.03ZM22.92 12H19.97C19.65 10.75 19.19 9.55 18.59 8.44C20.43 9.07 21.96 10.34 22.92 12ZM16 6C10.47 6 6 10.5 6 16C6 18.6522 7.05357 21.1957 8.92893 23.0711C9.85752 23.9997 10.9599 24.7362 12.1732 25.2388C13.3864 25.7413 14.6868 26 16 26C18.6522 26 21.1957 24.9464 23.0711 23.0711C24.9464 21.1957 26 18.6522 26 16C26 14.6868 25.7413 13.3864 25.2388 12.1732C24.7362 10.9599 23.9997 9.85752 23.0711 8.92893C22.1425 8.00035 21.0401 7.26375 19.8268 6.7612C18.6136 6.25866 17.3132 6 16 6Z" fill="#428BF9"/>
            </svg>
}