import { IconRecords, T_IconSVGComponent, ICON_ID, ICON_SIZES } from "./IconRecords";

type T_IconSizeValues = typeof ICON_SIZES[keyof typeof ICON_SIZES];

type T_IconProps = {
    id: keyof typeof ICON_ID, 
    size?: T_IconSizeValues
};

export default function Icon({id, size} 
    : T_IconProps)
    : JSX.Element | null {

    if(!(id in IconRecords)){
        id = ICON_ID.default;
    }
    const iconRecord = IconRecords[id];
    const fallbackSize : T_IconSizeValues = Object.keys(iconRecord)[0] as T_IconSizeValues;

    // If the user didn't specify a size, use the fallback
    size = size ?? fallbackSize;

    // If the combination of icon and size chosen by the user does not exist, grab the same icon
    // at the fallback size.
    // Add "undefined" handling to placate TypeScript (it screams otherwise)
    let SVGComponent : T_IconSVGComponent | undefined
                    =  iconRecord[size] ?? iconRecord[fallbackSize];
    if(SVGComponent === undefined){
        return null;
    }

    // Return the SVG, scaled to the size requested by the user (or the fallback)
    let displaySize = size.replace("px", "");
    return SVGComponent(displaySize);
}


