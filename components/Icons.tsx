import IconS, {IconSmallId} from './IconsSmall';
import IconM, {IconMediumId} from './IconsMedium';
import IconL, {IconLargeId} from './IconsLarge';
import IconXL, {IconXLId} from './IconsExtraLarge';

export interface IconProps{
    idSmall?: IconSmallId,
    idMedium?: IconMediumId,
    idLarge?: IconLargeId,
    idXL?: IconXLId
}

export default function Icon({idSmall, idMedium, idLarge, idXL} : IconProps){
    if(idMedium !== undefined){
        return <IconM id={idMedium} />
    }

    if(idSmall !== undefined){
        return <IconS id={idSmall} />
    }

    if(idLarge !== undefined){
        return <IconL id={idLarge} />
    }

    if(idXL !== undefined){
        return <IconXL id={idXL} />
    }

    return null;
}