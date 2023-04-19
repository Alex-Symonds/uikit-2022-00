import React from 'react';

type T_UseDimensionsProps = {
    ref : React.MutableRefObject<HTMLDivElement | HTMLElement | null>,
    text? : string,
}
type T_Dimensions = {
    height : number,
    width: number,
}
export default function useOriginalDimensions({ref, text} 
    : T_UseDimensionsProps) 
    : T_Dimensions {

    const [measurements, setMeasurements] = React.useState<T_Dimensions>(getDimensions);

    function getDimensions(){
        return {
            height: ref.current ? ref.current.offsetHeight : 0,
            width: ref.current ? ref.current.offsetWidth : 0,
        }
    }

    function updateDimensions(){
        if(ref.current){
            setMeasurements(getDimensions());
        }
    }

    React.useLayoutEffect(() => {
        updateDimensions();
    }, []);

    React.useEffect(() => {
        updateDimensions();
    }, [text]);

    return measurements;
}