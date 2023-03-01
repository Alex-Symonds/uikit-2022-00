/*
    useRef does not inform anyone when its contents change.
    This can be an issue if you need a rerender when, for example, the ref changes from null
    to the actual reference.

    This custom hook returns a "ref" (i.e. to stick in a ref={ref} in the target component's 
    props list) and the DOM ele (i.e. to fulfil similar purposes to ref.current).
*/

import {useState, useCallback} from 'react';

export default function useUpdatingRef(){
    const [refCurrent, setRefCurrent] = useState<HTMLElement | null>(null);
    const ref = useCallback((node : HTMLElement | null) => {
        if(node !== null){
            setRefCurrent(node);
        }
    }, []);

    return {ref, refCurrent};
}