export type CheckboxOptionDataType = {
    checked : boolean,      /* Controlled state of whether it's checked. */
    displayText : string,   /* Human-readable text displayed to users */
    id : string,            /* Used for "value". Unique identifier for this option (in case displayText is unsuitable) */
    name : string,          /* Used for "name" (in case displayText is unsuitable) */
};
export function onChangeCheckbox(
    id : string, 
    currentChecked : boolean, 
    options : CheckboxOptionDataType[], 
    setOptions : React.Dispatch<React.SetStateAction<CheckboxOptionDataType[]>>
    ){

    const newOptions = options.map((c, i) => {
        if(c.id === id){
            return {
                ...c,
                checked: !currentChecked
            }
        }
        else{
            return c;
        }
    });
    setOptions(newOptions);
}


export type RadioOptionDataType = {
    checked : boolean,      /* Controlled state of whether it's checked. */
    displayText : string,   /* Human-readable text displayed to users */
    id : string,            /* Used for "value". Unique identifier for this option (in case displayText is unsuitable) */
};
export function onChangeRadio(
    id : string, 
    currentChecked : boolean, 
    options : RadioOptionDataType[], 
    setOptions : React.Dispatch<React.SetStateAction<RadioOptionDataType[]>>
    ){

    const newChecked = !currentChecked;
    const newOptions = options.map((c, i) => {
        if(c.id === id){
            return {
                ...c,
                checked: newChecked
            }
        }
        else{
            if(newChecked){
                return {
                    ...c,
                    checked: false
                }  
            }
            else{
                return c;
            }
        }
    });
    setOptions(newOptions);
}