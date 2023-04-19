import React from 'react';

export type T_PositionObj = {
    left : number,
    right : number,
    top : number,
    bottom : number,
}
export default function usePosition(ref 
    : React.MutableRefObject<HTMLDivElement | null>) 
    : T_PositionObj {

    const [positions, setPositions] = React.useState(getPositions);

    function getPositions(){
        const tarRect = ref.current ? ref.current.getBoundingClientRect() : null;
        return {
                left: tarRect ? tarRect.left : 0,
                right: tarRect ? tarRect.right : 0,
                top: tarRect ? tarRect.top : 0,
                bottom: tarRect ? tarRect.bottom : 0,
            };
    };

    function handleResize(){
        setPositions(getPositions());
    };

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    React.useLayoutEffect(() => {
        handleResize();
    }, []);

    return positions;
}

